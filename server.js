//importer la fonctionnalité de configurer notre serveur depuis .env
import 'dotenv/config';

//importer la fonctionnalité express depuis express ainsi que le format json
import express, { json } from 'express';

//importer l`engin de handlebars 
import { engine } from 'express-handlebars'; 4

//on va importer https de https
import https from 'https';

//on va importer le readfile qui va permettre de lire les deux fichiers dans le dossier security
import { readFile } from 'fs/promises';

//import helmet , cors pour la protection et sécurié du serveur et compression pour que le format se compresse
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';

//importer la session de notre site web qui va permettre de sauvegarder dans memory store qui doit aussi être importé
import session from 'express-session';

import memorystore from 'memorystore';

//importer le contenu du fichier javascript nommé authentification.js afin qu`il soit accessible
import './authentification.js'

//importer passport , une libraire de configuration de authentification
import passport from 'passport';

//on va importer notre middleware sse qui va permettre de faire le temps reel
import middlewareSse from './middleware-sse.js';

//importer la fonction addUtilisateur venant du fichier js utilisateur.js 
import { addUtilisateur } from './modele/utilisateur.js';

//importer tous les méthodes qui vont interargir avec la base de donnée 
import { getManegeInscrits, addManegeAdmin, getManegeUtilisateur, addInscriptionUtilisateur, removeInscriptionUtilisateur, removeManegeAdmin, getUtilisateurByManege } from './modele/manege.js';

//importer la methode valide venant de validationTB.js qui est la validation du coté serveur sur les text boxes de la création d`une activité
import { valide } from './validationTB.js';

//importer la methode valideInsCompte venant de validationInscriptionCompte.js qui est la validation du coté serveur sur les text boxes de la création d`un compte
import { valideInsCompte } from './validationInscriptionCompte.js';

//importer la methode valideConCompte venant de validationConnexionCompte.js qui est la validation du coté serveur sur les text boxes de la connexion à un compte
import { valideConCompte } from './validationConnexionCompte.js';

// Création du serveur
let app = express();

//Ajouter l`engin de handlebars dans express
app.engine('handlebars', engine());

//Définir handlebars comme engin de rendu(qui va générer le html)
app.set('view engine', 'handlebars');

//Configuration de handlebars
app.set('views', './views');

//Création du constructeur de la base de données de session en utilisant le midleware session
const Memorystore = memorystore(session);

// Ajout de middlewares
app.use(helmet());
app.use(cors());
app.use(compression());
app.use(json());
app.use(session({
    //création de notre cookie ainsi que de son temps en milisecondes equivalent à 20 min
    cookie: { maxAge: 1200000 },
    //on va lier le contenu package.json avec le fichier .env de configuration afin qu`on le configure plus tard
    name: process.env.npm_package_name,
    //on va créé notre base de données temporaire ainsi que son temps d`expiration
    store: new Memorystore({ checkPeriod: 1200000 }),
    //resave en false permet de ne pas sauvegarder automatiquement les modifications du programmeur
    resave: false,
    //saveUninitialized permet de ne pas sauvegarder les données null
    saveUninitialized: false,
    //secret est la clé d`encryption qui va permettre d`encrypter les données des cookies des utilisateurs
    secret: process.env.SESSION_SECRET
}));

//initialize c un middleware qui va dire si l`authentification est pret
app.use(passport.initialize())
app.use(passport.session());

//on va utiliser le middleware dans notre serveur dans ce cas la on va utiliser le middleware lié au temps réel
app.use(middlewareSse());

app.use(express.static('public'));


//Lire notre liste de maneges dans le chemin de la page par défault et il va spécifier le rendu de handlebars en générant un ensemble de variables qui pourraient aller avec leurs styles et leurs codes javascripts client
app.get('/', async (request, response) => {

    //la on va detecter si l`utilisateur est connecté ou non(si il existe)
    if (request.user) {
        response.render('Paccueil', {
            titre: 'Page Accueil',
            styles: ['/css/style.css'],
            scripts: ['/js/main.js'],
            maneges: await getManegeUtilisateur(),
            //cette variable va permettre de accepter les conditions de cookies afin de supprimer ce message par la suite
            accept: request.session.accept,
            //la on vas dire si l`utilisateur est admin et que id_type_utilisateur = 2, si il l`est alors on va caché toutes les textbox ou autre acces à l`utilisateur normale
            EstAdmin: request.user?.id_type_utilisateur > 1,
            //ici je vais dire que mon utilisateur existe et je vais initialiser la variable utilisateur
            user: request.user,

        })

    } else {
        response.redirect('/Connexion');
    }
})

//C`est la page d`inscription en faisant la requete get pour lire le contenu de sa route et son handlebars
app.get('/Inscription', async (request, response) => {
    response.render('Inscription', {
        titre: "Page d'inscription",
        styles: ['/css/Inscription.css'],
        scripts: ['/js/InscriptionCompte.js'],
        //ici je vais dire que mon utilisateur existe et je vais initialiser la variable utilisateur
        user: request.user
    })
})

//Lire notre liste de maneges inscrits dans le chemin de la page /PactivitesInscrites et il va spécifier le rendu de handlebars en générant un ensemble de variables qui pourraient aller avec leurs styles et leurs codes javascripts client
app.get('/PactiviteInscrites', async (request, response) => {
    //si l`utilisateur est connecté , alors on peut accéder à la page activitesInscrites
    if (request.user) {
        response.render('PactiviteInscrites', {
            titre: 'Mes activités',
            styles: ['/css/style.css'],
            scripts: ['/js/main.js'],
            //ici je vais dire que mon utilisateur existe et je vais initialiser la variable utilisateur 
            user: request.user,
            //la on vas dire si l`utilisateur est admin et que id_type_utilisateur = 2, si il l`est alors on va caché toutes les textbox ou autre acces à l`utilisateur normale
            EstAdmin: request.user?.id_type_utilisateur > 1,
            manegesinscrits: await getManegeInscrits(request.user?.id_utilisateur),
            accept: request.session.accept
        })
        console.log(request.user?.id_utilisateur);
        //sinon on retourne à l`utilisateur pas connecté une erreur 401
    } else response.status(401).end();
})

//Lire notre liste de maneges dans le chemin de la page Admin et il va spécifier le rendu de handlebars en générant un ensemble de variables qui pourraient aller avec leurs styles et leurs codes javascripts client
app.get('/Padmin', async (request, response) => {


    //Si l`utilisateur est connecté et y est un admin alors il peut accéder à cette page
    if (request.user && request.user.id_type_utilisateur > 1) {
        let getManege = await getManegeUtilisateur();

        //ici faire la condition afin de situer une liste d`utilisateurs à l`intérieur de chaque manege
        for (let manege of getManege) {
            let resultat = await getUtilisateurByManege(manege.id_manege);

            manege.listeutilisateurs = resultat;
        }

        response.render('Padmin', {
            titre: 'Page Administrateur',
            styles: ['/css/style.css'],
            scripts: ['/js/main.js'],
            //ici je vais dire que mon utilisateur existe et je vais initialiser la variable utilisateur
            user: request.user,
            //la on vas dire si l`utilisateur est admin et que id_type_utilisateur = 2, si il l`est alors on va caché toutes les textbox ou autre acces à l`utilisateur normale
            EstAdmin: request.user?.id_type_utilisateur > 1,
            maneges: getManege,
            accept: request.session.accept
        })
        //sinon faire l`erreur 403 qui va dire à l`utilisateur qu`il n`est pas autorisé
    } else response.status(403).end();
})

//C`est la page connexion en faisant la requete get pour lire le contenu de sa route et son handlebars
app.get('/Connexion', async (request, response) => {
    response.render('Connexion', {
        titre: 'Page Connexion',
        styles: ['/css/Connexion.css'],
        scripts: ['/js/ConnexionCompte.js'],
        //ici je vais dire que mon utilisateur existe et je vais initialiser la variable utilisateur
        user: request.user
    })
})


//Ajouter le manege créé par l`admin en faisant une requete au serveur et retourner l`id du manege ajouté vers le client
app.post('/Padmin', async (request, response) => {

    //si la validation coté serveur est validé (true) alors executé la condition sinon envoyer une erreur 404 au client
    if (valide(request.body)) {

        //test si la requete est existante
        console.log(request.body);

        //ici je vais dire si l`utilisateur n`existe pas
        if (!request.user) {
            response.status(401).end();
        }
        //pour la gestion des acces, la on veut que seulement l`utilisateur avec id_type_utilisateur = 2 puisse y accéder à l`utilisateur
        //on retourne l`erreur 403 si l`utilisateur a un id_type_utilisateur = 1 car il dit que ta pas les droits d`acces
        else if (request.user.id_type_utilisateur <= 1) {
            response.status(403).end();
        }
        else {
            let id_manege = await addManegeAdmin(request.body.nom, request.body.date_debut, request.body.nb_tours, request.body.capacite, request.body.description);

            response.status(201).end();

            //la on va diffuser à tout le monde que on a ajouter une activité (on va envoyer l`id de manege, le nom, la date de debut, le nb_tours, la capacité et la description au client)
            //on va créé aussi un évenement associé à ceci
            response.pushJson({
                id_manege: id_manege,
                nom: request.body.nom,
                date_debut: request.body.date_debut,
                nb_tours: request.body.nb_tours,
                capacite: request.body.capacite,
                description: request.body.description,
            }, 'addManege');
        }
    } else response.status(404).end();

})


//Effacer le manege selectionné par l`admin à partir de son id en faisant une requete de notre methode removeManegeAdmin et retourner que tout va bien au client
app.delete('/Padmin', async (request, response) => {

    //ici je vais dire si l`utilisateur n`existe pas
    if (!request.user) {
        response.status(401).end();
    }
    //pour la gestion des acces, la on veut que seulement l`utilisateur avec id_type_utilisateur = 2 puisse y accéder à l`utilisateur
    //on retourne l`erreur 403 si l`utilisateur a un id_type_utilisateur = 1 car il dit que ta pas les droits d`acces
    else if (request.user.id_type_utilisateur <= 1) {
        response.status(403).end();
    }
    else {
        await removeManegeAdmin(request.body.id_manege);

        response.status(200).end();

        //la on va diffuser à tout le monde que on a effacé une activité (on va envoyer l`id de manege au client)
        //on va créé aussi un évenement associé à ceci
        response.pushJson({
            id_manege: request.body.id_manege,
        }, 'deleteManege');

    }
})


//Ajoute l`inscription à une activité dans la nouvelle liste activités inscrits à partir de son id
app.post('/', async (request, response) => {

    //ici je vais dire si l`utilisateur n`existe pas
    if (!request.user) {
        response.status(401).end();
    }
    else {
        //retourner l`objet du courriel de l`utilisateur ajouté et ensuite l`envoyé dans le temps réel
        let courrielObjet = await addInscriptionUtilisateur(request.body.id_manege, request.user.id_utilisateur);

        console.log(courrielObjet);


        response.status(200).end();

        //la on va diffuser à tout le monde que un utilisateur s`est inscrit (on va envoyer l`id de manege au client)
        //on va créé aussi un évenement associé à ceci
        response.pushJson({
            id_manege: request.body.id_manege,
            id_utilisateur: request.user.id_utilisateur,
            courriel: courrielObjet.courriel
        }, 'addInscriptionUtilisateur');

    }

})


//Effacer le manege inscrit par l`utilisateur dans la nouvelle table activités inscrits à partir de son id en faisant une requete au serveur et retourner que tout va bien (operation avec succès code 200) au client
app.delete('/PactiviteInscrites', async (request, response) => {

    //ici je vais dire si l`utilisateur n`existe pas
    if (!request.user) {
        response.status(401).end();
    }
    else {
        //retourner l`objet du courriel de l`utilisateur enlevé et ensuite l`envoyer dans le temps réel
        let courrielObjet = await removeInscriptionUtilisateur(request.body.id_manege, request.user.id_utilisateur);

        response.status(200).end();

        //la on va diffuser à tout le monde que un utilisateur s`est desinscrit (on va envoyer l`id de manege au client)
        //on va créé aussi un évenement associé à ceci
        response.pushJson({
            id_manege: request.body.id_manege,
            id_utilisateur: request.user.id_utilisateur,
            courriel: courrielObjet.courriel
        }, 'removeInscriptionUtilisateur');
    }

})

//on va créé un compte en faisant des requete venant du client au serveur en utilisant la fonction addUtilisateur et on va vérifier si elle contient des erreurs à traiter
app.post('/Inscription', async (request, response, next) => {
    //si la validation coté serveur est good (true) alors on peut executer la fonction suivante
    if (valideInsCompte(request.body)) {
        try {
            await addUtilisateur(request.body.courrielP, request.body.mot_passeP, request.body.prenomP, request.body.nomP);
            response.status(201).end();

        } catch (error) {
            if (error.code === 'SQLITE_CONSTRAINT') {
                response.status(409).end();
            } else {
                next(error);
            }

        }
    } else {
        response.status(400).end();
    }
})

//on va initialiser le canal de temps reel 
app.get('/stream', (request, response) => {
    //si l`utilisateur est existant et qu`il est un admin alors commencé le stream c`est à dire le temps réel 
    if (request.user && request.user.id_type_utilisateur > 1) {
        response.initStream();
    } else response.status(401).end();
})

//On va mettre la route qui permet de lier accept-cookie.js avec notre server.js , donc grace à cela la variable accept devient true, comme ca dans le handlebars on peut l`utiliser convenablement
app.post('/accept', (request, response) => {
    request.session.accept = true;

    response.status(200).end();
})

//on va se connecter dans le compte existant venant de la base de donnée de session et la base de donnée normale
app.post('/Connexion', (request, response, next) => {

    //si la validation coté serveur est good (true) alors on peut executer la fonction suivante
    if (valideConCompte(request.body)) {
        passport.authenticate('local', (error, utilisateur, info) => {

            if (error) {
                next(error);
            }
            //si l`utilisateur qui va une page web et qui n`est pas connecté et qu`il est null et que ses infos concordent pas
            else if (!utilisateur) {
                //on va retourner le message d`erreur info au client
                response.status(401).json(info);
            }
            else {
                request.logIn(utilisateur, (error) => {
                    //si le login ne marche pas et que la base de donnée des session n`est pas ajouté
                    if (error) {
                        next(error);
                    } else response.status(200).end();
                })

            }
        })(request, response, next);
    } else response.status(400).end();
})

//on va se deconnecter du compte existant en allant directement dans le chemin /connexion
app.post('/Deconnexion', (request, response, next) => {

    request.logOut((error) => {
        if (error) {
            next(error);
        } else {
            //la on va diriger vers la page d`accueil et pour les fetch ca ne marche pas
            response.redirect('/Connexion');
        }
    })

})

//Démarrer le serveur à partir du port de env
//si je suis en production utiliser http sinon en developpement j`utilise https
if (process.env.NODE_ENV === 'production') {
    app.listen(process.env.PORT);
    //Affichage du port du serveur 
    console.log('Serveur démarré: http://localhost:' + process.env.PORT);
} else {

    //1er paramètre c`est la où on va lire les fichiers de security(Les clés) credentials et le deuxième c`est notre serveur express
    const credentials = {
        key: await readFile('./security/localhost.key'),
        cert: await readFile('./security/localhost.cert')
    }
    //Démarrer le serveur en utilisant le protocole https
    https.createServer(credentials, app).listen(process.env.PORT);

    //Affichage du port du serveur 
    console.log('Serveur démarré: https://localhost:' + process.env.PORT);
}
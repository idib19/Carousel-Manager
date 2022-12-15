
//on va importer la promesse de connexion à la base de donnée ainsi que hash venant bcrypt
import connectionPromise from './connexion.js';

import {hash} from 'bcrypt';


//on va créé un compte d`utilisateur sur la base de donnée
export const addUtilisateur = async (courrielP,mot_passeP,prenomP,nomP) =>{
    
    let connexion = await connectionPromise;

    //on va hacher les données du mot de passe 
    let mot_passePHash = await hash(mot_passeP,10);

    await connexion.run(`INSERT INTO utilisateur (id_type_utilisateur, courriel, mot_passe, prenom, nom)VALUES(1,?,?,?,?)`,[courrielP,mot_passePHash,prenomP,nomP])
}

//On va lire le contenu de l`utilisateur sur la base de donnée selon le courriel et on va le retourner
export const getUtilisateurByCourriel = async (courrielP) => {
    let connexion = await connectionPromise;

    let utilisateur = await connexion.get(`SELECT id_utilisateur , id_type_utilisateur, courriel , mot_passe , prenom , nom
    FROM utilisateur
    WHERE courriel = ?`,
    [courrielP])

    return utilisateur;
}
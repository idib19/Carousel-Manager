//importer la connexion à la base de donnée
import connectionPromise from "./connexion.js";

//Retourner tous les éléments de la table manege 
export const getManegeUtilisateur = async () => {

    //établir la connexion à la base de donnée
    let connexion = await connectionPromise;

    let resultat = await connexion.all('SELECT * FROM manege');

    return resultat;
}

//Retourner tous les éléments de la table qui ont l`id utilisateur de 1 et que l`id manege de la table manege corresponde à celui de la table manege utilisateur
export const getManegeInscrits = async (id_utilisateurP) => {

    //établir la connexion à la base de donnée
    let connexion = await connectionPromise;

    let resultat = await connexion.all(`SELECT nom, date_debut, nb_tours, capacite, description, manege_utilisateur.id_manege
    FROM manege_utilisateur INNER JOIN manege on manege.id_manege = manege_utilisateur.id_manege
    WHERE id_utilisateur = (?)`, [id_utilisateurP]);

    return resultat;
}

//La on va lire tous les utilisateurs avec leurs maneges associés dans la base de donnée
export const getUtilisateurByManege = async(id_manegeP)=>{
    let connexion = await connectionPromise;

    let resultat = await connexion.all(`SELECT courriel, utilisateur.id_utilisateur FROM utilisateur INNER JOIN manege_utilisateur on manege_utilisateur.id_utilisateur = utilisateur.id_utilisateur WHERE manege_utilisateur.id_manege = (?)`,[id_manegeP])

    return resultat;
}


//Ajouter tous les valeurs qui representent un manege dans la table manege et retourner l`id du manege ajouté
export const addManegeAdmin = async (nomP, date_debutP, nb_toursP, capaciteP, descriptionP) => {

    //établir la connexion à la base de donnée
    let connexion = await connectionPromise;

    let resultat = await connexion.run(`INSERT INTO manege(nom, date_debut, nb_tours, capacite, description) VALUES (?,?,?,?,?)`,
        [nomP, date_debutP, nb_toursP, capaciteP, descriptionP]);

    //Mettre l`id du manege ajouté dans la variable manegeid
    let manegeid = resultat.lastID;

    //C`est l`id du manege ajouté 
    return manegeid;
}



//Ajouter l`inscription de l`utilisateur à une activité en ajoutant l`id utilisateur et l`id manege à la table manege_utilisateur
export const addInscriptionUtilisateur = async (id_manegeP, id_utilisateurP) => {

    //établir la connexion à la base de donnée
    let connexion = await connectionPromise;

    //Ici on supprime l`ensemble de valeur que represente un manege associé lorsque l`id est double (c`est-à dire que l`utilisateur s`est inscrit deux fois à la même activité)
    await connexion.run(`DELETE FROM manege_utilisateur WHERE id_manege = (?) AND id_utilisateur = (?)`, [id_manegeP, id_utilisateurP])


    await connexion.run(`INSERT INTO manege_utilisateur(id_manege,id_utilisateur) VALUES (?, ?)`, [id_manegeP, id_utilisateurP]);


    //une fois les données de l`inscription de l`utilisateur dans la base de donnée on retourne le courriel de celui ci
    let resultat = await connexion.get(`SELECT courriel FROM utilisateur WHERE id_utilisateur =(?)`,[id_utilisateurP])

    return resultat;
}


//Supprimer tous les valeurs de la table manege qui ont l`id correspondant (en paramètre)
export const removeManegeAdmin = async (id_manegeP) => {

    //établir la connexion à la base de donnée
    let connexion = await connectionPromise;

    connexion.run(`DELETE FROM manege WHERE id_manege = ?`,
        [id_manegeP]);
}


//Supprimer tous les valeurs de la table manege_utilisateur qui ont l`id correspondant et l`id utilisateur doit être de valeur 1 car il represente l`utilisateur (Nous)
export const removeInscriptionUtilisateur = async (id_manegeP, id_utilisateurP) => {

    //établir la connexion à la base de donnée
    let connexion = await connectionPromise;

    connexion.run(`DELETE FROM manege_utilisateur WHERE id_manege = (?) AND id_utilisateur = (?)`,
        [id_manegeP, id_utilisateurP]);

     //une fois les données de l`inscription de l`utilisateur effacées dans la base de donnée on retourne le courriel de celui ci
     let resultat = await connexion.get(`SELECT courriel FROM utilisateur WHERE id_utilisateur =(?)`,[id_utilisateurP]);

     return resultat;

}
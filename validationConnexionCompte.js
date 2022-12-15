

//Fonction qui va retourner true si l`email corresponde à la structure de l`email normale avec le @ et qu`il est de type string et que il n`est pas vide dans le coté serveur

const valideCourriel =  (courrielP) =>{
    return typeof courrielP === 'string' && courrielP.length>0 && courrielP.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
}

//Fonction qui va retourner true si le mot de passe est entre 7 et 15 caractères et si il est de type string
const valideMotDePasse =  (mot_passeP) =>{
    return typeof mot_passeP === 'string' && mot_passeP.length>=7&&mot_passeP.length<=15;
}

//Fonction qui va retourner true uniquement si toutes les fonctions de validation des saisies du coté serveur vont retourner true et on l`exporte pour qu`on puisse l`importer depuis le serveur par la suite

export const valideConCompte = (body) =>{
    return valideCourriel(body.courrielP) && valideMotDePasse(body.mot_passeP);
}
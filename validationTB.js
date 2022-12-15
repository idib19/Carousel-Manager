//Fonction qui va retourner true si le nom est de type string et que il n`est pas vide dans le coté serveur

const valideNom = (nom)=>{

    return typeof nom === 'string' && nom.length> 0;
}

//Fonction qui va retourner true si la description est de type string ,que il n`est pas vide et que il est en taille plus grand que 20 caractères et plus petit que 200 caractères dans le coté serveur

const valideDescription = (description)=>{
    return typeof description === 'string' && description.length>0 && description.length >=20 && description.length<=200;
}


//Fonction qui va retourner true si la date est de type string ,que il n`est pas vide et que il correspond à l`exemple de format regex suivant: MM/JJ/AAAA dans le coté serveur

const valideDate =  (date_debut) =>{
    return typeof date_debut === 'string' && date_debut.length>0 && date_debut.match(/^(0?[1-9]|1[012])\/(0?[1-9]|[12][0-9]|3[01])\/((19|20)\d\d)$/)
}

//Fonction qui va retourner true si la capacite est de type number ,que il n`est pas vide et que la capacite en nombre de passagers doit etre maximum de 50 et minimum de 4 dans le coté serveur

const valideCapacite=  (capacite) =>{

    if(capacite ===null){
        return false;
    }

    return typeof capacite === 'number' && capacite>=4 && capacite<=50
}

//Fonction qui va retourner true si le nombre de tours est de type number ,que il n`est pas vide et que le nombre de tour doit etre maximum de 5 et minimum de 1 dans le coté serveur

const valideNbrtours=  (nb_tours) =>{

    if(nb_tours ===null){
        return false;
    }

    return typeof nb_tours === 'number' && nb_tours>=1 && nb_tours<=5
}

//Fonction qui va retourner true uniquement si toutes les fonctions de validation des saisies du coté serveur vont retourner true et on l`exporte pour qu`on puisse l`importer depuis le serveur par la suite

export const valide = (body) =>{
    return valideNom(body.nom) && valideDescription(body.description) && valideDate(body.date_debut) && valideCapacite(body.capacite) && valideNbrtours(body.nb_tours);
}
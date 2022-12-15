
//Définir les erreurs qui seront ajouté au textbox afin de valider le contenu du coté client
let erreur_nom = document.getElementById('error_nom_utilisateur');
let erreur_prenom = document.getElementById('error_prenom_utilisateur');
let erreur_mot_de_passe = document.getElementById('error_mot_de_passe');
let erreur_courriel = document.getElementById('error_courriel');
let erreur_copy = document.getElementById('error_copy')

// Les inputs du formulaire à déclarer et initialiser
let nomtb = document.getElementById('nom_utilisateur');
let prenomtb = document.getElementById('prenom_utilisateur');
let motdePassetb = document.getElementById('mot_de_passe');
let courrieltb = document.getElementById('courriel_utilisateur');

// Le formulaire
let form = document.getElementById('formulaire');


//Une fois que l`utilisateur appuie sur le bouton Inscription , il va aller alors s`inscrire en envoyant ses informations importantes au serveur et pour que ce dernier puisse les ajouter dans les bases de données associés

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    let data = {
        courrielP: courrieltb.value,
        mot_passeP: motdePassetb.value,
        nomP: nomtb.value,
        prenomP: prenomtb.value
    }

    let response = await fetch('/Inscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })



    if (response.ok) {
        //si la reponse est bien retourné alors change ton adresse pour la route /connexion et ca fait disparaitre le message d`erreur copy
        window.location.replace('/Connexion');
        erreur_copy.style.display = 'none';
    }

    //si le courriel est deja utilisé alors mettre une erreur de copy de courriel
    else if (response.status === 409){
        // on affiche un message dans la console
        console.log('Courriel deja utilise');
        erreur_copy.innerText= 'Courriel déjà utilisé!';
        erreur_copy.style.display = 'block';
    }
    else{
        console.log('Autre erreur');
        erreur_copy.style.display = 'none';
    }
})


//Validation de nom de l`utilisateur pour vérifier si sa valeur n`est pas manquante et valide ou complète 

const valideNom = () => {

    if (nomtb.value ==='') {
        erreur_nom.innerText = 'Saisie incomplète';
        erreur_nom.style.display = 'block';
    } else {
        erreur_nom.style.display = 'none';
    }

    //mettre l`erreur de copy invisible quand ya une autre erreur de validation
    erreur_copy.style.display = 'none';

}

//Validation de prenom de l`utilisateur pour vérifier si sa valeur n`est pas manquante et valide ou complète 

const validePrenom = () => {

    if (prenomtb.value ==='') {
        erreur_prenom.innerText = 'Saisie incomplète';
        erreur_prenom.style.display = 'block';
    } else {
        erreur_prenom.style.display = 'none';
    }
    //mettre l`erreur de copy invisible quand ya une autre erreur de validation
    erreur_copy.style.display = 'none';

}

//Validation du mot de passe de l`utilisateur pour vérifier si sa valeur n`est pas manquante et valide ou complète et que elle comprend en longueur entre 7 et 15 caractères

const valideMotDePasse = () => {

    if (motdePassetb.value ==='') {
        erreur_mot_de_passe.innerText = 'Saisie incomplète';
        erreur_mot_de_passe.style.display = 'block';
    } else if (motdePassetb.value.length <7 || motdePassetb.value.length >15) {
        erreur_mot_de_passe.innerText = 'Ce champ doit être compris entre 7 et 15 caractères';
        erreur_mot_de_passe.style.display = 'block';
    }
    else {
        erreur_mot_de_passe.style.display = 'none';
    }

    //mettre l`erreur de copy invisible quand ya une autre erreur de validation
    erreur_copy.style.display = 'none';

}

//Validation du courriel de l`utilisateur pour vérifier si sa valeur n`est pas manquante et valide ou complète et que elle correspond au format de courriel normal(precisement au regex /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)

const valideCourriel = ()=>{
    if (courrieltb.value === '') {
        erreur_courriel.innerText = 'Saisie incomplète';
        erreur_courriel.style.display = 'block';
    } else if (courrieltb.value.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
        erreur_courriel.style.display = 'none';
    }
    else {
        erreur_courriel.innerText = 'Ce champ doit être un courriel valide';
        erreur_courriel.style.display = 'block';
    }

    //mettre l`erreur de copy invisible quand ya une autre erreur de validation
    erreur_copy.style.display = 'none';
}

//Executer toutes les fonctions suivantes une fois le bouton Confirmer Inscription appuyé

form.addEventListener('submit',valideNom);
form.addEventListener('submit',validePrenom);
form.addEventListener('submit',valideCourriel);
form.addEventListener('submit',valideMotDePasse);





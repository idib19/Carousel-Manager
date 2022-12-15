
//Définir les erreurs qui seront ajouté au textbox afin de valider le contenu du coté client
let erreur_nom = document.getElementById('error_nom_utilisateur');
let erreur_prenom = document.getElementById('error_prenom_utilisateur');
let erreur_mot_de_passe = document.getElementById('error_mot_de_passe');
let erreur_courriel = document.getElementById('error_courriel');

//Déclarer et initialiser les variables contenant les input de motDePasse , courriel et form

let motdePassetb = document.getElementById('mot_de_passe');

let courrieltb = document.getElementById('courriel_utilisateur');

let form = document.getElementById('formulaire');

//Une fois que l`utilisateur appuie sur le bouton Connexion , il va aller alors se connecter en envoyant ses informations importantes qui va l`identifier

form.addEventListener('submit',async(event)=>{
    event.preventDefault();

    let data = {
        courrielP : courrieltb.value,
        mot_passeP : motdePassetb.value
    }

    let response = await fetch('/Connexion',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify(data)
    })
    
// si la reponse est ok on change ton adresse pour la route / et on envoi l'utilisateur sur la page d'accueil 
    if (response.ok){
        window.location.replace('/');
    }

    else if (response.status === 401){
        let info = await response.json();
        
        // afficher a la console un message 
        console.log(info);

        console.log('Utilisateur deja connecté');
    }
    else{
        console.log('Autre erreur');
    }
})


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
}

//Executer toutes les fonctions suivantes une fois le bouton Connexion appuyé

form.addEventListener('submit',valideCourriel);
form.addEventListener('submit',valideMotDePasse);


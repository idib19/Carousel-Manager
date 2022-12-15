




//Définir le ul qui represente les maneges disponibles
let ul = document.getElementById('listemaneges');

//Définir le ul inscrit qui represente les maneges inscrits
let ulinscrit = document.getElementById('listemanegesinscrits');

//Définir le ul qui va définir la liste d`utilisateurs avec leur manège associé
let listeutilisateurs = document.querySelector('.listeutilisateurs');

//Définir le formulaire de notre page admin
let form = document.getElementById('formulaireadmin');

//Définir tous les boutons supprimés dans le ul 
let allBtnSupp = document.querySelectorAll('#listemaneges .manegeli .manegediv .DivBtn input');

//Définir tous les boutons inscrire dans le ul
let allBtn_sinscrire = document.querySelectorAll('#listemaneges .btninscrireclasse');

//Définir tous les boutons quitter dans le ul inscrit
let allBtn_quitter = document.querySelectorAll('#listemanegesinscrits .btnquitterclasse');

//Définir le text box du nom du manege
let nomtb = document.getElementById('nom_manege');

//Définir le text box de description de manege
let destb = document.getElementById('description_manege');

//Définir le text box de date de debut de manege
let datetb = document.getElementById('date_debut');

//Définir le text box de capacite de manege 
let capatb = document.getElementById('capacite');

//Définir le text box de nombre de tours de manege
let tourtb = document.getElementById('nbr_tours');

//Définir les boolean EstValide de chaque text box
let EstValideNom = false;

let EstValideDescription = false;

let EstValideDate_Debut = false;

let EstValideCapacite = false;

let EstValideNb_Tours = false;

//Définir les erreurs qui seront ajouté au textbox afin de valider le contenu du coté client
let error_nom = document.getElementById('error_nom_manege');
let error_description_manege = document.getElementById('error_description_manege');
let error_date_debut = document.getElementById('error_date_debut');
let error_capacite = document.getElementById('error_capacite');
let error_nbr_tours = document.getElementById('error_nbr_tours');

//Méthode qui va ajouter un li de manege avec son contenu dans le coté client en saisissant son id
const addManegeClient = async (id_manegeP, nomP, date_debutP, nb_toursP, capaciteP, descriptionP) => {

    //Définir le limanege
    let limanege = document.createElement('li');
    //Ajouter le dataset nouveau attribut nommé id_manege dans le li
    limanege.dataset.id_manege = id_manegeP;
    //Ajouter la classe manegeli dans le limanege
    limanege.classList.add("manegeli");

    //Définir le divid
    let divid = document.createElement('div');
    //Ajouter la classe manegeid dans le divid
    divid.classList.add("manegeid");
    //On va mettre le contenu de id_manege dans le divid
    divid.innerText = id_manegeP;

    //Définir le divnom
    let divnom = document.createElement('div');
    //Ajouter la classe manegenom dans le divnom
    divnom.classList.add("manegenom");
    //On va mettre le contenu de nom dans le divnom
    divnom.innerText = nomP;

    //Définir le divdate_debut
    let divdate_debut = document.createElement('div');
    //Ajouter la classe manegedate_debut dans divdate_debut
    divdate_debut.classList.add("manegedate_debut");
    //On va mettre le contenu de date_debut dans le divdate_debut
    divdate_debut.innerText = "Date debut:" + date_debutP

    //Définir le divnb_tours
    let divnb_tours = document.createElement('div');
    //Ajouter la classe manegenb_tours dans divnb_tours
    divnb_tours.classList.add("manegenb_tours");
    //On va mettre le contenu de nb_tours dans le divnb_tours
    divnb_tours.innerText = "Nombre tours:" + nb_toursP;

    //Définir le divcapacite
    let divcapacite = document.createElement('div');
    //Ajouter la classe manegecapacite dans divcapacite
    divcapacite.classList.add("manegecapacite");
    //On va mettre le contenu de capacite dans le divcapacite
    divcapacite.innerText = "Capacité:" + capaciteP;

    //Définir le divdescription
    let divdescription = document.createElement('div');
    //Ajouter la classe manegedescription dans divdescription
    divdescription.classList.add("manegedescription");
    //On va mettre le contenu de description dans le divdescription
    divdescription.innerText = descriptionP;

    //Définir le divbtnsupp
    let divbtnsupp = document.createElement('div');
    //Ajouter la classe DivBtn dans divbtnsupp
    divbtnsupp.classList.add("DivBtn");
    //Définir le btnsupp
    let btnsupp = document.createElement('input');
    //Ajouter le type de btnsupp comme submit
    btnsupp.type = "submit";
    //Ajouter la valeur comme Supprimer
    btnsupp.value = "Supprimer"
    //Ajouter la classe boutonsupprimerclasse
    btnsupp.classList.add("boutonsupprimerclasse");
    //Ajouter le dataset nouveau attribut nommé id_manege dans btnsupp
    btnsupp.dataset.id_manege = id_manegeP;

    //Ici on va ajouter le addEventListener sur l`ajout de manege afin que on puisse l`effacer directement
    btnsupp.addEventListener('click', (event) => {
        //on va determiner l`identifiant du li de manege concerné afin de le supprimer si c ajouté par le client
        let li = document.querySelector(`#listemaneges li[data-id_manege="${id_manegeP}"]`);
        li.remove();

        //ici faut pas oublier une fois qu`on le supprime du coté client , faut aussi le supprimer du coté serveur dans la mémoire des bases de données
        removeManege(event);
    })

    //Ajouter le btnsupp dans le divbtnsupp
    divbtnsupp.append(btnsupp);

    //Définir le ulisteutilisateurs
    let ullisteutilisateurs = document.createElement('ul');
    //Ajouter la classe listeutilisateurs dans le ullisteutilisateurs
    ullisteutilisateurs.classList.add("listeutilisateurs");

    //Définir le divmanege
    let divmanege = document.createElement('div');
    //Ajouter le classe manegediv
    divmanege.classList.add("manegediv");

    //Ajouter le divid dans le divmanege
    divmanege.append(divid);

    //Ajouter le divnom dans le divmanege
    divmanege.append(divnom);

    //Ajouter le divdate_debut dans le divmanege
    divmanege.append(divdate_debut);

    //Ajouter le divnb_tours dans le divmanege
    divmanege.append(divnb_tours);

    //Ajouter le divcapacite dans le divmanege
    divmanege.append(divcapacite);

    //Ajouter le divdescription dans le divmanege
    divmanege.append(divdescription);

    //Ajouter le divbtnsupp dans le divmanege
    divmanege.append(divbtnsupp);

    //Ajouter le ullisteutilisateurs dans le divmanege
    divmanege.append(ullisteutilisateurs);

    //Ajouter le divmanege dans le limanege
    limanege.append(divmanege);

    //Ajouter le limanege dans le ul
    ul.append(limanege);

}

//Ajouter un manege créé sur le client dans notre serveur en saisissant l`id du manege du bouton inscrire selectionné 
const addManegeServeur = async (event) => {
    event.preventDefault();

    let data = {
        //on va mettre notre id du manege dans la variale id_manege afin qu`il soit envoyé au serveur
        id_manege: event.currentTarget.dataset.id_manege,
        //on va envoyer au serveur les informations venant des input venant du client
        nom: nomtb.value,
        description: destb.value,
        date_debut: datetb.value,
        capacite: parseInt(capatb.value),
        nb_tours: parseInt(tourtb.value)
    };

    //On va envoyer le id manege avec tous les autres contenus de textbox du formulaire dans le serveur à partir de la méthode post
    await fetch('/Padmin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    //si le manege rajouté est valide alors vidé les textbox
    if (EstValideNom && EstValideDescription && EstValideNb_Tours && EstValideDate_Debut && EstValideCapacite) {
        //Mettre les valeurs vides pour que ca apparaisse du coté client
        nomtb.value = '';
        destb.value = '';
        datetb.value = '';
        capatb.value = '';
        tourtb.value = '';
    }

}


//Effacer le manege de la liste de maneges dans la page admin et page accueil avec le bon id correspondant en faisant une requete avec la méthode DELETE au serveur en envoyant son id
const removeManege = async (event) => {

    event.preventDefault();

    let data = {
        id_manege: event.currentTarget.dataset.id_manege

    }

    await fetch('/Padmin', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })

}

//Effacer le manege de la liste de maneges inscrits dans la page activites avec le bon id correspondant en faisant une requete avec la méthode DELETE au serveur en envoyant son id
const removeInscriptionServeur = async (event) => {

    event.preventDefault();

    let data = {
        id_manege: event.currentTarget.dataset.id_manege

    }

    let response = await fetch('/PactiviteInscrites', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })

    //On supprime l`inscription du manege dans la page activités inscrites afin que l`utilisateur 
    //qui n`est pas admin puisse voir que le bloc manege de la page activités inscrites a disparu une fois que le bouton quitté activités est appuyé
    if (response.ok) {
        //Définir le li inscrit de la page activités inscrits à effacer sur le client 
        let liinscrit = document.querySelector(`#listemanegesinscrits li[data-id_manege="${data.id_manege}"]`);

        if (liinscrit) {
            //ensuite l`effacer
            liinscrit.remove();
        }
    }


}


//Ajouter par la methode post l`inscription d`une activité de l`utilisateur en envoyant l`id dans le serveur et aussi grace à cette id il pourra ajouter le manege dans la liste de maneges inscrits coté client
const addInscriptionServeur = async (event) => {

    event.preventDefault();

    let data = {
        id_manege: event.currentTarget.dataset.id_manege
    }


    await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
}


//Validation de nom pour vérifier si sa valeur n`est pas manquante et valide ou complète

const valideNom = () => {

    if (nomtb.value === '') {
        error_nom.innerText = 'Saisie incomplète';
        error_nom.style.display = 'block';
    } else {
        error_nom.style.display = 'none';
        EstValideNom = true;
    }

}


//Validation de description pour vérifier si sa valeur n`est pas manquante ,valide ou complète, et si elle correspond en longueur entre 20 et 200 caractères

const valideDescription = () => {

    if (destb.value === '') {
        error_description_manege.innerText = 'Saisie incomplète';
        error_description_manege.style.display = 'block';
    } else if (destb.value.length < 20 || destb.value.length > 200) {
        error_description_manege.innerText = 'Ce champ doit être compris entre 20 et 200 caractères';
        error_description_manege.style.display = 'block';
    }
    else {
        error_description_manege.style.display = 'none';
        EstValideDescription = true;
    }

}

//Validation de date pour vérifier si sa valeur n`est pas manquant et valide ou complète

const valideDate = () => {
    if (datetb.value === '') {
        error_date_debut.innerText = 'Saisie incomplète';
        error_date_debut.style.display = 'block';
    } else if (datetb.value.match(/^(0?[1-9]|1[012])\/(0?[1-9]|[12][0-9]|3[01])\/((19|20)\d\d)$/)) {
        error_date_debut.style.display = 'none';
        EstValideDate_Debut = true;
    }
    else {
        error_date_debut.innerText = 'Ce champ doit comprendre le format suivant: (mm/jj/AAAA) et doit être une date valide';
        error_date_debut.style.display = 'block';
    }
}

//Validation de capacite pour vérifier si sa valeur n`est pas manquante , valide ou complète et qu`il soit plus grand que 4 passagers ou plus petit que 50 passagers

const valideCapacite = () => {

    //ici on veut dire saisie invalide dans le cas où le champ est vide ou dans le cas où le champ contient des lettres
    if (capatb.value === '') {
        error_capacite.innerText = 'Saisie incomplète';
        error_capacite.style.display = 'block';
    }
    else if (capatb.validity.rangeUnderflow) {
        error_capacite.innerText = 'Ce champ doit être plus ou égale à 4 passagers';
        error_capacite.style.display = 'block';
    } else if (capatb.validity.rangeOverflow) {
        error_capacite.innerText = 'Ce champ doit être moins ou égale à 50 passagers';
        error_capacite.style.display = 'block';
    } else {
        error_capacite.style.display = 'none';
        EstValideCapacite = true;
    }

}

//Validation de nombre de tours pour vérifier si sa valeur n`est pas manquante et valide
const valideNbrtours = () => {
    if (tourtb.value === '') {
        error_nbr_tours.innerText = 'Saisie incomplète';
        error_nbr_tours.style.display = 'block';
    } else if (tourtb.validity.rangeUnderflow) {
        error_nbr_tours.innerText = 'Ce champ doit être plus ou egale à 1';
        error_nbr_tours.style.display = 'block';
    } else if (tourtb.validity.rangeOverflow) {
        error_nbr_tours.innerText = 'Ce champ doit être moins ou egale à 5';
        error_nbr_tours.style.display = 'block';
    } else {
        error_nbr_tours.style.display = 'none';
        EstValideNb_Tours = true;
    }
}


//Permet de trouver le bouton supprimer avec l`id à effacer parmi tous les boutons à supprimer de ma liste de maneges admin
for (let btnSupp of allBtnSupp) {
    //ici on va vérifier si notre btnSupp est en faite un bouton inscrire ou un bouton suppimer à partir de sa classe
    if (btnSupp.classList.contains("btninscrireclasse")) {
        console.log("Je m`inscris");
    } else if (btnSupp.classList.contains("boutonsupprimerclasse")) {
        console.log("Je supprime un manege");
        btnSupp.addEventListener('click', removeManege);
    }
}

//Permet de trouver le bouton inscrire avec l`id à inscrire parmi tous les boutons à inscrire de ma liste de maneges dans la page d`accueil
for (let btnIns of allBtn_sinscrire) {

    btnIns.addEventListener('click', addInscriptionServeur);

}

//Permet de trouver le bouton quitter avec l`id à quitter parmi tous les boutons à quitter de ma liste de maneges inscrits dans la page de activites inscrites
for (let btnQuitter of allBtn_quitter) {

    btnQuitter.addEventListener('click', removeInscriptionServeur);

}

//ca permet de ouvrir un streaming de données avec le serveur
let source = new EventSource('/stream');

//on va ajouter un évenement nommé addManege pour ajouter les données de manege en temps réel dans la surface client(l`interface) qui viennent du serveur 
source.addEventListener('addManege', (event) => {
    //on va récupérer nos données envoyés par le serveur et les convertir en object js
    let data = JSON.parse(event.data);

    addManegeClient(data.id_manege, data.nom, data.date_debut, data.nb_tours, data.capacite, data.description);

})
//on va ajouter un évenement nommé deleteManege pour supprimer les données de manege en temps réel dans la surface client(l`interface) qui viennent du serveur
source.addEventListener('deleteManege', async (event) => {
    //on va récupérer nos données envoyés par le serveur et les convertir en object js
    let data = JSON.parse(event.data);

    //on va determiner l`identifiant du li de manege concerné afin de le supprimer en temps réel par la suite
    let li = document.querySelector(`#listemaneges li[data-id_manege="${data.id_manege}"]`);

    //ici on le supprime en temps réel coté client
    li.remove();

})

//on va ajouter un évenement nommé addInscriptionUtilisateur afin de ajouter les inscriptions faites en temps réel
source.addEventListener('addInscriptionUtilisateur', async (event) => {
    let data = JSON.parse(event.data);

    //on va determiner le ul et tous les li afin de ajouter l`inscription en temps réel par la suite
    let ul = document.querySelector(`li[data-id_manege="${data.id_manege}"] .listeutilisateurs`);

    let allli = document.querySelectorAll(`li[data-id_manege="${data.id_manege}"] .listeutilisateurs li`);

    //On va créé le div courant 
    let div = document.createElement('div');

    //ici on va remplir notre div courant par les informations représentant l`utilisateur
    div.innerText = data.courriel + "" + data.id_utilisateur;

    //ici on va voir si le li correspondant est égale en contenu par son div avec le contenu du div courant
    for (let liutilisateur of allli) {
        if (liutilisateur.firstElementChild.innerText === div.innerText) {

            liutilisateur.remove();
        }

    }

    //on va créé le nouvel li qui représente l`adresse email de l`utilisateur et le id manege associé
    let nouveauli = document.createElement('li');

    //Ajouter la classe liutilisateur
    nouveauli.classList.add('liutilisateur');

    //Ajouter le div courant dans le nouvel li représentant l`utilisateur
    nouveauli.append(div);

    //Ajouter le nouveauli dans le ul
    ul.append(nouveauli);



})

//on va ajouter un évenement nommé removeInscriptionUtilisateur afin de supprimer les inscriptions en temps réel
source.addEventListener('removeInscriptionUtilisateur', async (event) => {
    //on va reloader la page afin que l`opération de inscription à l`activité par l`utilisateur se fasse 
    let data = JSON.parse(event.data);

    //Définir tous les li répresentant la liste des utilisateurs
    let allli = document.querySelectorAll(`li[data-id_manege="${data.id_manege}"] .listeutilisateurs li`);

    //On va aller mettre le courriel et le id_utilisateur représentant l`utilisateur courant dans un string
    let utilisateur = data.courriel + "" + data.id_utilisateur;

    //Ici on va vérifier quand l`utilisateur s`est desinscrit d`un manege , ca doit se voir dans l`interface graphique coté client
    for (let li of allli) {
        if (li.lastElementChild.innerText === utilisateur) {
            li.remove();
        }
    }

    //Définir le li inscrit de la page activités inscrits à effacer sur le client 
    let liinscrit = document.querySelector(`#listemanegesinscrits li[data-id_manege="${data.id_manege}"]`);

    //ensuite l`effacer
    liinscrit.remove();


})
//Si le formulaire est valide dans la saisie de l`utilisateur alors on execute la fonction addManegeServeur
if (form) {
    //Une fois qu`on appuie sur le bouton confirmer les fonctions de validation ci-dessus(valideNom , valideDescription , valideDate , valideCapacite et valideNbrtours) vont s`executer
    //afin de valider si le contenu que l`utilisateur va saisir est correct à ces input ou pas 

    form.addEventListener('submit', valideNom);

    form.addEventListener('submit', valideDescription);

    form.addEventListener('submit', valideDate);

    form.addEventListener('submit', valideCapacite);

    form.addEventListener('submit', valideNbrtours);

    form.addEventListener('submit', addManegeServeur);
};











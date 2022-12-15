
//importer ce module qui contient beaucoup de choses à configurer sur l`authentification
import passport from "passport";

//importer strategy qui nous permettre de definir c quoi notre strategie
import { Strategy } from "passport-local";

//importer une fonction de comparaison de hachage de données
import {compare} from 'bcrypt';

//importer la fonction getUtilisateurByCourriel 
import { getUtilisateurByCourriel } from "./modele/utilisateur.js";

//cette objet contient la configuration nécessaire qui permettra d`être utilisé dans la strategie de authentification que l`on va établir
let config = {
    usernameField : 'courrielP',
    passwordField : 'mot_passeP'
}

//on va configurer notre authentification à partir d`une nouvelle strategie de authentification
passport.use(new Strategy(config, async (courrielP, mot_passeP, done)=>{
//done va permettre de passer à une prochaine fonction de configuration

  try{
  let utilisateur = await getUtilisateurByCourriel(courrielP);


  //si l`utilisateur suivant n`existe pas dans la base de donnée on lui affiche un message d`erreur
  if (!utilisateur){
    return done (null,false,{erreur:'erreur_courriel'});
  }

  //on vérifier si le mot de passe de la base de donnée concorde avec le mot de passe du client
  let valide = await compare(mot_passeP,utilisateur.mot_passe);

  // Dans le cas où le mot de passe est incorrecte , on va lui afficher un message d`erreur
  if (!valide){
    return done(null,false,{erreur:'erreur_mot_passe'})
  }

  console.log(utilisateur);
  
  //On va retourner le contenu de l`utilisateur dans le cas où ya pas d`erreur
  return done(null,utilisateur);

  }
  catch(error){
    return done(error);
  }
}));

//Une fois que on a valider les infos de l`utilisateur , on va faire la sauvegarde du courriel de l`utilisateur utilisé comme identifiant dans la base de donnée de session
passport.serializeUser((utilisateur,done)=>{
    done(null,utilisateur.courriel);
})

//Il va chercher le contenu de l`utilisateur au complet à partir du courriel
passport.deserializeUser(async (courrielP, done)=>{

    try{
    let utilisateur = await getUtilisateurByCourriel(courrielP);

    done(null,utilisateur);
    
    }catch(error){
        done(error);
    }

})




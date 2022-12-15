import { existsSync } from 'fs';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

/**
 * Constante indiquant si la base de données existe au démarrage du serveur 
 * ou non.
 */
const IS_NEW = !existsSync(process.env.DB_FILE)

/**
 * Crée une base de données par défaut pour le serveur. Des données fictives
 * pour tester le serveur y ont été ajouté.
 */
const createDatabase = async (connectionPromise) => {
    let connection = await connectionPromise;

    await connection.exec(
        `CREATE TABLE IF NOT EXISTS type_utilisateur(
            id_type_utilisateur INTEGER PRIMARY KEY,
            type TEXT NOT NULL
        );

        CREATE TABLE IF NOT EXISTS utilisateur(
            id_utilisateur INTEGER PRIMARY KEY,
            id_type_utilisateur INTEGER NOT NULL,
            courriel TEXT NOT NULL UNIQUE,
            mot_passe TEXT NOT NULL,
            prenom TEXT NOT NULL,
            nom TEXT NOT NULL,
            CONSTRAINT fk_type_utilisateur 
                FOREIGN KEY (id_type_utilisateur)
                REFERENCES type_utilisateur(id_type_utilisateur) 
                ON DELETE SET NULL 
                ON UPDATE CASCADE
        );
        
        CREATE TABLE IF NOT EXISTS manege(
            id_manege INTEGER PRIMARY KEY AUTOINCREMENT,
            nom TEXT NOT NULL,
            description TEXT NOT NULL,
            capacite INTEGER NOT NULL,
            date_debut TEXT NOT NULL,
            nb_tours INTEGER NOT NULL
        );
        
        CREATE TABLE IF NOT EXISTS manege_utilisateur(
            id_manege INTEGER,
            id_utilisateur INTEGER,
            PRIMARY KEY (id_manege, id_utilisateur),
            CONSTRAINT fk_manege_utilisateur 
                FOREIGN KEY (id_manege)
                REFERENCES manege(id_manege) 
                ON DELETE SET NULL 
                ON UPDATE CASCADE,
            CONSTRAINT fk_utilisateur_manege
                FOREIGN KEY (id_utilisateur)
                REFERENCES utilisateur(id_utilisateur) 
                ON DELETE SET NULL 
                ON UPDATE CASCADE
        );
        
        INSERT INTO type_utilisateur (type) VALUES 
            ('regulier'),
            ('administrateur');

        INSERT INTO utilisateur (id_type_utilisateur, courriel, mot_passe, prenom, nom) VALUES 
            (1, 'zeke_the_form@gmail.com', 'password', 'Zeke', 'Anderson');
            
        INSERT INTO manege (nom, date_debut, nb_tours, capacite, description) VALUES 
            ('La grande roue', '04/25/2020', 5, 30, 'Profitez de ce voyage merveilleux qui va vous permettre d avoir une belle vue de toute notre parc.'),
            ('Tour de l himalaya', '06/12/2019', 2, 18, 'Tour unique à sensation forte qui vous donnera une raison à vivre. En bas, vous pourrez observer vos amis en la taille d une fourmi! '),
            ('Voyage de poseidon', '11/08/2022', 1, 10, "Installez-vous confortablement sur un bateau pour une expédition aquatique à travers une piscine à vagues gorgées de cascades et torrents aux vitesses variées. Cette aventure est adaptée aux petits et aux grands ce qui permet de vivre une expérience unique en famille.
            Sécurité : Doit être âgé de 3 ans ou plus et mesurer au moins (1,07 m) 42'' de grandeur. Les enfants mesurant moins de 1,22 m (48'') seront autorisés à condition de porter une veste de flottaison individuelle et d'être accompagnés par un adulte."),
            ('Lancer de canards', '03/10/2021', 3, 4, 'Le joueur doit lancer une balle en plastique dans la bouche d’un des canards qui se déplacent le long d’un cours d’eau. Un ticket permet d’effectuer trois essais de lancer. De nombreux prix sont à gagner. Venez donc tentez votre chance !'),
            ('Bulle aux petits poissons', '08/30/2021', 1, 40, "Participez à la pêche des poissons dans un bassin a l’aide d’une cane munie d’un faux crochet. Ce manège vous permettra de tester votre adresse avec des prix à gagner à la clé. Petits et grands, rassemblez votre courage et venez remplir votre filet grave à votre plus beau lancer."),
            ('Exploration au Cyclope', '07/02/2022', 2, 20, "Explorez l’ile des cyclopes dans votre bouée géante en vous laissant porter par le courant. Vous aurez la chance d’admirer le paysage fascinant constitué de nature et de représentation animalière expirées des iles siciliennes de Trinacrie ou vivaient autrefois les cyclopes dans la mythologie grecque. Adaptée aux plus jeunes, Vivez cette expérience familiale unique.Sécurité: Doit être âgé de 3 ans ou plus et mesurer au moins (1,07 m) 42'' de grandeur. Les enfants mesurant moins de 1,22 m (48'') seront autorisés à condition de porter une veste de flottaison individuelle et d'être accompagnés par un adulte. Les usagers doivent rester en position assise en tout moment et tenir les poignées."),
            ('Escape à manoir malsain','02/14/2020', 1, 10, 'Ouhhh, ambiance noire et sombre , il vous faudra échapper de cette place horrifique avec des monstres pas très gentils.');
        
        INSERT INTO manege_utilisateur (id_manege, id_utilisateur) VALUES 
            (1, 1)`
            
    );

    return connection;
}

// Base de données dans un fichier
let connectionPromise = open({
    filename: process.env.DB_FILE,
    driver: sqlite3.Database
});

// Si le fichier de base de données n'existe pas, on crée la base de données
// et on y insère des données fictive de test.
if (IS_NEW) {
    connectionPromise = createDatabase(connectionPromise);
}

export default connectionPromise;
let bouton = document.getElementById('btn_cookie');

let message = document.getElementById('message_cookie');


//si le message existe alors executer cette condition
if (bouton) {

    bouton.addEventListener('click', async () => {


        let response = await fetch('/accept', {
            method: 'POST'
        })

        //On va supprimer le div message dans le handlebars
        if (response.ok) {
            message.remove();
        }


    })

}


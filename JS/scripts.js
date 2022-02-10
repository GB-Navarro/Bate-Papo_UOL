let promisse = axios.get("https://mock-api.driven.com.br/api/v4/uol/messages");

function getMessages(){
    let promisse = axios.get("https://mock-api.driven.com.br/api/v4/uol/messages");
    promisse.then(console.log(promisse));
}

setTimeout(getMessages, 3000);
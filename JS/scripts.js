let promisse = axios.get("https://mock-api.driven.com.br/api/v4/uol/messages");
promisse.then(getMessages);


let arrayMessages = [];
let elemento = document.querySelector("main");
console.log(elemento);

function getMessages(promisseResponse){
    for(let i = 0; i < promisseResponse.data.length; i++){
        arrayMessages[i] = promisseResponse.data[i];
    }
    console.log(promisseResponse);
    console.log(arrayMessages);
    populateMessages(arrayMessages);
}

function populateMessages(messages){
    for(let i =0; i < messages.length; i++){
        if(messages[i].to == "Todos" || messages[i].to == "todos"){
            elemento.innerHTML += 
            `
            <div class="message_to_all">
                <p> 
                    <span class="message_time"> (09:22:28) </span> 
                    <span class="from"> <b>${messages[i].from}</b> </span> 
                    para 
                    <span class="message_type"> <b>Todos:</b> </span> 
                    <span class="message"> ${messages[i].text} </span>
                </p>
            </div>
            `
        }else if(messages[i].text == "entra na sala ..." || messages[i].text == "sai da sala ..."){
            elemento.innerHTML += 
            `
            <div class="room_entryORout">
                <p> 
                    <span class="message_time"> (09:21:45) </span> 
                    <span class="from"> ${messages[i].from} </span> 
                    <span class="message_type"> ${messages[i].text} </span> 
                </p>
            </div>
            `
        }else{
            elemento.innerHTML +=
            `
            <div class="message_to_one">
                <p> 
                    <span class="message_time"> (09:22:38) </span> 
                    <span class="from"> <b>${messages[i].from}</b> </span> 
                    para 
                    <span class="to"> ${messages[i].to} </span> 
                    <span class="message"> ${messages[i].text}</span> 
                </p>
            </div>
            `
        }
    }
}
function getNewMessages(){
    let promisse = axios.get("https://mock-api.driven.com.br/api/v4/uol/messages");
    promisse.then(getMessages);
}
setInterval(getNewMessages, 3000);
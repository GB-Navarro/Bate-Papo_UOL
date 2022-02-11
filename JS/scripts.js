let promisse = axios.get("https://mock-api.driven.com.br/api/v4/uol/messages");
promisse.then(getMessages);

promisse.catch(getErrorTreatment);
function getErrorTreatment(erro){
    alert("Deu XABU no get meu jovem, resolve ai!");
}


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
    //Quebrar essa função em uma função diferente para cada tipo de mensagem
    for(let i =0; i < messages.length; i++){
        if(messages[i].to == "Todos" || messages[i].to == "todos"){
            messagesToAll(elemento, messages[i]);
        }else if(messages[i].text == "entra na sala ..." || messages[i].text == "sai da sala ..."){
            messagesEntryOrOut(elemento, messages[i]);
        }else{
            messagesToOne(elemento, messages[i]);
        }
    }
}

function getNewMessages(){
    let promisse = axios.get("https://mock-api.driven.com.br/api/v4/uol/messages");
    promisse.then(getMessages);
}
//setInterval(getNewMessages, 3000);

function messagesToAll(elemento, messageAll){
    elemento.innerHTML += 
            `
            <div class="message_to_all">
                <p> 
                    <span class="message_time"> (09:22:28) </span> 
                    <span class="from"> <b>${messageAll.from}</b> </span> 
                    para 
                    <span class="message_type"> <b>Todos:</b> </span> 
                    <span class="message"> ${messageAll.text} </span>
                </p>
            </div>
            `
}

function messagesEntryOrOut(elemento, messageEntryOut){
    elemento.innerHTML += 
            `
            <div class="room_entryORout">
                <p> 
                    <span class="message_time"> (09:21:45) </span> 
                    <span class="from"> ${messageEntryOut.from} </span> 
                    <span class="message_type"> ${messageEntryOut.text} </span> 
                </p>
            </div>
            `
}

function messagesToOne(elemento, messageOne){
    elemento.innerHTML +=
    `
    <div class="message_to_one">
        <p> 
            <span class="message_time"> (09:22:38) </span> 
            <span class="from"> <b>${messageOne.from}</b> </span> 
            para 
            <span class="to"> ${messageOne.to} </span> 
            <span class="message"> ${messageOne.text}</span> 
        </p>
    </div>
    `
}

let user = {name: ""};
user.nome = prompt("Qual é o seu nome ?");
let request = axios.post("https://mock-api.driven.com.br/api/v4/uol/participants", user);
request.then(requestAcepted);

request.catch(postErrorTreatment)
function postErrorTreatment(error){
    alert("Deu XABU no post meu consagrado, resolve ai!"); //XABU PRA RESOLVER
}

function requestAcepted(requestResponse){
    console.log(requestResponse);
}

let inputBar = document.querySelector(".input_bar input");

function getUserText(){
    console.log(inputBar); //XABU PRA RESOLVER
}
let promisse = axios.get("https://mock-api.driven.com.br/api/v4/uol/messages");
promisse.then(getMessages);

promisse.catch(getErrorTreatment);
function getErrorTreatment(erro){
    alert("Deu XABU no get meu jovem, resolve ai!");
}


let arrayMessages = [];
let element = document.querySelector("main");
console.log(element);

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
            messagesToAll(element, messages[i]);
        }else if(messages[i].text == "entra na sala ..." || messages[i].text == "sai da sala ..."){
            messagesEntryOrOut(element, messages[i]);
        }else{
            messagesToOne(element, messages[i]);
        }
    }
}

function getNewMessages(){
    let promisse = axios.get("https://mock-api.driven.com.br/api/v4/uol/messages");
    promisse.then(getMessages);
}
//setInterval(getNewMessages, 3000);

function messagesToAll(element, messageAll){
    element.innerHTML += 
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

function messagesEntryOrOut(element, messageEntryOut){
    element.innerHTML += 
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

function messagesToOne(element, messageOne){
    element.innerHTML +=
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
user.name = prompt("Qual é o seu nome ?");
let request = axios.post("https://mock-api.driven.com.br/api/v4/uol/participants", user);
request.then(requestAcepted);

request.catch(postErrorTreatment)
function postErrorTreatment(error){
    if(error.status === 409){
        alert("Esse nome já está sendo usado, tente novamente com outro nome"); //CONFERIR
    }
}

function requestAcepted(requestResponse){
    if(requestResponse.status === 200){
        element.innerHTML += 
        `
        <div class="room_entryORout">
            <p> 
                <span class="message_time"> (09:21:45) </span> 
                <span class="from"> ${user.name} </span> 
                <span class="message_type"> entra na sala... </span> 
            </p>
        </div>
        `
    }
}

let inputBar = document.querySelector(".input_bar input");

function getUserText(){
    console.log(inputBar); //XABU PRA RESOLVER
}

function checkUserStatus(user){
    let statusResponse = axios.post("https://mock-api.driven.com.br/api/v4/uol/status", user);
    statusResponse.then(userOn);
    statusResponse.catch(userOff(user));
}
function userOn(){
    console.log("O usuário continua na sala");
}
function userOff(user){
    element.innerHTML += 
        `
        <div class="room_entryORout">
            <p> 
                <span class="message_time"> (09:21:45) </span> 
                <span class="from"> ${user.name} </span> 
                <span class="message_type"> sai da sala... </span> 
            </p>
        </div>
        `
}
setInterval(checkUserStatus(user), 5000);
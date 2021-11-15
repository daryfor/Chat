class Message {
    constructor(user, avatar, sDate, sms) {
        this.user = user;
        this.avatar = avatar;
        this.sDate = sDate;
        this.sms = sms;
    }
}

class Channel {
    constructor(name) {
        this.name = name;
        this.messages = [];
    }

    addMessage(message) {
        this.messages.push(message);
    }
}

class Chat {
    constructor() {
        this.channels = [];
    }

    addChannel(name) {
        let channel = new Channel(name);
        this.channels.push(channel);
    }

    getChannels() {
        return this.channels;
    }

    getChannel(channelID) {
        if (channelID < this.channels.length) {
            return this.channels[channelID];
        } else {
            return null;
        }
    }
}

// Muestra el listado de canales
function fct_showChannels() {
    let listado = document.getElementById("list");
    listado.value = "";
    listado.innerHTML = "";

    if (chat.channels.length == 0) {
        chat.addChannel("#General");
    }

    // Recorriendo el array de canales para mostrarlos como un listado
    chat.channels.forEach(canal => {
        let name = canal.name;

        //Elimina los posibles espacios en blanco para agregar el nombre sin ellos al atributo id
        if (name.indexOf(' ') > 0) {
            name = name.replace(/\s+/g, '');
        }

        let liNode = document.createElement("li");
        let aNode = document.createElement("a");
        let txtNode = document.createTextNode(canal.name);

        aNode.setAttribute("href", "#");
        aNode.setAttribute("id", name);
        aNode.setAttribute("onclick", "fct_accessChannel(\"" + name + "\")");

        aNode.appendChild(txtNode);
        liNode.appendChild(aNode);
        listado.appendChild(liNode);
    });
}

// Formatear la fecha para mostrarla en formato dd/MM HH:MM
function fct_formatDate() {
    let date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let hour = date.getHours();
    let min = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes(); //Agrego un cero a los minutos inferiores a 10.

    return (day + "/" + month + " " + hour + ":" + min);
}

// Agrega nuevo Canal al listado de canales
function fct_newChannel() {
    let newChannel = document.getElementById("createChannel").value;
    let checkName = false;

    // Controlar que el nombre del canal no existe en el listado
    chat.channels.forEach(canal => {
        if (canal.name == newChannel) {
            checkName = true;
        }
    });

    if (checkName == true) {
        alert("Ya existe un canal con ese nombre");
    } else {
        chat.addChannel(newChannel);
        fct_showChannels();
        fct_closeWindow();
    }

    // Limpiar el valor en el textbox del popup
    document.getElementById("createChannel").value = "";
}

// Genera un popup para agregar un nuevo canal
function fct_callpopup() {
    document.querySelector("#popup").style.display = "flex";
}

// Cierra el popup en caso de que no se quiera introducir nuevo canal
function fct_closeWindow() {
    document.querySelector("#popup").style.display = "none";
}

// Muestra nombre y mensajes del canal seleccionado
function fct_accessChannel(name) {
    let chat_content = document.getElementById("chat");
    chat_content.innerHTML = "";

    // Agregar nombre del canal al titulo
    let titleNode = document.getElementById("channel-name");
    titleNode.innerHTML = "";

    let title = document.createElement("h2");
    title.setAttribute("id", "title");
    title.textContent = name;

    titleNode.appendChild(title);

    // Recorrer el listado de canales para acceder al canal correspondiente
    chat.channels.forEach(canal => {
        if (canal.name == name) {
            // Agregar mensajes predeterminados en el canal #General
            if (name == "#General") {
                let username = "Palpatine";
                let avatar = "img/palpatine.jpg";
                let fecha = fct_formatDate();
                let text1 = "Bienvenido a GeekHubs Academy";
                let text2 = "Este es un curso para principiantes";
                let text3 = "Vampos a aprender a desarrollar con HTML, CSS y Javascript";
                let text4 = "Espero que disfruteis";
                let text5 = "A continuacion, dejad los mensajes pertinentes";
                let text6 = "Lo primero, por favor, presentaros";

                if (canal.messages.length == 0) {
                    let sms1 = new Message(username, avatar, fecha, text1);
                    let sms2 = new Message(username, avatar, fecha, text2);
                    let sms3 = new Message(username, avatar, fecha, text3);
                    let sms4 = new Message(username, avatar, fecha, text4);
                    let sms5 = new Message(username, avatar, fecha, text5);
                    let sms6 = new Message(username, avatar, fecha, text6);

                    canal.addMessage(sms1);
                    canal.addMessage(sms2);
                    canal.addMessage(sms3);
                    canal.addMessage(sms4);
                    canal.addMessage(sms5);
                    canal.addMessage(sms6);

                    fct_paintMessages(chat_content, canal.messages);

                } else {
                    fct_paintMessages(chat_content, canal.messages);
                }
            } else {

            }


        }
    });
}

// Agrega el código HTML necesario para mostrar los mensajes del canal
function fct_paintMessages(parentDiv, mensajes) {
    for (let i = 0; i < mensajes.length; i++) {
        if (mensajes[i].user == "Palpatine") {
            let contact = document.createElement("div");
            let contactImg = document.createElement("div");
            let contactMessage = document.createElement("div");
            let contactInfo = document.createElement("div");
            let userNode = document.createElement("div");
            let contactTime = document.createElement("div");
            let contactSMS = document.createElement("div");
            let image = document.createElement("img");
            let username = document.createElement("h5");
            let time = document.createElement("span");
            let message = document.createElement("p");

            contact.setAttribute("class", "contact");
            contactImg.setAttribute("class", "contact-img");
            contactMessage.setAttribute("class", "contact-messagebox");
            contactInfo.setAttribute("class", "contact-info");
            userNode.setAttribute("class", "contact-username");
            contactTime.setAttribute("class", "contact-time");
            contactSMS.setAttribute("class", "contact-msg");
            image.setAttribute("src", mensajes[i].avatar);
            username.textContent = mensajes[i].user;
            time.textContent = mensajes[i].sDate;
            message.textContent = mensajes[i].sms;

            contactSMS.appendChild(message);
            contactTime.appendChild(time);
            userNode.appendChild(username);
            contactInfo.appendChild(userNode);
            contactInfo.appendChild(contactTime);
            contactMessage.appendChild(contactInfo);
            contactMessage.appendChild(contactSMS);
            contactImg.appendChild(image);
            contact.appendChild(contactImg);
            contact.appendChild(contactMessage);

            parentDiv.appendChild(contact);
        } else {
            let sender = document.createElement("div");
            let senderMessage = document.createElement("div");
            let senderInfo = document.createElement("div");
            let senderTime = document.createElement("div");
            let userNode = document.createElement("div");
            let senderSMS = document.createElement("div");
            let senderImg = document.createElement("div");
            let image = document.createElement("img");
            let username = document.createElement("h5");
            let time = document.createElement("span");
            let message = document.createElement("p");

            sender.setAttribute("class", "sender");
            senderMessage.setAttribute("class", "sender-messagebox");
            senderInfo.setAttribute("class", "sender-info");
            senderTime.setAttribute("class", "sender-time");
            userNode.setAttribute("class", "sender-username");
            senderSMS.setAttribute("class", "sender-msg");
            senderImg.setAttribute("class", "sender-img");
            image.setAttribute("src", mensajes[i].avatar);
            username.textContent = mensajes[i].user;
            time.textContent = mensajes[i].sDate;
            message.textContent = mensajes[i].sms;

            senderSMS.appendChild(message);
            userNode.appendChild(username);
            senderTime.appendChild(time);
            senderInfo.appendChild(senderTime);
            senderInfo.appendChild(userNode);
            senderMessage.appendChild(senderInfo);
            senderMessage.appendChild(senderSMS);
            sender.appendChild(senderMessage);
            senderImg.appendChild(image);
            sender.appendChild(senderImg);

            parentDiv.appendChild(sender);
        }
    }
}

function fct_addNewMessage() {
    let mensaje = document.getElementById("messagebox").value;

    if (mensaje.length > 0) {
        let chat_content = document.getElementById("chat");
        chat_content.innerHTML = "";
        let titulo = document.getElementById("title").textContent;

        chat.channels.forEach(canal => {
            if (canal.name == titulo) {
                let username = "Yoda";
                let avatar = "img/avatar.jpg";
                let fecha = fct_formatDate();
                let sms = new Message(username, avatar, fecha, mensaje);

                canal.addMessage(sms);

                fct_paintMessages(chat_content, canal.messages);
            }
        });

        document.getElementById("messagebox").value = "";

        // Hacer que el scroll se posicione al final del todo, así muestra el último mensaje
        chat_content.scrollIntoView(false);
    }


}

/* COMIENZO DEL JAVASCRIPT */
let chat = new Chat();
fct_showChannels();
class Message {
    constructor(user, avatar, dateInfo, textSMS) {
        this.user = user;
        this.avatar = avatar;
        this.dateInfo = dateInfo;
        this.textSMS = textSMS;
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

function fct_formatDate() {
    let date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let hour = date.getHours();
    let min = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes(); //Agrego un cero a los minutos inferiores a 10.

    return (day + "/" + month + " " + hour + ":" + min);
}

function fct_addChannel() {
    //let channel;

    if (channels.length == 0) {
        channel = new Channel("#General");
    } else {
        channel = new Channel(document.getElementById('createChannel').value);
    }

    channels.push(channel);

    //Cierra el popup
    fct_closeWindow();

    //Limpia el valor del textbox dentro del popup
    document.getElementById("createChannel").value = "";
}

//Genera un popup para agregar un nuevo canal
function fct_callpopup() {
    document.querySelector("#popup").style.display = "flex";
}

//Cierra el popup en caso de que no se quiera introducir nuevo canal
function fct_closeWindow() {
    document.querySelector("#popup").style.display = "none";
}

function fct_paintChannels() {

    fct_addChannel();
    let listado = document.getElementById("list");
    listado.value = "";

    listado.innerHTML = "";

    channels.forEach(element => {
        let name = element.name;

        //Elimina los posibles espacios en blanco para agregar el nombre sin ellos al atributo id
        if (name.indexOf(' ') > 0) {
            name = name.replace(/\s+/g, '');
        }

        let liNode = document.createElement("li");
        let aNode = document.createElement("a");
        let txtNode = document.createTextNode(element.name);

        aNode.setAttribute("href", "#");
        aNode.setAttribute("id", name);
        aNode.setAttribute("onclick", "fct_showMessages(\"" + name + "\")");

        aNode.appendChild(txtNode);
        liNode.appendChild(aNode);
        listado.appendChild(liNode);
    });
}

function fct_paintMessages(padre, Channel) {
    Channel.messages.forEach(element => {
        if (element.user == "Emperador Palpatine") {
            let contact = document.createElement("div");
            contact.setAttribute("class", "contact");

            let contactImg = document.createElement("div");
            contactImg.setAttribute("class", "contact-img");

            let contactMessage = document.createElement("div");
            contactMessage.setAttribute("class", "contact-messagebox");

            let contactInfo = document.createElement("div");
            contactInfo.setAttribute("class", "contact-info");

            let userNode = document.createElement("div");
            userNode.setAttribute("class", "contact-username");

            let contactTime = document.createElement("div");
            contactTime.setAttribute("class", "contact-time");

            let contactSMS = document.createElement("div");
            contactSMS.setAttribute("class", "contact-msg");

            let image = document.createElement("img");
            image.setAttribute("src", element.avatar);

            let username = document.createElement("h5");
            username.textContent = element.user;

            let time = document.createElement("span");
            time.textContent = element.dateInfo;
            let message = document.createElement("p");
            message.textContent = element.textSMS;

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

            padre.appendChild(contact);
        } else {
            let sender = document.createElement("div");
            sender.setAttribute("class", "sender");

            let senderMessage = document.createElement("div");
            senderMessage.setAttribute("class", "sender-messagebox");

            let senderInfo = document.createElement("div");
            senderInfo.setAttribute("class", "sender-info");

            let senderTime = document.createElement("div");
            senderTime.setAttribute("class", "sender-time");

            let userNode = document.createElement("div");
            userNode.setAttribute("class", "sender-username");

            let senderSMS = document.createElement("div");
            senderSMS.setAttribute("class", "sender-msg");

            let senderImg = document.createElement("div");
            senderImg.setAttribute("class", "sender-img");

            let image = document.createElement("img");
            image.setAttribute("src", element.avatar);

            let username = document.createElement("h5");
            username.textContent = element.user;

            let time = document.createElement("span");
            time.textContent = element.dateInfo;
            let message = document.createElement("p");
            message.textContent = element.textSMS;

            senderSMS.appendChild(message);
            senderTime.appendChild(time);
            userNode.appendChild(username);
            senderInfo.appendChild(userNode);
            senderInfo.appendChild(senderTime);
            senderMessage.appendChild(senderInfo);
            senderMessage.appendChild(senderSMS);
            senderImg.appendChild(image);
            sender.appendChild(senderImg);
            sender.appendChild(senderMessage);

            padre.appendChild(sender);
        }
    });
}

function fct_showMessages(channelname) {

    chat_content.innerHTML = "";

    //Poner el nombre del canal como título
    let titleNode = document.getElementById("channel-name");
    let title = document.createElement("h2");

    titleNode.innerHTML = "";

    title.setAttribute("id", "title");
    title.textContent = channelname;
    titleNode.appendChild(title);

    if (channelname == "#General") {
        let username = "Emperador Palpatine";
        let imgAvatar = "img/palpatine.jpg";
        let dateTime = fct_formatDate();
        let text1 = "Bienvenido a GeekHubs Academy";
        let text2 = "Este curso será lo más";
        let text3 = "Vamos a aprender muchas cosas del desarollo Web"
        if (channel.messages.length == 0) {
            let sms1 = new Message(username, imgAvatar, dateTime, text1);
            /*sms1.user = username;
            sms1.avatar = imgAvatar;
            sms1.dateInfo = dateTime;
            sms1.textSMS = text1;*/
            let sms2 = new Message(username, imgAvatar, dateTime, text2);
            /*sms2.user = username;
            sms2.avatar = imgAvatar;
            sms2.dateInfo = dateTime;
            sms2.textSMS = text2;*/
            let sms3 = new Message(username, imgAvatar, dateTime, text3);
            /*sms3.user = username;
            sms3.avatar = imgAvatar;
            sms3.dateInfo = dateTime;
            sms3.textSMS = text3;*/
            channel.addMessage(sms1);
            channel.addMessage(sms2);
            channel.addMessage(sms3);
        }
    }

    fct_paintMessages(chat_content, channel);
}










/* COMIENZA EL JAVASCRIPT */
let channel;
let channels = [];
let chat_content = document.getElementById("chat");
fct_paintChannels();
class Message {
    constructor(name, avatar, sendDateTime, messageText) {
        this.name = name;
        this.avatar = avatar;
        this.sendDateTime = sendDateTime;
        this.messageText = messageText;
    }
}

class Channel {
    constructor(name) {
        this.name = name;
        this.messages = [];
    }

    addMessage(message) {
        /* let message = new Message(name, avatar, sendDateTime, messageText); */
        this.messages.push(message);
    }
}

class Chat {
    constructor () {
        this.channels = [];
    }

    addChannel(name) {
        let channel = new Channel(name);
        this.channels.push(channel);
    }

     getChannels() {
        return this.channels;
    }
/*
    getChannel(channelID) {
        if(channelID < this.channels.length) {
            return this.channels[channelID];
        } else {
            return null;
        }
    } */
}

/* function fct_fill_general (channel_name) {

    chat.channels[0].messages = [
        "Bienvenidos Geeks a GeeksHub Academy!!!",
        "Espero que disfruteis",
        "Un gusto",
        "1",
        "4",
        "523",
        "ytjfn",
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque magni culpa, dicta cum laudantium laboriosam libero fugit omnis vitae modi, quisquam atque commodi amet, architecto ad neque perferendis explicabo aspernatur.",
        "lbmdbgfvh",
    ];

    chat.channels[0].messages.forEach(sms => {
        chat.channels[0].addMessage(new Message("Emperador Palpatine","img/palpatine.jpg",fct_formatDate(),sms));
    });
} */

//Da formato a la fecha y a la hora para luego agregarlo al mensaje
function fct_formatDate () {
    let date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let hour = date.getHours();
    let min = date.getMinutes()<10?"0"+date.getMinutes():date.getMinutes(); //Agrego un cero a los minutos inferiores a 10.

    return (day + "/" + month + " " + hour + ":" + min);
}

//Crea estructura del mensaje de chat del Contact
function fct_createMessages_Contact(parent) {

    chat.channels[0].messages.forEach(element => {
        let contact = document.createElement("div");
        contact.setAttribute("class","contact");

        let contactImg = document.createElement("div");
        contactImg.setAttribute("class","contact-img");

        let sms = document.createElement("div");
        sms.setAttribute("class","msg");

        let contactInfo = document.createElement("div");
        contactInfo.setAttribute("class","contact-info");

        let userNode = document.createElement("div");
        userNode.setAttribute("class","username");

        let contactTime = document.createElement("div");
        contactTime.setAttribute("class","contact-time");

        let contactSMS = document.createElement("div");
        contactSMS.setAttribute("class","contact-msg");

        let image = document.createElement("img");
        image.setAttribute("src",element.avatar);
    
        let username = document.createElement("h5");
        username.textContent = element.name;
    
        let time = document.createElement("span");
        time.textContent = element.sendDateTime;
        let message = document.createElement("p");
        message.textContent = element.messageText;

        contactSMS.appendChild(message);
        contactTime.appendChild(time);
        userNode.appendChild(username);
        contactInfo.appendChild(userNode);
        contactInfo.appendChild(contactTime);
        sms.appendChild(contactInfo);
        sms.appendChild(contactSMS);
        contactImg.appendChild(image);
        contact.appendChild(contactImg);
        contact.appendChild(sms);

        parent.appendChild(contact);

    })




}


//Genera un popup para agregar un nuevo canal
function fct_callpopup() {
    document.querySelector("#popup").style.display = "flex";
}

//Cierra el popup en caso de que no se quiera introducir nuevo canal
function fct_closeWindow() {
    document.querySelector("#popup").style.display = "none";
}

//Abre el canal que se ha seleccionado desde la lista
function fct_openChannel(channel) {
    let title = document.getElementById("channel-name");

    document.getElementById("chat").innerHTML = "";

    let chat_content = document.getElementById("chat");


    chat.channels.forEach(element => {
        if(channel == element.name) {
            title.innerHTML = "";

            let titleNode = document.createElement("h2");
            
            titleNode.setAttribute("id","title");
            title.appendChild(titleNode);
            titleNode.textContent = channel;

            /* if(channel == "#General") {
                fct_fill_general(channel);
            } */

            fct_createMessages_Contact(chat_content, channel);
        }
    });

    
}

//Muestra el listado de canales
function fct_displayChannelList (chat) {

    let listado = document.getElementById("list");
    listado.value = "";

    if(chat.channels.length == 0) {
        chat.addChannel("#General");
    }

    listado.innerHTML = "";

    chat.channels.forEach(element => {
        let name = element.name;

        //Elimina los posibles espacios en blanco para agregar el nombre sin ellos al atributo id
        if (name.indexOf(' ') > 0) {
            name = name.replace(/\s+/g, '');
        } 

        let liNode = document.createElement("li");
        let aNode = document.createElement("a");
        let txtNode = document.createTextNode(element.name);

        aNode.setAttribute("href","#");
        aNode.setAttribute("id",name);
        aNode.setAttribute("onclick","fct_openChannel(\"" + name + "\")");

        aNode.appendChild(txtNode);
        liNode.appendChild(aNode);
        listado.appendChild(liNode);
    });
}

function fct_addNewChannel() {
    chat.addChannel(document.getElementById("createChannel").value);

    fct_displayChannelList(chat);

    //Cierra el popup
    fct_closeWindow();

    //Limpia el valor del textbox dentro del popup
    document.getElementById("createChannel").value = "";

}

let chat = new Chat();
fct_displayChannelList(chat);


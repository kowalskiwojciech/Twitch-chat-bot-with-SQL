const tmi = require('tmi.js');

twitchclient.on("message",(channel,context, message, self) =>{
    username = context["display-name"];
    console.log(username);
    console.log(message);
    if (message.toLowerCase() == settings.Prefix +"hej"){
        twitchclient.say(channel,"hej")
    };
})
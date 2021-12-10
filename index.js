const tmi = require('tmi.js');
const settings = require('./settings.json');
const mysql = require('mysql');
const { NULL } = require('mysql/lib/protocol/constants/types');

let username = "";

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "test",
    connectionLimit: 10
})

const twitchclient = new tmi.client(
    {
        options: {debug:false},
        connection: {
            secure:true,
            reconnect:true
        },
        identity:{
            username:settings.TwitchUser,
            password:settings.TwitchAuth
        },
        channels: ["YOUR CHANNEL"]
    }
)

twitchclient.connect();

twitchclient.on("connected",(address,port) =>{
    console.log("Twitch bot wystartował na porcie: " + port);
})

twitchclient.on("message",(channel,context, message, self) =>{
    username = context["display-name"];
    if (message.toLowerCase() == settings.Prefix +"hej"){
        twitchclient.say(channel,"hej")
    };
})

twitchclient.on("message",(channel,context, message, self) =>{
    username = context["display-name"];
    let insertQuery = 'INSERT INTO test(id, user) VALUES(?, ?)';
    let query = mysql.format(insertQuery,['$1',username]);
    console.log(username);
    console.log(message);
    pool.query(query, (err, result, fields) => {
        console.log(result);
        if (err) {
        return console.error(err);
         }
         return result;
    } 
);

});

twitchclient.on('message', (channel, context, message, self) => {
    console.log(context);
    if (context["custom-reward-id"] === "YOUR CUSTON REWARD CODE") {
        twitchclient.say(channel,"!sr" + message)
    }
})
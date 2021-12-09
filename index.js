const tmi = require('tmi.js');
const settings = require('./settings.json');
const {createPool} = require('mysql');
let username = "";

const pool = createPool({
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
        channels: ["wojtiwojciech"]
    }
)

twitchclient.connect();

twitchclient.on("connected",(address,port) =>{
    console.log("Twitch bot wystartował na porcie: " + port);
})

twitchclient.on("message",(channel,context, message, self) =>{
    username = context["display-name"];
    console.log(username);
    if (username == "wojtiwojciech", message.toLowerCase() == settings.Prefix +"hej"){
        twitchclient.say(channel,"hej")
    };
})

twitchclient.on("message",(channel,context, message, self) =>{
    username = context["display-name"];
    console.log(username);
    pool.query("INSERT INTO test VALUES (NULL," + username + ")", function(err, result, fields) {
        if (err) {
            return console.log(err);
        }
        return console.log(result);
    })
})
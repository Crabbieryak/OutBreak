const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));

let players = {};
let squads = {};



const outposts=[

"Park",

"Mall",

"Hospital",

"School"

];




function spawnDrop(){


let rarityRoll=Math.random();


let rarity="Common";

let reward=100;



if(

rarityRoll<0.02

){

rarity="Legendary";

reward=1500;

}


else if(

rarityRoll<0.10

){

rarity="Epic";

reward=1000;

}


else if(

rarityRoll<0.30

){

rarity="Rare";

reward=500;

}



let random=outposts[

Math.floor(

Math.random()

*

outposts.length

)

];



io.emit(

"drop",

{

name:random,

rarity:rarity,

reward:reward

}

);



console.log(

"Drop spawned at "

+

random

);


}




setInterval(

spawnDrop,

3600000

);



// FOR TESTING

setTimeout(

spawnDrop,

5000

);




io.on("connection",(socket)=>{


socket.on("move",(data)=>{


players[socket.id]=data;

io.emit(

"players",

players

);


});





socket.on(

"createSquad",

(data)=>{


squads[data.leader]={


name:data.name,

leader:data.leader,

members:[data.leader]


};



io.emit(

"squads",

squads

);


}

);






socket.on(

"invite",

(data)=>{


Object.keys(players)

.forEach((id)=>{


if(

players[id].username===data.to

)

{


io.to(id)

.emit(

"invite",

{

from:data.from,

squad:data.squad

}

);


}


});


}

);







socket.on(

"requestJoin",

(data)=>{


Object.keys(players)

.forEach((id)=>{


if(

players[id].username===data.leader

)

{


io.to(id)

.emit(

"joinRequest",

{

player:data.player

}

);


}


});


}

);







socket.on(

"approveJoin",

(data)=>{


let squad=squads[data.leader];


if(!squad)return;



if(

squad.members.length>=5

)

return;



if(

!squad.members.includes(

data.player

)

){

squad.members.push(

data.player

);

}



io.emit(

"squads",

squads

);


}

);






socket.on(

"disconnect",

()=>{


delete players[socket.id];


io.emit(

"players",

players

);


}


);


});



const PORT = process.env.PORT || 3000;

server.listen(

PORT,

"0.0.0.0",

()=>{

console.log(

"Outbreak running on port",

PORT

);

}

);
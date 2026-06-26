socket.on("players",(players)=>{

document.getElementById("playersList").innerHTML="";


Object.keys(players).forEach((id)=>{

let p = players[id];



let div = document.createElement("div");

div.className = "playerItem";

div.innerHTML = p.username;

div.title = "Click to invite";

document.getElementById(

"playersList"

).appendChild(div);




if(

p.username===username

)

return;




if(

!otherPlayers[id]

){

otherPlayers[id] =

L.marker(

[

p.lat,

p.lon

]

)

.addTo(

map

)

.bindPopup(

p.username

);

}



else{

otherPlayers[id]

.setLatLng(

[

p.lat,

p.lon

]

);

}



});



Object.keys(otherPlayers).forEach((id)=>{


if(

!players[id]

){

map.removeLayer(

otherPlayers[id]

);



delete otherPlayers[id];

}


});


});
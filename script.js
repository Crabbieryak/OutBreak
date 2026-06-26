window.squad = null;
window.socket = io();

let greenIcon = L.icon({

iconUrl:
'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png',

shadowUrl:
'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',

iconSize:[25,41],

iconAnchor:[12,41],

popupAnchor:[1,-34]

});



let whiteIcon = L.icon({

iconUrl:
'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-grey.png',

shadowUrl:
'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',

iconSize:[25,41],

iconAnchor:[12,41],

popupAnchor:[1,-34]

});
let map;
let player;

let initialized = false;

let otherPlayers = {};

let timers = {};

navigator.geolocation.watchPosition((position)=>{

let lat = position.coords.latitude;
let lon = position.coords.longitude;

if(!initialized){

let level =

Math.floor(

xp/500

)

+

1;



generateOutposts(

level,

lat,

lon

);

}

if(!initialized){


map = L.map('map').setView(

[lat,lon],

16

);



L.tileLayer(

'https://tile.openstreetmap.org/{z}/{x}/{y}.png',

{

maxZoom:19

}

)

.addTo(map);




player = L.marker(

[lat,lon]

)

.addTo(map)

.bindPopup(username);




outposts.forEach((outpost)=>{


let owned = capturedOutposts.includes(

outpost.name

);



let color = owned

?

'blue'

:

'red';




outpost.circle =

L.circle(

[

outpost.lat,

outpost.lon

],

{

radius:80,

color:color,

fillOpacity:0.3

}

)

.addTo(

map

);



outpost.circle.bindPopup(

outpost.name

);



timers[

outpost.name

]=0;



});





setInterval(()=>{


coins +=

capturedOutposts.length

*

5;



document.getElementById(

"coins"

)

.innerHTML=

"Coins : "

+

coins;



save();



},60000);



initialized=true;

drawDrop();

}




player.setLatLng(

[lat,lon]

);



socket.emit(

"move",

{

username,

lat,

lon

}

);





outposts.forEach((outpost)=>{


if(

capturedOutposts.includes(

outpost.name

)

)

return;




let d = Math.sqrt(


(lat-outpost.lat)

*

(lat-outpost.lat)



+



(lon-outpost.lon)

*

(lon-outpost.lon)



);




if(

d<0.0008

){



timers[

outpost.name

]++;




outpost.circle.bindPopup(


outpost.name


+

"<br>Capturing "


+

timers[

outpost.name

]


+

"/10"

);





if(

timers[

outpost.name

]

>=10

){



capturedOutposts.push(

outpost.name

);



xp +=100;
missions.forEach((m)=>{

if(

m.type==="capture"

)

{

m.progress++;

}

});


updateMissions();



save();




document.getElementById(

"xp"

)

.innerHTML=


"XP : "


+

xp;




outpost.circle.setStyle(

{

color:'blue'

}

);



outpost.circle.bindPopup(


outpost.name


+

"<br>Owned"


);



alert(

"Captured "

+

outpost.name

);



}



}



else{


timers[

outpost.name

]=0;


}



});



});







socket.on(

"players",

(players)=>{

document.getElementById(

"playersList"

).innerHTML="";



Object.keys(players)

.forEach((id)=>{


let p=players[id];



let div=document.createElement(

"div"

);



div.className=

"playerItem";



div.innerHTML=

p.username;



document.getElementById(

"playersList"

)

.appendChild(

div

);




if(

p.username===username

)

return;





let isSquadmate=false;



if(

window.squad

)

{

isSquadmate=

squad.members.includes(

p.username

);

}



let popupText=

p.username;



if(

isSquadmate

)

{

popupText+=

"<br>🟢 Squadmate";

}




if(

!otherPlayers[id]

)

{


let icon = whiteIcon;

if(

squad

&&

squad.members.includes(

p.username

)

)

{

icon = greenIcon;

}



otherPlayers[id]=

L.marker(

[

p.lat,

p.lon

],

{

icon:icon

}

)

.addTo(

map

)

.bindPopup(

popupText

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


let icon = whiteIcon;


if(

squad

&&

window.squad &&
window.squad.members.includes(

p.username

)

)

{

icon = greenIcon;

}



otherPlayers[id]

.setIcon(

icon

);



otherPlayers[id]

.bindPopup(

popupText

);


}



});



Object.keys(

otherPlayers

)

.forEach((id)=>{


if(

!players[id]

)

{


map.removeLayer(

otherPlayers[id]

);



delete otherPlayers[id];


}



});



});
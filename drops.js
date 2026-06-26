let dropCircle = null;
let pendingDrop = null;


socket.on("drop",(drop)=>{

console.log("Drop received");
console.log(drop);

pendingDrop = drop;

drawDrop();

});



function drawDrop(){

if(!map) return;

if(!pendingDrop) return;


if(dropCircle){

map.removeLayer(dropCircle);

}


let place = outposts.find(

o => o.name === pendingDrop.name

);

if(!place) return;



dropCircle = L.circle(

[place.lat, place.lon],

{

radius:120,

color:"gold",

fillColor:"yellow",

fillOpacity:0.5

}

)

.addTo(map)

.bindPopup(

"📦 Supply Drop<br>"+

pendingDrop.rarity+

"<br>"+

pendingDrop.reward+

" Coins"

);

}
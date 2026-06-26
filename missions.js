let missions=[

{

name:"Capture 3 Outposts",

goal:3,

progress:0,

reward:250,

type:"capture"

},

{

name:"Join A Squad",

goal:1,

progress:0,

reward:150,

type:"squad"

},

{

name:"Capture 1 Outpost",

goal:1,

progress:0,

reward:100,

type:"capture"

}

];




function updateMissions(){


let html="";


missions.forEach((m)=>{


let done =

m.progress>=m.goal;




html+=


"<div style='margin-bottom:15px'>"+


"<b>"+

m.name+

"</b><br>"+



(done?"✅ ":"")


+


m.progress


+


"/"


+


m.goal


+


"<br>"


+


"🪙 "


+


m.reward


+


" Coins"


+


"</div>";



});




document.getElementById(

"missions"

)

.innerHTML=

html;



}



updateMissions();
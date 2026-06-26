let squad = null;
let pendingInvite = null;
let pendingPlayer = null;


function updateSquad(){

if(!squad){

document.getElementById("squadInfo").innerHTML =
"No Squad";

document.getElementById("createSquad").innerHTML =
"Create Squad";

return;

}


document.getElementById("squadInfo").innerHTML =

"<b>"+squad.name+"</b><br><br>"+

"Leader : "+squad.leader+

"<br><br>"+

squad.members.join("<br>");



document.getElementById("createSquad").innerHTML =
"Leave Squad";

}



document.getElementById("createSquad").onclick=()=>{


if(squad){

squad=null;

updateSquad();

return;

}


let name=prompt("Squad Name");

if(!name)return;


socket.emit(

"createSquad",

{

leader:username,

name:name

}

);


};




document.addEventListener(

"click",

(e)=>{


if(

e.target.classList.contains(

"playerItem"

)

){


if(!squad)return;


let person=e.target.innerHTML;


if(person===username)return;



socket.emit(

"invite",

{

from:username,

to:person,

squad:squad.name

}

);


alert(

"Invite sent"

);


}



}

);





socket.on(

"invite",

(data)=>{


pendingInvite=data;



document.getElementById(

"invitePanel"

).style.display="block";



document.getElementById(

"inviteText"

).innerHTML=

data.from+

" invited you to "+

data.squad;


}

);






document.getElementById(

"acceptInvite"

).onclick=()=>{


socket.emit(

"requestJoin",

{

leader:pendingInvite.from,

player:username

}

);



document.getElementById(

"invitePanel"

).style.display="none";


};






document.getElementById(

"rejectInvite"

).onclick=()=>{


document.getElementById(

"invitePanel"

).style.display="none";


};






socket.on(

"joinRequest",

(data)=>{


pendingPlayer=data.player;



document.getElementById(

"requestPanel"

).style.display="block";



document.getElementById(

"requestText"

).innerHTML=

data.player+

" wants to join";


}

);






document.getElementById(

"approveRequest"

).onclick=()=>{


socket.emit(

"approveJoin",

{

leader:username,

player:pendingPlayer

}

);



document.getElementById(

"requestPanel"

).style.display="none";


};






document.getElementById(

"denyRequest"

).onclick=()=>{


document.getElementById(

"requestPanel"

).style.display="none";


};






socket.on(

"squads",

(data)=>{


squad=null;



Object.values(

data

)

.forEach((s)=>{


if(

s.members.includes(

username

)

)

{

squad=s;

}


});



updateSquad();



}

);



updateSquad();
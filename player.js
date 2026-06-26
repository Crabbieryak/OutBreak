let username = localStorage.getItem(

"username"

);



if(

!username

){

username = prompt(

"Enter Username"

);



localStorage.setItem(

"username",

username

);


}



let xp = 0;

let coins = 0;

let capturedOutposts = [];



load();



document.getElementById(

"username"

).innerHTML=

username;



document.getElementById(

"xp"

).innerHTML=

"XP : "

+

xp;



document.getElementById(

"coins"

).innerHTML=

"Coins : "

+

coins;
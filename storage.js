function save(){

localStorage.setItem(

"xp",

xp

);

localStorage.setItem(

"coins",

coins

);

localStorage.setItem(

"captured",

JSON.stringify(capturedOutposts)

);

}



function load(){

xp=

parseInt(

localStorage.getItem(

"xp"

)

)

||

0;



coins=

parseInt(

localStorage.getItem(

"coins"

)

)

||

0;



capturedOutposts=

JSON.parse(

localStorage.getItem(

"captured"

)

)

||

[];


}
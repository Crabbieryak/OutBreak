let outposts=[];

function generateOutposts(level,lat,lon){

outposts=[];


let radius=300;


if(level>=5)
radius=600;


if(level>=10)
radius=1000;


if(level>=15)
radius=3000;



let names=[

"Hospital",

"School",

"Mall",

"Park"

];



for(let i=0;i<4;i++){


let angle=

(i/4)

*

Math.PI

*

2;



let distance=


100+


i*


60;





let newLat=


lat+


(

distance


*


Math.cos(angle)

)


/


111320;





let newLon=


lon+


(

distance


*


Math.sin(angle)

)


/


111320;






outposts.push({


name:names[i],


lat:newLat,


lon:newLon


});


}



}
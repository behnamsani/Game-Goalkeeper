const ball = document.querySelector(".ball");
const input = document.querySelector("#input");
const Square = document.querySelector("#Square");
const human = document.querySelector("#human");
const startTxt = document.querySelector("#start");
const speed = document.querySelector("#speed");
const section = document.querySelector(".section");
const nameG= document.querySelector("#name");
const score = document.querySelector(".score");

let posMY;
let posMX;
let down =0;
let up =0;
let dKey =false;
let uKey =false;
let translateX=0;
let translateY=0;
let moveX=0;
let moveY=0;
let flagR=true;
let flagD=true;
let start = true;
let posStart = true;
let speedBall;
let time;
const speedHandel=10;
let stepBall=1;
const limitX=258;
const limitY=288;
const limit=240;
let nameGamer;
let scoreGame = 0;

human.style.transform=`translate(0px,1px)`;




input.addEventListener("keydown", mHuman);
input.addEventListener("click", move);
input.addEventListener("click", ()=>{
    Square.style.border="solid 2px green";
    startTxt.style.display="none";
});
Square.addEventListener("mousemove", (event) => {
     posMX = event.clientX; // Gets Mouse X
     posMY = event.clientY; // Gets Mouse Y
     translateY=posMY-positionStartLimit;
    if(posMY<=15){
        translateY=-positionStartLimit;
        posMY=8;
    }
    if(posMY>=240){
        translateY=240-positionStartLimit;
        posMY=240;
    }
    human.style.transform=`translate(${translateX}px,${translateY}px)`;
});

Square.addEventListener("touchmove",(event)=>{
        x = event.touches[0].clientX;
        y = event.touches[0].clientY;
        console.log(positionStartLimit);
        console.log(y);
     translateY=y-positionStartLimit;
    if(y<=15){
        translateY=-positionStartLimit;
        y=8;
    }
    if(y>=240){
        translateY=240-positionStartLimit;
        y=240;
    }
    console.log(`y : ${translateY}`)
    human.style.transform=`translate(${translateX}px,${translateY}px)`;
});


let positionStart =Math.round(Math.random()*240);

const positionStartLimit = positionStart;
ball.style.top=`${positionStart}px`;
human.style.top=`${positionStart}px`;



function again(){
    location.reload();
}


function mHuman(e) {
    if(e.key==="ArrowDown"&&down<=limit){
        if(uKey===true){
            down=up;
            if(down==1){
                down=0;
            }
            uKey=false;
        }
        down=down+speedHandel;
        if(down>limit){
            down=down-speedHandel;
        }
        human.style.transform=`translate(${translateX}px,${down}px)`;
        dKey=true;
        translateY=down;
        if(translateY===limit){
            Square.style.borderBottom="solid 2px red";
        }else{
            Square.style.borderBottom="solid 2px green";
        }
        if(translateY===0){
            Square.style.borderTop="solid 2px red";
        }else{
            Square.style.borderTop="solid 2px green";
        }
    }
    if(e.key==="ArrowUp"&&up>=0){
        if(dKey===true){
            up=down;
            dKey=false;
        }
        up=up-speedHandel;
        if(up<=0){
            up=1;
        } 
        human.style.transform=`translate(${translateX}px,${up}px)`;
        uKey=true;
        translateY=up;
        if(translateY===limit){
            Square.style.borderBottom="solid 2px red";
        }else{
            Square.style.borderBottom="solid 2px green";
        }
        if(translateY===1){
            Square.style.borderTop="solid 2px red";
        }else{
            Square.style.borderTop="solid 2px green";
        }
    }
}

function moveBall(){
        if(human.style.transform === "translate(0px)"){
            human.style.transform="translate(0px,1px)";
        }
        const humanPosition = +human.style.transform.split("translate(0px, ")[1].split("px)")[0];
        if(moveX<-25 && flagR===false ){
            moveX=-30;
            moveY=moveY;
            Square.style.border="solid 2px red";
            startTxt.innerHTML=`${nameGamer} You lost`;
            startTxt.style.color="red";
            startTxt.style.fontSize="25px";
            startTxt.style.display="block";
            startTxt.style.textAlign="center";
            startTxt.style.right="0";
            startTxt.style.left="0";
            startTxt.style.top="0";
            startTxt.style.bottom="0";
            startTxt.style.transition="all 1000ms";
            start = false;
            if(start===false){
                const startAgain = document.createElement("button");
                startAgain.id="startAgain";
                startAgain.innerText="startAgain";
                startAgain.style.color="green";
                startAgain.style.marginTop="20px";
                startAgain.style.width="100%";
                startAgain.style.height="35px";
                startAgain.style.transition="all 1000ms";
                section.appendChild(startAgain);
            }
            startAgain.addEventListener("click",again);
            clearInterval(time); 
        }

        
        if(moveX<=limitX && flagR===true && start===true){
            moveX=moveX+stepBall;
        }else{
            moveX=moveX-stepBall;
            flagR=false;
        }

        if(moveY<=(limitY-positionStart) && flagD === true && start===true){
            moveY=moveY+stepBall;
        }else{
            moveY=moveY-stepBall;
            flagD=false;
        }

        if(moveY<=-positionStartLimit && flagD === false && start===true){
            moveY=moveY+stepBall;
            flagD=true;
        }
        
        for(let i =humanPosition-5; i<=humanPosition+55; i++){
            if(i===moveY && moveX===0){
                scoreGame=scoreGame+1;
                if(scoreGame%5===0){

                    if(speedBall<=1){
                        stepBall+=1;
                    }
                    if(speedBall>1){
                        speedBall-=3;
                        if(speedBall<=1){
                            speedBall=1;
                            stepBall+=1;
                        }
                    }
                }
                console.log(speedBall);
                if(flagD===false&&flagR===false){
                    moveX=moveX+stepBall;
                    moveY=moveY-stepBall;
                    flagR=true;
                    flagD=false;
                }
                if(flagD===true&&flagR===false){
                    moveX=moveX+stepBall;
                    moveY=moveY+stepBall;
                    flagR=true;
                    flagD=true;
                }
            }
        }
        const score2 = document.querySelector("#scoreGames");
        score2.innerHTML=`score : ${scoreGame}`;
        ball.style.transform=`translate(${moveX}px,${moveY}px`;
}


function move(){

    const speedChoose = speed.value;
    if(speedChoose==="very slow"){
        speedBall=40;
    }else if(speedChoose==="slow"){
        speedBall=25;
    }else if(speedChoose==="default"){
        speedBall=15;
    }else if(speedChoose==="fast"){
        speedBall=8;
    }else if(speedChoose==="very fast"){
        speedBall=1;
    }
    time = setInterval(moveBall, speedBall);
    input.setAttribute("disabled","true");
    score.style.border="2px solid darkmagenta";
    nameGamer = nameG.value;
    const span =  document.createElement("span");
    span.innerHTML=`${nameGamer}`;
    span.style.fontSize="30px";
    span.style.marginLeft="20px";
    score.appendChild(span);

    const h2 =  document.createElement("h2");
    h2.id="scoreGames"
    h2.innerHTML=`score : ${scoreGame}`;
    h2.style.fontSize="30px";
    h2.style.marginLeft="20px";
    score.appendChild(h2);
}


// function moving(e){
//     e.preventDefault;
// //----------------------------------------Right-----------------------------------------
//     if(e.key==="ArrowRight"&&right<=limitX){
//         if(lKey===true){
//             right=left;
//             lKey=false;
//         }
//         right=2+right;
        
//         if(right>limitX){
//             right=right-2;
//         }
//         ball.style.transform=`translate(${right}px,${translateY}px)`;
//         console.log(ball.style.transform , right);
//         rKey=true;
//         translateX=right;
//         if(translateX===limitX){
//             Square.style.borderRight="solid 2px red";
//         }else{
//             Square.style.borderRight="solid 2px green";
//         }
//         if(translateX===0){
//             Square.style.borderLeft="solid 2px red";
//         }else{
//             Square.style.borderLeft="solid 2px green";
//         }
//     }
//     //--------------------------------Left-------------------------------------------
//     if(e.key==="ArrowLeft"&&left>=0){
//         if(rKey===true){
//             left=right;
//             rKey=false;
//         }
//         left=left-2;
//         if(left<0){
//             left=0;
//         }
//         ball.style.transform=`translate(${left}px,${translateY}px)`;
//         console.log(ball.style.transform , left);
//         lKey=true;
//         translateX=left;
//         if(translateX===limitX){
//             Square.style.borderRight="solid 2px red";
//         }else{
//             Square.style.borderRight="solid 2px green";
//         }
//         if(translateX===0){
//             Square.style.borderLeft="solid 2px red";
//         }else{
//             Square.style.borderLeft="solid 2px green";
//         }
//     }
//     //-----------------------------Down---------------------------------------------
//     if(e.key==="ArrowDown"&&down<=limitY){
//         if(uKey===true){
//             down=up;
//             uKey=false;
//         }
//         down=down+2;
//         if(down>limitY){
//             down=down-2;
//         }
//         ball.style.transform=`translate(${translateX}px,${down}px)`;
//         console.log(ball.style.transform , down);
//         dKey=true;
//         translateY=down;
//         if(translateY===limitY){
//             Square.style.borderBottom="solid 2px red";
//         }else{
//             Square.style.borderBottom="solid 2px green";
//         }
//         if(translateY===0){
//             Square.style.borderTop="solid 2px red";
//         }else{
//             Square.style.borderTop="solid 2px green";
//         }
//     }
//     //----------------------------------Up----------------------------------------------------
//     if(e.key==="ArrowUp"&&up>=0){
//         if(dKey===true){
//             up=down;
//             dKey=false;
//         }
//         up=up-2;
//         if(up<0){
//             up=0;
//         } 
//         ball.style.transform=`translate(${translateX}px,${up}px)`;
//         console.log(ball.style.transform , up);
//         uKey=true;
//         translateY=up;
//         if(translateY===limitY){
//             Square.style.borderBottom="solid 2px red";
//         }else{
//             Square.style.borderBottom="solid 2px green";
//         }
//         if(translateY===0){
//             Square.style.borderTop="solid 2px red";
//         }else{
//             Square.style.borderTop="solid 2px green";
//         }
//     }
// }



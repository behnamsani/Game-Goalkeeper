const ball = document.querySelector(".ball");
const input = document.querySelector("#input");
const Square = document.querySelector("#Square");
const human = document.querySelector("#human");


input.addEventListener("keydown", mHuman);
input.addEventListener("click", move);
input.addEventListener("click", ()=>{
    Square.style.border="solid 2px green";
});


const speedHandel=10;
const speedBall=1;
let right =0;
let left =0;
let down =0;
let up =0;
let rKey =false;
let lKey =false;
let dKey =false;
let uKey =false;
let translateX=0;
let translateY=0;
let moveX=0;
let moveY=0;
const limitX=258;
const limitY=288;
const limit=240;
let flagR=true;
// let flagL=false;
// let flagU=false;
let flagD=true;
let start = true;
human.style.transform=`translate(0px,1px)`;
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
        const humanPosition = +human.style.transform.split("translate(0px, ")[1].split("px)")[0];

        if(moveX<=limitX && flagR===true && start===true ){
            moveX=moveX+speedBall;
        }else{
            moveX=moveX-speedBall;
            flagR=false;
        }

        if(moveX<-25 && flagR===false ){
            moveX=-30;
            moveY=moveY;
            Square.style.border="solid 2px red";
            console.log("you lose");
            start = false;
        }

        if(moveY<=limitY && flagD === true && start===true){
            moveY=moveY+speedBall;
        }else{
            moveY=moveY-speedBall;
            flagD=false;
        }

        if(moveY>=0 && flagD === false && start===true){
            moveY=moveY-speedBall;
        }else{
            moveY=moveY+speedBall;
            flagD=true;
        }
        
        
        
        for(let i =humanPosition; i<=humanPosition+50; i+=speedBall){
            if(i==moveY && moveX==0){
                if(flagD===false&&flagR===false){
                    moveX=moveX+speedBall;
                    moveY=moveY-speedBall;
                    flagR=true;
                    flagD=false;
                }
                if(flagD===true&&flagR===false){
                    moveX=moveX+speedBall;
                    moveY=moveY+speedBall;
                    flagR=true;
                    flagD=true;
                }
            }
        }
        

    

        ball.style.transform=`translate(${moveX}px,${moveY}px`;
}


function move(){
    setInterval(moveBall, 8);

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



let boxes = document.querySelectorAll(".box");
let reset = document.querySelector("#reset");
let newGame = document.querySelector("#Newgame");
let msgBox = document.querySelector(".msgbox");
let msg = document.querySelector("p");

let turnO= true //playerX,playerO
let count=0;

const winPatterns =[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [6,4,2] 
];

const restart =() =>{
    let turnO = true;
    count=0;
    enableBoxes();
    msgBox.classList.add("hide");
}


boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        if(turnO){
            box.innerText="O";
            box.classList.add("O");
            turnO = false;
        }else{
            box.innerText="X";
            box.classList.add("X");
            turnO = true;
        }
        box.disabled = true;
        count++;

        let isWinner=checkWinner();

        if (count === 9 && !isWinner){
            gameDraw();
        }
    })
})

const gameDraw =()=>{
    msg.innerText="this game is draw";
    msgBox.classList.remove("hide");
    disableBoxes();
}

const disableBoxes = () => {
    for(let box of boxes){
        box.disabled = true;
    }
}

const enableBoxes = () => {
    for(let box of boxes){
        box.disabled = false;
        box.innerText="";
        box.classList.remove("O","X");
    }
}

const showWinner = (winner) =>{
    msg.innerText=`Congratulations , winner is ${winner}`
    msgBox.classList.remove("hide");
    disableBoxes();
}

const checkWinner= () =>{
    for(let pattern of winPatterns){
        let pattval1 = boxes[pattern[0]].innerText;
        let pattval2 = boxes[pattern[1]].innerText;
        let pattval3 = boxes[pattern[2]].innerText;

        if(pattval1 !="" && pattval2 != "" && pattval3 !="") {
            if(pattval1 === pattval2 && pattval2 === pattval3){
                showWinner(pattval1);
            }
        }
    }
}

newGame.addEventListener("click",restart);
reset.addEventListener("click",restart);
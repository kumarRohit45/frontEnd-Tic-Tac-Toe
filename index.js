const gameInfo = document.querySelector(".game-info");
const boxes = document.querySelectorAll(".box");
const newGame  = document.querySelector(".new-game");

let currentPlayer ;
let gridGame ;
const winningPosition = [

    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]

];

//let's create a function to initialize the game
function initGame(){
  currentPlayer = "X";
  gridGame = ["","","","","","","","",""];
  // ui pr empty bhi krn padega boxes ko
  boxes.forEach((box,index)=>{
    box.innerText = "";
    boxes[index].style.pointerEvents = "all";
    //initialze box with css properties again
    // box.classList = `box box${index+1}`;
    box.classList.remove("win");
  })
  newGame.classList.remove("active");
  gameInfo.innerText = `current player - ${currentPlayer}`;
}
initGame();

function swapTurn(){
    if(currentPlayer === "X"){
        currentPlayer ="O";
    }
    else{
        currentPlayer = "X";
    }
//ui update
    gameInfo.innerText = `Current Player - ${currentPlayer}`
}


function checkGameOver(){
  let answer = "";
    winningPosition.forEach((position)=>{
//         /// all 3 boxes should be non empty and exactly same in value
        if((gridGame[position[0]] !== "" && gridGame[position[1]] !== "" && gridGame[position[2]] !== "")
         && (gridGame[position[0]] === gridGame[position[1]]) &&  (gridGame[position[1]] === gridGame[position[2]])){

            // check if winner is x or 0
            if(gridGame[position[0]] === "X")
                answer = "X";
            else
                answer = "O";
            
             // disable pointer events
    boxes.forEach((box) => {
        box.style.pointerEvents = "none";
    })
        //now we know x/0 is a winner 
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
    });


         // it means we have a winner
         if(answer != ""){
            gameInfo.innerText = `Winner Player - ${answer}`;
            newGame.classList.add("active");
            return;
        }

   
// let's check whether ther is a tie or not
    let fillcount = 0;
    gridGame.forEach((box) =>{
        if(box!== ""){
            fillcount++;
        }
    })
    /// board is filled , game is tie;
    if(fillcount === 9){
        gameInfo.innerText= "Game Tied";
        newGame.classList.add("active");
    }
}

function handleClick(index){
    if(gridGame[index] === ""){
        boxes[index].innerText = currentPlayer;
        gridGame[index] = currentPlayer;
        boxes[index].style.pointerEvents = 'none';

        swapTurn();
        checkGameOver();
    }
}

boxes.forEach((box,index) => {
        box.addEventListener("click",()=>{
          handleClick(index);
        });

        })

        newGame.addEventListener("click",initGame);



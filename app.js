//access to the elements
const table=document.querySelector(".table");
const gameInfo=document.querySelector(".table #game-info");
const circleP=document.querySelector("#circleP");
const crossP=document.querySelector("#crossP");



//scores
let _circle=0;
let _cross=0;


//counter
let counter=0

//plsyer turn
let playerTurn="circle"

//default value for game info
gameInfo.textContent=`it's ${playerTurn}'s turn!`;


//create table squares
function createSquare(){
    for(let i=0; i <= 8;i++){
        let squareDiv=document.createElement("div");
        squareDiv.className="square";
        squareDiv.id=i;
        table.append(squareDiv)
        squareDiv.addEventListener("click",goOn);
    }
}
//call the createSquare function at the first
createSquare()

//goOn
function goOn(){
    let shape=document.createElement("div");
    shape.className=playerTurn;
    this.append(shape);
    this.removeEventListener("click",goOn);

    playerTurn= playerTurn === "circle" ? "cross" : "circle";

    gameInfo.textContent=`it's ${playerTurn}'s turn!`;

    counter +=1

    checkGame("circle");
    checkGame("cross");
    
    //if all the squares are clicked then call the clearTable
    if (counter == 9){
        clearTable()
        counter=0
    }



}

//check game
function checkGame(shape){
    let squares=document.querySelectorAll(".square");
    let winningCombo=[
        [0,1,2],[3,4,5],[6,7,8],
        [0,3,6],[1,4,7],[2,5,8],
        [0,4,8],[2,4,6]
    ]
    
    winningCombo.forEach(comboArray =>{
        let winner=comboArray.every(e => 
            squares[e].firstChild?.classList.contains(shape)
        )

        if(winner){
            if(shape == "circle"){
                _circle +=10;
                circleP.textContent=_circle
                addToStorage(shape,_circle)
            }else{
                _cross +=10 ;
                crossP.textContent=_cross;
                addToStorage(shape,_cross)
            }
            gameInfo.textContent=`Player ${shape} won!`;
            counter=0
            
        
            setTimeout(clearTable,800)

        }

    })
}


function addToStorage(shape,score){
    if(!window.localStorage.getItem(`${shape}-score`)){
        window.localStorage.setItem(`${shape}-score` ,score)
    }else{
        window.localStorage.setItem(`${shape}-score`,score)
    }
    console.log("g")
}


//clear table 
function clearTable(){
   Array.from(table.children).forEach(e=>{
        if(e.classList.contains("square")){
            e.remove()
        }
   });

   createSquare()

   gameInfo.textContent=`it's ${playerTurn}'s turn!`;

}



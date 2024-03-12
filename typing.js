const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endgameEl = document.getElementById('end-game-container');
const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const difficultySelect = document.getElementById('difficulty');


text.focus();

//starting time 
const timeInterval=setInterval(updateTime,1000)
// called the update time function every 1s 

//random word 
let randomWord;

//random score
let score=0;

// Initialising the time
let time=10;

//setting the difficulty level of the game
//if null set difficulty to medium 
//else set them to whatever the localstorage is set while choosing from  select 
let difficulty=localStorage.getItem("difficulty")!==null?localStorage.getItem("difficulty"):"medium";

//but it is not showing the selected element in dom while reloading so
//set diff level in DOM
difficultySelect.value=localStorage.getItem("difficulty")!==null?localStorage.getItem("difficulty"):"medium";


//getting words from api
async function generate(){
    const response = await fetch('https://random-word-api.herokuapp.com/word');
	const data = await response.json();
    return data.toString(); 
}

//Add words to Dom
 async function addWordToDom(){
    randomWord= await generate()
    word.innerHTML=  randomWord
}
addWordToDom();

//updating the score

function updateScore(){
    score++;
    scoreEl.innerHTML=score;
}

//updating the time
function updateTime(){
    time--;
    timeEl.innerHTML=time +'s';
    if(time===0){
        clearInterval(timeInterval);
        //Stopping by clearing the interval when the timer hits 0
        gameOver();
    }
    
}

//game over to show on the screen

function gameOver(){
    endgameEl.innerHTML=`<h1>Time Ran Out</h1> <p>Your final score is ${score}</p> <button onclick="location.reload()">Reload</button>`;
    endgameEl.style.display="flex";
}

//event listeners
text.addEventListener("input",(e)=>{
    const userText=e.target.value;

    if(userText===randomWord){
        // calling this to change to another word as we have typed the word correctly
       addWordToDom();
       //upadting the score
       updateScore();
    //    clear the texts
       e.target.value=''

       //Changing the time based on the difficulty level
       if(difficulty==="hard"){
        time+=2;
       }
       else if(difficulty==="medium"){
        time+=4;
       }
       else{
        time+=6;
       }
       updateTime();
    }
})


//settings event listeners

//this is happening bcoz of the transition done in the css
settingsBtn.addEventListener("click", ()=>{
    settings.classList.toggle("hide");
})

//select event listeners

settingsForm.addEventListener("change",(e)=>{
    difficulty=e.target.value;

 //adding the  difficulty level in the localstorage

 localStorage.setItem("difficulty",difficulty);
})




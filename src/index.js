// import StopWatch from './scripts/stopwatch';
import DriveWay from './scripts/driveway';
import MovingObject from './scripts/moving_objects';
// import DrawingObjects from './scripts/moving_objects'
import Sound from './scripts/sound';

// import { UpdateGame } from './scripts/utils'

document.addEventListener("DOMContentLoaded", () => {

console.log("hey, script was loaded")

window.addEventListener("keydown", function (e) { KeyDown(e); }); 


///////////STOPWATCH CODE//////////////
let clock;
let hour = 0o00;
let minute = 0o00;
let second = 0o00;
let count = 0o00;

function stopWatch() {
    if (clock) {
        count++;
  
        if (count == 100) {
            second++;
            count = 0;
        }
  
        if (second == 60) {
            minute++;
            second = 0;
        }
  
        if (minute == 60) {
            hour++;
            minute = 0;
            second = 0;
        }
  
        let hrString = hour;
        let minString = minute;
        let secString = second;
        let countString = count;
  
        if (hour < 10) {
            hrString = "0" + hrString;
        }
  
        if (minute < 10) {
            minString = "0" + minString;
        }
  
        if (second < 10) {
            secString = "0" + secString;
        }
  
        if (count < 10) {
            countString = "0" + countString;
        }
  

        document.getElementById('min').innerHTML = minString;
        document.getElementById('sec').innerHTML = secString;
        document.getElementById('count').innerHTML = countString;
        setTimeout(stopWatch, 10);

        // console.log(`${minute} min ${second} sec ${count} ms`)
    }
}
///////////STOPWATCH CODE  END//////////////



// let clock;
// let stopWatch = new StopWatch(clock);

// CANVAS DRAWING
const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");
canvas.width = 626;
canvas.height = 626;

// WORKING WITH DOM
// let controls = document.querySelector(".controls");
let play_game = document.getElementById("play_game");
let resetGame = document.getElementById("resetGame");
let control_keys = document.getElementById("control_keys");
let control_keys_space = document.getElementById("control_keys_space");
let control_keys_pause = document.getElementById("control_keys_pause");
let control_keys_honk = document.getElementById("control_keys_honk");
let control_keys_acceleration = document.getElementById("control_keys_acceleration")
let stopwatch = document.getElementById('time');

let gameCounters = document.querySelector('.game-counters')
let roundCounter = document.getElementById('round-counter');
let lifeCounter = document.getElementById('life-counter');
let rageLevel = document.getElementById('rage-level');
let carsPassed = document.getElementById('cars-passed');

let collisionScreen = document.getElementById('collision-screen');
// let lackOfRangeScreen = document.getElementById('lack-of-rage-screen');


play_game.addEventListener("click", (e)=>{
    console.log('play is working');
    LaunchGame();
    play_game.classList.add("hide-controls");
    resetGame.style.display ="block";
    stopwatch.style.display = "block";
    control_keys.style.display = "block";
    control_keys_space.style.display = "block";
    control_keys_pause.style.display = "block";
    control_keys_honk.style.display = "block";
    control_keys_acceleration.style.display = "block";
    gameCounters.style.display = "block";
    //stopwatch run
    clock = true;
    stopWatch();
})

resetGame.addEventListener("click", (e)=>{
    console.log('reset is working')
    window.location.reload()
})



//VARIABLES start

const REFRESH_SCREEN_TIME = 1000 / 50;
let timerInterval = null;

let size = 0.1 //Moving object size
let speed = 4; //speed for canvas 
let obstacles = []; //store all moving obstacles
let obstaclesSpeed = 4; //could be triggered in rounds increasing
let playerAcceleration = 5; // speed of moving on the canvas

// GAME COUNTERS
let round = 1; // round number
roundCounter.innerHTML = `Round ${round}`

let life = 3; // "life" left
lifeCounter.innerHTML = `Life ${life}`

let rage = 3; //road rage, remove obstacles, "n" amount of attempts
rageLevel.innerHTML = `Rage ${rage}`

let disappeardCars = 0
carsPassed.innerHTML = `Passed cars ${disappeardCars}`

//added horn sound
let carHorn = new Sound('../assets/car-horn2.wav');


//VARIABLES end
if(round == 2){
    // roundCounter.classList.add("round-counter-animation")
    // setTimeout(()=>{
    //     roundCounter.classList.remove("round-counter-animation")
    // },2000)
}



// Function to pause the game and show the pause screen
let popupPause;
function pauseScreen(){
    if(timerInterval != null){
        StopGame();
        clock = false;
        collisionScreen.style.display = 'block';
        popupPause = document.createElement("p");
        popupPause.innerHTML =`<br> <br> GAME PAUSED <br> <br> press ESC to CONTINUE`
        collisionScreen.appendChild(popupPause);

    } else {
        LaunchGame();
        popupPause.remove();
        collisionScreen.style.display = 'none';
        clock = true;
        stopWatch();
    
    }
}


// Function to start/pause game
function pausingGame(){
    if(timerInterval == null){
        LaunchGame();
        clock = true;
        stopWatch();
    } else {
        StopGame();
        clock = false;

    }
    
}


// Array with driveways images //works fine now
let driveWays = [new DriveWay('../assets/driveway1.jpeg', 0, speed, canvas), new DriveWay('../assets/driveway1.jpeg', canvas.width, speed, canvas)]; 

// Main charachter RACER // works fine now //car1
let racer = new MovingObject("../assets/car1.png", canvas.width / 2, canvas.height / 1.3, true, speed, size, canvas, obstaclesSpeed); // main racer object


//LEVEL LOGIC
function increaseLevel(){
    if(disappeardCars < 5){
        round = 1;
        obstaclesSpeed = 4;
        console.log(`in increase level! round:${round}, obstaclespeed:${obstaclesSpeed}`)
    } else if(disappeardCars > 5 && disappeardCars < 20){
        roundCounter.classList.add("round-counter-animation")
        round = 2;
        setTimeout(()=>roundCounter.classList.remove("round-counter-animation"),8000)
        roundCounter.innerHTML = `Round ${round}`
        obstaclesSpeed = 5.5;
        console.log(`in increase level! round:${round}, obstaclespeed:${obstaclesSpeed}`)
    } else if (disappeardCars > 20 && disappeardCars < 30){
        roundCounter.classList.add("round-counter-animation1")
        round = 3;
        // setTimeout(()=>roundCounter.classList.remove("round-counter-animation1"),8000)
        roundCounter.innerHTML = `Round ${round}`
        obstaclesSpeed = 7;
        console.log(`in increase level! round:${round}, obstaclespeed:${obstaclesSpeed}`)
    }   else if(disappeardCars === 35 ){
        collisionScreen.style.display = 'block';
        StopGame();
        clock = false; // stop clock when collision
        let tag = document.createElement("p");
        tag.innerHTML =`
        WOW, impressive driving skills!!! <br> <br> 
        Your time is:  ${minute} min ${second} sec ${count} ms <br>
        You passed:   ${disappeardCars} cars <br> 
        Rage mode left:   ${rage} <br> 
        Lives left:   ${life} <br> 
        `
        collisionScreen.appendChild(tag);
        resetGame.classList.add("rage-level-shake");
    }
}
    
// MAIN FUNCTIONS

function LaunchGame(){
        // if(!racer.collideWith)
        // {
            timerInterval = setInterval(UpdateGame, REFRESH_SCREEN_TIME); //Refreshing screen n time per second
        // }
       
    }

function StopGame(){
        clearInterval(timerInterval); //Stop game
        timerInterval = null;
    }

function UpdateGame(){
        driveWays[0].updateDriveWay(driveWays[1]);
        driveWays[1].updateDriveWay(driveWays[0]);

        //TESTING TIMER
        
        //Generating obstacles  //best value so far randomNumber(0, 10000) > 9750

        increaseLevel()
      
        let randX =randomNumber(155, canvas.width - 190);
        let randY = randomNumber(150, 350) * -1;

        setTimeout(()=>{
            if(randomNumber(0, 10000) > 9950){  //car 1
                obstacles.push(new MovingObject("../assets/cabrio.png", randX,randY, false, speed, size, canvas, obstaclesSpeed));
            }
            if(randomNumber(0, 10000) > 9950){ //car 2
                obstacles.push(new MovingObject("../assets/bugatti.png", randX,randY, false, speed, size, canvas, obstaclesSpeed));
            }
            if(randomNumber(0, 10000) > 9950){ //car 3
                obstacles.push(new MovingObject("../assets/ferrari_red.png", randX,randY, false, speed, size, canvas, obstaclesSpeed));
            }
            if(randomNumber(0, 10000) > 9950){ //car 4
                obstacles.push(new MovingObject("../assets/acura1.png", randX,randY, false, speed, size, canvas, obstaclesSpeed));
            }
        },1000)


        racer.updateMovingObject();
    
        if(racer.collideWith){
            // alert("!!!!!!!!!OHHHHH CRASH!");
            // StopGame();
        }
    
        let isDestroyed = false; 
    
        for(let i = 0; i < obstacles.length; i++){
            obstacles[i].updateMovingObject();
            if(obstacles[i].collideWith){
                isDestroyed = true;
            }
        }
    
        if(isDestroyed){ //removing cars from canvas and counting them
            obstacles.shift();
            disappeardCars++
            carsPassed.innerHTML = `Passed cars ${disappeardCars}`
        }
    
        let collision = false;
    
        for(let i = 0; i < obstacles.length; i++){
            collision = racer.hit(obstacles[i]);
    
            if(collision){
                //adding screen information for a user
                collisionScreen.style.display = 'block';
                if(life > 0){
                    pausingGame()
                    life--;
                    let tag = document.createElement("p");
                    tag.innerHTML =`<br> <br>Hey, you hit a car! <br> <br>
                     ${life} collision(s) left`

                    collisionScreen.appendChild(tag);

                    setTimeout(()=>{
                        tag.remove();
                        collisionScreen.style.display = 'none';
                        LaunchGame();
                        clock = true;
                        stopWatch();
                    },2500)
                    obstacles = [];
                    lifeCounter.innerHTML = `Life ${life}`
                } else{

                    StopGame();
                    clock = false; // stop clock when collision
                    let tag = document.createElement("p");
                    tag.innerHTML =`
                    You're a bad driver!!! <br> <br> 
                    Your time is: ${minute} min ${second} sec ${count} ms <br>
                    You passed: ${disappeardCars} cars <br> 
                    `
                    collisionScreen.appendChild(tag);
                    resetGame.classList.add("rage-level-shake");
                    break;
                }

            }
        }
        
        draw();   
        // DrawingObjects.draw(); move draw to separate class
    }
    




//adding graphics on canvas works fine
function draw(){ 
        // clear all from canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height); 
       
        // drawing background driveway
        for(let i = 0; i < driveWays.length; i++){
            ctx.drawImage(
                driveWays[i].image, // driveway image
                0, //staring point X on driveway image
                0, //staring point Y on driveway image
                driveWays[i].image.width, //end point X on driveway image
                driveWays[i].image.height, //end point Y on driveway image
                driveWays[i].x, // Axis X on canvas
                driveWays[i].y, // Axis Y on canvas
                canvas.width, //canvas width
                canvas.width //canvas hiight
            );
        }
        
        // drawing main racer
        drawMovingObject(racer);
        
        // drawing obstacles
        for(let i = 0; i < obstacles.length; i++){
            drawMovingObject(obstacles[i]);
        }
    }
 // works fine   
function drawMovingObject(movingObject){
        ctx.drawImage(
            movingObject.image, 
            0, 
            0, 
            movingObject.image.width, 
            movingObject.image.height, 
            movingObject.x, 
            movingObject.y, 
            movingObject.image.width * size, 
            movingObject.image.height * size 
        );
    }

    
//Rage effect for canvas  START

function shakeCanvas(){
    let canvasShake = document.getElementById('game-canvas');

        if(rage > 0){
            carHorn.play();
            canvasShake.style ="box-shadow: 0 0 50px rgb(225, 18, 18)";
            canvasShake.classList.add("shacky-canvas");
            // console.log(rage, "before action")
            obstacles = [];
            rage--;
            rageLevel.innerHTML = `Rage ${rage}`
            // console.log(rage, "after action")
        } else {
            rageLevel.classList.add("rage-level-shake");
            setTimeout(()=>{
                rageLevel.classList.remove("rage-level-shake");
            },3000)
        }

        setTimeout(()=>{
            canvasShake.classList.remove("shacky-canvas");
            canvasShake.style ="box-shadow: 0 0 24px rgb(21, 199, 223)";
        },1500)
}
//Rage effect for canvas END




//that's fine as well
function KeyDown(e){
        switch(e.keyCode){
            case 65: //Left
                racer.move("x", -speed, playerAcceleration);
                break;
    
            case 68: //Right
                racer.move("x", speed, playerAcceleration);
                break;
    
            case 87: //Up
                racer.move("y", -speed, playerAcceleration);
                break;
    
            case 83: //Down
                racer.move("y", speed, playerAcceleration);
                break;

            case 32: //Space
                // Remove all obstacles from screen
                // obstacles = [];
                shakeCanvas()
                break;

            case 72: // Key "H"
                //Horn sound
                carHorn.play();
                break;
            
            case 38: //Up
                playerAcceleration++;
                console.log(`Acceleration: ${playerAcceleration}`)
                break;
            case 40: //down
                playerAcceleration--;
                console.log(`Acceleration: ${playerAcceleration}`)
                break;
    
            case 27: //Esc pausing game and stopwatch
                // pausingGame()
                pauseScreen()
                break;
        }
    }


    
    // that's fine
function randomNumber(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }

    
});
export function UpdateGame(){
    driveWays[0].updateDriveWay(driveWays[1]);
    driveWays[1].updateDriveWay(driveWays[0]);

    //TESTING TIMER
    
    //Generating obstacles  //best value so far randomNumber(0, 10000) > 9750

    increaseLevel()


    setTimeout(()=>{
        if(randomNumber(0, 10000) > 9950){  //car 1
            obstacles.push(new MovingObject("../assets/cabrio.png", randomNumber(155, canvas.width - 300), randomNumber(150, 350) * -1, false, speed, size, canvas, obstaclesSpeed));
        }
    },1000)
    
    setTimeout(()=>{
        if(randomNumber(0, 10000) > 9950){ //car 2
            obstacles.push(new MovingObject("../assets/bugatti.png", randomNumber(155, canvas.width - 250), randomNumber(200, 350) * -1, false, speed, size, canvas, obstaclesSpeed));
        }
    },2000)

    setTimeout(()=>{
        if(randomNumber(0, 10000) > 9950){ //car 3
            obstacles.push(new MovingObject("../assets/ferrari_red.png", randomNumber(155, canvas.width - 200), randomNumber(350, 350) * -1, false, speed, size, canvas, obstaclesSpeed));
        }
    },3000)

    setTimeout(()=>{
        if(randomNumber(0, 10000) > 9950){ //car 3
            obstacles.push(new MovingObject("../assets/acura1.png", randomNumber(155, canvas.width - 180), randomNumber(300, 350) * -1, false, speed, size, canvas, obstaclesSpeed));
        }
    },4000)

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
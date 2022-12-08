# [Crazy Ride](https://evgenii-shvetsov.github.io/racing-game/)

## Background

**Crazy Ride** is a 2D game with a top-down view. A racer will ride on a street, trying to avoid collisions with randomly appearing crazy drivers. The racer moves all around the canvas. There is a "Rage Mode" to remove obstacles from the street. There are three rage modes and three possible collisions. A stopwatch starts when a user starts the game. A goal is to survive three rounds.

## How to Play
**Control keys:**
- W A S D keys to move
- ↑ to accelerate
- ↓ to slow down
- H to Honk
- SPACE to activate Rag
- ESC to Pause/Resume

## Functionality & MVPs

In the “Crazy Ride” game, users will be able to:

- Interact with the website page, click links, mute sound, start and pause the game
- Move a car in all directions on the road in Canvas
- Honk cars to avoid collision and remove objects
- Keep track of the stopwatch and the number of collisions left

In Addition, this project will include:
- Game instruction
- A production README



## Layout

### Landing Page
<!-- ![landing-page](https://user-images.githubusercontent.com/46214277/206549617-2296477b-ee6a-40a7-9030-49da244d50d2.jpg) -->
<img src="https://user-images.githubusercontent.com/46214277/206549617-2296477b-ee6a-40a7-9030-49da244d50d2.jpg" width="600px" height="500px">

### Instructions
<!-- ![instructions](https://user-images.githubusercontent.com/46214277/206549656-1bed229c-8695-4e77-be0b-8c571886791e.jpg) -->
<img src="https://user-images.githubusercontent.com/46214277/206549656-1bed229c-8695-4e77-be0b-8c571886791e.jpg" width="400px" height="500px">

### Gameplay
<!-- ![gameplay](https://user-images.githubusercontent.com/46214277/206549716-350ce3b0-4965-46a3-83d7-e3c38909ee05.jpg) -->
<img src="https://user-images.githubusercontent.com/46214277/206549716-350ce3b0-4965-46a3-83d7-e3c38909ee05.jpg" width="400px" height="500px">

### Pause screen
<!-- ![pause-screen](https://user-images.githubusercontent.com/46214277/206549754-e91ae34b-b19f-46f4-aa44-b9a7ef4faf80.jpg) -->
<img src="https://user-images.githubusercontent.com/46214277/206549754-e91ae34b-b19f-46f4-aa44-b9a7ef4faf80.jpg" width="400px" height="500px">

### Collision screen
<!-- ![hit-screen](https://user-images.githubusercontent.com/46214277/206549783-741df344-b19b-442a-a1fc-6fcef382540f.jpg) -->
<img src="https://user-images.githubusercontent.com/46214277/206549783-741df344-b19b-442a-a1fc-6fcef382540f.jpg" width="400px" height="500px">

### Win screen
<!-- ![win-screen](https://user-images.githubusercontent.com/46214277/206549804-c273d4e3-c0e7-41d9-a2c6-61b15a9dc49f.jpg) -->
<img src="https://user-images.githubusercontent.com/46214277/206549804-c273d4e3-c0e7-41d9-a2c6-61b15a9dc49f.jpg" width="400px" height="500px">

### Game Over screen
<!-- ![loose-screen](https://user-images.githubusercontent.com/46214277/206549914-fc510a10-420b-4310-9722-5b0bf2b6a503.jpg) -->
<img src="https://user-images.githubusercontent.com/46214277/206549914-fc510a10-420b-4310-9722-5b0bf2b6a503.jpg" width="400px" height="500px">

## Implementation details
Collision logic implementation:
```javascript
hit(movingObject){
        let collisionStatus = false;
        if(this.y < movingObject.y + movingObject.image.height * this.size && this.y + this.image.height * this.size > movingObject.y){ 
        if(this.x + this.image.width * this.size > movingObject.x && this.x < movingObject.x + movingObject.image.width * this.size){ 
                collisionStatus = true;
            }
        }
        return collisionStatus;
    }
```

Moving on canvas:
```javascript
move(vector, acceleration,playerAcceleration) {
        if(vector == "x"){ 
            acceleration *= playerAcceleration; 
            this.x += acceleration;
            }
            if(this.x < 132){
                this.x = 132
            }
        } else { 
            acceleration *= playerAcceleration;
            this.y += acceleration;
            if(this.y + this.image.height * this.size > this.canvas.height){
                this.y -= acceleration;
            }
            if(this.y < 0){
                this.y = 0;
            }
        }
    }

```

Remove obstacles from canvas with shacking effect:
```javascript
function shakeCanvas(){
    let canvasShake = document.getElementById('game-canvas');
        if(rage > 0){
            if(!mute) carHorn.play()
            canvasShake.style ="box-shadow: 0 0 50px rgb(225, 18, 18)";
            canvasShake.classList.add("shacky-canvas");
            obstacles = [];
            rage--;
            rageLevel.innerHTML = `Rage ${rage}`
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
```


## Technologies, Libraries, APIs

This project was created using the following technologies:
- HTML5
- CSS3 
- The Canvas API to render the game board
- Webpack and Babel to bundle and transpile the source JavaScript code
- npm to manage project dependencies


## Implementation Timeline

Friday Afternoon & Weekend
- The HTML structure for the project.
- Canvas layout.
- The basic functionality of the game. Moving objects, obstacles, physics.
- Testing/debugging.

**Monday**
- Collision detection.
- Objects removing functionality.
- Stopwatch.
- Speed increase, “level” behavior.
- Testing/debugging.

**Tuesday**
- Styles for the game.
- Adding “actual” road “moving objects.”
- Collision animation.
- Honking animation.
- Browser page styles (out of the canvas).
- Testing/debugging.

**Wednesday**
- Testing functionality.
- Polishing styles on the page and inside the canvas.
- Add links.
- Add instructions.

**Thursday**
- Finalize the project. 
- Post on the server.
- Prepare for the presentation.


## Future features
- Add increase speed animation
- Improve level logic by adding additional rounds
- Improve placing random objects on canvas

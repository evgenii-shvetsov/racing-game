export default class MovingObject{
    constructor(image, x, y, isRacer, speed, size, canvas, obstaclesSpeed, playerAcceleration){
        this.x = x;
        this.y = y;

        this.speed = speed;
        this.size = size;
        this.canvas = canvas;
        this.obstaclesSpeed = obstaclesSpeed
        this.playerAcceleration = playerAcceleration

        this.collideWith = false;  // to change
        this.isRacer = isRacer;

        //image loading
        this.loaded = false;
        this.image = new Image();
        let object = this;
        this.image.addEventListener("load", function () { object.loaded = true; });
        this.image.src = image;
    }

    updateMovingObject(){
        if(!this.isRacer){ //isRacer false, means that it is not an obstacle
            this.y += this.speed + this.obstaclesSpeed; //obstacles speed
        }

        if(this.y > this.canvas.height + 50){
            this.collideWith = true;
        }
    }

    hit(movingObject){
        let collisionStatus = false;

        if(this.y < movingObject.y + movingObject.image.height * this.size && this.y + this.image.height * this.size > movingObject.y){ //If there is collision by y
        
            if(this.x + this.image.width * this.size > movingObject.x && this.x < movingObject.x + movingObject.image.width * this.size){ //If there is collision by x
            
                collisionStatus = true;
            }
        }

        return collisionStatus;
    }

    move(vector, acceleration,playerAcceleration) {
        if(vector == "x"){ 
            acceleration *= playerAcceleration; 
            this.x += acceleration; //sliding on Axis X
               
            //This is for all canvas move
            //Restricting the ability to move out of the canvas on Axis X; resetting values
            // if(this.x + this.image.width * this.size > this.canvas.width){
            //     this.x -= acceleration; 
            // }
            //Restricting the ability to move out of the canvas on Axis X; resetting values
            if(this.x+121 + this.image.width * this.size > this.canvas.width){
                this.x -= acceleration; 
            }
            //default values are 0 for Axis X
            if(this.x < 132){
                // this.x = 120;
                this.x = 132
            }

        } else { 
            acceleration *= playerAcceleration;
            this.y += acceleration; //sliding on Axis Y
            // Restricting the ability to move out of the canvas on Axis Y; resetting values
            if(this.y + this.image.height * this.size > this.canvas.height){
                this.y -= acceleration;
            }
            if(this.y < 0){
                this.y = 0;
            }
        }
        
    }
}

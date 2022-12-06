export default class MovingObject{
    constructor(image, x, y, isRacer, speed, size, canvas, obstaclesSpeed){
        this.x = x;
        this.y = y;

        this.speed = speed;
        this.size = size;
        this.canvas = canvas;
        this.obstaclesSpeed = obstaclesSpeed

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

    move(vector, acceleration) {
        if(vector == "x"){ 
            acceleration *= 5; 
            this.x += acceleration; //sliding on Axis X

            //Restricting the ability to move out of the canvas on Axis X; resetting values
            if(this.x + this.image.width * this.size > this.canvas.width){
                this.x -= acceleration; 
            }
    
            if(this.x < 0){
                this.x = 0;
            }

        } else { 
            acceleration *= 5;
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

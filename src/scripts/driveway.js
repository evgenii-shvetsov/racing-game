
export default class DriveWay{
    constructor(image, y, speed, canvas){
        this.x = 0;
        this.y = y;
        this.speed = speed;
        this.canvas = canvas
        
        //image uploading
        this.loaded = false;
        this.image = new Image();
        let object = this;
        this.image.addEventListener("load", function () { object.loaded = true; });
        this.image.src = image;
    }

    updateDriveWay(driveWay) {
        this.y += this.speed; //the driveway image will move down every frame
        // console.log("driveway console")
        if(this.y > this.canvas.height){ //change the position if image left canvas
            this.y = driveWay.y - this.canvas.width + this.speed; //new position will depend on the second picture
        }
    }
}

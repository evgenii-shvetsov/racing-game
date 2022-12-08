// export default class DrawingObjects{
//     constructor(){
//         this.canvas = canvas;
//         this.ctx = ctx;
//         this.driveWays = this.driveWays;
//         this.obstacles = obstacles;

//     };

//     //adding graphics on canvas works fine
//     draw(){ 

//     // clear all from canvas
//     ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); 
   
//     // drawing background driveway
//     for(let i = 0; i < this.driveWays.length; i++){
//         ctx.drawImage(
//             this.driveWays[i].image, // driveway image
//             0, //staring point X on driveway image
//             0, //staring point Y on driveway image
//             this.driveWays[i].image.width, //end point X on driveway image
//             this.driveWays[i].image.height, //end point Y on driveway image
//             this.driveWays[i].x, // Axis X on canvas
//             this.driveWays[i].y, // Axis Y on canvas
//             this.canvas.width, //canvas width
//             this.canvas.width //canvas hiight
//         );
//     }
    
//     // drawing main racer
//     drawMovingObject(racer);
    
//     // drawing obstacles
//     for(let i = 0; i < this.obstacles.length; i++){
//         drawMovingObject(this.obstacles[i]);
//     }
// }
// // works fine   
//          drawMovingObject(movingObject){
//     ctx.drawImage(
//         this.movingObject.image, 
//         0, 
//         0, 
//         this.movingObject.image.width, 
//         this.movingObject.image.height, 
//         this.movingObject.x, 
//         this.movingObject.y, 
//         this.movingObject.image.width * size, 
//         this.movingObject.image.height * size 
//     );
// }

// }
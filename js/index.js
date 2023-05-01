window.onload = () => {
  document.getElementById('start-button').onclick = () => {
    startGame();
  };
};

//Initial Values
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');





//Upload road
const roadImg = new Image();
roadImg.src = './images/road.png';
roadImg.onload = function() {
  ctx.drawImage(roadImg, 0, 0, canvas.width,canvas.height);
};


//Move Road
const moveRoad = {
  img: roadImg,
  roadY: 0,
  roadSpeed: -10,
  roadFrames: 0,

  move: function() {
    this.roadFrames++;
    this.roadY -= this.roadSpeed;
    this.roadY %= canvas.height;
  },

  draw: function() {
    ctx.drawImage(this.img, 0, this.roadY, canvas.width, canvas.height);
    ctx.drawImage(this.img, 0, this.roadY - canvas.height, canvas.width, canvas.height);
  },
};


//Upload car
const carImage = new Image();
carImage.src = './images/car.png';
carImage.onload = function() {
  ctx.drawImage(carImage, 200, 500, 100, 200);
};

const moveCar = {
  img: carImage,
  carSpeed: 0,
  x: 200,

  draw: function() {
    if(this.carSpeed === 0)
    {this.x += this.carSpeed;}
    else if(this.carSpeed <1){
      this.x -= 8;}
    else if(this.carSpeed>1){
      this.x += 8;}

    if(this.x<0){this.x=0}
    if(this.x>400)(this.x=400)
    ctx.drawImage(this.img, this.x, 500, 100, 200);
  },
};

//Upload Obstacle
const obstacleArray = [];
const generateObstacle = {
  obsY: 0,
  obsSpeed: -10,
  xInitial: Math.floor(Math.random() * 350),
  xSize: 100 + Math.floor(Math.random() * 150),

  move: function() {
    this.obsY -= this.obsSpeed;
  },
  draw: function() {
    ctx.fillStyle = 'red'; ctx.fillRect(this.xInitial, this.obsY, this.xSize, 30);
  },
}

function crashed(obstacle){
  if(obstacle[0].obsY>480 && obstacle[0].obsY < 700){
    return !(moveCar.x + 90 < obstacle[0].xInitial || moveCar.x + 10 > obstacle[0].xInitial + obstacle[0].xSize)
  }
  return moveCar.x === 0 || moveCar.x === 400;
  // return !(this.bottom() < obstacle.top() || this.top() > obstacle.bottom() || this.right() < obstacle.left() || this.left() > obstacle.right());
}

//Upload score
function score(){
  ctx.font = '36px serif';
  ctx.fillStyle = 'black';
  ctx.fillText(`Score: ${moveRoad.roadFrames}`, 200, 50);
}


function updateCanvas() {
  if(moveRoad.roadFrames % 120 === 0){
    obstacleArray.unshift(generateObstacle);
    obstacleArray[0].obsY = 0;
    obstacleArray[0].xInitial = Math.floor(Math.random() * 350);
    obstacleArray[0].xSize = 100 + Math.floor(Math.random() * 150);
  }
  moveRoad.move();
  obstacleArray[0].move()
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  moveRoad.draw();
  moveCar.draw();
  obstacleArray[0].draw();
  score();
  let animation = requestAnimationFrame(updateCanvas);
  //crash conditions
  if(crashed(obstacleArray)){
    alert(`BANG! Your Score is: ${moveRoad.roadFrames -1}`);
    cancelAnimationFrame(animation);}
}


function startGame() {
  const hideButton = document.getElementById('start-button');
  hideButton.style.display = 'none';
  updateCanvas();
}

document.addEventListener('keydown', (e) => {
  switch (e.keyCode) {
    case 37: // left arrow
    // console.log(speed)
      moveCar.carSpeed -= 8;
      break;
    case 39: // right arrow
      moveCar.carSpeed += 8;
      break;
  }
});

document.addEventListener('keyup', (e) => {
  moveCar.carSpeed = 0;
});
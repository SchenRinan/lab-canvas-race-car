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
roadImg.src = '../images/road.png';
roadImg.onload = function() {
  ctx.drawImage(roadImg, 0, 0, canvas.width,canvas.height);
};

//Move Road
const moveRoad = {
  img: roadImg,
  y: 0,
  speed: -10,

  move: function() {
    this.y -= this.speed;
    this.y %= canvas.height;
  },

  draw: function() {
    ctx.drawImage(this.img, 0, this.y, canvas.width, canvas.height);
    if (this.speed < 0) {
      ctx.drawImage(this.img, 0, this.y - canvas.height, canvas.width, canvas.height);
    } else {
      ctx.drawImage(this.img, 0, this.y + this.img.height, canvas.width, canvas.height);
    }
  },
};


//Upload car
const carImage = new Image();
carImage.src = '../images/car.png';
carImage.onload = function() {
  ctx.drawImage(carImage, 200, 500, 100, 200);
};


const moveCar = {
  img: carImage,
  speed: 0,
  x: 200,

  draw: function() {
    if(this.speed === 0)
    {this.x += this.speed;}
    else if(this.speed <1){
      this.x -= 5;}
    else if(this.speed>1){
      this.x += 5;}

      if(this.x<10){this.x=10}
      if(this.x>390)(this.x=390)
    console.log(this.speed)
    ctx.drawImage(this.img, this.x, 500, 100, 200);
  },
};

function updateCanvas() {
  moveRoad.move();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  moveRoad.draw();
  moveCar.draw();
  requestAnimationFrame(updateCanvas);
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
      moveCar.speed -= 5;
      break;
    case 39: // right arrow
      moveCar.speed += 5;
      break;
  }
});

document.addEventListener('keyup', (e) => {
  moveCar.speed = 0;
});
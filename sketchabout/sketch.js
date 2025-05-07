// ai : "help create an animation where balloons enter the screen from the bottom and exit at the top, fading in and out. The animation should loop and be smooth, with randomized speeds and delays for each balloon's movement"

let balloonImg;
let balloons = [];
let i = 0;
let total = 10;

function preload() {
  balloonImg = loadImage("assets/balloons.png");
}

function setup() {
  let c = createCanvas(windowWidth, windowHeight);
  c.position(0, 0);         // place it at the top-left corner
  c.style('z-index', '-1'); // put it behind everything else
  c.style('position', 'fixed'); // make sure it stays in place
  balloons.push(new Balloon());
}

function draw() {
  clear();

  for (let b of balloons) {
    b.update();
    b.display();
  }

  if (balloons.length < total && balloons[balloons.length - 1].isOffScreen()) {
    balloons.push(new Balloon());
  }
}

class Balloon {
  constructor() {
    this.x = random(width);
    this.y = height + random(100, 500);
    this.size = random(500, 700);
    this.speed = random(2, 5);
  }

  update() {
    this.y -= this.speed;
  }

  display() {
    imageMode(CENTER);
    image(balloonImg, this.x, this.y, this.size, this.size * 1.3);
  }

  isOffScreen() {
    return this.y < -this.size;
  }
}
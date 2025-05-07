// ai : "help create an interactive continuous clicking loop for an uploaded image. the next photo should appear behind the current one and the images should fall naturally like leaves"

let images = [];
let pageIndex = 0;
let falling = false;
let y = 0;
let x = 0;
let baseX = 0;
let rotation = 0;
let velocity = 0;

let swayAmplitude = 0;
let swayFrequency = 0;
let time = 0;

let fallFromLeft = true;

function preload() {
  images[0] = loadImage('assets/&1.png');
  images[1] = loadImage('assets/Every1.png');
  images[2] = loadImage('assets/Year1.png');
  images[3] = loadImage('assets/&2.png');
  images[4] = loadImage('assets/Every2.png');
  images[5] = loadImage('assets/Year2.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
  baseX = width / 2;
  x = baseX;
  y = height / 2;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  baseX = width / 2;
  x = baseX;
  y = height / 2;
}

function draw() {
  clear();

  if (!falling) {
    push();
    translate(baseX, y);
    scale(1.23);

    drawGlow(images[pageIndex], 0, 0); 
    image(images[pageIndex], 0, 0);  
    pop();
  } else {
    velocity += 0.2;
    y += velocity;
    rotation += 0.01;

    time += 0.05;
    x = baseX + swayAmplitude * sin(swayFrequency * time);

    let nextIndex = (pageIndex + 1) % images.length;

    push();
    translate(width / 2, height / 2);
    scale(1.24);
    image(images[nextIndex], 0, 0);
    pop();

    push();
    translate(x, y);
    rotate(rotation);
    scale(1.25);

    drawGlow(images[pageIndex], 0, 0);
    image(images[pageIndex], 0, 0);
    pop();

    if (y > height + images[pageIndex].height) {
      falling = false;
      pageIndex = (pageIndex + 1) % images.length;
      resetPage();
    }
  }
}

function drawGlow(img, x, y) {
  for (let i = 3; i >= 1; i--) {
    push();
    tint(255, 15 * i);
    let s = 1 + i * 0.02; 
    scale(s);
    image(img, x, y);
    pop();
  }
  noTint();
}

function mousePressed() {
  if (!falling) {
    falling = true;
    swayAmplitude = random(20, 60);
    swayFrequency = random(1, 3);
  }
}

function resetPage() {
  baseX = width / 2;
  x = baseX;
  y = height / 2;
  velocity = 0;
  rotation = 0;
  time = 0;
  fallFromLeft = !fallFromLeft;
}
// help from ai

let matchImg;
let letters = [];
let baseText = "Make A Wish";
let fireDist = 100;

function preload() {
  matchImg = loadImage("assets/lit_match.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight).parent('canvasContainer');
  textFont('Sail');
  textSize(150);
  noCursor();

  let x = width / 2 - textWidth(baseText) / 2;
  for (let i = 0; i < baseText.length; i++) {
    let fire = baseText[i];
    let fireWidth = textWidth(fire);
    letters.push({
      fire: fire,
      x: x,
      y: height / 2 + 100,
      w: fireWidth
    });
    x += fireWidth;
  }
}

function draw() {
  clear();

 for (let letter of letters) {
  let flameX = mouseX - 30;  
  let flameY = mouseY - 30 - 60;
  
  let d = dist(flameX, flameY, letter.x + letter.w / 2, letter.y - 40);
  
    if (d < fireDist) {
      fill(lerpColor(color("rgb(255,183,0)"), color("rgb(225,14,14)"), random(0.5)));
      textSize(150 + random(-2, 2));
      push();
      translate(letter.x + random(-0.5, 0.5), letter.y + random(-0.5, 0.5));
      text(letter.fire, 0, 0);
      pop();
    } else {
      fill('f6f3e4');
      textSize(150);
      text(letter.fire, letter.x, letter.y);
    }
  }

  imageMode(CENTER);
  image(matchImg, mouseX - 30, mouseY - 45, 200, 200);
}

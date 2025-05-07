// ai : "help create an animation out of small shapes to mimic a birthday candle flame that reacts to the cursor. the flame should extinguish when the cursor hovers and relight on a timer"

let cakeImg;
let flames = [];
let cakeOffsetY = 70;

function preload() {
  cakeImg = loadImage("assets/birthday_cake.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  let flamePositions = [
    { x: width/2 - 325, y: height/2 - 168 },
    { x: width/2 - 238, y: height/2 - 205 },
    { x: width/2 - 160, y: height/2 - 228 },
    { x: width/2 - 90, y: height/2 - 238 },
    { x: width/2 - 15, y: height/2 - 240 },
    { x: width/2 + 90, y: height/2 - 230 },
    { x: width/2 + 188, y: height/2 - 208 },
    { x: width/2 + 250, y: height/2 - 185 },
    { x: width/2 + 350, y: height/2 - 136 }  ];

  for (let pos of flamePositions) {
    flames.push(new Flame(pos.x, pos.y));
  }
}

function draw() {
  clear();
  imageMode(CENTER);
  image(cakeImg, width / 2, height / 2 + cakeOffsetY);

  for (let flame of flames) {
    flame.update();
    flame.display();
  }
}

class Flame {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.active = true;
    this.smokeTimer = 0;
    this.particles = [];
    this.smokeParticles = [];
  }

update() {
    let d = dist(mouseX, mouseY, this.x, this.y);
    if (d < 50 && this.active) {
      this.active = false;
      this.smokeTimer = millis();
    }

    if (!this.active && millis() - this.smokeTimer > 2000) {
      this.active = true;
      this.smokeParticles = [];
    }

    if (this.active) {
      this.particles = [];
      for (let i = 0; i < 15; i++) {
        let c = lerpColor(color("rgb(255,183,0)"), color("rgb(225,14,14)"), random(0.5));
        c.setAlpha(random(120, 200));

        this.particles.push({
          x: this.x + random(-4, 4),  
          y: this.y + random(-10, 0),
          r: random(8, 14),           
          col: c,
          life: random(60, 150),       
          alphaDecay: random(2, 5),    
          sizeDecay: random(0.05, 0.1)
        });
      }
      
    } else {
      this.smokeParticles.push({
        x: this.x,
        y: this.y,
        r: random(5, 8),
        alpha: 100
      });

      for (let p of this.smokeParticles) {
        p.y -= 1;
        p.x += random(-0.5, 0.5);
        p.alpha -= 1;
      }

      this.smokeParticles = this.smokeParticles.filter(p => p.alpha > 0);
    }
  }

display() {
    noStroke();
    if (this.active) {
      for (let p of this.particles) {
        p.life -= 1;
        p.r -= p.sizeDecay; 
        p.col.setAlpha(p.col._getAlpha() - p.alphaDecay); 

        if (p.life > 0 && p.r > 0) {
          fill(250, random(20, 120));
          ellipse(p.x, p.y, p.r * 1.8, p.r * 2.5);
        
          fill(p.col);
          ellipse(p.x, p.y, p.r, p.r * 1.5); 
        }
      }
    } else {
      for (let p of this.smokeParticles) {
        fill(150, p.alpha);
        ellipse(p.x, p.y, p.r);
      }
    }
  }
}
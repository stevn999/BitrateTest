let dots = []
let max = 100
let last = 0

function setup() {
  frameRate(10000)
  createCanvas(windowWidth, windowHeight)
  slider = createSlider(0, 1500, 1000);
  for (var i = 0; i < max; i++) {
    dots.push(new Dot())
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  max = slider.value()
  last = Date.now()
  while (dots.length < max) {
    dots.push(new Dot())
  }

  background(250)
  for (var i = 0; i < dots.length; i++) {
    dots[i].update()
    if (dots[i].alive == false) {
      dots.splice(i, 1)
    }
  }
  textSize(32);
  textAlign(CENTER);
  text('These lines will be lost in low qualities', width/2, (frameCount+(height/3))%height- 10);
  for (var i = 0; i < 4; i++) {
    line(0,(frameCount+(i*height/3))%height,width,(frameCount+(i*height/3))%height)
    line(0,(frameCount+2+(i*height/3))%height,width,(frameCount+2+(i*height/3))%height)
    push()
    stroke(255)
    line(0,(frameCount+1+(i*height/3))%height,width,(frameCount+1+(i*height/3))%height)
    pop()
  }

  while (dots.length > max) {
    dots.shift()
  }
  if (Date.now()-last > 25) {
    slider.value(slider.value()-(19-(Date.now()-last > 20)))
    console.log(max);
  }
}
class Dot {
  constructor() {
    this.alive = true
    this.x = random(width)
    this.c = random(255)
    this.y = random(height/3,height)
  }
  update() {
    if (this.x < 0 || this.x > width || this.y < 0 || this.y > height) {
      this.alive = false
    }
    this.y += random(-4, 5) + (mouseY - (height / 2)) / (height)
    this.x += random(-5, 5) + (mouseX - (width / 2)) / (width)
    push()

    colorMode(HSB, 256)
    fill(this.c, 255, 250, 40)
    ellipse(this.x, this.y, 120)
    pop()
  }
}

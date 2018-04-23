let dots = []
let max = 100
let last = 0

function setup() {
  frameRate(10000)
  createCanvas(windowWidth, windowHeight)
  slider = createSlider(0, 1500, 0);
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
  while (dots.length > max) {
    dots.shift()
  }
  if (Date.now()-last > 20) {
    slider.value(slider.value()-(19-(Date.now()-last > 20)))
    console.log(max);
  }
}
class Dot {
  constructor() {
    this.alive = true
    this.x = random(width)
    this.c = random(255)
    this.y = random(height)
  }
  update() {
    if (this.x < 0 || this.x > width || this.y < 0 || this.y > height) {
      this.alive = false
    }
    this.y += random(-4, 5) + (mouseY - (height / 2)) / (height / 2)
    this.x += random(-5, 5) + (mouseX - (width / 2)) / (width / 2)
    push()

    colorMode(HSB, 256)
    fill(this.c, 255, 250, 40)
    ellipse(this.x, this.y, 120)
    pop()
  }
}

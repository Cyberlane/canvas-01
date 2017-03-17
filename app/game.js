let canvas;
let context;
let bird;
let key;
let pipes = [];
let frameCount = 0;
let gameOver = false;

const clearArea = () => {
  context.clearRect(0, 0, canvas.width, canvas.height);
};

const random = (min, max) =>
  Math.floor(Math.random() * max) + min;

function Bird() {
  this.y = canvas.height / 2;
  this.x = 64;
  this.width = 32;
  this.gravity = 0.6;
  this.lift = -15;
  this.velocity = 0;
  this.show = () => {
    context.fillRect(this.x, this.y, this.width, 32);
  };
  this.up = () => {
    this.velocity += this.lift;
  };
  this.update = () => {
    this.velocity += this.gravity;
    this.velocity *= 0.9;
    this.y += this.velocity;

    if (this.y > canvas.height - 32) {
      this.y = canvas.height - 32;
      this.velocity = 0;
    }
    if (this.y < 0) {
      this.y = 0;
      this.velocity = 0;
    }
  };
}

function Pipe() {
  this.top = random(1, canvas.height / 2);
  this.bottom = random(1, canvas.height / 2);
  this.x = canvas.width;
  this.width = 20;
  this.speed = 2;
  this.highlight = false;

  this.hits = (bird) => {
    if (bird.y < this.top || bird.y > canvas.height - this.bottom) {
      if (bird.x + bird.width > this.x && bird.x < this.x + this.width) {
        this.highlight = true;
        return true;
      }
    }
    this.highlight = false;
    return false;
  };
  this.show = () => {
    context.fillStyle = 'black';
    if (this.highlight) {
      context.fillStyle = 'red';
    }
    context.fillRect(this.x, 0, this.width, this.top);
    context.fillRect(this.x, canvas.height - this.bottom, this.width, this.bottom);
  };
  this.update = () => {
    this.x -= this.speed;
  };
  this.offscreen = () => this.x < -canvas.width;
}

const draw = () => {
  clearArea();
  if (gameOver) {
    bird.show();
    pipes.forEach(pipe => pipe.show());
    return;
  };
  frameCount += 1;
  bird.update();
  bird.show();

  pipes = pipes
    .map((pipe) => {
      pipe.show();
      pipe.update();
      if (pipe.hits(bird)) {
        gameOver = true;
      }
      return pipe;
    })
    .filter(pipe => !pipe.offscreen());

  if (frameCount % 100 === 0) {
    pipes.push(new Pipe());
  }
};

const keyPressed = () => {
  if (key === 32) {
    bird.up();
  }
};

const createCanvas = (width, height) => {
  canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  context = canvas.getContext('2d');
  document.body.insertBefore(canvas, document.body.childNodes[0]);
  setInterval(draw, 20);
  window.addEventListener('keydown', (e) => {
    key = e.keyCode;
    keyPressed();
  });
  window.addEventListener('keyup', () => {
    key = false;
    keyPressed();
  });
};

const setup = () => {
  createCanvas(400, 600);
  bird = new Bird();
  pipes.push(new Pipe());
};

setup();

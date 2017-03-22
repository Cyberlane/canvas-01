import Bird from './bird';
import Pipe from './pipe';
import Score from './score';

let canvas;
let context;
let bird;
let pipes = [];
let score;
let key;
let frameCount = 0;
let gameOver = false;

const clearArea = () => {
  context.clearRect(0, 0, canvas.width, canvas.height);
};

const draw = () => {
  if (gameOver) {
    return;
  }
  clearArea();
  frameCount += 1;
  bird.update();
  bird.show();

  pipes = pipes
    .map((pipe) => {
      if (pipe.hits(bird)) {
        gameOver = true;
      }
      pipe.show();
      pipe.update();
      if (pipe.passed(bird)) {
        score.increase();
      }
      return pipe;
    })
    .filter(pipe => !pipe.offscreen());

  if (frameCount % 100 === 0) {
    pipes.push(new Pipe(canvas, bird.height));
  }
  score.show();
};

const keyPressed = () => {
  if (key === 32) {
    bird.up();
  }
};

const createCanvas = (width, height, { window, document }) => {
  canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  context = canvas.getContext('2d');
  document.body.insertBefore(canvas, document.body.childNodes[0]);
  setInterval(draw, 20);
  window.addEventListener('keydown', (e) => {
    key = e.keyCode;
    e.preventDefault();
    keyPressed();
  });
  window.addEventListener('touchstart', (e) => {
    key = 32;
    keyPressed();
  }, { passive: false });
  window.addEventListener('keyup', (e) => {
    key = false;
    e.preventDefault();
    keyPressed();
  });
  window.addEventListener('touchend', (e) => {
    key = false;
    e.preventDefault();
    keyPressed();
  }, { passive: false });
};

const getClientWidth = (document) => {
  const width = document.body.clientWidth;
  return width > 725
    ? width - 150
    : width;
};

const getClientHeight = (document) => {
  const { body, documentElement } = document;
  return Math.max(
    body.scrollHeight,
    body.offsetHeight,
    body.getBoundingClientRect().height,
    documentElement.clientHeight,
    documentElement.scrollHeight,
    documentElement.offsetHeight,
  );
};

export default (window, document) => {
  const width = getClientWidth(document);
  const height = getClientHeight(document);
  createCanvas(width, height - 100, { window, document });
  bird = new Bird(canvas);
  score = new Score(canvas);
  pipes.push(new Pipe(canvas, bird.height));
};

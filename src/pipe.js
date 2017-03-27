const random = (min, max) =>
  Math.floor(Math.random() * max) + min;

function Pipe(canvas, minGapHeight) {
  const context = canvas.getContext('2d');
  const getRandomHeight = () => random(1, (canvas.height - (minGapHeight / 2)) / 2);
  this.top = getRandomHeight();
  this.bottom = getRandomHeight();
  this.x = canvas.width;
  this.width = 20;
  this.speed = 2;
  this.highlight = false;
  this.scoreTaken = false;

  this.hits = (bird) => {
    if (bird.y < this.top || bird.y > canvas.height - this.bottom - bird.height) {
      if (bird.x + bird.width > this.x && bird.x < this.x + this.width) {
        this.highlight = true;
        return true;
      }
    }
    this.highlight = false;
    return false;
  };
  this.passed = bird => (
    bird.x >= this.x
  );
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
  this.setSpeed = (speed) => {
    this.speed = speed;
  };
  this.offscreen = () => this.x < -canvas.width;
  this.takeScore = () => {
    this.scoreTaken = true;
  };
}

export default Pipe;

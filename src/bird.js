function Bird(canvas) {
  const context = canvas.getContext('2d');
  this.y = canvas.height / 2;
  this.x = 64;
  this.width = 32;
  this.height = 32;
  this.gravity = 0.6;
  this.lift = -15;
  this.velocity = 0;
  this.show = () => {
    context.fillStyle = 'green';
    context.fillRect(this.x, this.y, this.width, this.height);
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

export default Bird;

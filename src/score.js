function Score(canvas) {
  const context = canvas.getContext('2d');
  const maxWidth = 100;
  const x = canvas.width - maxWidth;
  const y = 25;
  context.font = '30px Verdana';
  this.count = 0;
  this.show = () => {
    context.strokeStyle = 'black';
    context.lineWidth = 8;
    context.strokeText(this.count, x, y);
    context.fillStyle = 'white';
    context.fillText(this.count, x, y);
  };
  this.increase = () => {
    this.count += 1;
  };
}

export default Score;

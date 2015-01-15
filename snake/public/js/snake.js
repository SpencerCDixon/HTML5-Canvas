$(function() {
  var canvas = document.getElementById('my-canvas');
  var context = canvas.getContext('2d');

  context.font = '20px Arial';
  context.fillStyle = 'red';
  context.fillText('Hello World!', 300, 150);

  context.fillStyle = 'red';
  context.rect(50, 50, 100, 100);


  function drawGrid(strokeStyle, fillStyle) {
    controlContext.save();

    controlContext.fillStyle = fillStyle;
    controlContext.strokeStyle = strokeStyle;

    controlContext.restore();

  }










});

$(function() {
  var canvas = document.getElementById('grid');
  var context = canvas.getContext('2d');

  function drawGrid(context, color, stepx, stepy) {
    context.strokeStyle = color;
    context.lineWidth = 0.5;

    for (var i = stepx + 0.5; i < context.canvas.height; i += stepy) {
      context.beginPath();
      context.moveTo(i, 0);
      context.lineTo(i, context.canvas.height);
      context.stroke();
    }

    for (var i = stepy + 0.5; i < context.canvas.height; i += stepx) {
      context.beginPath();
      context.moveTo(0, i);
      context.lineTo(context.canvas.height, i);
      context.stroke();
    }
  }

  drawGrid(context, 'lightgray', 10, 10);

  function drawRect () {
    context.save();
    context.strokeStyle = "red";
    context.lineWidth = 5;
    context.beginPath()
    context.rect(80, 150, 150, 100);
    context.stroke();
    context.restore();
  }

  context.canvas.onmousedown = function (e) {
    drawRect();
  }

});

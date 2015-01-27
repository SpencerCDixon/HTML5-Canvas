$(function() {
  var canvas = document.getElementById('my-canvas');
  var context = canvas.getContext('2d');  


  function introText() {
    context.save();
    context.font = '30px Arial';
    context.fillStyle = 'black';
    context.fillText('Welcome to the berry game!', 120, 50);
    context.restore();
  }

  function drawBerry(x, y, radius, color) {
    context.save();
    context.beginPath();
    context.fillStyle = color;
    context.arc(x, y, radius, 0, Math.PI * 2);
    context.fill();
    context.restore();
  }

  introText();
  var blue = drawBerry(50, 100, 15, 'blue');
  var red = drawBerry(50, 300, 15, 'red');
  var yellow = drawBerry(50, 500, 15, 'yellow');


  var pattern = new Image();
  pattern.src = "/img/pattern.png";
  pattern.onload = function () {
    context.drawImage(pattern, 300, 300);
  }

  pattern.onclick = function (e) {

  }

});

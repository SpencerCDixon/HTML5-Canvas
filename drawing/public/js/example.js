$(function() {
  var canvas = document.getElementById('my-canvas');
  var context = canvas.getContext('2d');
  var image = new Image();
  var repeatButton = document.getElementById('repeatRadio');
  var repeatX = document.getElementById('repeatX');
  var repeatY = document.getElementById('repeatY');

  context.strokeStyle = "purple";
  context.fillStyle = "green";

  context.lineJoin = "round";
  context.lineWidth = 30;

  context.strokeRect(75, 100, 200, 200);
  context.fillRect(325, 100, 200, 200);

  context.canvas.onmousedown = function (e) {
    context.clearRect(0, 0, canvas.width, canvas.height);
  }

  function fillCanvasWithPattern(repeatString) {
    var pattern = context.createPattern(image, repeatString);
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = pattern;
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.fill();
  }

  repeatButton.onclick = function (e) {
    fillCanvasWithPattern('repeat');
  }
  repeatX.onclick = function (e) {
    fillCanvasWithPattern('repeat-x');
  }
  repeatY.onclick = function (e) {
    fillCanvasWithPattern('repeat-y');
  }

  image.src = '/img/pattern.png';
  image.onload = function (e) {
    console.log("hello");
  }
});

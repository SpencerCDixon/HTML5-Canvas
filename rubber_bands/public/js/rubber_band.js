$(function() {
  var canvas = document.getElementById('my-canvas'),
  context = canvas.getContext('2d'),
  eraseAllButton = document.getElementById('eraseAllButton'),
  strokeStyleSelect = document.getElementById('strokeStyleSelect'),
  guidewireCheckbox = document.getElementById('guidewireCheckbox'),
  drawingSurfaceImageData,
  mousedown = {},
  rubberbandRect = {},
  dragging = false,
  guidewires = guidewireCheckbox.checked;

  // Functions..........................................................
  //
  function drawRandomRect() {
    var randOne = Math.floor((Math.random() * 100) + 1);
    console.log(randOne);
  }

  drawRandomRect();

  function drawGrid(color, stepx, stepy) {
    context.save()
    context.strokeStyle = color;
    context.lineWidth = 0.5;
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);

    for (var i = stepx + 0.5; i < context.canvas.width; i += stepx) {
      context.beginPath();
      context.moveTo(i, 0);
      context.lineTo(i, context.canvas.height);
      context.stroke();
    }

    for (var i = stepy + 0.5; i < context.canvas.height; i += stepy) {
      context.beginPath();
      context.moveTo(0, i);
      context.lineTo(context.canvas.width, i);
      context.stroke();
    }

    context.restore();
  }

  function windowToCanvas(x, y) {
    var bbox = canvas.getBoundingClientRect();
    return { x: x - bbox.left * (canvas.width  / bbox.width),
      y: y - bbox.top  * (canvas.height / bbox.height) };
  }

  // Save and restore drawing surface...................................

  function saveDrawingSurface() {
    drawingSurfaceImageData = context.getImageData(0, 0,
        canvas.width,
        canvas.height);
  }

  function restoreDrawingSurface() {
    context.putImageData(drawingSurfaceImageData, 0, 0);
  }

  // Rubberbands........................................................

  function updateRubberbandRectangle(loc) {
    rubberbandRect.width  = Math.abs(loc.x - mousedown.x);
    rubberbandRect.height = Math.abs(loc.y - mousedown.y);

    if (loc.x > mousedown.x) rubberbandRect.left = mousedown.x;
    else                     rubberbandRect.left = loc.x;

    if (loc.y > mousedown.y) rubberbandRect.top = mousedown.y;
    else                     rubberbandRect.top = loc.y;

    context.save();
    context.strokeStyle = 'red';
    context.restore();
  } 

  function drawRubberbandShape(loc) {
    context.beginPath();
    context.moveTo(mousedown.x, mousedown.y);
    context.lineTo(loc.x, loc.y);
    context.stroke();
  }

  function updateRubberband(loc) {
    updateRubberbandRectangle(loc);
    drawRubberbandShape(loc);
  }

  // Guidewires.........................................................

  function drawHorizontalLine (y) {
    context.beginPath();
    context.moveTo(0,y+0.5);
    context.lineTo(context.canvas.width,y+0.5);
    context.stroke();
  }

  function drawVerticalLine (x) {
    context.beginPath();
    context.moveTo(x+0.5,0);
    context.lineTo(x+0.5,context.canvas.height);
    context.stroke();
  }

  function drawGuidewires(x, y) {
    context.save();
    context.strokeStyle = 'rgba(0,0,230,0.4)';
    context.lineWidth = 0.5;
    drawVerticalLine(x);
    drawHorizontalLine(y);
    context.restore();
  }

  // Canvas event handlers..............................................

  canvas.onmousedown = function (e) {
    var loc = windowToCanvas(e.clientX, e.clientY);

    e.preventDefault(); // prevent cursor change

    saveDrawingSurface();
    mousedown.x = loc.x;
    mousedown.y = loc.y;
    dragging = true;
  };

  canvas.onmousemove = function (e) {
    var loc; 

    if (dragging) {
      e.preventDefault(); // prevent selections

      loc = windowToCanvas(e.clientX, e.clientY);
      restoreDrawingSurface();
      updateRubberband(loc);

      if(guidewires) {
        drawGuidewires(loc.x, loc.y);
      }
    }
  };

  canvas.onmouseup = function (e) {
    loc = windowToCanvas(e.clientX, e.clientY);
    restoreDrawingSurface();
    updateRubberband(loc);
    dragging = false;
  };

  // Controls event handlers.......................................

  eraseAllButton.onclick = function (e) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid('lightgray', 10, 10);
    saveDrawingSurface(); 
  };

  strokeStyleSelect.onchange = function (e) {
    context.strokeStyle = strokeStyleSelect.value;
  };

  guidewireCheckbox.onchange = function (e) {
    guidewires = guidewireCheckbox.checked;
  };

  // Initialization................................................

  context.strokeStyle = strokeStyleSelect.value;
  drawGrid('lightgray', 10, 10);
});

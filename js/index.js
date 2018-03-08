// Canvas variables
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
// Settings
var inputShape = document.getElementById('input-shape');
var inputRatio = document.getElementById('input-ratio');
var inputIterations = document.getElementById('input-iterations');
var btnApplySettings = document.getElementById('btn-apply-settings');
// Style Options
var inputCanvasR = document.getElementById('canvasR');
var inputCanvasG = document.getElementById('canvasG');
var inputCanvasB = document.getElementById('canvasB');
var inputCanvasA = document.getElementById('canvasA');
var inputStrokeR = document.getElementById('strokeR');
var inputStrokeG = document.getElementById('strokeG');
var inputStrokeB = document.getElementById('strokeB');
var inputStrokeA = document.getElementById('strokeA');
var inputStrokeSize = document.getElementById('size');
var inputLineJoinRound = document.getElementById('round');
var inputLineJoinBevel = document.getElementById('bevel');
var inputLineJoinMitre = document.getElementById('miter');
var strokeColor = "#000000";
var strokeSize = 1;
var btnApplyOptions = document.getElementById('btn-apply-options');
// Options
var shapes = {
  LINE: 0,
  CIRCLE: 1,
  RECTANGLE: 2,
  ARC: 3
};
var shape = shapes.LINE;
var ratio = 1/3;
var iterations = 2;

// Make the bottom left corner of canvas (0,0)
ctx.translate(0, canvas.height);
ctx.scale(1, -1);

function drawLineFractal(r, iter) {
  var x1 = 50, y1 = canvas.height / 2;
  var x2 = canvas.width - 50, y2 = canvas.height / 2;
  var points = [x1, y1, x2, y2];
 
  for (var i = 0; i < iter; i++) {
    points = getLineFractalPoints(r, points);
  }
  
  ctx.beginPath();
  ctx.moveTo(points[0], points[1]);
  for (var i = 2; i < points.length - 1; i+=2) {
    ctx.lineTo(points[i], points[i+1]);
  }
  ctx.stroke();
}

function getLineFractalPoints(r, oldPoints) {
  var newPoints = [], div = Math.pow(r, -1);
  // For each pair of points, add points in between
  for (var i = 0; i < oldPoints.length - 3; i+=2) {
    var firstPointX = oldPoints[i], firstPointY = oldPoints[i+1];
    var lastPointX = oldPoints[i+2], lastPointY = oldPoints[i+3];
    var p1x = firstPointX, p1y = firstPointY, p2x, p2y, p3x, p3y;
    newPoints.push(p1x);
    newPoints.push(p1y);
    // For each point to add based off ratio
    for (var j = 1; j <= div; j++) {
      p3x = ((1-(j/div)) * firstPointX) + ((j/div) * lastPointX);
      p3y = ((1-(j/div)) * firstPointY) + ((j/div) * lastPointY);
      var length = Math.sqrt(Math.pow(p3x-p1x,2) + Math.pow(p3y-p1y,2));
      if (j % 2 != 0) {
        p2x = (Math.cos(60*Math.PI/180) * (p1x - p3x)) - (Math.sin(60*Math.PI/180) * (p1y - p3y)) + p3x;
        p2y = (Math.sin(60*Math.PI/180) * (p1x - p3x)) + (Math.cos(60*Math.PI/180) * (p1y - p3y)) + p3y;
      } else {
        p2x = (Math.cos(-60*Math.PI/180) * (p1x - p3x)) - (Math.sin(-60*Math.PI/180) * (p1y - p3y)) + p3x;
        p2y = (Math.sin(-60*Math.PI/180) * (p1x - p3x)) + (Math.cos(-60*Math.PI/180) * (p1y - p3y)) + p3y;
      }
      newPoints.push(p2x, p2y);
      newPoints.push(p3x, p3y);
      p1x = p3x;
      p1y = p3y;
    }
  }
  return newPoints;
}

function drawArcFractal(r, iter) {
  var x1 = 50, y1 = 50, x2 = canvas.width - 50, y2 = 50;
  var points = [x1, y1, x2, y2];

  for (var i = 0; i < iter; i++) {
    points = getArcFractalPoints(r, points);
  }
  // Get radius for all arcs
  var radius = Math.sqrt(Math.pow(points[2] - points[0], 2) + Math.pow(points[3] - points[1], 2)) / 2;
  var clockwise = true;
  if (points.length == 4) { clockwise = false; }
  for (var i = 0; i < points.length - 1; i+=2) {
    ctx.beginPath();
    var m = (points[i+3] - points[i+1])/(points[i+2]-points[i]);
    var startAngle = Math.atan(m);
    ctx.arc((points[i] + points[i+2])/2, (points[i+1] + points[i+3])/2, radius, startAngle, startAngle + Math.PI, clockwise);
    clockwise = !clockwise;
    ctx.stroke();
  }
  console.log(points);
}

function getArcFractalPoints(r, oldPoints) {
  var newPoints = [], div = Math.pow(r, -1);
  // For each pair of points, add points in between
  for (var i = 0; i < oldPoints.length - 3; i+=2) {
    var firstPointX = oldPoints[i], firstPointY = oldPoints[i+1];
    var lastPointX = oldPoints[i+2], lastPointY = oldPoints[i+3];
    var ax = firstPointX, ay = firstPointY, bx, by,  cx, cy;
    bx = (firstPointX + lastPointX) / 2;
    by = (firstPointY + lastPointY) / 2;
    var rad = Math.sqrt(Math.pow(bx - ax, 2) + Math.pow(by - ay, 2));
    newPoints.push(ax);
    newPoints.push(ax);
    // For each point to add based off ratio
    for (var j = 1; j <= div; j++) {
      var cosB = (ax - bx) / rad, sinB = (ay - by) / rad;
      var cos60 = Math.cos((180/div)*Math.PI/180), sin60 = Math.cos((180/div)*Math.PI/180);
      cx = bx + rad * ((cosB * cos60) + (sinB * sin60));
      cy = by + rad * ((sinB * cos60) - (cosB * sin60));
      newPoints.push(cx);
      newPoints.push(cy);
      ax = cx;
      ay = cy;
    }
  }
  return newPoints;
}

function drawCircleFractal(r, iter) {
  var xOrig = canvas.width / 2, yOrig = canvas.height / 2;
  var radius = canvas.height / 2 - 40;
  var xBase = xOrig - radius;

  for (var i = 0; i < iter; i++) {
    var radiusNew = radius * Math.pow(r, (i+1));
    for (var j = 0; j < Math.pow(r, -(i+1)); j++) {
      //var xNew = xOrig * (r*(i+1)) * (j+1);
      var xNew = xBase + radiusNew + (j)*2*radiusNew;
      ctx.beginPath();
      ctx.arc(xNew, yOrig, radiusNew, 0, 2*Math.PI);
      ctx.stroke();
    }
  }
  ctx.beginPath();
  ctx.arc(xOrig, yOrig, radius, 0, 2*Math.PI);
  ctx.stroke();
}

function drawRectangleFractal(r, iter) {
  var w = canvas.width / 3, h = canvas.height / 3;
  var x = (canvas.width - w) / 2, y = (canvas.height - h) / 2;
  // Parent rect
  ctx.fillRect(x, y, w, h);
  // Children rect
  drawChildRectangles(r, iter, x, y, w, h);
}

function drawChildRectangles(r, iter, x, y, w, h) {
  if (iter == 0) return;
  var newW = w / Math.pow(r, -1), newH = h / Math.pow(r, -1);
  ctx.fillRect(x - newW, y + h, newW, newH);
  ctx.fillRect(x + w, y + h, newW, newH);
  ctx.fillRect(x - newW, y - newH, newW, newH);
  ctx.fillRect(x + w, y - newH, newW, newH);
  
  drawChildRectangles(r, iter - 1, x - newW, y + h, newW, newH);
  drawChildRectangles(r, iter - 1, x + w, y + h, newW, newH);
  drawChildRectangles(r, iter - 1, x - newW, y - newH, newW, newH);
  drawChildRectangles(r, iter - 1, x + w, y - newH, newW, newH);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (shape == shapes.LINE) {
    drawLineFractal(ratio, iterations);
  } else if (shape == shapes.CIRCLE) {
    drawCircleFractal(ratio, iterations);
  } else if (shape == shapes.RECTANGLE) {
    drawRectangleFractal(ratio, iterations);
  } else if (shape == shapes.ARC) {
    drawArcFractal(ratio, iterations);
  }
}

btnApplySettings.addEventListener('click', function() {
  shape = inputShape.options[inputShape.selectedIndex].value;
  ratio = 1 / inputRatio.value;
  iterations = inputIterations.value;
  draw();
});

btnApplyOptions.addEventListener('click', function() {
  // Canvas options
  var cR = inputCanvasR.value, cG = inputCanvasG.value, cB = inputCanvasB.value, cA = inputCanvasA.value;
  var sR = inputStrokeR.value, sG = inputStrokeG.value, sB = inputStrokeB.value, sA = inputStrokeA.value;
  strokeSize = inputStrokeSize.value;
  var cColor = 'rgba('+cR+','+cG+','+cB+','+cA/255+')', sColor = 'rgba('+sR+','+sG+','+sB+','+sA/255+')';
  canvas.style.background = cColor;
  strokeColor = rgbaToHex(sColor);
  ctx.strokeStyle = strokeColor;
  ctx.lineWidth = strokeSize;
  ctx.fillStyle = strokeColor;
  if (inputLineJoinRound.checked) { ctx.lineJoin = "round"; }
  else if (inputLineJoinBevel.checked) { ctx.lineJoin = "bevel"; }
  else if (inputLineJoinMitre.checked) { ctx.lineJoin = "miter"; }
  draw();
});

function rgbaToHex(rgb){
  rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
  return (rgb && rgb.length === 4) ? "#" +
   ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
   ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
   ("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : '';
 }

function changeCanvasColor() {
  var r = inputCanvasR.value,
    g = inputCanvasG.value,
    b = inputCanvasB.value,
    a = inputCanvasA.value;
  document.getElementById('color-canvas').style.background = "rgba("+r+","+g+","+b+","+(a/255)+")";
}
inputCanvasR.addEventListener('change', changeCanvasColor);
inputCanvasG.addEventListener('change', changeCanvasColor);
inputCanvasB.addEventListener('change', changeCanvasColor);
inputCanvasA.addEventListener('change', changeCanvasColor);

function changeStrokeColor() {
  var r = inputStrokeR.value,
    g = inputStrokeG.value,
    b = inputStrokeB.value,
    a = inputStrokeA.value;
  document.getElementById('color-stroke').style.background = "rgba("+r+","+g+","+b+","+(a/255)+")";
}
inputStrokeR.addEventListener('change', changeStrokeColor);
inputStrokeG.addEventListener('change', changeStrokeColor);
inputStrokeB.addEventListener('change', changeStrokeColor);
inputStrokeA.addEventListener('change', changeStrokeColor);

document.getElementById('btn-change-problem').addEventListener('click', function() {
  window.location = "/~agaudrea/427546s2018/prog-hws/2/index2.html";
});

draw();

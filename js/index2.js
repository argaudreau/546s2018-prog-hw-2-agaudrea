// Canvas variables
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
// Settings
var inputRadius = document.getElementById('input-radius');
var inputScore = document.getElementById('input-score');
var btnApplySettings = document.getElementById('btn-apply-settings');
// Style Options
var inputTireR = document.getElementById('tireR');
var inputTireG = document.getElementById('tireG');
var inputTireB = document.getElementById('tireB');
var inputTireA = document.getElementById('tireA');
var inputTireSlow = document.getElementById('slow');
var inputTireMedium = document.getElementById('medium');
var inputTireFast = document.getElementById('fast');
var inputRimR = document.getElementById('rimR');
var inputRimG = document.getElementById('rimG');
var inputRimB = document.getElementById('rimB');
var inputRimA = document.getElementById('rimA');
var inputRimSize = document.getElementById('rimSize');
var inputCanvasR = document.getElementById('canvasR');
var inputCanvasG = document.getElementById('canvasG');
var inputCanvasB = document.getElementById('canvasB');
var inputCanvasA = document.getElementById('canvasA');
var btnApplyOptions = document.getElementById('btn-apply-options');
// Options
var wheelRadius = 100;
var wheelScore = 100;
var speed = 5;
var tireColor = "#000000";
var rimColor = "#9e9e9e";
var degree = 0;
var rimScale = 0.7;

function drawRim(radius) {
  var x = canvas.width/2, y = canvas.height/2;
  // Outer edge
  ctx.beginPath();
  ctx.arc(x, y, radius * rimScale, 0, 2 * Math.PI);
  ctx.fillStyle = rimColor;
  ctx.fill();
  ctx.lineWidth = 1;
  ctx.strokeStyle = '#000000';
  ctx.stroke();
  // Inner edge
  ctx.beginPath();
  ctx.arc(x, y, radius * rimScale * 0.2, 0, 2 * Math.PI);
  ctx.stroke();
  // Lugs
  ctx.beginPath();
  ctx.arc(x, y * 0.90, radius * rimScale * 0.1, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(x, y * 1.1, radius * rimScale * 0.1, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(x * 0.92, y, radius * rimScale * 0.1, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(x * 1.08, y, radius * rimScale * 0.1, 0, 2 * Math.PI);
  ctx.stroke();
}

function drawWheel(radius, score) {
  // Find center of canvas
  var x = canvas.width/2, y = canvas.height/2;
  ctx.beginPath();
  if (score == 100) {
    // If perfect score, draw circle
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
  } else if (score >= 80 && score < 100) {
    // If first offense, score is between 80-99
    ctx.ellipse(x, y, radius, radius * (score / 100), 0, 0, 2 * Math.PI);
  } else if (score >= 3 && score < 80) {
    // If second offense, score is between 3-79
    ctx.moveTo (x + radius * Math.cos(0), y + radius *  Math.sin(0));          
    for (var i = 1; i <= score; i += 1) {
        ctx.lineTo(x + radius * Math.cos(i * 2 * Math.PI / score), y + radius * Math.sin(i * 2 * Math.PI / score));
    }
  }
  ctx.stroke();
  ctx.fillStyle = tireColor;
  ctx.fill();
  ctx.restore();
  drawRim(radius);
}

// Will actually rotate whole canvas
function rotateWheel() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.translate(canvas.width/2, canvas.height/2);
  ctx.rotate(2 * Math.PI / 180);
  ctx.translate(-canvas.width/2, -canvas.height/2);
  drawWheel(wheelRadius, wheelScore);
}

// Rotate it over time
var interval = setInterval(rotateWheel, speed);

btnApplySettings.addEventListener('click', function() {
  wheelRadius = inputRadius.value;
  wheelScore = inputScore.value;
});

btnApplyOptions.addEventListener('click', function() {
  // Tire options
  var tR = inputTireR.value, tG = inputTireG.value, tB = inputTireB.value, tA = inputTireA.value;
  var tColor = 'rgba('+tR+','+tG+','+tB+','+tA/255+')';
  if (inputTireSlow.checked) { speed = inputTireSlow.value;}
  else if (inputTireMedium.checked) { speed = inputTireMedium.value; }
  else if (inputTireFast.checked) { speed = inputTireFast.value; }
  clearInterval(interval);
  interval = setInterval(rotateWheel, speed);
  document.getElementById('color-tire').style.background = tColor;
  tireColor = rgbaToHex(tColor);
  // Rim options
  var rR = inputRimR.value, rG = inputRimG.value, rB = inputRimB.value, rA = inputRimA.value;
  var rColor = 'rgba('+rR+','+rG+','+rB+','+rA/255+')';
  document.getElementById('color-rim').style.background = rColor;
  rimColor = rgbaToHex(rColor);
  rimScale = inputRimSize.value / 100;
  // Canvas options
  var cR = inputCanvasR.value, cG = inputCanvasG.value, cB = inputCanvasB.value, cA = inputCanvasA.value;
  var cColor = 'rgba('+cR+','+cG+','+cB+','+cA/255+')';
  canvas.style.background = cColor;
});

function rgbaToHex(rgb){
  rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
  return (rgb && rgb.length === 4) ? "#" +
   ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
   ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
   ("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : '';
 }

function changeTireColor() {
  var r = inputTireR.value,
    g = inputTireG.value,
    b = inputTireB.value,
    a = inputTireA.value;
  document.getElementById('color-tire').style.background = "rgba("+r+","+g+","+b+","+(a/255)+")";
}
inputTireR.addEventListener('change', changeTireColor);
inputTireG.addEventListener('change', changeTireColor);
inputTireB.addEventListener('change', changeTireColor);
inputTireA.addEventListener('change', changeTireColor);

function changeRimColor() {
  var r = inputRimR.value,
    g = inputRimG.value,
    b = inputRimB.value,
    a = inputRimA.value;
  document.getElementById('color-rim').style.background = "rgba("+r+","+g+","+b+","+(a/255)+")";
}
inputRimR.addEventListener('change', changeRimColor);
inputRimG.addEventListener('change', changeRimColor);
inputRimB.addEventListener('change', changeRimColor);
inputRimA.addEventListener('change', changeRimColor);

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

document.getElementById('btn-change-problem').addEventListener('click', function() {
  window.location = "/~agaudrea/427546s2018/prog-hws/2/index.html";
});

var canvas = document.querySelector("canvas");
canvas.width = 800;
canvas.height = 600;

var ctx = canvas.getContext("2d");

//Alphabed a - z => <97,122>
//Alphabed A - Z => <65,90>

var keys = new Array();
var numOfKeyboxes = 3;
var xOffset = 100;
var yOffset = 700;

//generate key boxex
var generateKeyBoxes = function(){
	for (var i = numOfKeyboxes; i >= 0; i--) {
		var gCharCode = 97 + Math.round(Math.random() * 25); 
		var tempKey = new Keybox(gCharCode,xOffset*i);
		tempKey.y -=  yOffset + Math.round(Math.random() * 600); 
		keys.push(tempKey);
	};
}

var generateKeyBox = function(xOffset){
		var gCharCode = 97 + Math.round(Math.random() * 25); 
		var tempKey = new Keybox(gCharCode,xOffset);
		tempKey.y -=  yOffset + Math.round(Math.random() * 600); 
		return tempKey;
}

generateKeyBoxes();

var keySpeed = 3;

//canvas animation 
function draw(){
	ctx.clearRect(0,0,canvas.width,canvas.height);

	drawKeyBoxes();

	window.requestAnimationFrame(draw);
}

var drawKeyBoxes = function(){
	for (var i = numOfKeyboxes; i >= 0; i--) {
		var k = keys[i];
		k.draw();
		k.y += keySpeed;
		if(k.y > canvas.height){
			k.y = 0;
			var oldKey = keys.splice(i,1);
			keys.push(generateKeyBox(k.xOffset));
		}
	};
}

window.requestAnimationFrame(draw);
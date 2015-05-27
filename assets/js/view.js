var View = function(){
}

var model = new Model();
var keyboxManager = model.keyboxManager;
var canvas = document.querySelector("canvas");
canvas.width = 800;
canvas.height = 600;
var ctx = document.querySelector("canvas").getContext("2d");

var keySpeed = 6;
var numOfKeyboxes = keyboxManager.numOfKeyboxes;
keyboxManager.generateKeyBoxes();
var keys = keyboxManager.keys;

var keyPressed = false;

function drawKeyBoxes(){
	//canvas animation 
	for (var i = numOfKeyboxes; i >= 0; i--) {
		var k = keys[i];
		k.draw();
		k.y += keySpeed;
		if(k.y > canvas.height){
			k.y = 0;
			var oldKey = keys.splice(i,1);
			keys.push(keyboxManager.generateKeyBox(k.xOffset));
		}
	};
}

var date = new Date().getMilliseconds();
var dTime = 0;

function draw(){
	ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
	drawKeyBoxes();
	if (keyPressed && dTime > 0) {
		model.view.drawCheckBar();
	}else{
		keyPressed = false;
	};
	dTime = dTime - 1; 
	window.requestAnimationFrame(draw);
}

window.requestAnimationFrame(draw);

View.prototype.showPressed = function(){
	//blink the line on canvas
	keyPressed = true;
	dTime = 2;
}

View.prototype.drawCheckBar = function(){
	var width = canvas.width;
	var height = canvas.height;
	var barHeight = 100;
	ctx.fillStyle = '#230929';
	ctx.beginPath();
	ctx.fillRect(0,height-barHeight,width,barHeight);
	ctx.closePath;
}




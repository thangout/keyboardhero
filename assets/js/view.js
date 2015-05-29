var View = function(){
	this.defaultCheckBarColorFalse = "rgba(255,0,0,1)";	 
	this.defaultCheckBarColorTrue = "rgba(0,255,0,1)";	 
	this.checkBarColor = "#ff0000";	
}

var model = new Model();
var keyboxManager = model.keyboxManager;
var canvas = document.querySelector("canvas");
canvas.width = 800;
canvas.height = 600;
var ctx = document.querySelector("canvas").getContext("2d");

var keySpeed = 3;
var numOfKeyboxes = keyboxManager.numOfKeyboxes;
keyboxManager.generateKeyBoxes();
var keys = keyboxManager.keys;

var keyPressed = false;

function drawKeyBoxes(){
	//canvas animation 
	for (var i = numOfKeyboxes; i >= 0; i--) {
		var k = keys[i];
		ctx.beginPath();
		ctx.fillStyle = "#000";
		if (k) {
			k.draw();
			ctx.closePath();
			k.y += keySpeed;
			if(k.y > canvas.height){
				k.y = 0;
				var oldKey = keys.splice(i,1);
				model.penalizePlayer();
				keyboxManager.generateKeyBox(k.xOffset);
			}
		}else{
				var xOffset = Math.floor(Math.random() * 4) * 100;
				keyboxManager.generateKeyBox(xOffset);
		};
	};
}

var date = new Date().getMilliseconds();
var dTime = 0;

function draw(){
	ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
	drawKeyBoxes();

	model.view.drawCheckBar();
	if (keyPressed && dTime > 0) {
		model.view.drawPressed();
	}else{
		keyPressed = false;
	};

	model.view.drawPlayerStatus();
	window.requestAnimationFrame(draw);
}


window.requestAnimationFrame(draw);

//blink the line on canvas
View.prototype.showPressed = function(checkBool){
	keyPressed = true;
	if (checkBool) {
		this.checkBarColor = this.defaultCheckBarColorTrue;	
	}else{
		this.checkBarColor = this.defaultCheckBarColorFalse;	
	};
	dTime = 6;
}

View.prototype.drawPressed = function(){
	var width = canvas.width;
	var height = canvas.height;
	var barHeight = 100;
	ctx.beginPath();
	ctx.fillStyle = this.checkBarColor; 
	ctx.fillRect(0,height-barHeight,width,barHeight);
	ctx.closePath();
	dTime = dTime - 1; 
}

View.prototype.drawCheckBar = function(){
	var width = canvas.width;
	var height = canvas.height;
	var barHeight = 100;
	// ctx.restore();
	ctx.beginPath();
	ctx.fillStyle = '#ff0929';
	ctx.fillRect(0,height-barHeight,width,5);
	ctx.closePath();
}

View.prototype.drawPlayerStatus = function(){
	ctx.beginPath();		
	ctx.fillStyle = '#000000';
	ctx.font="20px Georgia";
	ctx.fillText("Best score: " + model.storage.getScore(),600,20);
	ctx.fillText("Score: " + model.player.score,600,50);
	ctx.fillText("Accuracy: " + model.player.accuracy +"%",600,80);
	ctx.closePath();
}
var View = function(){
	this.defaultCheckBarColorFalse = "rgba(255,0,0,1)";	 
	this.defaultCheckBarColorTrue = "rgba(0,255,0,1)";	 
	this.checkBarColor = "#ff0000";	
	this.checkBarAlpha = 1;
	this.dTime = 15;
}

var model = new Model();
var keyboxManager = model.keyboxManager;
var canvas = document.querySelector("canvas");
canvas.width = 800;
canvas.height = 600;
var ctx = canvas.getContext("2d");

var numOfKeyboxes = keyboxManager.numOfKeyboxes;
keyboxManager.generateKeyBoxes();
var keys = keyboxManager.keys;

var keyPressed = false;

/**
* Draws keyboxes and obtain new ones if they disappear
*/
function drawKeyBoxes(){
	//canvas animation 
	for (var i = numOfKeyboxes; i >= 0; i--) {
		var k = keys[i];
		ctx.beginPath();
		ctx.fillStyle = "#000";
		if (k) {
			k.draw();
			ctx.closePath();
			k.y += model.keySpeed;
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

/**
* Main draw function
*/
function draw(){
	if (model.startGame) {
		ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
		drawKeyBoxes();

		model.view.drawCheckBar();
		if (keyPressed && model.view.dTime > 0) {
			model.view.drawPressed();
		}else{
			keyPressed = false;
		};

		model.view.drawPlayerStatus();
		window.requestAnimationFrame(draw);
	};
}


window.requestAnimationFrame(draw);


/**
* If the key is pressed it draws the bar line either green or red 
*/
View.prototype.showPressed = function(checkBool){
	keyPressed = true;
	if (checkBool) {
		this.checkBarColor = this.defaultCheckBarColorTrue;	
	}else{
		this.checkBarColor = this.defaultCheckBarColorFalse;	
	};
	this.dTime = 15;
	this.checkBarAlpha = 1;
}

/**
* Draws the bar check line
*/
View.prototype.drawPressed = function(){
	var width = canvas.width;
	var height = canvas.height;
	var barHeight = 100;
	ctx.beginPath();
	ctx.fillStyle = this.checkBarColor; 
	var r = parseInt(ctx.fillStyle.substring(1,3), 16);
	var g = parseInt(ctx.fillStyle.substring(3,5), 16);
	var b = parseInt(ctx.fillStyle.substring(5), 16);
	ctx.fillStyle = "rgba(" + r + "," + g + "," + b + "," + this.checkBarAlpha + ")";	
	ctx.fillRect(0,height-barHeight,width,barHeight);
	ctx.closePath();
	this.dTime -= 1; 
	this.checkBarAlpha -= 0.05;
}

/**
* Draws the red line
*/
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

/**
* Draw players status
*/
View.prototype.drawPlayerStatus = function(){
	var statusYOffset = 30;
	var statusYStart = 50; 
	ctx.beginPath();		
	ctx.fillStyle = '#000000';
	ctx.font="20px Georgia";
	ctx.fillText("Best score: " + model.storage.getScore(),600,statusYStart);
	ctx.fillText("Score: " + model.player.score,600,statusYStart + statusYOffset*1);
	ctx.fillText("Accuracy: " + model.player.accuracy +"%",600,statusYStart + statusYOffset*2);
	ctx.fillText("Score bonus: " + model.player.scoreBonus +"x",600,statusYStart + statusYOffset*3);
	ctx.closePath();
}

/**
* Starts the animation(game)
*/
View.prototype.startGame = function(){
	window.requestAnimationFrame(draw);
}
var View = function(){
}

var model = new Model();

var canvas = document.querySelector("canvas");
canvas.width = 800;
canvas.height = 600;
var ctx = document.querySelector("canvas").getContext("2d");

var keySpeed = 3;
var numOfKeyboxes = 3;
model.keybox.init();
var keys = model.keybox.keys;

function drawKeyBoxes(){
	//canvas animation 
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

function draw(){
	ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
	drawKeyBoxes();
	window.requestAnimationFrame(draw);
}

window.requestAnimationFrame(draw);

View.prototype.showPressed = function(){
	//blink the line on canvas
	console.log("asd");
	this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
	var width = this.canvas.width;
	var height = this.canvas.height;
	this.ctx.fillStyle = '#230929';
	this.ctx.beginPath();
	this.ctx.fillRect(0,width - 100,width,100);
	this.ctx.closePath;
	this.ctx.beginPath();
}




function View(e){
	this.canvas = document.querySelector("canvas");
	this.canvas.width = 800;
	this.canvas.height = 600;
	this.ctx = 	document.querySelector("canvas").getContext("2d");
	this.keySpeed = 3;
}

View.prototype.init = function(){
	window.requestAnimationFrame(this.draw);
}

View.prototype.drawKeyBoxes = function(){
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

View.prototype.draw = function(){
	this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);

	drawKeyBoxes();

	window.requestAnimationFrame(this.draw);
}

View.prototype.showPressed = function(){
	//blink the line on canvas
	var width = this.canvas.width;
	var height = this.canvas.height;
	this.ctx.fillStyle = '#230929';
	this.ctx.beginPath();
	this.ctx.fillRect(0,width - 100,width,height);
	this.ctx.closePath;
	this.ctx.beginPath();
}
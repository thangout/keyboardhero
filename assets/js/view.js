var View = function(){
	var canvas = document.querySelector("canvas");
	canvas.width = 800;
	canvas.height = 600;

	var ctx = canvas.getContext("2d");

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
}

View.prototype.showPressed = function(){
	//blink the line on canvas
}
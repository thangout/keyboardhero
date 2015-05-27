var Keybox = function(charCode, xOffset){
	this.charCode = charCode; 
	this.x = 0;
	this.y = 0;
	this.dx = 100;
	this.dy = 100;
	this.xOffset = xOffset;

	this.keys = new Array();
	this.numOfKeyboxes = 3;
	this.xOffset = 100;
	this.yOffset = 700;
}

Keybox.prototype.draw = function(){
		var dxPosition = this.x + this.xOffset;
		ctx.save();
		ctx.fillStyle = '#fff';
		ctx.beginPath();
		ctx.fillRect(dxPosition,this.y,this.dx,this.dy);
		ctx.closePath;
		ctx.beginPath();
		ctx.restore();
		ctx.font="20px Georgia";
		ctx.fillText(String.fromCharCode(this.charCode),dxPosition+40,this.y+55);
		ctx.closePath;
}

Keybox.prototype.init = function(){
	ke = this.keys;
	//Alphabed a - z => <97,122>
	//Alphabed A - Z => <65,90>
	//generate key boxex
	function generateKeyBoxes (){
		for (var i = numOfKeyboxes; i >= 0; i--) {
			var gCharCode = 97 + Math.round(Math.random() * 25); 
			var tempKey = new Keybox(gCharCode,this.xOffset*i);
			tempKey.y -=  this.yOffset + Math.round(Math.random() * 600); 
			this.ke.push(tempKey);
		};
	}

	var generateKeyBox = function(xOffset){
			var gCharCode = 97 + Math.round(Math.random() * 25); 
			var tempKey = new Keybox(gCharCode,xOffset);
			tempKey.y -=  yOffset + Math.round(Math.random() * 600); 
			return tempKey;
	}

	generateKeyBoxes();
}

Keybox.prototype.checkPressedKey = function(charCode){
	//check pressed key and if it was pressed at right line
}
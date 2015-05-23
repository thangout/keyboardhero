var Keybox = function(charCode, xOffset){
	this.charCode = charCode; 
	this.x = 0;
	this.y = 0;
	this.dx = 100;
	this.dy = 100;
	this.xOffset = xOffset;
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



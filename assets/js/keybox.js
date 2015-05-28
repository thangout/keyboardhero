var Keybox = function(charCode, xOffset){
	this.charCode = charCode; 
	this.x = 0;
	this.y = 0;
	this.dx = 100;
	this.dy = 100;

	this.xOffset = xOffset;
	this.yOffset = 700;
}

Keybox.prototype.draw = function(){
		var dxPosition = this.x + this.xOffset;
		ctx.save();
		ctx.beginPath();
		ctx.fillStyle = '#fff';
		ctx.fillRect(dxPosition,this.y,this.dx,this.dy);
		ctx.closePath;
		ctx.beginPath();
		ctx.restore();
		ctx.font="40px Georgia";
		ctx.fillText(String.fromCharCode(this.charCode),dxPosition+40,this.y+60);
		ctx.closePath();
		ctx.save();
}

var KeyboxManager =  function(){
	this.keys = new Array();
	this.numOfKeyboxes = 3;
	this.xOffset = 100;
	this.checkBarLine = 500;
	this.percentageInRequired = 50;
	this.checkBarLineHeight = 100;
	this.checkTolerance = 25;
}

KeyboxManager.prototype.generateKeyBoxes = function(){
	//Alphabed a - z => <97,122>
	//Alphabed A - Z => <65,90>
	for (var i = this.numOfKeyboxes; i >= 0; i--) {
		var gCharCode = 97 + Math.round(Math.random() * 25); 
		var tempKey = new Keybox(gCharCode,this.xOffset*i);
		tempKey.y -=  tempKey.yOffset + Math.round(Math.random() * 600); 
		this.keys.push(tempKey);
	};	
}

KeyboxManager.prototype.generateKeyBox = function(xOffset){
	var gCharCode = 97 + Math.round(Math.random() * 25); 
	var tempKey = new Keybox(gCharCode,xOffset);
	tempKey.y -=  tempKey.yOffset + Math.round(Math.random() * 600); 
	this.keys.push(tempKey);
	return tempKey;
}

KeyboxManager.prototype.checkCharcode = function(charCode){
	for (var i = this.keys.length - 1; i >= 0; i--) {
		var percentageIn = this.keys[i].y+this.keys[i].dx - this.checkBarLine;
		if(this.keys[i].charCode == charCode && percentageIn > this.percentageInRequired
			&& percentageIn < this.checkBarLineHeight + this.checkTolerance){
			return true;	
		}
	};
	return false;
}

/**
* Represents the Key 
*/
var Keybox = function(charCode, xOffset){
	this.charCode = charCode; 
	this.x = 0;
	this.y = 0;
	this.dx = 100;
	this.dy = 100;

	this.xOffset = xOffset;
	this.yOffset = 700;
}

/*
* Draw the key box
*/
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

/**
* Manages the keyboxes 
*/
var KeyboxManager =  function(){
	this.keys = new Array();
	this.numOfKeyboxes = 3;
	this.xOffset = 100;
	this.checkBarLine = 500;
	this.percentageInRequired = 50;
	this.checkBarLineHeight = 100;
	this.checkTolerance = 25;
}

/**
* Fill the initial array of key boxes
*/
KeyboxManager.prototype.generateKeyBoxes = function(){
	//Alphabed a - z => <97,122>
	//Alphabed A - Z => <65,90>
	for (var i = this.numOfKeyboxes; i >= 0; i--) {
		var gCharCode = this.generateCharcode(); 
		var tempKey = new Keybox(gCharCode,this.xOffset*i);
		tempKey.y -= this.generateYOffset(tempKey); 
		this.keys.push(tempKey);
	};	
}

/**
* Generates a new keybox 
*/
KeyboxManager.prototype.generateKeyBox = function(xOffset){
	var gCharCode = this.generateCharcode(); 
	var tempKey = new Keybox(gCharCode,xOffset);
	tempKey.y -= this.generateYOffset(tempKey); 
	this.keys.push(tempKey);
	return tempKey;
}

/**
* Check whether the charCode is in the list 
*/
KeyboxManager.prototype.checkCharcode = function(charCode){
	for (var i = this.keys.length - 1; i >= 0; i--) {
		if(this.keys[i].charCode  == charCode && this.checkIn(i)){
			this.keys.splice(i,1);
			return true;
		}
	};
	return false;
}

/**
* Check whether the keybox i is in the check line 
*/
KeyboxManager.prototype.checkIn = function(i){
	var percentageIn = this.keys[i].y+this.keys[i].dx - this.checkBarLine;
	if(percentageIn > this.percentageInRequired
		&& percentageIn < this.checkBarLineHeight + this.checkTolerance){
		return true;
	}
	return false;
}

/**
* Remove keybox from the list 
*/
KeyboxManager.prototype.removeKeybox = function(charCode){
	for (var i =  0; i < this.keys.length; i++) {
			if (this.keys[i].charCode == charCode) {
				this.keys.splice(i,1);
			};
		};
}

/**
* Generates a charCode which is not in the list 
*/
KeyboxManager.prototype.generateCharcode = function(){
	while(true){
		var repeat = false;
		var gCharCode = 97 + Math.round(Math.random() * 25); 
		for (var i = this.keys.length - 1; i >= 0; i--) {
				if (gCharCode == this.keys[i].charCode) {
					repeat = true;
				};
		};

		if (!repeat) {
			return gCharCode;
		};
	}		
}

/**
* Generates a Y offset  
*/
KeyboxManager.prototype.generateYOffset = function(key){
	while(true){
		var repeat = false;
		var gYOffset = key.yOffset + Math.ceil(Math.random()*10)*100; 
		for (var i = this.keys.length - 1; i >= 0; i--) {
			var k = this.keys[i];
			if (k.xOffset == key.xOffset){
				if (k.yOffset - 20 <= gYOffset && k.yOffset + k.dy + 20 >= gYOffset) {
					repeat = true;		
				};	
				if (k.yOffset >= gYOffset - 20 && k.yOffset <= gYOffset + key.dy + 20) {
					repeat = true;		
				};	
			};
		};

		if (!repeat) {
			return gYOffset;
		};
	}
}


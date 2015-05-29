var Player = function(){
	this.score = 0;
	this.accuracy = 0;
	this.pressed = 0;
	this.successPressed = 0;
}

Player.prototype.updateInfo = function(checkBool){
	this.pressed += 1; 
	if (checkBool){
		this.score += 10;
		this.successPressed += 1;
	}else{
		this.score -= 5;
	};

	this.accuracy = Math.round((this.successPressed / this.pressed) * 100); 
}

Player.prototype.decreaseScore = function(val){
	this.score -= val;
}

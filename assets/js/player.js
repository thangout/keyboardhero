var Player = function(){
	this.score = 0;
	this.accuracy = 0;
	this.pressed = 0;
	this.successPressed = 0;
	this.scoreBonus = 1;
	this.streakRow = 0;
}

Player.prototype.updateInfo = function(checkBool){
	this.checkStreak(checkBool);
	this.pressed += 1; 
	if (checkBool){
		this.score += 10 * this.scoreBonus;
		this.successPressed += 1;
	}else{
		this.score -= 5;
	};

	this.accuracy = Math.round((this.successPressed / this.pressed) * 100); 
}

Player.prototype.decreaseScore = function(val){
	this.score -= val;
}

Player.prototype.checkStreak = function(checkBool){
	if (checkBool) {
		this.streakRow += 1;
	}else{
		this.streakRow = 0;
	};

	var s = this.streakRow;
	if (s > 5){
		this.scoreBonus = 1.5;
	}

	if(s > 10){
		this.scoreBonus = 2;
	}

	if(s > 15){
		this.scoreBonus = 2.5;
	}

	if(s > 20){
		this.scoreBonus = 3;
	}

	if(s < 5){
		this.scoreBonus = 1;
	};
}
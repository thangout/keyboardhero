var Model = function(){
	this.view = new View();
	this.keyboxManager = new KeyboxManager();
	this.player = new Player();
	this.storage = new ScoreStorage();
	this.keySpeed = 3;
	this.startGame = false;
}

/**
* Handle the Pressed Key and updates View 
*/
Model.prototype.handlePressedKey = function(charCode){
	if (this.checkCharcode(charCode)) {
		var checkBool = this.keyboxManager.checkCharcode(charCode);
		this.playSound(checkBool);
		this.view.showPressed(checkBool);
		this.player.updateInfo(checkBool);
		this.storage.saveScore(this.player.score);
		this.regulateSpeed();
	};
}

/**
* Decrease the players score 
*/
Model.prototype.penalizePlayer = function(){
	this.player.decreaseScore(1);
}

/**
* The speed of keyboxes depends on players score
*/
Model.prototype.regulateSpeed = function(){
	var score = this.player.score;
	var speedKoef = Math.round(score / 30);
	this.keySpeed = 3;
	for (var i = speedKoef - 1; i >= 0; i--) {
		this.keySpeed *= 1.05;	
	};
	if(this.keySpeed > 7 ){
		this.keySpeed = 7;
	}
}

/**
* Play a sound 
*/
Model.prototype.playSound = function(checkBool){
	if (checkBool) {
		oscillator.frequency.value = 2000;
	}else{
		oscillator.frequency.value = 3200;
	};	

	setTimeout(function(){oscillator.frequency.value = 0;},150);
}

/**
* Start or pause the game
*/
Model.prototype.handleStartGame = function(){
	if (this.startGame == false) {
		this.startGame = true;
		this.view.startGame();
	}else{
		this.startGame = false;
	};
}

/**
* Check wheter the charCode is in the range <97,122>
* return true if it is  
*/
Model.prototype.checkCharcode = function(charCode){
	if (charCode >= 97 && charCode <= 122) {
		return true;
	};
	return false;
}
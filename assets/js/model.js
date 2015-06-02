var Model = function(){
	this.view = new View();
	this.keyboxManager = new KeyboxManager();
	this.player = new Player();
	this.storage = new ScoreStorage();
	this.keySpeed = 3;
	this.startGame = false;
}

Model.prototype.handlePressedKey = function(charCode){
	var checkBool = this.keyboxManager.checkCharcode(charCode);
	this.playSound(checkBool);
	this.view.showPressed(checkBool);
	this.player.updateInfo(checkBool);
	this.storage.saveScore(this.player.score);
	this.regulateSpeed();
}

Model.prototype.penalizePlayer = function(){
	this.player.decreaseScore(1);
}

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

Model.prototype.playSound = function(checkBool){
	if (checkBool) {
		oscillator.frequency.value = 2000;
	}else{
		oscillator.frequency.value = 3200;
	};	

	setTimeout(function(){oscillator.frequency.value = 0;},150);
}

Model.prototype.handleStartGame = function(){
	if (this.startGame == false) {
		this.startGame = true;
		this.view.startGame();
	}else{
		this.startGame = false;
	};
}


var Model = function(){
	this.view = new View();
	this.keyboxManager = new KeyboxManager();
	this.player = new Player();
	this.storage = new ScoreStorage();
}

Model.prototype.handlePressedKey = function(charCode){
	var checkBool = this.keyboxManager.checkCharcode(charCode);
	this.view.showPressed(checkBool);
	this.player.updateInfo(checkBool);
	this.storage.saveScore(this.player.score);
	// this.updateView();
}

Model.prototype.updateView = function(){
	this.view.showPressed();
}

Model.prototype.penalizePlayer = function(){
	this.player.decreaseScore(1);
}


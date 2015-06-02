var ScoreStorage = function() {
	this.storage = localStorage;
} 

/**
* Save best score
*/
ScoreStorage.prototype.saveScore = function(score){
	if (!this.storage.getItem("highscore")) {
		this.storage.setItem("highscore", score);
	}else{
		var retrieveScore = this.storage.getItem("highscore");
		if (retrieveScore < score) {
			this.storage.setItem("highscore", score);
		};	
	};
}

/**
* Retrieve best score
*/
ScoreStorage.prototype.getScore = function(){
	if (!this.storage.getItem("highscore")) {
		return 0;
	}else{
		return this.storage.getItem("highscore");
	};	
}
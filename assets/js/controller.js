var Controller = function(){
	this.pauseButton = document.querySelector(".js-pauseButton");	
}

/**
* Handle key press
*/
Controller.prototype.handleKeyPress = function(e){
		model.handlePressedKey(e.charCode);
}

/**
* Handle buttons click  
*/
Controller.prototype.handlePlayButton = function(){
		$(".js-playButton").toggle();
		$(".js-pauseButton").toggle();
		model.handleStartGame();		
}

var controller = new Controller();
window.addEventListener("keypress",controller.handleKeyPress.bind(controller));

var playButton = document.querySelector(".js-playButton");
var pauseButton = document.querySelector(".js-pauseButton");

playButton.addEventListener("click",controller.handlePlayButton);
pauseButton.addEventListener("click",controller.handlePlayButton);
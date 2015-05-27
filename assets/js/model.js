var Model = function(){
	this.view = new View();
	this.keybox = new Keybox();

}

Model.prototype.handlePressedKey = function(charCode){
	this.updateView();
}

Model.prototype.updateView = function(){
	this.view.showPressed();
}
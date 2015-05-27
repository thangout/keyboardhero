var Model = function(){
	this.view = new View();
	this.keyboxManager = new KeyboxManager();

}

Model.prototype.handlePressedKey = function(charCode){
	this.updateView();
}

Model.prototype.updateView = function(){
	this.view.showPressed();
}
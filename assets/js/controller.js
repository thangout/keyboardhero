var Controller = function(){
	window.addEventListener("keypress",handleKeyPress);

	function handleKeyPress(e){
		//call method checkPressedKey in model 
		// console.log(e);
		model.handlePressedKey(e.charCode);
	}
}

var controller = new Controller();
var model = new Model();

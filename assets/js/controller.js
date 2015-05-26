var Controller = function(){
	window.addEventListener("keypress",handleKeyPress);

	function handleKeyPress(e){
		//call method checkPressedKey in model 
		console.log(e);
		var charCode = e.charCode;
		if (charCode == 97 ) {
			alert("ahoj");
		};
	}
}

var controller = new Controller();
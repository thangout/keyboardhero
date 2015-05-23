window.addEventListener("keypress",handleKeyPress);

function handleKeyPress(e){
	console.log(e);
	var charCode = e.charCode;
	if (charCode == 97 ) {
		alert("ahoj");
	};
}


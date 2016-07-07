$(document).ready(function(){
	var winningNumber; 
	var playerGuess; 
	function createNewWinningNumber(){
		winningNumber = Math.round(Math.random()*100); 
	}
	$("#enter").on("click", function(){
		playerGuess = $("#playerGuess").val();  
	}); 
	function checkGuess(){
		if (winningNumber === playerGuess){
			return true; 
		} else {
			return false; 
		}
	}
}); 

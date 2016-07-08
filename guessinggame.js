$(document).ready(function(){
	var winningNumber; 
	var playerGuess; 
	var guessesremaining = 10; 
	var previouslyGuessedNumbers = []; 
	function createNewWinningNumber(){
		winningNumber = Math.ceil(Math.random()*100); 
	}
	function playerGuessSubmission(){
		playerGuess = Number($("#playerGuess").val());  
		$("#playerGuess").val(null); 
	}
	function lowerOrHigher() {
		if (playerGuess<winningNumber){
			return "Your guess is <em>lower</em> than my number. ";
		} else {
			return "Your guess is <em>higher</em> than my number. ";
		}
	}
	function distanceFromWin() {
		var difference = Math.abs(playerGuess - winningNumber); 
		if (difference<10){
			return "The difference between our numbers is <em>less than 10</em>. ";
		} else if (difference < 25) {
			return "The difference between our numbers is <em>less than 25</em>. ";
		} else if (difference < 50) {
			return "The difference between our numbers is <em>less than 50</em>. ";
		} else {
			return "The difference between our numbers is <em>greater than 50</em>. ";
		}
	}
	function checkGuess(){
		if (winningNumber === playerGuess){
			$("#playerMessage").text("Congratulations! \n I was thinking of "+ winningNumber); 
		} else {
			if (previouslyGuessedNumbers.includes(playerGuess)){
				$("#playerMessage").text("You have already guessed "+ playerGuess+", "+ guessesremaining+" Guesses remaining."); 
			} else{
				guessesremaining --; 
				previouslyGuessedNumbers.push(playerGuess); 
				$("#playerMessage").text(guessesremaining+" Guesses remaining.");
				$("#playerMessage").prepend(lowerOrHigher());
				$("#playerMessage").prepend(distanceFromWin()); 
			}
		}
	}
	function generateHint(){
		// determine the correct number of guesses
		var hintsAvailable = 2 * guessesremaining;
		var possibilities = [];   
		// populate an array with that many random numbers 
		while (possibilities.length<=hintsAvailable){
			var newRand = Math.ceil(Math.random()*100);
			//ensure no repeats 
			if (newRand!==winningNumber&&!possibilities.includes(newRand)){
				possibilities.push(newRand); 
			}
		}
		//choose a random index and insert winning number there. 
		var randIndex = Math.floor(Math.random()*possibilities.length); 
		possibilities[randIndex] = winningNumber; 
		return possibilities; 
	}
	//Here we start actually calling functions 
	createNewWinningNumber(); 

	$("#enter").click(function(){
		playerGuessSubmission(); 
		checkGuess(); 
	});
	//Thanks StackOverflow 
	$('#playerGuess').keypress(function(e){
        if(e.which == 13){
            $('#enter').click();
        }
    });
	$("#hintButton").click(function(){
		var hintsArray = generateHint(); 
		hintsArray.forEach(function(hint){
			$("#hintList").append("<li>"+hint+"</li>"); 
		}); 
		$("#hintWindow").slideDown(); 
		$(this).prop("disabled", true);
	}); 
	$("#restart").click(function(){
		guessesremaining = 10; 
		$("#playerMessage").text("10 Guesses remaining."); 
		createNewWinningNumber();
		$("#hintWindow").slideUp(); 
		$("#hintList").empty(); 
		possibilities = []; 
		$("#hintButton").prop("disabled", false);
	}); 

}); 

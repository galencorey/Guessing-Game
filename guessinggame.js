$(document).ready(function(){
	var winningNumber; 
	var playerGuess; 
	var guessesremaining = 10; 
	var previouslyGuessedNumbers = [];
	var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend'; 
	function createNewWinningNumber(){
		winningNumber = Math.ceil(Math.random()*100); 
	}
	function playerGuessSubmission(){
		playerGuess = Number($("#playerGuess").val());  
		$("#playerGuess").val(null); 
	}
	function lowerOrHigher() {
		if (playerGuess<winningNumber){
			return playerGuess+" is <em>lower</em> than my number. ";
		} else {
			return playerGuess+" is <em>higher</em> than my number. ";
		}
	}
	function distanceFromWin() {
		var difference = Math.abs(playerGuess - winningNumber); 
		if (difference<10){
			return "The difference between "+playerGuess+" and my numbers is <em>less than 10</em>. ";
		} else if (difference < 25) {
			return "The difference between "+playerGuess+" and my numbers is <em>less than 25</em>. ";
		} else if (difference < 50) {
			return "The difference between "+playerGuess+" and my numbers is <em>less than 50</em>. ";
		} else {
			return "The difference between "+playerGuess+" and my numbers is <em>greater than 50</em>. ";
		}
	}
	function checkGuess(){
		if (winningNumber === playerGuess){
			$("#playerMessage").empty(); 
			$("#playerAlert").text("Congratulations! \n I was thinking of "+ winningNumber +"!"); 
			$("#playerAlert").addClass("animated rubberBand").one(animationEnd, function() {
            	$("#playerAlert").removeClass('animated rubberBand');
            	$("#restart").click(); 
        	}); 
			
		} else {
			if (previouslyGuessedNumbers.includes(playerGuess)){
				$("#playerMessage").empty(); 
				$("#playerAlert").text("You have already guessed "+ playerGuess+". "); 
				$("#playerMessage").append(guessesremaining+" Guesses remaining."); 
			} else{
				if (guessesremaining === 0){
					loser(); 
				} else {
					guessesremaining --; 
					previouslyGuessedNumbers.push(playerGuess); 
					$("#playerAlert").empty(); 
					$("#playerMessage").empty(); 
					$("#playerMessage").append("<li>"+lowerOrHigher()+"</li>");
					$("#playerMessage").append("<li>"+distanceFromWin()+"</li>"); 
					$("#playerMessage").append("<li>"+guessesremaining+" Guesses remaining.</li>");
				}
			}
		}
	}
	function generateHint(){
		// determine the correct number of guesses
		var hintsAvailable = 2 * guessesremaining;
		var possibilities = [];   
		// populate an array with that many random numbers 
		while (possibilities.length<hintsAvailable){
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
	function loser(){
		$("#playerMessage").empty(); 
		$("#playerAlert").text("You lose."); 
		$("#playerAlert").addClass("animated hinge").one(animationEnd, function() {
            $("#playerAlert").removeClass('animated hinge');
            $("#restart").click(); 
       }); 
	}
	//Here we start actually calling functions 
	createNewWinningNumber(); 

	$("#startButton").click(function(){
		$("#opening").addClass("animated flipOutY").one(animationEnd, function() {
            $("main").fadeIn(); 
       }); 
	});

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
		$("#playerAlert").empty(); 
		$("#playerMessage").empty(); 
		$("#playerMessage").append("<li>10 Guesses remaining.</li>"); 
		createNewWinningNumber();
		$("#hintWindow").slideUp(); 
		$("#hintList").empty(); 
		possibilities = []; 
		previouslyGuessedNumbers = [];
		$("#hintButton").prop("disabled", false);
	}); 

}); 

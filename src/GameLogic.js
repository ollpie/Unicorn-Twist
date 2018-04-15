App.GameLogic = (function() {
    var that = {},
    HIT_LIGHT = 5,
    HIT_MEDIUM = 10,
    HIT_HARD = 15,
    HIT_WRONG_KEY = 3,
    PINKY = [1.0 ,1.0], // {Attack, Defense}
    BLACKY = [0.8, 0.8],
    PEGGY = [1.2, 1.2],
    UNICORNS = [PINKY, BLACKY, PEGGY],
    unicornP1 = null,
    unicornP2 = null,
    keysP1 = new Array(),
    keysP2 = new Array(),
    isTurnP1 = true,
    healthP1 = 100,
    healthP2 = 100,
    moves1_P1 = null,
    moves1_P2 = null,
    moves2_P1 = null,
    moves2_P2 = null,
    moves3_P1 = null,
    moves3_P2 = null,
    moves_array_P1 = null,
    moves_array_P2 = null,
    buttonsPressedP1 = 0,
    buttonsPressedP2 = 0,
    freeToRemoveP1 = [],
    freeToRemoveP2 = [],
    hsVal = null,
	player1Uni = null;
    player2Uni = null;
    max = 4,
    min =0,
    nextmove = null,
    p1Moves = null,
    p2Moves = null,
    last3MovesP1 = [],
    last3MovesP2 = [],
    rodundCountP1 = 0,
    rodundCountP2 = 0,
    lastButton = null,
    lastEvent = null,
	heldKeys = {},
	gameIsOver = false,
   
    init = function() {
    	moves1_P1 = ["F","R", "2", "A", "G", "4", "N", "S", "2", "A", "5","E", "W", "S", "T", "C", "R", "5", "3", "1", "T","E", "X", "A", "C"];
    	moves1_P2 = ["H","4", "V", "U", "R", "B", "6", "W", "X", "V", "L","I", "0", "6", "4", "8", "7", "6", "Q", "M", "P","8", "7", "4", "Y"];
    	moves2_P1 = ["5","E", "W", "S", "T", "C", "R", "5", "3", "1", "T","E", "X", "A", "C"];
    	moves2_P2 = ["L","I", "0", "6", "4", "8", "7", "6", "Q", "M", "P","8", "7", "4", "Y"];
    	moves3_P1 = ["0","7", "6", "R", "Y", "3", "R", "S", "G", "6", "N","V", "Z", "2", "G"];
    	moves3_P2 = ["3","2", "1", "Q", "B", "V", "8", "7", "4", "D", "I","P", "O", "6", "4"];

    	moves_array_P1 = [moves1_P1, moves2_P1, moves3_P1],
    	moves_array_P2 = [moves1_P2, moves2_P2, moves3_P2],
       
    	$('body').keydown(onKeyPressed);
    	$('body').keyup(onKeyRelease);
       	return that;
    },


    getCurrentPlayerChar = function () {
    	if(isTurnP1)
    		return p1Moves[rodundCountP1];
    	else
    		return p2Moves[rodundCountP2];
    },


    onKeyRelease = function (event) { 
    	if(gameIsOver) return;	
    	var releasedButton = event.keyCode;
    	lastEvent = null;
    	delete heldKeys[releasedButton];

    	
    	if(checkIfReleaseNotAllowed(releasedButton)){

	    	$(that).trigger("keyUpFalse", [releasedButton]);

	    	checkAndHandlePunishment(releasedButton);  
    	}  	
    },

    checkIfReleaseNotAllowed = function(releasedButton){
		if(_.contains(freeToRemoveP1, releasedButton)){
    		var index = $.inArray(releasedButton, freeToRemoveP1);
    		$(that).trigger("stopBlink", [releasedButton, 1]);
    		if (index != -1){
    			freeToRemoveP1.splice(index, 1);
    			buttonsPressedP1--;
    		}
    		return false;
    	}
    	else if (_.contains(freeToRemoveP2, releasedButton)){
    		var index = $.inArray(releasedButton, freeToRemoveP2);
    		$(that).trigger("stopBlink", [releasedButton, 2]);
    		if (index != -1) {
    			freeToRemoveP2.splice(index, 1);
    			buttonsPressedP2--;
    		}
    		return false;
    	}

    	return true;
    },

    checkAndHandlePunishment = function(releasedButton){
		if(_.contains(last3MovesP1, releasedButton)){
			organisePunish(1);  		
			freeToRemoveP1 = last3MovesP1;
			last3MovesP1 = [];
			buttonsPressedP1--;
    	}
    		
    	else if(_.contains(last3MovesP2, releasedButton)){
			organisePunish(2);  
    		freeToRemoveP2 = last3MovesP2;
    		last3MovesP2 = [];
    		buttonsPressedP2--;   			
    	}
    },

    organisePunish = function(player){
    	$(that).trigger("higlightInstr", [player]);
    	attackFailed(player);
		clearAllFields(player);
    },

    clearAllFields = function(player){
    	var lastMoves;
    	if(player === 1) lastMoves = last3MovesP1;
    	else lastMoves = last3MovesP2;

    	for(var i = 0; i < lastMoves.length; i++){
    		$(that).trigger("dishighlightKey", [lastMoves[i]]);
    	}
    },

    registerKeyReleased = function() {
    	if(isTurnP1) buttonsPressedP1--;
    	else buttonsPressedP2--;
    },

    attackFailed = function (player) {

    	if(player === 1){
    		healthP1 -= HIT_WRONG_KEY;		
    		setTimeout(function(){$(that).trigger("hit", [1, healthP1]);}, 100);
    		if(healthP1 <= 0){		
    			gameOver(2, 1); 
    		}  		
    	}
    	else {
    		healthP2 -= HIT_WRONG_KEY;
    		setTimeout(function(){$(that).trigger("hit", [2, healthP2]);}, 100);
    		if(healthP2 <= 0){
    			gameOver(1, 2); 
    		}
    	}
    },

    //returns damage of attack and triggers attack sounds
    calculateDamage = function(){
    	var data,
    	unicorn;
    	if(isTurnP1){
    		data = last3MovesP1;
    		unicorn = unicornP1; 	
    	}
    	else{
    		data = last3MovesP2;
    		unicorn = unicornP2;
    	}
    	switch(data.length){
   			case 1:	$(that).trigger("attackSound", [0]);
   				return HIT_LIGHT * unicorn[0];
   			case 2: $(that).trigger("attackSound", [1]);
   				return HIT_MEDIUM * unicorn[0];
   			case 3: $(that).trigger("attackSound", [2]);
   				return HIT_HARD * unicorn[0];
    		default: return 0;
    	}
    }

    attackSuccessful = function() {

    	var damage = calculateDamage();

    	if(isTurnP1){
    		healthP2 -= damage * unicornP2[1];		
    		setTimeout(function(){$(that).trigger("hit", [2, healthP2]);}, 900);

    		if(healthP2 <= 0){		
    			gameOver(2, 1, player1Uni, player2Uni); 
    			return;
    		}  		
    		$(that).trigger("attackSuccessful", [1]);
    	}
    	else {
    		healthP1 -= damage * unicornP1[1];
    		setTimeout(function(){$(that).trigger("hit", [1, healthP1]);}, 900);
    		if(healthP1 <= 0){
    			gameOver(1, 2, player2Uni, player1Uni); 
    			return;
    		}
    		$(that).trigger("attackSuccessful", [2]);
    	}
    },

    gameOver = function(looser, winner, hsWin, hsLose){
    	gameIsOver = true;
    	updateHighscore(hsWin, hsLose);
    	$(that).trigger("gameEnded", [looser]);
    },

    updateLastMoves = function(player, key){

    	if(player === 1){
    		if(last3MovesP1.length < 3)
    			last3MovesP1.push(key);
    		else {
    		last3MovesP1[0] = last3MovesP1[1];
    		last3MovesP1[1] = last3MovesP1[2];
    		last3MovesP1[2] = key;
    		}
    	}
    	else if(player === 2){
    		if(last3MovesP2.length < 3)
    			last3MovesP2.push(key);
    		else {
    		last3MovesP2[0] = last3MovesP2[1];
    		last3MovesP2[1] = last3MovesP2[2];
    		last3MovesP2[2] = key;
    		}
    	}
    },

    onKeyPressed = function (event) {
    	var pressedButton = event.keyCode;
    	var nextButton = getCodeByChar(getCurrentPlayerChar());
    	if ((lastEvent && lastEvent.keyCode == pressedButton)
    		|| gameIsOver) {
        	return;
    	}
    	lastEvent = event;
    	heldKeys[pressedButton] = true;

    	if(!(_.contains(last3MovesP1, pressedButton)) 
    		&& !(_.contains(last3MovesP2, pressedButton))){
	    	if(pressedButton != nextButton){
	    		handleFalseKey(pressedButton);
	    	}
		    else {
		    	if(isTurnP1){
		    		handleCorrectButton(1, pressedButton,nextButton);
		    		buttonsPressedP1++;	    			
		    		rodundCountP1++;
		    	}
		    	else {
		    		handleCorrectButton(2, pressedButton,nextButton);
		    		buttonsPressedP2++;
		    		rodundCountP2++;    				    				
		    	}
				attackSuccessful();
		    	lastButton = nextButton;
		    	isTurnP1 = !isTurnP1;
				setTimeout(function(){showNextKey();}, 2200);
		    }
		}
    },

    handleFalseKey = function(pressedButton){
    	var player;
    	if(isTurnP1) player = 1;
    	else player = 2;
    	attackFailed(player);
    	$(that).trigger("falseButton", [pressedButton]);
    },

    handleCorrectButton = function(player, pressedButton, nextButton){
    	$(that).trigger("correctButton", [player, pressedButton]);
		updateLastMoves(player, nextButton);
		$(that).trigger("setOpacityListPressed", [player]);
    },


    setGameSettings = function(p1Uni, p2Uni){
    	player1Uni = p1Uni;
    	player2Uni = p2Uni;
    	unicornP1 = UNICORNS[p1Uni || 0];
    	unicornP2 = UNICORNS[p2Uni || 0];
    	setTimeout(function(){showNextKey();}, 5000);
    	getRandomGame();
    },

    getRandomGame = function(){
    	var rand = Math.floor(Math.random() * moves_array_P1.length);
    	p1Moves = moves_array_P1[rand];
    	p2Moves = moves_array_P2[rand];
    },

    showNextKey = function() {    	
    	if(isTurnP1){
    		var sym = p1Moves[rodundCountP1];
    		var nextMov = getCodeByChar( sym );
    		if(last3MovesP1.length < 3)
    			$(that).trigger("nextMove", [1, nextMov, sym, null]);
    		else{   			
    			var releaseButton = last3MovesP1[0];
	    		freeToRemoveP1.push(releaseButton);
	    		var relChar = String.fromCharCode(releaseButton);
	    		$(that).trigger("nextMove", [1, nextMov, sym, relChar]);
	    		$(that).trigger("showReleaseButton", [releaseButton]);
    		}
    	}
    	else {
    		var sym = p2Moves[rodundCountP2];
    		var nextMov = getCodeByChar( sym );
    		if(last3MovesP2.length < 3)
    			$(that).trigger("nextMove", [2, nextMov, sym, null]);
    		else{
    			var releaseButton = last3MovesP2[0];
    			var relChar = String.fromCharCode(releaseButton);
    			freeToRemoveP2.push(releaseButton);
    			$(that).trigger("nextMove", [2, nextMov, sym, relChar]);
    			$(that).trigger("showReleaseButton", [releaseButton]);
    		}
    	}
    },

    getCodeByChar = function(char){
    	//wunderschöne hashmap <3
    	switch(char){
    		case '°': return 220;
    		case '1': return 49;
    		case '2': return 50;
    		case '3': return 51;
    		case '4': return 52;
    		case '5': return 53;
    		case '6': return 54;
    		case '7': return 55;
    		case '8': return 56;
    		case '9': return 57;
    		case '0': return 48;
    		case 'ß': return 219;
    		case '´': return 221;
    		case 'Q': return 81;
    		case 'W': return 87;
    		case 'E': return 69;
    		case 'R': return 82;
    		case 'T': return 84;
    		case 'Z': return 90;
    		case 'U': return 85;
    		case 'I': return 73;
    		case 'O': return 79;
    		case 'P': return 80;
    		case 'Ü': return 186;
    		case '+': return 187;
    		case 'A': return 65;
    		case 'S': return 83;
    		case 'D': return 68;
    		case 'F': return 70;
    		case 'G': return 71;
    		case 'H': return 72;
    		case 'J': return 74;
    		case 'K': return 75;
    		case 'L': return 76;
    		case 'Ö': return 192;
    		case 'Ä': return 222;
    		case '#': return 191;
    		case '<': return 226;
    		case 'Y': return 89;
    		case 'X': return 88;
    		case 'C': return 67;
    		case 'V': return 86;
    		case 'B': return 66;
    		case 'N': return 78;
    		case 'M': return 77;
    		case ',': return 188;
    		case '.': return 190;
    		case '-': return 189;
    	}
    },

    updateHighscore = function(winner, loser){
       $(that).trigger("setHighscore", [winner, loser]);
       $(that).trigger("newHighscore", []);
   
    };

    that.init = init;
    that.setGameSettings = setGameSettings;

	return that;
})();
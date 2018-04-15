App.Help = (function() {
    var that = {},
    $startDemoButton = null,
    $cubeDemo = null,
    $nextButton = null,
    cubeDemoPos = 2,
    newClass = 0,
    $circle1 = 1,
    $circle2 = 1,
    blink = false,
    $helpText = null,
    cube = ".demo-cube",
    startDemoButton = "#start-demo",
    boxDemo = "#box-demo",
    keyboardDemo = "#demo-keyboard",
    nextButton = "#next-demo",
    circle2 = "#c-2",
    circle1 = "#c-1",
    helpView = "#help-1",
    startView = ".start",
    startText= "Klicke auf Start, um zur Spielerauswahl zu gelangen.",
    cubeText = "Durch das Klicken auf den Wuerfel kannst du einen Spielcharakter waehlen.",
    charSelectedText = "Wenn du deinen passenden Charakter gefunden hast, kannst du das Spiel starten, indem du auf 'Weiter' klickst.",
    boxText = "Fuer jeden Spieler gibt es eine Lebensleiste und eine Anweisungsbox, in der die naechste Taste angezeigt wird, die gedrueckt werden muss.",
    pressKeyText = "Die zu drueckende Taste wird farbig auf der virtuellen Tastatur markiert",
    highlightedKeyText = "Die gedrueckten Tasten werden leicht farbig markiert.",
    wrongKeyText = "Wenn du die Taste ausversehen loslaesst oder auf eine falsche Taste drueckst, blinkt diese rot.",
    letGoText = "Wenn du eine Taste loslassen sollst, um eine neue zu druecken, blinkt die Taste in der Spielerfarbe.",
   
    init = function() {
    	$startDemoButton = $("#start-demo");
    	$cubeDemo = $("#cube-demo");
    	$nextButton = $("#next-demo");
        $nextButtonImg = $("#demo-btn");
    	$helpText = $(".help-text");
    	$circle1 = $("#c-1");
    	$circle2 = $("#c-2");
    	$helpText.text(startText);
    	$startDemoButton.on("click", onStartDemoButtonClicked);
    	$cubeDemo.addClass("show-2");
    	$cubeDemo.on("click", onTurnCube);
    	$nextButton.one("click", onGameView);

    	 return that;
    },

    onStartDemoButtonClicked = function(event){
        $(that).trigger("showNewScreen", [startDemoButton, cube]);
    	$helpText.text(cubeText);
    },

    onTurnCube = function(event){
    	currentClass = "show-" + cubeDemoPos;
        if(cubeDemoPos < 4){
          cubeDemoPos++;
        }else{
          cubeDemoPos = 2;
        } 
        newClass = "show-" + cubeDemoPos;
        $(that).trigger("turnCube", [$cubeDemo, currentClass, newClass]);
        $nextButton.removeClass("invisible");
        $helpText.text(charSelectedText);
        $nextButtonImg.attr('src', 'res/Pictures/Buttons/weiter.png');
        $nextButton.css('left', "422px");
    },

    onGameView = function(event){
    	$nextButton.one("click", onShowKeyboard);
    	$helpText.text(boxText);
        $(that).trigger("showNewScreen", [cube, boxDemo]);
    },

    onShowKeyboard = function(event){
        $helpText.text(pressKeyText);
    	$circle1.off();
    	$circle2.off();
    	$(that).trigger("showNewScreen", [boxDemo, keyboardDemo]);
    	$(that).trigger("dishighlight", [720]);
    	$(that).trigger("nextMove", [1, 700]);
    	$(that).trigger("showNewScreen", [nextButton, circle1]);
    	$circle1.one("click", highlightKey);
        $(that).trigger("showNewScreen", [circle2, null]);
    },

    highlightKey = function(event){
    	$circle1.off();
    	$circle2.off();
        $(that).trigger("showNewScreen", [null, circle2]);
    	$(that).trigger("dishighlight", [700]);
    	$(that).trigger("dishighlight", [730]);
    	$helpText.text(highlightedKeyText);
    	$(that).trigger("correctButton", [3, 720]);
    	$circle1.one("click", onBlinkKey);
    	$circle2.one("click", onShowKeyboard);
    },

    onBlinkKey = function(event){
    	$circle1.off();
    	$circle2.off();
    	$(that).trigger("dishighlight", [720]);
    	$(that).trigger("dishighlight", [840]);
    	$helpText.text(letGoText);
    	$(that).trigger("showReleaseButton", [730]);
    	setTimeout(function(){
        $(that).trigger("stopBlink", [730]);},8000);
        $(that).trigger("showNewScreen", [nextButton, circle1]);
    	$circle1.one("click", onFalseKey);
    	$circle2.one("click",highlightKey);
    },

    onFalseKey = function(event){
    	$circle1.off();
    	$circle2.off();
    	$(that).trigger("stopBlink", [730]);
    	$(that).trigger("dishighlight", [730]);
        $(that).trigger("showNewScreen", [circle1, nextButton]);
    	$nextButton.one("click", onGoToMenu);
        $nextButtonImg.attr('src', "res/Pictures/Buttons/zumMenue.png");
        $nextButton.css('left', "360px");
    	$helpText.text(wrongKeyText);
    	$(that).trigger("falseButton", [840]);
    	$circle2.one("click",  onBlinkKey);
    },

    onGoToMenu = function(event){
        /*
        $(that).trigger("showNewScreen", [keyboardDemo, startDemoButton]);
    	$nextButton.addClass("invisible");
    	$helpText.text(startText);
    	$(that).trigger("showDummy", []);
        $(that).trigger("setPageId", [0, $("#arrow_back_div")]);
        $(that).trigger("showNewScreen", [helpView, startView]);*/
        $(that).trigger("goToStart", []);
    };

    that.init = init;

	return that;
})();
App.StartMenuView = (function() {
    var that = {},
    ICON_PLAY = "res/Pictures/Icons/play.png",
    ICON_PAUSE = "res/Pictures/Icons/pause.png",
    ICON_VOLUME_ON = "res/Pictures/Icons/volume_on.png",
    ICON_VOLUME_MUTED = "res/Pictures/Icons/volume_muted.png",
    $startButton = null,
    $helpButton = null,
    helpScreen = ".help-view",
    $backButton = null,
    $dummy = null,
    $hsButton = null,
    $musicButton = null,
    $soundButton = null,
    $musicDiv = null,
    $soundDiv = null,
    p1Val = null,
    p2Val =null,
    startScreen = ".start",
    highscoreView = ".highscore-view",
    playerSelect = ".player-select",

    init = function() {
    	$startButton = $("#start-button");
    	$optionsButton = $("#options-button");
    	$helpButton = $("#help-button");
    	$helpScreen = $(".help-view");
        $dummy = $("#dummy");
        $hsButton = $(".hs-button");
        $musicButton = $("#icon_music");
        $soundButton = $("#icon_sound");
        $musicDiv = $('#music-button');
        $soundDiv = $('#sound-button');
        $backButton = $('#arrow_back');
    	$startButton.on("click", onPlayGame);
    	$helpButton.on("click", onGoToHelp);
        $hsButton.on("click", onGoToHighscores);
        $musicButton.on("click", onChangeMusicPlay);
        $soundButton.on("click", onChangeSoundPlay);
        $backButton.on("click", onBackButtonClicked);
        $musicButton.hover(toggleMusic);
        $soundButton.hover(toggleSound);

        setTimeout(function(){
        var x = window.location.hash;
        if(x != ""){
        switch(x){
            case "#1": 
                $(that).trigger("showNewScreen", [startScreen, playerSelect]);
                $(that).trigger("hideDummy", []);
                 $(that).trigger("setPageId", [3, $("#arrow_back_div")]);
                onChangeMusicPlay();
                onChangeSoundPlay();
                break;
            case "#2":      
                $(that).trigger("showNewScreen", [startScreen, playerSelect]);
                $(that).trigger("hideDummy", []);
                 $(that).trigger("setPageId", [3, $("#arrow_back_div")]);
                break;
            case "#3":    
                $(that).trigger("showNewScreen", [startScreen, playerSelect]);
                $(that).trigger("hideDummy", []);
                 $(that).trigger("setPageId", [3, $("#arrow_back_div")]);
                onChangeMusicPlay();
                break;
            case "#4": 
                $(that).trigger("showNewScreen", [startScreen, playerSelect]);
                $(that).trigger("hideDummy", []);
                 $(that).trigger("setPageId", [3, $("#arrow_back_div")]);
                onChangeSoundPlay();
                break;
            case "#5": 
                onChangeSoundPlay();
                onChangeMusicPlay();
                break;
            case "#6":
                onChangeMusicPlay();
                break;
            case "#7": 
                onChangeSoundPlay();
                break;  
        }
        window.history.back(1);
        }
        }, 100);

    	return that; 
    },

    toggleMusic = function() {
        $musicDiv.toggleClass("attack-icon-visible");
    },

    onShowDummy = function(){
        $dummy.removeClass("invisible");
    },

    onHideDummy = function(){
        $dummy.addClass("invisible");
    },

    toggleSound = function() {
        $soundDiv.toggleClass("attack-icon-visible");
    }

    onPlayGame = function(){
         $(that).trigger("setPageId", [3, $("#arrow_back_div")]);
        $(that).trigger("startButtonClicked", []);
    },

    onChangeMusicPlay = function(){
        $(that).trigger("changeMusicPlay", []);
        if($musicButton.attr('src') == ICON_PAUSE){
            $musicButton.attr('src', ICON_PLAY);
            $musicDiv.text("Play Music");
        }else{
            $musicButton.attr('src', ICON_PAUSE);
            $musicDiv.text("Stop Music");
        }
    },

    onChangeSoundPlay = function(){
        $(that).trigger("changeSoundPlay", []);
        if($soundButton.attr('src') == ICON_VOLUME_ON){
            $soundButton.attr('src', ICON_VOLUME_MUTED);
            $soundDiv.text("Play Sound");
        }else{
            $soundButton.attr('src', ICON_VOLUME_ON);
            $soundDiv.text("Stop Sound");
        }
    },

    onGoToHighscores = function(){
        $(that).trigger("hideDummy", []);
        $(that).trigger("setPageId", [2, $("#arrow_back_div")]);
        $(that).trigger("showNewScreen", [startScreen, highscoreView]);
    },

    onGoToHelp = function(){
        $(that).trigger("initHelp", []);
        $(that).trigger("setPageId", [1, $("#arrow_back_div")]);
    	$(that).trigger("showNewScreen", [startScreen, helpScreen]);
        $(that).trigger("hideDummy", []);
    },

    onBackButtonClicked = function(){
       $(that).trigger("switchPage", []);
    };

    that.init = init;
    that.onShowDummy = onShowDummy;
    that.onHideDummy = onHideDummy;

	return that;
    
})();
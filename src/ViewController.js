App.ViewController = (function() {
    var that = {},
    ATTACK = 1;
    PLAYER_ONE = 0;
    PLAYER_TWO = 1;
    SHORT = 1800,
    endView = null,
    gameLogic = null,
    $backButton = null,
    gameView = null,
    helpView = null,
    cubeModel = null,
    soundModel = null,
    database = null,
    highscoreView = null,
    playerSelectView = null,
    startMenuView = null,
    animation = null,
    keyboardView = null,
    testInt = 1,  
    $dummy = null,
    pageId = 0,

   
    init = function() {
        soundModel = App.SoundModel.init();
        $(soundModel).on("setSoundInfo", onSetSoundInfo);
        playerSelectView = App.PlayerSelectView.init();
        gameLogic = App.GameLogic.init();
        gameView = App.GameView.init();
        $(gameView).on("showNewScreen", onShowNewScreen);
        $(gameView).on("reload", onReload);
        $(gameView).on("loadPsSelect", onLoadPsSelect);
        $(gameView).on("getSoundInfo", onGetSoundInfo);
        cubeModel = App.CubeModel.init();
        helpView = App.Help.init();
        startMenuView = App.StartMenuView.init();
        $(helpView).on("nextMove", showNextMove);
        $(helpView).on("correctButton", onCorrectButton);
        $(helpView).on("showReleaseButton", onPleaseRelease); 
        $(helpView).on("stopBlink", onReleased);
        $(helpView).on("falseButton", onFalseButton);
        $(helpView).on("dishighlight", dishighlightKey);
        $(helpView).on("turnCube", onTurnCube);
        $(helpView).on("showNewScreen", onShowNewScreen);
        $(helpView).on("showDummy", onShowDummy);
        $(helpView).on("hideDummy", onHideDummy);
        $(helpView).on("goToStart", onGoToMenu);
        database = App.Database.init();
        $(database).on("goToMenu", onGoToMenu);
        highscoreView = App.HighscoreView.init();
        $(highscoreView).on("showNewScreen", onShowNewScreen);
        $(highscoreView).on("resetHighscore", onResetHighscore);
        $(highscoreView).on("showDummy", onShowDummy);
        $(highscoreView).on("hideDummy", onHideDummy);
        $(playerSelectView).on("startGame", onStartGame);
        $(playerSelectView).on("startGameAnimation", onStartGameAnimation);
        $(playerSelectView).on("turnCube", onTurnCube);
        $(playerSelectView).on("showNewScreen", onShowNewScreen);
        $(startMenuView).on("initHelp", onInitHelp);
        $(startMenuView).on("showNewScreen", onShowNewScreen);
        $(startMenuView).on("setPageId", onSetPageId);
        $(playerSelectView).on("setPageId", onSetPageId);
        $(gameView).on("setPageId", onSetPageId);
        $(animation).on("setPageId", onSetPageId);
        $(helpView).on("setPageId", onSetPageId);
        $(highscoreView).on("setPageId", onSetPageId);
        $(startMenuView).on("changeMusicPlay", changeMusicPlay);
        $(startMenuView).on("changeSoundPlay", changeSoundPlay);
        $(startMenuView).on("showDummy", onShowDummy);
        $(startMenuView).on("switchPage", onSwitchPageBack);
        $(startMenuView).on("hideDummy", onHideDummy);
        animation = App.Animation.init();    
        $(animation).on("showDummy", onShowDummy);
        $(animation).on("showDialog", onShowDialog);
        $(animation).on("hideDummy", onHideDummy); 
        keyboardView = App.KeyboardView.init();
        $(gameLogic).on("newButton", onUpdateButton);
        $(gameLogic).on("setHighscore", onSetHighscore);
        $(gameLogic).on("falseButton", onFalseButton);
        $(gameLogic).on("correctButton", onCorrectButton);    
        $(gameLogic).on("nextMove", showNextMove); 
        $(gameLogic).on("keyUpFalse", onFalseButton);
        $(gameLogic).on("higlightInstr", onHighlightInstr);
        $(gameLogic).on("showReleaseButton", onPleaseRelease);
        $(gameLogic).on("stopBlink", onReleased);
        $(gameLogic).on("dishighlightKey", dishighlightKey);
        $(gameLogic).on("hit", showDamage);
        $(gameLogic).on("attackSound", onSoundAttack);
        $(gameLogic).on("gameEnded", onGameEnd);
        $(gameLogic).on("attackSuccessful", showAttack);
        $(gameLogic).on("newHighscore", saveSettings);
        $(gameLogic).on("setOpacityListPressed", setOpacityListPressed);
        $(startMenuView).on("startButtonClicked", movePinky);
        $(animation).on("showNewScreen", onShowNewScreen);
        
        song();
       
        return that; 
    },

    onShowDummy = function(){
        startMenuView.onShowDummy();
    },

    onGetSoundInfo = function(){
        soundModel.getMuteInfo();
    },

    onSetHighscore = function(event, winner, loser){
        highscoreView.setHighscore(winner, loser);
    },

    onLoadPsSelect = function(){
       animation.getOldLocation();
    },

    onGoToMenu = function(){
        gameView.onGoToMenu();
    },

    onSetSoundInfo = function(event, songMute, isMute){
        gameView.loadNewPage(songMute, isMute);
    },

    onReload = function(){
        playerSelectView.init();
        gameView.init();
    },

    onHideDummy = function(){
        startMenuView.onHideDummy();
    },

    onShowDialog = function(){
        gameView.showDialog();
    },

    onSetPageId = function(event, currentId, backBtn){
        pageId = currentId;
         switch(pageId){
            case 0: 
                backBtn.addClass("invisible");
                break;
            case 1: 
                backBtn.removeClass("invisible");
                break;
            case 2: 
                backBtn.removeClass("invisible");
                break;
            case 3:
                backBtn.removeClass("invisible");
                break;
            case 4: 
                backBtn.removeClass("invisible");
                break;
        }
    },

    onSwitchPageBack = function(event){
        switch(pageId){
            case 0: 
                break;
            case 1:
                pageId = 0; 
                gameView.onGoToMenu();
                break;
            case 2: 
                pageId = 0;
                gameView.onGoToMenu();
                break;
            case 3:
                gameView.onGoToMenu();
                break;
            case 4: 
                pageId = 3;
                gameView.onPlayAgain();
                break;
        }
    },

    song = function() {
        soundModel.playSong();
    },

    onResetHighscore = function(){
        database.resetContent();
    },

    changeSoundPlay = function(){
        soundModel.changeSoundPlay();
    },

    changeMusicPlay = function(){
        soundModel.changeSongPlay();
    },

    onLooseGame = function(event, player){
        animation.dead(player);
    },

    saveSettings = function(){
        database.saveContents();
    },

    onShowNewScreen = function(event, oldScreen, newScreen){
        if(oldScreen != null){
        $(oldScreen).addClass("invisible");
        }
        if(newScreen != null){
        $(newScreen).removeClass("invisible");
        }
    },

    onStartGameAnimation = function() {
        animation.startGameAnimations();
    },


    showDamage = function(event, player, newHealth) {
        gameView.updateHealthBar(player, newHealth);
        gameView.blinkInstrBox(player);
    },

    showNextMove = function (event, player, key, sym, relBut){
        keyboardView.highlightKey(player, key);
        gameView.displayNextMove(player, key, sym, relBut);

    },

    movePinky = function() {
        animation.pinkyVertical();
        setTimeout(function() {
            soundModel.playSound(SHORT);
        }, 1300);
    },

    onPleaseRelease = function(event, key){
        keyboardView.highlightKeyPleaseRelease(key);
    },

    onHighlightInstr = function(event, player){
        gameView.blinkInstrBox(player);
        soundModel.liftFinger(player -1);
    },

    onReleased = function(event, key, player){
        keyboardView.stopBlink("release", key);
        gameView.setReleaseOpacity(player, true);
    },

    highlightKey = function (event, key) {
        keyboardView.highlightKey(1, key);
        animation.dead(1);
    },

    setOpacityListPressed = function(event, player){
        gameView.setReleaseOpacity(player, false);
    },

    dishighlightKey = function (event, key){
        keyboardView.dishighlightKey(key);
    },

    onGameEnd = function (event, loser) {
        animation.dead(loser - 1);
        soundModel.gameOver(loser - 1);
    },

    onUpdateButton = function(event, oldKey, newKey) {
        keyboardView.dishighlightKey(oldKey);
        keyboardView.highlightKey(newKey);
    },

    onCorrectButton = function (event, player, key) {
        keyboardView.keyPressed(player, key);
    },

    showAttack = function(event, player){
        if(player != 3){
            if(player == ATTACK) {
                animation.changeStadium(PLAYER_ONE, ATTACK);
            }else{
                animation.changeStadium(PLAYER_TWO, ATTACK);
            }
        }
    },

    onSoundAttack = function(event, sound){
        soundModel.attackSound(sound);
        animation.displayAttackStrength(sound);
    },

    onFalseButton = function(event, falseKey) {
        keyboardView.highlightKeyFalse(falseKey);
    },

    onTurnCube = function(event, id, oldPosition, newPosition){
        cubeModel.onTurnCube(id, oldPosition, newPosition);
        soundModel.playSchnaub();
    },

    onStartGame = function(event, p1Uni, p2Uni){
        gameView.emptyInstructions();
        gameLogic.setGameSettings(p1Uni, p2Uni);
        animation.setIdForPlayer(p1Uni, p2Uni);
        playerSelectView.switchScreens();
        soundModel.intro(p1Uni, p2Uni);
    },

    onInitHelp = function(event){
        helpView.init();
    };

    that.init = init;

	return that;
})();
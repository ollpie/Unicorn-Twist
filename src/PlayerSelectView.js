App.PlayerSelectView = (function() {
    var that = {},
    ATTACK = 0,
    DEFENSE = 1,
    AWESOMENESS = 2,
    $button = null,
    panelClassName = null,
    $cubeLeft = null,
    $cubeRight = null,
    $attackp1 = null,
    $defensep1 = null,
    $awesomenessp1 = null,
    $attackp2 = null,
    $defensep2 = null,
    $awesomenessp2 = null,
    $namePlayer1 = null,
    $namePlayer2 = null,
    newClass = 0,
    cubeLeftPos = 2,
    cubeRightPos = 2,
    player1Name = null,
    player2Name = null,
    player1Uni = null,
    player2Uni = null,
    cubeIdLeft = "Left",
    cubeIdRight = "Right",
    $descrTextRight = null,
    $descrTextLeft = null,
    $descrPicRight = null,
    $descrPicLeft = null,
    psView = ".player-select",
    gameView = ".game",
    power = null,
    unicorn1 = null,
    unicorn2 = null,
    unicorn3 = null,
    name = null,
   
    init = function() {  
      $cubeLeft = $("#cube-left");
      $cubeRight = $("#cube-right");
      $descrTextLeft = $("#descr-1");
      $descrTextRight = $("#descr-2");
      $descrPicLeft = $("#pic-left");
      $descrPicRight = $("#pic-right");
      $attackp1 = $('#attackp1');
      $defensep1 = $('#defensep1');
      $awesomenessp1 = $('#awesomenessp1');
      $attackp2 = $('#attackp2');
      $defensep2 = $('#defensep2');
      $awesomenessp2 = $('#awesomenessp2');
      $namePlayer1 = $('.nameP1');
      $namePlayer2 = $('.nameP2');
      $button = $("#start-ps");
      $button.on("click", onButtonClick);
      $cubeLeft.on("click", onTurnLeftCube);
      $cubeRight.on("click", onTurnRightCube);
      $cubeLeft.addClass("show-2");
      $cubeRight.addClass("show-2");
      showNewUnicorn(cubeRightPos, $descrTextRight, $descrPicRight, cubeIdRight);
      showNewUnicorn(cubeLeftPos, $descrTextLeft, $descrPicLeft, cubeIdLeft);
      unicorn1 = [50, 50, 70];
      unicorn2 = [20, 89, 80];
      unicorn3 = [92, 13, 40];
      power = [unicorn1, unicorn2, unicorn3];
      name = ["Pinky van Horse", "Black Lemon", "Peggy P. Pee"];

      updateHealth();

      return that;        
    },

    updateHealth = function() {
      $attackp1.attr('style', 'width: ' + power[0][ATTACK] + '%');
      $defensep1.attr('style', 'width: ' + power[0][DEFENSE] + '%');
      $awesomenessp1.attr('style', 'width: ' + power[0][AWESOMENESS] + '%');
      $attackp2.attr('style', 'width: ' + power[0][ATTACK] + '%');
      $defensep2.attr('style', 'width: ' + power[0][DEFENSE] + '%');
      $awesomenessp2.attr('style', 'width: ' + power[0][AWESOMENESS] + '%');
    },

    onButtonClick = function( event ){
        setInformation();
    },


    setInformation = function(event){
        player1Uni = (cubeLeftPos -2);
        player2Uni = (cubeRightPos -2);
        $(that).trigger("setPageId", [4, $("#arrow_back_div")]);
        $(that).trigger("startGame", [player1Uni, player2Uni]);
    },

    switchScreens = function(){
        $(that).trigger("showNewScreen", [psView, gameView]);
        $(that).trigger("startGameAnimation", []);
    },

    onTurnLeftCube = function(event){
        currentClass = "show-" + cubeLeftPos;
        if(cubeLeftPos < 4){
          cubeLeftPos++;
        }else{
          cubeLeftPos = 2;
        }
        newClass = "show-" + cubeLeftPos;
        $attackp1.attr('style', 'width: ' + power[cubeLeftPos-2][ATTACK] + '%');
        $defensep1.attr('style', 'width: ' + power[cubeLeftPos-2][DEFENSE] + '%');
        $awesomenessp1.attr('style', 'width: ' + power[cubeLeftPos-2][AWESOMENESS] + '%');
        $namePlayer1.text(name[cubeLeftPos-2]);
        $(that).trigger("turnCube", [$cubeLeft, currentClass, newClass]);
        showNewUnicorn(cubeLeftPos, $descrTextLeft, $descrPicLeft, cubeIdLeft);
    },

    onTurnRightCube = function(event){
        currentClass = "show-" + cubeRightPos;
        if(cubeRightPos < 4){
          cubeRightPos++;
        }else{
          cubeRightPos = 2;
        } 
        newClass = "show-" + cubeRightPos;
        $attackp2.attr('style', 'width: ' + power[cubeRightPos-2][ATTACK] + '%');
        $defensep2.attr('style', 'width: ' + power[cubeRightPos-2][DEFENSE] + '%');
        $awesomenessp2.attr('style', 'width: ' + power[cubeRightPos-2][AWESOMENESS] + '%');
        $namePlayer2.text(name[cubeRightPos-2]);
        $(that).trigger("turnCube", [$cubeRight, currentClass, newClass]);
        showNewUnicorn(cubeRightPos, $descrTextRight, $descrPicRight, cubeIdRight);
    },

    showNewUnicorn = function(position, textId, picId, id){
          if(position == 2){
            picId.attr('src',"res/Pictures/profil"+ id+ ".png");
          }else if(position ==3){  
            picId.attr('src',"res/Pictures/profilBlacky" + id +".png");
          }else if(position ==4){
            picId.attr('src',"res/Pictures/peggyProfil" + id + ".png");
          }
    };

    that.init = init;
    that.switchScreens = switchScreens;

	return that;
  
})();
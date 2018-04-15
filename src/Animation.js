App.Animation = (function() {
    var that = {},

    PLAYER_ONE = 0;
    PLAYER_TWO = 1;
    LEFT = 0;
    RIGHT = 1;
    STILL = 0;
    ATTACK = 1;
    WOUNDED = 2;
    DEAD = 3;
    AVATAR = 4;
    BLENDER = 5;
    VICTORY = 6;
    SMOOTH = 0;
    MEDIUM = 1;
    HARD = 2;
    PINKY = 0,
    BLACKY = 1,
    WINGY = 2,

    playerStill = null,
    playerAction = null,
    pinky = null,
    blacky = null,
    peggy = null,
    charackter = null,
    $blendL = null,
    $blendR = null,
    $announcer = null,
    $leftArm = null,
    $rightArm = null,
    $mund = null,
    wounded = null,
    dead = null,
    $profilP1 = null,
    $profilP2 = null,
    $dummy = null,
    $uf = null,
    $player1 = null,
    $player1Action = null,
    $player2 = null,
    $player2Action = null,
    $sky = null,
    $clouds = null,
    $cloudL = null,
    $cloudR = null,
    $attackIcon = null,
    pOne = null,
    pTwo = null,
    players = null,
    horse = null,
    start = ".start",
    psView = ".player-select",
    arms = null,
    rotateArms = null,
    labels = null,
    playerStill = null,
    playerAction = null,
    pinky = null,
    blacky = null,
    peggy = null,
    charackter = null,
    wounded = null,
    dead = null,

    init = function() {
        $blendL = $('#blenderL');
        $blendR = $('#blenderR');
        $profilP1 = $('#avatar1');
        $profilP2 = $('#avatar2');
        $dummy = $('#dummy');
        $uf = $('#ufo');
        $player1 = $('#playerOneStill');
        $player1Action = $('#playerOneAction');
        $player2 = $('#playerTwoStill');
        $player2Action = $('#playerTwoAction');
        $sky = $('#sky');
        $clouds = $('#clouds');
        $cloudL = $('#cloudLeft');
        $cloudR = $('#cloudRight');
        $announcer = $('.moderator');
        $leftArm = $('#armLeft');
        $rightArm = $('#armRight');
        $mund = $('#mouth');
        $attackIcon = $('#attack-icon');
        playerStill = [$player1, $player2];
        playerAction = [$player1Action, $player2Action];
        arms = [$leftArm, $rightArm];
        rotateArms = ["rotate-left-arm", "rotate-right-arm"];

        pinkyStill = ['url(res/Pictures/PinkySprites/psL.png)', 'url(res/Pictures/PinkySprites/psR.png)'];
        pinkyAttack = ['url(res/Pictures/PinkySprites/paL.png)', 'url(res/Pictures/PinkySprites/paR.png)'];
        pinkyDead = ['url(res/Pictures/PinkySprites/ptL.png)', 'url(res/Pictures/PinkySprites/ptR.png)'];
        pinkyWounded = ['url(res/Pictures/PinkySprites/pwL.png)', 'url(res/Pictures/PinkySprites/pwR.png)'];
        pinkyProfil = ['res/Pictures/profilLeft.png', 'res/Pictures/profilRight.png'];
        pinkyBlender = ['url(res/Pictures/PinkySprites/pbL.png)', 'url(res/Pictures/PinkySprites/pbR.png)'];
        pinkyVictory = ['url(res/Pictures/PinkySprites/pvL.png)', 'url(res/Pictures/PinkySprites/pvR.png)'];
        pinky = [pinkyStill, pinkyAttack, pinkyWounded, pinkyDead, pinkyProfil, pinkyBlender, pinkyVictory];

        blackyStill = ['url(res/Pictures/PinkySprites/bsL.png)', 'url(res/Pictures/PinkySprites/bsR.png)'];
        blackyAttack = ['url(res/Pictures/PinkySprites/baL.png)', 'url(res/Pictures/PinkySprites/baR.png)'];
        blackyDead = ['url(res/Pictures/PinkySprites/btL.png)', 'url(res/Pictures/PinkySprites/btR.png)'];
        blackyWounded = ['url(res/Pictures/PinkySprites/bwL.png)', 'url(res/Pictures/PinkySprites/bwR.png)'];
        blackyProfil = ['res/Pictures/profilBlackyLeft.png', 'res/Pictures/profilBlackyRight.png'];
        blackyBlender = ['url(res/Pictures/PinkySprites/bbL.png)', 'url(res/Pictures/PinkySprites/bbR.png)'];
        blackyVictory = ['url(res/Pictures/PinkySprites/bvL.png)', 'url(res/Pictures/PinkySprites/bvR.png)'];
        blacky = [blackyStill, blackyAttack, blackyWounded, blackyDead, blackyProfil, blackyBlender, blackyVictory];

        peggyStill = ['url(res/Pictures/PinkySprites/wsL.png)', 'url(res/Pictures/PinkySprites/wsR.png)'];
        peggyAttack = ['url(res/Pictures/PinkySprites/waL.png)', 'url(res/Pictures/PinkySprites/waR.png)'];
        peggyDead = ['url(res/Pictures/PinkySprites/wtL.png)', 'url(res/Pictures/PinkySprites/wtR.png)'];
        peggyWounded = ['url(res/Pictures/PinkySprites/wwL.png)', 'url(res/Pictures/PinkySprites/wwR.png)'];
        peggyProfil = ['res/Pictures/peggyProfilLeft.png', 'res/Pictures/peggyProfilRight.png'];
        peggyBlender = ['url(res/Pictures/PinkySprites/wbL.png)', 'url(res/Pictures/PinkySprites/wbR.png)'];
        peggyVictory = ['url(res/Pictures/PinkySprites/wvL.png)', 'url(res/Pictures/PinkySprites/wvR.png)'];
        peggy = [peggyStill, peggyAttack, peggyWounded, peggyDead, peggyProfil, peggyBlender, peggyVictory];

        charackter = [pinky, blacky, peggy];
    
        labels = ["res/Pictures/smooth.png", "res/Pictures/medium.png", "res/Pictures/hard.png"];

        startAnimations();

        return that;
    },

    displayAttackStrength = function(label) {
        $attackIcon.attr('src', labels[label]);
        $attackIcon.addClass("attack-icon-visible");
        setTimeout(function(){
            $attackIcon.removeClass("attack-icon-visible");
        }, 1000);
    },

    getOldLocation = function() {
        $(that).trigger("getLocation", [oldLocation]);
    },

    setIdForPlayer = function(idOne, idTwo) {
        pOne = idOne;
        pTwo = idTwo;
        players = [pOne, pTwo];
    },

    startGameAnimations = function() {
        $profilP1.attr('src', charackter[pOne][AVATAR][LEFT]);
        $profilP2.attr('src', charackter[pTwo][AVATAR][RIGHT]);
        $announcer.removeClass("invisible");
        $cloudL.removeClass("invisible");
        $cloudR.removeClass("invisible");
        $player1.removeClass("invisible");
        $player2.removeClass("invisible");
        $blendL.css({'background-image' : charackter[pOne][BLENDER][LEFT]});
        $blendR.css({'background-image' : charackter[pTwo][BLENDER][RIGHT]});
        playerStill[0].css({'background-image' : charackter[pOne][STILL][LEFT]});
        playerStill[1].css({'background-image' : charackter[pTwo][STILL][RIGHT]});
        $player1.sprite({fps: 13, no_of_frames: 24});
        $player2.sprite({fps: 13, no_of_frames: 24});
        moveArms();
    },

    moveArms = function() {
        if(pOne == PINKY && pTwo == BLACKY){
            point(LEFT, RIGHT);
        }else if(pOne == BLACKY && pTwo == PINKY){
            point(RIGHT, LEFT);
        }else if(pOne == WINGY && pTwo == PINKY){
            point(LEFT, RIGHT);
        }else if(pOne == PINKY && pTwo == WINGY){
            point(RIGHT, LEFT);
        }else if(pOne == BLACKY && pTwo == WINGY){
            point(LEFT, RIGHT);
        }else if(pOne == WINGY && pTwo == BLACKY){
            point(RIGHT, LEFT);
        }else if(pOne == PINKY && pTwo == PINKY){
            point(LEFT, RIGHT);
        }else if(pOne == BLACKY && pTwo == BLACKY){
            point(LEFT, RIGHT);
        }else if(pOne == WINGY && pTwo == WINGY){
            point(LEFT, RIGHT);
        }
    },

    point = function(a, b) {
        setInterval(function(){
            $mund.toggleClass("fade-mouth");
        }, 200);
        setTimeout(function(){
            arms[a].toggleClass(rotateArms[a]);
              setTimeout(function(){
                  arms[a].toggleClass(rotateArms[a]);
                  arms[b].addClass(rotateArms[b]);
                  setTimeout(function(){
                    $announcer.addClass("fade-announcer");
                }, 3000);
              }, 2500);
            }, 1900);
    }

    changeStadium = function(p, a) {
        var player = p;
        var attack = a;
        play(player, attack);
        if(player == PLAYER_ONE)
            player++;
        else
            player--;
        if(attack == ATTACK) attack = WOUNDED;
        setTimeout(function() {
            play(player, attack);
        }, 1000);
    },

    play = function(i, a) {
        playerAction[i].css({'background-image' : charackter[players[i]][a][i]});
        playerAction[i].sprite({fps: 24, no_of_frames: 24, on_last_frame: function(obj) {
            obj.spStop(); 
            playerStill[i].removeClass("invisible");
            playerAction[i].addClass("invisible").destroy();
        }});

        $blendL.removeClass("invisible");
        setTimeout(function(){
            playerAction[i].removeClass("invisible");
            playerStill[i].addClass("invisible");
            $blendL.addClass("invisible");
        }, 150); 
    },

    wounded = function(player) {
        var attack = WOUNDED;
        play(player, attack);
    },

    dead = function(id) {
      var p2 = id;
      if(id == PLAYER_ONE){
        p2++;
      }else{
        p2--;
      }
      deadBark(id, p2);
    },

    deadBark = function(id, p2) {
      playerAction[id].css({'background-image' : charackter[players[id]][DEAD][id]});
      playerAction[p2].css({'background-image' : charackter[players[p2]][VICTORY][p2]});
      playerStill[id].addClass("invisible");
      playerAction[id].removeClass("invisible").sprite({fps: 24, no_of_frames: 24, do_once: true});   
      setTimeout(function() {
        playerStill[p2].addClass("invisible");
        playerAction[p2].removeClass("invisible").sprite({fps: 24, no_of_frames: 24, do_once: true});
      }, 1000);
      setTimeout(function() {
        $(that).trigger("showDialog", []);
      }, 3000);
    },

    pinkyVertical = function() {
        $uf.pan({fps: 30, speed: 10, dir: 'down', depth: 0});
        setTimeout(function(){
            $uf.destroy();
            $dummy.pan({fps: 30, speed: 18, dir: 'up', depth: 0});
            setTimeout(stop, 700);
        }, 1300);
    },

    stop = function() {
        $(that).trigger("hideDummy", []);
        $dummy.destroy();
        $uf.pan({fps: 30, speed: 10, dir: 'up', depth: 0});
        setTimeout(function(){
           $(that).trigger("showNewScreen", [start, psView]);
        }, 1300);
    },



    

    startAnimations = function() {
            $sky.pan({fps: 30, speed: 1, dir: 'left'});
            $clouds.pan({fps: 30, speed: 4, dir: 'left'});
            $dummy.sprite({fps: 13, no_of_frames: 24});  
    };

    that.init = init;
    that.pinkyVertical = pinkyVertical;
    that.changeStadium = changeStadium;
    that.startGameAnimations = startGameAnimations;
    that.dead = dead;
    that.setIdForPlayer = setIdForPlayer;
    that.wounded = wounded;
    that.getOldLocation = getOldLocation;
    that.displayAttackStrength = displayAttackStrength;

	return that;
})();
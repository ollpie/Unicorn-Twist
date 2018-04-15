App.SoundModel = (function() {
    var that = {},
    PINKY = 0,
    BLACKY = 1,
    PEGGY = 2,
    SMOOTH = 0,
    MEDIUM = 1,
    HARD = 2,
    LONG = 8000,
    SHORT = 1800,
    FATALITY = 0,
    BARK = 1,
    audio = null,
    lift = null,
    song = null,
    introduction = null,
    attack = null,
    playerWins = null,
    dead = null,
    liftFingers = null,
    isMute = false,
    songMute = false,

    init = function() {
        audio = document.getElementById('sound'); 
        song = document.getElementById('song'); 
        lift = document.getElementById('lift');
        introduction = ["res/Sounds/pp.wav", "res/Sounds/bb.wav", "res/Sounds/ww.wav", "res/Sounds/pb.wav", "res/Sounds/wp.wav", "res/Sounds/bw.wav"];
        attack = ["res/Sounds/smooth.wav", "res/Sounds/medium.wav", "res/Sounds/hard.wav"];
        playerWins = ["res/Sounds/rightWins.wav", "res/Sounds/leftWins.wav"]
        dead = ["res/Sounds/fatality.wav", "res/Sounds/bark.wav"];
        liftFingers = ["res/Sounds/oneFingers.wav", "res/Sounds/twoFingers.wav"];

    	return that;
    },

    playSchnaub = function() {
        audio.src="res/Sounds/schnaubSelect.wav";
        playSound(SHORT);
    },

    liftFinger = function(p) {
        lift.src=liftFingers[p];
        lift.volume=1.0;
        setTimeout(function() {
            lift.play();
        }, SHORT);
    },

    gameOver = function(p) {
        audio.src=dead[FATALITY];
        playSound(SHORT);
        setTimeout(function(){
            audio.src=dead[BARK];
            playSound(SHORT);
            setTimeout(function(){
                audio.src=playerWins[p];
                playSound(SHORT);
            }, SHORT);
        }, 2000);
    },

    playSong = function() {
        song.play();
        song.volume=0.7;
    },

    changeSoundPlay = function(){
        if(!isMute){
            audio.pause();
        }
        isMute = !isMute;
    },

    changeSongPlay = function(){
        if(song.paused){
            playSong();
            songMute = false;
        }else{
            song.pause();
            songMute = true;
        }
    },

    intro = function(p1, p2) {
        if(isMute) return;
        else if(p1 == PINKY && p2 == PINKY){
            audio.src=introduction[PINKY];
            playSound(LONG);
        }else if(p1 == BLACKY && p2 == BLACKY){
            audio.src=introduction[BLACKY];
            playSound(LONG);
        }else if(p1 == PEGGY && p2 == PEGGY){
            audio.src=introduction[PEGGY];
            playSound(LONG);
        }else if((p1 == PINKY && p2 == BLACKY) || (p2 == PINKY && p1 == BLACKY)){
            audio.src=introduction[3];
            playSound(LONG);
        }else if((p1 == PINKY && p2 == PEGGY) || (p2 == PINKY && p1 == PEGGY)){
            audio.src=introduction[4];
            playSound(LONG);
        }else if((p1 == BLACKY && p2 == PEGGY) || (p2 == BLACKY && p1 == PEGGY)){
            audio.src=introduction[5];
            playSound(LONG);
        }
    },

    attackSound = function(a) {
        if(isMute) return;
        else if(a == SMOOTH){
            audio.src=attack[SMOOTH];
            playSound(SHORT);
            timeOut();
        }else if(a == MEDIUM){
            audio.src=attack[MEDIUM];
            playSound(SHORT);
            timeOut();
        }else if(a == HARD){
            audio.src=attack[HARD];
            playSound(SHORT);
            timeOut();
        }
    },

    timeOut = function() {
        setTimeout(function() {
            audio.src="res/Sounds/schnaub.wav";
            playSound(0);
        }, 1700);
    },

    getMuteInfo = function(){
        $(that).trigger("setSoundInfo", [songMute, isMute]);
    },



    playSound = function(time) {
        if(isMute) return;
        song.volume=0.3;
        audio.play();
        setTimeout(function(){
            song.volume=0.7;
        }, time); 
    };

    that.init = init;
    that.playSound = playSound;
    that.intro = intro;
    that.attackSound = attackSound;
    that.playSong = playSong;
    that.changeSongPlay = changeSongPlay;
    that.changeSoundPlay = changeSoundPlay;
    that.gameOver = gameOver;
    that.getMuteInfo = getMuteInfo;
    that.liftFinger = liftFinger;
    that.playSchnaub = playSchnaub;

	return that;
})();
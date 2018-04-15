App.KeyboardView = (function() {
    var that = {},
    COLOR_P1 = "#126BC4",
    COLOR_P2 = "#10841A",
    COLOR_P1_SET = "#AAABF9",
    COLOR_P2_SET = "#61E75F",
    COLOR_NORMAL = "#fffb73",
    COLOR_FALSE = "#DD0E16",
    COLOR_RELEASE = "#DBDBDB",
    BLINK_RELEASE = "release",
    BLINK_FALSE = "false",
    color = null,
    blinkCount = 0,
    blinkRelease,
    blinkFalse,
    normal = null,
    highlight = null,

    init = function() {
       return that;
    },

    highlightKey = function(player, id){
    	if(player == 1) color = COLOR_P1;
    	else color = COLOR_P2;
        var idd = "#" + id;
        $(idd).css('color', "white");
        $(idd).css('background-color', color);
    },

    keyPressed = function (player, id) {
        if(player == 1) color = COLOR_P1_SET;
        else color = COLOR_P2_SET;
        var idd = "#" + id;
        $(idd).css('color', "black");
        $(idd).css('background-color', color);
    },

    stopBlink = function (blinkVar, id) {
        if(blinkVar == BLINK_RELEASE) clearInterval(blinkRelease);
        else if(blinkVar == BLINK_FALSE) clearInterval(blinkFalse);
        setTimeout(function(){$("#" + id).css("background-color", COLOR_NORMAL);}, 100);
        setTimeout(function(){$("#" + id).css("background-color", COLOR_NORMAL);}, 1000);
    },

    highlightKeyPleaseRelease = function (id){
        var idd = "#" + id;
        var oldColor = $(idd).css("background-color");
        blinkKey(idd, oldColor, COLOR_RELEASE, true);
    },

    blinkKey = function(idd, oldColor, blinkColor, isReleaseBlink){
        var blink = setInterval(function() {
            $(idd).css("background-color", blinkColor);
            setTimeout(function(){
               $(idd).css("background-color", oldColor); 
            },150);
        }, 300);
        if(isReleaseBlink)
            blinkRelease = blink;          
        else
            setTimeout(function(){clearInterval(blink);}, 3000);
    },

    dishighlightKey = function(id){
    	var idd = "#" + id;
        $(idd).css('color', "black");
    	$(idd).css('background-color', COLOR_NORMAL);
        if(id == 13)
        $("#13-1").css('background-color', COLOR_NORMAL);
    },

    highlightKeyFalse = function(id){
        var idd = "#" + id;
        blinkKey(idd, COLOR_NORMAL, COLOR_FALSE, false);
        if(id == "13") blinkKey("#13-1", COLOR_NORMAL, COLOR_FALSE, false);
    };

    that.init = init;
    that.highlightKey = highlightKey;
    that.dishighlightKey = dishighlightKey;
    that.highlightKeyFalse = highlightKeyFalse;
    that.keyPressed = keyPressed;
    that.highlightKeyPleaseRelease = highlightKeyPleaseRelease;
    that.stopBlink = stopBlink;

	return that;
    
})();
   
   
   
   
   
   
App.GameView = (function() {
    var that = {},
    TEXT_NEXT_FINGER = "Nächster Finger auf ",
    $listP1 = null,
    $listP2 = null,
    $healthP1 = null,
    $healthP2 = null,
    $instrP1 = null,
    $instrP2 = null,
    $gameView = null,
    $menuButton = null,
    $againButton = null,
    $dialog = null,
    menu = ".start",
    again = ".player-select",
    game = ".game",
    u=null,
    st = true,
    ps = true,

    init = function() {

    	$listP1 = $("#instr-list-p1");
    	$listP2 = $("#instr-list-p2");
    	$healthP1 = $("#health-p1");
    	$healthP2 = $("#health-p2");
    	$instrP1 = $("#instructions-p1");
    	$instrP2 = $("#instructions-p2");
        $gameView = $(".game");
        $menuButton = $("#game-over-menu");
        $againButton = $("#game-over-play-again");
        $dialog = $(".game-over");
        $menuButton.on("click", onGoToMenu);
        $againButton.on("click", onPlayAgain);
        u  = new Url;

    	return that;
    },

    onGoToMenu = function(){
        ps = false;
        st= true;
        $(that).trigger("getSoundInfo", []);
    },

    onPlayAgain = function(){
        st = false;
        ps = true;
        $(that).trigger("getSoundInfo", []);
    },

    loadNewPage = function(songMute, isMute){
        if(ps == true){
            if(songMute == true && isMute == true){
                u.hash = "1"; 
            }
            if(songMute == false && isMute == false){
                u.hash = "2"; 
            }
            if(songMute == true && isMute == false){
                u.hash = "3"; 
            }
            if(songMute == false && isMute == true){
                u.hash = "4"; 
            }
        }if(st==true){
            if(songMute == true && isMute == true){
                u.hash = "5"; 
            }
            if(songMute == false && isMute == false){
                u.hash = ""; 
            }
            
            if(songMute == true && isMute == false){
                u.hash = "6"; 
            }
            if(songMute == false && isMute == true){
                u.hash = "7"; 
            }
        }
        window.location = u;
        window.location.reload();
    },

    showDialog = function(){
        $dialog.removeClass("invisible");
        $('.keyboard').addClass("invisible");
        $('.box').addClass("invisible");
    },

    emptyInstructions = function(){
    	$("#instr-list-p1 li").empty();
    	$("#instr-list-p2 li").empty();
    },

    blinkInstrBox = function(player) {
    	if(player === 1){
    		$instrP1.css('background-color', '#FD90D8');
			setTimeout(function(){$instrP1.css('background-color', '#EEE');}, 300);
    	}
    	else {
    		$instrP2.css('background-color', '#FD90D8');
			setTimeout(function(){$instrP2.css('background-color', '#EEE');}, 300);
    	}
    },

    updateHealthBar = function(player, newHealth) {
    	if(player === 2)
			$healthP2.attr('style', 'width: ' + newHealth + '%');
    	else 
			$healthP1.attr('style', 'width: ' + newHealth + '%');
    },

    setReleaseOpacity = function(player, isRel){
    	if(isRel){
	    	if(player === 1)
	    		$listP1.find('.list-item-rel').css('opacity', '0.3').find('div').css( 'color', 'black' );
	    	else
	    		$listP2.find('.list-item-rel').css('opacity', '0.3').find('div').css( 'color', 'black' );
    	}
    	else{
    		if(player === 1)
	    		$listP1.find('.list-item').css('opacity', '0.3').find('div').css( 'color', 'black' );
	    	else
	    		$listP2.find('.list-item').css('opacity', '0.3').find('div').css( 'color', 'black' );
    	}
    },

    displayNextMove = function(player, key, sym, relBut) {

		if(player === 1){
			$('#instr-list-p1 li:first').css('opacity', '0.3').find('div').css( 'color', 'black' );
			$('#instr-list-p1 li:first').find('h3').css( 'font-size', '20px' );

			if(relBut != null){
				$('<li class="list-item"><h3>& Finger auf </h3>'
	        		+'<div class="key instr-key blue">' +sym+ '</div></li>')
            	.hide().prependTo($listP1).slideDown("slow");

				$('<li class="list-item-rel"><h3>Nehme Finger von </h3>'
	        		+'<div class="key instr-key blue">' +relBut+ '</div></li>')
            	.hide().prependTo($listP1).slideDown("slow");
			}
			else {
				$('<li class="list-item"><h3>Nächster Finger auf </h3>'
	        		+'<div class="key instr-key blue">' +sym+ '</div></li>')
            	.hide().prependTo($listP1).slideDown("slow");
			}
	    }
	    else {
	    	$('#instr-list-p2 li:first').css('opacity', '0.3').find('div').css( 'color', 'black' );
	       	$('#instr-list-p2 li:first').find('h3').css( 'font-size', '20px' );
	       	if(relBut != null){
				$('<li class="list-item"><h3>& Finger auf </h3>'
		        	+'<div class="key instr-key green">' +sym+ '</div></li>')
	            .hide().prependTo($listP2).slideDown("slow");
	       		$('<li class="list-item-rel"><h3>Nehme Finger von </h3>'
	        		+'<div class="key instr-key green">' +relBut+ '</div></li>')
            	.hide().prependTo($listP2).slideDown("slow");
			}
			else{
				$('<li class="list-item"><h3>Nächster Finger auf </h3>'
		        	+'<div class="key instr-key green">' +sym+ '</div></li>')
	            .hide().prependTo($listP2).slideDown("slow");
			}
	    }
    };

    that.init = init;
    that.displayNextMove = displayNextMove;
    that.updateHealthBar = updateHealthBar;
    that.blinkInstrBox = blinkInstrBox;
    that.emptyInstructions = emptyInstructions;
    that.showDialog = showDialog;
    that.loadNewPage = loadNewPage;
    that.setReleaseOpacity = setReleaseOpacity;
    that.onGoToMenu = onGoToMenu;
    that.onPlayAgain = onPlayAgain;

	return that;
})();
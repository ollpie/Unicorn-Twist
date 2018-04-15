App.HighscoreView = (function() {
    var that = {},
    $menuButton= null,
    $reset = null,
    hsView = ".highscore-view",
    stView = ".start",
    $el = null,
    win = null,
    lose = null,
    p1 = null,
    p2 = null,
    winUp = null,
   
    init = function() {
        $menuButton = $(".highscore-menu");
        $reset = $(".reset");
        $reset.on("click", onResetHs);
        $menuButton.on("click", onGoToMenu);
        $el = $("#hs");

    	return that;
    },

    onResetHs = function(){
        $(that).trigger("resetHighscore", []);
    },

    setHighscore = function(winner, loser){
        var $row = $("<tr></tr>");
        var $li1 = $("<td></td>");
        var $li2 = $("<td></td>");

        switch(winner){
            default:
            case 0: win = "Pinky van Horse";
                p1 = parseInt($("#pinky-played").html()) +1;
                    $("#pinky-played").text(p1);
                    winUp = parseInt($("#pinky-won").html()) +1;
                    $("#pinky-won").text(winUp);
                break;
            case 1: win = "Black Lemon";
                    p1 = parseInt($("#blacky-played").html()) +1;
                    $("#blacky-played").text(p1);
                    winUp = parseInt($("#blacky-won").html()) +1;
                    $("#blacky-won").text(winUp);
                break;
            case 2: win = "Peggy P. Pee";
                    p1 = parseInt($("#peggy-played").html()) +1;
                    $("#peggy-played").text(p1);
                    winUp = parseInt($("#peggy-won").html()) +1;
                    $("#peggy-won").text(winUp);
                break;
        }
        switch(loser){
            default:
            case 0: lose = "Pinky van Horse";
                    p2 = parseInt($("#pinky-lost").html()) +1;
                    $("#pinky-lost").text(p2);
                break;
            case 1: lose = "BlackLemon";
                    p2 = parseInt($("#blacky-lost").html()) +1;
                    $("#blacky-lost").text(p2);
                break;
            case 2: lose = "Peggy P. Pee";
                    p2 = parseInt($("#peggy-lost").html()) +1;
                    $("#peggy-lost").text(p2);
                break;
        }

        $li1.text(win);
        $li2.text(lose);
        $row.append($li1, $li2);
        $("#hs tr:first").after($row);
    },

    onGoToMenu = function(){
        $(that).trigger("showDummy", []);
        $(that).trigger("showNewScreen", [hsView, stView]);
    };

    that.init = init;
    that.setHighscore = setHighscore;
    
	return that;
    
})();
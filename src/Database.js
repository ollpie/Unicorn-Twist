App.Database = (function() {
    var that = {},
   
    init = function() {
    	restoreContents();
    	saveContents();

    	return that;
    },

    resetContent = function(e){
    	localStorage.clear();
        $(that).trigger("goToMenu", []);
    },

    restoreContents = function(){
    	var highscore = localStorage['total-highscore-view'];
        if (highscore != undefined) {
            $('#total-highscore-view').html(highscore);
        }
    },

    saveContents = function(){    	
    var highscore = $('#total-highscore-view').html();
    localStorage['total-highscore-view'] = highscore;
    };

    that.init = init;
    that.saveContents = saveContents;
    that.resetContent = resetContent;

	return that;
})();
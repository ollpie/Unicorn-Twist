App.CubeModel = (function() {
    var that = {},

    init = function() {

    	 return that;
    },

    onTurnCube = function(id, oldPosition, newPosition){
        id.removeClass(oldPosition);
        id.addClass(newPosition);
      };

    that.init = init;
    that.onTurnCube = onTurnCube;

	return that;
})();
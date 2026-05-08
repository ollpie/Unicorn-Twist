App.PlayerSelectView = (function() {
    var that = {},
    ATTACK = 0,
    DEFENSE = 1,
    AWESOMENESS = 2,
    $button = null,
    $reelLeft = null,
    $reelRight = null,
    $stripLeft = null,
    $stripRight = null,
    $starsLeft = null,
    $starsRight = null,
    $attackp1 = null,
    $defensep1 = null,
    $awesomenessp1 = null,
    $attackp2 = null,
    $defensep2 = null,
    $awesomenessp2 = null,
    $namePlayer1 = null,
    $namePlayer2 = null,
    psView = ".player-select",
    gameView = ".game",
    reelIndexLeft = 0,
    reelIndexRight = 0,
    spinning = false,
    unicorn1 = [50, 50, 70],
    unicorn2 = [20, 89, 80],
    unicorn3 = [92, 13, 40],
    power = null,
    name = null,
    REEL_HEIGHT = 200,

    init = function() {
        $reelLeft    = $("#reel-left");
        $reelRight   = $("#reel-right");
        $stripLeft   = $("#strip-left");
        $stripRight  = $("#strip-right");
        $starsLeft   = $("#stars-left");
        $starsRight  = $("#stars-right");
        $attackp1      = $('#attackp1');
        $defensep1     = $('#defensep1');
        $awesomenessp1 = $('#awesomenessp1');
        $attackp2      = $('#attackp2');
        $defensep2     = $('#defensep2');
        $awesomenessp2 = $('#awesomenessp2');
        $namePlayer1   = $('.nameP1');
        $namePlayer2   = $('.nameP2');
        $button = $("#start-ps");

        power = [unicorn1, unicorn2, unicorn3];
        name  = ["Pinky van Horse", "Black Lemon", "Peggy P. Pee"];

        $button.on("click", onButtonClick);
        $reelLeft.closest(".player-select-cube-left").on("click", onTurnLeftReel);
        $reelRight.closest(".player-select-cube-right").on("click", onTurnRightReel);

        // Set initial strip positions
        gsap.set($stripLeft[0],  { y: 0 });
        gsap.set($stripRight[0], { y: 0 });

        updateBars(0, $attackp1, $defensep1, $awesomenessp1);
        updateBars(0, $attackp2, $defensep2, $awesomenessp2);

        return that;
    },

    updateBars = function(idx, $atk, $def, $awe) {
        $atk[0].style.width = '0%';
        $def[0].style.width = '0%';
        $awe[0].style.width = '0%';
        requestAnimationFrame(function() {
            $atk[0].style.width = power[idx][ATTACK]       + '%';
            $def[0].style.width = power[idx][DEFENSE]      + '%';
            $awe[0].style.width = power[idx][AWESOMENESS]  + '%';
        });
    },

    spinReel = function($strip, $viewport, $stars, idx, $atk, $def, $awe, $name) {
        var targetY = -(idx * REEL_HEIGHT);

        // Squash on click
        $viewport.addClass("squashing");
        setTimeout(function() { $viewport.removeClass("squashing"); }, 400);

        // Slot spin: overshoot by one extra slot then elastic back
        var overshoot = targetY - (idx < 2 ? REEL_HEIGHT * 0.4 : -REEL_HEIGHT * 0.4);

        gsap.to($strip[0], {
            duration: 0.3,
            y: overshoot,
            ease: "power2.in",
            onComplete: function() {
                gsap.to($strip[0], {
                    duration: 0.7,
                    y: targetY,
                    ease: "elastic.out(1, 0.45)",
                    onComplete: function() {
                        // Sparkle burst
                        $viewport.addClass("sparkling");
                        setTimeout(function() { $viewport.removeClass("sparkling"); }, 560);

                        // Orbiting stars
                        $stars.addClass("visible");
                        setTimeout(function() { $stars.removeClass("visible"); }, 1200);

                        updateBars(idx, $atk, $def, $awe);
                        $name.text(name[idx]);
                    }
                });
            }
        });
    },

    onTurnLeftReel = function() {
        reelIndexLeft = (reelIndexLeft + 1) % 3;
        spinReel($stripLeft, $reelLeft, $starsLeft, reelIndexLeft,
                 $attackp1, $defensep1, $awesomenessp1, $namePlayer1);
    },

    onTurnRightReel = function() {
        reelIndexRight = (reelIndexRight + 1) % 3;
        spinReel($stripRight, $reelRight, $starsRight, reelIndexRight,
                 $attackp2, $defensep2, $awesomenessp2, $namePlayer2);
    },

    onButtonClick = function() {
        $(that).trigger("setPageId", [4, $("#arrow_back_div")]);
        $(that).trigger("startGame", [reelIndexLeft, reelIndexRight]);
    },

    switchScreens = function() {
        $(that).trigger("showNewScreen", [psView, gameView]);
        $(that).trigger("startGameAnimation", []);
    };

    that.init = init;
    that.switchScreens = switchScreens;

    return that;

})();

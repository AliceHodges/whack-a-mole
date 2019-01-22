//whackamole js document
$(document).ready(function () {

    //definition of global variables
    var milseconds = null;
    var ticker = null;
    var countdownTicker = null;
    var noOfWhacks = 0;
    var i = 0;
    var startTime;
    var $inputName;
    var elapsedTime;
    var leaderBoard = [];

    //define common selectors
    var $mole = $("#mole-img"),
        $enterName = $("#div-enter-name"),
        $pEnterName = $("#p-enter-name"),
        $whackTitle = $("#whack-title"),
        $playArea = $("#play-area"),
        $whackDisplay = $("#whack-display"),
        $leaderBoardList = $("#leader-board"),
        $start = $("#start"),
        $timeMessages = $("#time-messages"),
        $buttonStart = $("#button-start"),
        $count = $("#countdown");

    //set the timer ticker to have interval 10ms
    ticker = setInterval(startTimer, 10);



    //handling user clicks
    $start.on("click", handleStartClick);
    $("#go").on("click", handleGoClick);
    $mole.on("click", whackamole);

    function handleStartClick() {
        $leaderBoardList.hide();
        $timeMessages.hide();
        $buttonStart.hide("slow");
        $mole.hide();
        $whackTitle.hide("slow");
        $enterName.css("display", "flex");
        $pEnterName.focus();
    }

    function handleGoClick() {
        var n=3;
        countdownTicker = setInterval(function () {
            if (n > 0) {
                $count.text(n);
                $count.fadeIn("slow");
                $count.fadeOut("fast");
                n--;
            } else {
                clearInterval(countdownTicker);
                begin();
            }
        }, 1000);
        $enterName.hide();
        $inputName = $pEnterName.val();
    }

    function begin() {
        elapsedTime = 0;
        noOfWhacks = 0;
        startTime = Date.now();
        $mole.show();
        $whackDisplay.css("display", "flex");
        whackamole();
        startTimer();
    }

    function startTimer() {
        var elapsedTime = Date.now() - startTime;
        $("#timer").text((elapsedTime / 1000).toFixed(2));
    }

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    function randomizePosition() {
        var divWidth = $playArea.width(),
            divHeight = $playArea.height(),
            moleWidth = $mole.width(),
            moleHeight = $mole.height(),
            posx = getRandomInt(divWidth - moleWidth - 25),
            posy = getRandomInt(divHeight - moleHeight);
        $mole.css({
            top: posy,
            left: posx,
        });
        console.log("divwidth" + divWidth + "Molewidth" + moleWidth);
    }


    function whackamole() {
        if (noOfWhacks < 6) {
            $("#no-of-whacks").text(noOfWhacks);
            randomizePosition();
            noOfWhacks++;
        } else {
            $mole.hide("slow");
            $whackDisplay.hide();
            gameOver();
        }
    }

    function gameOver() {
        var endTime = Date.now(),
            finalTime = ((endTime - startTime) / 1000).toFixed(2),
            leaderBoardValue = $inputName + " : " + finalTime;
        if (i < 3) {
            leaderBoard.push(leaderBoardValue);
            $leaderBoardList.append("<p class=\"p-leader-board\" id=\"leaderboard-i" + i + "\">" + leaderBoard[i] + "</p>");
        } else {
            leaderBoard.push(leaderBoardValue);
            var j = i - 3
            $("#leaderboard-i" + j).remove();
            $leaderBoardList.append("<p class=\"p-leader-board\" id=\"leaderboard-i" + i + "\">" + leaderBoard[3] + "</p>");
            leaderBoard.shift();
        }
        i++
        $("#time").text(finalTime + " seconds");
        $("#time-message").text("Congrats " + $inputName + " ! - your time was: ");
        $whackTitle.show();
        $leaderBoardList.show();
        $buttonStart.show();
        $timeMessages.show();
        $pEnterName.val(" ");
    }

});

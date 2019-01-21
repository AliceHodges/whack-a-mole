// A $( document ).ready() block.
$(document).ready(function () {



    var milseconds = null;
    var ticker = null;
    var noOfWhacks = 0;
    var i = 0;
    var startTime;
    var endTime;
    var inputName;
    var elapsedTime;
    var leaderBoard = [];
    $("#time-messages").hide();
    $("#whack-display").hide();
    $("#enter-name").hide();


    ticker = setInterval(startTimer, 10);



    $("#start").on({
        "click": clickStart

    });

    $("#button-go").on("click", clickGo);

    $("#mole-img").on({
        "click": whackamole
    });

    function clickStart() {
        $(".p-leader-board").hide();
        $("#mole-img").hide();
        $("#div-enter-name").css("display", "flex");
        $("#whack-title").hide("slow");
        $("#button-start").hide("slow");
        $("#time-messages").hide();
    }


    function clickGo() {
        elapsedTime = 0;
        noOfWhacks = 0;
        $("#div-enter-name").hide();
        $(".start-hide").hide("slow");
        $("#whack-display").show();
        $("#mole-img").show();
        startTime = $.now();
        inputName = $("#p-enter-name").val();
        console.log("The name is" + inputName);
        whackamole();
        startTimer();
    }

    function startTimer() {
        var elapsedTime = $.now() - startTime;
        $("#timer").text((elapsedTime / 1000).toFixed(2));
    }

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    function randomizePosition() {
        var divwidth = parseFloat($("#playarea").css("width"));
        var divlength = parseFloat($("#playarea").css("height"));
        var molewidth = parseFloat($("#mole-img").css("width"));
        var moleheight = parseFloat($("#mole-img").css("height"));
        var posx = getRandomInt(divwidth - molewidth - 25);
        var posy = getRandomInt(divlength - moleheight);
        $("#mole-img").css({
            top: posy,
            left: posx,
            position: "relative"
        });
    }

    function whackamole() {
        console.log("new function");
        if (noOfWhacks < 6) {
            $("#noofwhacks").text(noOfWhacks);
            console.log(noOfWhacks);
            randomizePosition();
        } else {
            $("#mole-img").hide("slow");
            $("#whack-display").hide("slow");
            endTime = $.now();
            gameover();
        }
        noOfWhacks++;

    }

    function gameover() {
        var score = inputName + " : " + ((endTime - startTime) / 1000).toFixed(2);
        
        if (i < 3) {
            leaderBoard.push(score);
            $("#leader-board").append("<p class=\"p-leader-board\" id=\"leaderboard-i" + i + "\">" + leaderBoard[i] + "</p>");
        } else {
            leaderBoard.push(score);
            var j = i-3
            $("#leaderboard-i" + j).remove();
            $("#leader-board").append("<p class=\"p-leader-board\" id=\"leaderboard-i" + i + "\">" + leaderBoard[3] + "</p>");            
            leaderBoard.shift();
        }
        console.log(leaderBoard);
        $(".p-leader-board").show();
        $("#whack-title").show();
        $("#start").text("Play Again");
        $("#button-start").show();
        $("#time-messages").show();
        $("#time").text(score + " seconds");
        $("#time-message").text("Congrats " + inputName + " ! - your time was: ");
        $("#p-enter-name").val(" ");
        i++
    }





});

// A $( document ).ready() block.
$( document ).ready(function() {

    
    
    $("#time-messages").hide();
    $("#whack-display").hide();
    var noOfWhacks = 0;
    var timestamp;
    var endTime;
    
    $("button").on({
        "click": clickStart 

    });
    
        
    $("#mole-img").on({
        "click": whackamole
    });
    
 
    function clickStart() {
        $("#time-messages").hide();
        $("#whack-display").show();
        console.log("you clicked start");
        //created a div to encase all the objects need to be hidden
        $(".start-hide").hide("slow");
        $("#mole-img").show("slow");
        timestamp = $.now();
        console.log(timestamp);
        whackamole();
    }
    
    function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    
    
    function randomizePosition() {
        var divwidth = parseFloat($("#playarea").css("width"));
        var divlength = parseFloat($("#playarea").css("height"));
        var molewidth = parseFloat($("#mole-img").css("width"));
        var moleheight = parseFloat($("#mole-img").css("width"));
        var posx = getRandomInt(divwidth-molewidth);
        var posy = getRandomInt(divlength-moleheight);
        $("#mole-img").css({ top: posy, left: posx, position: "relative"});
    }
    
    
    function whackamole() {
        console.log("new function");
        if (noOfWhacks<6){
            $("#noofwhacks").text(noOfWhacks);
            console.log(noOfWhacks);
            randomizePosition();
            }
        else {
            $("#mole-img").hide("slow");
            $("#whack-display").hide("slow");
            endTime = $.now();
            gameover();
            }
        noOfWhacks++;
        
    }
    

    function gameover(){
        $(".start-hide").show();
        $("#time-messages").show();
        $("#time").text(((endTime-timestamp)/1000) + " seconds");
        noOfWhacks = 0;
    }
    
    
    
});

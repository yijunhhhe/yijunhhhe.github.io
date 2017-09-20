$(function(){
    var breaklength = 5 * 60;
    var sessionlength = 25 * 60;
    var timeLeft = sessionlength;
    var isSession = true;
    var timeInterval;
    var clickInterval
    
    function switchSession(){
        if(isSession){
            timeLeft = breaklength;
            isSession = false;
        }else{
            timeLeft = sessionlength;
            isSession = true;
        }
    }

    function formatSeconds(seconds) {
        return seconds < 10 ? '0' + seconds : seconds;
    }

    function updateTimer(){
        var minutesLeft;
        var secondsLeft;

        minutesLeft = Math.floor(timeLeft / 60);
        secondsLeft = timeLeft - minutesLeft * 60;
        $(".time-left").html(minutesLeft + ':' + formatSeconds(secondsLeft));  
    }

    function updateTimerLengths(){
        if(sessionlength < 0){
            sessionlength = 0;
        }
        if(breaklength < 0){
            breaklength = 0;
        }

        $("#session-length").html(sessionlength / 60);
        $("#break-length").html(breaklength / 60);  
    }

    function init(){
        breaklength = 5 * 60;
        sessionlength = 25 * 60;
        timeLeft = sessionlength;
        clearInterval(timeInterval);
        clearInterval(clickInterval);
        if($(".status").hasClass('stop')){
            $('.status').html("click to stop");
            $('.status').removeClass('stop');
            $('.status').addClass('go');
        }
        updateTimer();
        updateTimerLengths();
    }
    
    function iClickHandler(id){
        switch (id){
            case 'session-plus':
                sessionlength += 60;
                if(isSession){
                    timeLeft += 60;
                }
                break;
            case 'session-minus':
                sessionlength -= 60;
                if(isSession){
                    timeLeft -= 60;
                }
                break;
            case 'break-plus':
                breaklength += 60;
                if(!isSession){
                    timeLeft += 60;
                }
                break;
            case 'break-minus':
                breaklength -= 60;
                if(!isSession){
                    timeLeft -= 60;
                }
                break;      
        }
        updateTimerLengths();
        updateTimer();
    }
    
    $(".operator").on("mousedown", function(){
        var id = $(this).attr("id");
        iClickHandler(id);
        
    });
    
    
    $("#pomodoro").click(function(){
        if($(".status").hasClass("go")){
            $(".status").html('click to stop');
            $(".status").removeClass('go');
            $(".status").addClass('stop');
            timeInterval = setInterval(function(){
                timeLeft--;
                updateTimer();
            },1000);
        } else {
            clearInterval(timeInterval);
            $('.status').html("click to start");
            $('.status').removeClass('stop');
            $('.status').addClass('go');
        }
    });
    
    $('#reset-pomodoro').click(init);
    
    $('#next-pomodoro').click(function(){
        switchSession(false);
        updateTimer();
    })
});


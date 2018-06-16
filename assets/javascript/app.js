$(document).ready(function(){

    //questions and answers
    var trivia = [
        {question: "What college did Marshall, Lily, and Ted attend?",
        choices : ["Wesleyan","NYU", "Marquette","Columbia"],
        right : "Wesleyan"
        }, 
        {question: "What was the name of the bar Ted and Barney wanted to open?",
        choices : ["Puzzles","Suits", "BarBar","Blitz"],
        right : "Puzzles"  
        },
        {question: "Why did Lily officially move into Marshall and Ted's apartment?",
        choices : ["Lily lost her job","She didn't want to pay rent", "Her apartment became a Chinese restaurant","She came back from San Francisco"],
        right : "Her apartment became a Chinese restaurant",
        },
        {question: "What is Barney's job?",
        choices : ["Provide Legal Exculpation and Sign Everything","CEO of GNB", "Lawyer","It was never said"],
        right : "Provide Legal Exculpation and Sign Everything",
        },
        {question: "Where did Ted meet The Mother?",
        choices : ["Farhampton Station","Marshall's wedding", "McLarens","Barney's Wedding"],
        right : "Farhampton Station",
        },
        {question: "Who voices old Ted?",
        choices : ["Josh Radnor","Bob Saget", "David Schwimmer","John Stamos"],
        right : "Bob Saget",
        }, 
        {question: "How many dogs did Robin have when she met Ted?",
        choices : ["Two","Three","Five","None"],
        right : "Five",
        },
        {question: "Which of Ted's girlfriends actually lived in New Jersey?",
        choices : ["Stella","Victoria","Karen","Zoey"],
        right : "Stella",
        },
        {question: "Why did Marshall where a fedora in his wedding photos?",
        choices : ["He thought it made him cooler","The wedding had a 50s theme","He shaved part of his head","He lost a bet to Barney"],
        right : "He shaved part of his head",
        },{
        question: "What did Barney have to wear for a year because he lost a bet with Marshall?",
        choices : ["A green suit", "Anything but a suit", "A ducky tie", "A polka dot tie"],
        right : "A ducky tie",
        }, 
        {question: "What is the Mother's name?",
        choices : ["Virginia","Vicky","Zoey","Tracy"],
        right : "Tracy",
        },
        {question: "What was Ted's secret alias on his college radio show?",
        choices : ["Doctor Strange", "Doctor Love","Doctor T", "Doctor X"],
        right : "Doctor X"
        }
        ];


    //variables for form, button, etc.
    var correct = 0;
    var incorrect = 0;
    var timeOut;
    var start = $("#button");
    var submit = $("#submit").hide();
    var reset = $("#reset").hide();
    var postChoices = $("#choices").hide();
    var postQuestions = $("#questions").hide();
    var endGame = $("#endGame").hide();
    var score = $("#score").hide();
    var index= 0;
    var userGuess = $("input[name=answer]:checked").val();

        
    //on clicks

    function countdownTimer (){
        timer= 15;
        clearInterval(timeOut);
        timeOut = setInterval(decrement,1000);
    };
    function decrement(){
        timer--;
        $('#timer').html(timer);

        if(timer === 0){
            stopTimer (); 
            index ++;
            incorrect++
            gamePlay();
            alert("Out of time!");
        }
    };

    function stopTimer(){
        clearInterval(timeOut)
    };

    

    //gamePlay function to put text on DOM
    function gamePlay(){
        countdownTimer();
        $("#submit").prop("disabled", true);
        $('.answer').prop('checked', false);
        $("#questions").html(trivia[index].question);
        $("#rOne").val(trivia[index].choices[0]);
        $("#choiceOne").text(trivia[index].choices[0]);
        $("#rtwo").val(trivia[index].choices[1]);
        $("#choiceTwo").text(trivia[index].choices[1]);
        $("#rThree").val(trivia[index].choices[2]);
        $("#choiceThree").text(trivia[index].choices[2]);
        $("#rFour").val(trivia[index].choices[3]);
        $("#choiceFour").text(trivia[index].choices[3]);

    }; // end of gamePlay function

    //end game alerts
    function finish (){
        if (correct < 4 ){
            $("#endGame").html("You tried, you really did...");
            $("#score").html("You got them all wrong");
        }
        else if ((correct >= 5) && (correct <= 9 )) {
            $("#endGame").html("That's not too bad...but not great.");
            $("#score").html("You only got " + correct + " right but you missed " + incorrect);
        }
        else if ((correct >= 10) && (correct <= 11 )) {
            $("#endGame").html("Legend..... Wait for it.... nope, not quite there yet");
            $("#score").html("You only got " + correct + " right but you missed " + incorrect);
        }

        else if (correct === 12) {
            $("#endGame").html("Suit Up!");
            $("#score").html("You only got " + correct + " . Perfect Score!");

        };


    }; // end of finish function 
    
    //load questions and choices
    start.on("click", function(){
       start.hide();
       $("#timer").show();
       postQuestions.show();
       postChoices.show();
       submit.show();
       countdownTimer();
       gamePlay(); 
    })


    submit.on("click", function(){
        stopTimer();
        if (userGuess === trivia[index].right){
            correct++
        }
        else if (userGuess != trivia[index].right){
            incorrect++
        }
        index++;

        if (index < trivia.length) {
            gamePlay();
        }
        else if (index===trivia.length){
            stopTimer();
            postQuestions.hide();
            postChoices.hide();
            submit.hide();
            reset.show();
            endGame.show();
            score.show();
            

            finish();
        
        };

    });// end of load question and choices

    reset.on("click", function(){
        postQuestions.hide();
        reset.hide();
        start.show();
        endGame.hide();
        score.hide();
        gamePlay();
        // countdownTimer.hide();
        correct = 0;
        incorrect = 0;
        finish();
    });


    postChoices.on("click", function() {
        userGuess = $('input[name=answer]:checked').val();
        $("input:radio").change(function() {$('#submit').prop("disabled",false);
        // $("#showAnswer").html(trivia[index].right)
        
        });
    }); 

}); //end doc ready
$(document).ready(function(){

    //questions and answers
    var trivia = [
        {question: "Who voices old Ted?",
        choices : ["Bob Saget","Josh Radnor", "David Schwimmer","John Stamos"],
        right : "Bob Saget",
        },
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
        },
        {
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
    var timer
    var timeOut;
    var start = $("#button");
    var submit = $("#submit").hide();
    var reset = $("#reset").hide();
    var postChoices = $("#choices").hide();
    var postQuestions = $("#questions").hide();
    var endGame = $("#endGame").hide();
    var score = $("#score").hide();
    var result = $("#result").hide();
    var index= 0;
    var userGuess = $("input[name=answer]:checked").val();
    var popup;

        
    //on clicks

    function countdownTimer (){
        timer= 16;
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
        if (correct === 0 ){
            $("#endGame").html("You tried, you really did...");
            $("#score").html("You got them all wrong, that's 0 correct and  " + incorrect + " incorrect.");
            console.log(correct)
            console.log(incorrect)
        }
        else if ((correct >= 1) && (correct <= 6 )) {
            $("#endGame").html("That's not too bad...but not great.");
            $("#score").html("You only got " + correct + " right and you missed " + incorrect);
            console.log(correct)
            console.log(incorrect)
        }
        else if ((correct >= 7) && (correct <= 11 )) {
            $("#endGame").html("Legend..... Wait for it.... nope, not quite there yet");
            $("#score").html("You only got " + correct + " right and you missed " + incorrect);
            console.log(correct)
            console.log(incorrect)
        }

        else if (correct <= 12) {
            $("#endGame").html("Suit Up!");
            $("#score").html("You got all " + correct + " . Perfect Score!");
            console.log(correct)
            console.log(incorrect)

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
        function results(){
                popup = setTimeout(function(){
                    result.hide();
                    postQuestions.show();
                    postChoices.show();
                },2000)
        };
        function stopResult() {
            clearTimeout(popup)
        };

        if (userGuess === trivia[index].right){
            correct++;
            result.show();
            postQuestions.hide();
            postChoices.hide();
            result.html(trivia[index].right +" is correct! You got it right!");
            results();
            
            
        //    alert("Correct!"); figure out a way to post for 1.5 sec
        }
        else if (userGuess != trivia[index].right){
            incorrect++;
            result.show();
            postQuestions.hide();
            postChoices.hide();
            result.html("You guessed wrong. The correct answer is " + trivia[index].right );
            results();
        
            // alert("The correct answer is " + trivia[index].right) figure out a way to post for 1.5 sec 
        }
        index++;

        if (index < trivia.length) {
            gamePlay();
        }
        else if (index===trivia.length){
            stopTimer();
            stopResult();
            postQuestions.hide();
            postChoices.hide();
            result.hide()
            submit.hide();
            reset.show();
            endGame.show();
            score.show();
            $("#timer").hide();
            finish();
        
        };

    });// end of load question and choices

    reset.on("click", function(){
        postQuestions.hide();
        result.hide();
        reset.hide();
        start.show();
        endGame.hide();
        score.hide();
        correct = 0;
        incorrect = 0;
        index = 0;
        finish();
    
    });


    postChoices.on("click", function() {
        userGuess = $('input[name=answer]:checked').val();
        $("input:radio").change(function() {$('#submit').prop("disabled",false);});
    }); 

}); //end doc ready
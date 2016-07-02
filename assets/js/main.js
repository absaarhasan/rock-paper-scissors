"use strict";

/* controller */

var app = (function () {

    var ctrl = {

        alertBanner : document.getElementById('alert'),
        alertMsg : document.getElementById('msg') ,
        userRock : document.getElementById('userRock'),
        userPaper : document.getElementById('userPaper'),
        userScissors : document.getElementById('userScissors'),
        comRock : document.getElementById('comRock'),
        comPaper : document.getElementById('comPaper'),
        comScissors : document.getElementById('comScissors'),
        startButton : document.getElementById('startButton'),
        resetButton : document.getElementById('resetButton'),
        userScore : document.getElementById('userScore'),
        comScore : document.getElementById('comScore'),
        startGame : startGame,
        deactivateGoBtn : deactivateGoBtn,
        activateGoBtn : activateGoBtn,
        deactivateResetBtn : deactivateResetBtn,
        activateResetBtn : activateResetBtn,
        resetGame : resetGame,
        randomChoice : randomChoice,
        updateIconDisplay : updateIconDisplay,
        clock : new Clock(),
        player1: new Player("user"),
        player2: new Player("computer"),
        playerTest: new Player("test"),
        activateChoiceBtns : activateChoiceBtns,
        deactivateChoiceBtns : deactivateChoiceBtns,
        setChoice : setChoice,
        calculateWinner : calculateWinner,
        displayResults : displayResults,
        init : init


    };

    return ctrl


    function init(){

        app.startButton.onclick = app.startGame;
        app.resetButton.onclick = app.resetGame;

    }

    function startGame() {

        app.deactivateGoBtn();
        app.deactivateResetBtn();
        app.activateChoiceBtns();
        app.comScore.className = "";
        app.userScore.className = "";
        app.player1.startRandomChoice();
        app.player2.startRandomChoice();
        app.clock.init();


        setTimeout(function(){

            app.player1.stopRandomChoice();
            app.player2.stopRandomChoice();

            app.deactivateChoiceBtns();

            var userChoice = app.player1.userChoice ? app.player1.userChoice : app.player1.computerChoice;
            var computerChoice = app.player2.computerChoice;

            app.updateIconDisplay("user", userChoice, "selected");
            app.updateIconDisplay("computer", computerChoice ,"selected");

            var results = app.calculateWinner(userChoice,computerChoice);

            app.displayResults(results.winner, results.msg)

        }, 3000);

    }



    function calculateWinner(userChoice,computerChoice){

        var msg, winner;

        var results = {

            winner : null,
            msg : null

        };

        if (userChoice === computerChoice){

            results.winner = "none";
            results.msg = "Tie!";

        } else {

            var choiceString = userChoice + " | " + computerChoice;

            switch(choiceString) {

                case "Rock | Paper":

                    results.winner = "computer";
                    results.msg = "Paper wins!";

                    break;
                case "Rock | Scissors":

                    results.winner = "user";
                    results.msg = "Rock wins!";

                    break;
                case "Paper | Rock":

                    results.winner = "user";
                    results.msg = "Paper wins!";

                    break;
                case "Paper | Scissors":

                    results.winner = "computer";
                    results.msg = "Scissors wins!";

                    break;
                case "Scissors | Rock":

                    results.winner = "computer";
                    results.msg = "Rock wins!";

                    break;
                case "Scissors | Paper":

                    results.winner = "user";
                    results.msg = "Scissors wins!";

                    break;
                default:

            }

        }

        return results


    }

    function displayResults(winner, msg){

        app.alertBanner.className = "finished";
        app.alertMsg.innerHTML =  msg;

        if(winner !== "none") {

            if(winner === "user"){

                app.player1.score ++;
                app.userScore.className = "winner";
                app.userScore.innerHTML = app.player1.score;

            }else {

                app.player2.score ++;
                app.comScore.className = "winner";
                app.comScore.innerHTML = app.player2.score;

            }


        }

        app.activateGoBtn();
        app.activateResetBtn();

    }





    function resetGame() {

        app.alertBanner.className = "";
        app.alertMsg.innerHTML = "You have three seconds to make a decision, otherwise the computer will choose for you!";
        app.updateIconDisplay("user", "","");
        app.updateIconDisplay("computer", "","");

        app.player1.score = 0;
        app.player2.score = 0;

        app.comScore.className = "";
        app.comScore.innerHTML = 0;

        app.userScore.className = "";
        app.userScore.innerHTML = 0;


    }



    function randomChoice() {

        var choices = ["Rock", "Paper", "Scissors"];

        var randomChoice = Math.random();

        if (randomChoice < 0.34) {
            randomChoice = choices[0];
        } else if(randomChoice <= 0.67) {
            randomChoice = choices[1];
        } else {
            randomChoice = choices[2];
        }



        return randomChoice

    }

    function deactivateGoBtn() {

        app.startButton.onclick = null;
        app.startButton.className = "busy";
        app.startButton.innerHTML = "Go!"

    }

    function activateGoBtn() {

        app.player1.userChoice = null;
        app.startButton.onclick = app.startGame;
        app.startButton.className = null;
        app.startButton.innerHTML = "Ready?"

    }

    function deactivateResetBtn() {

        app.resetButton.onclick = null;

    }

    function activateResetBtn() {

        app.player1.userChoice = null;
        app.resetButton.onclick = app.resetGame;


    }




    function Clock() {

        var that = this;

        this.timer = 3;

        this.count = function (countInterval) {
            this.timer --;

            app.alertMsg.innerHTML = this.timer;
            if (this.timer == 1) {
                clearInterval(countInterval);
                this.timer = 3
            }
        };

        this.countDown =  function () {
            var countInterval = setInterval(function(){

                that.count(countInterval);

            }, 1000);
        };

        this.init = function () {

            app.alertMsg.innerHTML = this.timer;
            app.alertBanner.className = "busy";
            this.countDown();
        };
    }

    function updateIconDisplay(player,choice,state) {

        if (player === "user"){

            app.userRock.className = "";
            app.userPaper.className = "";
            app.userScissors.className = "";

            switch(choice) {

                case "Rock":
                    app.userRock.className = state;
                    break;
                case "Paper":
                    app.userPaper.className = state;
                    break;
                case "Scissors":
                    app.userScissors.className = state;
                    break;
                default:
                    break;

            }


        }else if (player === "computer"){

            app.comRock.className = "";
            app.comPaper.className = "";
            app.comScissors.className = "";

            switch(choice) {
                case "Rock":
                    app.comRock.className = state;
                    break;
                case "Paper":
                    app.comPaper.className = state;
                    break;
                case "Scissors" :
                    app.comScissors.className = state;
                    break;
                default:
                    break;
            };

     };

    };


    function Player(playerName) {

        var that = this;
        var choiceInterval;

        this.score = 0;
        this.userChoice = null;
        this.computerChoice = null;
        this.startRandomChoice= function () {

            choiceInterval = setInterval(function(){

                that.computerChoice = app.randomChoice();

                app.updateIconDisplay(playerName, that.computerChoice , "active")

            }, 100);
        };
        this.stopRandomChoice= function () {

            clearInterval(choiceInterval);
        }

    }



    function activateChoiceBtns(){

        app.userRock.onclick = app.setChoice;
        app.userPaper.onclick = app.setChoice;
        app.userScissors.onclick = app.setChoice;

    }


    function deactivateChoiceBtns(){

        app.userRock.onclick = null;
        app.userPaper.onclick = null;
        app.userScissors.onclick = null;

    }

    function setChoice(btnId){

        var btnId = (typeof btnId == "string") ? btnId : this.id;

        app.userRock.className = "";
        app.userPaper.className = "";
        app.userScissors.className = "";

        switch(btnId) {
            case "userRock":
                app.userRock.className = "selected";
                app.player1.userChoice = "Rock";
                break;
            case "userPaper":
                app.userPaper.className = "selected";
                app.player1.userChoice = "Paper";
                break;
            case "userScissors" :
                app.userScissors.className = "selected";
                app.player1.userChoice = "Scissors";
                break;
            default:
                break;
        };

        app.player1.stopRandomChoice();

    }

})();

/* boot strap */

app.init();









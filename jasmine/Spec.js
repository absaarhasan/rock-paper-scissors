describe("Rock, Paper, Scissors Game", function() {


    beforeEach(function() {


    });

    describe("Main Dom Controller", function() {


        it("should have access to the DOM", function() {

            expect(app.alertBanner).toBeDefined();
            expect(app.alertMsg).toBeDefined();
            expect(app.userRock).toBeDefined();
            expect(app.userPaper).toBeDefined();
            expect(app.userScissors).toBeDefined();
            expect(app.comRock).toBeDefined();
            expect(app.comPaper).toBeDefined();
            expect(app.comScissors).toBeDefined();
            expect(app.startButton).toBeDefined();
            expect(app.resetButton).toBeDefined();

        });

    });

    describe("Init Function", function() {
        beforeEach(function() {

            spyOn(app, 'startGame');
            spyOn(app, 'resetGame');

            init();

        });



        it("should initialise the app", function() {

            expect(typeof app.startButton.onclick).toMatch("function");
            expect(typeof app.resetButton.onclick).toMatch("function");

            app.startButton.click();
            app.resetButton.click();

            expect(app.resetGame).toHaveBeenCalled();
            expect(app.startGame).toHaveBeenCalled();

        });

    });

    describe("Random Choice Function", function() {

        it("should return a random choice", function() {

            var choice = randomChoice();

            expect(typeof choice).toMatch("string");

        });

    });

    describe("Deactivate Go Button Function", function() {

        it("should deactivate the main button", function() {

            app.deactivateGoBtn();

            expect(app.startButton.onclick).toBe(null);
            expect(app.startButton.className).toMatch("busy");
            expect(app.startButton.innerHTML).toMatch("Go");

        });

    });

    describe("Activate Go Button Function", function() {

        beforeEach(function() {

            spyOn(app, 'startGame');

        });

        it("should activate the main button", function() {

            app.activateGoBtn();
            app.startButton.click();

            expect(app.startGame).toHaveBeenCalled();
            expect(app.startButton.className).toMatch("");
            expect(app.startButton.innerHTML).toMatch("Ready?");

        });

    });

    describe("Deactivate Reset Button Function", function() {

        beforeEach(function() {

            spyOn(app, 'resetGame');

        });

        it("should deactivate the reset button", function() {

            app.deactivateResetBtn();

            app.resetButton.click();

            expect(app.resetGame).not.toHaveBeenCalled();

        });

    });

    describe("Activate Reset Button Function", function() {

        beforeEach(function() {

            spyOn(app, 'resetGame');

        });

        it("should deactivate the reset button", function() {

            app.activateResetBtn();

            app.resetButton.click();

            expect(app.resetGame).toHaveBeenCalled();

        });

    });

    describe("Activate Clock Function", function() {

        beforeEach(function() {
            spyOn(app.clock, 'count');
            jasmine.clock().install();
            app.clock.init();

        });

        afterEach(function() {
            jasmine.clock().uninstall();
        });

        it("should activate the count down", function() {

            expect(app.clock.timer).toEqual(3);

            expect(app.alertMsg.innerHTML).toMatch("3");

            expect( app.alertBanner.className).toMatch("busy");

            expect(app.clock.count).not.toHaveBeenCalled();

            jasmine.clock().tick(1001);

            expect(app.clock.count).toHaveBeenCalled();

        });

    });

    describe("Icon Display Function", function() {

        it("should respond to the random display for users", function() {

            app.updateIconDisplay("user","Rock","active");
            expect(app.userRock.className).toMatch("active");
            app.updateIconDisplay("user","Paper","active");
            expect(app.userPaper.className).toMatch("active");
            app.updateIconDisplay("user","Scissors","active");
            expect(app.userScissors.className).toMatch("active");

        });

        it("should respond to the random display for the computer", function() {

            app.updateIconDisplay("computer","Rock","active");
            expect(app.comRock.className).toMatch("active");
            app.updateIconDisplay("computer","Paper","active");
            expect(app.comPaper.className).toMatch("active");
            app.updateIconDisplay("computer","Scissors","active");
            expect(app.comScissors.className).toMatch("active");

        });

        it("should respond to the user choice", function() {

            app.updateIconDisplay("user","Rock","selected");
            expect(app.userRock.className).toMatch("selected");
            app.updateIconDisplay("user","Paper","selected");
            expect(app.userPaper.className).toMatch("selected");
            app.updateIconDisplay("user","Scissors","selected");
            expect(app.userScissors.className).toMatch("selected");

        });

        it("should respond to the computer choice", function() {

            app.updateIconDisplay("computer","Rock","selected");
            expect(app.comRock.className).toMatch("selected");
            app.updateIconDisplay("computer","Paper","selected");
            expect(app.comPaper.className).toMatch("selected");
            app.updateIconDisplay("computer","Scissors","selected");
            expect(app.comScissors.className).toMatch("selected");

        });

    });

    describe("Players Constructor Function", function() {

        beforeEach(function() {


            spyOn(app, 'randomChoice');
            spyOn(app, 'updateIconDisplay');
            jasmine.clock().install();
            app.clock.init();

        });

        afterEach(function() {
            jasmine.clock().uninstall();
        });

        it("should be able to create new players", function() {

            var player = new Player("test");
            expect(player).toBeDefined();

        });

        it("should record the player's score", function() {

            var player = new Player("test");
            expect(player.score).toEqual(0);

        });

        it("should provide the player with a random choice", function() {

            var player = new Player("test");
            player.startRandomChoice();

            jasmine.clock().tick(100);

            expect(app.randomChoice).toHaveBeenCalled();
            expect(app.updateIconDisplay).toHaveBeenCalled();
            expect(app.computerChoice).not.toBe(null);

            player.stopRandomChoice();

        });

    });


    describe("Activate Choice Buttons", function() {

        beforeEach(function() {

            spyOn(app, 'setChoice');
            app.activateChoiceBtns()

        });


        it("should activate the rock button", function() {

            app.userRock.click();
            expect(app.setChoice).toHaveBeenCalled();

        });

        it("should activate the paper button", function() {

            app.userPaper.click();
            expect(app.setChoice).toHaveBeenCalled();

        });

        it("should activate the scissors button", function() {

            app.userScissors.click();
            expect(app.setChoice).toHaveBeenCalled();

        });



    });

    describe("Deactivate Choice Buttons", function() {

        beforeEach(function() {

            spyOn(app, 'setChoice');
            app.deactivateChoiceBtns()

        });


        it("should deactivate the rock button", function() {

            app.userRock.click();
            expect(app.setChoice).not.toHaveBeenCalled();

        });

        it("should deactivate the paper button", function() {

            app.userPaper.click();
            expect(app.setChoice).not.toHaveBeenCalled();

        });

        it("should deactivate the scissors button", function() {

            app.userScissors.click();
            expect(app.setChoice).not.toHaveBeenCalled();

        });

    });

    describe("Set Choice Function", function() {

        beforeEach(function() {

        });

        afterEach(function() {

            app.player1.userChoice = null;

        });


        it("should allow the user to choose rock", function() {

            app.setChoice("userRock");

            expect(app.userRock.className).toMatch("selected");
            expect(app.player1.userChoice).toMatch("Rock");

        });

        it("should allow the user to choose paper", function() {

            app.setChoice("userPaper");

            expect(app.userPaper.className).toMatch("selected");
            expect(app.player1.userChoice).toMatch("Paper");

        });

        it("should allow the user to choose scissors", function() {

            app.setChoice("userScissors");

            expect(app.userScissors.className).toMatch("selected");
            expect(app.player1.userChoice).toMatch("Scissors");

        });



    });

    describe("Start Game Function", function() {

        beforeEach(function() {

            spyOn(app, 'deactivateGoBtn');
            spyOn(app, 'deactivateResetBtn');
            spyOn(app, 'activateChoiceBtns');
            spyOn(app.player1, 'startRandomChoice');
            spyOn(app.player2, 'startRandomChoice');
            spyOn(app.clock, 'init');
            spyOn(app.player1, 'stopRandomChoice');
            spyOn(app.player2, 'stopRandomChoice');
            spyOn(app, 'deactivateChoiceBtns');
            spyOn(app, 'updateIconDisplay');
            spyOn(app, 'calculateWinner').and.callFake(function() {
                return {winner : "none", msg : "Tie!"}
            });
            spyOn(app, 'displayResults');

            jasmine.clock().install();

            app.startGame();

        });

        afterEach(function() {

            jasmine.clock().uninstall();
            app.player1.userChoice = null;

        });


        it("should deactivate the go button", function() {

            expect(app.deactivateGoBtn).toHaveBeenCalled();

        });

        it("should deactivate the reset button", function() {

            expect(app.deactivateResetBtn).toHaveBeenCalled();

        });



        it("should activate the choice buttons", function() {

            expect(app.activateChoiceBtns).toHaveBeenCalled();

        });

        it("should reset the results display", function() {

            expect(app.comScore.className).toMatch("");
            expect(app.userScore.className).toMatch("");

        });

        it("should activate the randomiser", function() {

            expect(app.player1.startRandomChoice).toHaveBeenCalled();
            expect(app.player2.startRandomChoice).toHaveBeenCalled();

        });

        it("should activate the clock", function() {

            expect(app.clock.init).toHaveBeenCalled();
            jasmine.clock().tick(100);
        });

        it("should deactivate the randomiser after 3s", function() {

            jasmine.clock().tick(3001);

            expect(app.player1.stopRandomChoice).toHaveBeenCalled();
            expect(app.player2.stopRandomChoice).toHaveBeenCalled()

        });

        it("should deactivate the choice buttons after 3s", function() {

            jasmine.clock().tick(3001);

            expect(app.deactivateChoiceBtns).toHaveBeenCalled();

        });


        it("should determine the results", function() {

            app.player1.userChoice = "Rock";

            jasmine.clock().tick(3001);

            expect(app.player1.computerChoice).toBeDefined();

            expect(app.player1.userChoice).toBeDefined();

            expect(app.player2.computerChoice).toBeDefined();

        });

        it("should request a winner", function() {

            jasmine.clock().tick(3001);

            expect(app.calculateWinner).toHaveBeenCalled();

        });

        it("should request for the results to be displayed", function() {

            jasmine.clock().tick(3001);

            expect(app.displayResults).toHaveBeenCalled();

        });

    });

    describe("Calculate Winner Function", function() {

        it("should determine if the game is a tie", function() {

            var results = calculateWinner("Rock","Rock");

            expect(results.winner).toMatch("none");

            expect(results.msg).toMatch("Tie!");

        });

        it("should determine if the user has won", function() {

            var results = calculateWinner("Rock","Scissors");

            expect(results.winner).toMatch("user");

            expect(results.msg).toMatch("Rock wins!");

            var results = calculateWinner("Paper","Rock");

            expect(results.winner).toMatch("user");

            expect(results.msg).toMatch("Paper wins!");

        });

        it("should determine if the computer has won", function() {

            var results = calculateWinner("Rock","Paper");

            expect(results.winner).toMatch("computer");

            expect(results.msg).toMatch("Paper wins!");

            var results = calculateWinner("Paper","Scissors");

            expect(results.winner).toMatch("computer");

            expect(results.msg).toMatch("Scissors wins!");

        });






    });

    describe("Display Results Function", function() {

        beforeEach(function() {

            spyOn(app, 'activateGoBtn');
            spyOn(app, 'activateResetBtn');

            app.player1.score = 0;
            app.player2.score = 0;

        });


        it("should update the banner", function() {

            app.displayResults("none", "Tie!");

            expect(app.alertBanner.className).toMatch("finished");

            expect(app.alertMsg.innerHTML).toMatch("Tie!");


        });

        it("should update the user's score upon a positive result", function() {

            app.displayResults("user", "Scissors wins!");

            expect(app.player1.score).toEqual(1);

            expect(app.userScore.innerHTML).toMatch("1");

            expect(app.userScore.className).toMatch("winner");


        });

        it("should update the computer's score upon a positive result", function() {

            app.displayResults("computer", "Scissors wins!");

            expect(app.player2.score).toEqual(1);

            expect(app.comScore.innerHTML).toMatch("1");

            expect(app.comScore.className).toMatch("winner");

        });

        it("should re-activate the main go button", function() {

            app.displayResults("none", "Tie!");

            expect(app.activateGoBtn).toHaveBeenCalled();

        });

        it("should re-activate the reset button", function() {

            app.displayResults("none", "Tie!");

            expect(app.activateResetBtn).toHaveBeenCalled();

        });

    });

    describe("Reset Game Function", function() {

        beforeEach(function() {

            app.resetGame()

        });



        it("should reset the banner", function() {

            expect(app.alertBanner.className).toMatch("");
            expect(app.alertMsg.innerHTML).toMatch("You have three seconds to make a decision, otherwise the computer will choose for you!");

        });

        it("should reset the icons", function() {

            expect(app.userRock.className).toMatch("");
            expect(app.userPaper.className).toMatch("");
            expect(app.userScissors.className).toMatch("");
            expect(app.comRock.className).toMatch("");
            expect(app.comPaper.className).toMatch("");
            expect(app.comScissors.className ).toMatch("");

        });


        it("should reset the scores", function() {

            expect(app.player1.score).toEqual(0);
            expect(app.player2.score).toEqual(0);
            expect(app.comScore.className).toMatch("");
            expect(app.comScore.innerHTML).toMatch("0");
            expect(app.userScore.className).toMatch("");
            expect(app.userScore.innerHTML).toMatch("0");

        });



    });



});
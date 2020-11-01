(function () {
    var clicked;
    var currentPlayer = "player1";
    var layer = $(".layer");
    var winner = $(".winner");
    var button = $("button");
    $(".column").on("click", function (e) {
        var clicked = true;
        var box = $(".box");
        // console.log("clicked");
        var col = $(e.currentTarget);
        // console.log(col);
        var slotsInCol = col.children();
        // console.log(slotsInCol);

        for (var i = slotsInCol.length - 1; i >= 0; i--) {
            var alreadyHasPlayer1 = slotsInCol.eq(i).hasClass("player1");
            var alreadyHasPlayer2 = slotsInCol.eq(i).hasClass("player2");
            if (!alreadyHasPlayer1 && !alreadyHasPlayer2) {
                slotsInCol.eq(i).addClass(currentPlayer);
                break;
            }
        }
        if (i === -1) {
            return;
        }

        var slotsInRow = $(".row" + i);
        var allSlots = $(".slot");

        var diagWin = [
            [38, 33, 28, 23],
            [37, 32, 27, 22],
            [32, 27, 22, 17],
            [36, 31, 26, 21],
            [31, 26, 21, 16],
            [26, 21, 16, 17],
            [30, 25, 20, 15],
            [25, 20, 15, 10],
            [20, 15, 10, 5],
            [24, 19, 14, 9],
            [19, 14, 9, 4],
            [18, 13, 8, 3],
            [0, 7, 14, 12],
            [7, 14, 21, 28],
            [14, 21, 28, 35],
            [6, 13, 20, 27],
            [13, 20, 27, 34],
            [20, 27, 34, 31],
            [12, 19, 26, 33],
            [19, 26, 33, 40],
            [18, 25, 32, 39],
            [1, 8, 15, 22],
            [8, 15, 22, 29],
            [2, 9, 16, 23]
        ];

        function checkForDiagonalVictories(slots) {
            for (var j = 0; j < diagWin.length; j++) {
                var one = allSlots.eq(diagWin[j][0]);
                var two = allSlots.eq(diagWin[j][1]);
                var three = allSlots.eq(diagWin[j][2]);
                var four = allSlots.eq(diagWin[j][3]);
                if (one.hasClass("player1") && two.hasClass("player1") && three.hasClass("player1") && four.hasClass("player1")) {
                    return true;
                } else if (one.hasClass("player2") && two.hasClass("player2") && three.hasClass("player2") && four.hasClass("player2")) {
                    return true;
                }
            }
        }
        if (checkForVictory(slotsInCol)) {
            allSlots.removeClass("payer1");
            allSlots.removeClass("player2");
            layer.removeClass("hidden").addClass("visible");
            winner.html(currentPlayer + "<br>" + " Wins!");

        } else if (checkForVictory(slotsInRow)) {
            allSlots.removeClass("payer1");
            allSlots.removeClass("player2");
            layer.removeClass("hidden").addClass("visible");
            winner.html(currentPlayer + "<br>" + " Wins!");
        } else if (checkForDiagonalVictories(allSlots)) {
            allSlots.removeClass("payer1");
            allSlots.removeClass("player2");
            layer.removeClass("hidden").addClass("visible");
            winner.html(currentPlayer + "<br>" + " Wins!");
        } else {
            //continue the game
            switchPlayer();
        }
    });



    function checkForVictory(slots) {
        //need to look for four slots of the same color in one row or col //counter
        var count = 0;
        for (var i = 0; i < slots.length; i++) {
            // console.log(slots.eq(i).hasClass(currentPlayer));
            var slot = $(slots[i]); // doesn't care if 
            if (slot.hasClass(currentPlayer)) {
                count++;
                // console.log(count);
                if (count === 4) {
                    return true;
                }
            } else {
                //if other player, reset the count
                count = 0;
            }
        }


    }

    // switch player:
    function switchPlayer() {
        // console.log(currentPlayer);
        if (currentPlayer === "player1") {
            currentPlayer = "player2";
        } else {
            currentPlayer = "player1";
        }
        // could use ternary operator:
        // currentPlayer === "player1" ? currentPlayer = "player2" : currentPlayer === "player1"
    }

    button.on("click", function () {
        var allSlots = $(".slot");
        layer.removeClass("visible").addClass("hidden");
        allSlots.removeClass("player1");
        allSlots.removeClass("player2");
    });


    $(".box").animate({
        opacity: 0.99,
        width: "460",
        height: "310",
        lineHeight: "95px",
        fontSize: "18px"
    }, 3000);

})();
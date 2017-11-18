$( document ).ready(function() {
        //on first or reload reset counter and declare the game has not ended
        var counter = 0;
        var gameHasEnded = false;
        //get wins and losses from localstorage to repopulate div
        var wins = localStorage.getItem("wins");
        var losses = localStorage.getItem("losses");
        //set to 0 if not null
        if (wins != null) {
          wins = localStorage.getItem("wins");
        } else {
        wins = 0;
      }
      //set to 0 if not null
        if (losses != null) {
        losses = localStorage.getItem("losses");
        } else {
        losses = 0;
      }
        //set wins or losses if no reset
        $('#wins').html(wins);
        $('#losses').html(losses);
        //invoke critical functions
        getRandomNumber();
        buildCrystal();
        //create number to guess
        function getRandomNumber() {
        var numberToGuess = Math.floor(Math.random() * 120) + 19;
        console.log(numberToGuess)
        $('#numberToGuess').html(numberToGuess);
      }

        function buildCrystal() {
      //create dynamic div, img holder as array//
      var arr = [0,1,2,3];
        $.each( arr, function( i = 1, value ) {
        var imageCrystal = $('<img>');
        imageCrystal.attr('id', 'crystal' + i++) 
        imageCrystal.attr('data-num', Math.floor(Math.random() * 12) + 1);
        imageCrystal.attr('src', 'assets/images/1x/Asset-'+i+'.png');
        imageCrystal.addClass('crystalImage col-3');
        $('#crystals').append(imageCrystal);
      });
    }
        //click reset button clear localstorage and reload
        $('#reset').on('click', function() {
          localStorage.clear();
        reset();
        });
        //reset everything
       function reset() {
            location.reload(true);
        };
        //calculate win or lose
        if (!gameHasEnded) {
        $('.crystalImage').on('click', function() {
          counter = counter + parseInt($(this).data('num'));
          $('#yourNumber').text(counter);
          console.log($('#numberToGuess').html());
          if (counter < $('#numberToGuess').text()) {
            //if less than number to guess do nothing else
        } else if (counter == $('#numberToGuess').text()) {
          //counter equal to number win, alert user,
          //lifetime win + 1, set local storage and reload
          // else
          alert('You won!');
          wins++;
          $('#wins').html(wins)
          localStorage.setItem("wins", wins);
        reset();
        } else if (counter > $('numberToGuess').text()) {
          //counter equal to number losses, alert user,
          //lifetime losses + 1, set local storage and 
          //reload 
          alert('You lose!');
          gameHasEnded = true;
          losses++;
          $('#losses').html(losses);
          localStorage.setItem("losses", losses);
          $('#crystals').empty();
        reset();
        }
        });
      }
});
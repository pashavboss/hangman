$(document).ready(function () {

  var alphabet = [...Array(26).keys()].map(i => String.fromCharCode(i + 97));

  var categories = ["animals", "countries", "states", "food", "sports"];
  var selectedCategory;
  var word;
  var guess;
  var geusses = [];
  var livesCount = 7;
  var lives;
  var counter;

  // Content elements
  var categoryContainer = $("#category-container");
  var gameContainer = $("#game-container");
  var alphabetButtons = $("#alphabet-buttons");
  var gameStatus = $("#game-status");
  var canvas = $("#canvas");
  var wordHolder = $("#word-line");
  var wordModalValue = $("#word");
  var categoryInfo = $(".category");
  var categoryValue = $("#category-name");
  var backToMenu = $(".back-to-menu");

  function updateGameStatus() {
    gameStatus.html(`Mistakes: ${livesCount - lives}/${livesCount - 1}`);
    if (lives < 1) {
      gameStatus.html("Game Over");
      showModal("lose");
    }
    for (var i = 0; i < geusses.length; i++) {
      if (counter === geusses.length) {
        showModal("won");
        gameStatus.html("You Won!");
      }
    }
  }

  function updateCanvas() {
    var classes = ["start", "mistake-1", "mistake-2", "mistake-3", "mistake-4", "mistake-5", "mistake-6", "lose"];
    if (lives >= 0) {
      canvas.removeClass().addClass(classes[livesCount - lives]);
    }
  }

  function updateListEvent() {
    list.onclick = function (e) {
      $(e.target).addClass("active");
      var geuss = (this.innerHTML);
      this.onclick = null;
      for (var i = 0; i < word.length; i++) {
        if (word[i] === geuss) {
          geusses[i].innerHTML = geuss;
          counter += 1;
        }
      }
      var j = (word.indexOf(geuss));
      if (j === -1) {
        lives -= 1;
        updateGameStatus();
        updateCanvas();
      } else {
        updateGameStatus();
      }
    }
  }

  $('.play-again').on('click', function () {
    hideModal();
    playAgain();
  });

  function playAgain() {
    gameContainer.addClass("d-none");
    categoryInfo.addClass("d-none");
    backToMenu.addClass("d-none");
    categoryContainer.removeClass("d-none");
    wordHolder.empty();
    alphabetButtons.empty();
  }

  function startGame() {
    var categoryItemList;

    categoryContainer.addClass("d-none");
    backToMenu.removeClass("d-none");
    gameContainer.removeClass("d-none");
    categoryInfo.removeClass("d-none");

    if (selectedCategory === "random") {
      selectedCategory = categories[Math.floor(Math.random() * categories.length)];
    }

    categoryItemList = window[selectedCategory];
    categoryValue.html((selectedCategory !== "states") ? selectedCategory : "states of the usa");

    word = categoryItemList[Math.floor(Math.random() * categoryItemList.length)];
    wordModalValue.html(word)

    geusses = [];
    lives = livesCount;
    counter = 0;

    createAlphabetButtons();
    drawWord();
    updateGameStatus();
    updateCanvas();
  }

  function drawWord() {
    correct = document.createElement("ul");

    for (var i = 0; i < word.length; i++) {
      guess = document.createElement("li");
      guess.innerHTML = "_";

      geusses.push(guess);
      wordHolder.append(correct);
      correct.appendChild(guess);
    }
  }

  function createAlphabetButtons() {
    letters = document.createElement("ul");

    for (var i = 0; i < alphabet.length; i++) {
      letters.id = "alphabet";
      list = document.createElement("li");
      list.innerHTML = alphabet[i];
      updateListEvent();
      alphabetButtons.append(letters);
      letters.appendChild(list);
    }
  }

  function showModal(modalType) {
    $(`#${modalType}-modal`).fadeIn("slow");
    (function fun() {
      $(".modal-content").css({ "transform": "translateY(-50px)" });
    })();
  }

  function hideModal() {
    $(".modal").fadeOut('fast');
    (function fun2() {
      $('.modal-content').css({ "transform": "translateY(0px)" });
    })();
  }

  $(".categories-btns button").on("click", function (e) {
    selectedCategory = e.target.dataset.category;
    startGame();
  })

  $(".close").on("click", function () {
    hideModal();
  })

  $(".back-to-menu").on("click", function () {
    playAgain();
  })
});

window.addEventListener('DOMContentLoaded', function () {
	"use strict";

	var leftNumber, rightNumber, sign, abswer;
	var gameLevel = "sum1";
	var equationRef = document.getElementById("equation");
	var smilieThink = document.getElementById("smilie-thinking");
	var smilieWromg = document.getElementById("smilie-wrong");
	var smilieGood = document.getElementById("smilie-well-done");

	var questionPlaceholder = '<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-question-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg">\n' +
		'  <path fill-rule="evenodd" d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>\n' +
		'  <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z"/>\n' +
		'</svg>';

	var starFull = '<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-star-fill" fill="currentColor"\n' +
		'xmlns="http://www.w3.org/2000/svg">\n' +
		'<path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.283.95l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>\n' +
		'</svg>';

	var starEmpty = '<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-star" fill="currentColor"\n' +
		'xmlns="http://www.w3.org/2000/svg">\n' +
		'<path fill-rule="evenodd"\n' +
		'd="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.523-3.356c.329-.314.158-.888-.283-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767l-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288l1.847-3.658 1.846 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.564.564 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"/>\n' +
		'</svg>';

	(function main() {
		initAnswerListeners();
		initMenu();
		fillInHeader(document.getElementById(gameLevel));

		makeSmilies();
		makeEquation();
	})();

	function makeEquation() {
		while (true) {
			leftNumber = randBetween(0, 10);
			rightNumber = randBetween(0, 10);
			sign = getSign(gameLevel);
			abswer = evaluateCalculation(leftNumber, rightNumber, sign);
			if (abswer >= 0 && abswer <= 10) {
				break;
			}
		}

		fillInEquation(leftNumber, rightNumber, sign, questionPlaceholder);
	}

	function isEquationFulfilled(leftNumber, rightNumber, sign, equals) {

	}

	function fillInEquation(num1, num2, sign, answer) {
		equationRef.innerHTML = [
			num1,
			sign,
			num2,
			"=",
			answer
		].join(" ");
	}

	function getSign(level) {
		var plusSign = "+";
		var minusSign = "-";

		if (level && level.indexOf("sum") > -1) {
			return plusSign;
		} else if (level && level.indexOf("sub") > -1) {
			return minusSign;
		} else {
			return (randBetween(0, 10) % 2 === 0) ? minusSign : plusSign;
		}
	}

	function randBetween(lower, greater) {
		return Math.floor(Math.random() * greater) + lower;
	}

	function evaluateCalculation(num1, num2, sign) {
		var result;
		if (sign === "-") {
			result = num1 - num2;
		} else {
			result = num1 + num2;
		}

		return result;
	}

	function makeSmilies(which) {
		smilieThink.style.display = "none";
		smilieWromg.style.display = "none";
		smilieGood.style.display = "none";

		switch (which) {
			case "good":
				smilieGood.style.display = "inline";
				break;
			case "wrong":
				smilieWromg.style.display = "inline";
				break;
			default:
				smilieThink.style.display = "inline";
				break;
		}
	}

	function initMenu() {
		var menu = document.getElementById("navbarCollapse");
		var items = menu.getElementsByClassName("nav-link");
		var toggleMenuButton = document.getElementsByClassName("navbar-toggler")[0];

		Array.prototype.slice.call(items).forEach(function (link) {
			link.addEventListener("click", menuClickListener);
			fillInStars(link);
		});

		toggleMenuButton.addEventListener("click", toggleNavBar);
	}

	function fillInStars(link) {
		var i;
		var starsPlaceHolder = link.getElementsByTagName("span")[0];
		var lvlPattern = starsPlaceHolder.className.match(/lvl([1-9]{1})/);
		var numStars = parseInt(lvlPattern[1]);
		var stars = "";

		for (i = 0; i < 3; i++) {
			if (numStars > i) {
				stars += starFull;
			} else {
				stars += starEmpty;
			}
		}

		starsPlaceHolder.innerHTML = stars;
	}

	function menuClickListener() {
		gameLevel = this.id;

		fillInHeader(this);
		toggleNavBar();
		makeSmilies();
		makeEquation();
	}

	function fillInHeader(link) {
		var header = document.getElementById("header");

		header.innerHTML = link.innerHTML;
	}

	function toggleNavBar() {
		var menu = document.getElementById("navbarCollapse");

		if (menu.className.indexOf("collapse") > -1) {
			menu.className = menu.className.replace("collapse", "");
		} else {
			menu.className = menu.className + " collapse";
		}
	}

	function initAnswerListeners() {
		var i, btn;
		for (i = 0; i <= 10; i++) {
			btn = document.getElementById("btn" + i);
			btn.addEventListener("click", answerButtonListener);
		}
	}

	function answerButtonListener() {
		var answer = parseInt(this.innerText);

		if (answer === abswer) {
			makeSmilies("good");
			fillInEquation(leftNumber, rightNumber, sign, abswer);

			setTimeout(makeEquation, 2000);
		} else {
			makeSmilies("wrong");
		}

		setTimeout(makeSmilies, 1500);
	}
});
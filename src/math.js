window.addEventListener('DOMContentLoaded', function () {
	"use strict";
	var i;
	var buttonsRef = [];
	var equationRef = document.getElementById("equation");
	var evaluation;
	var smilieThink = document.getElementById("smilie-thinking");
	var smilieWromg = document.getElementById("smilie-wrong");
	var smilieGood = document.getElementById("smilie-well-done");

	for (i = 0; i <= 10; i++) {
		buttonsRef.push(document.getElementById("btn" + i));
	}

	for (i = 0; i <= 10; i++) {
		buttonsRef[i].addEventListener("click", function (e) {
			var answer = parseInt(this.innerText);

			if (answer === evaluation) {
				smilieThink.style.display = "none";
				smilieWromg.style.display = "none";
				smilieGood.style.display = "";
				equationRef.innerText = equationRef.innerText.replace("?", answer);

				setTimeout(makeEquation, 2000);
			} else {
				smilieThink.style.display = "none";
				smilieWromg.style.display = "";
				smilieGood.style.display = "none";
			}

			setTimeout(function () {
				smilieThink.style.display = "";
				smilieWromg.style.display = "none";
				smilieGood.style.display = "none";
			}, 1500);
		});
	}

	makeEquation();

	function makeEquation() {
		var num1, num2, sign;

		while (true) {

			num1 = randBetween(0, 10);
			num2 = randBetween(0, 10);
			sign = getSign();
			evaluation = evaluateCalculation(num1, num2, sign);
			if (evaluation >= 0 && evaluation <= 10) {
				break;
			}
		}

		fillInEquation(num1, num2, sign);
	}

	function fillInEquation(num1, num2, sign) {
		equationRef.innerHTML = [
			num1,
			sign,
			num2,
			"=",
			"?"
		].join(" ");
	}

	function getSign() {
		return (randBetween(0, 10) % 2 === 0) ? "-" : "+";
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
});
window.addEventListener('DOMContentLoaded', function () {
	"use strict";
	var i;
	var buttonsRef = [];
	var equationRef = document.getElementById("equation");
	var messageAnswer = document.getElementById("message-answer");
	var evaluation;

	for (i = 0; i <= 10; i++) {
		buttonsRef.push(document.getElementById("btn" + i));
	}

	for (i = 0; i <= 10; i++) {
		buttonsRef[i].addEventListener("click", function (e) {
			var answer = parseInt(this.innerText);

			if (answer === evaluation) {
				messageAnswer.innerHTML = "Браво!";
				messageAnswer.style.color = "green";
			} else {
				messageAnswer.innerHTML = "Грешка!";
				messageAnswer.style.color = "red";
			}

			makeEquation();
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
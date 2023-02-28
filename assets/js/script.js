document.addEventListener("DOMContentLoaded", function() {
    let buttons = document.getElementsByTagName("button");

    for (let button of buttons) {
        button.addEventListener("click", function() {
            if(this.getAttribute("data-type") === "submit") {
                checkAnswers();
            } else {
                let gameType = this.getAttribute("data-type");
                runGame(gameType);
            }
        });
    }

    runGame("addition");

});

/**
 * The main game loop, called when the script is first loaded
 * and after the suer enters an answer
 */

function runGame(gameType) {

    // creates two random numbers between 1 and 25
    let num1 = Math.floor(Math.random() * 25) + 1;
    let num2 = Math.floor(Math.random() * 25) + 1;

    if (gameType === "addition") {
        displayAdditionQuestion(num1, num2)
    } else if (gameType === "multiply") {
        displayMultiplyQuestion(num1, num2)
    } else {
        alert(`Unknown game type: ${gameType}`)
        throw `Unknown game type: ${gameType}. Aborting!`
    }
}
    

/**
 * Checks the answer against the first element in 
 * calculateCorrectAnswer array.
 */
function checkAnswers() {
    let userAnswer = parseInt(document.getElementById("answer-box").value);
    let calulatedAnswer = calculateCorrectAnswer();
    let isCorrect = userAnswer === calulatedAnswer[0];

    if(isCorrect) {
        alert('Correct :)');
        incrementScore();
    } else {
        alert(`It's not ${userAnswer} idiot, it's ${calulatedAnswer[0]}!`);
        incrementWrongAnswer();
    }

    runGame(calulatedAnswer[1]);
}

/**
 * Gets the operands and opperator from the DOM,
 * returns correct answer.
 */
function calculateCorrectAnswer() {
    let operand1 = parseInt(document.getElementById("operand1").innerText);
    let operand2 = parseInt(document.getElementById("operand2").innerText);
    let operator = document.getElementById("operator").innerText;

    if (operator === "+") {
        return [operand1 + operand2, "addition"];
    } else if (operator === "x") {
        return [operand1 * operand2, "multiply"];
    } else {
        alert(`Unimplimented operator ${operator}`);
        throw `Unimplimented operator ${operator}. Aborting!`;
    }

}


/**
 * Gets the current score from the DOM and increments by 1.
 */
function incrementScore() {
    let oldScore = parseInt(document.getElementById("score").innerText);
    document.getElementById('score').innerText = ++oldScore;
};

/**
 * Gets the tally of wrong answers from the DOM and increments by 1.
 */
function incrementWrongAnswer() {
    let oldScore = parseInt(document.getElementById("incorrect").innerText);
    document.getElementById('incorrect').innerText = ++oldScore;
}

function displayAdditionQuestion(operand1, operand2) {
    document.getElementById('operand1').textContent = operand1;
    document.getElementById('operand2').textContent = operand2;
    document.getElementById('operator').textContent = "+";
}

function displaySubtractQuestion() {

}

function displayMultiplyQuestion(operand1, operand2) {
    document.getElementById('operand1').textContent = operand1;
    document.getElementById('operand2').textContent = operand2;
    document.getElementById('operator').textContent = "x";
}
//// DOM selects
const expressionDisplay = document.getElementById("expression");
const currentDisplay = document.getElementById("display");
const buttons = Array.from(document.querySelectorAll("button"));

//// declare variables
let expression = "";
let currentOperand = "";
let buttonClicked = "0";
let overwrite = false;
let operandAfterEval = "";

//// initial display state
display("", "0");

//// calculator logic
function calculate(e) {
  buttonClicked = e.target.innerText;

  // clear all
  if (buttonClicked === "CA") {
    clearAll();
    return;
  }

  // only one decimal allowed in an operand
  if (buttonClicked === ".") {
    if (currentOperand.indexOf(".") === -1) {
      oneDecimal();
      return;
    } else {
      return;
    }
  }

  // multiple 0 at the beginning of an operand not allowed
  if (buttonClicked === "0" && currentOperand === "0") {
    return;
  }

  //// multiple consecutive operators entered
  // 3rd operator entered
  if (
    expression.charAt(expression.length - 2).match(/[\-\+\*\/]/) &&
    expression.charAt(expression.length - 1).match(/[\-\+\*\/]/) &&
    buttonClicked.match(/[\+\*\/]/)
  ) {
    expression = `${expression.slice(0, -2)}${buttonClicked}`;
    currentOperand = `${buttonClicked}`;
    display(expression, currentOperand);
    return;
  }
  // previous operator is -, clicked + or * or /
  if (
    expression.charAt(expression.length - 1).match(/[\-]/) &&
    buttonClicked.match(/[\+\*\/]/)
  ) {
    expression = `${expression.slice(0, -1)}${buttonClicked}`;
    currentOperand = `${buttonClicked}`;
    display(expression, currentOperand);
    return;
  }
  // entering negative number after an operator
  if (
    expression.charAt(expression.length - 1).match(/[\-\+\*\/]/) &&
    buttonClicked.match(/[\-]/)
  ) {
    expression = `${expression}${buttonClicked}`;
    currentOperand = `${buttonClicked}`;
    display(expression, currentOperand);
    return;
  }
  // consecutive operators other than -
  if (
    expression.charAt(expression.length - 1).match(/[\+\*\/]/) &&
    buttonClicked.match(/[\+\*\/]/)
  ) {
    expression = `${expression.slice(0, -1)}${buttonClicked}`;
    currentOperand = `${buttonClicked}`;
    display(expression, currentOperand);
    return;
  }

  // result is the first operand of a new operation
  if (
    buttonClicked.match(/[\-\+\*\/]/) &&
    operandAfterEval !== "" &&
    expression === ""
  ) {
    resultIsFirstOperand();
    return;
  }

  // to complete an operand
  if (buttonClicked.match(/[\-\+\*\/]/)) {
    completeOperand();
    return;
  }

  // if "=" is clicked after an operator
  if (
    expression.charAt(expression.length - 1).match(/[\-\+\*\/]/) &&
    buttonClicked === "="
  ) {
    return;
  }

  // evaluation after "="
  if (buttonClicked === "=") {
    evaluate(expression);
    return;
  }

  // adds another digit to an operand, overwrite flag is off
  if (buttonClicked.match(/[\d]/) && !overwrite) {
    addAnotherDigit();
    return;
  }

  // starts a new operand, overwrite flag is on
  if (buttonClicked.match(/[\d]/) && overwrite) {
    startNewOperand();
    return;
  }

  expression = `${expression || ""}${currentOperand}`;
  overwrite = false;
  display(expression, currentOperand);
  return;
}

//// helper functions
// to display expression and current operand/operator
function display(displayExpression, displayCurrent) {
  expressionDisplay.innerText = displayExpression;
  currentDisplay.innerText = displayCurrent;
}

function clearAll() {
  expression = "";
  buttonClicked = "0";
  currentOperand = "";
  operandAfterEval = "";
  display("", "0");
}

function oneDecimal() {
  expression = `${expression}${buttonClicked}`;
  currentOperand = `${currentOperand || ""}${buttonClicked}`;
  display(expression, currentOperand);
}

function resultIsFirstOperand() {
  expression = `${operandAfterEval}${buttonClicked}`;
  currentOperand = `${operandAfterEval}${buttonClicked}`;
  operandAfterEval = "";
  display(expression, currentOperand);
}

function completeOperand() {
  expression = `${expression}${buttonClicked}`;
  display(expression, buttonClicked);
  overwrite = true;
}

function evaluate(string) {
  // to fix the issue of two consecutive minuses
  if (/(--)/.test(string)) {
    let editedString = string.replace(/--/, "+");
    string = editedString;
  }
  let result = parseFloat(eval(string));
  // to compensate for JavaScript floats' computation issue
  let resultRounded = (
    Math.round(1000000000000 * result) / 1000000000000
  ).toString();
  currentDisplay.innerText = resultRounded;
  expressionDisplay.innerText = `${string}${buttonClicked}${resultRounded}`;
  overwrite = true;
  expression = "";
  operandAfterEval = resultRounded;
}

function addAnotherDigit() {
  expression = `${expression}${buttonClicked}`;
  currentOperand = `${currentOperand || ""}${buttonClicked}`;
  display(expression, currentOperand);
}

function startNewOperand() {
  expression = `${expression || ""}${buttonClicked}`;
  currentOperand = `${buttonClicked}`;
  overwrite = false;
  display(expression, currentOperand);
}

//// event listeners
buttons.map((button) => button.addEventListener("click", calculate));

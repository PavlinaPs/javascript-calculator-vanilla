// DOM selects
const expressionDisplay = document.getElementById("expression");
const currentDisplay = document.getElementById("display");
const buttons = Array.from(document.querySelectorAll("button"));

// declare variables
let expression = "";
let currentOperand = "";
let buttonClicked = "0";
let overwrite = false;
let operandAfterEval = "";

// initial state
currentDisplay.innerText = "0";

// event listeners
buttons.map((button) =>
  button.addEventListener("click", () => {
    buttonClicked = button.innerText;
    if (buttonClicked === "CA") {
      clearAll();
      return;
    }
    if (buttonClicked === ".") {
      //let regex = /(?<=\d+\.\d*)\./g;
      if (currentOperand.indexOf(".") === -1) {
        console.log("test1");
        expression = `${expression}${buttonClicked}`;
        currentOperand = `${currentOperand || ""}${buttonClicked}`;
        expressionDisplay.innerText = expression;
        currentDisplay.innerText = currentOperand;
        return;
      } else {
        console.log("test2");
        return;
      }
    }
    if (buttonClicked === "0" && currentOperand === "") {
      return;
    }
    if (buttonClicked.match(/[\-\+\*\/]/) && operandAfterEval !== "") {
      console.log(operandAfterEval);
      expression = `${operandAfterEval}${buttonClicked}`;
      currentOperand = `${operandAfterEval}${buttonClicked}`;
      expressionDisplay.innerText = expression;
      currentDisplay.innerText = currentOperand;
      operandAfterEval = "";
      return;
    }
    if (buttonClicked.match(/[\-\+\*\/]/)) {
      completeOperand();
      return;
    }
    if (buttonClicked === "=") {
      evaluate(expression);
      return;
    }
    if (buttonClicked.match(/[\d]/) && !overwrite) {
      expression = `${expression}${buttonClicked}`;
      currentOperand = `${currentOperand || ""}${buttonClicked}`;
      expressionDisplay.innerText = expression;
      currentDisplay.innerText = currentOperand;
      return;
    }
    if (buttonClicked.match(/[\d]/) && overwrite) {
      expression = `${expression}${buttonClicked}`;
      currentOperand = `${buttonClicked}`;
      expressionDisplay.innerText = expression;
      currentDisplay.innerText = currentOperand;
      overwrite = false;
      return;
    }
    expression = `${expression || ""}${currentOperand}`;
    expressionDisplay.innerText = expression;
    currentDisplay.innerText = currentOperand;
    overwrite = false;
    return;
  })
);

function clearAll() {
  expression = "";
  buttonClicked = "0";
  currentOperand = "";
  operandAfterEval = "";
  expressionDisplay.innerText = "";
  currentDisplay.innerText = "0";
}

function completeOperand() {
  expression = `${expression}${buttonClicked}`;
  currentDisplay.innerText = buttonClicked;
  expressionDisplay.innerText = expression;
  overwrite = true;
}

function evaluate(string) {
  let result = parseFloat(eval(string));
  let resultRounded = (
    Math.round(1000000000000 * result) / 1000000000000
  ).toString();
  currentDisplay.innerText = resultRounded;
  expressionDisplay.innerText = `${string}${buttonClicked}${resultRounded}`;
  overwrite = true;
  expression = "";
  operandAfterEval = resultRounded;
}

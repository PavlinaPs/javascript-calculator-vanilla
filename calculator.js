// DOM selects
const expressionDisplay = document.getElementById("expression");
const currentDisplay = document.getElementById("display");
const buttons = Array.from(document.querySelectorAll("button"));

// declare variables
let expression = "";
let currentOperand = "";
let buttonClicked = "0";
let overwrite = false;

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
      checkDecimal(buttonClicked);
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
    //expression = `${expression}${buttonClicked}`;
    //currentOperand = `${currentOperand || ""}${buttonClicked}`;
    //currentDisplay.innerText = buttonClicked;
    //expressionDisplay.innerText = expression;
  })
);

function clearAll() {
  expression = "";
  buttonClicked = "0";
  expressionDisplay.innerText = "";
  currentDisplay.innerText = "0";
}

function checkDecimal(string) {
  console.log(string);
  //let regex = /(?<=\d+\.\d*)\./g;
  let regex = /(\d+\.\d*)\./g;
  if (regex.test(string)) {
    currentDisplay.innerText = buttonClicked;
    expressionDisplay.innerText = expression;
  }
}

function completeOperand() {
  expression = `${expression}${buttonClicked}`;
  currentDisplay.innerText = buttonClicked;
  expressionDisplay.innerText = expression;
  overwrite = true;
}

function evaluate(string) {
  let result = Math.round(1000000000000 * eval(string)) / 1000000000000;
  currentDisplay.innerText = result;
  expressionDisplay.innerText = `${string}${buttonClicked}${result}`;
  overwrite = true;
  expression = "";
}

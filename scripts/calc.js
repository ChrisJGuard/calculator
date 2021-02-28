function add(a, b) {
  return +a + +b;
}

function subtract(a, b) {
  return +a - +b;
}

function multiply(a, b) {
  return +a * +b;
}

function divide(a, b) {
  return +a / +b;
}

function operate(operation, a, b) {
  switch (operation) {
    case "+":
      return add(a, b);
    case "-":
      return subtract(a, b);
    case "x":
      return multiply(a, b);
    case "/":
      return divide(a, b);
  }
}

function enterDigit(digit) {
  // Prevent display overflow
  if (display.textContent.length > 9) return;

  // Prevent multiple decimal points
  if (display.textContent.includes(".") && digit === ".") return;

  // Check if a new number, and create fraction or integer
  if (newNumber) {
    if (digit === ".") {
      display.textContent = "0.";
      newNumber = false;
      return;
    } else {
      display.textContent = digit;
      newNumber = false;
      return;
    }
  }

  // Else, append to the display
  display.textContent += digit;
}

function addNumberListeners() {
  const numbers = document.querySelectorAll(".number");

  numbers.forEach((number) =>
    number.addEventListener("click", () => {
      enterDigit(number.innerText);
    })
  );
}

function calculateResult() {
  // Calculate result using temp and currently displayed values
  let result = operate(tempOperation, tempValue, display.textContent);

  // Output newly calculated result to display
  display.textContent = result;

  // Place calculated result into temp
  tempValue = result;

  // Update newNumber to prepare for further input
  newNumber = true;
}

function addOperationListeners() {
  const operations = document.querySelectorAll(".operation");

  operations.forEach((operation) => {
    operation.addEventListener("click", function () {
      // Call usual result calculation function
      calculateResult();

      // Place selected operation into temp
      tempOperation = this.innerText;
    });
  });
}

function addEqualsListener() {
  document.querySelector(".equals").addEventListener("click", calculateResult);
}

function allClear() {
  display.textContent = 0;
  tempValue = 0;
  tempOperation = "";
}

const display = document.querySelector("span");

let tempValue = 0;
let tempOperation = "+";
let newNumber = true;

addNumberListeners();
addOperationListeners();
addEqualsListener();

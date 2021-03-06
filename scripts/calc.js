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
      // Check for division by zero
      if (b === "0") {
        alert("Are you trying to crash me? No dividing by zero!");
        alert("Let me reset things for you...");
        allClear();
        return "0";
      } else return divide(a, b);
  }
}

function overflowHandler(num) {
  // Convert to string for checking
  let numString = num.toString();

  // Return original if number is short enough
  if (numString.length < 10) return num;

  // Otherwise, slice and return number
  return +numString.slice(0, 10);
}

function enterDigit(digit) {
  // If previous calculation complete, reset everything before proceeding
  if (calcComplete) {
    tempValue = 0;
    tempOperation = "+";
    newNumber = true;
  }
  // Prevent display overflow
  if (display.textContent.length > 9 && !newNumber) return;

  // Prevent multiple decimal points
  if (display.textContent.includes(".") && digit === "." && !newNumber) return;

  // Check if a new number, and create fraction, zero, or new integer
  if (newNumber) {
    switch (digit) {
      case ".":
        display.textContent = "0.";
        newNumber = false;
        calcComplete = false;
        return;
      case "0":
        display.textContent = "0";
        return;
      default:
        display.textContent = digit;
        newNumber = false;
        calcComplete = false;
        return;
    }
  }
  // If not a new number, append to display
  display.textContent += digit;
}

function enterOperation(operation) {
  // If waiting for new number, allow multiple operator clicks
  if (newNumber) {
    tempOperation = operation;
    calcComplete = false;
    return;
  }

  // If calculation is already completed...
  if (calcComplete) {
    // Calculation is no longer complete!
    calcComplete = false;

    // Move calculated result and selected operation to memory
    tempValue = display.textContent;
    tempOperation = operation;

    // Prepare display for a new number input
    newNumber = true;

    return;
  }

  // If calculation is incomplete...
  if (!calcComplete) {
    // Calculate running result
    const result = overflowHandler(
      operate(tempOperation, tempValue, display.textContent)
    );

    // Update display with running result
    display.textContent = result;

    // Move running result and selected operation to memory
    tempValue = result;
    tempOperation = operation;

    // Prepare display for a new number input
    newNumber = true;
  }
}

function completeCalculation() {
  // If calculation is incomplete...
  if (!calcComplete) {
    // Calculate final result
    const result = overflowHandler(
      operate(tempOperation, tempValue, display.textContent)
    );

    // Store last entered value in memory
    tempValue = display.textContent;

    // Update display with calculated result
    display.textContent = result;

    // Declare calculation complete
    calcComplete = true;

    return;
  }

  // If calculation is already completed...
  if (calcComplete) {
    // Update display using last stored value and operation
    display.textContent = overflowHandler(
      operate(tempOperation, display.textContent, tempValue)
    );
  }
}

function allClear() {
  // Update display to zero
  display.textContent = 0;

  // Reset temporary variables to initial values
  tempValue = 0;
  tempOperation = "+";
  newNumber = true;
  calcComplete = true;
}

function plusMinus() {
  display.textContent = overflowHandler(multiply(display.textContent, -1));
}

function percentage() {
  display.textContent = overflowHandler(divide(display.textContent, 100));
}

function addNumberListeners() {
  const numbers = document.querySelectorAll(".number");

  numbers.forEach((number) =>
    number.addEventListener("click", () => {
      enterDigit(number.innerText);
    })
  );
}

function addOperationListeners() {
  const operations = document.querySelectorAll(".operation");

  operations.forEach((operation) =>
    operation.addEventListener("click", () => {
      enterOperation(operation.innerText);
    })
  );
}

function addOtherListeners() {
  // Add equals listener
  document
    .querySelector(".equals")
    .addEventListener("click", completeCalculation);

  // Add all clear listener
  document.querySelector(".all-clear").addEventListener("click", allClear);

  // Add plus/minus listener
  document.querySelector(".plus-minus").addEventListener("click", plusMinus);

  // Add percentage listener
  document.querySelector(".percentage").addEventListener("click", percentage);
}

const display = document.querySelector("span");

let tempValue = 0;
let tempOperation = "+";
let newNumber = true;
let calcComplete = true;

addNumberListeners();
addOperationListeners();
addOtherListeners();

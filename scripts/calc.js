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
      calcComplete = false;
      return;
    } else {
      display.textContent = digit;
      newNumber = false;
      calcComplete = false;
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

function addOperationListeners() {
  const operations = document.querySelectorAll(".operation");

  operations.forEach((operation) => {
    operation.addEventListener("click", function () {
      // If waiting for new number, allow multiple operator clicks
      if (newNumber) {
        tempOperation = this.innerText;
        return;
      }

      // If calculation is already completed...
      if (calcComplete) {
        // Calculation is no longer complete!
        calcComplete = false;

        // Move calculated result and selected operation to memory
        tempValue = display.textContent;
        tempOperation = this.innerText;

        // Prepare display for a new number input
        newNumber = true;

        return;
      }

      // If calculation is incomplete...
      if (!calcComplete) {
        // Calculate running result
        const result = operate(tempOperation, tempValue, display.textContent);

        // Update display with running result
        display.textContent = result;

        // Move running result and selected operation to memory
        tempValue = result;
        tempOperation = this.innerText;

        // Prepare display for a new number input
        newNumber = true;
      }
    });
  });
}

function addOtherListeners() {
  // Add equals listener
  document.querySelector(".equals").addEventListener("click", function () {
    // If calculation is incomplete...
    if (!calcComplete) {
      // Calculate final result
      const result = operate(tempOperation, tempValue, display.textContent);

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
      display.textContent = operate(
        tempOperation,
        display.textContent,
        tempValue
      );
    }
  });

  // Add all clear listener
  document.querySelector(".all-clear").addEventListener("click", allClear);

  // Add plus/minus listener
  document.querySelector(".plus-minus").addEventListener("click", plusMinus);

  // Add percentage listener
  document.querySelector(".percentage").addEventListener("click", percentage);
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
  display.textContent = multiply(display.textContent, -1);
}

function percentage() {
  display.textContent = divide(display.textContent, 100);
}

const display = document.querySelector("span");

let tempValue = 0;
let tempOperation = "+";
let newNumber = true;
let calcComplete = true;

addNumberListeners();
addOperationListeners();
addOtherListeners();

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
  switch (true) {
    case operation === "+":
      return add(a, b);
    case operation === "-":
      return subtract(a, b);
    case operation === "x":
      return multiply(a, b);
    case operation === "/":
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

function storeTempValue() {
  tempValue = display.textContent;
}

function storeTempOperation(operation) {
  tempOperation = operation;
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

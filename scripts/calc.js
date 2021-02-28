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

function appendToDisplay(value) {
  // Prevent display overflow
  if (display.textContent.length > 9) return;

  // Prevent leading zero for non-fractions
  if (display.textContent === "0" && value !== ".") {
    display.textContent = value;
    return;
  }

  // Prevent multiple decimal points
  if (display.textContent.includes(".") && value === ".") return;

  // If all tests pass, update the display
  display.textContent += value;
}

function addNumberListeners() {
  const numbers = document.querySelectorAll(".number");

  numbers.forEach((number) =>
    number.addEventListener("click", () => {
      appendToDisplay(number.innerText);
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
let tempOperation = "";

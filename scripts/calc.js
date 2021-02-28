function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function operate(operand, a, b) {
  return operand(a, b);
}

function appendToDisplay(value) {
  const display = document.querySelector("span");

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

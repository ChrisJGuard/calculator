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

  if (display.textContent.length > 8) return;

  display.textContent += value;
}

// 1. display: get number value from the keypad buttons
const intKeys = document.querySelectorAll('.integer');
const operateKeys = document.querySelectorAll('.operator');
const acKey = document.querySelector('.clear');

Array.from(intKeys).forEach(integer =>
  integer.addEventListener('click', display),
);

Array.from(operateKeys).forEach(operator =>
  operator.addEventListener('click', display),
);

acKey.addEventListener('click', allClear);

function allClear() {
  const displayOutput = document.querySelector('.display');
  displayOutput.textContent = '';
  keypadDisplay = [];
  num1Arr = [];
  num2Arr = [];
  operatorValue = '';
}

// 2. display: function to store number values into an array
let keypadDisplay = [];
let num1Arr = [];
let num2Arr = [];
let operatorValue = '';

function display(param) {
  // keypad button value is pushed to the keypad display array
  let keypadButton = param.target.value;
  keypadDisplay.push(keypadButton);

  // output display numbers in to the display div
  const displayOutput = document.querySelector('.display');
  displayOutput.textContent = keypadDisplay.join('');

  // array of num1 and num2 numbers are joined and type coverted to integer
  let num1Int = Number(num1Arr.join(''));
  let num2Int = Number(num2Arr.join(''));

  if (
    keypadButton === '+' ||
    keypadButton === '-' ||
    keypadButton === '*' ||
    keypadButton === '÷'
  ) {
    // if user click is "+" or "-" (true) then set operator value variable to either "+", "-"
    operatorValue = keypadButton;
  } else if (operatorValue === '+' && keypadButton === '=') {
    const addition = operate(add, num1Int, num2Int);
    displayOutput.textContent = addition;
  } else if (operatorValue === '-' && keypadButton === '=') {
    const subtraction = operate(subtract, num1Int, num2Int);
    displayOutput.textContent = subtraction;
  } else if (operatorValue === '*' && keypadButton === '=') {
    const multiplication = operate(multiply, num1Int, num2Int);
    displayOutput.textContent = multiplication;
  } else if (operatorValue === '÷' && keypadButton === '=') {
    const division = operate(divide, num1Int, num2Int);
    displayOutput.textContent = division;
  } else if (operatorValue === '') {
    num1Arr.push(keypadButton);
  } else if (
    operatorValue === '+' ||
    operatorValue === '-' ||
    operatorValue === '*' ||
    operatorValue === '÷'
  ) {
    num2Arr.push(keypadButton);
  }
}
// math functions
function add(num1, num2) {
  return num1 + num2;
}

function subtract(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
  return num1 / num2;
}

function operate(operator, num1, num2) {
  return operator(num1, num2);
}

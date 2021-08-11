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

  if (keypadButton == '+') {
    // if user click is "+" (true) then set operator value variable to "+"
    operatorValue = keypadButton;
  } else if (keypadButton == '=') {
    // if user click is "=" then call operate function and output result
    const addition = operate(add, num1Int, num2Int);
    displayOutput.textContent = addition;
  } else if (operatorValue != '+') {
    // if operator value is not set to "+" then push user click number to num1
    num1Arr.push(keypadButton);
  } else if (operatorValue == '+') {
    // if operator value is set to "+" then push user click number to num2
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

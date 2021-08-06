// 1. display: get number value from the keypad buttons by using queryselector and eventlistener.
const intKeys = document.querySelectorAll('.integer');
const operateKeys = document.querySelectorAll('.operator');
//const acKey = document.querySelector('.clear')

Array.from(intKeys).forEach((integer) =>
  integer.addEventListener('click', display)
);

Array.from(operateKeys).forEach((operator) =>
  operator.addEventListener('click', display)
);

//acKey.addEventListener('click' allclear)

// 2. display: use function to push and store the number values into an array variables
let displayInt = [];

function display(param) {
  let keypadButton = param.target.value;
  console.log(keypadButton);
  displayInt.push(keypadButton);

  // 2.1 output the nuber of arrays in to the display div
  const displayOutput = document.querySelector('.display');
  displayOutput.textContent = displayInt.join('');
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
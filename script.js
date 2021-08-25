let num1 = '';
let num2 = '';
let operator = '';
let defaultDisplay = '0';

const display = document.querySelector('.display');

document
  .querySelectorAll('button')
  .forEach(element => element.addEventListener('click', handleKeyBtns));

function handleKeyBtns(event) {
  const inputValue = event.target.value;
  if (isNum(inputValue)) {
    assignNum(inputValue);
  } else if (isBasicOperation(inputValue)) {
    assignOperator(inputValue);
  } else if (isDecimal(inputValue)) {
    addDecimals(inputValue);
  } else if (isEqual(inputValue)) {
    calculate(inputValue);
  } else if (isAllClearNumStorage(inputValue)) {
    clearAllMemory();
  } else if (isBackSpaceKey(inputValue)) {
    deleteValue();
  }
}

// check if the inputValue (userclick) is a particular value
function isNum(inputValue) {
  const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  return numbers.includes(inputValue);
}

function isBasicOperation(inputValue) {
  const operations = ['+', '-', '*', '/'];
  return operations.includes(inputValue);
}

function isEqual(inputValue) {
  const equal = '=';
  return equal.includes(inputValue);
}

function isDecimal(inputValue) {
  const decimal = '.';
  return decimal.includes(inputValue);
}

function isAllClearNumStorage(inputValue) {
  const allClearNumStorage = 'ac';
  return allClearNumStorage.includes(inputValue);
}

function isBackSpaceKey(inputValue) {
  const bsKey = 'bs';
  return bsKey.includes(inputValue);
}

// functions for backspace, all clear, decimals, pair calculation, and numbers & operators.

function deleteValue() {
  if (num1 && operator && num2) {
    num2 = num2.slice(0, -1);
    display.textContent = num2;
  } else if (num1) {
    num1 = num1.slice(0, -1);
    display.textContent = num1;
  }
}

function assignNum(inputValue) {
  if (num1 && operator) {
    num2 += inputValue;
    display.textContent = num2;
  } else {
    num1 += inputValue;
    display.textContent = num1;
  }
}

function assignOperator(inputValue) {
  // if num2 and operator are not loaded, assign user inputValue to operator
  if (!num2 && !operator) {
    operator = inputValue;
  }
  // if user clicks operator after a pair of number calculate
  else {
    pairCalculation(inputValue);
  }
}

function pairCalculation(inputValue) {
  // if num1, operator, num2, and operator is loaded calculate result
  // when result is returned clear num2 and set operator to user inputValue
  if (num1 && num2 && operator) {
    num1 = calculate().toString();
    num2 = '';
    operator = inputValue;
  }
  // if num1 and operator is loaded, assign num2 to user inputValue
  else if (num1 && operator) {
    num2 = inputValue;
  }
}

function addDecimals(inputValue) {
  const decimal = inputValue;
  if (!num1.includes(decimal) && !operator) {
    num1 += '.';
    display.textContent = num1;
  } else if (operator && !num2.includes(decimal)) {
    num2 += '.';
    display.textContent = num2;
  }
}

function clearAllMemory() {
  num1 = '';
  num2 = '';
  operator = '';
  display.textContent = defaultDisplay;
}

function calculate() {
  const convertNum1 = Number(num1);
  const convertNum2 = Number(num2);
  const calculate = result(operator, convertNum1, convertNum2);
  console.log(calculate);
  display.textContent = calculate;
  return calculate;
}

function result(operator, num1, num2) {
  if (operator == '+') {
    return operate(add, num1, num2);
  }
  if (operator == '-') {
    return operate(subtract, num1, num2);
  }
  if (operator == '*') {
    return operate(multiply, num1, num2);
  }
  if (operator == '÷') {
    return operate(divide, num1, num2);
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
  if (num2 === 0 || num2 === isNaN) {
    return 'HELLO! PLEASE DIVIDE BY NON-ZERO NUMBER.';
  } else {
    return num1 / num2;
  }
}

function operate(operator, num1, num2) {
  return operator(num1, num2);
}

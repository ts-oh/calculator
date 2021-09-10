//global variables to store numbers, operators, & default-display value
let num1 = '';
let num2 = '';
let operator = '';
let defaultDisplay = '0';

// query selectors
const display = document.querySelector('.display');
const keypadBtns = document.querySelectorAll('button');

// event listeners
keypadBtns.forEach(element => element.addEventListener('click', handleKeyBtns));
window.addEventListener('keydown', kbdHandler);

function kbdHandler(e) {
  console.log(e.key);
  if (e.key >= 0 && e.key <= 9) {
    assignNum(e.key);
  } else if (
    (e.shiftKey && e.key === '+') ||
    e.key === '-' ||
    (e.shiftKey && e.key === '*') ||
    e.key === '/'
  ) {
    assignOperator(e.key);
  } else if (e.key === '.') {
    addDecimals(e.key);
  } else if (e.key === '=' || e.key === 'Enter') {
    let result = calculate();
    if (result === 'PLEASE DIVIDE BY NON-ZERO NUMBER!') {
      display.textContent = result;
    } else {
      result = parseFloat(result.toFixed(2));
      display.textContent = result;
      assignResult(result);
    }
  } else if (e.key === 'Backspace') {
    deleteValue(e.key);
  } else if (e.key === 'Escape') {
    clearAllMemory();
  }
}

// keypad event button handle
function handleKeyBtns(e) {
  const inputValue = e.target.value;
  if (isNum(inputValue)) {
    assignNum(inputValue);
  } else if (isBasicOperation(inputValue)) {
    assignOperator(inputValue);
  } else if (isDecimal(inputValue)) {
    addDecimals(inputValue);
  } else if (isEqual(inputValue)) {
    let result = calculate();
    if (result === 'PLEASE DIVIDE BY NON-ZERO NUMBER!') {
      display.textContent = result;
    } else {
      result = parseFloat(result.toFixed(2));
      display.textContent = result;
      assignResult(result);
    }
  } else if (isAllClearNumStorage(inputValue)) {
    clearAllMemory();
  } else if (isBackSpaceKey(inputValue)) {
    deleteValue(inputValue);
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
  const bsKey = 'backspace';
  return bsKey.includes(inputValue);
}

// functions for backspace, all clear, decimals, pair calculation, calculation result
function deleteValue(inputValue) {
  if (num1 && operator && num2 && inputValue === 'backspace') {
    display.textContent = num1 + operator + num2 + '<';
    if (num1 && operator && num2) {
      display.textContent = num1 + operator + num2 + '<';
      num2 = num2.slice(0, -1);
    }
  } else if (num1 && operator && !num2) {
    display.textContent = num1 + operator + '<';
    operator = operator.slice(0, -1);
    display.textContent = num1 + operator + '<';
  } else if (num1 && !operator && !num2) {
    display.textContent = num1;
    num1 = num1.slice(0, -1);
    display.textContent = num1 + '<';
    if (!num1 && !operator && !num2) {
      display.textContent = num1 + operator + num2 + '<';
      clearAllMemory();
    }
  }
}

function assignNum(inputValue) {
  if (num1 && operator) {
    num2 += inputValue;
    display.textContent = num2;
    if (num2.length >= 12) {
      num2 = num2.substring(0, 12);
      display.textContent = num2;
    }
  } else {
    num1 += inputValue;
    display.textContent = num1;
    if (num1.length >= 12) {
      num1 = num1.substring(0, 12);
      display.textContent = num1;
    }
  }
}

function assignOperator(inputValue) {
  if (!num1 && inputValue) {
    return (display.textContent = 'enter a number');
  } else if (!num2 && !operator) {
    operator = inputValue;
  } else {
    pairCalculation(inputValue);
  }
}

function pairCalculation(inputValue) {
  if (num1 && num2 && operator) {
    num1 = calculate().toString();
    num2 = '';
    display.textContent = num1;
  } else if (num1 && operator) {
    operator = inputValue;
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
  const result = operate(operator, convertNum1, convertNum2);
  return result;
}

function assignResult(result) {
  num1 = result.toString();
  num2 = '';
  operator = '';
  display.textContent = num1;
}

// calculation functions
function operate(operator, num1, num2) {
  if (operator === '+') {
    return add(num1, num2);
  }
  if (operator === '-') {
    return subtract(num1, num2);
  }
  if (operator === '*') {
    return multiply(num1, num2);
  }
  if (operator === '/') {
    return divide(num1, num2);
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
    const outputValue = 'PLEASE DIVIDE BY NON-ZERO NUMBER!';
    return outputValue;
  } else {
    return num1 / num2;
  }
}

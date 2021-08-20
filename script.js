// Query Selectors
const intKeys = document.querySelectorAll('.integer');
const operateKeys = document.querySelectorAll('.operator');
const computeKey = document.querySelector('.compute');
const acKey = document.querySelector('.clear');
const decimalKey = document.querySelector('.decimal');
const bsKey = document.querySelector('.backspace');

// Event Listners
intKeys.forEach(int => int.addEventListener('click', pushNumber));
operateKeys.forEach(op => op.addEventListener('click', pushOperator));
acKey.addEventListener('click', allClear);
computeKey.addEventListener('click', handleCompute);
decimalKey.addEventListener('click', addDecimal);
bsKey.addEventListener('click', backspaceKey);

// output display numbers in to the display div
const displayOutput = document.querySelector('.display');

// Array to store numbers and operators
let numArray = [];

// Clear Function
function allClear() {
  const displayOutput = document.querySelector('.display');
  displayOutput.textContent = '';
  numArray = [];
}

// Reset function
function resetCalculation() {
  numArray = [];
}

function backspaceKey() {
  numArray[numArray.length - 1] = numArray[numArray.length - 1].slice(0, -1);
}

function addDecimal(event) {
  const decimal = event.target.value;
  console.log(decimal);
  if (numArray[numArray.length - 1].includes(decimal) === false) {
    numArray.push(decimal);
  }
}

function concatNum1() {
  let joinNum = numArray.join('');
  console.log(joinNum);
  displayOutput.textContent = joinNum;
  numArray = [];
  numArray.splice(0, numArray.length, joinNum);
}

function concatNum2() {
  let num2Join = numArray.splice(2, numArray.length);
  let joinNum2 = num2Join.join('');
  console.log(joinNum2);
  displayOutput.textContent = joinNum2;
  numArray.splice(2, numArray.length, joinNum2);
}

function pushNumber(event) {
  numArray.push(event.target.value);
  displayOutput.textContent = event.target.value;
  if (
    numArray[1] === '+' ||
    numArray[1] === '-' ||
    numArray[1] === '*' ||
    numArray[1] === '÷'
  ) {
    concatNum2();
  } else {
    concatNum1();
  }
}
function pushOperator(event) {
  // if the last element of numArray is an operator after a pair don't push but calculate
  numArray.push(event.target.value);
  if (numArray.includes(event.target.value, 3)) {
    const newNum = handleCompute();
    numArray.push(newNum);
    numArray.push(event.target.value);
  } else if (
    numArray[0] === '+' ||
    numArray[0] === '-' ||
    numArray[0] === '*' ||
    numArray[0] === '+'
  ) {
    numArray = [];
    return (displayOutput.textContent = 'Please enter a number!');
  }
}

function handleCompute() {
  // when user press = split index [0] number1 , index [1] operator and index [2] number2
  const num1 = Number(numArray[0]);
  const operator = numArray[1].split('');
  const num2 = Number(numArray[2]);
  const calculation = result(operator, num1, num2);
  const roundCalculation = parseFloat(calculation.toFixed(3));
  displayOutput.textContent = roundCalculation;
  resetCalculation();
  return calculation;
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

import { backend } from 'declarations/backend';

const display = document.getElementById('display');
const buttons = document.querySelectorAll('.calculator button');
const loader = document.getElementById('loader');

let currentInput = '';
let operator = '';
let firstOperand = null;

buttons.forEach(button => {
    button.addEventListener('click', () => handleButtonClick(button.textContent));
});

async function handleButtonClick(value) {
    if (value >= '0' && value <= '9' || value === '.') {
        currentInput += value;
        updateDisplay();
    } else if (['+', '-', '*', '/'].includes(value)) {
        if (currentInput !== '') {
            if (firstOperand === null) {
                firstOperand = parseFloat(currentInput);
                currentInput = '';
                operator = value;
            } else {
                await performCalculation();
                operator = value;
            }
        }
    } else if (value === '=') {
        if (currentInput !== '' && firstOperand !== null) {
            await performCalculation();
            operator = '';
            firstOperand = null;
        }
    } else if (value === 'C') {
        clear();
    }
}

async function performCalculation() {
    if (firstOperand !== null && currentInput !== '') {
        const secondOperand = parseFloat(currentInput);
        showLoader();
        try {
            let result;
            switch (operator) {
                case '+':
                    result = await backend.add(firstOperand, secondOperand);
                    break;
                case '-':
                    result = await backend.subtract(firstOperand, secondOperand);
                    break;
                case '*':
                    result = await backend.multiply(firstOperand, secondOperand);
                    break;
                case '/':
                    if (secondOperand === 0) {
                        throw new Error('Division by zero');
                    }
                    result = await backend.divide(firstOperand, secondOperand);
                    break;
            }
            currentInput = result.toString();
            firstOperand = parseFloat(currentInput);
            updateDisplay();
        } catch (error) {
            currentInput = 'Error';
            updateDisplay();
        } finally {
            hideLoader();
        }
    }
}

function updateDisplay() {
    display.value = currentInput;
}

function clear() {
    currentInput = '';
    operator = '';
    firstOperand = null;
    updateDisplay();
}

function showLoader() {
    loader.classList.remove('d-none');
}

function hideLoader() {
    loader.classList.add('d-none');
}

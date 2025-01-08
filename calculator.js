document.addEventListener('DOMContentLoaded', function() {
    const display = document.querySelector('.display');
    const keys = document.querySelector('.keys');
    let currentInput = '';
    let operator = '';
    let previousInput = '';

    keys.addEventListener('click', function(event) {
        const target = event.target;
        const value = target.textContent;

        if (target.tagName === 'BUTTON') {
            if (target.classList.contains('operatorbtn')) {
                handleOperator(value);
            } else if (value === '=') {
                calculate();
            } else if (value === 'C') {
                clearDisplay();
            } else if (value === '.') {
                addDecimal();
            } else {
                handleNumber(value);
            }
        }
    });

    function handleNumber(value) {
        if (currentInput.length < 10) {
            currentInput += value;
            display.value = currentInput;
        }
    }

    function handleOperator(value) {
        if (currentInput === '' && value === '-') {
            currentInput = '-';
            display.value = currentInput;
        } else if (currentInput !== '') {
            if (previousInput !== '') {
                calculate();
            }
            operator = value;
            previousInput = currentInput;
            currentInput = '';
            display.value = previousInput + ' ' + operator;
        }
    }

    function calculate() {
        let result;
        const prev = parseFloat(previousInput);
        const current = parseFloat(currentInput);

        if (isNaN(prev) || isNaN(current)) return;

        switch (operator) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case '*':
                result = prev * current;
                break;
            case '/':
                result = prev / current;
                break;
            default:
                return;
        }

        currentInput = result.toString();
        operator = '';
        previousInput = '';
        display.value = currentInput;
    }

    function addDecimal() {
        if (!currentInput.includes('.')) {
            currentInput += '.';
            display.value = currentInput;
        }
    }

    function clearDisplay() {
        currentInput = '';
        operator = '';
        previousInput = '';
        display.value = '0';
    }
});
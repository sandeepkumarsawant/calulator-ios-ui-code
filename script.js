let currentValue = '0';
let previousValue = null;
let operator = null;
let shouldResetDisplay = false;

const display = document.querySelector('.display');

function updateDisplay() {
    display.textContent = currentValue;
}

function appendNumber(num) {
    if (shouldResetDisplay) {
        currentValue = '';
        shouldResetDisplay = false;
    }
    
    if (num === '.' && currentValue.includes('.')) return;
    
    if (currentValue === '0' && num !== '.') {
        currentValue = num;
    } else {
        currentValue += num;
    }
    
    updateDisplay();
}

function setOperator(op) {
    if (operator !== null && !shouldResetDisplay) {
        calculate();
    }
    
    previousValue = currentValue;
    operator = op;
    shouldResetDisplay = true;
    
    // Visual feedback for operator
    document.querySelectorAll('.operator').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
}

function calculate() {
    if (operator === null || previousValue === null) return;
    
    const prev = parseFloat(previousValue);
    const current = parseFloat(currentValue);
    let result;
    
    switch (operator) {
        case '+':
            result = prev + current;
            break;
        case '−':
            result = prev - current;
            break;
        case '×':
            result = prev * current;
            break;
        case '÷':
            result = prev / current;
            break;
        default:
            return;
    }
    
    currentValue = String(result);
    operator = null;
    previousValue = null;
    shouldResetDisplay = true;
    
    // Remove active state from operators
    document.querySelectorAll('.operator').forEach(btn => {
        btn.classList.remove('active');
    });
    
    updateDisplay();
}

function clearAll() {
    currentValue = '0';
    previousValue = null;
    operator = null;
    shouldResetDisplay = false;
    
    document.querySelectorAll('.operator').forEach(btn => {
        btn.classList.remove('active');
    });
    
    updateDisplay();
}

function toggleSign() {
    currentValue = String(parseFloat(currentValue) * -1);
    updateDisplay();
}

function percentage() {
    currentValue = String(parseFloat(currentValue) / 100);
    updateDisplay();
}

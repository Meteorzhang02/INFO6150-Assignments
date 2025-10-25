$(document).ready(function() {
    // Check authentication
    const checkAuth = () => {
        const sessionStorageData = sessionStorage.getItem('userSession');
        const localStorageData = localStorage.getItem('userSession');
        const sessionData = sessionStorageData || localStorageData;
        
        if (!sessionData) {
            window.location.href = 'login.html';
            return null;
        }
        
        try {
            return JSON.parse(sessionData);
        } catch (e) {
            console.error('Error parsing session data:', e);
            window.location.href = 'login.html';
            return null;
        }
    };

    const userSession = checkAuth();
    if (userSession && userSession.username) {
        $('#username').text(userSession.username);
    }

    // Track validation states
    let isNum1Valid = false;
    let isNum2Valid = false;

    // Single arrow function for all operations
    const calculate = (num1, num2, operation) => {
        const a = parseFloat(num1);
        const b = parseFloat(num2);
        
        switch (operation) {
            case 'add':
                return a + b;
            case 'subtract':
                return a - b;
            case 'multiply':
                return a * b;
            case 'divide':
                if (b === 0) {
                    throw new Error('Division by zero is not allowed');
                }
                return a / b;
            default:
                throw new Error('Invalid operation');
        }
    };

    // Validation function
    const validateNumber = (value, fieldName) => {
        if (!value || value.trim() === '') {
            return `${fieldName} is required`;
        }
        
        // Allow negative numbers, decimals, and scientific notation
        const numRegex = /^-?\d*\.?\d+(?:[eE][-+]?\d+)?$/;
        if (!numRegex.test(value)) {
            return 'Please enter a valid number';
        }
        
        // Check if it's a finite number
        const numValue = parseFloat(value);
        if (!isFinite(numValue)) {
            return 'Please enter a finite number';
        }
        
        return '';
    };

    // Update operation buttons state
    const updateOperationButtons = () => {
        const shouldEnable = isNum1Valid && isNum2Valid;
        $('.operation-btn').prop('disabled', !shouldEnable);
    };

    // Input validation
    $('#num1').on('input blur', function() {
        const value = $(this).val();
        const error = validateNumber(value, 'Number 1');
        
        if (error) {
            $('#num1Error').text(error);
            isNum1Valid = false;
        } else {
            $('#num1Error').text('');
            isNum1Valid = true;
        }
        
        updateOperationButtons();
    });

    $('#num2').on('input blur', function() {
        const value = $(this).val();
        const error = validateNumber(value, 'Number 2');
        
        if (error) {
            $('#num2Error').text(error);
            isNum2Valid = false;
        } else {
            $('#num2Error').text('');
            isNum2Valid = true;
        }
        
        updateOperationButtons();
    });

    // Clear errors on focus
    $('#num1, #num2').on('focus', function() {
        $(this).siblings('.error-message').text('');
    });

    // Operation button click handler
    $('.operation-btn').on('click', function() {
        const operation = $(this).data('operation');
        const num1 = $('#num1').val();
        const num2 = $('#num2').val();
        
        // Final validation check
        const num1Error = validateNumber(num1, 'Number 1');
        const num2Error = validateNumber(num2, 'Number 2');
        
        if (num1Error || num2Error) {
            if (num1Error) $('#num1Error').text(num1Error);
            if (num2Error) $('#num2Error').text(num2Error);
            updateOperationButtons();
            return;
        }
        
        try {
            const result = calculate(num1, num2, operation);
            // Format result to avoid long decimals
            const formattedResult = Number.isInteger(result) ? result : parseFloat(result.toFixed(6));
            $('#result').val(formattedResult);
        } catch (error) {
            if (operation === 'divide' && parseFloat(num2) === 0) {
                $('#num2Error').text('Cannot divide by zero');
            } else {
                $('#result').val('Error: ' + error.message);
            }
        }
    });

    // Logout functionality
    $('#logoutBtn').on('click', function() {
        $('.calculator-container').fadeOut(500, function() {
            sessionStorage.removeItem('userSession');
            localStorage.removeItem('userSession');
            window.location.href = 'login.html';
        });
    });

    // Initialize buttons state
    updateOperationButtons();
});
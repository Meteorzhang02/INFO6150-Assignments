$(document).ready(function() {
    // 编辑用户登录
    const validUsers = [
        { email: 'zhang.y76@northeastern.edu', password: 'Zyq20021019', username: 'Yunqi Zhang' },
        { email: 'admin@northeastern.edu', password: '12345678', username: 'admin' }
    ];

    // Track validation states
    let isEmailValid = false;
    let isPasswordValid = false;

    // Validation functions
    const validateEmail = (email) => {
        if (!email || email.trim() === '') {
            return 'Email is required';
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return 'Please enter a valid email address';
        }
        
        if (!email.endsWith('@northeastern.edu')) {
            return 'Please enter a valid Northeastern email';
        }
        
        return '';
    };

    const validatePassword = (password) => {
        if (!password || password.trim() === '') {
            return 'Password is required';
        }
        
        if (password.length < 8) {
            return 'Password must be at least 8 characters';
        }
        
        return '';
    };

    // Update login button state
    const updateLoginButton = () => {
        const shouldEnable = isEmailValid && isPasswordValid;
        $('#loginBtn').prop('disabled', !shouldEnable);
    };

    // Email validation
    $('#email').on('input blur', function() {
        const email = $(this).val();
        const error = validateEmail(email);
        
        if (error) {
            $('#emailError').text(error);
            isEmailValid = false;
        } else {
            $('#emailError').text('');
            isEmailValid = true;
        }
        
        updateLoginButton();
    });

    // Password validation
    $('#password').on('input blur', function() {
        const password = $(this).val();
        const error = validatePassword(password);
        
        if (error) {
            $('#passwordError').text(error);
            isPasswordValid = false;
        } else {
            $('#passwordError').text('');
            isPasswordValid = true;
        }
        
        updateLoginButton();
    });

    // Clear errors on focus
    $('#email').on('focus', function() {
        $('#emailError').text('');
    });

    $('#password').on('focus', function() {
        $('#passwordError').text('');
    });

    // Form submission
    $('#loginForm').on('submit', function(e) {
        e.preventDefault();
        
        const email = $('#email').val();
        const password = $('#password').val();
        const rememberMe = $('#rememberMe').is(':checked');

        // Final validation check
        const emailError = validateEmail(email);
        const passwordError = validatePassword(password);
        
        if (emailError || passwordError) {
            if (emailError) $('#emailError').text(emailError);
            if (passwordError) $('#passwordError').text(passwordError);
            updateLoginButton();
            return;
        }

        // Check credentials
        const user = validUsers.find(u => u.email === email && u.password === password);
        
        if (user) {
            // Create session
            const sessionData = {
                username: user.username,
                email: user.email,
                loginTimestamp: new Date().toISOString(),
                isLoggedIn: true
            };

            const storage = rememberMe ? localStorage : sessionStorage;
            storage.setItem('userSession', JSON.stringify(sessionData));

            // Show success and redirect
            $('#successMessage').fadeIn();
            $('#loginBtn').prop('disabled', true);
            
            setTimeout(() => {
                window.location.href = 'calculator.html';
            }, 2000);
        } else {
            $('#formError').text('Invalid email or password');
            // Clear password field for security
            $('#password').val('');
            isPasswordValid = false;
            updateLoginButton();
        }
    });

    // Initialize button state
    updateLoginButton();
});
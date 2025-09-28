// Enhanced Login Form Validation
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    const forgotForm = document.getElementById('forgot-form');
    const emailInput = document.getElementById('login-email');
    const passwordInput = document.getElementById('login-password');
    const loginBtn = document.getElementById('login-btn');
    
    // Real-time validation
    emailInput.addEventListener('blur', () => validateEmail());
    passwordInput.addEventListener('blur', () => validatePassword());
    emailInput.addEventListener('input', () => clearError('email'));
    passwordInput.addEventListener('input', () => clearError('password'));
    
    // Password toggle functionality
    document.querySelectorAll('.toggle-password').forEach(btn => {
        btn.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const targetInput = document.getElementById(targetId);
            const icon = this.querySelector('i');
            
            if (targetInput.type === 'password') {
                targetInput.type = 'text';
                icon.classList.replace('fa-eye', 'fa-eye-slash');
            } else {
                targetInput.type = 'password';
                icon.classList.replace('fa-eye-slash', 'fa-eye');
            }
        });
    });
    
    // Login form submission
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            submitLogin();
        }
    });
    
    // Forgot password modal
    document.querySelector('.forgot-link').addEventListener('click', function(e) {
        e.preventDefault();
        document.getElementById('forgot-password-modal').style.display = 'flex';
    });
    
    // Forgot password form submission
    if (forgotForm) {
        forgotForm.addEventListener('submit', function(e) {
            e.preventDefault();
            submitForgotPassword();
        });
    }
    
    // Social login buttons
    document.querySelectorAll('.social-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const provider = this.classList.contains('google-btn') ? 'Google' : 'Facebook';
            alert(`${provider} login would be implemented here`);
        });
    });
    
    function validateEmail() {
        const email = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValid = email && emailRegex.test(email);
        
        showError('email', isValid ? '' : 'Please enter a valid email address');
        return isValid;
    }
    
    function validatePassword() {
        const password = passwordInput.value;
        const isValid = password.length >= 6;
        
        showError('password', isValid ? '' : 'Password must be at least 6 characters');
        return isValid;
    }
    
    function validateForm() {
        const emailValid = validateEmail();
        const passwordValid = validatePassword();
        
        return emailValid && passwordValid;
    }
    
    function showError(field, message) {
        const errorElement = document.getElementById(field + '-error');
        const inputElement = field === 'email' ? emailInput : passwordInput;
        
        if (errorElement) {
            errorElement.textContent = message;
        }
        
        if (message) {
            inputElement.classList.add('error');
            inputElement.classList.remove('success');
        } else {
            inputElement.classList.remove('error');
            inputElement.classList.add('success');
        }
    }
    
    function clearError(field) {
        const errorElement = document.getElementById(field + '-error');
        const inputElement = field === 'email' ? emailInput : passwordInput;
        
        if (errorElement) {
            errorElement.textContent = '';
        }
        inputElement.classList.remove('error');
    }
    
    function submitLogin() {
        const btnText = loginBtn.querySelector('.btn-text');
        const btnLoader = loginBtn.querySelector('.btn-loader');
        
        // Show loading state
        btnText.style.display = 'none';
        btnLoader.style.display = 'inline-block';
        loginBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            // Hide loading state
            btnText.style.display = 'inline-block';
            btnLoader.style.display = 'none';
            loginBtn.disabled = false;
            
            // Show success modal
            document.getElementById('success-modal').style.display = 'flex';
        }, 2000);
    }
    
    function submitForgotPassword() {
        const email = document.getElementById('forgot-email').value;
        
        if (email) {
            alert('Password reset link sent to ' + email);
            closeForgotModal();
        }
    }
});

// Modal functions
function closeForgotModal() {
    document.getElementById('forgot-password-modal').style.display = 'none';
    document.getElementById('forgot-email').value = '';
}

// Close modals when clicking overlay
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal-overlay')) {
        e.target.style.display = 'none';
    }
});

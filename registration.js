document.getElementById('registrationForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const message = document.getElementById('message');

    if (username && email && password) {
        // Save user data in localStorage
        const userData = { username, email, password };
        localStorage.setItem('user', JSON.stringify(userData));

        // Show success message
        message.textContent = 'Registration successful! Redirecting to login...';
        message.style.color = 'green';

        // Redirect to login page after a delay
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 2000);
    } else {
        message.textContent = 'Please fill out all fields!';
        message.style.color = 'red';
    }
});

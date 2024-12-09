document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === '' || password === '') {
        alert('Please fill out all fields!');
    } else {
        alert('Login successful!');
        window.location.href = 'index.html';  // Redirect to the home page after login
    }
});
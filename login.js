document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.querySelector('form');

    // Form validation and submission
    loginForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent default form submission

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Basic form validation
        if (email === "" || password === "") {
            alert("Please fill out both the email and password fields.");
            return;
        }

        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (!emailPattern.test(email)) {
            alert("Please enter a valid email address.");
            return;
        }

        // Send data to the server using Fetch API
        fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`
        })
        .then(response => response.text()) // Read the response text
        .then(data => {
            if (data === 'Login successful') {
                // Redirect to another page after successful login
                window.location.href = '/dashboard.html'; // Change this to your desired page
            } else {
                alert(data);  // Display server response (login failure)
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        });
    });
});

document.getElementById('signup-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const mobileno = document.getElementById('mobileno').value;

    // Basic validation
    if (username.trim() === '') {
        alert('Please enter a username.');
        return;
    }

    if (email.trim() === '') {
        alert('Please enter an email address.');
        return;
    }

    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }

    if (password.trim() === '') {
        alert('Please enter a password.');
        return;
    }

    if (mobileno.trim() === '') {
        alert('Please enter a mobile number.');
        return;
    }

    // You can add more validation rules for each field if needed

    try {
        const response = await fetch('http://localhost:8080/reg-user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, mobileno, email, password })
        });

        if (response.ok) {
            alert('Sign up successful!');
            window.location.href = "log.html";
            // Redirect user to another page if needed
        } else {
            const errorData = await response.json();
            alert('Sign up failed: ' + errorData.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again later.');
    }
});

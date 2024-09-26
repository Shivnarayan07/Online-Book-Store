document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault();
    
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Basic validation
    if (username.trim() === '' || password.trim() === '') {
        document.getElementById("error-message").innerText = "Please enter both username and password";
        return;
    }

    fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Login failed");
        }
        else {
            window.location.href = "books.html"; // Redirect to dashboard on successful login
        }
    })
    .catch(error => {
        console.error("Error:", error);
        // Display error message on the page
        document.getElementById("error-message").innerText = "Invalid username or password";
    });
});

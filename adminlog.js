document.getElementById("adminlog-form").addEventListener("submit", function(event) {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username === "admin" && password === "admin") {
        window.location.href = "admindashboard.html"; // Redirect to admin dashboard
    } else {
        document.getElementById("errorMessage").innerText = "Invalid username or password";
    }
});
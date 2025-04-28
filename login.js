document.addEventListener("DOMContentLoaded", function () {
    // Handle the login form submission
    document.getElementById("loginForm").addEventListener("submit", function (e) {
        e.preventDefault();  // Prevent the form from submitting

        // Capture the values from the form
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        const mobile = document.getElementById("mobile").value;

        console.log("Login button clicked, Username:", username, "Password:", password, "Mobile:", mobile);

        // Simulate login and OTP sending process
        fakeLogin(username, password, mobile);
    });

    // Handle OTP form submission
    document.getElementById("otpForm").addEventListener("submit", function (e) {
        e.preventDefault();  // Prevent the form from submitting

        const otp = document.getElementById("otp").value;
        console.log("OTP entered:", otp);

        // Simulate OTP verification
        verifyOTP(otp);
    });
});

function fakeLogin(username, password, mobile) {
    // Simulate an API call to verify login and send OTP
    setTimeout(() => {
        if (username && password && mobile) {
            alert("Login successful. OTP has been sent to " + mobile);
            document.getElementById("login-box").style.display = "none";  // Hide login form
            document.getElementById("otp-box").style.display = "block";   // Show OTP form
        } else {
            alert("Login failed. Please check your details and try again.");
        }
    }, 1000);  // Simulating a delay of 1 second
}

function verifyOTP(otp) {
    // Simulate OTP verification process
    setTimeout(() => {
        if (otp === "3278") {  // Replace with real OTP verification
            alert("OTP verified successfully!");
            window.location.href = "/index.html";  // Redirect to home page
        } else {
            alert("Invalid OTP. Please try again.");
        }
    }, 1000);  // Simulating a delay of 1 second
}

$(document).ready(function () {
    // Handle tab switching
    $(".tab-btn").on("click", function () {
        var targetTab = $(this).data("tab");

        // Hide both forms
        $(".form-container").removeClass("active");

        // Show the selected form
        $("#" + targetTab).addClass("active");

        // Toggle active class on tabs
        $(".tab-btn").removeClass("active");
        $(this).addClass("active");
    });

    // Function to validate email format
    function isValidEmail(email) {
        var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }

    // Function to handle AJAX request
    function sendRequest(url, data, successMessage, errorContainer, form, button) {
        // Disable button to prevent multiple requests
        button.prop("disabled", true).text("Processing...");

        $.ajax({
            url: url,
            method: "POST",
            contentType: "application/json", // Set content type to JSON
            data: JSON.stringify(data), // Convert data to JSON format
            success: function (response) {
                errorContainer.html(successMessage).css("color", "green");
                form[0].reset(); // Reset form after success
            },
            error: function (xhr) {
                var errorMessage = "An error occurred. Please try again.";
                if (xhr.responseJSON && xhr.responseJSON.message) {
                    errorMessage = xhr.responseJSON.message; // Show server error message
                }
                errorContainer.html(errorMessage).css("color", "red");
            },
            complete: function () {
                button.prop("disabled", false).text("Submit"); // Re-enable button
            }
        });
    }

    // Register form submit
    $("#register").submit(function (e) {
        e.preventDefault();

        var name = $("#name-register").val().trim();
        var email = $("#email-register").val().trim();
        var password = $("#password-register").val().trim();
        var notification = $("#register-notification");
        var submitButton = $("#register button[type=submit]");

        // Validate input fields
        if (!name || !email || !password) {
            notification.html("Please fill in all fields.").css("color", "red");
            return;
        }
        if (!isValidEmail(email)) {
            notification.html("Please enter a valid email.").css("color", "red");
            return;
        }

        sendRequest(
            "https://test3.my.id/v1/auth/register",
            { name: name, email: email, password: password },
            "Registration successful!",
            notification,
            $("#register"),
            submitButton
        );
    });

    // Login form submit
    $("#login").submit(function (e) {
        e.preventDefault();

        var email = $("#email-login").val().trim();
        var password = $("#password-login").val().trim();
        var notification = $("#login-notification");
        var submitButton = $("#login button[type=submit]");

        // Validate input fields
        if (!email || !password) {
            notification.html("Please fill in all fields.").css("color", "red");
            return;
        }
        if (!isValidEmail(email)) {
            notification.html("Please enter a valid email.").css("color", "red");
            return;
        }

        sendRequest(
            "https://test3.my.id/v1/auth/login",
            { email: email, password: password },
            "Login successful!",
            notification,
            $("#login"),
            submitButton
        );
    });
});

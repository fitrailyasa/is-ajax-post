$(document).ready(function() {
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

    // Register form submit
    $('#register').submit(function(e) {
        e.preventDefault();

        var name = $('#name-register').val();
        var email = $('#email-register').val();
        var password = $('#password-register').val();

        // Validate
        if (name && email && password) {
            $.ajax({
                url: 'https://test3.my.id/v1/auth/register',
                method: 'POST',
                data: {
                    name: name,
                    email: email,
                    password: password
                },
                success: function(response) {
                    $('#register-notification').html('Registration successful!').css('color', 'green');
                    $('#register')[0].reset(); // Reset form
                },
                error: function(xhr, status, error) {
                    $('#register-notification').html('Registration failed. Please try again.').css('color', 'red');
                }
            });
        } else {
            $('#register-notification').html('Please fill all fields.').css('color', 'red');
        }
    });

    // Login form submit
    $('#login').submit(function(e) {
        e.preventDefault();

        var email = $('#email-login').val();
        var password = $('#password-login').val();

        // Validate
        if (email && password) {
            $.ajax({
                url: 'https://test3.my.id/v1/auth/login',
                method: 'POST',
                data: {
                    email: email,
                    password: password
                },
                success: function(response) {
                    $('#login-notification').html('Login successful!').css('color', 'green');
                    $('#login')[0].reset(); // Reset form
                },
                error: function(xhr, status, error) {
                    $('#login-notification').html('Login failed. Please try again.').css('color', 'red');
                }
            });
        } else {
            $('#login-notification').html('Please fill all fields.').css('color', 'red');
        }
    });
});

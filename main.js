document.addEventListener("DOMContentLoaded", function() {
    // Function to load the login form template
    function loadLoginForm() {
        var loginContainer = document.getElementById("custom-login-container");
        loginContainer.innerHTML = ""; // Clear the container before adding the form

        // Clone the content of the template using innerHTML
        var template = document.getElementById("login-template");
        var clone = document.createElement("div");
        clone.innerHTML = template.innerHTML;
        while (clone.firstChild) {
            loginContainer.appendChild(clone.firstChild);
        }

        UIkit.modal(loginContainer).show(); // Show the form using UIkit modal
    }

    // Add a click event listener to the "Log In" button
    var loginButton = document.querySelector(".btn-login");
    loginButton.addEventListener("click", loadLoginForm);
});

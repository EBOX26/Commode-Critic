// Wait for the DOM content to load before executing the code
document.addEventListener("DOMContentLoaded", function() {
    // Function to load the login form template
    function loadLoginForm() {
        // Get the login container element
        var loginContainer = document.getElementById("custom-login-container");
        loginContainer.innerHTML = ""; // Clear the container before adding the form

        // Clone the content of the template using innerHTML
        var template = document.getElementById("login-template");
        var clone = document.createElement("div");
        clone.innerHTML = template.innerHTML;
        while (clone.firstChild) {
            loginContainer.appendChild(clone.firstChild);
        }

        // Show the form using UIkit modal
        UIkit.modal(loginContainer).show();
    }

// Add a click event listener to the "Log In" button
var loginButton = document.querySelector(".btn-login");
    loginButton.addEventListener("click", loadLoginForm);
});

// setting an event listener when the Log In button is clicked to grab the form data:
document.getElementById('login-form').addEventListener('submit', (event) => {
    // may want to remove this to see if it removes the sign in pop up by default. 
    event.preventDefault();

    //getting the values of the submitted form
    const username = document.getElementById("username-login").value;

    const password = document.getElementById("password-login").value;

    const userLogIn = {
        username,
        password
    };

    //sending the user login to the post destination
    fetch('/api/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userLogIn),
    })
        .then((response) => response.json())
        .then((data) => {
            // Handle the response from the back end
            console.log(data);
          })
          .catch((error) => {
            console.error('Error:', error);
          });
});

// JavaScript function to display the review form when the button is clicked
function showReviewForm() {
    // Get the review form template content
    const templateSource = document.getElementById('reviewFormTemplate').innerHTML;

    // Compile the template using Handlebars
    const template = Handlebars.compile(templateSource);

    // Render the template into the desired container
    const reviewFormContainer = document.getElementById('reviewFormContainer');
    reviewFormContainer.innerHTML = template();
}

// Add an event listener to trigger the showReviewForm function when the button is clicked
document.getElementById('writeReviewButton').addEventListener('click', showReviewForm);

// Initialize the map when the page loads
function initMap() {
    // Create a map centered at your current location
    navigator.geolocation.getCurrentPosition(function (position) {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        const map = new google.maps.Map(document.getElementById('map'), {
            center: { lat: lat, lng: lng },
            zoom: 15
        });

        // Create a Places Service object
        const service = new google.maps.places.PlacesService(map);

        // Declare an array to store markers
        const markers = [];

        // Define a request to search for nearby bathrooms
        const request = {
            location: { lat: lat, lng: lng },
            radius: 1000, // Adjust the radius as needed
            type: 'bathroom'
        };

        // Perform the nearby search
        service.nearbySearch(request, function (results, status) {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                for (let i = 0; i < results.length; i++) {
                    const place = results[i];
                    // Display markers for each nearby bathroom
                    createMarker(place, map, markers);
                }
            }
        });
    });
}

function createMarker(place, map, markers) {
    const marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location,
        title: place.name
    });

    // Add a click event listener to the marker
    marker.addListener('click', function() {
        // You can display more information here, e.g., an info window
        const infoWindow = new google.maps.InfoWindow({
            content: place.name
            // You can customize the content with additional information
        });

        // Open the info window when the marker is clicked
        infoWindow.open(map, marker);
    });

    // Store the marker in the array
    markers.push(marker);
}

// Make the initMap function globally accessible
window.initMap = initMap;

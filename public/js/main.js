// Wait for the DOM content to load before executing the code
document.addEventListener("DOMContentLoaded", function () {
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

// Wait for the DOM content to load before executing the code
document.addEventListener("DOMContentLoaded", function () {

    function loadCreateAccountForm() {

        var createAcountContainer = document.getElementById("custom-createAcount-container");
        createAcountContainer.innerHTML = "";

        // Clone the content of the template using innerHTML
        var template = document.getElementById("createAccount-template");
        var clone = document.createElement("div");
        clone.innerHTML = template.innerHTML;
        while (clone.firstChild) {
            createAcountContainer.appendChild(clone.firstChild);
        }

        // Show the form using UIkit modal
        UIkit.modal(createAcountContainer).show();
    }

    // Add a click event listener to the "Log In" button
    // might be issue here with the .btn-login
    var loginButton = document.querySelector(".btn-createAccount");
    loginButton.addEventListener("click", loadCreateAccountForm);
});

// setting an event listener when the submit on the Log In button is clicked to grab the form data:
document.addEventListener('submit', (event) => {
    // may want to remove this to see if it removes the sign in pop up by default. 
    if (event.target.id === 'login-form') {
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
            .then((response) => {
                if (response.ok) {
                    document.location.replace('/');
                    alert('You are logged in')
                } else {
                    alert('Failed to logged in')
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
});

// setting an event listener when the submit on create account button is clicked to grab the form data:
document.addEventListener('submit', (event) => {

    if (event.target.id === 'createAccount') {
        event.preventDefault();

        //getting the values of the submitted form
        const username = document.getElementById("account-username").value;
        const password = document.getElementById("account-password").value;
        const userLogIn = {
            username,
            password
        };

        //sending the user login to the post destination
        fetch('/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userLogIn),
        })
            .then((response) => {
                if (response.ok) {
                    document.location.replace('/');
                    alert('Account created')
                } else {
                    alert('Fail to create account')
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
});

// setting an event listener when the submit review button is clicked to grab the form data:
document.addEventListener('submit', (event) => {

    if (event.target.id === 'reviewForm') {
        event.preventDefault();

        // checking the login status
        // checkUserAuthentication()

        const user_id = getUserId()
        getUserId()
            .then((userId) => {
                const user_id = userId
                console.log(userId)
                //getting the values of the submitted form
                const review_content = document.getElementById("reviewText").value;
                const rating = document.getElementById("reviewRating").value;
                const reviewData = {
                    review_content,
                    rating,
                    user_id
                };
                //sending the user login to the post destination
                fetch('/api/reviews', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(reviewData),
                })
                .then((response) => {
                    if (response.ok) {
                        document.location.replace('/');
                        alert('Review created')
                    } else {
                        alert('Failed to create review')
                    }
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
            })
        }
    })



// JavaScript function to display the review form when the button is clicked
function showReviewForm() {
    // Get the review form template content
    const templateSource = document.getElementById('reviewFormTemplate').innerHTML;

    // Compile the template using Handlebars
    const template = Handlebars.compile(templateSource);

    // Render the template into the desired container
    const reviewFormContainer = document.getElementById('reviewFormContainer');
    reviewFormContainer.innerHTML = template();

    getUsername()
        .then((name) => {
            const username = name
            const usernameField = document.getElementById('username-field');
            usernameField.value = username;
        });
}

// Add an event listener to trigger the showReviewForm function when the button is clicked
document.getElementById('writeReviewButton').addEventListener('click', showReviewForm);

document.getElementById('reviewButton').addEventListener('click', (event) => {
    if (event.target.id === 'reviewButton'){
        document.location.replace('/reviews')
    }
});

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
    marker.addListener('click', function () {
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


// // initialize a variable to track user authentication status
// let userIsAuthenticated = false;

// // Check the user's authentication status
// function checkUserAuthentication() {

//     if (req.session.logged_in) {
//         userIsAuthenticated = true;
//     } else {
//         userIsAuthenticated = false;
//     }
// }

// getting the user name of the person signed in
function getUsername() {
    return new Promise((resolve, reject) => {
        fetch('/api/users/current', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
            })
            .then((data) => {
                resolve(data.username);
            })
            .catch((error) => {
                reject(new Error('username undefined'))
            });
    })
}


// function to get user id
function getUserId() {
    return new Promise((resolve, reject) => {
        fetch('/api/users/current', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
            })
            .then((data) => {
                console.log(data.id)
                resolve(data.id);
            })
            .catch((error) => {
                reject(new Error('username undefined'))
            });
    })
}

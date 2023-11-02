// // Initialize the Google Maps Places API services
// let placeSearchService, placesService;

// function initMap() {
//     // Initialize the Google Places services.
//     placeSearchService = new google.maps.places.AutocompleteService();
//     placesService = new google.maps.places.PlacesService(document.createElement('div'));
// }

// function searchNearbyRestrooms(latitude, longitude, radius) {
//     // this API key will no longer work after grading 
//     const apiKey = 'AIzaSyCncdS0ebHpMYDd5zH4IBqeftgX1EPNSQM';
//     // Define the base URL for the nearby search request.
//     const baseUrl = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json';

//     // Combine the latitude and longitude into a location string.
//     const location = `${latitude},${longitude}`;

//     // Create a URLSearchParams object to construct query parameters for the request.
//     const queryParams = new URLSearchParams({
//       location,  // The location to search near
//       radius,    // Radius in meters for the search (e.g., 1000 meters for 1 km)
//       type: 'restroom', // The type of place to search for (in this case, restrooms)
//       key: apiKey,       // The API key for authentication
//     });

//     // Construct the full URL for the nearby search request.
//     const url = `${baseUrl}?${queryParams.toString()}`;

//     // Send a fetch request to the Google Places API to search for nearby restrooms.
//     fetch(url) 
//       .then(response => response.json())
//       .then(data => {
//         // Process the data returned by the API (in this case, log it to the console).
//         console.log(data);
//       })
//       .catch(error => {
//         console.error('Error fetching data:', error);
//       });
// }

// // Add an event listener for the search form submission.
// document.getElementById('search-form').addEventListener('submit', function(event) {
//     event.preventDefault(); // Prevent the form from actually submitting

//     // Get the value entered in the "place-search" input field.
//     const placeName = document.getElementById('place-search').value;

//     // Call a function to fetch coordinates based on the entered placeName.
//     fetchCoordinatesFromPlaceName(placeName);
// });

// // Function to fetch coordinates based on placeName using the AutocompleteService.
// function fetchCoordinatesFromPlaceName(placeName) {
//     // Use the AutocompleteService to get place predictions based on the input placeName.
//     placeSearchService.getPlacePredictions({ input: placeName }, (predictions, status) => {
//         if (status === google.maps.places.PlacesServiceStatus.OK) {
//             if (predictions && predictions.length > 0) {
//                 // Extract the place ID of the first prediction.
//                 const placeId = predictions[0].place_id;

//                 // Use the PlacesService to get details of the place, including latitude and longitude.
//                 placesService.getDetails({ placeId }, (place, status) => {
//                     if (status === google.maps.places.PlacesServiceStatus.OK) {
//                         // Extract the latitude and longitude from the place object.
//                         const latitude = place.geometry.location.lat();
//                         const longitude = place.geometry.location.lng();
//                         const radius = 1000; // Adjust the radius as needed (in meters)

//                         // Call the searchNearbyRestrooms function with the obtained coordinates.
//                         searchNearbyRestrooms(latitude, longitude, radius);
//                     }
//                 });
//             }
//         }
//     });
// }




// second try code

// // Initialize the Google Maps Places API services
// let placeSearchService, placesService;

// // Function to fetch coordinates based on placeName using the AutocompleteService.
// function fetchCoordinatesFromPlaceName(placeName) {
//     // Check if the initMap function has been called and placeSearchService is defined.
//     if (placeSearchService) {
//         placeSearchService.getPlacePredictions({ input: placeName }, (predictions, status) => {
//             if (status === google.maps.places.PlacesServiceStatus.OK) {
//                 if (predictions && predictions.length > 0) {
//                     const placeId = predictions[0].place_id;
//                     placesService.getDetails({ placeId }, (place, status) => {
//                         if (status === google.maps.places.PlacesServiceStatus.OK) {
//                             const latitude = place.geometry.location.lat();
//                             const longitude = place.geometry.location.lng();
//                             const radius = 1000; // Adjust the radius as needed (in meters)
//                             searchNearbyRestrooms(latitude, longitude, radius);
//                         }
//                     });
//                 }
//             }
//         });
//     } else {
//         console.error('placeSearchService is not initialized');
//     }
// }

// // Function to search nearby restrooms.
// function searchNearbyRestrooms(latitude, longitude, radius) {
//     // This API code will no longer work after grading.
//     const apiKey = 'AIzaSyCncdS0ebHpMYDd5zH4IBqeftgX1EPNSQM';

//     // Define the base URL for the nearby search request.
//     const baseUrl = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json';

//     // Combine the latitude and longitude into a location string.
//     const location = `${latitude},${longitude}`;

//     // Create a URLSearchParams object to construct query parameters for the request.
//     const queryParams = new URLSearchParams({
//         location,  // The location to search near
//         radius,    // Radius in meters for the search (e.g., 1000 meters for 1 km)
//         type: 'restroom', // The type of place to search for (in this case, restrooms)
//         key: apiKey,       // The API key for authentication
//     });

//     // Construct the full URL for the nearby search request.
//     const url = `${baseUrl}?${queryParams.toString()}`;

//     // Send a fetch request to the Google Places API to search for nearby restrooms.
//     fetch(url)
//         .then(response => response.json())
//         .then(data => {
//             console.log("data fetched");
//             // Process the data returned by the API (in this case, log it to the console).
//             console.log(data);
//         })
//         .catch(error => {
//             console.error('Error fetching data:', error);
//         });
// }

// // Add an event listener for the search form submission.
// document.getElementById('search-form').addEventListener('submit', function (event) {
//     event.preventDefault(); // Prevent the form from actually submitting

//     // Get the value entered in the "place-search" input field.
//     const placeName = document.getElementById('place-search').value;

//     // Call a function to fetch coordinates based on the entered placeName.
//     fetchCoordinatesFromPlaceName(placeName);
// });





// third attempt


// // Initialize the Google Maps Places API services
// let placeSearchService, placesService;

// // Initialize the Google Maps API and the services
// function initMap() {
//     // Create a new map instance (you can customize the options as needed)
//     const map = new google.maps.Map(document.getElementById('map'), {
//         center: { lat: 0, lng: 0 },
//         zoom: 10,
//     });

//     // Initialize the Place Autocomplete service
//     placeSearchService = new google.maps.places.AutocompleteService();

//     // Initialize the Places Service
//     placesService = new google.maps.places.PlacesService(map);
// }

// // Function to fetch coordinates based on placeName using the AutocompleteService.
// function fetchCoordinatesFromPlaceName(placeName) {
//     // Check if the initMap function has been called and placeSearchService is defined.
//     if (placeSearchService) {
//         placeSearchService.getPlacePredictions({ input: placeName }, (predictions, status) => {
//             if (status === google.maps.places.PlacesServiceStatus.OK) {
//                 if (predictions && predictions.length > 0) {
//                     const placeId = predictions[0].place_id;
//                     placesService.getDetails({ placeId }, (place, status) => {
//                         if (status === google.maps.places.PlacesServiceStatus.OK) {
//                             const latitude = place.geometry.location.lat();
//                             const longitude = place.geometry.location.lng();
//                             const radius = 1000; // Adjust the radius as needed (in meters)
//                             searchNearbyRestrooms(latitude, longitude, radius);
//                         }
//                     });
//                 }
//             }
//         });
//     } else {
//         console.error('placeSearchService is not initialized');
//     }
// }

// // Function to search nearby restrooms.
// function searchNearbyRestrooms(latitude, longitude, radius) {
//     // This API code will no longer work after grading.
//     const apiKey = 'AIzaSyCncdS0ebHpMYDd5zH4IBqeftgX1EPNSQM'; 

//     // Define the base URL for the nearby search request.
//     const baseUrl = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json';

//     // Combine the latitude and longitude into a location string.
//     const location = `${latitude},${longitude}`;

//     // Create a URLSearchParams object to construct query parameters for the request.
//     const queryParams = new URLSearchParams({
//         location,  // The location to search near
//         radius,    // Radius in meters for the search (e.g., 1000 meters for 1 km)
//         type: 'restroom', // The type of place to search for (in this case, restrooms)
//         key: apiKey,       // The API key for authentication
//     });

//     // Construct the full URL for the nearby search request.
//     const url = `${baseUrl}?${queryParams.toString()}`;

//     // Send a fetch request to the Google Places API to search for nearby restrooms.
//     fetch(url)
//         .then(response => response.json())
//         .then(data => {
//             console.log("data fetched");
//             // Process the data returned by the API (in this case, log it to the console).
//             console.log(data);
//         })
//         .catch(error => {
//             console.error('Error fetching data:', error);
//         });
// }

// // Add an event listener for the search form submission.
// document.getElementById('search-form').addEventListener('submit', function (event) {
//     event.preventDefault(); // Prevent the form from actually submitting

//     // Get the value entered in the "place-search" input field.
//     const placeName = document.getElementById('place-search').value;

//     // Call a function to fetch coordinates based on the entered placeName.
//     fetchCoordinatesFromPlaceName(placeName);
// });


// // Wait for the DOM to be fully loaded
// document.addEventListener("DOMContentLoaded", function() {
//     // Find the anchor element by its class
//     var searchIcon = document.querySelector(".uk-search-icon-flip");

//     // Add an event listener to the anchor element to listen for the "click" event
//     searchIcon.addEventListener("click", function(event) {
//         // Log "searched" to the console when the anchor element is clicked
//         event.preventDefault();
//         console.log("searched");
//     });
// });


function searchPlaces() {
    var searchTerm = document.getElementById("place-search").value;
    fetch(`/search-places?searchTerm=${searchTerm}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error("Error fetching data from Google Places API:", error);
        });
}
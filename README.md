# App Overview

## index.js

- App entry point
- Renders the APP component

## App.js

- React router handles the routing
- Any unmatched routes will redirect to home

## Home.js

- Relies on Material UI for styles
- Material UI Grid works on flexbox principles
- The useEffect is the entrypoint which fetches all dog breeds, utilizing a service
- This app utilizes localstorage to cache responses from the DogAPIService to utilize the data in other components, as well as to have data persist
- Iterates over dog breeds and calls the BreedCard component for each breed.

## BreedCard.js

- By extracting each breed into its own card component, we can localize state for each breed
- By not interacting with the select input for Sub-breed, if the user hits view, it will show you the top-level breed.
- The select input is to demonstrate the ability to parse through and work with complex structures, as well as to demonstrate localized state
- The clear button clears the select input and is disabled based off of selected state for sub-breed
- Clicking view will take the user to the breed page

## ViewBreed.js

- This component sets the state of current and next breed using the url
- The useEffect determines whether the app needs to use cached data (if returning) or fetch data utilizing the DogApiService
- By caching both the current breed images as well as the next breed images, we can make features possible such as displaying an image of the next breed on the button on the top of the page. This also shortens the load time of the next page since the data is collected and cached.

## DogApiService.js

- This holds the services for fetching all dog breeds as well as fetching random breed images.
- Both functions utilize a utility to validate the response, as well as handles errors
- From what each functions return, the app never has to worry about undefined or null values, the service takes care of that.

## Utils.js

- Capitalize is a function that capitalizes the first character of a string, which is used all over the app for displaying breed and sub-breed names
- IsValidResponse validates responses from any service, great example of reusable code

# Tests

- App.test.js to test the app component rendering
- Utils.test.js to verify each utility is working correctly
- DogApiService.test.js to verify each service. With more time, these tests would be more intricate validating status codes, data attributes, etc.
- Tests on components and user functionality would also be a great additions to this app.

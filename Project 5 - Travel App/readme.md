# Travel Web Application
Web app that allows a users to plan a trip. After inputting the destination and travel dates, the user is provided with the length of the trip, a countdown, a weather forecast, and an image of their destination. 

The [GeoNames API](http://www.geonames.org/) is used to obtain the coordinates for the destination, which are then used to get the weather forecast from the [Weatherbit API](https://www.weatherbit.io/). If the trip is less than 16 days away, a forecast is provided. For trips further away, historical data is used to predict the weather. Lastly, the [Pixabay API](https://pixabay.com/) is used to get the destination image.

### Extras
- The user can add an end date, and the length of the trip is displayed.
- Pulls an image from the destination country if the city brings up no results.

## The Project Includes
- HTML, CSS, and Javascript
- Sass styles
- Webpack
- Webpack loaders and plugins
- API requests
- Jest testing
- Service workers for offline capabilities

## Setting Up
- Clone the repository.
- Install all project dependencies with `npm install`.
- Get credentials for the APIs.
- Create an .env file in the root directory with your credentials in the format:

  ```
  geoNamesUserName = ******
  weatherbitKey = ******
  pixabayKey = ******
  ```

- Run `npm run build-prod` to build the production version.
- Run `npm build-dev` to start the Webpack Dev server.
- Run `npm run start` in another terminal to start the Express server.
- The app runs on http://localhost:8080/.

## Testing
- Run `npm run test`.
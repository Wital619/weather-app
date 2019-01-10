# Weather App

This is a Weather Application.
The audience of users for app is any. 
The main objective is to display weather information in cities around the world.
The data taken from an [openweathermap API](https://openweathermap.org/).

[Demo](https://weather-app-wital619.herokuapp.com)

## Functions
- authorization and registration
- save the user's city in database for weather information on future visits
- display current weather data
- display 5 day forecast, that includes weather data every 3 hours
- make city search

## Tech stack
 - HTML
 - CSS (SCSS)
 - Angular 7
 - [RxJS](https://github.com/ReactiveX/rxjs)
 - [Moment.js](https://github.com/moment/moment)
 - [ngx-spinner](https://github.com/Napster2210/ngx-spinner)
 - [ngx-toastr](https://github.com/scttcper/ngx-toastr)

## Prerequisites

- An [openweathermap](https://openweathermap.org/) API key.
- A [firebase](https://console.firebase.google.com/) config data.

## Installation and usage

Clone the repo

```
$ git clone https://github.com/Wital619/weather-app.git yourFolderName
```

```
$ cd yourFolderName
```

```
$ npm i
```

In the project's `src` folder create a folder with name `environments`

In the created folder create a file named environment.ts

The file must have the next structure:

```
export const environment = {
  production: false,
  firebase: {
    apiKey: '',
    authDomain: '',
    databaseURL: '',
    projectId: '',
    storageBucket: '',
    messagingSenderId: ''
  },
  api: ''
};
```

Instead of the empty strings input your firebase config data and openweathermap api key as well.

To work correctly you must also configure:
- firebase authentication by adding sign-in methods - email and password, Google and Facebook;
- firebase database by setting its config's read and write rules to the truth.

```
$ ng serve
```

Navigate to `http://localhost:4200/`

## Authors

[Vitaliy Pogoretskyy](https://github.com/Wital619)

## Front-end camp
[Facebook](https://www.facebook.com/groups/270300106928894)

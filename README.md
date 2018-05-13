
# Kino forecast - A few words about this app

This web application aims to provide some tools that we would be useful in data processing for keno game of OPAP (Greek lottery). Data are being retrieved live from OPAP REST API points.

Basic usage is that you can enter the specific time frame of the dates that you want to calculate data for and then the values will be ordered due to occurences. Also you can select the number of draws to be used in the selected time frame.Further more, graphs that are displaying the number of occurences of each number are generated. Finally, you can watch live results of keno game live. The results are being refreshed every 1 minute.

More information about OPAP Web services can be found in the next link: OPAP web services

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.7.0.

## Development server

Run `yarn start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `yarn build` to build the project. The build artifacts will be stored in the `dist/` directory. `-prod` flag is used for a production build. Also `base-href` is used with value `kino-forecast/dist`. Then you can upload dist folder in your server in the subpath `kino-forecast/dist`

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Live demo

`http://kino.oncrete.gr/kino_forecast/dist/index.html`
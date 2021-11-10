JS Cash Operations 
===

Description
---
---

This is a console app using NodeJS runtime.

Given a set of transactional information as an input, the app calculates the commission fee for each of the transactions. It takes into account the different fee percentages for the different kinds of operations and users and their combinations. The app also keeps track of the previously made transactions of a given user and the current time the transactions have been done. It uses the persisted transactional data to calculate the fee with a free fee amount allowed per given time period.

Setting up the app
---
---

NodeJS is required to run the app

Run
> - `npm install`

Running the app
---
---
The codebase has been pre-build and is ready to use directly. The build result can be found in the "dist" folder.

Direct usage:
> - `npm run calc -- input.json`

The calc task will use the built version of app.js (from inside ./dist/app.js)
The app takes in a valid path to a file as argument and it can be passed as by adding `-- /path/to/file` to the `npm run calc` command.

The Example above will use the `"input.json"` file from the root of the project.

If needed the codebase can be build with the `npm run build` command.

For development pourposes there is a pre-setup live reloading task that uses `nodemon` and it can be used with: 
> - `npm run dev`.

The build command uses chained eslint and babel, which results in the only being able to build valid code with no build time errors (but allows for warnings).

Tests
---
---
The app has tests for most cases for the most important functionality. It uses Jest framework for testing. Tests are focused on testing with all types of valid data and various types on invalid data.

Tests can be run with:
> - `npm run tests`

For testing pourposes the app uses the example `input.json` in the root folder.
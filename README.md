# Green Location Extension

## Pre-requisites
- Run `npm install -g tfx-cli` to install the extension packaging tool.
- Run `npm install -g mocha` to install [Mocha](https://mochajs.org/) for unit testing.

## Build the extension

Run `npm run build` to build all the Tyscript files.

## Test the extension locally

Run `npm run start` to test the extension locally. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `npm run test` to execute the unit tests via [Mocha](https://mochajs.org/).

## Further help

To get more help on the Azure DevOps documentation. Check out the documentation [Develop a Web Extension](https://learn.microsoft.com/en-us/azure/devops/extend/develop/add-build-task?view=azure-devops).

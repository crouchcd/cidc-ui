![codecov](https://codecov.io/gh/dfci/front-end-cidc/branch/master/graph/badge.svg)
## CIDC Front End Readme


### Installation:

Clone the project, and run `npm install`

### Build:

To create a new deployment bundle, run `npm run build`

To format and deploy the bundle to the google bucket run the bash script: `bash google-deploy.sh`

This script will remove the build-hashes from the build files (this is an interim solution that avoids having to rebuild the back-end docker image every time the front-end is updated), and then upload the files to the google bucket. You must be authorized on our google bucket for this command to work correctly.

### Test:

To run unit tests, run: `npm run test`. This should generate code coverage files and an `lcov.info` file that is compatible with most code-coverage highlighting plugins.

### Developer mode:

To test React components without trying to contact the back-end, start the application in "dev mode", with `npm run start-dev`

the file `App.tsx` has a conditional that will load either the APP or some testing components depending on the ENV detected. To test components, simply replace the return value of the `mockReturn` function with the components you wish to test. 
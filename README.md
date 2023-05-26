# webstart-project-name
This project has been set up with [this template](webstart-template-url) on webstart-project-setupdate.

# Project Information
This initial README is only intended to get you started with a new project. 
You should edit this file to contain just the information an external developer needs to know about your project.
- What is it about?
- What do I need to run it?
- What other resources are related to it?
- ...

# Source Directory Structure
## Root level files:
- `index.ts` Main entry point. General application setup and server start
- `logging.ts` Exports the global logger instance
- `application-lifecycle.ts` Contains all actions that shall be run before / after the express server starts up / shuts down

## Directories
- `config` Configuration for the express server and logging
- `routes` REST endpoints served by the express server
- `services` Definition of 'global' services that shall be used throughout the application (e.g. database connections)
- `application` Recommended place for application business logic (keep separate from server infrastructure code)

# Development
```
// Initial setup
npm install

// Start service
npm start

// Development tools
npm run test        // Test suites
npm run lint        // Static code analysis
npm run format      // Code style formatting
```

# Production Builds
```
# Transpile project to JavaScript (outputs to /dist)
npm run production:build

# Start project from /dist in production mode
npm run production:start
```

## Docker Builds
```
docker build -t webstart-project-id .
docker run -p 8080:8080 -d webstart-project-id
```

## GitLab CI Builds
GitLab uses the `.gitlab-ci.yml` file to build the project in the GitLab CI process. In the initial setup the configuration only tests and builds the project with Node.js.
To build and push docker images uncomment the relevant stage and define some relevant CI/CD variables (Settings -> CI/CD -> Variables).


| Variable | Required | Type | Flag: Protected | Flag: Masked | Example |
| ----------- | ----------- | ----------- | ----------- | ----------- | ----------- |
| DOCKER_REGISTRY_URL | true | Variable | false | true | registry.my-organization.com:4445 |
| DOCKER_REGISTRY_USER | true | Variable | false | true | username |
| DOCKER_REGISTRY_PASS | true | Variable | false | true | password |
| IMAGE_NAME | true | Variable | false | false | webstart-project-id |
| NPM_RC | false | File | false | false | registry=https://registry.npmjs.org |

## Common Issues
When building locally on your system, the docker build system copies the `package-lock.json` from your project root and runs `npm ci` by referencing this file. 
- If you have set your system to use another registry, place an `.npmrc` credentials file in the root folder, or inject it in the CI pipeline. Note that the dockerfile is set up in a way, that this will *not* be included in the final image.
- If you cannot provide a `package-lock.json` file in your build workflow, replace `npm ci` with `npm install` in the dockerfile. Note that you loose the certainty of reproducable builds this way.

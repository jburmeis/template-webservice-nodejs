import { Command } from "commander";
import path from "path";
import * as http from "http";
import Log from "./logging";
import { applicationInit, applicationShutdown } from "./application-lifecycle";
import { createExpressApp } from "./config/express-config";
import { ApplicationServices } from "./services/ApplicationServices";

// Extends the type of the 'global' object that NodeJS provides (please use it sparingly).
// Add a reference to the application base directory here
declare global {
	/* eslint no-var: off */
	var appRoot: string;
}
global.appRoot = path.resolve(__dirname, "..");

// Parse command-line arguments to the server (optional)
// Example with debug flag
const program = new Command().option("-d, --debug", "output extra debugging");

program.parse(process.argv);
const options = program.opts();
if (options.debug) {
	Log.debug(options.debug);
}

// Handle application shutdown
process.on("SIGINT", () => {
	const success = applicationShutdown();
	process.exit(success ? 0 : 1);
});

// Run application init procedures and create services
let appServices: ApplicationServices;
try {
	appServices = applicationInit();
} catch {
	process.exit(1);
}

// Create express application
const app = createExpressApp(appServices);

// Create and start http server
const server = http.createServer(app);
const port = process.env.PORT || 8080;
server.listen(port, () => {
	Log.info(`Server started at http://localhost:${port}`);
});

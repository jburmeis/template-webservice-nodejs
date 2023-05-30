import Log from "./logging";
import { ApplicationServices, createApplicationServices } from "./services/ApplicationServices";

export function applicationInit(): ApplicationServices {
	// Load config files, initialize data structures, etc...

	// Setup services
	const services = createApplicationServices();
	Log.info("Application init successful");

	return services;
}

export function applicationShutdown(): boolean {
	// Write files, close database connections, etc...

	Log.info("Application shutdown successful");
	return true;
}

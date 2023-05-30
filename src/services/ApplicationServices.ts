import DemoService from "./DemoService";

/**
 * The set of 'global' service instances that will be used throughout the application.
 * For example: Services that manage database connections, runtime information, etc...).
 */
export type ApplicationServices = {
	demoService: IDemoService;
};

/**
 * Exemplary interface for a demo service
 */
export interface IDemoService {
	getRandomMessages(length: number): string[];
}

/**
 * Creates a new set of instances of each application service
 */
export function createApplicationServices(): ApplicationServices {
	return {
		demoService: new DemoService(),
	};
}

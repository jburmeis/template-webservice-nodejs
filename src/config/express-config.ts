/**
 * This Module sets up the Express server configuration
 */

import cors from "cors";
import compression from "compression";
import express, { Application } from "express";
import helmet from "helmet";
import { setupRoutes } from "../routes";
import { ApplicationServices } from "../services/ApplicationServices";
import { createMorganMiddleware } from "./morgan-config";

export const createExpressApp = (appServices: ApplicationServices): Application => {
	const app = express();
	setupMiddlewares(app);
	setupRoutes(app, appServices);
	return app;
};

const setupMiddlewares = (app: Application) => {
	/**
	 * Middleware: Parse and check incoming request bodies encoded as JSON
	 */
	// Parse application/json in payload bodies
	app.use(express.json({ limit: "10mb" }));

	// Parse application/json encoded in URLs
	app.use(express.urlencoded({ limit: "1mb", extended: true }));

	/**
	 * Middleware: Compression (Compress outgoing data)
	 */
	// Add compression on all routes
	app.use(compression());

	/**
	 * Middleware: Helmet (Sets various HTTP headers to prevent common security issues)
	 */
	app.use(helmet());

	/**
	 * Middleware: CORS (Enable CORS)
	 */
	app.use(cors());

	/**
	 * Middleware: Morgan (HTTP logging)
	 */
	app.use(createMorganMiddleware());
};

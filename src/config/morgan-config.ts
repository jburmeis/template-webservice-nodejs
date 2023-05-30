/**
 * Morgan configuration (HTTP logging)
 * Documentation: https://github.com/expressjs/morgan
 */

import morgan, { StreamOptions } from "morgan";
import Log from "../logging";

const isDevelopment = process.env.NODE_ENV !== "production";

export function createMorganMiddleware() {
	// Route messages into the winston logger instance
	const stream: StreamOptions = {
		write: (message) => Log.http(message.trim()),
	};

	// Skip all messages if not in development mode
	const skip = () => {
		return !isDevelopment;
	};

	// Build middleware with message format
	const morganMiddleware = morgan(
		":method :url :status, :res[content-length] byte, :response-time ms",
		{ stream: stream, skip: skip }
	);

	return morganMiddleware;
}

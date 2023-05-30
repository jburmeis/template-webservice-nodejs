import express, { Request, Response } from "express";

/**
 * Bundle all routes and request handler functions of this group on a Router object
 */
export const rootRoutes = express
	.Router()
	.get("/", handleSimpleText)
	.get("/json", handleSimpleJson)
	.get("/json/:id", handleParameters)
	.get("/async", handleAsync);

// Example how to respond with plain text
function handleSimpleText(req: Request, res: Response) {
	res.send("Hello World!");
}

// Example how to respond with an object as application/json
function handleSimpleJson(req: Request, res: Response) {
	const jsonResponse = {
		id: 1,
		content: "Hello World!",
	};

	res.json(jsonResponse);
}

// Example how to process URL path and query parameters
function handleParameters(req: Request, res: Response) {
	// Path params - Example call: /api/json/my-id
	const { id } = req.params;
	// Query params - Example call: /api/json/my-id?value=3
	const { value } = req.query;

	const jsonResponse = {
		path: id,
		value: value,
		content: "Hello World",
	};

	res.json(jsonResponse);
}

// Example how to use async operations in an endpoint.
// Always use async for operations that cannot be completed immediately
// (e.g. reading files, networked database requests, etc...)
// to not block the event loop and thus the server operations.
//
// Try calling the endpoint, and verify in parallel with other
// API endpoint calls that the server is indeed not blocked.
async function handleAsync(req: Request, res: Response) {
	try {
		const startTime = Date.now();
		// Example: Wait for completion of a long-running task
		await new Promise((resolve) => setTimeout(resolve, 5000));
		res.json({ time: `Operation took ${Date.now() - startTime} ms` });
	} catch (error) {
		res.status(500).send(`Something went wrong: ${(error as Error).message}`);
	}
}

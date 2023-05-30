import express, { Request, Response, Router } from "express";
import { ApplicationServices } from "../services/ApplicationServices";

// Example how a set of routes can use the global applications services by dependency injection.
export function demoRoutes(appServices: ApplicationServices): Router {
	const { demoService } = appServices;

	const router = express.Router().get("/message", handleMessageRequest);

	function handleMessageRequest(req: Request, res: Response) {
		const numMessages = extractRequestPositiveIntegerParameter(req, "length");
		if (numMessages) {
			res.json(demoService.getRandomMessages(Math.min(numMessages, 5)));
		} else {
			res.sendStatus(400);
		}
	}

	return router;
}

//////////// Utility methods ////////////

function extractRequestPositiveIntegerParameter(
	req: Request,
	parameterKey: string
): number | undefined {
	const value = req.query[parameterKey];
	if (typeof value == "string") {
		const valueInt = Number.parseInt(value);
		if (Number.isFinite(valueInt) && valueInt > 0) {
			return valueInt;
		}
	}

	return undefined;
}

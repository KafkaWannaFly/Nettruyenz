import express from "express";
import { body, validationResult } from "express-validator";

export function emailPasswordValidators(): express.Handler[] {
	return [
		body("email").isEmail().normalizeEmail(),
		body("password").exists().trim().isLength({ min: 1 }),
		(
			req: express.Request,
			res: express.Response,
			next: express.NextFunction
		) => {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.status(400).json({ errors: errors.array() });
			}

			next();
		},
	];
}

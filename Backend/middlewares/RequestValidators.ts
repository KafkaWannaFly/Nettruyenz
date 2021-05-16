import express from "express";
import { body, validationResult } from "express-validator";

export function compose(middleware: express.Handler[]) {
	if (!middleware.length) {
		return function (
			_req: express.Request,
			_res: express.Response,
			next: express.NextFunction
		) {
			next();
		};
	}
	var head = middleware[0];
	var tail = middleware.slice(1);

	return function (
		req: express.Request,
		res: express.Response,
		next: express.NextFunction
	) {
		head(req, res, function (err: any) {
			if (err) return next(err);
			compose(tail)(req, res, next);
		});
	};
}

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

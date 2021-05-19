import express from "express";
import passport from "passport";
import { User, UserLevel } from "../models";

export function adminUser(): express.Handler[] {
	return [
		passport.authenticate("jwt", { session: false }),
		(req, res, next) => {
			const user = req.user as User;

			if (!user || user.level != UserLevel.moderator) {
				const error = "Unauthorized user";
				return res.status(401).json({ error });
			}
			next();
		},
	];
}

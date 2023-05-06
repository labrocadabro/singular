import lucia from "lucia-auth";
import { node } from "lucia-auth/middleware";
import prisma from "@lucia-auth/adapter-prisma";
import { PrismaClient } from "@prisma/client";

import { github } from "@lucia-auth/oauth/providers";

let db;
// if (process.env.NODE_ENV === "production") {
db = new PrismaClient();
// } else {
//   //check if there is already a connection to the database
//   /* eslint-disable */
//   // @ts-ignore
//   if (!global.db) {
//     // @ts-ignore
//     global.db = new PrismaClient();
//   }
//   // @ts-ignore
//   db = global.db;
// }
// /* eslint-enable */

export const auth = lucia({
	adapter: prisma(db),
	env: process.env.NODE_ENV === "development" ? "DEV" : "PROD",
	middleware: node(),
	transformDatabaseUser: (userData) => {
		return {
			userId: userData.id,
			username: userData.username,
		};
	},
});

export const githubAuth = github(auth, {
	clientId: process.env.GITHUB_ID ?? "",
	clientSecret: process.env.GITHUB_SECRET ?? "",
});

export type Auth = typeof auth;

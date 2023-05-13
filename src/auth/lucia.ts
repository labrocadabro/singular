import lucia from "lucia-auth";
import { node } from "lucia-auth/middleware";
import prisma from "@lucia-auth/adapter-prisma";
import { prisma as prismaClient } from "~/server/db";
import { github } from "@lucia-auth/oauth/providers";

export const auth = lucia({
	adapter: prisma(prismaClient),
	env: process.env.NODE_ENV === "development" ? "DEV" : "PROD",
	middleware: node(),
	transformDatabaseUser: (userData) => {
		return {
			userId: userData.id,
			username: userData.username,
			avatar: userData.avatar,
		};
	},
});

export const githubAuth = github(auth, {
	clientId: process.env.GITHUB_ID ?? "",
	clientSecret: process.env.GITHUB_SECRET ?? "",
});

export type Auth = typeof auth;

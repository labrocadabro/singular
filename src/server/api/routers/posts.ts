import { z } from "zod";
import type { RouterOutputs } from "~/utils/api";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const postRouter = createTRPCRouter({
	list: publicProcedure
		.input(z.object({ limit: z.number().default(0) }))
		.query(({ ctx, input }) => {
			return ctx.prisma.post.findMany({
				where: {
					parentId: null,
				},
				orderBy: {
					createdAt: "desc",
				},
				include: {
					_count: {
						select: {
							directChildren: true,
							likes: true,
						},
					},
					user: {
						select: {
							username: true,
						},
					},
				},
				take: input.limit,
			});
		}),
	// addPost creates a new post and also adds all the necessary parent-child links
	addPost: publicProcedure
		.input(
			z.object({
				body: z.string().max(20).min(1),
				parentId: z.string().optional(),
				userId: z.string(),
			})
		)
		.mutation(async ({ ctx, input }) => {
			// add the new post
			const newPost = ctx.prisma.post.create({
				data: {
					userId: input.userId,
					body: input.body,
					parentId: input.parentId ?? null,
				},
			});
			if (!input.parentId) return newPost;
			// if there is a parent id, then this is a comment
			// if this is a comment, it needs parent-child relationships so it can be correctly located in the comment chain
			const { id: postId } = await newPost;
			// a child's ancestors are all its parent's ancestors...
			const ancestors = await ctx.prisma.parentChild.findMany({
				select: { parentId: true },
				where: {
					childId: input.parentId,
				},
			});
			// ...plus its own parent
			ancestors.push({ parentId: input.parentId });
			// prepare the data to be added to the parentChild table
			const parentChildLinks = ancestors.map((ancestor) => ({
				childId: postId,
				parentId: ancestor.parentId,
			}));
			// add the data
			return ctx.prisma.parentChild.createMany({
				data: parentChildLinks,
			});
		}),
	byId: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
		const post = await ctx.prisma.post.findUnique({
			where: { id: input },
			include: {
				user: { select: { username: true } },
				children: {
					include: {
						child: { include: { user: { select: { username: true } } } },
					},
					orderBy: { createdAt: "desc" },
				},
				parents: {
					include: {
						parent: { include: { user: { select: { username: true } } } },
					},
					orderBy: { createdAt: "asc" },
				},
			},
		});
		// TODO: 404 here?
		if (!post) throw new Error();
		return {
			...post,
			children: post.children.map((child) => child.child),
			parents: post.parents.map((parent) => parent.parent),
		};
	}),
	getComments: publicProcedure
		.input(z.string())
		.query(async ({ ctx, input }) => {
			const post = await ctx.prisma.post.findUnique({
				where: { id: input },
				include: {
					directChildren: {
						include: {
							_count: {
								select: {
									directChildren: true,
									likes: true,
								},
							},
							user: {
								select: {
									username: true,
								},
							},
						},
						orderBy: {
							createdAt: "desc",
						},
					},
				},
			});
			if (!post) return;
			return post.directChildren;
		}),
});

export type PostWithCounts = RouterOutputs["posts"]["list"][0];

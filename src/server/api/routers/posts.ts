import { z } from "zod";

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
        },
        take: input.limit,
      });
    }),
  addPost: publicProcedure
    .input(z.string().max(20).min(1))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.post.create({
        data: {
          accountId: "clgrlczy00000h13ir4lvltn1",
          body: input,
        },
      });
    }),
  byId: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
    const post = await ctx.prisma.post.findUnique({
      where: { id: input },
      include: {
        children: { include: { child: true } },
        parents: true,
      },
    });
    if (!post) return;
    return { ...post, children: post.children.map((child) => child.child) };
  }),
});

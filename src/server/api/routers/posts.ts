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
        include: {
          directChildren: true,
        },
        orderBy: {
          createdAt: "desc",
        },
        take: input.limit,
      });
    }),
  addPost: publicProcedure
    .input(z.string().max(20).min(1))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.post.create({
        data: {
          accountId: "clgqdi7vw0000h1sz2sq7s11y",
          body: input,
        },
      });
    }),
  byId: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.prisma.post.findUnique({ where: { id: input } });
  }),
});

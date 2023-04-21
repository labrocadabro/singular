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
});

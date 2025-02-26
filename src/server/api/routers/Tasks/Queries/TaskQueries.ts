import { publicProcedure } from "~/server/api/trpc";
import { z } from "zod";

export const TaskQueries = {
  getTasksByProjectName: publicProcedure
    .input(z.object({ projectName: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.tasks.findMany({
        where: { projectName: input.projectName },
      });
    }),
};
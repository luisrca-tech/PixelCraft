import { z } from "zod";
import { publicProcedure } from "~/server/api/trpc";

export const AbsencesQueries = {
  getAbsencesByProjectName: publicProcedure
    .input(z.object({ projectName: z.string() }))
    .query(async ({ ctx, input }) => {
      const absences = await ctx.db.absences.findMany({
        where: {
          task: {
            projectName: input.projectName,
          },
        },
        include: {
          task: true,
        },
      });

      return absences;
    }),

  getAbsencesByTaskId: publicProcedure
    .input(z.object({ taskId: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.absences.findMany({
        where: {
          taskId: input.taskId,
        },
        select: {
          month: true,
          absences: true,
          year: true,
        },
      });
    }),
};

import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { taskSchema } from "../schemas/task.schema";

export const TaskRouter = createTRPCRouter({
  createTask: publicProcedure
    .input(taskSchema)
    .mutation(async ({ ctx, input }) => {
      const {
        name,
        role,
        hours,
        valueByHour,
        startDate,
        endDate,
        estimatedValue,
        estimatedHours,
        absences,
      } = input;

      // Upsert using ID if found
      const task = await ctx.db.tasks.upsert({
        where: {
          id: input.taskId,
        },
        update: {
          hours,
          valueByHour,
          startDate,
          endDate,
          estimatedValue,
        },
        create: {
          id: input.taskId,
          name,
          role,
          hours,
          valueByHour,
          startDate,
          endDate,
          estimatedValue,
        },
      });

      // Handle absences if they exist
      if (absences && absences.length > 0) {
        // Delete existing absences for this task
        await ctx.db.absences.deleteMany({
          where: { taskId: task.id },
        });

        // Create new absences
        await ctx.db.absences.createMany({
          data: absences.map((absence) => {
            if (!absence.month) throw new Error("Month is required");
            const parts = absence.month.split("-");
            if (parts.length !== 2) throw new Error("Invalid month format");

            return {
              taskId: task.id,
              taskName: name,
              taskRole: role,
              month: parseInt(parts[0] as string),
              year: parseInt(parts[1] as string),
              absences: absence.absences,
              workedHours: hours - absence.absences,
              totalValue: (hours - absence.absences) * valueByHour,
            };
          }),
        });
      }

      return task;
    }),

  getTaskWithAbsences: publicProcedure
    .input(z.object({ taskId: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.tasks.findUnique({
        where: { id: input.taskId },
        include: { Absences: true },
      });
    }),

  findTaskByNameAndRole: publicProcedure
    .input(
      z.object({
        name: z.string(),
        role: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      return ctx.db.tasks.findFirst({
        where: {
          name: input.name,
          role: input.role,
        },
      });
    }),
});

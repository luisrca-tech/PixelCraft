import { publicProcedure } from "~/server/api/trpc";
import { taskSchema } from "../schemas/taskSchema";
import { updateTaskNameInDbSchema } from "../schemas/updateTaskNameInDbSchema";
import { deleteDbTaskSchema } from "~/server/schemas/deleteDbTask.schema";

export const TaskMutations = {
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
        absences,
      } = input;

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
          projectName: input.projectName,
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
          projectName: input.projectName,
        },
      });

      if (absences && absences.length > 0) {
        await ctx.db.absences.deleteMany({
          where: { taskId: task.id },
        });

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

  updateTaskNameInDb: publicProcedure
    .input(updateTaskNameInDbSchema)
    .mutation(async ({ ctx, input }) => {
      const { taskId, name } = input;
      const task = await ctx.db.tasks.update({
        where: {
          id: taskId,
        },
        data: {
          name,
        },
      });

      return task;
    }),

  deleteTaskInDb: publicProcedure.input(deleteDbTaskSchema).mutation(async ({ ctx, input }) => {
    const { taskId } = input;
    const deleteTask = await ctx.db.tasks.delete({
      where: {
        id: taskId
      },
    })
    return deleteTask
  }),



};

import { publicProcedure } from "~/server/api/trpc";
import { absencesInputSchema } from "../schemas/absence.schema";

export const AbsencesMutations = ({
  upsertAbsences: publicProcedure
    .input(absencesInputSchema)
    .mutation(async ({ ctx, input }) => {
      const { absencesForTask } = input;

      if (!absencesForTask.length) {
        throw new Error("No absences provided");
      }

      const task = await ctx.db.tasks.findUnique({
        where: { id: absencesForTask[0]?.taskId },
        select: {
          id: true,
          hours: true,
          valueByHour: true,
          name: true,
          role: true,
        },
      });

      if (!task) {
        throw new Error("Task not found");
      }

      const results = await Promise.all(
        absencesForTask.map(async (absence) => {
          if (!absence.month) throw new Error("Month is required");
          const parts = absence.month.split("-");
          if (parts.length !== 2) throw new Error("Invalid month format");

          const month = parseInt(parts[0] as string);
          const year = parseInt(parts[1] as string);

          const absenceHours = Number(absence.absences);
          const workedHours = task.hours - absenceHours;
          const totalValue = workedHours * task.valueByHour;

          return ctx.db.absences.upsert({
            where: {
              taskId_month_year: {
                taskId: task.id,
                month,
                year,
              },
            },
            update: {
              absences: absenceHours,
              workedHours,
              totalValue,
            },
            create: {
              id: `${task.id}-${month}-${year}`,
              taskId: task.id,
              month,
              year,
              absences: absenceHours,
              workedHours,
              totalValue,
              taskName: task.name,
              taskRole: task.role,
            },
          });
        })
      );

      return results;
    }),
});

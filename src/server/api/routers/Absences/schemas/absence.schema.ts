import { z } from "zod";

export const absenceSchema = z.object({
  taskId: z.string(),
  month: z.string(),
  absences: z.coerce.number().min(0).default(0),
});

export const absencesInputSchema = z.object({
  absencesForTask: z.array(absenceSchema),
});

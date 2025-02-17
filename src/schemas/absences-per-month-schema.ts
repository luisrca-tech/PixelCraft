import { z } from "zod";

export const absenceSchema = z.object({
  absencesForTask: z.array(
    z.object({
      taskId: z.string(),
      month: z.string().regex(/^\d{2}-\d{4}$/),
      absences: z
        .string()
        .refine(
          (value) => value === "" || /^\d+$/.test(value),
        ),
    })
  ),
});


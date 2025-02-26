import { z } from "zod";
import { absenceSchema } from "../../Absences/schemas/absence.schema";

export const taskSchema = z.object({
  taskId: z.string(),
  projectName: z.string(),
  name: z.string().default("Sem nome"),
  role: z.string().default("Sem cargo"),
  hours: z.coerce.number().min(0, "Horas devem ser maior que 0").default(0),
  valueByHour: z.coerce
    .number()
    .min(0, "Valor por hora deve ser maior que 0")
    .default(0),
  startDate: z.date(),
  endDate: z.date(),
  estimatedValue: z.coerce
    .number()
    .min(0, "Valor estimado deve ser maior que 0")
    .default(0),
  estimatedHours: z.coerce
    .number()
    .min(0, "Horas estimadas devem ser maior que 0")
    .default(0),
  absences: z.array(absenceSchema).default([]),
});

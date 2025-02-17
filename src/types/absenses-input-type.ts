import { type z } from "zod";
import { type absenceSchema } from "~/schemas/absences-per-month-schema";


export type AbsencesData = z.infer<typeof absenceSchema>;
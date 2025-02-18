import type { z } from "zod";
import type { absenceSchema } from "../schemas/absence.schema";

export type Absence = z.infer<typeof absenceSchema>;
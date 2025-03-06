import type { z } from "zod";
import type { taskSchema } from "../schemas/taskSchema";

export interface TaskWithAbsences {
  id: string;
  name: string;
  role: string;
  hours: number;
  valueByHour: number;
  startDate: Date;
  endDate: Date;
  estimatedValue: number;
  estimatedHours: number;
  Absences: {
    id: string;
    month: number;
    year: number;
    absences: number;
    workedHours: number;
    totalValue: number;
    taskId: string;
  }[];
}

export type Task = z.infer<typeof taskSchema>;

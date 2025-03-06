import { z } from "zod";

export const updateTaskInClickupSchema = z.object({
    userId: z.string(),
    Dates: z.object({
        startDate: z.date().optional(),
        endDate: z.date().optional(),
    }),
    taskId: z.string().optional(),
})
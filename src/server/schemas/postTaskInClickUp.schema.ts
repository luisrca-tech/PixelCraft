import { z } from "zod";

export const postTaskInClickUpSchema = z.object({
    userId: z.string(),
    row: z.string().optional(),
    Dates: z.object({
        startDate: z.date().optional(),
        endDate: z.date().optional(),
    }),
})
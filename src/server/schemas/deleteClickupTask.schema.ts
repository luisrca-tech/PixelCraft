import { z } from "zod";

export const deleteClickupTaskSchema = z.object({
    userId: z.string(),
    taskId: z.string().optional(),
})
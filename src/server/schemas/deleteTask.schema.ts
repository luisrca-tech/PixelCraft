import { z } from "zod";

export const deleteTaskSchema = z.object({
    userId: z.string(),
    taskId: z.string().optional(),
})
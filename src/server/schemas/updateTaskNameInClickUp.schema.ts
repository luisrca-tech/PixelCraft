import { z } from "zod";

export const updateTaskNameInClickUpSchema = z.object({
    userId: z.string(),
    taskIds: z.array(z.string()).optional(),
    names: z.array(z.string()).optional(),
})
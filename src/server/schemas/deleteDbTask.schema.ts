import { z } from "zod";

export const deleteDbTaskSchema = z.object({
    taskId: z.string(),
});
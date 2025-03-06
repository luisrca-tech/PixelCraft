import { z } from "zod";

export const updateTaskNameInDbSchema = z.object({
    taskId: z.string(),
    name: z.string(),
});

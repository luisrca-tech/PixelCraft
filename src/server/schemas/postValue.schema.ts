import { z } from "zod";

export const postValueSchema = z.object({
    postTaskId: z.string(),
    valueFieldId: z.string().optional(),
    valueFieldSelectedValue: z.number().optional(),
    userId: z.string(),
})
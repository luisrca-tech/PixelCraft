import { z } from "zod";

export const postHourPMonthSchema = z.object({
    postTaskId: z.string(),
    hoursPerMonthCustomFieldId: z.string().optional(),
    hoursPMonthFieldSelectedValue: z.number().optional(),
    userId: z.string(),
})
import { z } from "zod";

export const postChargeSchema = z.object({
    postTaskId: z.string(),
    chargeFieldId: z.string().optional(),
    chargeFieldSelectedValue: z.number().optional(),
    userId: z.string(),
})
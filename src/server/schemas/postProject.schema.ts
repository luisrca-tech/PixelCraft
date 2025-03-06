import { z } from "zod";

export const postProjectSchema = z.object({
  postTaskId: z.string(),
  userId: z.string(),
  projectFieldId: z.string().optional(),
  projectFieldSelectedValue: z.string().optional(),
})

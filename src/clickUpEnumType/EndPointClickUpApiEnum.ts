import { z } from "zod";

export const EndPointClickUpApiEnum = z.enum(["field", "task"]);

export type EndPointClickUpApiEnum = z.infer<typeof EndPointClickUpApiEnum>;

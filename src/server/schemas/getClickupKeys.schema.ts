import { z } from "zod";

export const getClickUpKeysSchema = z.object({ userId: z.string() })
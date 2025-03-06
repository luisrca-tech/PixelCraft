import { z } from "zod";
import { EndPointClickUpApiEnum } from "~/clickUpEnumType/EndPointClickUpApiEnum";

export const getTasksInClickupSchema = z.object({ endPoint: EndPointClickUpApiEnum, userId: z.string() })
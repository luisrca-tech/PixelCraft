import { z } from "zod";
import { EndPointClickUpApiEnum } from "~/clickUpEnumType/EndPointClickUpApiEnum";

export const getCustomFieldsSchema = z.object({ endPoint: EndPointClickUpApiEnum, userId: z.string() })
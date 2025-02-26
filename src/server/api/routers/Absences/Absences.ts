import { createTRPCRouter } from "../../trpc";
import { AbsencesMutations } from "./Mutations/AbsencesMutation";
import { AbsencesQueries } from "./Queries/AbsencesQueries";

export const AbsencesRouter = createTRPCRouter({
  ...AbsencesMutations,
  ...AbsencesQueries,
});

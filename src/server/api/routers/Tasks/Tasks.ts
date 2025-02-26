import { createTRPCRouter } from "../../trpc";
import { TaskMutations } from "./Mutations/TasksMutation";
import { TaskQueries } from "./Queries/TaskQueries";

export const TasksRouter = createTRPCRouter({
  ...TaskMutations,
  ...TaskQueries,
});

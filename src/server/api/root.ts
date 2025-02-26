import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { clickupRouter } from "./routers/clickup";
import { userRouter } from "./routers/user";
import { AbsencesRouter } from "./routers/Absences";
import { TasksRouter } from "./routers/Tasks/Tasks";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  clickup: clickupRouter,
  user: userRouter,
  task: TasksRouter,
  absences: AbsencesRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);

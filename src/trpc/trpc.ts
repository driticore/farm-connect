import { ExpressContext } from "@/server";
import { initTRPC } from "@trpc/server";

const t = initTRPC.context<ExpressContext>().create()
export const router = t.router

//means anyone can call this api
export const publicProcedure = t.procedure
//This is our backend
//router is a util that lets use define custom typesave api endpoints
import { authRouter } from "./auth-router"
import { router } from "./trpc"

export const appRouter = router({
    auth: authRouter
})

export type AppRouter = typeof appRouter
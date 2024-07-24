import * as trpcExpress from "@trpc/server/adapters/express";
import express from "express";
import { getPayloadClient } from "./get-payload";
import { nextApp, nextHandler } from "./next-utils";
import { appRouter } from "./trpc";
import { inferAsyncReturnType } from "@trpc/server";

const app = express();
const PORT = Number(process.env.PORT) || 3000;

// Create TRPC context
const createContext = ({ req, res }: trpcExpress.CreateExpressContextOptions) => ({
  req,
  res,
});

export type ExpressContext = inferAsyncReturnType<typeof createContext>

const start = async () => {
  try {
    // Initialize Payload CMS
    const payload = await getPayloadClient({
      initOptions: {
        express: app,
        onInit: async (cms) => {
          cms.logger.info(`Admin URL: ${cms.getAdminURL()}`);
        },
      },
    });

    // Setup TRPC middleware
    app.use('/api/trpc', trpcExpress.createExpressMiddleware({
      router: appRouter,
      createContext,
    }));

    // Handle Next.js requests
    app.use((req, res) => nextHandler(req, res));

    // Prepare Next.js
    await nextApp.prepare();
    payload.logger.info(`Next.js started`);

    // Start the server
    app.listen(PORT, () => {
      payload.logger.info(`Server running at ${process.env.NEXT_PUBLIC_SERVER_URL}`);
    });
  } catch (error) {
    console.error('Error starting the server:', error);
  }
};

start();

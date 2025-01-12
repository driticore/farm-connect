import dotenv from "dotenv";
import nodemailer from "nodemailer";
import path from "path";
import payload, { Payload } from "payload";
import type { InitOptions } from "payload";

// Load environment variables from .env file
dotenv.config({
    path: path.resolve(__dirname, "../.env"),
});

// Create nodemailer transporter
const transporter = nodemailer.createTransport({
    host: "smtp.resend.com",
    port: 465,
    secure: true, // Use SSL
    auth: {
        user: "resend",
        pass: process.env.RESEND_API_KEY,
    },
});

// Create a cached object to store the Payload client and promise
let cached = (global as any).payload;

if (!cached) {
    cached = (global as any).payload = {
        client: null,
        promise: null,
    };
}

interface Args {
    initOptions?: Partial<InitOptions>;
}

// Function to get the Payload client
export const getPayloadClient = async ({ initOptions }: Args = {}): Promise<Payload> => {
    if (!process.env.PAYLOAD_SECRET) {
        throw new Error("PAYLOAD_SECRET is missing");
    }

    if (cached.client) {
        return cached.client;
    }

    if (!cached.promise) {
        cached.promise = payload.init({
            email: {
                transport: transporter,
                fromAddress: "onboarding@resend.dev",
                fromName: "FarmConnect",
            },
            secret: process.env.PAYLOAD_SECRET,
            local: true, // Explicitly set to `true` for local development
            ...initOptions, // Pass additional init options
        });
    }

    try {
        cached.client = await cached.promise;
    } catch (e: unknown) {
        cached.promise = null;
        throw e;
    }

    return cached.client;
};

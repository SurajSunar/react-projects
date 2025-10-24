import { createAuthClient } from "better-auth/react";

const authClient = createAuthClient({
  baseURL: process.env.BETTER_AUTH_BASE_URL || "http://localhost:3000",
});

export const { signIn, signOut, signUp, useSession } = authClient;

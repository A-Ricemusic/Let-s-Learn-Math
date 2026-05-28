import type { AuthConfig } from "convex/server";

const clerkIssuer = "https://hot-python-18.clerk.accounts.dev";

export default {
  providers: [
    {
      type: "customJwt",
      issuer: clerkIssuer,
      jwks: `${clerkIssuer}/.well-known/jwks.json`,
      algorithm: "RS256",
      applicationID: "convex",
    },
  ],
} satisfies AuthConfig;

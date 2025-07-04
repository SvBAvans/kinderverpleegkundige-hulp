// file: ~/next-auth.d.ts
import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  /* Returned by `useAuth`, `getSession` and `getServerSession` */
  interface Session extends DefaultSession {
    user: {
      firstName: string;
      userId: string;
      email: string;
    };
  }
}

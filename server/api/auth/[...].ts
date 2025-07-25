import { NuxtAuthHandler } from "#auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export default NuxtAuthHandler({
  secret: useRuntimeConfig().authSecret,

  pages: {
    signIn: "/login",
  },

  providers: [
    //@ts-expect-error
    CredentialsProvider.default({
      authorize: async (credentials: { email: string | undefined; password: string | undefined }, req: any) => {
        if (!credentials.email || !credentials.password) {
          createError({ statusCode: 400, statusMessage: "Email or password is invalid" });
          return null;
        }

        const user = await usePrisma().user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user) {
          createError({ statusCode: 400, statusMessage: "Email or password is invalid" });
          return null;
        }

        const equal = await bcrypt.compare(credentials.password, user.password_hash);
        if (!equal) {
          createError({ statusCode: 400, statusMessage: "Email or password is invalid" });
          return null;
        }

        return user;
      },
    }),
  ],

  callbacks: {
    async session({ session, token }) {
      // Return the modified session
      return {
        ...session,
        user: {
          firstName: token.name,
          userId: token.sub,
          email: token.email,
        },
      };
    },
  },
});

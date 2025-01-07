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

        console.log("Checking credentials", credentials);

        const user = await usePrisma().user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user) {
          console.log("No user found");
          createError({ statusCode: 400, statusMessage: "Email or password is invalid" });
          return null;
        }

        console.log("User found", user);

        console.log(`Comparing password ${credentials.password} with hash ${user.password_hash}`);
        const equal = await bcrypt.compare(credentials.password, user.password_hash);
        if (!equal) {
          console.log("Doesn't match");
          createError({ statusCode: 400, statusMessage: "Email or password is invalid" });
          return null;
        }
        console.log("Matches");

        return user;
      },
    }),
  ],
});

import bcrypt from "bcryptjs";
import Credentials from "next-auth/providers/credentials";
import { type NextAuthConfig } from "next-auth";

import { LoginSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";

// Notice this is only an object, not a full Auth.js instance
export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const user = await getUserByEmail(email);
          if (!user || !user.password) {
            return null;
          }

          const isPasswordMatching = await bcrypt.compare(
            password,
            user.password
          );

          if (isPasswordMatching) return user;

          return null;
        }

        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;

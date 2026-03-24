import { AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import userLogin from "@/libs/userLogIn"

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials) return null;

        const user = await userLogin(
          credentials.email, 
          credentials.password
        )

        if (user) return user;
        return null;
      }
    })
  ],

  session: { strategy: "jwt" },

  callbacks: {
  async jwt({ token, user }) {
    if (user) {
      token._id = (user as any)._id
      token.role = (user as any).role
      token.token = (user as any).token
    }
    return token
  },

  async session({ session, token }) {
    if (session && session.user) {
      (session.user as any)._id = token._id as string
      (session.user as any).role = token.role as string
      (session.user as any).token = token.token as string
    }
    return session
  }
}
}
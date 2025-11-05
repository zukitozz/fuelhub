import NextAuth, { NextAuthOptions } from "next-auth"
import CognitoProvider from "next-auth/providers/cognito"


export const authOptions: NextAuthOptions = {
  providers: [
    CognitoProvider({
        clientId: process.env.COGNITO_CLIENT_ID!,
        clientSecret: process.env.COGNITO_CLIENT_SECRET!,
        issuer: process.env.COGNITO_ISSUER!,
    }),
    // ...add more providers here
  ],
  pages: {
    signIn: '/auth',
  }, 
}
console.log("Cognito Provider Configured with:");
console.log(authOptions);
const handler = NextAuth(authOptions)

export {handler as GET, handler as POST}

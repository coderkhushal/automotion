import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
      Google({
          clientId: process.env.GOOGLE_CLIENT_ID ?? '',
          clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
        }),
  
    ],
    
      // session: {
      //     strategy :"jwt"
      // },
      // callbacks: {
      //     async session({session, token}) {
      //         if(session.user){
      //             //@ts-ignore
      //             session.accessToken = token.accessToken;
      //             //@ts-ignore
      //             session.user = token.user;
      //         }
      //         return session;
      //     },
      //     async jwt({ token, account }) {
      //         if (account) {
      //           token.accessToken = account.access_token;
      //           token.refreshToken = account.refresh_token;
      //           //@ts-ignore
      //           token.accessTokenExpires = Date.now() + account.expires_in * 1000;
      //           token.user = account;
      //         }
      //         return token;
      //       },
      // },
      session: { strategy: "jwt" },
      debug: true,
      // callback url
      
        


      
      

  
  });
  



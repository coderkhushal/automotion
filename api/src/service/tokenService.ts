import axios from "axios"
import { DbManager } from "../db"

export class TokenService{
    private static instance: TokenService
    private constructor(){

    }
    public static getInstance(): TokenService{
        if(!TokenService.instance){
            TokenService.instance = new TokenService()
        }
        return TokenService.instance
    }

    async getToken (userId: string) {
        const token = await DbManager.getInstance().getClient().token.findUnique({
            where: {
                userId
            }
        })
        return token

    }

    async storeToken ({userId, accessToken, refreshToken, accessTokenExpires}:{userId: string, accessToken: string, refreshToken:string, accessTokenExpires:string})  {
        await DbManager.getInstance().getClient().token.upsert({
          where: { userId },
          update: { accessToken, refreshToken, accessTokenExpires },
          create: { userId, accessToken, refreshToken, accessTokenExpires },
        });
      };

    async refreshAccessToken(refreshToken: string){
        try {
            const response = await axios.post('https://oauth2.googleapis.com/token', null, {
              params: {
                client_id: process.env.GOOGLE_CLIENT_ID,
                client_secret: process.env.GOOGLE_CLIENT_SECRET,
                refresh_token: refreshToken,
                grant_type: 'refresh_token',
              },
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
              },
            });
        
            const refreshedTokens = response.data;
            return {
              accessToken: refreshedTokens.access_token,
              accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
              refreshToken: refreshedTokens.refresh_token ?? refreshToken,
            };
          } catch (error) {
            console.error('Error refreshing access token', error);
            throw new Error('Unable to refresh access token');
          }
    }
}
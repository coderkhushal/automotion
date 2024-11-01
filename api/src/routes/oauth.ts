
import { Request, Response, Router } from "express";


import axios from "axios";
import { TokenService } from "../service/tokenService";

const router = Router();
router.post('/', async (req: Request, res: Response) => {
    const { code } = req.body;

    try {
      const response = await axios.post('https://oauth2.googleapis.com/token', null, {
        params: {
          client_id: process.env.GOOGLE_CLIENT_ID,
          client_secret: process.env.GOOGLE_CLIENT_SECRET,
          code,
          grant_type: 'authorization_code',
          redirect_uri: 'http://localhost:3000/api/auth/callback/google',
        },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
  
      const { access_token, refresh_token, expires_in } = response.data;
  
      // Store tokens in the database
      const userId = req.session?.user?.id; // Get user ID from session
      if (userId) {
        await TokenService.getInstance().storeToken({userId,accessToken:  access_token,refreshToken: refresh_token, accessTokenExpires: (Date.now() + expires_in * 1000).toString()});
      }
  
      // Redirect user back to the previous page
      const redirectUrl = req.query.state || '/';
      res.redirect(redirectUrl as string);
    } catch (error) {
      console.error('Error during Google OAuth callback', error);
      res.status(500).send('Authentication failed');
    }
  });

export { router as googleauthRouter };
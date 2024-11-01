"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.googleauthRouter = void 0;
const express_1 = require("express");
const axios_1 = __importDefault(require("axios"));
const tokenService_1 = require("../service/tokenService");
const router = (0, express_1.Router)();
exports.googleauthRouter = router;
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { code } = req.body;
    try {
        const response = yield axios_1.default.post('https://oauth2.googleapis.com/token', null, {
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
        const userId = (_b = (_a = req.session) === null || _a === void 0 ? void 0 : _a.user) === null || _b === void 0 ? void 0 : _b.id; // Get user ID from session
        if (userId) {
            yield tokenService_1.TokenService.getInstance().storeToken({ userId, accessToken: access_token, refreshToken: refresh_token, accessTokenExpires: (Date.now() + expires_in * 1000).toString() });
        }
        // Redirect user back to the previous page
        const redirectUrl = req.query.state || '/';
        res.redirect(redirectUrl);
    }
    catch (error) {
        console.error('Error during Google OAuth callback', error);
        res.status(500).send('Authentication failed');
    }
}));

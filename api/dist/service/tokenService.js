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
exports.TokenService = void 0;
const axios_1 = __importDefault(require("axios"));
const db_1 = require("../db");
class TokenService {
    constructor() {
    }
    static getInstance() {
        if (!TokenService.instance) {
            TokenService.instance = new TokenService();
        }
        return TokenService.instance;
    }
    getToken(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = yield db_1.DbManager.getInstance().getClient().token.findUnique({
                where: {
                    userId
                }
            });
            return token;
        });
    }
    storeToken(_a) {
        return __awaiter(this, arguments, void 0, function* ({ userId, accessToken, refreshToken, accessTokenExpires }) {
            yield db_1.DbManager.getInstance().getClient().token.upsert({
                where: { userId },
                update: { accessToken, refreshToken, accessTokenExpires },
                create: { userId, accessToken, refreshToken, accessTokenExpires },
            });
        });
    }
    ;
    refreshAccessToken(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const response = yield axios_1.default.post('https://oauth2.googleapis.com/token', null, {
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
                    refreshToken: (_a = refreshedTokens.refresh_token) !== null && _a !== void 0 ? _a : refreshToken,
                };
            }
            catch (error) {
                console.error('Error refreshing access token', error);
                throw new Error('Unable to refresh access token');
            }
        });
    }
}
exports.TokenService = TokenService;

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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailerService = void 0;
const nodemailer = require('nodemailer');
require("dotenv").config();
class MailerService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.NODEMAILER_HOST || 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.NODEMAILER_USER,
                pass: process.env.NODEMAILER_PASS
            }
        });
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new MailerService();
        }
        return this.instance;
    }
    sendMail(to, subject, text) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.transporter.sendMail({
                    from: process.env.NODEMAILER_USER,
                    to,
                    subject,
                    text
                });
                console.log("sent email");
            }
            catch (err) {
                console.log(err);
            }
        });
    }
}
exports.MailerService = MailerService;

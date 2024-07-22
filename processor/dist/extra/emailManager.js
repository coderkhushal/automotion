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
exports.EmailMangaer = void 0;
const nodemailer = require("nodemailer");
require("dotenv").config();
class EmailMangaer {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // Use `true` for port 465, `false` for all other ports
            auth: {
                user: process.env.NODEMAILER_USER,
                pass: process.env.NODEMAILER_PASS,
            },
        });
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new EmailMangaer();
        }
        return this.instance;
    }
    sendEmail(emails, subject, body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const info = yield this.transporter.sendMail({
                    from: 'khushalbhasin4488@gmail.com', // sender address
                    to: emails.join(","), // list of receivers
                    subject: subject, // Subject line
                    text: body, // plain text body
                    html: "<b>Testing</b>", // html body
                });
                return true;
            }
            catch (err) {
                console.log(err);
                return false;
            }
        });
    }
}
exports.EmailMangaer = EmailMangaer;

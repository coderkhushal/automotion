const nodemailer = require('nodemailer')
require("dotenv").config()
export class MailerService {
    private static instance : MailerService
    private transporter : any
    private constructor(){
        this.transporter = nodemailer.createTransport({
            host: process.env.NODEMAILER_HOST || 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.NODEMAILER_USER,
                pass: process.env.NODEMAILER_PASS
            }
        })
    }
    public static getInstance(){
        if(!this.instance){
            this.instance = new MailerService()
        }
        return this.instance
    }
    public async sendMail(to: string, subject: string, text: string){
        try{

            await this.transporter.sendMail({
                from: process.env.NODEMAILER_USER,
                to,
                subject,
                text
            })
            console.log("sent email")
        }
        catch(err){
            console.log(err)
        }
    }

}

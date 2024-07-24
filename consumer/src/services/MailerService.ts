const nodemailer = require('nodemailer')
require("dotenv").config()
export class MailerService {
    private static instance : MailerService
    private transporter : any
    private constructor(){
 
    }
    public static getInstance(){
        if(!this.instance){
            this.instance = new MailerService()
        }
        return this.instance
    }
    public async sendMail(SMTP_USER: string, SMTP_PASS: string, SMTP_HOST:string, to: string, subject: string, text: string){
        try{
            this.transporter = await nodemailer.createTransport({
                host: SMTP_HOST || 'smtp.gmail.com',
                port: 587,
                secure: false,
                auth: {
                    user: SMTP_USER ,
                    pass: SMTP_PASS
                }
            })
            await this.transporter.sendMail({
                from: SMTP_USER,
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

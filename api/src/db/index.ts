import { PrismaClient } from '@prisma/client'
export class DbManager{

    private static instance : DbManager
    private client : any
    private constructor(){
        this.client = new PrismaClient()
    }
    public static getInstance(){
        if(!this.instance){
            this.instance= new DbManager()
        }
        return this.instance
    }
    public getClient(){
        return this.client
    }
    
}
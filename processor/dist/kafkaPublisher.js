"use strict";
// import { Kafka} from "kafkajs"
// export class KafkaPublisher{
//     private static instance: KafkaPublisher
//     private kafka  : Kafka
//     private producer
//     private isConnected: boolean = false
//     private topic = "kafka-task"
//     private BufferedData: any[]
//     private constructor(){
//         this.kafka = new Kafka({
//             clientId: 'my-app',
//             brokers: ['localhost:9092']
//         }) 
//         this.producer= this.kafka.producer()
//         this.BufferedData = []
//         this.connectToKafka()
//     }
//     public static getInstance(){
//         if(!this.instance){
//             this.instance= new KafkaPublisher()
//         }
//         return this.instance
//     }
//     private async connectToKafka(){
//         await this.producer.connect()
//         this.isConnected= true;
//         this.BufferedData.forEach((e)=>{
//             this.publishData(e)
//         })
//     }
//     public publishData(data: any){
//         if(!this.isConnected){
//             this.BufferedData.push(data)
//             return;
//         }
//         console.log("connected and sending")
//         this.producer.send({
//             topic: this.topic,
//             messages:[{ 
//                 value: JSON.stringify(data)
//             }]    
//         })
//     }
// }

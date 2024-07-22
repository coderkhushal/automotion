// import { Kafka } from "kafkajs";
// import { MailerService } from "./services/MailerService";


// async function consume() {
//     const kafka = new Kafka({
//         clientId: "my-app",
//         brokers: ["kafkaservice:9092"]
//     })
//     const consumer = kafka.consumer({ groupId: "demo" });
//     const admin = kafka.admin()
//     try{

//         await admin.connect()
        
//         await admin.createTopics({
//             topics: [
//                 {
//                     topic: "kafka-task",
//                     numPartitions: 1,
//                 },
//             ],
//         })
        
//         await consumer.connect();
//         await consumer.subscribe({ topic: "kafka-task", fromBeginning: true, 
        
//     });
//     await consumer.run({
//         eachMessage: async ({ topic, partition, message }) => {
//             console.log(message)
//             if (message.value?.toString()) {

//                 const value = JSON.parse(message.value?.toString())
//                 switch (value.action.type.name) {
//                     case "email":
//                         try{
                            
//                             await MailerService.getInstance().sendMail(value.metadata.to, value.metadata.subject, value.metadata.text)
//                         }
//                         catch(err){
//                             console.log(err)
//                         }
//                         break;
//                     default:
//                         break;
//                 }
                
//             }
//         }
//     })
//     console.log("running")
// }

// catch(er){
//     console.log("error" ,er)
// }
// }
// consume()
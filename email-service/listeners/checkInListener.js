const { Kafka, logLevel } = require('kafkajs');
const { sendMailCheckIn } = require('../services/SendEmailService');

    const kafka = new Kafka({
        clientId: 'my-app',
        brokers:['localhost:9092'],
        // logLevel:logLevel.WARN,
        // retry:{
        //     initialRetryTime:300,
        //     retries: 10
        // }
      });
    
    const consumer = kafka.consumer({
        groupId:"checkin-group"
    })
    const topic = 'checkin-topic'

    const listenerCheckIn = async () =>{

    await consumer.connect();
    
    await consumer.subscribe({ topic, fromBeginning: true });
    
    await consumer.run({
        eachMessage: async ({topic, partition, message})=>{
            // console.log(JSON.parse(message.value).id)
            await sendMailCheckIn(JSON.parse(message.value).id);
        }
    })

}

module.exports = listenerCheckIn;

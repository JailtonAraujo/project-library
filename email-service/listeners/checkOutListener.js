const { sendMailCheckOut } = require ('../services/SendEmailService');
const { Kafka } = require("kafkajs");

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
    groupId:"checkout-group"
})
const topic = 'checkout-topic'

const listenerCheckOut = async () =>{

await consumer.connect();

await consumer.subscribe({ topic, fromBeginning: true });

await consumer.run({
    eachMessage: async ({topic, partition, message})=>{
        // console.log(JSON.parse(message.value).id)
        await sendMailCheckOut(JSON.parse(message.value).id);
    }
})

}

module.exports = listenerCheckOut;
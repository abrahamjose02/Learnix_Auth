import { Channel,connect,Connection } from "amqplib";
import rabbitMQConfig from "../config/rabbitMQ";
import Producer from "./producer";
import Consumer from "./consumer";

class RabbitMQClient{
    private static instance:RabbitMQClient;
    private isInitalized = false

    private producer:Producer | undefined;
    private consumer:Consumer | undefined;
    private connection:Connection | undefined;
    private producerChannel:Channel | undefined;
    private consumerChannel:Channel | undefined;

    private constructor(){}

    public static getInstance(){
        if(!this.instance){
            this.instance = new RabbitMQClient();
        }
        return this.instance
    }

    async initalize(){
        if(this.isInitalized){
            return ;
        }

        try {
            this.connection = await connect(rabbitMQConfig.rabbitMQ.url)

        this.producerChannel = await this.connection.createChannel();
        this.consumerChannel = await this.connection.createChannel();

        const {queue:rpcQueue} = await this.consumerChannel.assertQueue(
            rabbitMQConfig.rabbitMQ.queue.authQueue,
            {exclusive:true}
        );

        this.producer = new Producer(this.producerChannel)
        this.consumer = new Consumer(this.consumerChannel,rpcQueue)

        this.consumer.consumeMessages()

        this.isInitalized = true
        } catch (e:any) {
            console.log('rabbitMQ error ...',e)
        }

    }

    async produce(data:any,correlationId:string,replyToQueue:string){
        if(!this.initalize){
            await this.initalize();
        }
        return await this.producer?.produceMessages(data,correlationId,replyToQueue)
    }
}

export default RabbitMQClient.getInstance();

import { Channel } from "amqplib";


class Producer{
    constructor(private channel:Channel){}

    async produceMessages(data:any,correlationId:string,replyToQueue:string){
        return this.channel.sendToQueue(replyToQueue,Buffer.from(JSON.stringify(data)),{
            correlationId
        });
    }
}

export default Producer
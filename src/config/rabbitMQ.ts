
import 'dotenv/config'

export default {
        rabbitMQ:{
            url:String(process.env.RabbitMQ_link),
            queue:{
                authQueue:'auth_queue'
            }
        }
}
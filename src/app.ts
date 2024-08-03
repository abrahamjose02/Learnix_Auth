
import RabbitMQClient from './rabbitMQ/client';

class App{
    constructor(){
        RabbitMQClient.initalize();
    }
}
export default App
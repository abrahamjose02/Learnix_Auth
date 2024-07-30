import { AuthController } from "../controller/auth.Controller";
import rabbitClient from './client'


const authController = new AuthController()

export default class MessageHandler{
   static async handle(
        operation:string,
        data:any,
        correlationId:string,
        replyTo:string
    ){
        let response = data;
        try {
            console.log('The operation in auth Service is ',operation,data)
        switch(operation){
            case 'isAuthenticated' :
                response = await authController.isAuthenticated(data);
                break;

            case 'verifyToken' :
                response = await authController.verifyToken(data);
                break;

            default:
                response = 'Request-key not found'
                break;
        }
        } catch (e:any) {
            console.log(e)
        }
        await rabbitClient.produce(response,correlationId,replyTo)
    }
}
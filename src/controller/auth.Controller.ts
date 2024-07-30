import jwt,{Secret} from "jsonwebtoken";
import 'dotenv/config'

export class AuthController{
    async isAuthenticated(data:{token:string}){
        try {
            const token = data.token || ""
            const decode :any = jwt.verify(token,process.env.ACCESS_TOKEN as Secret);
            if(!decode){
                throw new Error('Invalid Token')
            }
            return {userId:decode.id,role:decode.role}
        } catch (e:any) {
            throw new Error(e)
        }
    }
    async verifyToken(data:{token:string}){
        try {
            const refreshtoken = data.token as string;
            const decode:any = jwt.verify(refreshtoken,process.env.REFRESH_TOKEN as Secret);
            if(!decode){
                throw new Error('Invalid Token')
            }
            const refreshToken = jwt.sign({id:decode.id,role:decode.role},process.env.REFRESH_TOKEN as Secret,{
                expiresIn:'5m'
            })
            const accessToken = jwt.sign({id:decode.id,role:decode.role},process.env.ACCESS_TOKEN as Secret,{
                expiresIn:'3d'
            })
            return {accessToken,refreshToken}

        } catch (e:any) {
            throw new Error(e)
        }
    }
}
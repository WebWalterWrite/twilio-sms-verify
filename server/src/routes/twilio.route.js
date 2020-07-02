import { Router } from 'express';
import { phoneVerify } from '../controllers/twilio.controller';

const route = Router();

route.use((req, res, next)=>{
        res.header("Access-Control-Allow-Origin",  req.headers.origin);
        res.header("Access-Control-Allow-Headers", "Content-Type, Accept, Access-Control-Allow-Headers, Authorization, X-Requested-With, Origin");
        res.header("Access-Control-Allow-Methods", "GET,HEAD,POST,PUT,DELETE,OPTIONS");
        res.header("Access-Control-Allow-Credentials", "true");
        next()
});


route.post('/verifications', phoneVerify)

export default route;
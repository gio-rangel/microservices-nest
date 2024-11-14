import { ArgumentsHost, Catch, RpcExceptionFilter } from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";
import { Observable } from "rxjs";

@Catch(RpcException)
export class RcpCustomExceptionFilter implements RpcExceptionFilter<RpcException> {
    catch(
        exception: RpcException, 
        host: ArgumentsHost
    ): Observable<any> {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const rcpError = exception.getError();

        if(
            typeof rcpError === 'object' &&
            'status' in rcpError &&
            'message' in rcpError
        ) {
            const status = isNaN(+rcpError.status) ? 400 : +rcpError.status; 

            return response.status(status).json(rcpError); 
        }
    }
}
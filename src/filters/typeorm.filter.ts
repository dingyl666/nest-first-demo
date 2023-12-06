import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { QueryFailedError, TypeORMError } from 'typeorm';

@Catch()
export class TypeormFilter implements ExceptionFilter {
  catch(exception: TypeORMError, host: ArgumentsHost) {
    
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    // const status = exception.getStatus();
    let code = 500 ;
    if(exception instanceof QueryFailedError) {
      code = exception.driverError.errno
    }

    response.status(500).json({
      statusCode: code,
      timestamp: new Date().toISOString(),
      path: request.url,
      messgae:exception.message
    });
  }
}

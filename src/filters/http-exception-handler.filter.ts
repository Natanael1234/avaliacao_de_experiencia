import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionHandlerFilter<T> implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    let status;
    const message = exception.message;
    let errors;
    let code;
    let errno;
    let name;
    let sqlMessage;
    if (!exception['status']) {
      if (exception['sqlMessage']) {
        status = 400;
        code = exception['code'];
        errno = exception['errno'];
        name = exception['name'];
        sqlMessage = exception['sqlMessage'];
      } else {
        status = 500;
      }
    } else {
      status = exception.getStatus();
      errors = exception?.getResponse()['errors'];
    }

    response
      .status(status)
      .json({
        statusCode: status,
        code,
        errno,
        name,
        sqlMessage,
        message,
        errors
        // timestamp: new Date().toISOString(),
        // path: request.url,
      });
  }
}

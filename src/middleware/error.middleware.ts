import { NextFunction, Request, Response } from 'express';
import { InternalServerError } from '../errors/internal-server-error.error';

function logErrorMiddleware(error: Error, _request: Request, _response: Response, next: NextFunction) {
  const _error = (<any>error);
  if (!_error.status) {
    return next(new InternalServerError(_error.message, _error.data));
  } else {
    return next(error);
  }
}

export default logErrorMiddleware;
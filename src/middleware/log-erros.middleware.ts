
import { NextFunction, Request, response, Response } from 'express';

function logErrorMiddleware(error: Error, _request: Request, response: Response, _next: NextFunction) {    
    const _error = (<any>error);
    const status = _error.status ? _error.status : 500;
    const message = _error.message || 'Ocorreu um erro';    
    console.error('Erro ' + status + ' - ' + message + '.');
    console.error(error.stack);
    response.status(status).send({status, message});
}

export default logErrorMiddleware;
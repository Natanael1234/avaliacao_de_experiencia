"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function logErrorMiddleware(error, _request, response, _next) {
    var _error = error;
    var status = _error.status ? _error.status : 500;
    var message = _error.message || 'Ocorreu um erro';
    console.error('Erro ' + status + ' - ' + message + '.');
    console.error(error.stack);
    response.status(status).send({ status: status, message: message });
}
exports.default = logErrorMiddleware;

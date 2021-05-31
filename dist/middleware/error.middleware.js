"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var internal_server_error_error_1 = require("../errors/internal-server-error.error");
function logErrorMiddleware(error, _request, _response, next) {
    var _error = error;
    if (!_error.status) {
        return next(new internal_server_error_error_1.InternalServerError(_error.message));
    }
    else {
        return next(_error);
    }
}
exports.default = logErrorMiddleware;

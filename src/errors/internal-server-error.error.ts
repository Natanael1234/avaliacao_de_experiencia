import { HttpError } from "./http.error";

/** Erro 500 - Internal Server Error. */
export class InternalServerError extends HttpError {

    constructor(message?: any, data?: any) {
        super(message || 'Internal server error', 500, data);
    }
}
import { HttpError } from "./http.error";

/** Erro 404 - Not found. */
export class NotFoundError extends HttpError {

    constructor(message?: any, data?: any) {
        super(message || 'Not found', 404, data);
    }
}
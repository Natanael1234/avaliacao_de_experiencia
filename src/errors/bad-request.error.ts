import { HttpError } from "./http.error";

/** Erro 400 - Bad request. */
export class BadRequestError extends HttpError {

    constructor(message?: any, data?: any) {
        super(message || 'Bad request', 400, data);
    }
}
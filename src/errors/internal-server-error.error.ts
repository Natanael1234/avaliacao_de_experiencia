import { HttpError } from "./http.error";

/** Erro 500 - Internal Server Error. */
export class InternalServerError extends HttpError {

    constructor(message?: string) {
        super(message || 'Internal server error', 500);
    }
}
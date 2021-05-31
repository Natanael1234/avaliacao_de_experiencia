import { HttpError } from "./http.error";

/** Erro 404 - Not found. */
export class NotFoundError extends HttpError {

    constructor(message?: string) {
        super(message || 'Not found', 404);
    }
}
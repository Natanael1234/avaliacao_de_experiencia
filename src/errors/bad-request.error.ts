import { HttpError } from "./http.error";

/** Erro 400 - Bad request. */
export class BadRequestError extends HttpError {

    constructor(message?: string) {
        super(message || 'Bac request', 400);
    }
}
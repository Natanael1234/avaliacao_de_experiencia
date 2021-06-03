export class HttpError extends Error {
    status: number;
    data: any;
    constructor(message: any, status?: number, data?: any) {
        super(message);
        this.status = status || 500;
        this.data = data;
    }
}
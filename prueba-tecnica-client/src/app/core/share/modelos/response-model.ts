export interface ResponseModel<T> {
    response: T;
    message: string;
    errors: string[];
    size: number;
}
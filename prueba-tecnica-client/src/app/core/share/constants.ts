import { HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";

export class Constants {
    public static USER_SESSION = 'user-session';

    public static ApiUrl: string = environment.ApiUrl;

    public static headersJson = new HttpHeaders({
        'Content-Type': 'application/json',
        'accept': '*/*',
    });

    public static getUrlController(methodName) {
        return [Constants.ApiUrl, methodName].join('/');
    }
}


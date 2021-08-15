import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export class BaseService<T> {
    // APIS
    // public ApiUrl: string = "https://ut-api.herokuapp.com/api-ut/api";
    public ApiUrl: string = environment.ApiUrl;
    // public ApiUrl: string = "http://localhost:8080/api-ut/api";

    // HEADERS

    public headersJson = new HttpHeaders({
        'Content-Type': 'application/json',
        'accept': '*/*',
    });

    public headersCaptcha = new HttpHeaders({
        'Content-Type': 'application/json',
        'accept': '*/*',
        'Access-Control-Allow-Origin': '*',
    });

    constructor(
        protected http: HttpClient,
        protected apiController: string) {
    }

    get path(): string {
        return [this.ApiUrl, this.apiController].join('/');
    }

    public pathParam(param: any): string {
        return [this.path, param].join('/');
    }

    public pathParamCustom(nameMethod: string, param?: any): string {
        if (param) {
            return [this.path, nameMethod, param].join('/');
        } else {
            return [this.path, nameMethod].join('/');
        }
    }

    protected validate(): void {
        if (!this.ApiUrl) {
            throw 'Debe configurar la variable ApiUrl!!';
        }
    }

    public getApiUrl(): string {
        return this.ApiUrl;
    }

    getAll(): Observable<any> {
        return this.http.get(this.path, { headers: this.headersJson });
    }

    getOne(id: number): Observable<any> {
        return this.http.get(this.pathParam(id), { headers: this.headersJson });
    }

    put(id: any, model: T): Observable<any> {
        return this.http.put([this.ApiUrl, id].join('/'), model, { headers: this.headersJson });
    }

    post(model: T): Observable<any> {
        return this.http.post(this.path, model, { headers: this.headersJson });
    }

    delete(id: number): Observable<any> {
        return this.http.delete(this.pathParam(id), { headers: this.headersJson });
    }

    getCustom(nameMethod: string, param: any): Observable<any> {
        return this.http.get(this.pathParamCustom(nameMethod, param), { headers: this.headersJson });
    }

    postCustom(nameMethod: string, param: any): Observable<any> {
        return this.http.post(this.pathParamCustom(nameMethod), param, { headers: this.headersJson });
    }

}

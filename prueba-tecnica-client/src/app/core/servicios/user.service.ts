import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserModel } from '../share/modelos/user-model';
import { UserController_Login, UserController_Sing_Up } from './name-controllers';
import { Constants } from '../share/constants';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    protected http: HttpClient
  ) {
  }

  login(credentials: UserModel): Observable<any> {
    return this.http.post(
      Constants.getUrlController(UserController_Login),
      JSON.stringify(credentials),
      { headers: Constants.headersJson });
  }

  singUp(model): Observable<any> {
    return this.http.post(
      Constants.getUrlController(UserController_Sing_Up),
      model,
      { headers: Constants.headersJson });
  }

}

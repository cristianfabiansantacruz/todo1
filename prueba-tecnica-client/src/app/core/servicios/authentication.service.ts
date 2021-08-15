import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Constants } from "../share/constants";
import { UserSessionModel } from '../share/modelos/user-model'

@Injectable({
  providedIn: "root"
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<UserSessionModel>;
  public currentUser: Observable<UserSessionModel>;

  constructor() {

    this.currentUserSubject = new BehaviorSubject<UserSessionModel>(
      JSON.parse(localStorage.getItem(Constants.USER_SESSION))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): UserSessionModel {
    return this.currentUserSubject.value;
  }

  login(user: any) {
    localStorage.setItem(Constants.USER_SESSION, JSON.stringify(user));
    this.currentUserSubject.next(user);
    return user;
  }

  logout() {
    localStorage.removeItem(Constants.USER_SESSION);
    this.currentUserSubject.next(null);
  }

  getUser(): UserSessionModel {
    return JSON.parse(localStorage.getItem(Constants.USER_SESSION));
  }

  updateUser(user: any) {
    localStorage.setItem(Constants.USER_SESSION, JSON.stringify(user));
  }

  // getToken(): string {
  //   return localStorage.getItem(Constants.TOKEN);
  // }

  // setToken(token: string): void {
  //   localStorage.setItem(Constants.TOKEN, token);
  // }
}

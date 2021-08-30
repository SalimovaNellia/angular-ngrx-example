import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { RegisterRequestInterface } from 'src/app/auth/types/registerRequest.interface';
import { CurrentUserInterface } from 'src/app/shared/types/currentUser.interface';
import { AuthResponseInterface } from 'src/app/auth/types/authResponse.interface';
import { LoginRequestInterface } from 'src/app/auth/types/loginRequest.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  public getUser(response: AuthResponseInterface): CurrentUserInterface {
    return response.user;
  }

  public register(data: RegisterRequestInterface): Observable<CurrentUserInterface> {
    return this.http
      .post<AuthResponseInterface>(environment.apiUrl + '/users', data)
      .pipe(map(this.getUser))
  }

  public login(data: LoginRequestInterface): Observable<CurrentUserInterface> {
    return this.http
      .post<AuthResponseInterface>(environment.apiUrl + '/users/login', data)
      .pipe(map(this.getUser))
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(login: string, password: string) {
    const o = {
      login,
      pass: password
    };
    return this.http.post<LoginDto>(environment.backendUrl + 'login', o);
  }
}

export interface LoginDto {
  token: string;
  role: string;
}
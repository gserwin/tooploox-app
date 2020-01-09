import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  getUsersList() {
    return this.http.get<UsersDto[]>(environment.backendUrl + 'usersList');
  }

  saveUser(user: UserDto) {
    return this.http.post<any>(environment.backendUrl + 'user/' + user.id, user, {responseType: 'text'});
  }

}

export interface UsersDto {
  id: number;
  login: string;
  name: string;
  role: string;
}

export interface UserDto {
  id: number;
  name: string;
  role: string;
}
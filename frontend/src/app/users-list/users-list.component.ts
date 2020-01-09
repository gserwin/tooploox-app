import { Component, OnInit } from '@angular/core';
import { UsersService } from './users.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  $users: Observable<any>;
  role: string;
  editing: UserModel;

  constructor(private usersService: UsersService) { }

  ngOnInit() {
    this.$users = this.usersService.getUsersList();
    this.role = localStorage.role;
  }

  async save(user: UserModel) {
    const result = await this.usersService.saveUser(user).toPromise();
    if (result === 'OK') {
      this.editing = null;
    }
  }

}

interface UserModel {
  id: number;
  name: string;
  role: string;
}

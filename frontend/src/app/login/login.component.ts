import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  login = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) { }

  submit($event) {
    $event.preventDefault();
    this.authService.login(this.login, this.password).subscribe(result => {
      if (result.token) {
        localStorage.setItem('token', result.token);
        localStorage.setItem('role', result.role);
        this.router.navigate(['usersList']);
      }
    }, error => {
      // TODO: add toaster to show error
      console.log('bad login or password', error);
    });
  }

}

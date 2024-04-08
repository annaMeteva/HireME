import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { emitDistinctChangesOnlyDefaultValue } from '@angular/compiler';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private userService: UserService, private router: Router) {
  }

  login(form: NgForm) {
    if (form.valid) {
      const inputEmail = form.value.inputEmail.trim();
      const password = form.value.password.trim();
      this.userService.login(inputEmail, password).subscribe({
        next: (response) => {
          console.log('Login successful', response);
          //const userId = response.user_id;
          this.router.navigate(['/jobs']);
        },
        error: (error) => {
          console.error('Login failed', error);
        }
      });
      console.log('Login data', form.value);
    }
  }
}

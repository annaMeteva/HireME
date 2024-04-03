import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private userService: UserService, private router: Router) {
  }

  login(form: NgForm) {
    if (form.invalid) { return; }

    const { email, password } = form.value;
    this.userService.login(email, password).subscribe(() => {
      this.router.navigate(['/jobs']);
    });
  }
}

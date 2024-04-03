import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { matchPasswordsValidator } from 'src/app/shared/utils/match-passwords-validator';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    companyName: ['', [Validators.required]],
    phone: ['', [Validators.required]],
    address: [''],
    regNum: ['', [Validators.required, Validators.pattern("")]],
    passwordGroup: this.fb.group({
      password: ['', [Validators.required]],
      password2: ['', [Validators.required]]
    },
      {
        validators: [matchPasswordsValidator('password', 'password2')],
      })
  });

  constructor(private fb: FormBuilder, private userService: UserService,
    private router: Router) { }

  get passGroup() {
    return this.form.get('passwordGroup');
  }

  register() {
    if (this.form.invalid) {
      return;
    }
    const {
      email,
      companyName,
      phone,
      address,
      regNum,
      passwordGroup: { password, password2 } = {},
    } = this.form.value;

    this.userService.register(email!,
      companyName!,
      phone!,
      address!,
      regNum!, password!, password2!).subscribe(() => {
        this.router.navigate(['/jobs']);
      });
  }
}

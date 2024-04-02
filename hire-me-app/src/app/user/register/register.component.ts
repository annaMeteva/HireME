import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { matchPasswordsValidator } from 'src/app/shared/utils/match-passwords-validator';

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

  constructor(private fb: FormBuilder) { }

  get passGroup() {
    return this.form.get('passwordGroup');
  }
  register(): void {
    if (this.form.invalid) {
      return;
    }
  }
}

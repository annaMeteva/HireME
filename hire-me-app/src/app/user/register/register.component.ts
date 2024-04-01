import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  form = this.fb.group({
    email: [Validators.required, Validators.email],
    companyName: [Validators.required],
    phone: [Validators.required],
    address: [Validators.required],
    regNum: [Validators.required, Validators.pattern("")],
    passwordGroup: this.fb.group({
      password: [Validators.required],
      password2: [Validators.required]
    })
  });

  constructor(private fb: FormBuilder) { }

  register(): void {
    if (this.form.invalid) {
      return;
    }
  }
}

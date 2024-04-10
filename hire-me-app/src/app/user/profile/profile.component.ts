import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ProfileDetails, User, UserForAuth } from 'src/app/types/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileDetails: ProfileDetails = {
    email: '',
    companyName: "",
    phoneNumber: "",
    address: "",
    regNum: ""
  }
  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    companyName: ['', [Validators.required]],
    phoneNumber: ['', [Validators.required]],
    address: ['', [Validators.required]],
    regNum: [{ value: '', disabled: true }, [Validators.required]],
  });

  constructor(private fb: FormBuilder, private userService: UserService) { }

  ngOnInit(): void {

    this.userService.getProfileDetails().subscribe((d) => {
      this.profileDetails = d;
      this.form.setValue({
        email: this.profileDetails.email,
        companyName: this.profileDetails.companyName,
        phoneNumber: this.profileDetails.phoneNumber,
        address: this.profileDetails.address,
        regNum: this.profileDetails.regNum
      });
    });
  }
  saveProfileHandle(): void {
    if (this.form.invalid) {
      return;
    }

    this.profileDetails = this.form.value as ProfileDetails;
    const { email,
      companyName,
      phoneNumber,
      address,
      regNum } = this.profileDetails;

    this.userService.updateProfile(email,
      companyName,
      phoneNumber,
      address,
      regNum)
      .subscribe(() => {
        console.log("Change profile details successful.")
      });
  }
};

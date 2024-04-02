import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-create-job',
  templateUrl: './create-job.component.html',
  styleUrls: ['./create-job.component.css']
})
export class CreateJobComponent {
  form = this.fb.group({
    title: ['', [Validators.required]],
    jobNature: ['Full-time'],
    location: ['', [Validators.required]],
    salary1: ['', [Validators.required]],
    salary2: [''],
    qualifications: ['', Validators.maxLength(200)],
    description: ['', Validators.maxLength(200)],
  });
  constructor(private apiService: ApiService, private fb: FormBuilder) {
  }
  createJob() {
    // let salary: string = "$" + inputSalary1;
    // if (typeof inputSalary2 != 'undefined' && inputSalary2 != '') {
    //   salary += "-$" + inputSalary2;
    // }
    // this.apiService.createJob(inputTitle, inputJobNature, inputLocation, salary, inputQualifications, inputDescription).subscribe((data) => {
    //   console.log({ data });
    // })
  }
}

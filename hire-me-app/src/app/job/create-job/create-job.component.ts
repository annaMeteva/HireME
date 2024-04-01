import { Component } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-create-job',
  templateUrl: './create-job.component.html',
  styleUrls: ['./create-job.component.css']
})
export class CreateJobComponent {
  constructor(private apiService: ApiService,) {
  }

  createJob(ev: Event, inputTitle: string,
    inputJobNature: string,
    inputLocation: string,
    inputSalary1: string,
    inputSalary2: string,
    inputQualifications: string,
    inputDescription: string) {
    let salary: string = "$" + inputSalary1;
    if (typeof inputSalary2 != 'undefined' && inputSalary2 != '') {
      salary += "-$" + inputSalary2;
    }
    this.apiService.createJob(inputTitle, inputJobNature, inputLocation, salary, inputQualifications, inputDescription).subscribe((data) => {
      console.log({ data });
    })
  }
}

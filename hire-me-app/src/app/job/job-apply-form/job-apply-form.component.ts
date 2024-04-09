import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { Job } from 'src/app/types/job';

@Component({
  selector: 'app-job-apply-form',
  templateUrl: './job-apply-form.component.html',
  styleUrls: ['./job-apply-form.component.css']
})
export class JobApplyFormComponent implements OnInit {
  job = {} as Job;

  constructor(private apiService: ApiService,
    private activeRoute: ActivatedRoute
    , private router: Router) {
  }

  ngOnInit(): void {
    this.activeRoute.params.subscribe((data) => {
      const id = data['jobId'];
      this.apiService.getJob(id).subscribe((job) => {
        this.job = job;
      });
    });
  }

  apply(form: NgForm) {
    if (form.valid) {
      const {
        inputName,
        inputEmail,
        inputPhone,
        inputPortfolio,
        inputCoverletter
      } = form.value;
      this.apiService.createApply(inputName.trim(), inputEmail.trim(), inputPhone, inputPortfolio, inputCoverletter, this.job._id).subscribe({
        next: (response) => {
          this.router.navigate(['/applies/' + this.job._id]);
          console.log('Create apply successful', response);
        },
        error: (error) => {
          console.error('Create apply failed', error);
        }
      })
    }
  }
}

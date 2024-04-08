import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { Job } from 'src/app/types/job';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.css']
})
export class JobDetailComponent implements OnInit {
  job = {} as Job;

  constructor(
    private apiService: ApiService,
    private activeRoute: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) { }
  ngOnInit(): void {
    this.activeRoute.params.subscribe((data) => {
      const id = data['jobId'];

      this.apiService.getJob(id).subscribe((job) => {
        this.job = job;
      });
    });
  }

  get isLoggedIn(): boolean {
    return this.userService.isLoggedIn;
  }
  deleteJob(job_id: string) {
    this.apiService.deleteJob(job_id).subscribe({
      next: (response) => {
        this.router.navigate(['/jobs']);
        console.log('Delete job successful', response);
      },
      error: (error) => {
        console.error('Delete job failed', error);
      }
    })
  }
  apply(form: NgForm) {
    if (form.invalid) { return; }
  }
}

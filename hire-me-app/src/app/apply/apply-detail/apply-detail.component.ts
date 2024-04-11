import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { Apply } from 'src/app/types/apply';
import { Job } from 'src/app/types/job';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-apply-detail',
  templateUrl: './apply-detail.component.html',
  styleUrls: ['./apply-detail.component.css']
})
export class ApplyDetailComponent implements OnInit {
  apply = {} as Apply;
  job = {} as Job;

  constructor(
    private apiService: ApiService,
    private activeRoute: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activeRoute.params.subscribe((data) => {
      const id = data['applyId'];

      this.apiService.getApply(id).subscribe((apply) => {
        this.apply = apply;
        this.apiService.getJob(apply._jobId).subscribe((job) => {
          this.job = job;
        })
      });
    });
  }

  deleteApply(apply_id: string) {
    this.apiService.deleteApply(apply_id).subscribe({
      next: (response) => {
        this.router.navigate(['/applies']);
        console.log('Delete apply successful', response);
      },
      error: (error) => {
        console.error('Delete apply failed', error);
      }
    });
  }
}


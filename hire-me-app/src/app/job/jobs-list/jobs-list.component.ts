import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { Job } from 'src/app/types/job';
import { UserService } from 'src/app/user/user.service';


@Component({
  selector: 'app-jobs-list',
  templateUrl: './jobs-list.component.html',
  styleUrls: ['./jobs-list.component.css']
})
export class JobsListComponent implements OnInit {
  jobs: Job[] | null = [];
  // isLoading: boolean = true;
  constructor(private apiService: ApiService, private userService: UserService,
    private activeRoute: ActivatedRoute, private router: Router) { }

  get isLoggedIn(): boolean {
    return this.userService.isLoggedIn;
  }

  ngOnInit(): void {
    this.activeRoute.params.subscribe((data) => {
      const id = data['categoryId'];
      if (id !== undefined) {
        this.apiService.getJobsByCategoryId(id).subscribe((jobs) => {
          this.jobs = jobs;
          console.log(jobs);
        });
      } else {
        this.apiService.getJobs().subscribe((jobs) => {
          this.jobs = jobs;
        });
      }
    });
  }
  navigateToJobDetails(id: string) {
    if (this.router.url.includes("search")) {
      this.router.navigate(['../../' + id], { relativeTo: this.activeRoute });
    }
    else {
      this.router.navigate(['/' + id], { relativeTo: this.activeRoute });
    }
  }
}

import { Component, OnInit } from '@angular/core';
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

  constructor(private api: ApiService, private userService: UserService) { }

  get isLoggedIn(): boolean {
    return this.userService.isLoggedIn;
  }

  ngOnInit(): void {
    this.api.getJobs().subscribe((jobs) => {
      this.jobs = jobs;
      // setTimeout(() => {
      //   this.isLoading = false;
      // }, 1000);
    });
  }
}

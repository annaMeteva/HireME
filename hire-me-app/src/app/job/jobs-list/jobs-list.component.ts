import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Job } from 'src/app/types/job';

@Component({
  selector: 'app-jobs-list',
  templateUrl: './jobs-list.component.html',
  styleUrls: ['./jobs-list.component.css']
})
export class JobsListComponent implements OnInit {
  jobs: Job[] | null = [];
  // isLoading: boolean = true;

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.api.getJobs().subscribe((jobs) => {
      this.jobs = jobs;
      console.log(jobs);
      // setTimeout(() => {
      //   this.isLoading = false;
      // }, 1000);
    });
  }
}

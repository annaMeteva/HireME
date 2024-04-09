import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { Apply } from 'src/app/types/apply';
import { Job } from 'src/app/types/job';

@Component({
  selector: 'app-applies-list',
  templateUrl: './applies-list.component.html',
  styleUrls: ['./applies-list.component.css']
})
export class AppliesListComponent implements OnInit {
  job = {} as Job;
  applies: Apply[] | null = [];
  constructor(
    private apiService: ApiService,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) { }
  ngOnInit(): void {
    this.activeRoute.params.subscribe((data) => {
      const id = data['jobId'];
      this.apiService.getJob(id).subscribe((job) => {
        this.job = job;
      });
      this.apiService.getApplies(id).subscribe((applies) => {
        this.applies = applies.filter((a => a._jobId === id));
      })
    });
  }
}

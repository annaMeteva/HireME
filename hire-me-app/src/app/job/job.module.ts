import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobsListComponent } from './jobs-list/jobs-list.component';
import { RouterModule } from '@angular/router';
import { JobRoutingModule } from './job-routing.module';
import { JobDetailComponent } from './job-detail/job-detail.component';
import { CreateJobComponent } from './create-job/create-job.component';



@NgModule({
  declarations: [
    JobsListComponent,
    JobDetailComponent,
    CreateJobComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    JobRoutingModule
  ]
})
export class JobModule { }

import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { JobsListComponent } from "./jobs-list/jobs-list.component";
import { JobDetailComponent } from "./job-detail/job-detail.component";
import { CreateJobComponent } from "./create-job/create-job.component";
import { AuthActivate } from "../guards/auth.activate";

const routes: Routes = [
    // {
    //     path: 'jobs',
    //     children: [
    //         { path: '', pathMatch: 'full', component: JobsListComponent },
    //         { path: ':jobId', component: JobDetailComponent },
    //         { path: 'create', component: CreateJobComponent },
    //     ],
    // },
    {
        path: 'jobs',
        children: [
            { path: '', pathMatch: 'full', component: JobsListComponent },
            { path: ':jobId', component: JobDetailComponent },
        ],
    },
    {
        path: 'create-job',
        component: CreateJobComponent,
        canActivate: [AuthActivate],
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ],
})
export class JobRoutingModule {
}
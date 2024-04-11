import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { JobsListComponent } from './jobs-list/jobs-list.component';
import { JobDetailComponent } from "./job-detail/job-detail.component";
import { CreateJobComponent } from "./create-job/create-job.component";
import { AuthActivate } from "../guards/auth.activate";
import { AppliesListComponent } from "./applies-list/applies-list.component";
import { JobApplyFormComponent } from "./job-apply-form/job-apply-form.component";
import { EditJobComponent } from "./edit-job/edit-job.component";

const routes: Routes = [
    {
        path: 'jobs',
        children: [
            { path: '', pathMatch: 'full', component: JobsListComponent },
            { path: 'search/:categoryId', component: JobsListComponent },
            { path: ':jobId', component: JobDetailComponent },
        ],
    },
    {
        path: 'create-job',
        component: CreateJobComponent,
        canActivate: [AuthActivate],
    },
    {
        path: 'edit-job/:jobId', component: EditJobComponent,
        canActivate: [AuthActivate]
    },
    {
        path: 'create-apply/:jobId', component: JobApplyFormComponent,
        canActivate: [AuthActivate]
    },
    {
        path: 'applies/:jobId', component: AppliesListComponent,
        canActivate: [AuthActivate]
    },
    // {
    //     path: 'apply',
    //     children: [
    //         { path: '', pathMatch: 'full', component: AppliesListComponent },
    //         { path: ':applyId', component: JobDetailComponent }
    //     ],
    // },
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
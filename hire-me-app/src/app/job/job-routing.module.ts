import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { JobsListComponent } from "./jobs-list/jobs-list.component";
import { JobDetailComponent } from "./job-detail/job-detail.component";

const routes: Routes = [
    {
        path: 'jobs',
        children: [
            { path: '', pathMatch: 'full', component: JobsListComponent },
            { path: ':jobId', component: JobDetailComponent },
        ],
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
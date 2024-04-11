import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthActivate } from "../guards/auth.activate";
import { AppliesListComponent } from "./applies-list/applies-list.component";
import { EditApplyComponent } from "./edit-apply/edit-apply.component";
import { CreateApplyComponent } from "./create-apply/create-apply.component";
import { ApplyDetailComponent } from "./apply-detail/apply-detail.component";

const routes: Routes = [
    {
        path: 'applies',
        children: [
            { path: '', pathMatch: 'full', component: AppliesListComponent },
            { path: ':jobId', component: AppliesListComponent },
        ],
    },
    {
        path: 'create-apply/:jobId', component: CreateApplyComponent,
        canActivate: [AuthActivate]
    },
    {
        path: 'edit-apply/:applyId', component: EditApplyComponent,
        canActivate: [AuthActivate]
    }, {
        path: 'apply/:applyId', component: ApplyDetailComponent,
        canActivate: [AuthActivate]
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
export class ApplyRoutingModule {
}
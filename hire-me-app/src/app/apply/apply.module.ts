import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplyRoutingModule } from './apply-rounting.module';
import { Router, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateApplyComponent } from './create-apply/create-apply.component';
import { EditApplyComponent } from './edit-apply/edit-apply.component';
import { AppliesListComponent } from './applies-list/applies-list.component';
import { AppRoutingModule } from '../app-routing.module';
import { ApplyDetailComponent } from './apply-detail/apply-detail.component';



@NgModule({
  declarations: [
    CreateApplyComponent, EditApplyComponent, AppliesListComponent, ApplyDetailComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    AppRoutingModule,
    ApplyRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ApplyModule { }

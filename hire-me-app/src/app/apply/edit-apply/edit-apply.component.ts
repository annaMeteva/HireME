import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { Apply } from 'src/app/types/apply';
import { Job } from 'src/app/types/job';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-edit-apply',
  templateUrl: './edit-apply.component.html',
  styleUrls: ['./edit-apply.component.css']
})
export class EditApplyComponent implements OnInit {
  apply = {} as Apply;
  job = {} as Job;

  form = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    phone: [''],
    portfolioLink: [''],
    coverletter: ['', [Validators.required, Validators.maxLength(300)]]
  });

  constructor(private apiService: ApiService, private fb: FormBuilder, private router: Router, private userService: UserService,
    private activeRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activeRoute.params.subscribe((data) => {
      const id = data['applyId'];
      this.apiService.getApply(id).subscribe((apply) => {
        this.apply = apply;
        this.form.setValue({
          name: apply.name,
          email: apply.email,
          phone: apply.phone || "",
          portfolioLink: apply.portfolioLink || "",
          coverletter: apply.coverletter
        });
        this.apiService.getJob(apply._jobId).subscribe((job) => {
          this.job = job;
        })
      });
    });
  }
  updateApply() {
    if (this.form.invalid) {
      return;
    }
    const { name, email, phone, portfolioLink, coverletter } = this.form.value;
    this.apiService.updateApply(this.apply._id, name!, email!, phone || "", portfolioLink || "", coverletter!).subscribe({
      next: (response) => {
        this.router.navigate(['applies/']);
        console.log('Update apply successful', response);
      },
      error: (error) => {
        console.error('Update apply failed', error);
      }
    });
  }
}

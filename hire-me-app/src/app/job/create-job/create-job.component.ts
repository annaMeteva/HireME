import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { salaryConcat } from 'src/app/shared/utils/salaryConcat';
import { Category } from 'src/app/types/category';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-create-job',
  templateUrl: './create-job.component.html',
  styleUrls: ['./create-job.component.css']
})
export class CreateJobComponent implements OnInit {
  categories: Category[] | null = [];

  form = this.fb.group({
    title: ['', [Validators.required]],
    location: ['', [Validators.required]],
    jobNature: ['', Validators.required],
    category: ['', Validators.required],
    salary1: ['', [Validators.required]],
    salary2: [''],
    qualifications: ['', [Validators.maxLength(200), Validators.required]],
    description: ['', [Validators.maxLength(200), Validators.required]],
  });
  constructor(private apiService: ApiService, private fb: FormBuilder, private router: Router, private userService: UserService) {
  }
  ngOnInit(): void {
    this.apiService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }
  createJob() {
    if (this.form.invalid) {
      return;
    }
    const {
      title,
      jobNature,
      category,
      location,
      salary1,
      salary2,
      qualifications,
      description,
    } = this.form.value;
    const salary = salaryConcat(salary1!, salary2 || '');
    this.apiService.createJob(title!.trim(), jobNature!, category!.toString(), location!.trim(), salary!, qualifications!.trim(), description!.trim(), this.userService.getCurUserEmail).subscribe({
      next: (response) => {
        this.router.navigate(['/jobs']);
        console.log('Create job successful', response);
      },
      error: (error) => {
        console.error('Create job failed', error);
      }
    });
  }
}

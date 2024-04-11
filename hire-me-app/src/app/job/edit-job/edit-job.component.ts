import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { salaryConcat } from 'src/app/shared/utils/salaryConcat';
import { Category } from 'src/app/types/category';
import { Job } from 'src/app/types/job';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-edit-job',
  templateUrl: './edit-job.component.html',
  styleUrls: ['./edit-job.component.css']
})
export class EditJobComponent implements OnInit {
  categories: Category[] | null = [];
  job = {} as Job;

  form = this.fb.group({
    title: ['', [Validators.required]],
    location: ['', [Validators.required]],
    jobNature: ['', Validators.required],
    category: [{ value: '', disabled: true }, Validators.required],
    salary1: ['', [Validators.required]],
    salary2: [''],
    qualifications: ['', [Validators.maxLength(200), Validators.required]],
    description: ['', [Validators.maxLength(200), Validators.required]],
  });
  constructor(private apiService: ApiService, private fb: FormBuilder, private router: Router, private userService: UserService,
    private activeRoute: ActivatedRoute) {
  }
  ngOnInit(): void {
    this.activeRoute.params.subscribe((data) => {
      const id = data['jobId'];
      this.apiService.getJob(id).subscribe((job) => {
        this.job = job;
        let salaryArr: string[] = job.salary.split('-');
        let salary1: string = salaryArr[0].replace('$', '');
        let salary2: string = '';
        if (salaryArr.length === 2) {
          salary2 = salaryArr[1].replace('$', '');
        }
        this.form.setValue({
          title: job.title,
          jobNature: job.job_nature,
          category: job.category_id,
          location: job.location,
          salary1: salary1,
          salary2: salary2,
          qualifications: job.qualifications,
          description: job.description,
        });
      });
    });
    this.apiService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }
  updateJob() {
    if (this.form.invalid) {
      return;
    }
    const {
      title,
      jobNature,
      location,
      category,
      salary1,
      salary2,
      qualifications,
      description,
    } = this.form.value;
    const salary = salaryConcat(salary1!, salary2 || '');
    this.apiService.updateJob(this.job._id, title!.trim(), jobNature!, this.job.category_id, location!.trim(), salary!, qualifications!.trim(), description!.trim()).subscribe({
      next: (response) => {
        this.router.navigate(['/jobs']);
        console.log('Update job successful', response);
      },
      error: (error) => {
        console.error('Update job failed', error);
      }
    });
  }
}

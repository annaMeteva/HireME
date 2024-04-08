import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Category } from './types/category';
import { Job } from './types/job';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) { }

  getCategories() {
    const { apiUrl } = environment;
    return this.http.get<Category[]>(`${apiUrl}/data/categories`);
  }
  getJobs() {
    const { apiUrl } = environment;
    return this.http.get<Job[]>(`${apiUrl}/data/jobs`);
  }
  getJob(id: string) {
    const { apiUrl } = environment;
    return this.http.get<Job>(`${apiUrl}/data/jobs/${id}`);
  }
  createJob(title: string, job_nature: string, location: string, salary: string, qualifications: string, description: string) {
    const { apiUrl } = environment;
    const payload = { title, job_nature, location, salary, qualifications, description };
    return this.http.post<Job>(`${apiUrl}/data/jobs`, payload);
  }
  deleteJob(id: string) {
    const { apiUrl } = environment;
    return this.http.delete<Job>(`${apiUrl}/data/jobs/${id}`);
  }
}

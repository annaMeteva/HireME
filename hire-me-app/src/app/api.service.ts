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
    return this.http.get<Category[]>(`${apiUrl}/jsonstore/collections/categories`);
  }
  getJobs() {
    const { apiUrl } = environment;
    return this.http.get<Job[]>(`${apiUrl}/jsonstore/collections/jobs`);
  }
  getJob(id: string) {
    const { apiUrl } = environment;
    return this.http.get<Job>(`${apiUrl}/jsonstore/collections/jobs/${id}`);
  }
  createJob(title: string, jobNature: string, location: string, salary: string, qualifications: string, description: string) {
    const { apiUrl } = environment;
    const payload = { title, jobNature, location, salary, qualifications, description };
    return this.http.post<Job>(`${apiUrl}/jsonstore/collections/jobs`, payload);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Category } from './types/category';
import { Job } from './types/job';
import { Apply } from './types/apply';

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
    return this.http.get<Job[]>(`${apiUrl}/data/jobs`);
  }
  getJobsByOwner(id: string) {
    const { apiUrl } = environment;
    return this.http.get<Job[]>(`${apiUrl}/data/jobs?where=_ownerId%3D%22` + id + '%22');
  }
  getJobsByCategoryId(id: string) {
    const { apiUrl } = environment;
    return this.http.get<Job[]>(`${apiUrl}/data/jobs?where=category_id%3D%22` + id + '%22');
  }
  getJob(id: string) {
    const { apiUrl } = environment;
    return this.http.get<Job>(`${apiUrl}/data/jobs/${id}`);
  }
  createJob(title: string, job_nature: string, category_id: string, location: string, salary: string, qualifications: string, description: string, _ownerEmail: string) {
    const { apiUrl } = environment;
    const payload = { title, job_nature, category_id, location, salary, qualifications, description, _ownerEmail };
    return this.http.post<Job>(`${apiUrl}/data/jobs`, payload);
  }
  deleteJob(id: string) {
    const { apiUrl } = environment;
    return this.http.delete<Job>(`${apiUrl}/data/jobs/${id}`);
  }
  createApply(name: string,
    email: string, phone: string, portfolioLink: string, coverletter: string, _jobId: string) {
    const { apiUrl } = environment;
    const payload = { name, email, portfolioLink, coverletter, _jobId };
    return this.http.post<Apply>(`${apiUrl}/data/applies`, payload);
  }
  getApplies(id: string) {
    const { apiUrl } = environment;
    return this.http.get<Apply[]>(`${apiUrl}/data/applies`);
  }
  getAppliesByOwner(id: string) {
    const { apiUrl } = environment;
    return this.http.get<Apply[]>(`${apiUrl}/data/applies?where=_ownerId%3D%22` + id + '%22');
  }
}

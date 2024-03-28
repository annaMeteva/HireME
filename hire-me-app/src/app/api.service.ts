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
    return this.http.get<Category[]>(`${apiUrl}/categories.json`);
  }
  getJobs() {
    const { apiUrl } = environment;
    return this.http.get<Job[]>(`${apiUrl}/jobs.json`);
  }
}

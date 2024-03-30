export interface Job {
    job_id?: string;
    category_id: string;
    created_on: string;
    description: string;
    job_nature: string;
    location: string;
    qualifications: string[];
    salary: string;
    title: string;
    user_id: string;
}
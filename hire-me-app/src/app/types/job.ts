export interface Job {
    _id: string;
    category_id: string;
    _createdOn: Date;
    description: string;
    job_nature: string;
    location: string;
    qualifications: string;
    salary: string;
    title: string;
    _ownerId: string;
    _ownerEmail: string;
}
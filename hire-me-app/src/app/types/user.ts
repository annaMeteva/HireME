export interface UserForAuth {
    _id?: string,
    email: string;
    companyName: string;
    phoneNumber?: string;
    address?: string;
    regNumber?: string;
    password?: string;
    accessToken?: string;
}
export interface User {
    _id?: string,
    email: string;
    companyName: string;
    phoneNumber: string;
    address: string;
    regNum: string;
    password?: string;
}
export interface UserForAuth {
    _id?: string,
    email: string;
    companyName: string;
    phoneNumber?: string;
    address?: string;
    password?: string;
    accessToken?: string;
}
export interface ProfileDetails {
    _id?: string,
    email: string;
    companyName: string;
    phoneNumber: string;
    address: string;
    regNum: string;
}
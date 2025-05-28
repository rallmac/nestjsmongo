import { ObjectId } from 'mongodb';
export declare class User {
    id: ObjectId;
    username: string;
    password: string;
    email: string;
    isEmailConfirmed: boolean;
    confirmationToken?: string;
    resetPasswordToken?: string;
    resetPasswordExpires?: Date;
    phoneNumber?: string;
    address?: string;
    dateOfBirth?: Date;
    skills?: string[];
}

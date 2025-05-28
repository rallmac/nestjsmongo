import {IsEmail, IsOptional, IsString, IsInt, IsArray} from 'class-validator';

export class UpdateUserDto{
    @IsOptional()
    @IsEmail()
    email?: string;


    @IsOptional()
    @IsString()
    phoneNumber?: string;

    @IsOptional()
    @IsString()
    address?: string;

    @IsOptional()
    @IsInt()
    dateOfBirth?: Date;

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    skills?: string[];
}
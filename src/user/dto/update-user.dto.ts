import {IsEmail, IsOptional, IsString, IsInt, IsArray} from 'class-validator';
import { CreateUserDto } from './create-user.dto';
import { ApiProperty, PartialType } from '@nestjs/swagger';


export class UpdateUserDto extends PartialType(CreateUserDto) {
    @ApiProperty()
    id: string;


    @IsOptional()
    @ApiProperty()
    @IsEmail()
    email?: string;


    @IsOptional()
    @ApiProperty()
    @IsString()
    phoneNumber?: string;

    @IsOptional()
    @ApiProperty()
    @IsString()
    address?: string;

    @IsOptional()
    @ApiProperty()
    @IsInt()
    dateOfBirth?: Date;

    @IsOptional()
    @ApiProperty()
    @IsArray()
    @IsString({ each: true })
    skills?: string[];
}
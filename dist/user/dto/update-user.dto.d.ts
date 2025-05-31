import { CreateUserDto } from './create-user.dto';
declare const UpdateUserDto_base: import("@nestjs/common").Type<Partial<CreateUserDto>>;
export declare class UpdateUserDto extends UpdateUserDto_base {
    id: string;
    email?: string;
    phoneNumber?: string;
    address?: string;
    dateOfBirth?: Date;
    skills?: string[];
}
export {};

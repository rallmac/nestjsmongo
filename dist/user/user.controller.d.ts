import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { User } from './user.entity';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    createUser(createUserDto: CreateUserDto): Promise<User>;
    findByEmail(email: string): Promise<User | null>;
    findAll(): Promise<User[]>;
    findByUsername(username: string): Promise<User | null>;
    changePassword(body: {
        username: string;
        oldPassword: string;
        newPassword: string;
    }): Promise<{
        success: boolean;
        message: string;
    }>;
    confirmEmail(token: string): Promise<{
        message: string;
    }>;
    requestPasswordReset(body: {
        email: string;
    }): Promise<{
        success: boolean;
        message: string;
    }>;
    resetPassword(token: string, body: {
        newPassword: string;
    }): Promise<{
        success: boolean;
        message: string;
    }>;
    updateUser(id: string, { updateUserDto: UpdateUserDto, }: {
        updateUserDto: any;
    }): Promise<User>;
}

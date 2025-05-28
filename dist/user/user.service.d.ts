import { MongoRepository } from 'typeorm';
import { User } from './user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UserService {
    private userRepository;
    constructor(userRepository: MongoRepository<User>);
    findOne(username: string): Promise<User | null>;
    findAll(): Promise<User[]>;
    findByUsername(username: string): Promise<User | null>;
    createUser(createUserDto: {
        email: string;
        password: string;
    }): Promise<User>;
    findByEmail(email: string): Promise<User | null>;
    validateUser(username: string, plainPassword: string): Promise<any>;
    changePassword(username: string, oldPassword: string, newPassword: string): Promise<{
        success: boolean;
        message: string;
    }>;
    confirmEmail(token: string): Promise<User | null>;
    requestPasswordReset(email: string): Promise<{
        success: boolean;
        message: string;
    }>;
    resetPassword(token: string, newPassword: string): Promise<{
        success: boolean;
        message: string;
    }>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<User>;
}

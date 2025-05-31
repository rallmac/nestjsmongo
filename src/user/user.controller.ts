import { Controller, Post, Body, Get, Param, Patch, Query } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { User } from './user.entity';
import { AuthService } from '../auth/auth.service';
import { ApiBody } from '@nestjs/swagger';
import { LoginDto } from '../auth/dto/login.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { ConfirmEmailDto } from './dto/confirm-email.dto';
import { RequestPasswordResetDto } from './dto/request-password-reset.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { UpdateUserDto } from './dto/update-user.dto';


@Controller('users')
export class UserController {
    constructor(
        private readonly userService: UserService,
        private readonly authService: AuthService,
    ) {}

    @Post('register')
    @ApiBody({ type: CreateUserDto })
    async createUser(@Body() createUserDto: CreateUserDto ): Promise<User> {
        return this.userService.createUser(createUserDto);
    }

    @Post('login')
    @ApiBody({ type: LoginDto })
    async login(@Body() loginDto: { email: string; password: string }) {
        return this.authService.login(loginDto);
    }

    @Get('email')
    async findByEmail(@Param('email') email: string): Promise<User | null> {
        return this.userService.findByEmail(email);
    }

    @Get()
    async findAll() {
        return this.userService.findAll();
    }

    @Get(':username')
    async findByUsername(@Param('username')username: string): Promise<User | null> {
        return this.userService.findByUsername(username);
    }

    @Patch('change-password')
    @ApiBody({ type: ChangePasswordDto })
    async changePassword(
        @Body() body: { username: string; oldPassword: string; newPassword: string }
    ) {
        return this.userService.changePassword(body.username, body.oldPassword, body.newPassword);
    }

    @Get('confirm-email')
    @ApiBody({ type: ConfirmEmailDto })
    async confirmEmail(@Query('token') token: string) {
        const user = await this.userService.confirmEmail(token);
        if (!user) {
            return { message: 'Invalid or expired confirmation token' };
        }
        return { message: 'Email confirmed successfully' };
    }

    @Post('request-password-reset')
    @ApiBody({ type: RequestPasswordResetDto })
    async requestPasswordReset(@Body() body: { email: string }) {
        return this.userService.requestPasswordReset(body.email);
    }

    @Post('reset-password')
    @ApiBody({ type: ResetPasswordDto })
    async resetPassword(@Query('token') token: string, @Body() body: { newPassword: string }) {
        return this.userService.resetPassword(token, body.newPassword);
    }

    @Patch('id')
    @ApiBody({ type: UpdateUserDto })
    async updateUser(
        @Param("id") id: string,
        @Body() { updateUserDto: UpdateUserDto,
        }) {
            return this.userService.update(id, UpdateUserDto);
        }
    
}

import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private jwtService: JwtService
    ) {}


    async validateUser(email: string, password: string): Promise<any> {
        console.log('Validating user:', email);
        const user = await this.userService.findByEmail(email);
        console.log('User found:', user);
        if (user && (await bcrypt.compare(password, user.password))) {
            console.log('Password matched');
            const { password, ...result } = user;
            return result;
        }
        console.log('Invalid credentials');
        return null;
    }

    async login(loginDto: { email: string; password: string }) {
       const { email, password } = loginDto;
       const user = await this.userService.findByEmail(email);
       if (!user) {
        throw new UnauthorizedException('Invalid credentials');
       }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid credentials');
    }
    
    const payload = { sub: user.id, email: user.email };

        return {
            access_token: this.jwtService.sign(payload),
            user,
        };
    }
}

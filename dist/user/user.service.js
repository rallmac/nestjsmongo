"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./user.entity");
const uuid_1 = require("uuid");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
let UserService = class UserService {
    userRepository;
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async findOne(username) {
        return this.userRepository.findOneBy({ username });
    }
    async findAll() {
        return this.userRepository.find();
    }
    async findByUsername(username) {
        return this.userRepository.findOneBy({ username });
    }
    async createUser(createUserDto) {
        const existing = await this.userRepository.findOneBy({ email: createUserDto.email });
        if (existing) {
            throw new Error('Email already registered');
        }
        const confirmationToken = (0, uuid_1.v4)();
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(createUserDto.password, salt);
        const newUser = this.userRepository.create({ ...createUserDto, password: hashedPassword, isEmailConfirmed: false, confirmationToken, });
        return this.userRepository.save(newUser);
    }
    async findByEmail(email) {
        return this.userRepository.findOneBy({ email });
    }
    async validateUser(username, plainPassword) {
        console.log('Validating user:', username);
        const user = await this.findOne(username);
        console.log('User found:', user);
        if (user && await bcrypt.compare(plainPassword, user.password)) {
            const { password, ...result } = user;
            return result;
        }
        console.log('Invalid credentials');
        return null;
    }
    async changePassword(username, oldPassword, newPassword) {
        const user = await this.findByUsername(username);
        if (!user) {
            return { success: false, message: 'User not found' };
        }
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return { success: false, message: 'Old password is incorrect' };
        }
        const salt = await bcrypt.genSalt();
        user.password = await bcrypt.hash(newPassword, salt);
        await this.userRepository.save(user);
        return { success: true, message: 'Password changed successfully' };
    }
    async confirmEmail(token) {
        const user = await this.userRepository.findOneBy({ confirmationToken: token });
        if (!user)
            return null;
        user.isEmailConfirmed = true;
        user.confirmationToken = undefined;
        return this.userRepository.save(user);
    }
    async requestPasswordReset(email) {
        const user = await this.userRepository.findOneBy({ email });
        if (!user) {
            return { success: false, message: 'User not found' };
        }
        const token = (0, uuid_1.v4)();
        user.resetPasswordToken = token;
        user.resetPasswordExpires = new Date(Date.now() + 3600 * 1000);
        await this.userRepository.save(user);
        const transporter = nodemailer.createTransport({
            host: 'smtp.example.com',
            port: 587,
            auth: {
                user: 'your_email@example.com',
                pass: 'your_email_password',
            },
        });
        const resetUrl = `${process.env.CLIENT_BASE_URL}/users/reset-password?token=${token}`;
        await transporter.sendMail({
            to: user.isEmailConfirmed,
            subject: 'Password Reset',
            text: `Reset your password using this link ${resetUrl}`,
        });
        return { success: true, message: 'Password reset email sent' };
    }
    async resetPassword(token, newPassword) {
        const user = await this.userRepository.findOneBy({ resetPasswordToken: token });
        if (!user || !user.resetPasswordExpires || user.resetPasswordExpires < new Date()) {
            return { success: false, message: 'Invalid or expired token' };
        }
        const salt = await bcrypt.genSalt();
        user.password = await bcrypt.hash(newPassword, salt);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await this.userRepository.save(user);
        return { success: true, message: 'Password has been reset' };
    }
    async update(id, updateUserDto) {
        const user = await this.userRepository.findOneBy({ id });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        Object.assign(user, updateUserDto);
        return this.userRepository.save(user);
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.MongoRepository])
], UserService);
//# sourceMappingURL=user.service.js.map
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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const create_user_dto_1 = require("./dto/create-user.dto");
const user_service_1 = require("./user.service");
const auth_service_1 = require("../auth/auth.service");
const swagger_1 = require("@nestjs/swagger");
const login_dto_1 = require("../auth/dto/login.dto");
const change_password_dto_1 = require("./dto/change-password.dto");
const confirm_email_dto_1 = require("./dto/confirm-email.dto");
const request_password_reset_dto_1 = require("./dto/request-password-reset.dto");
const reset_password_dto_1 = require("./dto/reset-password.dto");
const update_user_dto_1 = require("./dto/update-user.dto");
let UserController = class UserController {
    userService;
    authService;
    constructor(userService, authService) {
        this.userService = userService;
        this.authService = authService;
    }
    async createUser(createUserDto) {
        return this.userService.createUser(createUserDto);
    }
    async login(loginDto) {
        return this.authService.login(loginDto);
    }
    async findByEmail(email) {
        return this.userService.findByEmail(email);
    }
    async findAll() {
        return this.userService.findAll();
    }
    async findByUsername(username) {
        return this.userService.findByUsername(username);
    }
    async changePassword(body) {
        return this.userService.changePassword(body.username, body.oldPassword, body.newPassword);
    }
    async confirmEmail(token) {
        const user = await this.userService.confirmEmail(token);
        if (!user) {
            return { message: 'Invalid or expired confirmation token' };
        }
        return { message: 'Email confirmed successfully' };
    }
    async requestPasswordReset(body) {
        return this.userService.requestPasswordReset(body.email);
    }
    async resetPassword(token, body) {
        return this.userService.resetPassword(token, body.newPassword);
    }
    async updateUser(id, { updateUserDto: UpdateUserDto, }) {
        return this.userService.update(id, UpdateUserDto);
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Post)('register'),
    (0, swagger_1.ApiBody)({ type: create_user_dto_1.CreateUserDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createUser", null);
__decorate([
    (0, common_1.Post)('login'),
    (0, swagger_1.ApiBody)({ type: login_dto_1.LoginDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "login", null);
__decorate([
    (0, common_1.Get)('email'),
    __param(0, (0, common_1.Param)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findByEmail", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':username'),
    __param(0, (0, common_1.Param)('username')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findByUsername", null);
__decorate([
    (0, common_1.Patch)('change-password'),
    (0, swagger_1.ApiBody)({ type: change_password_dto_1.ChangePasswordDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "changePassword", null);
__decorate([
    (0, common_1.Get)('confirm-email'),
    (0, swagger_1.ApiBody)({ type: confirm_email_dto_1.ConfirmEmailDto }),
    __param(0, (0, common_1.Query)('token')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "confirmEmail", null);
__decorate([
    (0, common_1.Post)('request-password-reset'),
    (0, swagger_1.ApiBody)({ type: request_password_reset_dto_1.RequestPasswordResetDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "requestPasswordReset", null);
__decorate([
    (0, common_1.Post)('reset-password'),
    (0, swagger_1.ApiBody)({ type: reset_password_dto_1.ResetPasswordDto }),
    __param(0, (0, common_1.Query)('token')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "resetPassword", null);
__decorate([
    (0, common_1.Patch)('id'),
    (0, swagger_1.ApiBody)({ type: update_user_dto_1.UpdateUserDto }),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUser", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [user_service_1.UserService,
        auth_service_1.AuthService])
], UserController);
//# sourceMappingURL=user.controller.js.map
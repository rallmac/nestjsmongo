import { ApiProperty } from '@nestjs/swagger';

export class RequestPasswordResetDto {
    @ApiProperty()
    email: string;
}
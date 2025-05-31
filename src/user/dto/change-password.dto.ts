import { ApiProperty } from '@nestjs/swagger';


export class ChangePasswordDto {
    @ApiProperty()
    email: string;

    @ApiProperty()
    OldPassword: string;


    @ApiProperty()
    newPassword: string;
}
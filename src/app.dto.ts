import { IsNotEmpty, IsEmail, MinLength, MaxLength, IsAlpha, IsAlphanumeric, IsInt, Length, IsString, IsPhoneNumber, Matches, Min, Max, IsIn } from 'class-validator';

export class AppLogin {
    @IsNotEmpty({ message: "Username should not be empty!" })
    @IsString({ message: "Username should not be character!" })
    username: string;

    @IsNotEmpty({ message: "Password should not be empty!" })
    @IsString({ message: "Password should not be character!" })
    password: string;
}
import { IsNotEmpty, IsEmail, MinLength, MaxLength, IsAlpha, IsAlphanumeric, IsInt, Length, IsString, IsPhoneNumber, Matches, Min, Max, IsIn } from 'class-validator';


export class AdminLogin {
    @IsNotEmpty({ message: "Name should not be empty!" })
    @IsString({ message: "Name should not be character!" })
    @Length(4, 8, { message: "Input should be between 4 and 8 characters in length!" })
    name: string;

    @IsNotEmpty({ message: "Password should not be empty!" })
    @IsString({ message: "Password should not be character!" })
    @MinLength(6, { message: "Password should be minimum in 6 character!" })
    password: string;
}


export class AdminProfile {
    @IsNotEmpty({ message: "Name should not be empty!" })
    @IsString({ message: "Name should not be character!" })
    @Length(4, 8, { message: "Input should be between 4 and 8 characters in length!" })
    name: string;

    @IsNotEmpty({ message: "Password should not be empty!" })
    @IsString({ message: "Password should not be character!" })
    @MinLength(6, { message: "Password should be minimum in 6 character!" })
    password: string;

    @IsNotEmpty({ message: "Address should not be empty!" })
    @IsString({ message: "Address should not be character!" })
    address: string;

    @IsNotEmpty({ message: "Phone Number should not be empty!" })
    @Matches(/[0][1][3 4 5 6 7 8 9][0-9]{8}$/i, { message: "Phone Number Invalid!" })
    phoneNo: string;

    @IsNotEmpty({ message: "Email should not be empty!" })
    @IsEmail()
    email: string;

    @IsNotEmpty({ message: "Joining Year should not be empty!" })
    joiningYear: string;

    adminImage: string;

    oldPassword: string;
}


export class AdminVarifyPass {
    @IsNotEmpty()
    @IsInt()
    pin: number;

    @IsNotEmpty()
    password: string
}


export class AdminCatagory {
    @IsNotEmpty({ message: "Enter Your Name." })
    @IsString({ message: "Name Should be String." })
    name: string;
}
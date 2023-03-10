import { IsNotEmpty, IsEmail, MinLength, MaxLength, IsAlpha, IsAlphanumeric, IsInt, Length, IsString, IsPhoneNumber, Matches, Min, Max } from 'class-validator';


export class AdminLogin{
    @IsNotEmpty({ message: "Name should not be empty!" })
    @IsString({ message: "Name should not be character!" })
    @Length(4, 8, { message: "Input should be between 4 and 8 characters in length!" })
    name: string;

    @IsNotEmpty({ message: "Password should not be empty!" })
    @IsString({ message: "Password should not be character!" })
    @MinLength(6, { message: "Password should be minimum in 6 character!" })
    password: string;

    address: string;

    phoneNo: string;

    email: string;
    
    joiningYear: number;

    filename: string;
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
}


export class AdminInstructor {
    @IsNotEmpty({message: "Enter Your ID."})
    @IsInt({message: "ID Must be Integer."})
    @Min(1, {message: "ID Must be Greater Than 1."})
    id: number;

    @IsNotEmpty({message: "Instructor Name Can't be Empty."})
    @MinLength(5, {message: "Instructor Name Must be Greater Than 5 Character."})
    @MaxLength(50, {message: "Instructor Name Must be Less Than 50 Character."})
    @IsAlpha()
    instructorname: string;

    @IsNotEmpty({message: "Enter Your Name."})
    @Length(3,10, {message: "Name Length Should be 3 to 10 Character."})
    @IsString({message: "Name Should be String."})
    name: string;

    @IsNotEmpty({message: "Enter Your Email."})
    @IsEmail()
    email: string;

    @IsNotEmpty({message: "Enter Your Phone Number."})
    @Length(11, 11, {message: "Phone Number Length Must be 11."})
    @IsPhoneNumber("BD", {message: "Phone Number Invalid."})
    phonenumber: number;

    @IsNotEmpty({message: "Enter Your Password."})
    @MinLength(8, {message: "Password Must be Greater Than 8 Character."})
    password: string;

    @IsNotEmpty({message: "Enter Your Password."})
    @Min(18, {message: "Instructor Must be Older Than 18."})
    age: number;

    @IsNotEmpty({message: "Enter Your Date of Birth."})
    @Matches(/^\d{4}-\d{2}-\d{2}$/i, {message: "Date of Birth is Invalid."})
    dob: Date;

    @IsNotEmpty({message: "Enter Your Course Name."})
    @MinLength(3, {message: "Course Name Length Must be Greater Than 3 Character."})
    course: string;
}


export class AdminStudent {

}


export class AdminManager {

}
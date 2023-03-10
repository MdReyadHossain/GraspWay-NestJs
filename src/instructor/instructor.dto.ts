import { IsNotEmpty, IsInt, isNotEmpty, Length, MinLength, MaxLength, IsAlpha, IsString, IsEmail, IsPhoneNumber, Min, IsDate, Matches } from "class-validator";
import { CourseContentEntity } from "src/Entities/Course/content.entity";


export class InstructorReg{

    @IsNotEmpty({message: "Instructor Name Can't be Empty."})
    @MinLength(5, {message: "Instructor Name Must be Greater Than 5 Character."})
    @MaxLength(50, {message: "Instructor Name Must be Less Than 50 Character."})
    @IsAlpha()
    instructorname: string;

    @IsNotEmpty({message: "Enter Your Email."})
    @IsEmail()
    email: string;

    @IsNotEmpty({message: "Enter Your Phone Number."})
    @Length(11, 11, {message: "Phone Number Length Must be 11."})
    @IsPhoneNumber("BD", {message: "Phone Number Invalid."})
    phonenumber: string;

    @IsNotEmpty({message: "Enter Your Password."})
    @MinLength(8, {message: "Password Must be Greater Than 8 Character."})
    password: string;

    @IsNotEmpty({message: "Enter Your Password."})
    @Min(18, {message: "Instructor Must be Older Than 18."})
    age: number;

    @IsNotEmpty({message: "Enter Your Date of Birth."})
    @Matches(/^\d{4}-\d{2}-\d{2}$/i, {message: "Date of Birth is Invalid."})
    dob: Date;
}

export class InstructorLogin{

    @IsNotEmpty({message: "Instructor Name Can't be Empty."})
    @MinLength(5, {message: "Instructor Name Must be Greater Than 5 Character."})
    @MaxLength(50, {message: "Instructor Name Must be Less Than 50 Character."})
    @IsAlpha()
    instructorname: string;

    @IsNotEmpty({message: "Enter Your Password."})
    @MinLength(8, {message: "Password Must be Greater Than 8 Character."})
    password: string;

    phonenumber: string;

    email: string;

    age: number;

    dob: Date;

}

export class ForgetPin{

    @IsNotEmpty({message: "Enter Your Email."})
    @IsEmail()
    email: string;
    
}

export class VerifyPin{

    @IsNotEmpty({message: "Enter Your Password."})
    @MinLength(8, {message: "Password Must be Greater Than 8 Character."})
    password: string;
    
    @IsNotEmpty({message: "Enter Your Password."})
    pin: number;

}

export class EditInfo{

    @IsNotEmpty({message: "Enter Your Email."})
    @IsEmail()
    email: string;

    @IsNotEmpty({message: "Enter Your Phone Number."})
    @Length(11, 11, {message: "Phone Number Length Must be 11."})
    @IsPhoneNumber("BD", {message: "Phone Number Invalid."})
    phonenumber: string;
    
}

export class InstructorEdit{

    @IsNotEmpty({message: "Instructor Name Can't be Empty."})
    @MinLength(5, {message: "Instructor Name Must be Greater Than 5 Character."})
    @MaxLength(50, {message: "Instructor Name Must be Less Than 50 Character."})
    @IsAlpha()
    instructorname: string;

    @IsNotEmpty({message: "Enter Your Email."})
    @IsEmail()
    email: string;

    @IsNotEmpty({message: "Enter Your Phone Number."})
    @Length(11, 11, {message: "Phone Number Length Must be 11."})
    @IsPhoneNumber("BD", {message: "Phone Number Invalid."})
    phonenumber: string;

    @IsNotEmpty({message: "Enter Your Password."})
    @MinLength(8, {message: "Password Must be Greater Than 8 Character."})
    password: string;

    @IsNotEmpty({message: "Enter Your Password."})
    @Min(18, {message: "Instructor Must be Older Than 18."})
    age: number
}

export class ResetPassword{

    @IsNotEmpty({message: "Enter Your Password."})
    @MinLength(8, {message: "Password Must be Greater Than 8 Character."})
    password: string;
    
}

export class Course{
    
    @IsNotEmpty({message: "Enter Your ID."})
    @IsInt({message: "ID Must be Integer."})
    @Min(1, {message: "ID Must be Greater Than 1."})
    id: number;

    @IsNotEmpty({message: "Enter Your Course Name."})
    @MinLength(3, {message: "Course Name Length Must be Greater Than 3 Character."})
    course: string;    

}

export class FileUpload{

    filename: string;

    id: number;

}
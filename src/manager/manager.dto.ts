import { IsNotEmpty, IsEmail, MinLength, MaxLength, IsAlpha, IsAlphanumeric, IsInt, Length, IsString, IsPhoneNumber, Matches, Min, Max } from 'class-validator';

export class ManagerLogin{
    @IsNotEmpty({ message: "Name should not be empty" })
    @IsString({ message: "Name should not be character" })
    @Length(4, 16, { message: "Input should be between 4 and 16 characters in length" })
    name: string;
    phoneNo: any;
    email: any;
    address: any;
    joiningYear: any;
  password: string;

    
}
export class ManagerProfile{
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
    phonenumber: string;

    @IsNotEmpty({message: "Enter Your Password."})
    @MinLength(8, {message: "Password Must be Greater Than 8 Character."})
    password: string;

    @IsNotEmpty({message: "Enter Your Password."})
    @Min(18, {message: "Instructor Must be Older Than 18."})
    age: number;

    status: boolean;

    adminId: any;
}

export class ManagerVarifyPass{
  @IsNotEmpty()
  @IsInt()
  pin: number;

  @IsNotEmpty()
  password: string
}
export class ManagerCatagory {
  @IsNotEmpty({message: "Enter Your Name."})
  @IsString({message: "Name Should be String."})
  name: string;
}





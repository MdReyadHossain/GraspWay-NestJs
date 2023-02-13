import { IsInt, IsNotEmpty } from "class-validator";

export class AdminProfile {
    name: string;

    @IsInt({ message: "Password must be in numeric!" })
    @IsNotEmpty({ message: "Password should not be empty!" })
    password: number;
}

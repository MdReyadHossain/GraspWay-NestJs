import { IsInt, IsNotEmpty } from "class-validator";

export class AdminProfile {
    name: string;

    @IsInt()
    @IsNotEmpty()
    password: number;
}

import { IsInt, IsNotEmpty, IsString, Length } from "class-validator";

export class AdminForm {   
    @IsNotEmpty() 
    @IsInt()
    id: number;

    @IsNotEmpty()
    @IsString()
    name: string;
}
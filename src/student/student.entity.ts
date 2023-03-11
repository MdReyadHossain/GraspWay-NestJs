import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("Students")
export class StudentEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    studentname: string;

    @Column()
    password: string;

    @Column()
    phonenumber: string;

    @Column()
    email: string;

    @Column()
    age: number;

    @Column()
    dob: Date;
    
    @Column()
    status: boolean;


}
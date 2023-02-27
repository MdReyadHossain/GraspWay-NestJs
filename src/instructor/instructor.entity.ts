import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("Instructors")
export class InstructorEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    instructorname: string;

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
    course: string;
}
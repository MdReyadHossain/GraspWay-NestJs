import { CourseStudentEntity } from "src/Entities/CourseStudent/coursestudent.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("Students")
export class StudentEntity {
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
    dob: Date;

    @Column()
    status: boolean;

    @OneToMany(() => CourseStudentEntity, (coursestudents) => coursestudents.course)
    coursestudents: CourseStudentEntity[];
}
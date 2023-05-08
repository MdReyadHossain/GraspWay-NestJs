import { CourseStudentEntity } from "src/Entities/CourseStudent/coursestudent.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("Students")
export class StudentEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    student_name: string;

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

    @Column({ nullable: true })
    regitration: Date;

    @OneToMany(() => CourseStudentEntity, (coursestudents) => coursestudents.course)
    coursestudents: CourseStudentEntity[];
}
import { CourseEntity } from "src/Entities/Course/course.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

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
    dob: Date;

    @Column()
    status: boolean;

    @OneToMany(() => CourseEntity, (course) => course.instructor)
    course: CourseEntity[];
}
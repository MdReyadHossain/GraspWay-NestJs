import { CourseEntity } from "src/Entities/Course/course.entity";
import { Column, Double, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("Instructors")
export class InstructorEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    instructor_name: string;

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

    @Column()
    jointime: Date;

    @Column({ nullable: true })
    total_income: number;

    @Column({ nullable: true })
    rating: number;

    @OneToMany(() => CourseEntity, (course) => course.instructor)
    course: CourseEntity[];
}
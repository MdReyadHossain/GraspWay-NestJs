import { InstructorEntity } from "src/instructor/instructor.entity";
import { StudentEntity } from "src/student/student.entity";
import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CourseEntity } from "../Course/course.entity";

@Entity("Course_Student")
export class CourseStudentEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    status: boolean;

    @ManyToOne(() => CourseEntity, (course) => course.coursestudents)
    course: CourseEntity;
}
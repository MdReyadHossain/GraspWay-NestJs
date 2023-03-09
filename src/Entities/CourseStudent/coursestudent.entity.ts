import { InstructorEntity } from "src/instructor/instructor.entity";
import { Student } from "src/student/student.dto";
import { StudentEntity } from "src/student/student.entity";
import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CourseEntity } from "../Course/course.entity";

@Entity("Course_Student")
export class CourseStudentEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => CourseEntity, (course) => course.coursestudents)
    course: CourseEntity;

    @ManyToOne(() => StudentEntity, (student) => student.coursestudents)
    student: StudentEntity;
}

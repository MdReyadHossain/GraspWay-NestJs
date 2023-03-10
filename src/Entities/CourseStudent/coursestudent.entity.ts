import { StudentEntity } from "src/student/student.entity";
import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CourseEntity } from "../Course/course.entity";

@Entity("Course_Student")
export class CourseStudentEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => CourseEntity, (course) => course.coursestudents)
    course: CourseEntity;

    @ManyToOne(() => StudentEntity, (student) => student.coursestudents)
    student: StudentEntity;
}
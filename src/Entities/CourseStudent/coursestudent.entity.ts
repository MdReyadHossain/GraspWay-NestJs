import { StudentEntity } from "src/student/student.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CourseEntity } from "../Course/course.entity";

@Entity("Course_Student")
export class CourseStudentEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    status: boolean;

    @ManyToOne(() => CourseEntity, (course) => course.coursestudents)
    course: CourseEntity;

    @ManyToOne(() => StudentEntity, (student) => student.coursestudents)
    //@JoinColumn([{referencedColumnName: 'id'}])
    student: StudentEntity;
}
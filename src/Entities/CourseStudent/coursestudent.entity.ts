import { InstructorEntity } from "src/instructor/instructor.entity";
import { StudentEntity } from "src/student/student.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CourseEntity } from "../Course/course.entity";
import { join } from "path";

@Entity("Course_Student")
export class CourseStudentEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    status: boolean;

    @ManyToOne(() => CourseEntity, (course) => course.coursestudents, { onDelete: 'CASCADE' })
    @JoinColumn()
    course: CourseEntity;

    @ManyToOne(() => StudentEntity, (student) => student.coursestudents, { onDelete: 'CASCADE' })
    @JoinColumn()
    student: StudentEntity;
}

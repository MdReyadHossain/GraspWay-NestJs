import { InstructorEntity } from "src/instructor/instructor.entity";
import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CatagoryEntity } from "../Catagory/catagory.entity";
import { CourseStudentEntity } from "../CourseStudent/coursestudent.entity";
import { CourseContentEntity } from "./content.entity";

@Entity("Courses")
export class CourseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    coursename: string;

    @Column()
    status: boolean;

    @ManyToOne(() => InstructorEntity, (instructor) => instructor.course)
    instructor: InstructorEntity;

    @ManyToOne(() => CatagoryEntity, (catagory) => catagory.course)
    catagory: CatagoryEntity;

    @OneToMany(() => CourseStudentEntity, (coursestudents) => coursestudents.course)
    coursestudents: CourseStudentEntity[];

    @OneToMany(() => CourseContentEntity, (content) => content.course)
    content: CourseContentEntity[];
    course: InstructorEntity;
}

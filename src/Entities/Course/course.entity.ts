import { InstructorEntity } from "src/instructor/instructor.entity";
import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CatagoryEntity } from "../Catagory/catagory.entity";

@Entity("Courses")
export class CourseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    coursename: string;

    @ManyToOne(() => InstructorEntity, (instructor) => instructor.course)
    instructor: CourseEntity;

    @ManyToOne(() => CatagoryEntity, (catagory) => catagory.course)
    catagory: CatagoryEntity;
}

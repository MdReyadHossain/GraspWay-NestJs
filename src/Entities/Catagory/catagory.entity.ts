import { InstructorEntity } from "src/instructor/instructor.entity";
import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CourseEntity } from "../Course/course.entity";

@Entity("Catagories")
export class CatagoryEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    Catagoryname: string;

    @OneToMany(() => CourseEntity, (course) => course.catagory)
    course: CourseEntity[];
}
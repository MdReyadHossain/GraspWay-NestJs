import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CourseEntity } from "./course.entity";

@Entity("Course_Content")
export class CourseContentEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(() => CourseEntity, (course) => course.content)
    course: CourseEntity;

    @Column()
    status: boolean;
}

import { InstructorEntity } from "src/instructor/instructor.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CatagoryEntity } from "../Catagory/catagory.entity";
import { CourseContentEntity } from "./content.entity";
import { CourseStudentEntity } from "../CourseStudent/coursestudent.entity";

@Entity("Courses")
export class CourseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    coursename: string;

    @ManyToOne(() => InstructorEntity, (instructor) => instructor.course, { onDelete: 'CASCADE' })
    @JoinColumn()
    instructor: InstructorEntity;

    @ManyToOne(() => CatagoryEntity, (catagory) => catagory.course, { onDelete: 'CASCADE' })
    @JoinColumn()
    catagory: CatagoryEntity;

    @OneToMany(() => CourseStudentEntity, (coursestudents) => coursestudents.course)
    coursestudents: CourseStudentEntity[];

    @OneToMany(() => CourseContentEntity, (content) => content.course)
    content: CourseContentEntity[];

    @Column({ nullable: true })
    created_at: Date;

    @Column()
    status: boolean;
}

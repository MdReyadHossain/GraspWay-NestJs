import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class AdminEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    password: string;

    @Column()
    address: string;
    
    @Column()
    phoneNo: string;
    
    @Column()
    email: string;

    @Column()
    establishment: number;
}
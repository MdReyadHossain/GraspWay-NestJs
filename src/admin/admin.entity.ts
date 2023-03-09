import { ManagerEntity } from "src/manager/manager.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("Admins")
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

    @OneToMany(() => ManagerEntity, (manager) => manager.admin)
    manager: ManagerEntity[];
}
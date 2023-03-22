import { AdminEntity } from "src/admin/admin.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("Managers")
export class ManagerEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    password: string;
    
    @Column()
    phonenumber: string;
    
    @Column()
    email: string;

    @Column()
    age: number;

    @Column()
    status: boolean;
    
    @ManyToOne(() => AdminEntity, (admin) => admin.manager)
    admin: AdminEntity;
}
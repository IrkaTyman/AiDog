import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {Report} from "../../report/entities/report.entity"

@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    email: string;

    @Column()
    firstName: string;

    @Column()
    secondName: string;

    @Column()
    password: string;

    @Column({nullable: true})
    avatarSrc: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @OneToMany(() => Report, (report) => report.id, {nullable: true})
    @JoinColumn({name: 'reports'})
    reports: Report[]
}

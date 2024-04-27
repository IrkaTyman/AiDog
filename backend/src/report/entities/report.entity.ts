import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "../../user/entities/user.entity";

@Entity()
export class Report {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @ManyToOne(() => User, (user) => user.reports, {nullable: true})
    @JoinColumn({ name: 'user'})
    user: User
}

import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "../../user/entities/user.entity";
import {Record} from "../../record/entities/record.entity";

@Entity()
export class Report {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    report: string;

    @ManyToOne(() => User, (user) => user.reports, {nullable: true})
    @JoinColumn({ name: 'user'})
    user: User

    @ManyToOne(() => Record, (record) => record.id, {nullable: true})
    @JoinColumn({ name: 'record'})
    record: Record
}

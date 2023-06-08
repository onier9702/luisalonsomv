import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity('comments')
export class Comment {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    comment: string;

    @Column({ nullable: false })
    user: string;

}
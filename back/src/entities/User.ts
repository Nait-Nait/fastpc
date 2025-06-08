import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    email:string
    @Column()
    password:string

    constructor(email: string, password: string) {
        this.email = email;
        this.password = password;
    }
}
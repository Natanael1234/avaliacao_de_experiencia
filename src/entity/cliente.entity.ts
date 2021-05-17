import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity } from "typeorm";
import { IsEmail } from "class-validator";

@Entity()
export class Cliente extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false, type: "text" })
    nome: string;

    @IsEmail()
    @Column({ nullable: false, unique: true, type: "varchar" })
    email: string;

    @Column({ nullable: false, type: "text" })
    telefone: string;

    @Column({ nullable: false, type: "text" })
    cpf: string;

    static async build(data: any): Promise<Cliente> {
        let user = new Cliente();
        user.nome = data.nome;
        user.email = data.email;
        user.cpf = data.cpf;
        user.telefone = data.telefone;        
        return user;
    }


}

import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, UpdateDateColumn, CreateDateColumn } from "typeorm";
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

    @CreateDateColumn({ type: "timestamp" })
    creationDate: Date;

    @UpdateDateColumn({ type: "timestamp" })
    updateDate: Date;

    @Column({ type: 'boolean', nullable: false, default: true })
    ativo: boolean;

    static async build(data: any): Promise<Cliente> {
        let user = new Cliente();
        user.nome = data.nome;
        user.email = data.email;
        user.cpf = data.cpf;
        user.telefone = data.telefone;
        if (data.ativo != undefined && data.ativo != null) user.ativo = !!data.ativo;
        return user;
    }


}

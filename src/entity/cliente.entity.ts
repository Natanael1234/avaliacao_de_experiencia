import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, UpdateDateColumn, CreateDateColumn, OneToMany } from "typeorm";
import { IsEmail } from "class-validator";
import { TransacaoExperiencia } from "./transacao-experiencia.entity";

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

    @OneToMany(() => TransacaoExperiencia, transacaoExperiencia => transacaoExperiencia.cliente)
    transacaoExperiencia: TransacaoExperiencia[];

    static async build(data: any): Promise<Cliente> {
        const cliente = new Cliente();
        cliente.nome = data.nome;
        cliente.email = data.email;
        cliente.cpf = data.cpf;
        cliente.telefone = data.telefone;
        if (data.ativo != undefined && data.ativo != null) cliente.ativo = !!data.ativo;
        return cliente;
    }


}

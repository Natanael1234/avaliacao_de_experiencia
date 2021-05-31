import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, UpdateDateColumn, CreateDateColumn, OneToMany } from "typeorm";
import { TransacaoExperiencia } from "./transacao-experiencia.entity";

@Entity()
export class Colaborador extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false, type: "text" })
    nome: string;

    @CreateDateColumn({ type: "timestamp" })
    creationDate: Date;

    @UpdateDateColumn({ type: "timestamp" })
    updateDate: Date;

    @Column({ type: 'boolean', nullable: false, default: true })
    ativo: boolean;

    @OneToMany(() => TransacaoExperiencia, transacaoExperiencia => transacaoExperiencia.colaborador)
    transacaoExperiencia: TransacaoExperiencia[];

    static async build(data: any): Promise<Colaborador> {
        const colaborador = new Colaborador();
        colaborador.nome = data.nome;
        if (data.ativo != undefined && data.ativo != null) colaborador.ativo = !!data.ativo;
        return colaborador;
    }
    
}

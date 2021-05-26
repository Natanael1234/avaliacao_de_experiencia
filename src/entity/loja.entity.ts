import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, UpdateDateColumn, CreateDateColumn, OneToMany } from "typeorm";
import { TransacaoExperiencia } from "./transacao-experiencia.entity";

@Entity()
export class Loja extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false, type: "text" })
    nome: string;

    @CreateDateColumn({ type: "timestamp" })
    creationDate: Date;

    @UpdateDateColumn({ type: "timestamp" })
    updateDate: Date;

    @Column({ type: 'boolean', nullable: false, default: true })
    ativa: boolean;

    @OneToMany(() => TransacaoExperiencia, transacaoExperiencia => transacaoExperiencia.loja)
    transacaoExperiencia: TransacaoExperiencia[];

    static async build(data: any): Promise<Loja> {
        let loja = new Loja();
        loja.nome = data.nome;
        if (data.ativa != undefined && data.ativa != null) loja.ativa = !!data.ativa;
        return loja;
    }
    
}

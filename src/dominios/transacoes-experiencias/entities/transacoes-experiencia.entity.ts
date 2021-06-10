
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, UpdateDateColumn, CreateDateColumn, ManyToOne, OneToOne, BeforeUpdate } from "typeorm";
import { AvaliacoesExperiencia } from "../../avaliacoes-experiencias/entities/avaliacoes-experiencia.entity";
import { Cliente } from "../../clientes/entities/cliente.entity";
import { Colaborador } from "../../colaboradores/entities/colaboradore.entity";
import { Loja } from "../../lojas/entities/loja.entity";


@Entity()
export class TransacoesExperiencia extends BaseEntity {


    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false, type: "double" })
    valor: number;

    @Column({ nullable: false, type: "timestamp" })
    data: Date;

    @CreateDateColumn({ type: "timestamp" })
    creationDate: Date;

    @UpdateDateColumn({ type: "timestamp" })
    updateDate: Date;

    @ManyToOne(() => Cliente, cliente => cliente.transacoesExperiencias)
    cliente: Cliente;

    @Column({ type: 'int', nullable: true })
    clienteId: number;

    @ManyToOne(() => Loja, loja => loja.transacoesExperiencias)
    loja: Loja;

    @Column({ type: 'int', nullable: true })
    lojaId: number;

    @ManyToOne(() => Colaborador, colaborador => colaborador.transacoesExperiencias)
    colaborador: Colaborador;

    @Column({ type: 'int', nullable: true })
    colaboradorId: number;

    @OneToOne(() => AvaliacoesExperiencia, avaliacaoExperiencia => avaliacaoExperiencia.transacaoExperiencia)
    avaliacaoExperiencia: AvaliacoesExperiencia;

    @BeforeUpdate()
    async validateUpdate() {
        // this.updateDate = new Date();        
    }

}

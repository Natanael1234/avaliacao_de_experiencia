import { IsBoolean, MaxLength, MinLength, Validate } from "class-validator";
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, UpdateDateColumn, CreateDateColumn, OneToMany, BeforeInsert, BeforeUpdate } from "typeorm";
import { TransacaoExperiencia } from "./transacao-experiencia.entity";
import { AtivoValidator } from "./validators/ativo.validator";
import { RequiredValidator } from "./validators/required.validator";
import validateEntity from "./validators/validator";

@Entity()
export class Loja extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Validate(RequiredValidator, { message: 'Nome é obrigatório.' })
    @MinLength(6, { message: 'Nome deve ter no mínimo 6 caracteres.' })
    @MaxLength(60, { message: 'Nome deve ter no máximo 60 caracteres.' })
    @Column({ nullable: false, type: "text" })
    nome: string;

    @CreateDateColumn({ type: "timestamp" })
    creationDate: Date;

    @UpdateDateColumn({ type: "timestamp" })
    updateDate: Date;

    @Validate(AtivoValidator)
    @Column({ type: 'boolean', nullable: false, default: true })
    ativa: boolean;

    @OneToMany(() => TransacaoExperiencia, transacaoExperiencia => transacaoExperiencia.loja)
    transacaoExperiencia: TransacaoExperiencia[];

    @BeforeInsert()
    async validateInsert() {
        try {
            await validateEntity(this);
        } catch (error) {
            throw error;
        }
    }
    @BeforeUpdate()
    async validateUpdate() {
        this.updateDate = new Date();
        await validateEntity(this);
    }

    setData(data: any) {
        if (!this.hasId()) {
            if(data.id) this.id = data.id;
        }
        if (data.id !== undefined) this.id = data.id;
        if (data.nome !== undefined) this.nome = data.nome;
        if (typeof data.ativa === 'boolean') this.ativa = data.ativa;
        return this;
    }

}

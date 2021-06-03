import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, UpdateDateColumn, CreateDateColumn, OneToMany, BeforeInsert, BeforeUpdate } from "typeorm";
import { IsBoolean, IsDate, IsEmail, MaxLength, MinLength, Validate } from "class-validator";
import { TransacaoExperiencia } from "./transacao-experiencia.entity";
import { CPFValidator } from "./validators/cpf.validator";
import { FoneValidator } from "./validators/fone.validator";
import { RequiredValidator } from "./validators/required.validator";
import validateEntity from "./validators/validator";
import { EmailValidator } from "./validators/email.validator";
import { AtivoValidator } from "./validators/ativo.validator";

@Entity()
export class Cliente extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Validate(RequiredValidator, { message: 'Nome é obrigatório.' })
    @MinLength(6, { message: 'Nome deve ter no mínimo 6 caracteres.' })
    @MaxLength(60, { message: 'Nome deve ter no máximo 60 caracteres.' })
    @Column({ nullable: false, type: "text" })
    nome: string;

    @Validate(RequiredValidator, { message: 'Email é obrigatório.' })
    @Validate(EmailValidator)
    @Column({ nullable: true, unique: true, type: "varchar" })
    email: string;

    @Validate(RequiredValidator, { message: 'Fone é obrigatório.' })
    @Validate(FoneValidator)
    @Column({ nullable: false, type: "text" })
    telefone: string;

    @Validate(RequiredValidator, { message: 'CPF é obrigatório.' })
    @Validate(CPFValidator)
    @Column({ nullable: false, type: "text" })
    cpf: string;

    @CreateDateColumn({ type: "timestamp" })
    creationDate: Date;

    @UpdateDateColumn({ type: "timestamp" })
    updateDate: Date;

    @Validate(AtivoValidator)
    @Column({ type: 'boolean', nullable: false, default: true })
    ativo: boolean;

    @OneToMany(() => TransacaoExperiencia, transacaoExperiencia => transacaoExperiencia.cliente)
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
        if (data.nome !== undefined) this.nome = data.nome;
        if (data.email !== undefined) this.email = data.email;
        if (data.cpf !== undefined) this.cpf = data.cpf;
        if (data.telefone !== undefined) this.telefone = data.telefone;
        if (typeof data.ativo === 'boolean') this.ativo = data.ativo;
        return this;        
    }


}

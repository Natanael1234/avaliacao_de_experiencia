import * as request from 'supertest';
import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { AppModule, runningDockerCompose } from "../src/app.module";
import { Connection, createConnection, getConnection } from 'typeorm';
import { Loja } from '../src/dominios/lojas/entities/loja.entity';
import { Colaborador } from '../src/dominios/colaboradores/entities/colaboradore.entity';
import { Cliente } from '../src/dominios/clientes/entities/cliente.entity';
import { TransacoesExperiencia } from '../src/dominios/transacoes-experiencias/entities/transacoes-experiencia.entity';
import { AvaliacoesExperiencia } from '../src/dominios/avaliacoes-experiencias/entities/avaliacoes-experiencia.entity';

export class E2ETestContext {

    app: INestApplication;

    dadosLojas: any[] = [];
    lojas: any[] = [];

    dadosColaboradores: any[] = [];
    colaboradores: any[] = [];

    dadosClientes: any[] = [];
    clientes: any[] = [];

    dadosTransacoesExperiencias: any[] = [];
    transacoesExperiencias: any[] = [];

    dadosAvaliacoesExperiencias: any = [];
    avaliacoesExperiencias: any = [];

    /** Conexão com a base de dados. */
    public connection: Connection;

    /** Inicializa a base de dados. */
    public async initializeDatabaseConnection(options?: { sync?: boolean }) {
        // cria a conexão com a base de dados.
        this.connection = await createConnection({
            name: 'teste',
            type: 'mysql',
            host: runningDockerCompose ? "banco_avaliacao_experiencia" : 'localhost',
            port: 3308,
            username: 'root',
            password: 'root',
            database: 'avaliacao_de_experiencia',
            synchronize: true,
            entities: [
                Loja,
                Colaborador,
                Cliente,
                TransacoesExperiencia,
                AvaliacoesExperiencia
            ],
            logging: false
        });
        if (options?.sync) {
            await this.recreateDatabase();
        }
    }

    /** Recria a base de dados. */
    public async recreateDatabase() {
        try {
            console.log('Recriando a base de dados...');
            await this.connection.dropDatabase();
            await this.connection.synchronize();
            console.log('Base de dados Recriada.');
        } catch (error) {
            console.error('Falha ao recriar base de dados.');
            throw error;
        }
    }

    public async closeDatabaseConnection() {
        return await this.connection.close();
    }

    async cleanDatabase() {
        // Fetch all the entities
        const entities = (await getConnection()).entityMetadatas;
        for (const entity of entities) {
            const repository = getConnection().getRepository(entity.name); // Get repository
            await repository.clear(); // Clear each entity table's content
        }
    }

    async startApp() {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        this.app = moduleFixture.createNestApplication();
        await this.app.init();
    }

    async closeApp() {
        await this.app.close();
    }

    get request() {
        return request(this.app.getHttpServer());
    }

    inicializaDadosLojas() {
        for (let i = 0; i < 3; i++) {
            this.dadosLojas.push({ nome: 'Loja ' + i });
        }
    }

    inicializaDadosClientes() {
        for (let i = 0; i < 10; i++) {
            this.dadosClientes.push(
                {
                    nome: 'Cliente ' + i,
                    email: 'cliente' + i + '@email.com',
                    telefone: '2799669758' + i,
                    cpf: this.gerarCPF(i % 2 == 0),
                    ativo: true
                }
            );
        }
    }

    inicializaDadosColaboradores() {
        for (let i = 0; i < 3; i++) {
            this.dadosColaboradores.push(
                {
                    nome: 'Colaborador ' + i,
                    ativo: true
                }
            );
        }
    }

    inicializaDadosTransacaoExperiencia() {
        // cliente
        for (let i = 0; i < 10; i++) {
            // transação/experiência
            for (let j = 0; j < 10; j++) {
                let dia = Math.floor(Math.random() * 27) + 1;
                let mes = Math.floor(Math.random() * 12);
                let ano = Math.floor(Math.random() * 3) + 2019;
                this.dadosTransacoesExperiencias.push({
                    valor: Math.floor(Math.random() * 6) + 1,
                    clienteId: this.clientes[i].id,
                    data: new Date(ano, mes, dia).toISOString(),
                    lojaId: j % 2 == 0 ? this.lojas[0].id : this.lojas[1].id,
                    colaboradorId: j % 2 == 0 ? this.lojas[0].id : this.lojas[1].id
                });
            }
        }
    }

    inicializaDadosAvaliacoesDeExperiencia() {
        for (let i = 0; i < this.transacoesExperiencias.length; i++) {
            this.dadosAvaliacoesExperiencias.push({
                nota: Math.floor(Math.random() * 10) + 1,
                comentario: 'Avaliação da experiência ' + this.transacoesExperiencias[i].id,
                transacaoExperienciaId: this.transacoesExperiencias[i].id
            });
        }
    }

    currentDateWithoutTimezone() {
        // return new Date(new Date().getTime());
        return new Date(new Date().getTime() + (3 * 60 * 60 * 1000));

    }

    getMostRecentUpdate(items: any[]) {
        let result;
        for (let item of items || []) {
            if (!result) {
                result = item;
            } else if (item.updateDate < item.updateDate) {
                result = item;
            }
        }
        return result;
    }

    gerarCPF(useMask?: boolean) {
        function randomiza(n: number) {
            var ranNum = Math.round(Math.random() * n);
            return ranNum;
        }

        function mod(dividendo: number, divisor: number) {
            return Math.round(dividendo - (Math.floor(dividendo / divisor) * divisor));
        }

        const n = 9;
        const n1 = randomiza(n);
        const n2 = randomiza(n);
        const n3 = randomiza(n);
        const n4 = randomiza(n);
        const n5 = randomiza(n);
        const n6 = randomiza(n);
        const n7 = randomiza(n);
        const n8 = randomiza(n);
        const n9 = randomiza(n);
        let d1 = n9 * 2 + n8 * 3 + n7 * 4 + n6 * 5 + n5 * 6 + n4 * 7 + n3 * 8 + n2 * 9 + n1 * 10;
        d1 = 11 - (mod(d1, 11));
        if (d1 >= 10) d1 = 0;
        let d2 = d1 * 2 + n9 * 3 + n8 * 4 + n7 * 5 + n6 * 6 + n5 * 7 + n4 * 8 + n3 * 9 + n2 * 10 + n1 * 11;
        d2 = 11 - (mod(d2, 11));
        if (d2 >= 10) d2 = 0;

        if (useMask) return '' + n1 + n2 + n3 + '.' + n4 + n5 + n6 + '.' + n7 + n8 + n9 + '-' + d1 + d2;
        return '' + n1 + n2 + n3 + n4 + n5 + n6 + n7 + n8 + n9 + d1 + d2;
    }

    isIsoDate(date: string) {
        if (!date) return false;
        const dateParsed = new Date(Date.parse(date));
        return dateParsed.toISOString() === date && dateParsed.toUTCString() === new Date(date).toUTCString();
    }


}

import { Server } from "http";
import request from "supertest";
import { MoreThan } from "typeorm";
import { getServer, closeServer } from '../src/app';
import { Database } from "../src/database";
import { Cliente } from "../src/entity/cliente.entity";
import { TransacaoExperiencia } from "../src/entity/transacao-experiencia.entity";

describe('API Avaliação de Experiência de Cliente', () => {

    let server: Server;
    let dadosClientes: any[] = [];
    let clientes: any[] = [];
    let dadosTransacoesExperiencias: any[] = [];
    let transacoesExperiencias: any[] = [];

    beforeAll(async () => {
        jest.useFakeTimers();
        server = await getServer();
        await Database.recreateDatabase();
    });

    describe('Cliente', () => {

        beforeAll(() => {
            for (let i = 0; i < 10; i++) {
                dadosClientes.push(
                    {
                        nome: 'Cliente ' + i,
                        email: 'cliente' + i + ' @email.com',
                        telefone: '2799669758' + i,
                        cpf: '6219272609' + i,
                        ativo: i != 2 && i != 7
                    }
                );
            }
        });

        it('Post /cliente', async () => {
            for (let i = 0; i < dadosClientes.length; i++) {
                let date = new Date();
                let res = await request(await server).post('/cliente').send(dadosClientes[i]);
                expect(res.status).toBe(200);
                expect(res.body.id).toBeDefined();
                expect(res.body.nome).toBe(dadosClientes[i].nome);
                expect(res.body.email).toBe(dadosClientes[i].email);
                expect(res.body.telefone).toBe(dadosClientes[i].telefone);
                expect(res.body.cpf).toBe(dadosClientes[i].cpf);
                expect(res.body.ativo).toBe(dadosClientes[i].ativo);
                expect(date.toISOString() < res.body.creationDate).toBeTruthy();
                clientes.push(res.body);
            }
        });

        it('Get /clientes', async () => {

            async function queryPage(options: {
                page: number,
                pageSize: number,
                expectedPageSize: number,
                expectedOffset: number,
                expectedTotal: number
            }) {
                let res = await request(await server)
                    .get('/clientes')
                    .query({
                        page: options?.page,
                        pageSize: options?.pageSize,
                        ativo: undefined
                    });
                expect(res.status).toBe(200);
                expect(res.body.page).toBe(options.page);
                expect(res.body.pageSize).toBe(options.pageSize);
                expect(res.body.offset).toBe(options.expectedOffset);
                expect(res.body.total).toBe(options.expectedTotal);
                expect(res.body.list.constructor.name).toBe('Array');
                expect(res.body.list.length).toBe(options.expectedPageSize);
                return res.body.list;
            }


            let page1 = await queryPage({ page: 1, pageSize: 6, expectedPageSize: 6, expectedOffset: 0, expectedTotal: 10 });
            let page2 = await queryPage({ page: 2, pageSize: 6, expectedPageSize: 4, expectedOffset: 6, expectedTotal: 10 });
            let pageConcat = page1.concat(page2);
            expect(clientes.length).toBe(pageConcat.length);
            for (let i = 0; i < pageConcat.length; i++) {
                expect(pageConcat[i].id).toBe(clientes[i].id);
                expect(clientes[i].nome).toBe(pageConcat[i].nome);
                expect(clientes[i].email).toBe(pageConcat[i].email);
                expect(clientes[i].telefone).toBe(pageConcat[i].telefone);
                expect(clientes[i].cpf).toBe(pageConcat[i].cpf);
                expect(clientes[i].ativo).toBe(pageConcat[i].ativo);
            }
        });

        it('Put /cliente', async () => {
            let date = new Date();
            clientes[3].nome = 'Cliente 3 modificado';
            clientes[3].cpf = '07397473473';
            clientes[3].telefone = '24989885300';
            clientes[3].email = 'cliente3modificado@email.com';

            let res = await request(await server).put('/cliente').send(clientes[3]);
            expect(res.status).toBe(200);
            expect(res.body.id).toBeDefined();
            expect(res.body.nome).toBe(clientes[3].nome);
            expect(res.body.email).toBe(clientes[3].email);
            expect(res.body.telefone).toBe(clientes[3].telefone);
            expect(res.body.ativo).toBe(clientes[3].ativo);
            expect(date.toISOString() < res.body.updateDate).toBeTruthy();

            let query = await Cliente.find({ where: { updateDate: MoreThan(date) } });
            expect(query.length).toBe(1);
            expect(query[0].id).toBe(clientes[3].id);
            expect(query[0].nome).toBe(clientes[3].nome);
            expect(query[0].email).toBe(clientes[3].email);
            expect(query[0].telefone).toBe(clientes[3].telefone);
            expect(query[0].ativo).toBe(clientes[3].ativo);

            clientes[3] = res.body;
        });

        it('Delete /cliente', async () => {
            let date = new Date();
            let res = await request(await server).delete('/cliente/' + clientes[3].id);
            expect(res.status).toBe(200);
            let query: any[] = await Cliente.find({ where: { updateDate: MoreThan(date) } });
            expect(query.length).toBe(1);
            expect(query[0].id).toBe(clientes[3].id);
            expect(query[0].ativo).toBe(false);
        });
    });

    describe('Transação/Experiência', () => {
        beforeAll(() => {
            // cliente
            for (let i = 0; i < 10; i++) {
                // transação/experiência
                for (let j = 0; j < 10; j++) {
                    let dia = Math.floor(Math.random() * 27) + 1;
                    let mes = Math.floor(Math.random() * 12);
                    let ano = Math.floor(Math.random() * 3) + 2019;
                    dadosTransacoesExperiencias.push({
                        valor: Math.floor(Math.random() * 6) + 1,
                        clienteId: clientes[i].id,
                        data: new Date(ano, mes, dia).toISOString()
                    });
                }
            }
        });

        it('Post /transacao-experiencia', async () => {
            for (let i = 0; i < dadosTransacoesExperiencias.length; i++) {
                let date = new Date();
                let res = await request(await server).post('/transacao-experiencia').send(dadosTransacoesExperiencias[i]);
                expect(res.status).toBe(200);
                expect(res.body.id).toBeDefined();
                expect(res.body.valor).toBe(dadosTransacoesExperiencias[i].valor);
                expect(res.body.data).toBe(dadosTransacoesExperiencias[i].data);
                expect(date.toISOString() < res.body.creationDate).toBeTruthy();
                transacoesExperiencias.push(res.body);
            }
        });

        it('Get cliente/:clienteId/transacao-experiencia', async () => {

            let clienteId = clientes[2].id;

            const queryPage = async (options: {
                page: number,
                pageSize: number,
                expectedPageSize: number,
                expectedOffset: number,
                expectedTotal: number
            }) => {
                let res = await request(await server)
                    .get('/cliente/' + clienteId + '/transacoes-experiencias')
                    .query({
                        page: options?.page,
                        pageSize: options?.pageSize
                    });
                expect(res.status).toBe(200);
                expect(res.body.page).toBe(options.page);
                expect(res.body.pageSize).toBe(options.pageSize);
                expect(res.body.offset).toBe(options.expectedOffset);
                expect(res.body.total).toBe(options.expectedTotal);
                expect(res.body.list.constructor.name).toBe('Array');
                expect(res.body.list.length).toBe(options.expectedPageSize);
                return res.body.list;
            };

            let page1 = await queryPage({ page: 1, pageSize: 6, expectedPageSize: 6, expectedOffset: 0, expectedTotal: 10 });
            let page2 = await queryPage({ page: 2, pageSize: 6, expectedPageSize: 4, expectedOffset: 6, expectedTotal: 10 });
            let pageConcat = page1.concat(page2);
            let filteredTransacoesExperiencias = transacoesExperiencias.filter((transacaoExperiencia) => transacaoExperiencia.clienteId == clienteId);
            expect(pageConcat.length).toBe(filteredTransacoesExperiencias.length);
            for (let i = 0; i < pageConcat.length; i++) {
                expect(pageConcat[i].id).toBe(filteredTransacoesExperiencias[i].id);
                expect(pageConcat[i].valor).toBe(filteredTransacoesExperiencias[i].valor);
                expect(pageConcat[i].data).toBe(filteredTransacoesExperiencias[i].data);

            }
        });

        it('Put /transacao-experiencia', async () => {
            let date = new Date();
            transacoesExperiencias[3].valor = 10;
            transacoesExperiencias[3].data = new Date(2025, 3, 23).toISOString();

            let res = await request(await server).put('/transacao-experiencia').send(transacoesExperiencias[3]);

            expect(res.status).toBe(200);
            expect(res.body.id).toBeDefined();
            expect(res.body.valor).toBe(transacoesExperiencias[3].valor);
            expect(res.body.data).toBe(transacoesExperiencias[3].data);
            expect(res.body.clienteId).toBe(transacoesExperiencias[3].clienteId);
            expect(date.toISOString() < res.body.updateDate).toBeTruthy();

            let query = await TransacaoExperiencia.find({ where: { updateDate: MoreThan(date) } });
            
            expect(query.length).toBe(1);
            expect(query[0].id).toBe(transacoesExperiencias[3].id);
            expect(query[0].valor).toBe(transacoesExperiencias[3].valor);            
            expect(query[0].data.toISOString()).toBe(transacoesExperiencias[3].data);
            expect(query[0].clienteId).toBe(transacoesExperiencias[3].clienteId);   

            transacoesExperiencias[3] = res.body;
        });

    });

    afterAll(async () => {
        await closeServer(server);
    });
});


import { E2ETestContext } from './e2e-test-context';


describe('AppController (e2e)', () => {

  const ctx = new E2ETestContext();

  beforeAll(async () => {
    await ctx.initializeDatabaseConnection({ sync: true });
  });

  afterAll(async () => {
    await ctx.closeDatabaseConnection();
  })


  describe('Loja', () => {

    beforeAll(() => ctx.inicializaDadosLojas());
    beforeEach(async () => await ctx.startApp());
    afterEach(async () => await ctx.closeApp());

    it('Post /lojas', async () => {
      for (let i = 0; i < ctx.dadosLojas.length; i++) {
        let date = new Date();
        let res = await ctx.request.post('/lojas').send(ctx.dadosLojas[i]);
        expect(res.status).toBe(201);
        expect(typeof res.body.id).toBe('number');
        expect(res.body.nome).toBe(ctx.dadosLojas[i].nome);
        expect(res.body.deletedAt).toBe(null);
        expect(date.toISOString() < res.body.creationDate).toBeTruthy();
        ctx.lojas.push(res.body);
      }
    });

    it('Get /lojas', async () => {
      let res = await ctx.request.get('/lojas');
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(ctx.lojas.length);
      for (let i = 0; i < res.body.length; i++) {
        expect(res.body[i].id).toBe(ctx.lojas[i].id);
        expect(res.body[i].nome).toBe(ctx.lojas[i].nome);
        expect(res.body[i].deletedAt).toBe(null);
      }
    });

    it('Put /lojas', async () => {
      ctx.lojas[2].nome = 'Loja 1 modificado';
      let res = await ctx.request.put('/lojas/' + ctx.lojas[2].id).send({ ...ctx.lojas[2], id: undefined });
      expect(res.status).toBe(200);
      expect(typeof res.body.id).toBe('number');
      expect(res.body.nome).toBe(ctx.lojas[2].nome);
      expect(new Date(res.body.updateDate).getTime()).toBeGreaterThan(new Date(ctx.lojas[2].updateDate).getTime());
      expect(res.body.creationDate).toBe(ctx.lojas[2].creationDate);
      expect(ctx.isIsoDate(res.body.deletedAt)).toBeFalsy();
      ctx.lojas[3] = res.body;
    });

    it('Delete /lojas/:lojaId', async () => {
      let date = new Date();
      let res = await ctx.request.delete('/lojas/' + ctx.lojas[2].id).query({ ativa: false });
      expect(res.status).toBe(200);
      expect(res.body.id).toBe(ctx.lojas[2].id);
      expect(ctx.isIsoDate(res.body.deletedAt)).toBeTruthy();
    });

  });

  describe('Cliente', () => {

    beforeAll(() => ctx.inicializaDadosClientes());
    beforeEach(async () => await ctx.startApp());
    afterEach(async () => await ctx.closeApp());

    it('Post /clientes', async () => {
      for (let i = 0; i < ctx.dadosClientes.length; i++) {
        let date = new Date();
        let res = await ctx.request.post('/clientes').send(ctx.dadosClientes[i]);
        expect(res.status).toBe(201);
        expect(typeof res.body.id).toBe('number');
        expect(res.body.nome).toBe(ctx.dadosClientes[i].nome);
        expect(res.body.email).toBe(ctx.dadosClientes[i].email);
        expect(res.body.telefone).toBe(ctx.dadosClientes[i].telefone);
        expect(res.body.cpf).toBe(ctx.dadosClientes[i].cpf);
        expect(res.body.deletedAt).toBe(null);
        // expect(res.body.updatedAt).toBe(null);
        expect(date.toISOString() < res.body.creationDate).toBeTruthy();
        ctx.clientes.push(res.body);
      }
    });

    it('Get /clientes', async () => {
      let res = await ctx.request.get('/clientes')
      expect(res.status).toBe(200);
      expect(res.body.constructor.name).toBe('Array');
      expect(res.body.length).toBe(ctx.dadosClientes.length);
      for (let i = 0; i < res.body.length; i++) {
        expect(res.body[i].id).toBe(ctx.clientes[i].id);
        expect(res.body[i].nome).toBe(ctx.clientes[i].nome);
        expect(res.body[i].email).toBe(ctx.clientes[i].email);
        expect(res.body[i].telefone).toBe(ctx.clientes[i].telefone);
        expect(res.body[i].cpf).toBe(ctx.clientes[i].cpf);
        expect(res.body[i].updateDate).toBe(ctx.clientes[i].updateDate);
        expect(res.body[i].creationDate).toBe(ctx.clientes[i].creationDate);
        expect(res.body[i].deletedAt).toBeNull();
      }
    });

    it('Put /clientes/:clienteId', async () => {
      ctx.clientes[3].nome = 'Cliente 3 modificado';
      ctx.clientes[3].cpf = ctx.gerarCPF();
      ctx.clientes[3].telefone = '24989885300';
      ctx.clientes[3].email = 'cliente3modificado@email.com';
      let res = await ctx.request.put(`/clientes/${ctx.clientes[3].id}`).send({ ...ctx.clientes[3], id: undefined });
      expect(res.status).toBe(200);
      expect(res.body.id).toBe(ctx.clientes[3].id);
      expect(res.body.nome).toBe(ctx.clientes[3].nome);
      expect(res.body.email).toBe(ctx.clientes[3].email);
      expect(res.body.telefone).toBe(ctx.clientes[3].telefone);
      // expect(new Date(res.body.updateDate).getTime()).toBeGreaterThan(new Date(ctx.clientes[3].updateDate).getTime());
      expect(res.body.creationDate).toBe(ctx.clientes[3].creationDate);
      expect(res.body.deletedAt).toBeNull();
      ctx.clientes[3] = res.body;
    });

    it('Delete /clientes/:clienteId', async () => {
      let date = new Date();
      let res = await ctx.request.delete('/clientes/' + ctx.clientes[3].id).query({ ativo: false });
      expect(res.status).toBe(200);
      expect(res.body.id).toBe(ctx.clientes[3].id);
      // expect(res.body.updateDate).toBe();
      // expect(ctx.isIsoDate(res.body.deletedAt)).toBeTruthy();
    });
  });

  describe('Colaboradores', () => {

    beforeAll(() => ctx.inicializaDadosColaboradores());
    beforeEach(async () => await ctx.startApp());
    afterEach(async () => await ctx.closeApp());

    it('Post /colaboradores', async () => {
      for (let i = 0; i < ctx.dadosColaboradores.length; i++) {
        let date = new Date();
        let res = await ctx.request.post('/colaboradores').send(ctx.dadosColaboradores[i]);
        expect(res.status).toBe(201);
        expect(typeof res.body.id).toBe('number');
        expect(res.body.nome).toBe(ctx.dadosColaboradores[i].nome);
        expect(res.body.deletedAt).toBe(null);
        expect(date.toISOString() < res.body.creationDate).toBeTruthy();
        ctx.colaboradores.push(res.body);
      }
    });

    it('Get /colaboradores', async () => {
      let res = await ctx.request.get('/colaboradores');
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(ctx.colaboradores.length);
      for (let i = 0; i < res.body.length; i++) {
        expect(res.body[i].id).toBe(ctx.colaboradores[i].id);
        expect(res.body[i].nome).toBe(ctx.colaboradores[i].nome);
        expect(res.body[i].deletedAt).toBe(null);
      }
    });

    it('Put /colaboradores/:colaboradorId', async () => {      
      ctx.colaboradores[2].nome = 'Colaborador 3 modificado';
      let res = await ctx.request.put(`/colaboradores/${ctx.colaboradores[2].id}`).send({ ...ctx.colaboradores[2], id: undefined });
      expect(res.status).toBe(200);
      expect(res.body.id).toBeDefined();
      expect(res.body.nome).toBe(ctx.colaboradores[2].nome);
      expect(new Date(res.body.updateDate).getTime()).toBeGreaterThan(new Date(ctx.colaboradores[2].updateDate).getTime());
      expect(res.body.creationDate).toBe(ctx.colaboradores[2].creationDate);
      expect(res.body.deletedAt).toBeNull();

      ctx.colaboradores[2] = res.body;
    });

    it('Delete /colaboradores/:colaboradorId', async () => {
      let res = await ctx.request.delete('/colaboradores/' + ctx.colaboradores[2].id).query({ ativo: false });
      expect(res.status).toBe(200);
      expect(res.body.id).toBe(ctx.lojas[2].id);
      expect(ctx.isIsoDate(res.body.deletedAt)).toBeTruthy();
    });
  });

  describe('Transação/Experiência', () => {

    beforeAll(() => ctx.inicializaDadosTransacaoExperiencia());
    beforeEach(async () => await ctx.startApp());
    afterEach(async () => await ctx.closeApp());

    it('Post /transacoes-experiencias', async () => {
      for (let i = 0; i < ctx.dadosTransacoesExperiencias.length; i++) {
        let date = new Date();
        let res = await ctx.request.post('/transacoes-experiencias').send(ctx.dadosTransacoesExperiencias[i]);
        expect(res.status).toBe(201);
        expect(res.body.id).toBeDefined();
        expect(res.body.valor).toBe(ctx.dadosTransacoesExperiencias[i].valor);
        expect(res.body.data).toBe(ctx.dadosTransacoesExperiencias[i].data);
        expect(res.body.clienteId).toBe(ctx.dadosTransacoesExperiencias[i].clienteId);
        expect(res.body.colaboradorId).toBe(ctx.dadosTransacoesExperiencias[i].colaboradorId);
        expect(date.toISOString() < res.body.creationDate).toBeTruthy();
        ctx.transacoesExperiencias.push(res.body);
      }
    });


    it('Put /transacoes-experiencias/:transacaoExperienciaId', async () => {
      ctx.transacoesExperiencias[3].valor = 10;
      ctx.transacoesExperiencias[3].lojaId = ctx.lojas[0].id;
      ctx.transacoesExperiencias[3].colaboradorId = ctx.lojas[0].id;
      ctx.transacoesExperiencias[3].data = new Date(2025, 3, 23).toISOString();
      let res = await ctx.request.put(`/transacoes-experiencias/${ctx.transacoesExperiencias[3].id}`).send({ ...ctx.transacoesExperiencias[3], id: undefined });
      expect(res.status).toBe(200);
      expect(typeof res.body.id).toBe('number');
      expect(res.body.valor).toBe(ctx.transacoesExperiencias[3].valor);
      expect(res.body.data).toBe(ctx.transacoesExperiencias[3].data);
      expect(res.body.clienteId).toBe(ctx.transacoesExperiencias[3].clienteId);
      expect(res.body.lojaId).toBe(ctx.transacoesExperiencias[3].lojaId);
      expect(res.body.colaboradorId).toBe(ctx.transacoesExperiencias[3].colaboradorId);
      expect(new Date(res.body.updateDate).getTime()).toBeGreaterThan(new Date(ctx.transacoesExperiencias[3].updateDate).getTime());
      expect(res.body.creationDate).toBe(ctx.transacoesExperiencias[3].creationDate);
      // expect(ctx.isIsoDate(res.body.deletedAt)).toBeTruthy();
      ctx.transacoesExperiencias[3] = res.body;
    });

  });


  describe('Avaliação de Experiência', () => {

    beforeAll(() => ctx.inicializaDadosAvaliacoesDeExperiencia());
    beforeEach(async () => await ctx.startApp());
    afterEach(async () => await ctx.closeApp());

    it('Post /avaliacao-experiencia', async () => {
      for (let i = 0; i < ctx.dadosAvaliacoesExperiencias.length; i++) {
        let date = new Date();
        let res = await ctx.request.post('/avaliacoes-experiencias').send(ctx.dadosAvaliacoesExperiencias[i]);
        expect(res.status).toBe(201);
        expect(typeof res.body.id).toBe('number');
        expect(res.body.nota).toBe(ctx.dadosAvaliacoesExperiencias[i].nota);
        expect(res.body.comentario).toBe(ctx.dadosAvaliacoesExperiencias[i].comentario);
        expect(res.body.transacaoExperienciaId).toBe(ctx.dadosAvaliacoesExperiencias[i].transacaoExperienciaId);
        expect(date.toISOString() < res.body.creationDate).toBeTruthy();
        ctx.avaliacoesExperiencias.push(res.body);
      }
    });

    it('Get /avaliacoes-experiencias', async () => {
      let res = await ctx.request.get('/avaliacoes-experiencias')
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(ctx.avaliacoesExperiencias.length);
      for (let i = 0; i < res.body.length; i++) {
        expect(res.body[i].id).toBe(ctx.avaliacoesExperiencias[i].id);
        expect(res.body[i].nota).toBe(ctx.avaliacoesExperiencias[i].nota);
        expect(res.body[i].comentario).toBe(ctx.avaliacoesExperiencias[i].comentario);
        expect(res.body[i].transacaoExperienciaId).toBe(ctx.avaliacoesExperiencias[i].transacaoExperienciaId);
      }
    });
  });

});



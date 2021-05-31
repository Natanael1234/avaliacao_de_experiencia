import { NextFunction, Request, Response } from "express";
import express from 'express';
import { Cliente } from "../entity/cliente.entity";
import { ResultSetDTO } from "../dto/paginationDTO";
import { BadRequestError } from "../errors/bad-request.error";
import { NotFoundError } from "../errors/not-found.error";
const clienteRouter = express.Router();

clienteRouter.post('/cliente', async (req: Request, res: Response, next: NextFunction) => {
    if (req.body.id) next(new BadRequestError('Cliente não deve ser especificado'));
    const cliente = await Cliente.build(req.body);
    cliente
        .save()
        .then((entity) => res.send(entity))
        .catch(next);
});

clienteRouter.put('/cliente', async (req: Request, res: Response, next: NextFunction) => {
    if (!req.body.id) return next(new BadRequestError('Cliente não especificado'));
    const cliente = await Cliente.findOne({ where: { id: req.body.id } });
    if (!cliente) return next(new NotFoundError('Cliente indefinido'));
    if (req.body.nome) cliente.nome = req.body.nome;
    if (req.body.email) cliente.email = req.body.email;
    if (req.body.telefone) cliente.telefone = req.body.telefone;
    if (req.body.cpf) cliente.cpf = req.body.cpf;
    if (req.body.ativo != undefined && req.body.ativo != null) cliente.ativo = !!req.body.ativo;
    cliente.updateDate = new Date();
    await cliente
        .save()
        .then((entity) => res.send(entity))
        .catch(next);
});

clienteRouter.get('/clientes', async (req: Request, res: Response, next: NextFunction) => {
    const where: any = {};
    if (req.query.ativo == 'true') where.ativo = true;
    else if (req.query.ativo == 'false') where.ativo = false;
    else if (req.query.ativo != undefined) return next(new BadRequestError('Parâmetro inválido'));
    const resultSet = ResultSetDTO.queryParamsToPaginationDTO<Cliente>(req.query);    
    const clientes = await Cliente.findAndCount({
        take: resultSet.pageSize,
        skip: resultSet.offset,
        order: resultSet.order,
        where
    });
    resultSet.list = <Cliente[]>clientes.map(cliente => cliente)[0];
    resultSet.total = <number>clientes[1];
    res.send(resultSet);
});

clienteRouter.delete('/cliente/:clienteId', async (req: Request, res: Response, next: NextFunction) => {
    if (!req.params.clienteId) return next(new BadRequestError('Cliente indefinido'));
    const clienteId = Number(req.params.clienteId);
    const cliente = await Cliente.findOne({ where: { id: clienteId } });
    if (!cliente) return next(new NotFoundError('Cliente não encontrado'));
    cliente.updateDate = new Date();
    cliente.ativo = false;
    cliente
        .save()
        .then((entity) => res.send(entity))
        .catch(next);
})

export { clienteRouter };
import { NextFunction, Request, Response } from "express";
import express from 'express';
import { Cliente } from "../entity/cliente.entity";
import { ResultSetDTO } from "../dto/paginationDTO";
import { BadRequestError } from "../errors/bad-request.error";
import { NotFoundError } from "../errors/not-found.error";
const clienteRouter = express.Router();

clienteRouter.post('/cliente', (req: Request, res: Response, next: NextFunction) => {
    if (req.body.id) return next(new BadRequestError('Cliente não deve ser especificado.'));
    new Cliente()
        .setData({            
            ...req.body, 
            ativo: req.body.ativo == false ? false : true, 
            id: undefined 
        })
        .save()
        .then((entity) => res.send(entity))
        .catch(next);
});

clienteRouter.put('/cliente', async (req: Request, res: Response, next: NextFunction) => {
    if (!req.body.id) return next(new BadRequestError('Cliente não especificado.'));
    delete req.body.ativo;
    let cliente = await Cliente.findOne({ where: { id: req.body.id } });
    if (!cliente) return next(new NotFoundError('Cliente não encontrado.'));
    await cliente
        .setData(req.body)
        .save()
        .then((entity) => res.send(entity))
        .catch(next);
});

clienteRouter.get('/clientes', async (req: Request, res: Response, next: NextFunction) => {
    const where: any = {};
    if (req.query.ativo == 'true') where.ativo = true;
    else if (req.query.ativo == 'false') where.ativo = false;
    else if (req.query.ativo != undefined) return next(new BadRequestError('Parâmetro inválido.'));
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
    if (!req.params.clienteId) return next(new BadRequestError('Cliente indefinido.'));
    const clienteId = Number(req.params.clienteId);
    const cliente = await Cliente.findOne({ where: { id: clienteId } });
    if (!cliente) return next(new NotFoundError('Cliente não encontrado.'));
    await cliente
        .setData({ ativo: req.query.ativo == 'true' })
        .save()
        .then((entity) => res.send(entity))
        .catch(next);
})

export { clienteRouter };
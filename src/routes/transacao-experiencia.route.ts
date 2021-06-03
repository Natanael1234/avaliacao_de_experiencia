import { NextFunction, Request, Response } from "express";
import express from 'express';
import { ResultSetDTO } from "../dto/paginationDTO";
import { TransacaoExperiencia } from "../entity/transacao-experiencia.entity";
import { BadRequestError } from "../errors/bad-request.error";
import { NotFoundError } from "../errors/not-found.error";
const transacaoExperienciaRouter = express.Router();

transacaoExperienciaRouter.post('/transacao-experiencia', async (req: Request, res: Response, next: NextFunction) => {
    if (req.body.id) return next(new BadRequestError('Transação/Experiência não deve ser especificada'));
    new TransacaoExperiencia()
        .setData({ ...req.body, id: undefined })
        .save()
        .then((entity) => res.send(entity))
        .catch(next);
});

transacaoExperienciaRouter.put('/transacao-experiencia', async (req: Request, res: Response, next: NextFunction) => {
    if (!req.body.id) return next(new BadRequestError('Transação/Experiência não especificada'));
    let transacaoExperiencia = await TransacaoExperiencia.findOne({ where: { id: req.body.id } });
    if (!transacaoExperiencia) return next(new NotFoundError('Transação/Experiência não encontrada.'));
    await transacaoExperiencia
        .setData(req.body)
        .save()
        .then((entity) => res.send(entity))
        .catch(next);
});

transacaoExperienciaRouter.get('/cliente/:clienteId/transacoes-experiencias', async (req: Request, res: Response) => {
    const resultSet = ResultSetDTO.queryParamsToPaginationDTO<TransacaoExperiencia>(req.query);
    const transacoesExperiencias = await TransacaoExperiencia.findAndCount({
        take: resultSet.pageSize,
        skip: resultSet.offset,
        order: resultSet.order,
        where: { clienteId: req.params.clienteId }
    });
    resultSet.list = <TransacaoExperiencia[]>transacoesExperiencias.map(transacaoExperiencia => transacaoExperiencia)[0];
    resultSet.total = <number>transacoesExperiencias[1];
    res.send(resultSet);
});

export { transacaoExperienciaRouter };
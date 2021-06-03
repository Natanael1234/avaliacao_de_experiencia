import { NextFunction, Request, Response } from "express";
import express from 'express';
import { ResultSetDTO } from "../dto/paginationDTO";
import { Loja } from "../entity/loja.entity";
import { BadRequestError } from "../errors/bad-request.error";
import { NotFoundError } from "../errors/not-found.error";
const lojaRouter = express.Router();

lojaRouter.post('/loja', async (req: Request, res: Response, next: NextFunction) => {
    if (req.body.id) return next(new BadRequestError('Loja não deve ser especificada'));
    new Loja()
        .setData({
            ...req.body,
            ativa: req.body.ativa == false ? false : true,
            id: undefined
        })
        .save()
        .then((entity) => res.send(entity))
        .catch(next);
});

lojaRouter.put('/loja', async (req: Request, res: Response, next: NextFunction) => {
    if (!req.body.id) return next(new BadRequestError('Loja indefinida'));
    delete req.body.ativa;
    let loja = await Loja.findOne({ where: { id: req.body.id } });
    if (!loja) return next(new NotFoundError('Loja não encontrada.'));
    await loja
        .setData(req.body)
        .save()
        .then((entity) => res.send(entity))
        .catch(next);
});

lojaRouter.get('/lojas', async (req: Request, res: Response, next: NextFunction) => {
    const where: any = {};
    if (req.query.ativa == 'true') where.ativa = true;
    else if (req.query.ativa == 'false') where.ativa = false;
    else if (req.query.ativa != undefined) return next(new BadRequestError('Parâmetro inválido'));
    const resultSet = ResultSetDTO.queryParamsToPaginationDTO<Loja>(req.query);
    const lojas = await Loja.findAndCount({
        take: resultSet.pageSize,
        skip: resultSet.offset,
        order: resultSet.order,
        where
    });
    resultSet.list = <Loja[]>lojas.map(loja => loja)[0];
    resultSet.total = <number>lojas[1];
    res.send(resultSet);
});

lojaRouter.delete('/loja/:lojaId', async (req: Request, res: Response, next: NextFunction) => {
    if (!req.params.lojaId) return next(new BadRequestError('Loja indefinida'));
    const lojaId = Number(req.params.lojaId);
    const loja = await Loja.findOne({ where: { id: lojaId } });
    if (!loja) return next(new NotFoundError('Loja não encontrada'));
    await loja
        .setData({ ativa: req.query.ativa == 'true' })
        .save()
        .then((entity) => res.send(entity))
        .catch(next);
})

export { lojaRouter };
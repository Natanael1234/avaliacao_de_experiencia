import { NextFunction, Request, Response } from "express";
import express from 'express';
import { ResultSetDTO } from "../dto/paginationDTO";
import { Colaborador } from "../entity/colaborador.entity";
import { BadRequestError } from "../errors/bad-request.error";
import { NotFoundError } from "../errors/not-found.error";
const colaboradorRouter = express.Router();

colaboradorRouter.post('/colaborador', async (req: Request, res: Response, next: NextFunction) => {
    if (req.body.id) return next(new BadRequestError('Colaborador não deve ser especificado'));
    new Colaborador()
        .setData({ 
            ...req.body, 
            ativo: req.body.ativo == false ? false : true,
            id: undefined 
        })
        .save()
        .then((entity) => res.send(entity))
        .catch(next);
});

colaboradorRouter.put('/colaborador', async (req: Request, res: Response, next: NextFunction) => {
    if (!req.body.id) return next(new BadRequestError('Colaborador não especificado'));
    delete req.body.ativo;
    let colaborador = await Colaborador.findOne({ where: { id: req.body.id } });
    if (!colaborador) return next(new NotFoundError('Colaborador não encontrado.'));
    await colaborador
        .setData(req.body)
        .save()
        .then((entity) => res.send(entity))
        .catch(next);
});

colaboradorRouter.get('/colaboradores', async (req: Request, res: Response) => {
    let resultSet = ResultSetDTO.queryParamsToPaginationDTO<Colaborador>(req.query);
    const colaboradores = await Colaborador.findAndCount({
        take: resultSet.pageSize,
        skip: resultSet.offset,
        order: resultSet.order
    });
    resultSet.list = <Colaborador[]>colaboradores.map(colaborador => colaborador)[0];
    resultSet.total = <number>colaboradores[1];
    res.send(resultSet);
});

colaboradorRouter.delete('/colaborador/:colaboradorId', async (req: Request, res: Response, next: NextFunction) => {
    if (!req.params.colaboradorId) return next(new BadRequestError('Colaborador indefinido.'));
    const colaboradorId = Number(req.params.colaboradorId);
    const colaborador = await Colaborador.findOne({ where: { id: colaboradorId } });
    if (!colaborador) return next(new NotFoundError('Colaborador não encontrado.'));
    await colaborador
        .setData({ ativo: req.query.ativo == 'true' })
        .save({reload:true})
        .then((entity) => res.send(entity))
        .catch(next);
})

export { colaboradorRouter };
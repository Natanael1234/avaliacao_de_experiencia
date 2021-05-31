import { NextFunction, Request, Response } from "express";
import express from 'express';
import { ResultSetDTO } from "../dto/paginationDTO";
import { Colaborador } from "../entity/colaborador.entity";
import { BadRequestError } from "../errors/bad-request.error";
import { NotFoundError } from "../errors/not-found.error";
const colaboradorRouter = express.Router();

colaboradorRouter.post('/colaborador', async (req: Request, res: Response, next: NextFunction) => {    
    if (req.body.id) return next(new BadRequestError('Colaborador não deve ser especificado'));
    const colaborador = await Colaborador.build(req.body);
    colaborador
        .save()
        .then((entity) => res.send(entity))
        .catch(next);
});

colaboradorRouter.put('/colaborador', async (req: Request, res: Response, next: NextFunction) => {
    if (!req.body.id) return next(new BadRequestError('Colaborador não especificado'));
    const colaborador = await Colaborador.findOne({ where: { id: req.body.id } });
    if (!colaborador) return next(new NotFoundError('Colaborador indefinido'));
    if (req.body.nome) colaborador.nome = req.body.nome;
    if (req.body.ativo != undefined && req.body.ativo != null) colaborador.ativo = !!req.body.ativo;
    colaborador.updateDate = new Date();
    colaborador
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
    if (!req.params.colaboradorId) return next(new BadRequestError('Colaborador indefinido'));
    const colaboradorId = Number(req.params.colaboradorId);
    const colaborador = await Colaborador.findOne({ where: { id: colaboradorId } });
    if (!colaborador) return next(new NotFoundError('Colaborador não encontrado'));
    colaborador.ativo = false;
    colaborador.updateDate = new Date();
    await colaborador
        .save()
        .then((entity) => res.send(entity))
        .catch(next);
})

export { colaboradorRouter };
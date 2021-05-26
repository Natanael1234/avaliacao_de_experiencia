import { Request, Response } from "express";
import express from 'express';
import { HttpError } from "../errors/http-error";
import { ResultSetDTO } from "../dto/paginationDTO";
import { Loja } from "../entity/loja.entity";
const lojaRouter = express.Router();

lojaRouter.post('/loja', async (req: Request, res: Response) => {
    try {
        let loja;
        if (req.body.id) throw new HttpError('Loja não deve ser especificada', 400);
        loja = await Loja.build(req.body);
        await loja.save();
        return res.send(loja)
    } catch (error) {
        console.error(error.message);
        return res.status(error['status'] || 500).send(error.message);
    }
});

lojaRouter.put('/loja', async (req: Request, res: Response) => {
    try {
        if (!req.body.id) throw new HttpError('Loja não especificada', 400);
        let loja = await Loja.findOne({ where: { id: req.body.id } });
        if (!loja) throw new HttpError('Loja indefinida', 404);
        if (req.body.nome) loja.nome = req.body.nome;
        if (req.body.ativa != undefined && req.body.ativa != null) loja.ativa = !!req.body.ativa;
        loja.updateDate = new Date();
        await loja.save({ reload: true });
        return res.send(loja)
    } catch (error) {
        console.error(error.message);
        return res.status(error['status'] || 500).send(error.message);
    }
});

lojaRouter.get('/lojas', async (req: Request, res: Response) => {
    try {
        let resultSet = ResultSetDTO.queryParamsToPaginationDTO<Loja>(req.query);
        let where: any = {};
        if (req.query.ativa == 'true') where.ativa = true;
        else if (req.query.ativa == 'false') where.ativa = false;
        else if (req.query.ativa != undefined) throw new HttpError('Parâmetro inválido', 400);
        let lojas = await Loja.findAndCount({
            take: resultSet.pageSize,
            skip: resultSet.offset,
            order: resultSet.order,
            where
        });
        resultSet.list = <Loja[]>lojas.map(loja => loja)[0];
        resultSet.total = <number>lojas[1];
        return res.send(resultSet);
    } catch (error) {
        console.error(error.message);
        return res.status(error['status'] || 500).send(error.message);
    }
});

lojaRouter.delete('/loja/:lojaId', async (req: Request, res: Response) => {
    try {
        if (!req.params.lojaId) throw new HttpError('Loja indefinida', 400);
        let lojaId = Number(req.params.lojaId);
        let loja = await Loja.findOne({ where: { id: lojaId } });
        if (!loja) throw new HttpError('Loja não encontrada', 404);
        loja.updateDate = new Date();
        loja.ativa = false;
        await loja.save({ reload: true });
        return res.send(loja);
    } catch (error) {
        console.error(error.message);
        return res.status(error['status'] || 500).send(error.message);
    }
})

export { lojaRouter };
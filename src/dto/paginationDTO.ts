import { HttpError } from "../errors/http-error";

/** Objeto de transferência de dados de paginação. */
export class ResultSetDTO<Type> {

    /** Número da página começando em 1. Mínimo 1. Por padrão 1. */
    page: number = 1;

    /** Quantidade de itens da página. Mínimo 1. Máximo 100. Por padrão 10. */
    pageSize: number = 10;

    offset: number;

    order: any;

    total: number = 0;

    list: Type[] = [];

    public static build<T>(data: { page: number, pageSize: number, order?: any }): ResultSetDTO<T> {
        let resultSetDTO = new ResultSetDTO<T>();
        resultSetDTO.order = data.order;
        resultSetDTO.page = Math.max(1, data.page || 1);
        resultSetDTO.pageSize = Math.max(1, Math.min(data.pageSize || 10, 100));
        resultSetDTO.offset = (resultSetDTO.page - 1) * resultSetDTO.pageSize;
        return resultSetDTO;
    }

    public static queryParamsToPaginationDTO<T>(query: any): ResultSetDTO<T> {
        let page = query.page ? Number(query.page) : 1;        
        let pageSize = query.pageSize ? Number(query.pageSize) : 10;
        let orderBy: string = query.orderBy;
        let orderDirection: 'ASC' | 'DESC' = query.orderDirection;
        let order: any = {};
        if (orderBy) {
            if (!['ASC', 'DESC', '', undefined].includes(orderDirection)) {
                throw new HttpError('Sentido de ordenação inválido', 400);
            }
            order = { [orderBy]: orderDirection };
        } else if (orderDirection) {
            throw new HttpError('Campo de ordenação inválido', 400);
        }
        return ResultSetDTO.build<T>({
            page,
            pageSize: Number(pageSize),
            order
        });
    }
}



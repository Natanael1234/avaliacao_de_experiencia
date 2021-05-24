"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResultSetDTO = void 0;
var http_error_1 = require("../errors/http-error");
/** Objeto de transferência de dados de paginação. */
var ResultSetDTO = /** @class */ (function () {
    function ResultSetDTO() {
        /** Número da página começando em 1. Mínimo 1. Por padrão 1. */
        this.page = 1;
        /** Quantidade de itens da página. Mínimo 1. Máximo 100. Por padrão 10. */
        this.pageSize = 10;
        this.total = 0;
        this.list = [];
    }
    ResultSetDTO.build = function (data) {
        var resultSetDTO = new ResultSetDTO();
        resultSetDTO.order = data.order;
        resultSetDTO.page = Math.max(1, data.page || 1);
        resultSetDTO.pageSize = Math.max(1, Math.min(data.pageSize || 10, 100));
        resultSetDTO.offset = (resultSetDTO.page - 1) * resultSetDTO.pageSize;
        return resultSetDTO;
    };
    ResultSetDTO.queryParamsToPaginationDTO = function (query) {
        var _a;
        var page = query.page ? Number(query.page) : 1;
        var pageSize = query.pageSize ? Number(query.pageSize) : 10;
        var orderBy = query.orderBy;
        var orderDirection = query.orderDirection;
        var order = {};
        if (orderBy) {
            if (!['ASC', 'DESC', '', undefined].includes(orderDirection)) {
                throw new http_error_1.HttpError('Sentido de ordenação inválido', 400);
            }
            order = (_a = {}, _a[orderBy] = orderDirection, _a);
        }
        else if (orderDirection) {
            throw new http_error_1.HttpError('Campo de ordenação inválido', 400);
        }
        return ResultSetDTO.build({
            page: page,
            pageSize: Number(pageSize),
            order: order
        });
    };
    return ResultSetDTO;
}());
exports.ResultSetDTO = ResultSetDTO;

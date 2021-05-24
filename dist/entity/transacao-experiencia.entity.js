"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransacaoExperiencia = void 0;
var typeorm_1 = require("typeorm");
var http_error_1 = require("../errors/http-error");
var avaliacao_experiencia_1 = require("./avaliacao-experiencia");
var cliente_entity_1 = require("./cliente.entity");
var TransacaoExperiencia = /** @class */ (function (_super) {
    __extends(TransacaoExperiencia, _super);
    function TransacaoExperiencia() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TransacaoExperiencia_1 = TransacaoExperiencia;
    TransacaoExperiencia.getCliente = function (clienteId) {
        return __awaiter(this, void 0, void 0, function () {
            var cliente;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!clienteId)
                            throw new http_error_1.HttpError('Cliente indefinido', 400);
                        return [4 /*yield*/, cliente_entity_1.Cliente.findOne({ where: { id: clienteId } })];
                    case 1:
                        cliente = _a.sent();
                        if (!cliente)
                            throw new http_error_1.HttpError('Cliente não inexistente', 404);
                        return [2 /*return*/, cliente];
                }
            });
        });
    };
    TransacaoExperiencia.build = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var transacaoExperiencia, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        transacaoExperiencia = new TransacaoExperiencia_1();
                        transacaoExperiencia.valor = data.valor;
                        if (data.data)
                            transacaoExperiencia.data = new Date(data.data);
                        if (!data.clienteId) return [3 /*break*/, 2];
                        _a = transacaoExperiencia;
                        return [4 /*yield*/, TransacaoExperiencia_1.getCliente(data.clienteId)];
                    case 1:
                        _a.cliente = _b.sent();
                        _b.label = 2;
                    case 2: return [2 /*return*/, transacaoExperiencia];
                }
            });
        });
    };
    var TransacaoExperiencia_1;
    __decorate([
        typeorm_1.PrimaryGeneratedColumn()
    ], TransacaoExperiencia.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column({ nullable: false, type: "double" })
    ], TransacaoExperiencia.prototype, "valor", void 0);
    __decorate([
        typeorm_1.Column({ nullable: false, type: "timestamp" })
    ], TransacaoExperiencia.prototype, "data", void 0);
    __decorate([
        typeorm_1.CreateDateColumn({ type: "timestamp" })
    ], TransacaoExperiencia.prototype, "creationDate", void 0);
    __decorate([
        typeorm_1.UpdateDateColumn({ type: "timestamp" })
    ], TransacaoExperiencia.prototype, "updateDate", void 0);
    __decorate([
        typeorm_1.ManyToOne(function () { return cliente_entity_1.Cliente; }, function (cliente) { return cliente.transacaoExperiencia; })
    ], TransacaoExperiencia.prototype, "cliente", void 0);
    __decorate([
        typeorm_1.Column({ type: 'int', nullable: true })
    ], TransacaoExperiencia.prototype, "clienteId", void 0);
    __decorate([
        typeorm_1.OneToOne(function () { return avaliacao_experiencia_1.AvaliacaoExperiencia; }, function (avaliacaoExperiencia) { return avaliacaoExperiencia.transacaoExperiencia; })
    ], TransacaoExperiencia.prototype, "avaliacaoExperiencia", void 0);
    TransacaoExperiencia = TransacaoExperiencia_1 = __decorate([
        typeorm_1.Entity()
    ], TransacaoExperiencia);
    return TransacaoExperiencia;
}(typeorm_1.BaseEntity));
exports.TransacaoExperiencia = TransacaoExperiencia;

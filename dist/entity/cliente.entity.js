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
exports.Cliente = void 0;
var typeorm_1 = require("typeorm");
var class_validator_1 = require("class-validator");
var transacao_experiencia_entity_1 = require("./transacao-experiencia.entity");
var Cliente = /** @class */ (function (_super) {
    __extends(Cliente, _super);
    function Cliente() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Cliente_1 = Cliente;
    Cliente.build = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var cliente;
            return __generator(this, function (_a) {
                cliente = new Cliente_1();
                cliente.nome = data.nome;
                cliente.email = data.email;
                cliente.cpf = data.cpf;
                cliente.telefone = data.telefone;
                if (data.ativo != undefined && data.ativo != null)
                    cliente.ativo = !!data.ativo;
                return [2 /*return*/, cliente];
            });
        });
    };
    var Cliente_1;
    __decorate([
        typeorm_1.PrimaryGeneratedColumn()
    ], Cliente.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column({ nullable: false, type: "text" })
    ], Cliente.prototype, "nome", void 0);
    __decorate([
        class_validator_1.IsEmail(),
        typeorm_1.Column({ nullable: false, unique: true, type: "varchar" })
    ], Cliente.prototype, "email", void 0);
    __decorate([
        typeorm_1.Column({ nullable: false, type: "text" })
    ], Cliente.prototype, "telefone", void 0);
    __decorate([
        typeorm_1.Column({ nullable: false, type: "text" })
    ], Cliente.prototype, "cpf", void 0);
    __decorate([
        typeorm_1.CreateDateColumn({ type: "timestamp" })
    ], Cliente.prototype, "creationDate", void 0);
    __decorate([
        typeorm_1.UpdateDateColumn({ type: "timestamp" })
    ], Cliente.prototype, "updateDate", void 0);
    __decorate([
        typeorm_1.Column({ type: 'boolean', nullable: false, default: true })
    ], Cliente.prototype, "ativo", void 0);
    __decorate([
        typeorm_1.OneToMany(function () { return transacao_experiencia_entity_1.TransacaoExperiencia; }, function (transacaoExperiencia) { return transacaoExperiencia.cliente; })
    ], Cliente.prototype, "transacaoExperiencia", void 0);
    Cliente = Cliente_1 = __decorate([
        typeorm_1.Entity()
    ], Cliente);
    return Cliente;
}(typeorm_1.BaseEntity));
exports.Cliente = Cliente;
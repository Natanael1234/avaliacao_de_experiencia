import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LojasModule } from './lojas/lojas.module';
import { ColaboradoresModule } from './colaboradores/colaboradores.module';
import { ClientesModule } from './clientes/clientes.module';
import { TransacoesExperienciasModule } from './transacoes-experiencias/transacoes-experiencias.module';
import { AvaliacoesExperienciasModule } from './avaliacoes-experiencias/avaliacoes-experiencias.module';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

const runningDockerCompose = process.env.BACKEND_SERVER == 'docker-compose';

let dbLocal:TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'admin',
  database: 'avaliacao_de_experiencia',
  synchronize: true,
  autoLoadEntities: true,
}

let dbDocker:TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3308,
  username: 'root',
  password: 'root',
  database: 'avaliacao_de_experiencia',
  synchronize: true,
  autoLoadEntities: true,
}

@Module({
  imports: [
    TypeOrmModule.forRoot(dbDocker),
    LojasModule,
    ColaboradoresModule,
    ClientesModule,
    TransacoesExperienciasModule,
    AvaliacoesExperienciasModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LojasModule } from './dominios/lojas/lojas.module';
import { ColaboradoresModule } from './dominios/colaboradores/colaboradores.module';

import { TransacoesExperienciasModule } from './dominios/transacoes-experiencias/transacoes-experiencias.module';

import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ClientesModule } from './dominios/clientes/clientes.module';
import { AvaliacoesExperienciasModule } from './dominios/avaliacoes-experiencias/avaliacoes-experiencias.module';

export const runningDockerCompose = process.env.BACKEND_SERVER == 'docker-compose';

export function getDbConfigs() {
  // TypeOrmModuleOptions
  const dbLocalConfig: any = {
    type: 'mysql',
    host: runningDockerCompose ? "banco_avaliacao_experiencia" : 'localhost',
    port: 3306,
    username: 'root',
    password: 'admin',
    database: 'avaliacao_de_experiencia',
    synchronize: true,
    autoLoadEntities: true,
  }

  const dbDockerConfig: any = {
    type: 'mysql',
    host: runningDockerCompose ? "banco_avaliacao_experiencia" : 'localhost',
    port: 3308,
    username: 'root',
    password: 'root',
    database: 'avaliacao_de_experiencia',
    synchronize: true,
    autoLoadEntities: true,
  }

  return dbDockerConfig;

}

@Module({
  imports: [
    TypeOrmModule.forRoot(getDbConfigs()),
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

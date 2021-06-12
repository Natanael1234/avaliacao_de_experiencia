import { Module } from '@nestjs/common';
import { ColaboradoresService } from './colaboradores.service';
import { ColaboradoresController } from './colaboradores.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Colaborador } from './entities/colaborador.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Colaborador])],
  exports: [TypeOrmModule],
  controllers: [ColaboradoresController],
  providers: [ColaboradoresService]
})
export class ColaboradoresModule { }

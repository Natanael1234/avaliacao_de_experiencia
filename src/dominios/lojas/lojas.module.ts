import { Module } from '@nestjs/common';
import { LojasService } from './lojas.service';
import { LojasController } from './lojas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Loja } from './entities/loja.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Loja])],
  exports:[TypeOrmModule],
  controllers: [LojasController],
  providers: [LojasService]
})
export class LojasModule {}

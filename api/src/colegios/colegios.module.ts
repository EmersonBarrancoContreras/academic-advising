import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColegiosController } from './colegios.controller';
import { ColegiosService } from './colegios.service';
import { Colegios } from '../entities/colegios.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Colegios])],
  controllers: [ColegiosController],
  providers: [ColegiosService],
  exports: [ColegiosService],
})
export class ColegiosModule {}

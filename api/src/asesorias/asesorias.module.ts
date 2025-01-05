// src/asesorias/asesorias.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AsesoriasController } from './asesorias.controller';
import { AsesoriasService } from './asesorias.service';
import { Asesorias } from '../entities/asesorias.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Asesorias])],
  controllers: [AsesoriasController],
  providers: [AsesoriasService],
  exports: [AsesoriasService],
})
export class AsesoriasModule {}

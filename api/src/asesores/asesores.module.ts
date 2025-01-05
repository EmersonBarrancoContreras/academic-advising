import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AsesoresController } from './asesores.controller';
import { AsesoresService } from './asesores.service';
import { Asesores } from '../entities/asesores.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Asesores])],
  controllers: [AsesoresController],
  providers: [AsesoresService],
  exports: [AsesoresService],
})
export class AsesoresModule {}

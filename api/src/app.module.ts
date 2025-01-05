import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './auth/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { AuthModule } from './auth/auth.module';
import { Asesores } from './entities/asesores.entity';
import { Usuarios } from './entities/usuarios.entity';
import { InstitutionsModule } from './institutions/institutions.module';
import { EstudianteModule } from './estudiante/estudiante.module';
import { AsesoriasModule } from './asesorias/asesorias.module';
import { CarrerasModule } from './carreras/carreras.module';
import { MateriasModule } from './materias/materias.module';
import { ColegiosModule } from './colegios/colegios.module';
import { AsesoresModule } from './asesores/asesores.module';
import { UniversidadesModule } from './universidades/universidades.module';
import { EvaluacionesModule } from './evaluaciones/evaluaciones.module';
import { PagosModule } from './pagos/pagos.module';
import { NotificacionesModule } from './notification/notification.module';
import { ReportesModule } from './reportes/reportes.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1234',
      database: 'academic',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      autoLoadEntities: true,
      synchronize: false,
      logging: true,
    }),
    TypeOrmModule.forFeature([Asesores, Usuarios]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'secretKey', // Llave secreta
      signOptions: { expiresIn: '1h' }, // Tiempo de expiración
    }),
    AuthModule,
    InstitutionsModule,
    EstudianteModule,
    AsesoriasModule,
    CarrerasModule,
    MateriasModule,
    ColegiosModule,
    AsesoresModule,
    UniversidadesModule,
    EvaluacionesModule,
    PagosModule,
    NotificacionesModule,
    ReportesModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
})
export class AppModule {}

export class ColegioDto {
  id: number;
  tipo: 'colegio';
  nombre: string;
  ciudad: string;
  direccion?: string;
  fechaRegistro: Date;
}

export class FilterInstitucionesDto {
  ciudad?: string;
  tipo?: 'universidad' | 'colegio' | 'todos';
  activas?: boolean;
}

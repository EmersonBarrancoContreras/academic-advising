import { DataSource } from 'typeorm';

const AppDataSource = new DataSource({
  type: 'postgres', // Cambia al tipo de tu base de datos (mysql, sqlite, etc.)
  host: 'localhost', // Dirección del servidor de la base de datos
  port: 5432, // Puerto de la base de datos
  username: 'postgres', // Usuario de la base de datos
  password: '1234', // Contraseña de la base de datos
  database: 'academic', // Nombre de la base de datos
  synchronize: false, // Usa `true` solo en desarrollo; en producción usa migraciones
  logging: true, // `true` si deseas ver las consultas SQL en consola
  entities: [__dirname + '/entities/**/*.ts'], // Ruta a tus entidades
  migrations: [__dirname + '/migrations/**/*.ts'], // Ruta a tus migraciones
  subscribers: [__dirname + '/subscribers/**/*.ts'], // Ruta a tus suscriptores (opcional)
});

export default AppDataSource;

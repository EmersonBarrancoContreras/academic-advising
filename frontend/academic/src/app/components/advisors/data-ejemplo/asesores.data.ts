// data/asesores.data.ts
import { Asesor } from '../interfaces/asesor.interface';

export const asesoresDestacadosData: Asesor[] = [
  {
    id: 1,
    nombre: 'Dra. Ana Martínez',
    especialidad: 'Matemáticas Avanzadas',
    calificacion: 4.9,
    descripcion: 'Especialista en cálculo y álgebra lineal con 10 años de experiencia.',
    precio: 50,
    disponibilidad: 'Disponible ahora',
    imagen: '',
    materias: 5,
    experiencia: 10,
    ubicacion: 'Madrid',
    numResenas: 156,
    satisfaccion: '98%'
  },
  {
    id: 2,
    nombre: 'Dr. Carlos Ruiz',
    especialidad: 'Física Cuántica',
    calificacion: 4.8,
    descripcion: 'Doctor en Física con experiencia en investigación y docencia.',
    precio: 45,
    disponibilidad: 'Próxima sesión: mañana',
    imagen: '',
    materias: 4,
    experiencia: 8,
    ubicacion: 'Barcelona',
    numResenas: 132,
    satisfaccion: '96%'
  }
];

export const asesoresData: Asesor[] = [
  {
    id: 3,
    nombre: 'Ing. Laura Pérez',
    especialidad: 'Programación',
    calificacion: 4.5,
    descripcion: 'Ingeniera de software especializada en Python y JavaScript.',
    precio: 40,
    disponibilidad: 'Disponible hoy',
    imagen: '',
    materias: 3,
    experiencia: 5,
    ubicacion: 'Barcelona',
    numResenas: 89
  },
  {
    id: 4,
    nombre: 'Prof. Miguel Santos',
    especialidad: 'Química',
    calificacion: 4.7,
    descripcion: 'Profesor universitario con experiencia en laboratorio.',
    precio: 42,
    disponibilidad: 'Disponible mañana',
    imagen: '',
    materias: 4,
    experiencia: 7,
    ubicacion: 'Valencia',
    numResenas: 94
  }
];

export const filterOptions = {
  areas: [
    { name: 'Matemáticas', code: 'MAT' },
    { name: 'Física', code: 'FIS' },
    { name: 'Química', code: 'QUI' },
    { name: 'Programación', code: 'PRO' }
  ],
  rangosPrecios: [
    { name: '$0 - $25/hora', code: '0-25' },
    { name: '$26 - $50/hora', code: '26-50' },
    { name: '$51 - $75/hora', code: '51-75' },
    { name: '$75+/hora', code: '75+' }
  ],
  disponibilidades: [
    { name: 'Disponible hoy', code: 'HOY' },
    { name: 'Esta semana', code: 'SEMANA' },
    { name: 'Fin de semana', code: 'FINDE' }
  ]
};

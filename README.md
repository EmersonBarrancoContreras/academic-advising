```
academic-advising
├─ .vscode
│  └─ settings.json
├─ api
│  ├─ .eslintrc.js
│  ├─ .prettierrc
│  │  ├─ src
│  │  │  ├─ app.controller.d.ts
│  │  │  ├─ app.controller.js
│  │  │  ├─ app.controller.js.map
│  │  │  ├─ app.module.d.ts
│  │  │  ├─ app.module.js
│  │  │  ├─ app.module.js.map
│  │  │  ├─ app.service.d.ts
│  │  │  ├─ app.service.js
│  │  │  ├─ app.service.js.map
│  │  │  ├─ auth
│  │  │  │  ├─ auth.controller.d.ts
│  │  │  │  ├─ auth.controller.js
│  │  │  │  ├─ auth.controller.js.map
│  │  │  │  ├─ auth.module.d.ts
│  │  │  │  ├─ auth.module.js
│  │  │  │  ├─ auth.module.js.map
│  │  │  │  ├─ auth.service.d.ts
│  │  │  │  ├─ auth.service.js
│  │  │  │  ├─ auth.service.js.map
│  │  │  │  ├─ constants
│  │  │  │  │  ├─ jwt.constant.d.ts
│  │  │  │  │  ├─ jwt.constant.js
│  │  │  │  │  └─ jwt.constant.js.map
│  │  │  │  ├─ dto
│  │  │  │  │  ├─ login-auth.dto.d.ts
│  │  │  │  │  ├─ login-auth.dto.js
│  │  │  │  │  ├─ login-auth.dto.js.map
│  │  │  │  │  ├─ register-auth.dto.d.ts
│  │  │  │  │  ├─ register-auth.dto.js
│  │  │  │  │  ├─ register-auth.dto.js.map
│  │  │  │  │  ├─ update-auth.dto.d.ts
│  │  │  │  │  ├─ update-auth.dto.js
│  │  │  │  │  └─ update-auth.dto.js.map
│  │  │  │  └─ guard
│  │  │  │     ├─ auth.guard.d.ts
│  │  │  │     ├─ auth.guard.js
│  │  │  │     └─ auth.guard.js.map
│  │  │  ├─ main.d.ts
│  │  │  ├─ main.js
│  │  │  ├─ main.js.map
│  │  │  └─ users
│  │  │     ├─ dto
│  │  │     │  ├─ create-user.dto.d.ts
│  │  │     │  ├─ create-user.dto.js
│  │  │     │  ├─ create-user.dto.js.map
│  │  │     │  ├─ update-user.dto.d.ts
│  │  │     │  ├─ update-user.dto.js
│  │  │     │  └─ update-user.dto.js.map
│  │  │     ├─ users.controller.d.ts
│  │  │     ├─ users.controller.js
│  │  │     ├─ users.controller.js.map
│  │  │     ├─ users.module.d.ts
│  │  │     ├─ users.module.js
│  │  │     ├─ users.module.js.map
│  │  │     ├─ users.service.d.ts
│  │  │     ├─ users.service.js
│  │  │     └─ users.service.js.map
│  │  └─ tsconfig.build.tsbuildinfo
│  ├─ nest-cli.json
│  ├─ output
│  │  ├─ entities
│  │  │  ├─ AreasEspecializacion.ts
│  │  │  ├─ Asesores.ts
│  │  │  ├─ Asesorias.ts
│  │  │  ├─ AuditoriaUsuarios.ts
│  │  │  ├─ Carreras.ts
│  │  │  ├─ CertificacionesAsesor.ts
│  │  │  ├─ Colegios.ts
│  │  │  ├─ ComprasPaquete.ts
│  │  │  ├─ EspecializacionesAsesor.ts
│  │  │  ├─ Estudiantes.ts
│  │  │  ├─ Evaluaciones.ts
│  │  │  ├─ HorariosDisponibilidad.ts
│  │  │  ├─ LogAccesos.ts
│  │  │  ├─ LogCambiosAsesorias.ts
│  │  │  ├─ LogCambiosMateriasAsesor.ts
│  │  │  ├─ LogCambiosSensibles.ts
│  │  │  ├─ LogMantenimiento.ts
│  │  │  ├─ LogRespaldos.ts
│  │  │  ├─ LogValidacionesAsesor.ts
│  │  │  ├─ MaterialDidactico.ts
│  │  │  ├─ Materias.ts
│  │  │  ├─ MateriasAsesor.ts
│  │  │  ├─ MicroCurriculos.ts
│  │  │  ├─ Notificaciones.ts
│  │  │  ├─ PagosAsesoria.ts
│  │  │  ├─ PaquetesAsesoria.ts
│  │  │  ├─ PreferenciasAsesoria.ts
│  │  │  ├─ Promociones.ts
│  │  │  ├─ PruebasValidacion.ts
│  │  │  ├─ RecursosEducativos.ts
│  │  │  ├─ RefreshTokens.ts
│  │  │  ├─ Reportes.ts
│  │  │  ├─ SedesUniversitarias.ts
│  │  │  ├─ TemasMateria.ts
│  │  │  ├─ Universidades.ts
│  │  │  └─ Usuarios.ts
│  │  ├─ ormconfig.json
│  │  └─ tsconfig.json
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ README.md
│  ├─ src
│  │  ├─ app.controller.spec.ts
│  │  ├─ app.controller.ts
│  │  ├─ app.module.ts
│  │  ├─ app.service.ts
│  │  ├─ auth
│  │  │  ├─ auth.controller.ts
│  │  │  ├─ auth.module.ts
│  │  │  ├─ auth.service.ts
│  │  │  ├─ constants
│  │  │  │  └─ jwt.constant.ts
│  │  │  ├─ dto
│  │  │  │  ├─ login-auth.dto.ts
│  │  │  │  ├─ register-auth.dto.ts
│  │  │  │  └─ update-auth.dto.ts
│  │  │  └─ guard
│  │  │     └─ auth.guard.ts
│  │  ├─ main.ts
│  │  └─ users
│  │     ├─ dto
│  │     │  ├─ create-user.dto.ts
│  │     │  └─ update-user.dto.ts
│  │     ├─ users.controller.ts
│  │     ├─ users.module.ts
│  │     └─ users.service.ts
│  ├─ test
│  │  ├─ app.e2e-spec.ts
│  │  └─ jest-e2e.json
│  ├─ tsconfig.build.json
│  └─ tsconfig.json
```

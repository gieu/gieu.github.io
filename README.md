# GIEU - Sitio institucional

Portal del Grupo de Investigación en Educación y Uso de Tecnologías (GIEU), construido con Astro.

## Descripción

Este proyecto sirve como sitio web institucional para:
- presentar líneas de investigación,
- mostrar proyectos y publicaciones,
- consumir datos desde fuentes externas y APIs internas,
- mantener una estructura ligera y rápida con Astro.

## Stack

- Astro
- TypeScript
- Tailwind CSS
- Cheerio para scraping de contenido HTML

## Estructura principal

```text
src/
├── components/
├── layouts/
├── pages/
│   ├── api/
│   │   └── publicaciones.json.ts
│   ├── index.astro
│   ├── projects.astro
│   └── research.astro
├── styles/
├── utils/
└── assets/
```

## Scripts disponibles

Ejecuta estos comandos desde la raíz del proyecto:

```bash
npm install
npm run dev
npm run build
npm run preview
npm run astro -- --help
```

### Descripción de scripts

| Comando | Acción |
| :--- | :--- |
| `npm install` | Instala dependencias del proyecto |
| `npm run dev` | Inicia el servidor de desarrollo |
| `npm run build` | Genera la versión de producción |
| `npm run preview` | Previsualiza el build localmente |
| `npm run astro -- --help` | Muestra ayuda de Astro CLI |

## Endpoint de publicaciones

El proyecto incluye un endpoint para obtener las publicaciones del grupo desde Scienti:

```text
/api/publicaciones.json
```

### Qué hace

- consulta la URL pública de Scienti,
- decodifica el HTML en ISO-8859-1,
- parsea la sección de publicaciones con Cheerio,
- extrae título, año, autores y revista/país,
- deduplica por título + año,
- devuelve un JSON con la estructura:

```json
{
  "publicaciones": [
    {
      "numero": "1.",
      "titulo": "Nombre de la publicación",
      "revistaPais": "Revista X - Colombia",
      "anio": "2024",
      "autores": "Autor 1, Autor 2"
    }
  ]
}
```

## Desarrollo local

```bash
npm run dev
```

La aplicación queda disponible en el puerto configurado por Astro (por defecto el puerto de desarrollo del proyecto).

## Despliegue con Docker

Se puede ejecutar con Docker Compose.

### Desarrollo / master

```bash
echo "PORT=8517" > .env
docker-compose up --build --force-recreate --no-deps -d
```

### Staging

```bash
echo "PORT=8518" > .env
docker-compose up --build --force-recreate --no-deps -d
```

### Producción

```bash
docker-compose up --build --force-recreate --no-deps -d
```

### URLs esperadas

- Master: http://localhost:8517
- Staging: http://localhost:8518
- Producción: http://localhost:4321

## Variables de entorno

Puedes crear un `.env` para personalizar el despliegue:

```env
PORT=4321
NODE_ENV=production
```

## Notas

- La lógica de scraping está centralizada en [src/pages/api/publicaciones.json.ts](src/pages/api/publicaciones.json.ts).
- La vista de investigación consume dicho endpoint para renderizar las publicaciones en la interfaz.
- El proyecto está listo para seguir ampliando contenido institucional y datos externos.

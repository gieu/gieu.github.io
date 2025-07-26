# 📋 Configuración de Google Sheets para Investigaciones GIEU

## 🔧 Pasos para configurar Google Sheets para Investigaciones:

### 1. Crear nueva hoja de cálculo
1. Ve a [Google Sheets](https://sheets.google.com)
2. Crea una nueva hoja de cálculo o agrega una nueva pestaña a la existente
3. Nómbrala "Investigaciones GIEU"

### 2. Estructura de la tabla
Crea las siguientes columnas en la primera fila (respeta exactamente estos nombres):

| A | B | C | D | E | F | G | H | I | J |
|---|---|---|---|---|---|---|---|---|---|
| titulo | descripcion | estado | año_inicio | año_fin | categoria | tecnologias | color_borde | color_boton | url_detalles |

### 3. Ejemplo de datos
```
Impacto de la Realidad Virtual en el Aprendizaje de Química | Estudio longitudinal sobre el uso de entornos virtuales inmersivos para la enseñanza de conceptos químicos complejos en estudiantes de educación secundaria y superior. | En progreso | 2023 | 2025 | Realidad Virtual | Realidad Virtual,Química,Educación Superior | daisy_bush-600 | daisy_bush-600 | https://ejemplo.com/investigacion-vr
```

### 4. Colores disponibles
Para `color_borde` y `color_boton` usa estos valores:
- `daisy_bush-600` (Morado/Violeta)
- `Shiraz-600` (Rojo/Rosa)
- `cod_gray-600` (Gris)

### 5. Estados sugeridos
- En progreso
- Finalizado
- Planificado
- En pausa
- Publicado

### 6. Categorías sugeridas
- Realidad Virtual
- Gamificación
- Inteligencia Artificial
- Robótica Educativa
- Evaluación Educativa
- Inclusión STEM
- Tecnología Educativa

### 7. Tecnologías (separadas por comas)
- Realidad Virtual, Química, Educación Superior
- Gamificación, Matemáticas, Motivación
- Inteligencia Artificial, Evaluación, Personalización
- Python, Machine Learning, Análisis de Datos

### 8. URLs para "Ver detalles"
En la columna `url_detalles` puedes poner:
- **Papers publicados**: `https://doi.org/10.1000/ejemplo`
- **Repositorios**: `https://github.com/gieu/investigacion`
- **Documentos**: `https://docs.google.com/document/d/...`
- **Sitios web del proyecto**: `https://investigacion.ejemplo.com`
- **Dejar vacío**: El botón aparecerá deshabilitado

### 9. Publicar la hoja como CSV
1. En tu hoja de Google Sheets, ve a **Archivo** > **Compartir** > **Publicar en la web**
2. En "Enlace", selecciona la hoja específica de investigaciones
3. En formato, selecciona **Valores separados por comas (.csv)**
4. Copia la URL generada
5. En el archivo `src/utils/googleSheets.ts`, actualiza la URL de investigaciones:
   ```typescript
   const SHEET_URL = 'TU_URL_AQUI';
   ```

### 10. Configurar GID específico
Si tienes múltiples hojas, necesitas el GID específico:
1. Ve a la hoja de investigaciones
2. Copia el número después de `#gid=` en la URL
3. Agrega `&gid=TU_GID` a la URL de publicación

## ✨ **Características del sistema:**

### 🔍 **Búsqueda inteligente:**
- Busca en títulos, descripciones y categorías
- Filtros por estado, año y categoría
- Contador de resultados en tiempo real
- Mensaje cuando no hay resultados

### 🎨 **Diseño dinámico:**
- Colores de borde personalizables por investigación
- Botones adaptativos según el estado
- Badges de tecnologías con colores automáticos
- Responsive en todos los dispositivos

### 🔗 **Enlaces inteligentes:**
- Botón "Ver detalles" para investigaciones en progreso
- Botón "Ver publicación" para investigaciones finalizadas
- Enlaces externos se abren en nueva pestaña
- Botón deshabilitado si no hay URL

## 🚀 **Para activarlo:**

1. Configura tu Google Sheets con la estructura indicada
2. Publica la hoja como CSV
3. Actualiza la URL en `googleSheets.ts`
4. ¡Las investigaciones aparecerán automáticamente con búsqueda funcional!

## 📊 **Ejemplo completo de fila:**
```
Título: "Gamificación y Motivación en Matemáticas"
Descripción: "Investigación sobre el efecto de elementos de gamificación en la motivación y rendimiento académico..."
Estado: "Finalizado"
Año inicio: "2022"
Año fin: "2023"
Categoría: "Gamificación"
Tecnologías: "Gamificación,Matemáticas,Motivación"
Color borde: "Shiraz-600"
Color botón: "Shiraz-600"
URL detalles: "https://doi.org/10.1000/ejemplo-gamificacion"
```

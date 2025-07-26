# 📋 Configuración de Google Sheets para Proyectos GIEU

## 🔧 Pasos para configurar Google Sheets:

### 1. Crear la hoja de cálculo
1. Ve a [Google Sheets](https://sheets.google.com)
2. Crea una nueva hoja de cálculo
3. Nómbrala "Proyectos GIEU" o como prefieras

### 2. Estructura de la tabla
Crea las siguientes columnas en la primera fila (respeta exactamente estos nombres):

| A | B | C | D | E | F | G | H | I |
|---|---|---|---|---|---|---|---|---|
| titulo | descripcion | tecnologias | estado | año | imagen_url | color_principal | color_secundario | url_vermas |

### 3. Ejemplo de datos
```
Laboratorio Virtual de Química | Plataforma interactiva que permite a estudiantes realizar experimentos químicos virtuales de forma segura y accesible. | React,WebGL,Educación | En desarrollo | 2023 | https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=400&h=300&fit=crop | Shiraz-600 | Shiraz-700 | https://ejemplo.com/laboratorio-quimica
```

### 4. Colores disponibles
Para `color_principal` y `color_secundario` usa estos valores:
- `Shiraz-600`, `Shiraz-700`
- `daisy_bush-600`, `daisy_bush-700` 
- `cod_gray-600`, `cod_gray-700`

### 5. Estados sugeridos
- En desarrollo
- Finalizado
- Activo
- Beta
- Investigación
- Planificado

### 6. URLs de imágenes sugeridas
Para la columna `imagen_url` puedes usar:
- **Unsplash**: `https://images.unsplash.com/photo-[ID]?w=400&h=300&fit=crop`
- **Tu servidor**: `https://tusitio.com/images/proyecto.jpg`
- **Google Drive**: URL pública de imagen
- **GitHub**: `https://raw.githubusercontent.com/usuario/repo/main/imagen.jpg`
- **Otros servicios**: Cualquier URL directa a imagen (jpg, png, webp)

**Ejemplos temáticos:**
- Química: `https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=400&h=300&fit=crop`
- Matemáticas: `https://images.unsplash.com/photo-1509228468518-180dd4864904?w=400&h=300&fit=crop`
- Robótica: `https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=300&fit=crop`

### 7. Publicar la hoja como CSV
1. En tu hoja de Google Sheets, ve a **Archivo** > **Compartir** > **Publicar en la web**
2. En "Enlace", selecciona la hoja específica que contiene los proyectos
3. En formato, selecciona **Valores separados por comas (.csv)**
4. Marca "Volver a publicar automáticamente cuando se realicen cambios"
5. Copia el enlace generado

### 8. Configurar en el código
1. Abre el archivo `src/utils/googleSheets.ts`
2. Reemplaza `TU_SHEET_ID` con el ID de tu hoja (está en la URL)
3. Reemplaza `TU_GID` con el GID de la hoja específica

#### ¿Cómo obtener el SHEET_ID y GID?

**SHEET_ID**: En la URL de tu Google Sheet:
```
https://docs.google.com/spreadsheets/d/1ABC123DEF456GHI789JKL/edit#gid=0
                                      ^^^^^^^^^^^^^^^^^^^^^^^^
                                      Este es tu SHEET_ID
```

**GID**: Al final de la URL después de `#gid=`:
```
https://docs.google.com/spreadsheets/d/1ABC123DEF456GHI789JKL/edit#gid=123456789
                                                                     ^^^^^^^^^
                                                                     Este es tu GID
```

Si no hay `#gid=` en la URL, el GID es `0`.

### 8. URLs para "Ver más"
En la columna `url_vermas` puedes poner:
- **Enlaces externos**: `https://ejemplo.com/proyecto`
- **Páginas internas**: `/detalles/proyecto-1`
- **Documentos**: `https://docs.google.com/document/d/...`
- **Repositorios**: `https://github.com/usuario/proyecto`
- **Demos**: `https://demo.proyecto.com`
- **Dejar vacío**: El botón aparecerá deshabilitado

### 9. URL final
Tu URL final debe verse así:
```
https://docs.google.com/spreadsheets/d/TU_SHEET_ID/export?format=csv&gid=TU_GID
```

## ✅ Ventajas de esta implementación:

1. **Actualización en tiempo real**: Los cambios en Google Sheets se reflejan automáticamente
2. **No requiere código**: Puedes agregar/editar proyectos sin tocar código
3. **Respaldo**: Si Google Sheets falla, muestra datos predeterminados
4. **Fácil mantenimiento**: El equipo puede actualizar proyectos colaborativamente
5. **Escalable**: Puedes agregar tantos proyectos como necesites

## 🔄 Actualización de datos
Los datos se actualizan cada vez que se carga la página. Si necesitas forzar una actualización, puedes:
1. Hacer un cambio mínimo en Google Sheets (agregar un espacio y quitarlo)
2. Esto activará la republicación automática

## 🚨 Notas importantes:
- Mantén la hoja pública (solo lectura) para que funcione
- No cambies los nombres de las columnas
- Las tecnologías deben ir separadas por comas sin espacios extra
- Los emojis funcionan perfectamente como iconos
- El botón "Ver más" puede ser configurado posteriormente para mostrar detalles completos del proyecto

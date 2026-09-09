export interface Proyecto {
  titulo: string;
  descripcion: string;
  tecnologias: string[];
  estado: string;
  año: string;
  imagen_url: string;
  color_principal: string;
  color_secundario: string;
  url_vermas?: string;
}

export interface Investigacion {
  titulo: string;
  descripcion: string;
  estado: string;
  año_inicio: string;
  año_fin: string;
  categoria: string;
  tecnologias: string[];
  color_borde: string;
  color_boton: string;
  url_detalles?: string;
}

export async function obtenerProyectos(): Promise<Proyecto[]> {
  try {
    // URL de Google Sheets publicado como CSV
    // Reemplaza 'TU_SHEET_ID' con el ID de tu hoja de cálculo
    // y 'TU_GID' con el GID de la hoja específica
    const SHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vT4XuxAP6ZkIOmG2YueX0jPDTo6FaZfaTDnTzgx-XLJ1VRf2uBoEoBgOi6tociPvjPOvIVNOBo0eKqu/pub?output=csv';
    
    const response = await fetch(SHEET_URL);
    
    if (!response.ok) {
      throw new Error(`Error al obtener datos: ${response.status}`);
    }
    
    const csvText = await response.text();
    return parsearCSVProyectos(csvText);
  } catch (error) {
    console.error('Error al obtener proyectos:', error);
    // Retornar datos de respaldo en caso de error
    return obtenerProyectosRespaldo();
  }
}

export async function obtenerInvestigaciones(): Promise<Investigacion[]> {
  try {
    // URL de Google Sheets para investigaciones (tendrás que configurar una nueva hoja)
    // Por ahora usa la misma URL como ejemplo, pero deberías crear una hoja separada
    const SHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRbFzRT89Wzm3IWVq8FAg2JribA19ZJy4K_12weEx-8Wcec4mrZty38zOvz8gr03tWntjrdJdthinNY/pub?output=csv';
    
    const response = await fetch(SHEET_URL);
    
    if (!response.ok) {
      throw new Error(`Error al obtener investigaciones: ${response.status}`);
    }
    
    const csvText = await response.text();
    return parsearCSVInvestigaciones(csvText);
  } catch (error) {
    console.error('Error al obtener investigaciones:', error);
    // Retornar datos de respaldo en caso de error
    return obtenerInvestigacionesRespaldo();
  }
}

function parsearCSVProyectos(csvText: string): Proyecto[] {
  const lines = csvText.split('\n');
  const headers = lines[0].split(',').map(header => header.trim().replace(/"/g, ''));
  
  const proyectos: Proyecto[] = [];
  
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (line.trim() === '') continue;
    
    const values = parsearLineaCSV(line);
    
    if (values.length >= headers.length) {
      const proyecto: Proyecto = {
        titulo: values[0] || '',
        descripcion: values[1] || '',
        tecnologias: values[2] ? values[2].split(',').map(tech => tech.trim()) : [],
        estado: values[3] || '',
        año: values[4] || '',
        imagen_url: values[5] || '',
        color_principal: values[6] || 'cod_gray-600',
        color_secundario: values[7] || 'cod_gray-700',
        url_vermas: values[8] || undefined,
      };
      
      proyectos.push(proyecto);
    }
  }
  
  return proyectos;
}

function parsearCSVInvestigaciones(csvText: string): Investigacion[] {
  const lines = csvText.split('\n');
  const headers = lines[0].split(',').map(header => header.trim().replace(/"/g, ''));
  
  const investigaciones: Investigacion[] = [];
  
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (line.trim() === '') continue;
    
    const values = parsearLineaCSV(line);
    
    if (values.length >= 8) {
      const investigacion: Investigacion = {
        titulo: values[0] || '',
        descripcion: values[1] || '',
        estado: values[2] || '',
        año_inicio: values[3] || '',
        año_fin: values[4] || '',
        categoria: values[5] || '',
        tecnologias: values[6] ? values[6].split(',').map(tech => tech.trim()) : [],
        color_borde: values[7] || 'daisy_bush-600',
        color_boton: values[8] || 'daisy_bush-600',
        url_detalles: values[9] || undefined,
      };
      
      investigaciones.push(investigacion);
    }
  }
  
  return investigaciones;
}

function parsearLineaCSV(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  
  result.push(current.trim());
  return result.map(value => value.replace(/"/g, ''));
}

// Datos de respaldo en caso de que falle la conexión
function obtenerProyectosRespaldo(): Proyecto[] {
  return [
    {
      titulo: "Laboratorio Virtual de Química",
      descripcion: "Plataforma interactiva que permite a estudiantes realizar experimentos químicos virtuales de forma segura y accesible.",
      tecnologias: ["React", "WebGL", "Educación"],
      estado: "En desarrollo",
      año: "2023",
      imagen_url: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=400&h=300&fit=crop",
      color_principal: "Shiraz-600",
      color_secundario: "Shiraz-700",
      url_vermas: "https://ejemplo.com/laboratorio-quimica"
    },
    {
      titulo: "App de Matemáticas Interactivas",
      descripcion: "Aplicación móvil que gamifica el aprendizaje de matemáticas para estudiantes de primaria y secundaria.",
      tecnologias: ["Flutter", "Firebase", "Gamificación"],
      estado: "Finalizado",
      año: "2022",
      imagen_url: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=400&h=300&fit=crop",
      color_principal: "daisy_bush-600",
      color_secundario: "daisy_bush-700",
      url_vermas: "https://ejemplo.com/app-matematicas"
    },
    {
      titulo: "Plataforma de Robótica Educativa",
      descripcion: "Sistema integral para enseñar programación y robótica a través de simuladores y kits educativos.",
      tecnologias: ["Python", "Arduino", "IoT"],
      estado: "En desarrollo",
      año: "2024",
      imagen_url: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=300&fit=crop",
      color_principal: "cod_gray-600",
      color_secundario: "cod_gray-700",
      url_vermas: "https://ejemplo.com/robotica-educativa"
    }
  ];
}

function obtenerInvestigacionesRespaldo(): Investigacion[] {
  return [
    {
      titulo: "Impacto de la Realidad Virtual en el Aprendizaje de Química",
      descripcion: "Estudio longitudinal sobre el uso de entornos virtuales inmersivos para la enseñanza de conceptos químicos complejos en estudiantes de educación secundaria y superior.",
      estado: "En progreso",
      año_inicio: "2023",
      año_fin: "2025",
      categoria: "Realidad Virtual",
      tecnologias: ["Realidad Virtual", "Química", "Educación Superior"],
      color_borde: "daisy_bush-600",
      color_boton: "daisy_bush-600",
      url_detalles: "https://ejemplo.com/investigacion-vr-quimica"
    },
    {
      titulo: "Gamificación y Motivación en Matemáticas",
      descripcion: "Investigación sobre el efecto de elementos de gamificación en la motivación y rendimiento académico de estudiantes en matemáticas de educación básica.",
      estado: "Finalizado",
      año_inicio: "2022",
      año_fin: "2023",
      categoria: "Gamificación",
      tecnologias: ["Gamificación", "Matemáticas", "Motivación"],
      color_borde: "Shiraz-600",
      color_boton: "Shiraz-600",
      url_detalles: "https://ejemplo.com/investigacion-gamificacion-matematicas"
    },
    {
      titulo: "Inteligencia Artificial en Evaluación Educativa",
      descripcion: "Desarrollo de sistemas de evaluación adaptativos basados en IA que personalizan las pruebas según el nivel de conocimiento y estilo de aprendizaje del estudiante.",
      estado: "En progreso",
      año_inicio: "2024",
      año_fin: "2026",
      categoria: "Inteligencia Artificial",
      tecnologias: ["Inteligencia Artificial", "Evaluación", "Personalización"],
      color_borde: "cod_gray-600",
      color_boton: "cod_gray-600",
      url_detalles: "https://ejemplo.com/investigacion-ia-evaluacion"
    }
  ];
}

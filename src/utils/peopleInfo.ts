//leaders photos
import camiloVieira from "../assets/img/leaders/Camilo Vieira.png"
import marianaArboleda from "../assets/img/leaders/Mariana Arboleda.png"
import gabrielaDeLaRosa from "../assets/img/leaders/Gabriela de la Rosa.png"
import angiePadilla from "../assets/img/leaders/Angie Padilla.png"
import roxanaQuintana from "../assets/img/leaders/Roxana Quintero.png"
//memers photos
import andreaAngulo from "../assets/img/members/Andrea Angulo.png"
import camilaDeLaHoz from "../assets/img/members/Camila de la Hoz.png"
import carolinaFontalvo from "../assets/img/members/Carolina Fontalvo.png"
import catalinaOrozco from "../assets/img/members/Catalina Orozco.png"
import elianaMora from "../assets/img/members/Eliana Mora.png"
import jesusMontilla from "../assets/img/members/Jesús Montilla.png"
import joseMola from "../assets/img/members/Jose A. Mola.png"
import karenVargas from "../assets/img/members/Karen Vargas.png"
import lauraCardoso from "../assets/img/members/Laura Cardoso.png"
import mariaGonzales from "../assets/img/members/María A. González M..png"
import michellCarvajal from "../assets/img/members/Michell Carvajal.png"
import saraHernandez from "../assets/img/members/Sara Hernández.png"
import sarayPinerez from "../assets/img/members/Saray Piñerez.png"
import williamPerez from "../assets/img/members/William Pérez.png"

export interface Person {
	name: string;
	role: string;
	description?: string;
	photo?: string;
}

export const leaders: Person[] = [
	{
		name: "Camilo Vieira",
		role: "Director de MyE",
		description: `Camilo Vieira es ingeniero de sistemas y cuenta con un doctorado en Computational Science and Engineering Education. Su trayectoria combina la investigación, la visualización de datos y la innovación educativa para mejorar los procesos de aprendizaje. Como líder, Camilo se distingue por su amor a la enseñanza y por su cercanía con estudiantes y colegas. Es una persona amable, colaboradora y de gran corazón.`,
		photo: camiloVieira.src	
	},
	{
		name: "Mariana Arboleda",
		role: "Líder de datos",
		description: `Mariana Arboleda es ingeniera de producción, magíster en Ingeniería y doctoranda en Educación. Su trayectoria combina el análisis de datos, la investigación educativa y la enseñanza, con especial interés en cómo las personas aprenden y enseñan ciencia de datos. Como líder, Mariana es atenta y amigable. Está siempre pendiente de sus actividades y guía a su equipo con compromiso, cercanía y una cálida sonrisa.`,
		photo: marianaArboleda.src,
	},
	{
		name: "Gabriela de la Rosa",
		role: "Líder de evaluación C3",
		description: ``,
		photo: gabrielaDeLaRosa.src
	},
	{
		name: "Angie padilla",
		role: "Líder de evaluación C2",
		description: ``,
		photo: angiePadilla.src
	},
	{
		name: "Roxana Quintero",
		role: "Gerente de Proyecto 2024-2025",
		description: ``,
		photo: roxanaQuintana.src
	}

];

export const members: Person[] = [ 
	{ 
		name: "Carolina Fontalvo", 
		role: "Analista de MyE",
		photo: carolinaFontalvo.src 
	}, 
	{ 
		name: "Eliana Mora", 
		role: "Analista de MyE",
		photo: elianaMora.src
	},
	{ 
		name: "Catalina Orozco", 
		role: "Analista de MyE",
		photo: catalinaOrozco.src
	},
	{ 
		name: "Saray Piñerez", 
		role: "Analista de MyE",
		photo: sarayPinerez.src
	},
	{ 
		name: "Karen Vargas", 
		role: "Analista de MyE",
		photo: karenVargas.src
	},
	{ 
		name: "Andrea Angulo", 
		role: "Asistente Administrativa",
		photo: andreaAngulo.src
	},
	{ 
		name: "William Pérez", 
		role: "Asistente de análisis y visualización",
		photo: williamPerez.src
	},
	{ 
		name: "Jesús Montilla", 
		role: "Asistente de análisis y visualización",
		photo: jesusMontilla.src
	},
	{ 
		name: "Camila de la Hoz", 
		role: "Auxiliar de MyE",
		photo: camilaDeLaHoz.src
	},
	{ 
		name: "Laura Cardoso", 
		role: "Auxiliar de MyE",
		photo: lauraCardoso.src
	},
	{ 
		name: "Sara Hernández", 
		role: "Auxiliar de MyE",
		photo: saraHernandez.src
	},
	{ 
		name: "Michell Carvajal", 
		role: "Auxiliar de análisis y visualización",
		photo: michellCarvajal.src
	},
	{ 
		name: "María A. González M.", 
		role: "Asesora de género",
		photo: mariaGonzales.src
	},
	{ 
		name: "Jose A. Mola", 
		role: "Asesor de evaluación de impacto",
		photo: joseMola.src
	},
	
];
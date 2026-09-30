// La costura entre la interfaz y el origen de los datos.
//
// Por ahora devuelven datos de ejemplo escritos a mano (para la presentación).
// Cuando exista la base de datos, lo único que cambia es el cuerpo de estas
// funciones; las pantallas no se tocan.
//
// Son async a propósito, aunque hoy no esperen nada: las páginas ya las llaman
// como componentes de servidor asíncronos, así que conectar Prisma no cambiará
// la forma de ninguna pantalla.

import type {
  Aviso,
  Autor,
  Categoria,
  Estadisticas,
  EstadoEnProblema,
  Hilo,
  ProblemaDelSet,
  TopUsuario,
  UsuarioEnLinea,
} from "./tipos";

/**
 * Las tres secciones de la portada. Los títulos son estructura del producto y
 * se quedan; las filas salen de la base.
 *
 * TODO: `Ramo` filtrado por semestre vigente, con el conteo de
 * `AsignacionProblema` y `Envio`, y el último envío de cada uno.
 */
export async function obtenerCategorias(): Promise<Categoria[]> {
  return [
    {
      id: "ramos",
      titulo: "Ramos en curso",
      vacio: "Todavía no hay ramos publicados para este semestre.",
      filas: [
        {
          slug: "info082",
          titulo: "INFO082 · Programación",
          desc: "Primer curso de programación. Problemas semanales de implementación y strings.",
          etiquetas: ["C++", "Python"],
          problemas: 12,
          envios: 1843,
          ultimo: { que: "Cuenta de vocales", quien: "matias2005-20", rating: 1750, cuando: "hace 5 min" },
          icono: "nuevo",
        },
        {
          slug: "info165",
          titulo: "INFO165 · Estructuras de Datos",
          desc: "Pilas, colas, árboles y heaps. Evaluaciones con juez automático.",
          etiquetas: ["C++"],
          problemas: 9,
          envios: 1027,
          ultimo: { que: "Mediana en línea", quien: "Lasc19", rating: 2100, cuando: "hace 32 min" },
          icono: "normal",
        },
        {
          slug: "info183",
          titulo: "INFO183 · Algoritmos",
          desc: "Grafos, programación dinámica y búsqueda. Set de la unidad 2 abierto.",
          etiquetas: ["C++", "Java"],
          problemas: 6,
          envios: 512,
          ultimo: { que: "Rutas del campus Isla Teja", quien: "facs2005", rating: 1520, cuando: "hace 2 h" },
          icono: "listo",
        },
      ],
    },
    {
      id: "practica",
      titulo: "Práctica libre",
      nota: "Abierto a toda la universidad",
      vacio: "Todavía no hay problemas liberados a práctica libre.",
      filas: [
        {
          slug: "practica-basica",
          titulo: "Problemas de iniciación",
          desc: "Para quien recién empieza: entrada, salida y ciclos.",
          etiquetas: ["principiante"],
          problemas: 20,
          envios: 3210,
          ultimo: { que: "Suma de dos números", quien: "jurjur45", rating: 980, cuando: "hace 12 min" },
          icono: "normal",
        },
      ],
    },
    {
      id: "comunidad",
      titulo: "Comunidad",
      vacio: "Todavía no hay secciones de comunidad abiertas.",
      filas: [
        {
          slug: "maraton",
          titulo: "Preparación para la maratón",
          desc: "Entrenamiento para la competencia de programación ICPC.",
          problemas: 15,
          envios: 764,
          ultimo: { que: "Marea del río Calle-Calle", quien: "Lasc19", rating: 2100, cuando: "ayer" },
          icono: "normal",
        },
      ],
    },
  ];
}

/** TODO: `Usuario` ordenado por rating, con el delta desde `CambioRating`. */
export async function obtenerTopRating(): Promise<TopUsuario[]> {
  return [
    { puesto: 1, usuario: "Lasc19", carrera: "Ing. Civil Informática", rating: 2100, delta: 35 },
    { puesto: 2, usuario: "matias2005-20", carrera: "Ing. Civil Informática", rating: 1750, delta: 12 },
    { puesto: 3, usuario: "facs2005", carrera: "Ing. Civil Electrónica", rating: 1520, delta: -8 },
    { puesto: 4, usuario: "SoulFast23", carrera: "Ing. Civil Informática", rating: 1240, delta: 20 },
    { puesto: 5, usuario: "jurjur45", carrera: "Bioinformática", rating: 980, delta: 0, yo: true },
  ];
}

/** TODO: sesiones con actividad en los últimos 15 minutos. */
export async function obtenerEnLinea(): Promise<UsuarioEnLinea[]> {
  return [
    { usuario: "Lasc19", rating: 2100 },
    { usuario: "matias2005-20", rating: 1750 },
    { usuario: "jurjur45", rating: 980 },
  ];
}

/** TODO: conteos agregados. Conviene cachearlos, no contarlos en cada carga. */
export async function obtenerEstadisticas(): Promise<Estadisticas> {
  return {
    enviosTotales: 7356,
    problemasPublicados: 62,
    miembros: 248,
    conectados: 3,
    miembroMasReciente: "SoulFast23",
  };
}

/** TODO: el anuncio fijado vigente del ramo o de la plataforma. */
export async function obtenerAviso(): Promise<Aviso | null> {
  return {
    id: "aviso-1",
    cuerpo: "El set de la unidad 2 de INFO183 cierra el viernes a las 23:59.",
  };
}

const docente: Autor = {
  handle: "prof.rojas",
  rating: 2300,
  rol: "Docente",
  mensajes: 87,
  desde: "mar 2024",
};

const alumno: Autor = {
  handle: "jurjur45",
  rating: 980,
  rol: "Estudiante",
  mensajes: 14,
  desde: "mar 2026",
};

/** TODO: `Hilo` por id, con sus mensajes paginados y el enunciado fijado. */
export async function obtenerHilo(): Promise<Hilo | null> {
  return {
    titulo: "B · Cuenta de vocales",
    limites: "1 s · 256 MB",
    ramo: { codigo: "INFO082", nombre: "Programación" },
    mensajes: [
      {
        id: "m1",
        numero: 1,
        autor: docente,
        cuando: "28 sep 2026, 10:00",
        fijado: true,
        cuerpo:
          "Dada una palabra en minúsculas, imprime cuántas vocales tiene. La palabra tiene entre 1 y 10⁵ letras.",
      },
      {
        id: "m2",
        numero: 2,
        autor: alumno,
        cuando: "28 sep 2026, 18:42",
        cuerpo: "Mi solución recorre la palabra una sola vez, así que es O(n).",
        envio: {
          veredicto: "ac",
          lenguaje: "Python 3",
          archivo: "vocales.py",
          codigo: 'palabra = input().strip()\nprint(sum(1 for c in palabra if c in "aeiou"))',
          casos: [
            { n: 1, desc: "«valdivia» → «4»", ms: 10, veredicto: "ac" },
            { n: 2, desc: "«xyz» → «0»", ms: 12, veredicto: "ac" },
            { n: 3, desc: "palabra de 10⁵ letras", ms: 24, veredicto: "ac" },
            { n: 4, desc: "aleatorio", ms: 11, veredicto: "ac" },
          ],
          resumen: "4 de 4 casos correctos · 24 ms máximo",
        },
      },
      {
        id: "m3",
        numero: 3,
        autor: docente,
        cuando: "28 sep 2026, 19:05",
        cita: { de: "jurjur45", texto: "Mi solución recorre la palabra una sola vez, así que es O(n)." },
        cuerpo: "Correcto. Buena solución, es justo lo que se esperaba.",
      },
    ],
    totalMensajes: 3,
    pagina: 1,
    totalPaginas: 1,
  };
}

/** TODO: los envíos del usuario en esta asignación. */
export async function obtenerEstadoEnProblema(): Promise<EstadoEnProblema | null> {
  return { veredicto: "ac", intentos: 2, mejorTiempoMs: 24, puntaje: 100 };
}

/** TODO: las asignaciones del ramo con el mejor veredicto del usuario. */
export async function obtenerProblemasDelSet(): Promise<ProblemaDelSet[]> {
  return [
    { letra: "A", nombre: "Suma de dos números", veredicto: "ac" },
    { letra: "B", nombre: "Cuenta de vocales", veredicto: "ac" },
    { letra: "C", nombre: "Mochila del estudiante", veredicto: "wa" },
    { letra: "D", nombre: "Rutas del campus Isla Teja", veredicto: "tle" },
    { letra: "E", nombre: "Mediana en línea", veredicto: null },
  ];
}

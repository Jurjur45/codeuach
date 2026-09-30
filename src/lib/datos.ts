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
  EnvioFila,
  Hilo,
  PerfilUsuario,
  ProblemaDelSet,
  ResumenVeredictos,
  TopUsuario,
  UsuarioEnLinea,
} from "./tipos";

/**
 * Las secciones de la portada. Los títulos son estructura del producto y
 * se quedan; las filas salen de la base.
 *
 * TODO: `Ramo` filtrado por semestre vigente, con el conteo de
 * `AsignacionProblema` y `Envio`, y el último envío de cada uno.
 */
export async function obtenerCategorias(): Promise<Categoria[]> {
  return [
    {
      id: "practica",
      titulo: "Práctica libre",
      nota: "Abierto a toda la universidad",
      vacio: "Todavía no hay problemas liberados a práctica libre.",
      filas: [
        {
          slug: "iniciacion",
          titulo: "Problemas de iniciación",
          desc: "Para quien recién empieza: entrada, salida y ciclos.",
          etiquetas: ["principiante"],
          problemas: 20,
          envios: 3210,
          ultimo: { que: "Suma de dos números", quien: "jurjur45", rating: 2650, cuando: "hace 12 min" },
          icono: "nuevo",
        },
        {
          slug: "strings",
          titulo: "Strings y arreglos",
          desc: "Recorridos, conteos y manipulación de texto.",
          etiquetas: ["strings", "arreglos"],
          problemas: 14,
          envios: 1845,
          ultimo: { que: "Cuenta de vocales", quien: "matias2005-20", rating: 100, cuando: "hace 40 min" },
          icono: "listo",
        },
        {
          slug: "algoritmos",
          titulo: "Grafos y programación dinámica",
          desc: "Problemas de nivel intermedio y avanzado para entrenar.",
          etiquetas: ["grafos", "dp"],
          problemas: 11,
          envios: 902,
          ultimo: { que: "Rutas del campus Isla Teja", quien: "Lasc19", rating: 100, cuando: "hace 3 h" },
          icono: "normal",
        },
      ],
    },
  ];
}

/** TODO: el usuario de la sesión, con sus conteos y su puesto en el ranking. */
export async function obtenerPerfil(): Promise<PerfilUsuario> {
  return {
    handle: "jurjur45",
    carrera: "Hacker",
    rating: 2650,
    puesto: 1,
    totalUsuarios: 248,
    resueltos: 187,
    intentados: 6,
    envios: 412,
    aceptacion: 78,
    racha: 36,
    ultimosResueltos: [
      { nombre: "Cuenta de vocales", ramo: "INFO082", cuando: "ayer" },
      { nombre: "Suma de dos números", ramo: "INFO082", cuando: "hace 3 días" },
      { nombre: "Pila balanceada", ramo: "INFO165", cuando: "hace 5 días" },
    ],
    deltaSemana: 45,
    historial: [2380, 2425, 2410, 2490, 2545, 2605, 2650],
    rival: { handle: "Lasc19", rating: 100, puesto: 2 },
  };
}

/** TODO: `Usuario` ordenado por rating (y resueltos, para desempatar), con el delta desde `CambioRating`. */
export async function obtenerTopRating(): Promise<TopUsuario[]> {
  return [
    { puesto: 1, usuario: "jurjur45", carrera: "Hacker", rating: 2650, resueltos: 187, delta: 45, yo: true },
    { puesto: 2, usuario: "Lasc19", carrera: "Ing. Civil Informática", rating: 100, resueltos: 3, delta: 0 },
    { puesto: 3, usuario: "matias2005-20", carrera: "Ing. Civil Informática", rating: 100, resueltos: 3, delta: 0 },
    { puesto: 4, usuario: "facs2005", carrera: "Ing. Civil Electrónica", rating: 100, resueltos: 2, delta: 0 },
    { puesto: 5, usuario: "SoulFast23", carrera: "Ing. Civil Informática", rating: 100, resueltos: 2, delta: 0 },
  ];
}

/** TODO: sesiones con actividad en los últimos 15 minutos. */
export async function obtenerEnLinea(): Promise<UsuarioEnLinea[]> {
  return [
    { usuario: "Lasc19", rating: 100 },
    { usuario: "matias2005-20", rating: 100 },
    { usuario: "jurjur45", rating: 2650 },
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
    cuerpo: "Esta semana se liberaron 3 problemas nuevos en práctica libre.",
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
  rating: 2650,
  rol: "Estudiante",
  mensajes: 14,
  desde: "mar 2026",
};

/** TODO: `Hilo` por id, con sus mensajes paginados y el enunciado fijado. */
export async function obtenerHilo(): Promise<Hilo | null> {
  return {
    titulo: "B · Cuenta de vocales",
    limites: "1 s · 256 MB",
    ramo: { codigo: "Práctica libre", nombre: "Strings y arreglos" },
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
    ],
    totalMensajes: 2,
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

/** TODO: `Envio` más recientes, paginados, con usuario y problema. */
export async function obtenerEnvios(): Promise<EnvioFila[]> {
  return [
    { id: 10482, cuando: "hace 2 min", usuario: "jurjur45", rating: 2650, problema: "E · Mediana en línea", lenguaje: "C++17", veredicto: "ac", tiempoMs: 46, memoriaKb: 3412 },
    { id: 10481, cuando: "hace 4 min", usuario: "matias2005-20", rating: 100, problema: "C · Mochila del estudiante", lenguaje: "Python 3", veredicto: "tle", caso: 7, tiempoMs: 1000, memoriaKb: 14820 },
    { id: 10480, cuando: "hace 6 min", usuario: "jurjur45", rating: 2650, problema: "E · Mediana en línea", lenguaje: "C++17", veredicto: "wa", caso: 12, tiempoMs: 41, memoriaKb: 3400 },
    { id: 10479, cuando: "hace 9 min", usuario: "Lasc19", rating: 100, problema: "D · Rutas del campus Isla Teja", lenguaje: "C++17", veredicto: "ac", tiempoMs: 124, memoriaKb: 8920 },
    { id: 10478, cuando: "hace 11 min", usuario: "SoulFast23", rating: 100, problema: "B · Cuenta de vocales", lenguaje: "Java 21", veredicto: "ce", tiempoMs: 0, memoriaKb: 0 },
    { id: 10477, cuando: "hace 15 min", usuario: "facs2005", rating: 100, problema: "C · Mochila del estudiante", lenguaje: "C++17", veredicto: "ac", tiempoMs: 78, memoriaKb: 40216 },
    { id: 10476, cuando: "hace 18 min", usuario: "jurjur45", rating: 2650, problema: "D · Rutas del campus Isla Teja", lenguaje: "C++17", veredicto: "ac", tiempoMs: 93, memoriaKb: 7844 },
    { id: 10475, cuando: "hace 22 min", usuario: "matias2005-20", rating: 100, problema: "C · Mochila del estudiante", lenguaje: "Python 3", veredicto: "re", caso: 3, tiempoMs: 62, memoriaKb: 9120 },
    { id: 10474, cuando: "hace 30 min", usuario: "SoulFast23", rating: 100, problema: "A · Suma de dos números", lenguaje: "Java 21", veredicto: "ac", tiempoMs: 108, memoriaKb: 21504 },
    { id: 10473, cuando: "hace 41 min", usuario: "Lasc19", rating: 100, problema: "E · Mediana en línea", lenguaje: "C++17", veredicto: "mle", caso: 18, tiempoMs: 310, memoriaKb: 262144 },
    { id: 10472, cuando: "hace 55 min", usuario: "jurjur45", rating: 2650, problema: "C · Mochila del estudiante", lenguaje: "C++17", veredicto: "ac", tiempoMs: 31, memoriaKb: 4096 },
    { id: 10471, cuando: "hace 1 h", usuario: "facs2005", rating: 100, problema: "B · Cuenta de vocales", lenguaje: "C", veredicto: "ac", tiempoMs: 15, memoriaKb: 1024 },
  ];
}

/** TODO: conteo de los envíos del usuario agrupados por veredicto. */
export async function obtenerResumenVeredictos(): Promise<ResumenVeredictos> {
  return { ac: 321, wa: 54, tle: 21, mle: 4, ce: 5, re: 7 };
}

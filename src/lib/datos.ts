// La costura entre la interfaz y el origen de los datos.
//
// Hoy todas devuelven vacío: la aplicación renderiza su estructura completa con
// estados vacíos y no inventa nada. Cuando exista la base de datos, lo único
// que cambia es el cuerpo de estas funciones; las pantallas no se tocan.
//
// Son async a propósito, aunque hoy no esperen nada: las páginas ya las llaman
// como componentes de servidor asíncronos, así que conectar Prisma no cambiará
// la forma de ninguna pantalla.

import type {
  Aviso,
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
      filas: [],
    },
    {
      id: "practica",
      titulo: "Práctica libre",
      nota: "Abierto a toda la universidad",
      vacio: "Todavía no hay problemas liberados a práctica libre.",
      filas: [],
    },
    {
      id: "comunidad",
      titulo: "Comunidad",
      vacio: "Todavía no hay secciones de comunidad abiertas.",
      filas: [],
    },
  ];
}

/** TODO: `Usuario` ordenado por rating, con el delta desde `CambioRating`. */
export async function obtenerTopRating(): Promise<TopUsuario[]> {
  return [];
}

/** TODO: sesiones con actividad en los últimos 15 minutos. */
export async function obtenerEnLinea(): Promise<UsuarioEnLinea[]> {
  return [];
}

/** TODO: conteos agregados. Conviene cachearlos, no contarlos en cada carga. */
export async function obtenerEstadisticas(): Promise<Estadisticas> {
  return {
    enviosTotales: 0,
    problemasPublicados: 0,
    miembros: 0,
    conectados: 0,
    miembroMasReciente: null,
  };
}

/** TODO: el anuncio fijado vigente del ramo o de la plataforma. */
export async function obtenerAviso(): Promise<Aviso | null> {
  return null;
}

/** TODO: `Hilo` por id, con sus mensajes paginados y el enunciado fijado. */
export async function obtenerHilo(): Promise<Hilo | null> {
  return null;
}

/** TODO: los envíos del usuario en esta asignación. */
export async function obtenerEstadoEnProblema(): Promise<EstadoEnProblema | null> {
  return null;
}

/** TODO: las asignaciones del ramo con el mejor veredicto del usuario. */
export async function obtenerProblemasDelSet(): Promise<ProblemaDelSet[]> {
  return [];
}

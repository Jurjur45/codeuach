// Rango por rating. Es lógica de presentación, no un dato: la clase CSS que
// devuelve tiñe el handle con el color de facultad correspondiente
// (paleta secundaria del manual UACh, ver globals.css).

export type Rango = { nombre: string; clase: string };

export function rango(rating: number): Rango {
  if (rating < 1000) return { nombre: "novato", clase: "r1" };
  if (rating < 1400) return { nombre: "aprendiz", clase: "r2" };
  if (rating < 1700) return { nombre: "competente", clase: "r3" };
  if (rating < 2000) return { nombre: "avanzado", clase: "r4" };
  if (rating < 2400) return { nombre: "experto", clase: "r5" };
  return { nombre: "maestro", clase: "r6" };
}

/** Etiqueta corta de veredicto, la que cabe en una insignia de tabla. */
export const veredictoCorto = {
  ac: "OK",
  wa: "WA",
  tle: "TLE",
  mle: "MLE",
  ce: "CE",
  re: "RE",
} as const;

/** Etiqueta larga, la que se usa cuando hay espacio. */
export const veredictoLargo = {
  ac: "Aceptado",
  wa: "Incorrecto",
  tle: "Tiempo excedido",
  mle: "Memoria excedida",
  ce: "Error de compilación",
  re: "Error en ejecución",
} as const;

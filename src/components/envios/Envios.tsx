"use client";

import { useEffect, useRef, useState } from "react";
import Bloque, { CuerpoBloque } from "@/components/layout/Bloque";
import Handle from "@/components/ui/Handle";
import { numero } from "@/lib/formato";
import { veredictoLargo } from "@/lib/rango";
import type { EnvioFila, ProblemaDelSet } from "@/lib/tipos";

// Nada de esto llega a un juez: el envío se simula en el navegador para la
// presentación. Pasa por "en cola", recorre los casos y termina aceptado.

const LENGUAJES = ["C++17", "Python 3", "Java 21", "C"];
const CASOS = 8;

type Estado = { fase: "cola" } | { fase: "juzgando"; caso: number } | { fase: "listo" };
type Fila = EnvioFila & { estado?: Estado };

function Veredicto({ fila }: { fila: Fila }) {
  if (fila.estado?.fase === "cola") return <span className="juzgando">En cola…</span>;
  if (fila.estado?.fase === "juzgando")
    return <span className="juzgando">Ejecutando caso {fila.estado.caso}…</span>;

  const texto = veredictoLargo[fila.veredicto];
  return (
    <span className={`veredicto veredicto--${fila.veredicto}`}>
      {fila.caso ? `${texto} en el caso ${fila.caso}` : texto}
    </span>
  );
}

export default function Envios({
  iniciales,
  problemas,
  usuario,
  rating,
}: {
  iniciales: EnvioFila[];
  problemas: ProblemaDelSet[];
  usuario: string;
  rating: number;
}) {
  const [filas, setFilas] = useState<Fila[]>(iniciales);
  const [soloMios, setSoloMios] = useState(false);
  const [problema, setProblema] = useState(problemas[0] ? `${problemas[0].letra} · ${problemas[0].nombre}` : "");
  const [lenguaje, setLenguaje] = useState(LENGUAJES[0]);
  const [codigo, setCodigo] = useState("");
  const [nuevo, setNuevo] = useState<number | null>(null);
  const tabla = useRef<HTMLDivElement>(null);
  const timers = useRef<number[]>([]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const juzgando = filas.some((f) => f.estado && f.estado.fase !== "listo");

  function actualizar(id: number, cambio: Partial<Fila>) {
    setFilas((fs) => fs.map((f) => (f.id === id ? { ...f, ...cambio } : f)));
  }

  function enviar(e: React.FormEvent) {
    e.preventDefault();
    if (juzgando) return;

    const id = Math.max(...filas.map((f) => f.id)) + 1;
    setFilas((fs) => [
      {
        id,
        cuando: "ahora",
        usuario,
        rating,
        problema,
        lenguaje,
        veredicto: "ac",
        tiempoMs: 0,
        memoriaKb: 0,
        estado: { fase: "cola" },
      },
      ...fs,
    ]);
    setNuevo(id);
    setCodigo("");
    tabla.current?.scrollIntoView({ behavior: "smooth", block: "start" });

    // Cola, luego un caso cada 350 ms, luego el veredicto.
    const t = (ms: number, fn: () => void) => timers.current.push(window.setTimeout(fn, ms));
    for (let c = 1; c <= CASOS; c++) {
      t(900 + c * 350, () => actualizar(id, { estado: { fase: "juzgando", caso: c } }));
    }
    t(900 + (CASOS + 1) * 350, () =>
      actualizar(id, { estado: { fase: "listo" }, tiempoMs: 31 + Math.floor(Math.random() * 40), memoriaKb: 3400 + Math.floor(Math.random() * 600) }),
    );
  }

  const visibles = soloMios ? filas.filter((f) => f.usuario === usuario) : filas;

  return (
    <>
      <Bloque titulo="Enviar solución">
        <CuerpoBloque>
          <form className="enviar" onSubmit={enviar}>
            <div className="enviar-fila">
              <label>
                Problema
                <select value={problema} onChange={(e) => setProblema(e.target.value)}>
                  {problemas.map((p) => (
                    <option key={p.letra}>{`${p.letra} · ${p.nombre}`}</option>
                  ))}
                </select>
              </label>
              <label>
                Lenguaje
                <select value={lenguaje} onChange={(e) => setLenguaje(e.target.value)}>
                  {LENGUAJES.map((l) => (
                    <option key={l}>{l}</option>
                  ))}
                </select>
              </label>
            </div>

            <label>
              Código fuente
              <textarea
                className="enviar-codigo"
                value={codigo}
                onChange={(e) => setCodigo(e.target.value)}
                spellCheck={false}
                placeholder={"#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    // tu solución\n}"}
              />
            </label>

            <div className="enviar-pie">
              <label className="enviar-archivo">
                o sube un archivo
                <input type="file" />
              </label>
              <button className="btn enviar-btn" type="submit" disabled={juzgando}>
                {juzgando ? "Juzgando…" : "Enviar"}
              </button>
            </div>
          </form>
        </CuerpoBloque>
      </Bloque>

      <div ref={tabla}>
        <Bloque
          titulo="Envíos recientes"
          accion={
            <span className="filtro">
              <button type="button" className={soloMios ? undefined : "on"} onClick={() => setSoloMios(false)}>
                Todos
              </button>
              <button type="button" className={soloMios ? "on" : undefined} onClick={() => setSoloMios(true)}>
                Mis envíos
              </button>
            </span>
          }
        >
          <div className="envios-scroll">
            <table className="envios">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Cuándo</th>
                  <th>Quién</th>
                  <th>Problema</th>
                  <th>Lenguaje</th>
                  <th>Veredicto</th>
                  <th className="num">Tiempo</th>
                  <th className="num">Memoria</th>
                </tr>
              </thead>
              <tbody>
                {visibles.map((f) => {
                  const listo = !f.estado || f.estado.fase === "listo";
                  const sinMedida = !listo || f.veredicto === "ce";
                  return (
                    <tr key={f.id} className={f.id === nuevo ? "envio-nuevo" : undefined}>
                      <td className="mono faint">{f.id}</td>
                      <td className="dim nowrap">{f.cuando}</td>
                      <td>
                        <Handle usuario={f.usuario} rating={f.rating} />
                      </td>
                      <td>
                        <a href="/hilo">{f.problema}</a>
                      </td>
                      <td className="dim nowrap">{f.lenguaje}</td>
                      <td>
                        <Veredicto fila={f} />
                      </td>
                      <td className="num">{sinMedida ? "—" : `${f.tiempoMs} ms`}</td>
                      <td className="num">{sinMedida ? "—" : `${numero(f.memoriaKb)} KB`}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Bloque>
      </div>
    </>
  );
}

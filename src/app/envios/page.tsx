import Envios from "@/components/envios/Envios";
import Bloque, { CuerpoBloque } from "@/components/layout/Bloque";
import Pagina from "@/components/layout/Pagina";
import { numero } from "@/lib/formato";
import { veredictoLargo } from "@/lib/rango";
import {
  obtenerEnvios,
  obtenerPerfil,
  obtenerProblemasDelSet,
  obtenerResumenVeredictos,
} from "@/lib/datos";
import type { Veredicto } from "@/lib/tipos";

export default async function EnviosPage() {
  const [envios, problemas, perfil, resumen] = await Promise.all([
    obtenerEnvios(),
    obtenerProblemasDelSet(),
    obtenerPerfil(),
    obtenerResumenVeredictos(),
  ]);

  const total = Object.values(resumen).reduce((a, b) => a + b, 0);

  return (
    <Pagina
      activo="Envíos"
      migas={[{ texto: "Índice", href: "/" }, { texto: "Envíos" }]}
      lateral={
        <>
          <Bloque titulo="Tus veredictos" apagado nota={`${numero(total)} envíos`}>
            <CuerpoBloque>
              <ul className="resumen-veredictos">
                {(Object.keys(resumen) as Veredicto[]).map((v) => (
                  <li key={v}>
                    <span className={`veredicto veredicto--${v}`}>{veredictoLargo[v]}</span>
                    <span className="resumen-barra">
                      <span className={`resumen-relleno resumen-relleno--${v}`} style={{ width: `${(resumen[v] / total) * 100}%` }} />
                    </span>
                    <span className="mono">{resumen[v]}</span>
                  </li>
                ))}
              </ul>
            </CuerpoBloque>
          </Bloque>
          <Bloque titulo="Cómo se juzga" apagado>
            <CuerpoBloque>
              <p className="dim regla-hilo">
                Cada envío se compila y se ejecuta contra todos los casos del problema. El
                veredicto es el del primer caso que falla; si pasa todos, es Aceptado.
              </p>
            </CuerpoBloque>
          </Bloque>
        </>
      }
    >
      <Envios iniciales={envios} problemas={problemas} usuario={perfil.handle} rating={perfil.rating} />
    </Pagina>
  );
}

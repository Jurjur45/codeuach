import Bloque from "@/components/layout/Bloque";
import Pagina from "@/components/layout/Pagina";
import CajaRespuesta from "@/components/hilo/CajaRespuesta";
import Mensaje from "@/components/hilo/Mensaje";
import ProblemasDelSet from "@/components/lateral/ProblemasDelSet";
import ReglasDelHilo from "@/components/lateral/ReglasDelHilo";
import TuEstado from "@/components/lateral/TuEstado";
import Paginacion from "@/components/ui/Paginacion";
import Vacio from "@/components/ui/Vacio";
import {
  obtenerEstadoEnProblema,
  obtenerHilo,
  obtenerProblemasDelSet,
} from "@/lib/datos";
import type { Miga } from "@/components/layout/Migas";

export default async function HiloPage() {
  const [hilo, estado, set] = await Promise.all([
    obtenerHilo(),
    obtenerEstadoEnProblema(),
    obtenerProblemasDelSet(),
  ]);

  const migas: Miga[] = hilo?.ramo
    ? [
        { texto: "Índice", href: "/" },
        { texto: `${hilo.ramo.codigo} · ${hilo.ramo.nombre}`, href: "/" },
        { texto: hilo.titulo },
      ]
    : [{ texto: "Índice", href: "/" }, { texto: "Problema" }];

  return (
    <Pagina
      activo="Problemas"
      migas={migas}
      lateral={
        <>
          <TuEstado estado={estado} />
          <ProblemasDelSet set={set} />
          <ReglasDelHilo />
        </>
      }
    >
      <Bloque titulo={hilo ? hilo.titulo : "Problema"} nota={hilo?.limites}>
        {!hilo || hilo.mensajes.length === 0 ? (
          <Vacio>
            Este hilo todavía no tiene mensajes. El enunciado aparece aquí en cuanto el
            docente lo publica.
          </Vacio>
        ) : (
          hilo.mensajes.map((m) => <Mensaje key={m.id} mensaje={m} />)
        )}
      </Bloque>

      <CajaRespuesta />

      {hilo && (
        <Paginacion
          pagina={hilo.pagina}
          totalPaginas={hilo.totalPaginas}
          totalMensajes={hilo.totalMensajes}
        />
      )}
    </Pagina>
  );
}

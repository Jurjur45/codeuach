import Pagina from "@/components/layout/Pagina";
import Leyenda from "@/components/indice/Leyenda";
import SeccionRamos from "@/components/indice/SeccionRamos";
import CajaSesion from "@/components/lateral/CajaSesion";
import Conectados from "@/components/lateral/Conectados";
import Estadisticas from "@/components/lateral/Estadisticas";
import PanelAviso from "@/components/lateral/PanelAviso";
import TopRating from "@/components/lateral/TopRating";
import {
  obtenerAviso,
  obtenerCategorias,
  obtenerEnLinea,
  obtenerEstadisticas,
  obtenerTopRating,
} from "@/lib/datos";

export default async function Indice() {
  const [categorias, top, enLinea, stats, aviso] = await Promise.all([
    obtenerCategorias(),
    obtenerTopRating(),
    obtenerEnLinea(),
    obtenerEstadisticas(),
    obtenerAviso(),
  ]);

  return (
    <Pagina
      activo="Índice"
      migas={[{ texto: "Índice", href: "/" }, { texto: "Todos los ramos" }]}
      lateral={
        <>
          <CajaSesion />
          <TopRating top={top} />
          <Conectados usuarios={enLinea} total={stats.conectados} />
          <Estadisticas datos={stats} />
          <PanelAviso aviso={aviso} />
        </>
      }
    >
      {categorias.map((c) => (
        <SeccionRamos key={c.id} categoria={c} />
      ))}
      <Leyenda />
    </Pagina>
  );
}

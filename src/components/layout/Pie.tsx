import Link from "next/link";

export default function Pie() {
  return (
    <footer className="foot">
      <div className="wrap foot-in">
        <span>
          Proyecto académico · Taller de Ingeniería · Universidad Austral de Chile.
          <br />
          No es un sitio oficial de la UACh.
        </span>
        <span className="foot-links">
          <a href="#">Reglas del juez</a>
          <a href="#">Lenguajes y límites</a>
          <a href="#">Contacto</a>
          <Link href="/estilos">Estilos</Link>
        </span>
      </div>
    </footer>
  );
}

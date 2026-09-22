import { Link, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/aviso-legal")({
  head: () => ({
    meta: [
      { title: "Aviso legal — GAMETUIN" },
      { name: "description", content: "Aviso legal y condiciones de uso del sitio web de GAMETUIN." },
      { property: "og:title", content: "Aviso legal — GAMETUIN" },
      { property: "og:description", content: "Información legal y condiciones de uso de la web de GAMETUIN." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/aviso-legal" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "/aviso-legal" }],
  }),
  component: LegalNoticePage,
});

function LegalNoticePage() {
  return <main className="legal-page">
    <div className="legal-page__inner">
      <Link to="/" className="legal-back">← Volver a GAMETUIN</Link>
      <p className="section-kicker">Información legal</p>
      <h1>Aviso legal</h1>
      <p>GAMETUIN es una página personal dedicada a compartir contenido sobre Brawl Stars y enlaces a perfiles sociales.</p>
      <h2>Contenido para fans</h2>
      <p>Este sitio no está afiliado, patrocinado ni respaldado por Supercell. Brawl Stars y sus personajes pertenecen a Supercell.</p>
      <h2>Uso del sitio</h2>
      <p>Los enlaces externos se ofrecen para facilitar el acceso al contenido del creador. Cada plataforma es responsable de sus propios servicios y condiciones.</p>
      <p className="legal-note">Última actualización: septiembre de 2026.</p>
    </div>
  </main>;
}

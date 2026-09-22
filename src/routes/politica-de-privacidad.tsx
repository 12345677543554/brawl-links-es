import { Link, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/politica-de-privacidad")({
  head: () => ({
    meta: [
      { title: "Política de privacidad — GAMETUIN" },
      { name: "description", content: "Política de privacidad del sitio web de GAMETUIN." },
      { property: "og:title", content: "Política de privacidad — GAMETUIN" },
      { property: "og:description", content: "Información sobre privacidad y tratamiento de datos en la web de GAMETUIN." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/politica-de-privacidad" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "/politica-de-privacidad" }],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return <main className="legal-page">
    <div className="legal-page__inner">
      <Link to="/" className="legal-back">← Volver a GAMETUIN</Link>
      <p className="section-kicker">Información legal</p>
      <h1>Política de privacidad</h1>
      <p>Esta web presenta el contenido y las redes sociales de GAMETUIN. Actualmente no incluye formularios, cuentas de usuario ni recogida directa de datos personales.</p>
      <h2>Enlaces externos</h2>
      <p>Al visitar YouTube o TikTok se aplican las políticas de privacidad de esas plataformas. GAMETUIN no controla sus cookies ni el tratamiento que realizan.</p>
      <h2>Cambios</h2>
      <p>Esta información se actualizará si en el futuro se añaden formularios, analítica u otras funciones que traten datos.</p>
      <p className="legal-note">Última actualización: septiembre de 2026.</p>
    </div>
  </main>;
}

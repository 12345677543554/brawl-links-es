import { createFileRoute } from "@tanstack/react-router";
import gametuinAvatar from "@/assets/gametuin-avatar.png";
import bgTexture from "@/assets/bg-texture.png";

const YOUTUBE_URL = "https://m.youtube.com/@GAMETUIN?ra=m";
const TIKTOK_URL = "https://www.tiktok.com/@GAMETUIN";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "GAMETUIN | Creador de contenido de Brawl Stars" },
      {
        name: "description",
        content:
          "Enlaces oficiales de GAMETUIN, creador de contenido de Brawl Stars. YouTube, TikTok y más.",
      },
      { property: "og:title", content: "GAMETUIN | Creador de contenido de Brawl Stars" },
      {
        property: "og:description",
        content:
          "Enlaces oficiales de GAMETUIN, creador de contenido de Brawl Stars. YouTube, TikTok y más.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function YouTubeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31.4 31.4 0 0 0 0 12a31.4 31.4 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.4 31.4 0 0 0 24 12a31.4 31.4 0 0 0-.5-5.8zM9.6 15.6V8.4l6.2 3.6-6.2 3.6z" />
    </svg>
  );
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M16.6 5.8a4.8 4.8 0 0 1-3.9-4.3h-3.1v12.4a2.9 2.9 0 1 1-2.1-2.8v-3.2a6 6 0 1 0 5.2 6V9.3a7.8 7.8 0 0 0 4.5 1.4V7.6a4.8 4.8 0 0 1-.6-1.8z" />
    </svg>
  );
}

type LinkItem = {
  label: string;
  sublabel: string;
  href: string;
  icon: (props: { className?: string }) => React.ReactNode;
  iconClass: string;
};

const LINKS: LinkItem[] = [
  {
    label: "YouTube",
    sublabel: "Suscríbete a mi canal",
    href: YOUTUBE_URL,
    icon: YouTubeIcon,
    iconClass: "bg-brand-youtube text-brand-youtube-foreground",
  },
  {
    label: "TikTok",
    sublabel: "Sígueme en TikTok",
    href: TIKTOK_URL,
    icon: TikTokIcon,
    iconClass: "bg-foreground text-background",
  },
];

function Index() {
  return (
    <main className="relative flex min-h-screen flex-col items-center overflow-hidden">
      {/* Background image + overlays */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-cover bg-center"
        style={{ backgroundImage: `url(${bgTexture})` }}
      />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-background/40 via-background/70 to-background" />

      <div className="flex w-full max-w-md flex-1 flex-col items-center px-5 py-12">
        {/* Avatar */}
        <div className="relative mb-5">
          <div
            className="absolute -inset-1.5 rounded-full opacity-70 blur-lg"
            style={{
              background:
                "conic-gradient(from 0deg, var(--brand-gold), var(--accent), var(--chart-3), var(--brand-gold))",
            }}
          />
          <img
            src={gametuinAvatar}
            alt="GAMETUIN"
            width={124}
            height={124}
            className="relative h-[124px] w-[124px] rounded-full border-2 border-white/20 bg-card object-cover"
          />
        </div>

        {/* Name + bio */}
        <h1 className="text-center text-3xl font-extrabold tracking-tight text-foreground drop-shadow">
          GAMETUIN
        </h1>
        <p className="mt-1.5 text-center text-sm font-medium text-muted-foreground">
          🎮 Creador de contenido de Brawl Stars
        </p>

        {/* Links */}
        <nav className="mt-8 flex w-full flex-col gap-3.5">
          {LINKS.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="link-card group"
              >
                <span className={`link-card__icon ${link.iconClass}`}>
                  <Icon className="h-5 w-5" />
                </span>
                <span className="flex flex-1 flex-col">
                  <span className="leading-tight">{link.label}</span>
                  <span className="text-xs font-normal text-muted-foreground">
                    {link.sublabel}
                  </span>
                </span>
                <svg
                  className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </a>
            );
          })}
        </nav>

        {/* Footer */}
        <footer className="mt-auto pt-10 text-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} GAMETUIN · Hecho con 💛
          </p>
        </footer>
      </div>
    </main>
  );
}

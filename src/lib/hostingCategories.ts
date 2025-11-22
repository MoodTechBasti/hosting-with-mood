export interface HostingCategory {
  id: string;
  name: string;
  description: string;
  providers: string[];
  characteristics: {
    costRange: string;
    complexity: "niedrig" | "mittel" | "hoch";
    control: "niedrig" | "mittel" | "hoch";
    maintenance: string;
  };
  idealFor: string[];
  notIdealFor: string[];
}

export const hostingCategories: HostingCategory[] = [
  {
    id: "K1",
    name: "Statisches Hosting + CDN",
    description: "Globales CDN für statische Websites und JAMstack-Anwendungen",
    providers: ["Vercel (Hobby/Pro)", "Netlify (Free/Pro)", "Cloudflare Pages", "GitHub Pages"],
    characteristics: {
      costRange: "0–20 €/Monat",
      complexity: "niedrig",
      control: "mittel",
      maintenance: "Minimal, meist automatisiert"
    },
    idealFor: [
      "Statische Websites und Landingpages",
      "React/Next.js, Vue/Nuxt Frontend-Apps",
      "Marketing-Kampagnen mit hoher Performance-Anforderung",
      "Projekte mit globalem Publikum"
    ],
    notIdealFor: [
      "Backend-intensive Anwendungen",
      "WordPress oder andere CMS",
      "Komplexe Datenbank-Anforderungen"
    ]
  },
  {
    id: "K2",
    name: "Managed WordPress Hosting",
    description: "Vollständig verwaltetes WordPress-Hosting mit automatischen Updates",
    providers: ["Raidboxes (DE)", "Kinsta", "WP Engine", "IONOS WP"],
    characteristics: {
      costRange: "10–40 €/Monat",
      complexity: "niedrig",
      control: "mittel",
      maintenance: "Automatisiert, inkl. Updates & Backups"
    },
    idealFor: [
      "WordPress-Websites jeder Größe",
      "Firmenwebsites und Blogs",
      "WooCommerce-Shops",
      "Kunden mit geringer Technikaffinität"
    ],
    notIdealFor: [
      "Nicht-WordPress-Projekte",
      "Sehr knappe Budgets unter 10 €/Monat",
      "Custom Backend-Anwendungen"
    ]
  },
  {
    id: "K3",
    name: "Shared Webhosting",
    description: "Klassisches Shared Hosting für einfache Websites",
    providers: ["Strato", "IONOS", "All-Inkl", "netcup", "HostEurope"],
    characteristics: {
      costRange: "3–15 €/Monat",
      complexity: "niedrig",
      control: "niedrig",
      maintenance: "Einfache Web-Oberfläche"
    },
    idealFor: [
      "Kleine Firmenwebsites",
      "Einfache Blogs",
      "Projekte mit sehr kleinem Budget",
      "Statische HTML-Seiten"
    ],
    notIdealFor: [
      "High-Traffic-Projekte",
      "Performance-kritische Anwendungen",
      "Moderne Framework-basierte Apps",
      "Geschäftskritische Systeme"
    ]
  },
  {
    id: "K4",
    name: "Agentur-/Reseller-Hosting",
    description: "Zentrale Verwaltung mehrerer Kundenprojekte",
    providers: ["All-Inkl Reseller", "netcup Reseller", "Raidboxes Agentur"],
    characteristics: {
      costRange: "20–100 €/Monat",
      complexity: "mittel",
      control: "hoch",
      maintenance: "Zentrale Verwaltung aller Projekte"
    },
    idealFor: [
      "Agenturen mit mehreren Kunden",
      "Zentrales Management vieler Websites",
      "White-Label-Lösungen"
    ],
    notIdealFor: [
      "Einzelprojekte",
      "Sehr unterschiedliche Tech-Stacks",
      "Projekte mit weniger als 5 Kunden"
    ]
  },
  {
    id: "K5",
    name: "App-/Cloud-Hosting (PaaS)",
    description: "Platform-as-a-Service für moderne Web-Anwendungen",
    providers: ["Railway", "Render", "DigitalOcean App Platform", "Fly.io"],
    characteristics: {
      costRange: "5–100 €/Monat",
      complexity: "mittel",
      control: "hoch",
      maintenance: "Git-basiertes Deployment, Logs & Metrics"
    },
    idealFor: [
      "Node.js, Python, Go, Ruby Backend-Apps",
      "Web-Apps mit Datenbank",
      "SaaS-Anwendungen",
      "Microservices-Architekturen"
    ],
    notIdealFor: [
      "Reine statische Websites",
      "WordPress-Projekte",
      "Sehr knappe Budgets"
    ]
  },
  {
    id: "K6",
    name: "Serverless / Edge Computing",
    description: "Pay-per-use Functions für ereignisbasierte Workloads",
    providers: ["Vercel Functions", "Netlify Functions", "Cloudflare Workers", "AWS Lambda"],
    characteristics: {
      costRange: "0–50 €/Monat",
      complexity: "mittel",
      control: "mittel",
      maintenance: "Event-basiert, automatische Skalierung"
    },
    idealFor: [
      "APIs mit sporadischer Last",
      "Event-getriebene Architekturen",
      "Globale Edge-Funktionen",
      "Sehr skalierbare Anwendungen"
    ],
    notIdealFor: [
      "Langläufige Prozesse",
      "Komplexe State-Management",
      "Projekte die volle Server-Kontrolle benötigen"
    ]
  },
  {
    id: "K7",
    name: "VPS / Root-Server",
    description: "Volle Kontrolle mit eigenem virtuellen oder physischen Server",
    providers: ["Hetzner Cloud", "Contabo", "DigitalOcean Droplets", "netcup VPS"],
    characteristics: {
      costRange: "3–50 €/Monat",
      complexity: "hoch",
      control: "hoch",
      maintenance: "Volle Verantwortung für OS, Security, Backups"
    },
    idealFor: [
      "Individuelle Server-Konfigurationen",
      "Self-Hosted Tools (Coolify, n8n)",
      "Docker/Kubernetes-Deployments",
      "Teams mit DevOps-Expertise"
    ],
    notIdealFor: [
      "Teams ohne Server-Administration Kenntnisse",
      "Projekte die schnelle Time-to-Market brauchen",
      "Kunden ohne technisches Personal"
    ]
  },
  {
    id: "K8",
    name: "Hyperscaler-Cloud",
    description: "Enterprise Cloud-Infrastruktur (AWS, GCP, Azure)",
    providers: ["AWS", "Google Cloud Platform", "Microsoft Azure"],
    characteristics: {
      costRange: "10–1000+ €/Monat",
      complexity: "hoch",
      control: "hoch",
      maintenance: "Komplex, erfordert Cloud-Architektur-Expertise"
    },
    idealFor: [
      "Enterprise-Anwendungen",
      "Multi-Region-Deployments",
      "Compliance-Anforderungen (ISO, SOC2)",
      "Sehr hohe Skalierungsanforderungen"
    ],
    notIdealFor: [
      "Kleine bis mittlere Projekte",
      "Teams ohne Cloud-Expertise",
      "Budgets unter 50 €/Monat",
      "Einfache Websites"
    ]
  }
];

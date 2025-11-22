import { ProjectData, HostingRecommendation, DecisionResult } from "@/types/wizard";
import { hostingCategories, HostingCategory } from "./hostingCategories";

interface CategoryScore {
  categoryId: string;
  score: number;
  reasons: string[];
}

export class ScoringEngine {
  private scores: Map<string, CategoryScore> = new Map();

  constructor(private projectData: ProjectData) {
    // Initialize all categories with 50 base score
    hostingCategories.forEach(cat => {
      this.scores.set(cat.id, {
        categoryId: cat.id,
        score: 50,
        reasons: []
      });
    });
  }

  calculateScores(): DecisionResult {
    this.scoreStep1();
    this.scoreStep2();
    this.scoreStep3();
    this.scoreStep4();
    this.scoreStep5();

    return this.generateResult();
  }

  private addScore(categoryId: string, points: number, reason: string) {
    const current = this.scores.get(categoryId)!;
    current.score = Math.max(0, Math.min(100, current.score + points));
    if (reason && points !== 0) {
      current.reasons.push(`${points > 0 ? '+' : ''}${points}: ${reason}`);
    }
  }

  private scoreStep1() {
    const { projectType, targetAudience, mainGoal, paymentModel } = this.projectData.step1;

    // Project Type Scoring
    if (projectType.includes("Landingpage")) {
      this.addScore("K1", 25, "Ideal für Landingpages");
      this.addScore("K6", 15, "Serverless für Formulare möglich");
    }

    if (projectType.includes("Firmenwebsite")) {
      this.addScore("K1", 15, "Gut für statische Firmenwebsites");
      this.addScore("K2", 20, "Managed WordPress oft gewählt");
      this.addScore("K3", 10, "Shared Hosting als Budget-Option");
    }

    if (projectType.includes("Blog/Magazin")) {
      this.addScore("K2", 25, "WordPress ideal für Blogs");
      this.addScore("K3", 10, "Shared Hosting für kleine Blogs");
    }

    if (projectType.includes("Web-App / SaaS")) {
      this.addScore("K5", 30, "PaaS ideal für Web-Apps");
      this.addScore("K6", 15, "Serverless für API-Komponenten");
      this.addScore("K7", 10, "VPS für volle Kontrolle");
      this.addScore("K3", -20, "Shared Hosting ungeeignet für SaaS");
    }

    if (projectType.includes("Automation / Backend-only")) {
      this.addScore("K5", 25, "PaaS gut für Backend-Services");
      this.addScore("K7", 20, "VPS für Self-Hosted Tools");
      this.addScore("K6", 15, "Serverless für Event-basierte Jobs");
    }

    // Main Goal
    if (mainGoal === "Leadgenerierung") {
      this.addScore("K1", 20, "CDN für schnelle Ladezeiten wichtig");
      this.addScore("K6", 10, "Serverless für Formular-Verarbeitung");
    }

    if (mainGoal === "Automatisierung") {
      this.addScore("K5", 20, "PaaS für Automation-Workflows");
      this.addScore("K7", 15, "VPS für Self-Hosted Automation");
    }

    // Payment Model
    if (paymentModel === "Eigenprojekt") {
      this.addScore("K1", 10, "Free-Tiers verfügbar");
      this.addScore("K3", 10, "Günstige Option");
    }
  }

  private scoreStep2() {
    const { techType, dataProcessing, database } = this.projectData.step2;

    // Tech Type
    if (techType.includes("Statisches HTML/JS/CSS")) {
      this.addScore("K1", 30, "Perfekt für statische Sites");
      this.addScore("K3", 15, "Shared Hosting funktioniert");
      this.addScore("K5", -10, "PaaS wäre Overkill");
    }

    if (techType.includes("CMS (WordPress, Typo3, etc.)")) {
      this.addScore("K2", 35, "Managed WordPress optimal");
      this.addScore("K3", 15, "Shared Hosting möglich");
      this.addScore("K7", 10, "VPS mit Plesk/cPanel");
      this.addScore("K1", -15, "Statisches Hosting ungeeignet");
    }

    if (techType.includes("Frontend-Framework (React/Next.js, Vue/Nuxt, Svelte)")) {
      this.addScore("K1", 30, "Vercel/Netlify perfekt für Frameworks");
      this.addScore("K5", 20, "PaaS für SSR-Apps");
      this.addScore("K3", -20, "Shared Hosting ungeeignet");
    }

    if (techType.includes("Backend/API (Node, Laravel, Django, Rails)")) {
      this.addScore("K5", 35, "PaaS optimal für Backend");
      this.addScore("K7", 20, "VPS für volle Kontrolle");
      this.addScore("K8", 10, "Cloud für Enterprise");
      this.addScore("K1", -25, "Statisches Hosting unmöglich");
      this.addScore("K3", -20, "Shared Hosting limitiert");
    }

    if (techType.includes("No-Code/Low-Code (Webflow, Framer, n8n)")) {
      this.addScore("K1", 15, "Export zu Static Hosting");
      this.addScore("K7", 20, "VPS für Self-Hosted n8n");
    }

    // Data Processing
    if (dataProcessing === "Keine personenbezogenen Daten") {
      this.addScore("K1", 10, "Datenschutz unkritisch");
      this.addScore("K6", 10, "Global möglich");
    }

    if (dataProcessing.includes("Benutzeraccounts/Logins")) {
      this.addScore("K5", 20, "Backend mit Auth nötig");
      this.addScore("K2", 10, "WordPress mit Plugins");
      this.addScore("K1", -10, "Zusätzliches Backend nötig");
    }

    if (dataProcessing.includes("Zahlungsdaten")) {
      this.addScore("K5", 20, "Sichere Backend-Integration");
      this.addScore("K2", 15, "WooCommerce möglich");
      this.addScore("K8", 10, "Enterprise für PCI Compliance");
      this.addScore("K3", -15, "Shared Hosting riskant");
    }

    if (dataProcessing.includes("Gesundheits-/Finanz-/sensible Daten")) {
      this.addScore("K8", 25, "Compliance-Features");
      this.addScore("K7", 15, "Volle Kontrolle über Security");
      this.addScore("K3", -30, "Shared Hosting ungeeignet");
    }

    // Database
    if (database === "Keine") {
      this.addScore("K1", 15, "Statisches Hosting perfekt");
      this.addScore("K3", 10, "Einfaches Hosting reicht");
    }

    if (database === "Einfache DB (Kontaktleads, einfache User)") {
      this.addScore("K5", 20, "Managed DB inklusive");
      this.addScore("K2", 15, "WordPress-DB integriert");
      this.addScore("K6", 10, "Serverless mit DB möglich");
    }

    if (database === "Komplex (mehrere Services, Reporting)") {
      this.addScore("K5", 25, "Multiple DB-Support");
      this.addScore("K7", 20, "Eigene DB-Server");
      this.addScore("K8", 15, "Managed DB-Services");
      this.addScore("K3", -25, "Shared Hosting zu limitiert");
    }
  }

  private scoreStep3() {
    const { monthlyVisitors, trafficSources, downtimeTolerance, performanceNeed } = this.projectData.step3;

    // Monthly Visitors
    if (monthlyVisitors === "< 5.000") {
      this.addScore("K1", 10, "Free-Tiers oft ausreichend");
      this.addScore("K3", 10, "Shared Hosting reicht");
    }

    if (monthlyVisitors === "5.000-50.000") {
      this.addScore("K1", 15, "CDN gut für mittleren Traffic");
      this.addScore("K5", 15, "PaaS skaliert gut");
      this.addScore("K2", 10, "Managed WP für Traffic optimiert");
    }

    if (monthlyVisitors === "> 50.000") {
      this.addScore("K1", 20, "CDN für hohen Traffic");
      this.addScore("K5", 20, "Auto-Scaling verfügbar");
      this.addScore("K8", 15, "Enterprise-Skalierung");
      this.addScore("K3", -25, "Shared Hosting überfordert");
    }

    // Traffic Sources
    if (trafficSources.includes("Paid Ads (Google, Meta)")) {
      this.addScore("K1", 20, "Schnelle Ladezeiten für Ads wichtig");
      this.addScore("K5", 10, "Skalierung bei Kampagnen");
      this.addScore("K3", -10, "Performance könnte leiden");
    }

    if (trafficSources.includes("SEO")) {
      this.addScore("K1", 15, "Core Web Vitals wichtig");
      this.addScore("K2", 10, "WordPress SEO-optimiert");
    }

    // Downtime Tolerance
    if (downtimeTolerance === "24/7") {
      this.addScore("K8", 20, "Enterprise SLAs");
      this.addScore("K5", 15, "Gute Uptime-Garantien");
      this.addScore("K2", 15, "Managed mit Monitoring");
      this.addScore("K3", -20, "Shared Hosting zu riskant");
    }

    if (downtimeTolerance === "Kritisch") {
      this.addScore("K1", 15, "CDN sehr zuverlässig");
      this.addScore("K5", 15, "Monitoring inklusive");
      this.addScore("K2", 10, "Managed mit Backups");
    }

    if (downtimeTolerance === "Egal") {
      this.addScore("K3", 10, "Budget-Option ok");
      this.addScore("K7", 5, "Experimentieren erlaubt");
    }

    // Performance Need
    if (performanceNeed === "Sehr schnell") {
      this.addScore("K1", 25, "Globales CDN optimal");
      this.addScore("K6", 15, "Edge Computing sehr schnell");
      this.addScore("K3", -15, "Shared Hosting zu langsam");
    }

    if (performanceNeed === "Schnell") {
      this.addScore("K1", 15, "CDN Performance");
      this.addScore("K5", 10, "Gute Performance");
      this.addScore("K2", 10, "Optimiertes WP-Hosting");
    }
  }

  private scoreStep4() {
    const { hostingBudget, contractOwner, maintenanceResponsibility, clientTechAffinity } = this.projectData.step4;

    // Budget
    if (hostingBudget === "0-5") {
      this.addScore("K1", 20, "Free-Tiers verfügbar");
      this.addScore("K3", 20, "Sehr günstig");
      this.addScore("K2", -15, "Meist teurer");
      this.addScore("K5", -10, "Basispreis höher");
      this.addScore("K8", -25, "Viel zu teuer");
    }

    if (hostingBudget === "5-15") {
      this.addScore("K3", 15, "Im Budget-Bereich");
      this.addScore("K2", 15, "Entry-Level WP Hosting");
      this.addScore("K1", 10, "Hobby-Pläne");
      this.addScore("K5", 5, "Einstiegs-Tarife");
    }

    if (hostingBudget === "15-50") {
      this.addScore("K2", 20, "Premium WP Hosting");
      this.addScore("K5", 20, "Professional Pläne");
      this.addScore("K1", 10, "Pro-Tarife");
      this.addScore("K7", 15, "Gute VPS möglich");
    }

    if (hostingBudget === ">50") {
      this.addScore("K5", 15, "High-Performance möglich");
      this.addScore("K8", 15, "Enterprise-Optionen");
      this.addScore("K4", 20, "Agentur-Lösungen");
      this.addScore("K7", 10, "Premium VPS");
    }

    // Contract Owner & Maintenance
    if (contractOwner === "Kunde" && maintenanceResponsibility === "Kunde selbst") {
      this.addScore("K2", 20, "Managed WP einfach für Kunden");
      this.addScore("K3", 15, "Einfache Verwaltung");
      this.addScore("K7", -20, "VPS zu komplex");
      this.addScore("K8", -20, "Cloud zu komplex");
    }

    if (maintenanceResponsibility.includes("Ich")) {
      this.addScore("K4", 20, "Zentrale Verwaltung sinnvoll");
      this.addScore("K7", 10, "Mehr Kontrolle für Sie");
    }

    // Tech Affinity
    if (clientTechAffinity === 1) {
      this.addScore("K2", 25, "Managed ideal für nicht-technische Kunden");
      this.addScore("K3", 15, "Einfache Web-Oberfläche");
      this.addScore("K7", -25, "VPS viel zu komplex");
      this.addScore("K8", -30, "Cloud unmöglich für Kunde");
    }

    if (clientTechAffinity === 4) {
      this.addScore("K7", 15, "Kunde kann Server verwalten");
      this.addScore("K5", 10, "Git-Deployment möglich");
      this.addScore("K8", 5, "Cloud-Kenntnisse vorhanden");
    }
  }

  private scoreStep5() {
    const { dataProtectionLevel, serverLocationPreference, growthPotential, projectLifetime } = this.projectData.step5;

    // Data Protection
    if (dataProtectionLevel === "Sensibel" || dataProtectionLevel === "Branche") {
      this.addScore("K8", 20, "Compliance-Zertifizierungen");
      this.addScore("K7", 15, "Volle Datenkontrolle");
      this.addScore("K2", 10, "Deutsche Anbieter verfügbar");
      this.addScore("K3", -15, "Shared Hosting weniger sicher");
    }

    // Server Location
    if (serverLocationPreference === "DE") {
      this.addScore("K2", 20, "Raidboxes in Deutschland");
      this.addScore("K7", 15, "Hetzner Deutschland");
      this.addScore("K3", 15, "Viele deutsche Anbieter");
      this.addScore("K4", 15, "Deutsche Reseller");
    }

    if (serverLocationPreference === "EU") {
      this.addScore("K1", 10, "EU-Regionen verfügbar");
      this.addScore("K5", 10, "EU-Deployments möglich");
      this.addScore("K8", 10, "EU-Cloud-Regionen");
    }

    // Growth Potential
    if (growthPotential === "Hoch") {
      this.addScore("K5", 25, "Auto-Scaling inklusive");
      this.addScore("K8", 20, "Unbegrenzte Skalierung");
      this.addScore("K1", 15, "CDN skaliert gut");
      this.addScore("K3", -20, "Shared Hosting limitiert");
    }

    if (growthPotential === "Klein") {
      this.addScore("K3", 10, "Günstig für kleine Projekte");
      this.addScore("K1", 10, "Free-Tiers ausreichend");
    }

    // Project Lifetime
    if (projectLifetime === "< 6 Monate") {
      this.addScore("K1", 15, "Schnell setupbar");
      this.addScore("K5", 10, "Einfaches Deployment");
      this.addScore("K3", 10, "Keine Langzeitverträge");
    }

    if (projectLifetime === "> 24 Monate") {
      this.addScore("K2", 15, "Langfristige Wartung");
      this.addScore("K5", 15, "Production-ready");
      this.addScore("K8", 10, "Enterprise Support");
      this.addScore("K4", 15, "Langfristige Kundenbindung");
    }
  }

  private generateResult(): DecisionResult {
    const sortedScores = Array.from(this.scores.values())
      .sort((a, b) => b.score - a.score);

    const topCategories = sortedScores.slice(0, 3);
    const rejectedCategories = sortedScores.slice(-3);

    const recommendations: HostingRecommendation[] = topCategories.map(score => {
      const category = hostingCategories.find(c => c.id === score.categoryId)!;
      return this.createRecommendation(category, score);
    });

    return {
      recommendations,
      rejectedCategories: rejectedCategories.map(score => {
        const category = hostingCategories.find(c => c.id === score.categoryId)!;
        return {
          categoryId: category.id,
          categoryName: category.name,
          reason: this.generateRejectionReason(category, score),
          whenUseful: this.generateWhenUseful(category)
        };
      }),
      projectSummary: this.generateProjectSummary()
    };
  }

  private createRecommendation(category: HostingCategory, score: CategoryScore): HostingRecommendation {
    return {
      categoryId: category.id,
      categoryName: category.name,
      providers: category.providers,
      explanation: this.generateExplanation(category, score),
      useCases: category.idealFor,
      costRange: category.characteristics.costRange,
      complexity: category.characteristics.complexity,
      risks: this.generateRisks(category),
      technicalImplementation: this.generateImplementation(category)
    };
  }

  private generateExplanation(category: HostingCategory, score: CategoryScore): string {
    const topReasons = score.reasons.slice(0, 3).map(r => r.split(': ')[1]);
    return `${category.description} Score: ${Math.round(score.score)}/100. Hauptgründe: ${topReasons.join(', ')}.`;
  }

  private generateRisks(category: HostingCategory): string[] {
    const risks: string[] = [];
    
    if (category.characteristics.complexity === "hoch") {
      risks.push("Erfordert technisches Know-how für Setup und Wartung");
    }
    
    if (category.id === "K7" || category.id === "K8") {
      risks.push("Hoher Wartungsaufwand für Updates und Security");
    }
    
    if (category.id === "K1" || category.id === "K6") {
      risks.push("Vendor Lock-in bei providerspezifischen Features");
    }
    
    if (category.id === "K3") {
      risks.push("Geteilte Ressourcen können Performance beeinträchtigen");
    }

    return risks;
  }

  private generateImplementation(category: HostingCategory): string {
    const implementations: Record<string, string> = {
      K1: "Git-Repository verbinden → Automatisches Deployment → Environment Variables setzen → Domain konfigurieren",
      K2: "WordPress installieren → Theme & Plugins einrichten → Staging-Umgebung nutzen → Automatische Backups aktivieren",
      K3: "FTP-Zugang einrichten → Dateien hochladen → Datenbank anlegen → Domain verknüpfen",
      K4: "Reseller-Account einrichten → Kunden-Accounts anlegen → White-Label konfigurieren → Zentrale Verwaltung nutzen",
      K5: "Git-Repository verbinden → Environment Variables setzen → Datenbank verknüpfen → Auto-Deploy aktivieren",
      K6: "Serverless Functions erstellen → API-Endpunkte definieren → Environment Secrets setzen → Edge-Locations konfigurieren",
      K7: "Server provisionieren → OS installieren → Software-Stack aufsetzen → Firewall & Security konfigurieren → Backups einrichten",
      K8: "Cloud-Account erstellen → Infrastruktur als Code (Terraform) → CI/CD Pipeline → Monitoring & Alerting → Multi-Region Setup"
    };
    
    return implementations[category.id] || "Individuelle Implementierung erforderlich";
  }

  private generateRejectionReason(category: HostingCategory, score: CategoryScore): string {
    const negativeReasons = score.reasons.filter(r => r.startsWith('-'));
    if (negativeReasons.length > 0) {
      return negativeReasons[0].split(': ')[1];
    }
    return `Andere Kategorien passen besser zu Ihren Anforderungen (Score: ${Math.round(score.score)}/100)`;
  }

  private generateWhenUseful(category: HostingCategory): string {
    const whenUseful: Record<string, string> = {
      K1: "Wenn Sie zu einer statischen Website oder JAMstack-App wechseln",
      K2: "Wenn Sie WordPress als CMS einsetzen möchten",
      K3: "Wenn Budget stark limitiert ist und Traffic niedrig bleibt",
      K4: "Wenn Sie mehrere ähnliche Kundenprojekte verwalten",
      K5: "Wenn Sie eine moderne Backend-Anwendung entwickeln",
      K6: "Wenn Sie event-basierte oder stark skalierende APIs benötigen",
      K7: "Wenn Sie volle Server-Kontrolle und Custom-Stack benötigen",
      K8: "Wenn Enterprise-Compliance oder globale Multi-Region-Deployments erforderlich sind"
    };
    
    return whenUseful[category.id] || "Bei anderen Projektanforderungen";
  }

  private generateProjectSummary(): string {
    const { step1, step3, step4 } = this.projectData;
    const types = step1.projectType.join(', ');
    const visitors = step3.monthlyVisitors || "unbekannt";
    const budget = step4.hostingBudget || "offen";
    
    return `${types} für ${step1.targetAudience} mit ${visitors} monatlichen Besuchern. Budget: ${budget} €/Monat. Ziel: ${step1.mainGoal}.`;
  }
}

export function calculateRecommendations(projectData: ProjectData): DecisionResult {
  const engine = new ScoringEngine(projectData);
  return engine.calculateScores();
}

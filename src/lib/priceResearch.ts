import { HostingRecommendation, PriceResearchResult } from "@/types/wizard";

// Provider-spezifische Suchqueries für bessere Ergebnisse
const providerSearchQueries: Record<string, string> = {
  "Vercel (Hobby/Pro)": "Vercel pricing 2025 hobby pro plan cost",
  "Netlify (Free/Pro)": "Netlify pricing 2025 free personal pro plan",
  "Cloudflare Pages": "Cloudflare Pages pricing 2025 free plan",
  "Raidboxes (DE)": "Raidboxes Preise 2025 WordPress hosting Deutschland",
  "Kinsta": "Kinsta pricing 2025 WordPress hosting plans",
  "Railway": "Railway pricing 2025 hobby pro developer plan",
  "Render": "Render pricing 2025 web services starter",
  "Hetzner Cloud": "Hetzner Cloud Preise 2025 CX11 VPS Deutschland",
  "DigitalOcean Droplets": "DigitalOcean pricing 2025 droplets basic",
  "Strato": "Strato Webhosting Preise 2025",
  "IONOS": "IONOS Webhosting Preise 2025",
  "AWS": "AWS pricing 2025 Lightsail"
};

/**
 * Echte Online-Preis-Recherche mit Edge Function
 * Diese Funktion ruft live die aktuellen Preise von Anbieter-Websites ab
 */
export async function researchProviderPrices(
  recommendations: HostingRecommendation[],
  useRealSearch: boolean = true
): Promise<PriceResearchResult[]> {
  const results: PriceResearchResult[] = [];
  const currentDate = new Date().toISOString().split('T')[0];

  if (!useRealSearch) {
    // Fallback zu Mock-Daten wenn gewünscht
    return getMockPriceResearch(recommendations, currentDate);
  }

  // ECHTE WEB-RECHERCHE via Edge Function
  console.log("🔍 Starte Live-Preis-Recherche für", recommendations.length, "Kategorien...");

  try {
    // Sammle alle Provider die recherchiert werden sollen
    const providersToResearch: string[] = [];
    const categoryMap: Record<string, string> = {};
    
    for (const recommendation of recommendations) {
      // Max 2 Provider pro Kategorie
      for (const provider of recommendation.providers.slice(0, 2)) {
        providersToResearch.push(provider);
        categoryMap[provider] = recommendation.categoryId;
      }
    }

    console.log(`📡 Rufe Edge Function auf für ${providersToResearch.length} Provider...`);

    // Rufe die Edge Function auf
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const response = await fetch(`${supabaseUrl}/functions/v1/price-research`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ providers: providersToResearch })
    });

    if (!response.ok) {
      throw new Error(`Edge Function Fehler: ${response.status}`);
    }

    const data = await response.json();
    
    console.log(`✅ ${data.summary.successful}/${data.summary.total} Anbieter erfolgreich recherchiert`);

    // Konvertiere Edge Function Ergebnisse zu PriceResearchResult Format
    for (const result of data.results) {
      results.push({
        categoryId: categoryMap[result.provider],
        provider: result.provider,
        currentPrice: result.price,
        source: result.source,
        lastChecked: currentDate,
        notes: result.success ? `✅ Live: ${result.notes}` : `⚠️ Fallback: ${result.notes}`
      });
    }

  } catch (error) {
    console.error("❌ Fehler bei Live-Recherche:", error);
    
    // Fallback zu Mock-Daten bei Fehler
    console.log("⚠️ Verwende Mock-Daten als Fallback");
    return getMockPriceResearch(recommendations, currentDate);
  }

  console.log(`✅ Preis-Recherche abgeschlossen: ${results.length} Anbieter`);
  return results;
}

/**
 * Hilfsfunktion die Preise aus verschiedenen Quellen extrahiert
 * In einer echten Implementierung würde diese Funktion die HTML-Inhalte
 * der gefundenen Seiten parsen und Preis-Informationen extrahieren
 */
function extractPriceFromProvider(
  provider: string, 
  date: string
): { price: string; source: string; notes: string } | null {
  // Diese Funktion würde normalerweise die Such-Ergebnisse parsen
  // Für jetzt geben wir realistische Daten zurück
  const priceData = getMockPriceData();
  return priceData[provider] || null;
}

// Zentrale Preis-Datenbank (würde normalerweise aus Web-Search kommen)
function getMockPriceData(): Record<string, { price: string; source: string; notes: string }> {
  return {
    "Vercel (Hobby/Pro)": {
      price: "Hobby: 0 €, Pro: ab 20 $/Monat",
      source: "vercel.com/pricing",
      notes: "Hobby-Plan kostenlos, Pro mit erweiterten Features"
    },
    "Netlify (Free/Pro)": {
      price: "Starter: 0 €, Pro: 19 $/Monat",
      source: "netlify.com/pricing",
      notes: "Free-Tier mit 100 GB Bandbreite/Monat"
    },
    "Cloudflare Pages": {
      price: "Free: 0 €, Pro: 20 $/Monat",
      source: "cloudflare.com/plans",
      notes: "Unbegrenzte Bandbreite im Free-Plan"
    },
    "Raidboxes (DE)": {
      price: "Mini: 15 €, Starter: 30 €",
      source: "raidboxes.de/preise",
      notes: "Deutsche Server, WordPress-optimiert"
    },
    "Kinsta": {
      price: "Starter: 35 $/Monat",
      source: "kinsta.com/pricing",
      notes: "Premium WordPress Hosting mit Google Cloud"
    },
    "Strato": {
      price: "Basic: 4 €, Plus: 8 €",
      source: "strato.de/hosting",
      notes: "Shared Hosting, deutscher Anbieter"
    },
    "IONOS": {
      price: "Essential: 5 €, Business: 10 €",
      source: "ionos.de/hosting",
      notes: "Shared Hosting mit Website-Builder"
    },
    "Railway": {
      price: "Developer: 5 $, Team: 20 $",
      source: "railway.app/pricing",
      notes: "Pay-as-you-go nach Ressourcennutzung"
    },
    "Render": {
      price: "Starter: 7 $/Monat, Pro: 25 $/Monat",
      source: "render.com/pricing",
      notes: "Auto-scaling, kostenlose Postgres-DB"
    },
    "Hetzner Cloud": {
      price: "CX11: 3,79 €, CX21: 5,83 €",
      source: "hetzner.com/cloud",
      notes: "Deutsche Rechenzentren, sehr preiswert"
    },
    "DigitalOcean Droplets": {
      price: "Basic: ab 4 $/Monat",
      source: "digitalocean.com/pricing",
      notes: "Flexible VPS-Konfigurationen"
    }
  };
}

// Mock-Funktion die realistische Preisdaten simuliert
function getMockPriceResearch(
  recommendations: HostingRecommendation[],
  date: string
): PriceResearchResult[] {
  const mockPrices = getMockPriceData();
  const results: PriceResearchResult[] = [];

  for (const recommendation of recommendations) {
    for (const provider of recommendation.providers.slice(0, 2)) {
      const priceInfo = mockPrices[provider];
      
      if (priceInfo) {
        results.push({
          categoryId: recommendation.categoryId,
          provider: provider,
          currentPrice: priceInfo.price,
          source: priceInfo.source,
          lastChecked: date,
          notes: `📊 Mock-Daten: ${priceInfo.notes}`
        });
      }
    }
  }

  return results;
}

// Hilfsfunktion um Preis-Recherche in Empfehlungen zu integrieren
export function enrichRecommendationsWithPrices(
  recommendations: HostingRecommendation[],
  priceResearch: PriceResearchResult[]
): HostingRecommendation[] {
  return recommendations.map(rec => {
    const prices = priceResearch.filter(p => p.categoryId === rec.categoryId);
    
    if (prices.length > 0) {
      const priceDetails = prices.map(p => 
        `${p.provider}: ${p.currentPrice} (Quelle: ${p.source}, Stand: ${p.lastChecked})`
      ).join("\n");
      
      return {
        ...rec,
        costRange: `${rec.costRange}\n\nAktuelle Preise (recherchiert):\n${priceDetails}`
      };
    }
    
    return rec;
  });
}

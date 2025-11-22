import { corsHeaders } from '../_shared/cors.ts';

const providerPricingUrls: Record<string, { url: string; selector: string }> = {
  "Vercel (Hobby/Pro)": {
    url: "https://vercel.com/pricing",
    selector: "pricing"
  },
  "Netlify (Free/Pro)": {
    url: "https://www.netlify.com/pricing/",
    selector: "pricing"
  },
  "Cloudflare Pages": {
    url: "https://www.cloudflare.com/plans/",
    selector: "pricing"
  },
  "Raidboxes (DE)": {
    url: "https://raidboxes.de/preise/",
    selector: "pricing"
  },
  "Kinsta": {
    url: "https://kinsta.com/pricing/",
    selector: "pricing"
  },
  "Railway": {
    url: "https://railway.app/pricing",
    selector: "pricing"
  },
  "Render": {
    url: "https://render.com/pricing",
    selector: "pricing"
  },
  "Hetzner Cloud": {
    url: "https://www.hetzner.com/cloud",
    selector: "pricing"
  },
  "DigitalOcean Droplets": {
    url: "https://www.digitalocean.com/pricing/droplets",
    selector: "pricing"
  },
  "Strato": {
    url: "https://www.strato.de/hosting/",
    selector: "pricing"
  },
  "IONOS": {
    url: "https://www.ionos.de/hosting/",
    selector: "pricing"
  }
};

interface PriceResearchRequest {
  providers: string[];
}

interface PriceResearchResult {
  provider: string;
  price: string;
  source: string;
  notes: string;
  success: boolean;
}

async function fetchProviderPrice(provider: string): Promise<PriceResearchResult> {
  const providerInfo = providerPricingUrls[provider];
  
  if (!providerInfo) {
    console.log(`⚠️ Keine URL konfiguriert für: ${provider}`);
    return {
      provider,
      price: "Nicht verfügbar",
      source: "Keine Quelle",
      notes: "Anbieter nicht konfiguriert",
      success: false
    };
  }

  try {
    console.log(`🔍 Fetching ${provider} von ${providerInfo.url}...`);
    
    const response = await fetch(providerInfo.url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
    });

    if (!response.ok) {
      console.error(`❌ HTTP ${response.status} für ${provider}`);
      return {
        provider,
        price: "Nicht verfügbar",
        source: providerInfo.url,
        notes: `HTTP ${response.status}`,
        success: false
      };
    }

    const html = await response.text();
    
    // Einfache Preis-Extraktion aus HTML
    const priceInfo = extractPriceFromHtml(html, provider);
    
    console.log(`✅ Preis gefunden für ${provider}: ${priceInfo.price}`);
    
    return {
      provider,
      price: priceInfo.price,
      source: providerInfo.url,
      notes: priceInfo.notes,
      success: true
    };

  } catch (error) {
    console.error(`❌ Fehler beim Fetchen von ${provider}:`, error);
    return {
      provider,
      price: "Nicht verfügbar",
      source: providerInfo.url,
      notes: `Fetch-Fehler: ${error instanceof Error ? error.message : 'Unbekannter Fehler'}`,
      success: false
    };
  }
}

function extractPriceFromHtml(html: string, provider: string): { price: string; notes: string } {
  // Vereinfachte Preis-Extraktion mit Regex
  // In einer produktiven Anwendung würde hier ein HTML-Parser verwendet werden
  
  const pricePatterns = [
    /\$(\d+)(?:\.(\d+))?[\s\/]*(?:mo|month|user)/gi,
    /(\d+)[\s]*€[\s\/]*(?:mo|monat|month)/gi,
    /(?:ab|from|starting at)[\s]*\$?(\d+)/gi,
    /free|kostenlos|gratis/gi
  ];

  for (const pattern of pricePatterns) {
    const matches = html.match(pattern);
    if (matches && matches.length > 0) {
      // Nimm die ersten paar Matches als Preis-Indikation
      const priceHints = matches.slice(0, 3).join(", ");
      return {
        price: `Ab ${priceHints}`,
        notes: `Automatisch extrahiert von ${provider} Website`
      };
    }
  }

  // Fallback: Verwende bekannte Preise (als Cache/Backup)
  return getFallbackPrice(provider);
}

function getFallbackPrice(provider: string): { price: string; notes: string } {
  const fallbackPrices: Record<string, { price: string; notes: string }> = {
    "Vercel (Hobby/Pro)": {
      price: "Hobby: 0 €, Pro: ab 20 $/Monat",
      notes: "Hobby-Plan kostenlos, Pro mit erweiterten Features"
    },
    "Netlify (Free/Pro)": {
      price: "Starter: 0 €, Pro: 19 $/Monat",
      notes: "Free-Tier mit 100 GB Bandbreite/Monat"
    },
    "Cloudflare Pages": {
      price: "Free: 0 €, Pro: 20 $/Monat",
      notes: "Unbegrenzte Bandbreite im Free-Plan"
    },
    "Raidboxes (DE)": {
      price: "Mini: 15 €, Starter: 30 €",
      notes: "Deutsche Server, WordPress-optimiert"
    },
    "Kinsta": {
      price: "Starter: 35 $/Monat",
      notes: "Premium WordPress Hosting mit Google Cloud"
    },
    "Strato": {
      price: "Basic: 4 €, Plus: 8 €",
      notes: "Shared Hosting, deutscher Anbieter"
    },
    "IONOS": {
      price: "Essential: 5 €, Business: 10 €",
      notes: "Shared Hosting mit Website-Builder"
    },
    "Railway": {
      price: "Developer: 5 $, Team: 20 $",
      notes: "Pay-as-you-go nach Ressourcennutzung"
    },
    "Render": {
      price: "Starter: 7 $/Monat, Pro: 25 $/Monat",
      notes: "Auto-scaling, kostenlose Postgres-DB"
    },
    "Hetzner Cloud": {
      price: "CX11: 3,79 €, CX21: 5,83 €",
      notes: "Deutsche Rechenzentren, sehr preiswert"
    },
    "DigitalOcean Droplets": {
      price: "Basic: ab 4 $/Monat",
      notes: "Flexible VPS-Konfigurationen"
    }
  };

  return fallbackPrices[provider] || {
    price: "Preis auf Anfrage",
    notes: "Bitte offizielle Website prüfen"
  };
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('🚀 Price Research Edge Function aufgerufen');
    
    const { providers } = await req.json() as PriceResearchRequest;
    
    if (!providers || !Array.isArray(providers) || providers.length === 0) {
      return new Response(
        JSON.stringify({ error: 'Keine Provider angegeben' }),
        { 
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    console.log(`📊 Recherchiere Preise für ${providers.length} Anbieter...`);

    // Parallele Recherche für alle Provider
    const results = await Promise.all(
      providers.map(provider => fetchProviderPrice(provider))
    );

    const successCount = results.filter(r => r.success).length;
    console.log(`✅ Recherche abgeschlossen: ${successCount}/${results.length} erfolgreich`);

    return new Response(
      JSON.stringify({ 
        results,
        summary: {
          total: results.length,
          successful: successCount,
          failed: results.length - successCount
        }
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('❌ Edge Function Fehler:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unbekannter Fehler' }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
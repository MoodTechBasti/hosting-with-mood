import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Smartphone, Download, CheckCircle2, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Install = () => {
  const navigate = useNavigate();
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    // Check if app is already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      setIsInstalled(true);
    }
    
    setDeferredPrompt(null);
    setIsInstallable(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-4">
      <div className="container max-w-2xl mx-auto py-8">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/')}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Zurück
        </Button>

        <Card className="border-border/50 shadow-lg">
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center">
              <Smartphone className="w-10 h-10 text-primary" />
            </div>
            <CardTitle className="text-3xl">App installieren</CardTitle>
            <CardDescription className="text-base">
              Installieren Sie den Hosting-Entscheidungsassistent auf Ihrem Gerät für schnellen Zugriff
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {isInstalled ? (
              <div className="text-center py-8 space-y-4">
                <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto" />
                <h3 className="text-2xl font-semibold">Bereits installiert!</h3>
                <p className="text-muted-foreground">
                  Die App ist bereits auf Ihrem Gerät installiert.
                </p>
              </div>
            ) : isInstallable ? (
              <div className="space-y-6">
                <Button 
                  onClick={handleInstallClick}
                  size="lg"
                  className="w-full text-lg h-14"
                >
                  <Download className="mr-2 h-5 w-5" />
                  Jetzt installieren
                </Button>
                
                <div className="space-y-4 text-sm text-muted-foreground">
                  <h4 className="font-semibold text-foreground text-base">Vorteile:</h4>
                  <ul className="space-y-2 list-disc list-inside">
                    <li>Schneller Zugriff direkt vom Homescreen</li>
                    <li>Funktioniert auch offline</li>
                    <li>Schnellere Ladezeiten durch lokales Caching</li>
                    <li>Keine Installation über App Store nötig</li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="bg-muted/50 rounded-lg p-6 space-y-4">
                  <h4 className="font-semibold text-foreground">Installation über Browser:</h4>
                  
                  <div className="space-y-3 text-sm">
                    <div>
                      <p className="font-medium mb-2">iPhone/Safari:</p>
                      <ol className="space-y-1 list-decimal list-inside text-muted-foreground">
                        <li>Tippen Sie auf das Teilen-Symbol (Quadrat mit Pfeil nach oben)</li>
                        <li>Scrollen Sie nach unten und wählen Sie "Zum Home-Bildschirm"</li>
                        <li>Tippen Sie auf "Hinzufügen"</li>
                      </ol>
                    </div>
                    
                    <div>
                      <p className="font-medium mb-2">Android/Chrome:</p>
                      <ol className="space-y-1 list-decimal list-inside text-muted-foreground">
                        <li>Tippen Sie auf das Menü (drei Punkte oben rechts)</li>
                        <li>Wählen Sie "Zum Startbildschirm hinzufügen"</li>
                        <li>Tippen Sie auf "Hinzufügen"</li>
                      </ol>
                    </div>
                  </div>
                </div>
                
                <p className="text-center text-sm text-muted-foreground">
                  Die automatische Installation ist auf diesem Gerät/Browser nicht verfügbar. 
                  Folgen Sie den obigen Anweisungen für manuelle Installation.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Install;
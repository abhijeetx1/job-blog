
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Cookie, X, Settings } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
}

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: false,
    marketing: false,
    functional: false,
  });

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAcceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true,
      functional: true,
    };
    localStorage.setItem('cookie-consent', JSON.stringify(allAccepted));
    setIsVisible(false);
  };

  const handleAcceptSelected = () => {
    localStorage.setItem('cookie-consent', JSON.stringify(preferences));
    setIsVisible(false);
  };

  const handleRejectAll = () => {
    const onlyNecessary = {
      necessary: true,
      analytics: false,
      marketing: false,
      functional: false,
    };
    localStorage.setItem('cookie-consent', JSON.stringify(onlyNecessary));
    setIsVisible(false);
  };

  const updatePreference = (key: keyof CookiePreferences, value: boolean) => {
    setPreferences(prev => ({ ...prev, [key]: value }));
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-4">
      <Card className="w-full max-w-2xl bg-background/95 backdrop-blur-sm border-2 shadow-2xl">
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-2">
              <Cookie className="h-6 w-6 text-primary" />
              <h2 className="text-xl font-bold">Cookie Settings</h2>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsVisible(false)}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <p className="text-muted-foreground mb-6">
            We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. 
            By clicking "Accept All", you consent to our use of cookies.
          </p>

          {!showSettings ? (
            <div className="flex flex-wrap gap-3">
              <Button onClick={handleAcceptAll} className="flex-1 min-w-[120px]">
                Accept All
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setShowSettings(true)}
                className="flex-1 min-w-[120px]"
              >
                <Settings className="h-4 w-4 mr-2" />
                Customize
              </Button>
              <Button 
                variant="secondary" 
                onClick={handleRejectAll}
                className="flex-1 min-w-[120px]"
              >
                Reject All
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="text-base font-medium">Necessary Cookies</Label>
                    <p className="text-sm text-muted-foreground">
                      Required for basic site functionality. Cannot be disabled.
                    </p>
                  </div>
                  <Switch checked={true} disabled />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="text-base font-medium">Analytics Cookies</Label>
                    <p className="text-sm text-muted-foreground">
                      Help us understand how visitors interact with our website.
                    </p>
                  </div>
                  <Switch 
                    checked={preferences.analytics}
                    onCheckedChange={(checked) => updatePreference('analytics', checked)}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="text-base font-medium">Marketing Cookies</Label>
                    <p className="text-sm text-muted-foreground">
                      Used to deliver personalized advertisements.
                    </p>
                  </div>
                  <Switch 
                    checked={preferences.marketing}
                    onCheckedChange={(checked) => updatePreference('marketing', checked)}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="text-base font-medium">Functional Cookies</Label>
                    <p className="text-sm text-muted-foreground">
                      Enable enhanced functionality and personalization.
                    </p>
                  </div>
                  <Switch 
                    checked={preferences.functional}
                    onCheckedChange={(checked) => updatePreference('functional', checked)}
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-3 pt-4">
                <Button onClick={handleAcceptSelected} className="flex-1 min-w-[120px]">
                  Save Preferences
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setShowSettings(false)}
                  className="flex-1 min-w-[120px]"
                >
                  Back
                </Button>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}

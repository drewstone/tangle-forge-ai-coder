
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Loader2, Github, Twitter, Loader, Globe } from "lucide-react";
import { useNavigate } from "react-router-dom";

const providers = [
  { name: "Google", key: "google", icon: <Globe className="h-5 w-5 mr-2" /> },
  { name: "GitHub", key: "github", icon: <Github className="h-5 w-5 mr-2" /> },
  { name: "Twitter", key: "twitter", icon: <Twitter className="h-5 w-5 mr-2" /> },
];

const AuthPage = () => {
  const [loadingProvider, setLoadingProvider] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to main page if already authenticated
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        navigate("/");
      }
    });
  }, [navigate]);

  const handleOAuth = async (provider: string) => {
    setError(null);
    setLoadingProvider(provider);

    const { error } = await supabase.auth.signInWithOAuth({
      provider: provider as "google" | "github" | "twitter",
      options: {
        redirectTo: window.location.origin + "/auth",
      },
    });

    if (error) {
      setError(error.message);
      setLoadingProvider(null);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm rounded-xl shadow-2xl border bg-card p-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Sign In</h1>
        <p className="text-muted-foreground text-center mb-6">
          Choose your login provider:
        </p>
        <div className="space-y-3 mb-6">
          {providers.map((p) => (
            <Button
              key={p.key}
              variant="outline"
              className="w-full flex items-center justify-center"
              onClick={() => handleOAuth(p.key)}
              disabled={!!loadingProvider}
            >
              {loadingProvider === p.key ? (
                <Loader2 className="h-5 w-5 mr-2 animate-spin" />
              ) : (
                p.icon
              )}
              Continue with {p.name}
            </Button>
          ))}
        </div>
        {error && (
          <div className="text-destructive text-sm mb-4 text-center">
            {error}
          </div>
        )}
        <p className="text-xs text-muted-foreground text-center">
          By signing in, you agree to our Terms and Privacy Policy.
        </p>
      </div>
    </div>
  );
};

export default AuthPage;

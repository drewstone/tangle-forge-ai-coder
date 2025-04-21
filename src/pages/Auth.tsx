
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Loader2, Github, Twitter, Globe } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";

const AuthPage = () => {
  const [loading, setLoading] = useState(false);
  const [authType, setAuthType] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        navigate("/");
      }
    });
  }, [navigate]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    if (authType === "login") {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      setLoading(false);
      if (error) {
        setError(error.message);
      }
    } else {
      const { error } = await supabase.auth.signUp({ email, password });
      setLoading(false);
      if (error) {
        setError(error.message);
      }
    }
  };

  // Listen for session changes to redirect after login/signup
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        navigate("/");
      }
    });
    return () => subscription.unsubscribe();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm rounded-xl shadow-2xl border bg-card p-8">
        <h1 className="text-3xl font-bold mb-4 text-center">Sign {authType === "login" ? "In" : "Up"}</h1>

        <form className="space-y-4 mb-4" onSubmit={handleAuth}>
          <Input
            type="email"
            placeholder="Email"
            autoComplete="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Password"
            autoComplete={authType === "login" ? "current-password" : "new-password"}
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <Button type="submit" className="w-full" disabled={loading}>
            {loading && <Loader2 className="h-5 w-5 mr-2 animate-spin" />}
            {authType === "login" ? "Sign In" : "Sign Up"}
          </Button>
        </form>

        <div className="text-center text-sm mb-3">
          {authType === "login" ? (
            <>
              Don&apos;t have an account?{" "}
              <button
                className="text-primary hover:underline"
                type="button"
                onClick={() => setAuthType("signup")}
              >
                Sign Up
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                className="text-primary hover:underline"
                type="button"
                onClick={() => setAuthType("login")}
              >
                Sign In
              </button>
            </>
          )}
        </div>
        <div className="mb-3">
          <Button variant="outline" className="w-full mb-2" disabled>
            <Globe className="h-5 w-5 mr-2" /> Continue with Google (disabled)
          </Button>
          <Button variant="outline" className="w-full mb-2" disabled>
            <Github className="h-5 w-5 mr-2" /> Continue with GitHub (disabled)
          </Button>
          <Button variant="outline" className="w-full" disabled>
            <Twitter className="h-5 w-5 mr-2" /> Continue with Twitter (disabled)
          </Button>
          <div className="text-xs text-muted-foreground text-center mt-2">
            Social sign-in unavailable. Contact support if you have issues.
          </div>
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


import TangleBlueprintApp from "@/components/TangleBlueprintApp";
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Require authentication to access the main app
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        navigate("/auth");
      }
    });

    // Listen for auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        navigate("/auth");
      }
    });

    return () => {
      authListener?.subscription?.unsubscribe?.();
    };
  }, [navigate]);

  return <TangleBlueprintApp />;
};

export default Index;

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import SurveyForm from "@/components/SurveyForm";
import {
  Heart,
  LogOut,
  CheckCircle2,
  Calendar,
  LayoutDashboard,
} from "lucide-react";
import { toast } from "sonner";
import { useUserRole } from "@/hooks/useUserRole";
import { supabase } from "@/lib/supabase/client";

const Index = () => {
  const [surveyCompleted, setSurveyCompleted] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  //const { isAdmin, loading: roleLoading } = useUserRole(user?.id);

  // if (loading || !user) {
  //   return (
  //     <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background via-primary/5 to-secondary/5">
  //       <div className="text-center">
  //         <Heart className="w-12 h-12 text-primary animate-pulse mx-auto mb-4" />
  //         <p className="text-muted-foreground">Cargando...</p>
  //       </div>
  //     </div>
  //   );
  // }

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) toast.error("Error al cerrar sesión: " + error.message);
  };

  const handleSurveyComplete = () => {
    setSurveyCompleted(true);
    toast.success("¡Gracias por completar la encuesta de hoy!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/5">
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <img
              src="/logo.png"
              alt="logo"
              className="w-9 h-9 text-primary-foreground"
            />

            <h1 className="text-xl font-bold">Mi Bienestar Diario</h1>
          </div>
          <div className="flex gap-2">
            {/* {
              <Button
                variant="outline"
                onClick={() => navigate("/dashboard")}
                className="gap-2"
              >
                <LayoutDashboard className="w-4 h-4" />
                <span className="hidden sm:inline">Dashboard</span>
              </Button>
            } */}
            <Button variant="outline" onClick={handleLogout} className="gap-2">
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Cerrar Sesión</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {surveyCompleted ? (
          <Card className="shadow-lg border-border/50">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-primary/10 rounded-full">
                  <CheckCircle2 className="w-12 h-12 text-primary" />
                </div>
              </div>
              <CardTitle className="text-2xl">¡Encuesta Completada!</CardTitle>
              <CardDescription>
                Ya completaste tu encuesta del día de hoy
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <div className="p-4 bg-muted/50 rounded-lg">
                <Calendar className="w-8 h-8 text-primary mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">
                  Vuelve mañana para completar tu siguiente encuesta
                </p>
              </div>
              <p className="text-sm text-muted-foreground">
                Recuerda que es importante mantener un seguimiento constante de
                tu bienestar
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold">Encuesta Diaria</h2>
              <p className="text-muted-foreground">
                Tómate unos minutos para registrar cómo te sientes hoy
              </p>
            </div>
            <SurveyForm onComplete={handleSurveyComplete} />
          </div>
        )}
      </main>
      <footer className="border-t border-border/50 bg-card/50 backdrop-blur-sm py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2025 Mi Bienestar Diario. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;

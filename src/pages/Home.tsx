import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Heart,
  BarChart3,
  Calendar,
  Shield,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/5">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div>
              <img src="/logo.png" alt="Logo" className="w-8 h-8" />
            </div>
            <h1 className="text-xl font-bold">Mi Bienestar Diario</h1>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => navigate("/auth")}>
              Iniciar Sesión
            </Button>
            <Button onClick={() => navigate("/auth")}>
              Comenzar
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 md:py-24">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          <div className="flex justify-center">
            <img src="/logo.png" alt="Logo" className="w-20 h-20" />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold leading-tight">
            Tu Salud Mental Importa
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground">
            Lleva un seguimiento diario de tu bienestar emocional y físico.
            Mejora tu calidad de vida con nuestras encuestas personalizadas.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button
              size="lg"
              onClick={() => navigate("/auth")}
              className="text-base"
            >
              Empezar Ahora
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate("/auth")}
              className="text-base"
            >
              Información
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      {/* <section className="container mx-auto px-4 py-12 md:py-20">
        <div className="text-center mb-12">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            ¿Por qué elegir Mi Bienestar Diario?
          </h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Herramientas simples pero poderosas para tu bienestar
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <Card className="border-border/50 hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="p-3 bg-primary/10 rounded-lg w-fit mb-2">
                <Calendar className="w-8 h-8 text-primary" />
              </div>
              <CardTitle>Seguimiento Diario</CardTitle>
              <CardDescription>
                Registra tu estado emocional cada día y observa tus patrones a lo largo del tiempo
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-border/50 hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="p-3 bg-primary/10 rounded-lg w-fit mb-2">
                <BarChart3 className="w-8 h-8 text-primary" />
              </div>
              <CardTitle>Análisis Detallado</CardTitle>
              <CardDescription>
                Visualiza tu progreso con gráficos claros y obtén insights sobre tu bienestar
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-border/50 hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="p-3 bg-primary/10 rounded-lg w-fit mb-2">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <CardTitle>100% Privado</CardTitle>
              <CardDescription>
                Tus datos están seguros y encriptados. Solo tú tienes acceso a tu información
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section> */}

      {/* Benefits Section */}
      {/* <section className="bg-muted/30 py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Beneficios de Usar Nuestra Plataforma
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                "Mejora tu autoconocimiento emocional",
                "Identifica patrones en tu estado de ánimo",
                "Toma decisiones más informadas sobre tu salud",
                "Facilita la comunicación con profesionales de la salud",
                "Establece y monitorea metas de bienestar",
                "Accede a tus datos desde cualquier dispositivo"
              ].map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                  <p className="text-foreground">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section> */}

      {/* CTA Section */}
      {/* <section className="container mx-auto px-4 py-12 md:py-20">
        <Card className="max-w-3xl mx-auto text-center border-border/50 shadow-lg">
          <CardContent className="pt-8 pb-8 space-y-6">
            <h3 className="text-2xl md:text-3xl font-bold">
              Comienza tu Viaje hacia el Bienestar
            </h3>
            <p className="text-muted-foreground text-lg">
              Únete a miles de personas que ya están mejorando su salud mental
            </p>
            <Button size="lg" onClick={() => navigate('/auth')} className="text-base">
              Registrarse Gratis
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </CardContent>
        </Card>
      </section> */}

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 border-t border-border/50 bg-card/50 backdrop-blur-sm py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2025 Mi Bienestar Diario. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;

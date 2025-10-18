import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import { Heart } from "lucide-react";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulación de autenticación - acepta cualquier correo y contraseña
    setTimeout(() => {
      // Guardar datos simulados en localStorage
      localStorage.setItem(
        "user",
        JSON.stringify({ email, isAuthenticated: true })
      );

      toast.success(
        isLogin ? "Sesión iniciada con éxito" : "Cuenta creada con éxito"
      );
      setLoading(false);

      // Redirigir a la encuesta
      navigate("/survey");
    }, 500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-primary/5 to-secondary/5 p-4">
      <Card className="w-full max-w-md shadow-lg border-border/50">
        <CardHeader className="text-center space-y-2">
          <div className="flex justify-center mb-3 mt-3">
            <img
              src="/logo.png"
              alt="logo"
              className="w-20 h-20 text-primary-foreground"
            />
          </div>
          <CardTitle className="text-2xl font-bold">
            {isLogin ? "Iniciar Sesión" : "Crear Cuenta"}
          </CardTitle>
          <CardDescription>
            {isLogin
              ? "Ingresa para completar tu encuesta diaria"
              : "Regístrate para comenzar tu seguimiento"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAuth} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Correo electrónico</Label>
              <Input
                id="email"
                type="email"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="transition-all focus:shadow-sm"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="transition-all focus:shadow-sm"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-primary hover:opacity-90 transition-opacity"
              disabled={loading}
            >
              {loading
                ? "Cargando..."
                : isLogin
                ? "Iniciar Sesión"
                : "Registrarse"}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-primary hover:underline transition-all"
            >
              {isLogin
                ? "¿No tienes cuenta? Regístrate"
                : "¿Ya tienes cuenta? Inicia sesión"}
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;

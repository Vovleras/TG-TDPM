import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/lib/supabase/client";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();

  const validatePassword = (pwd: string) => {
    const hasUpperCase = /[A-Z]/.test(pwd);

    const hasNumber = /[0-9]/.test(pwd);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(pwd);
    const hasMinLength = pwd.length >= 8;
    if (!hasMinLength) return "Minimo 8 caracteres";
    if (!hasUpperCase) return "Debe contener al menos una letra mayúscula";
    if (!hasNumber) return "Debe contener al menos un número";
    if (!hasSpecialChar) return "Debe contener al menos un carácter especial";
    return "";
  };

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        navigate("/survey");
      }
    };
    checkSession();
  }, [navigate]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLogin) {
      const error = validatePassword(password);
      if (error) {
        setPasswordError(error);
        return;
      }
    }

    setLoading(true);
    setPasswordError("");

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
      }

      toast.success(
        isLogin ? "Sesión iniciada con éxito" : "Cuenta creada con éxito"
      );
      navigate("/survey");
    } catch (error: any) {
      toast.error(error.message || "Ocurrió un error al autenticar");
    } finally {
      setLoading(false);
    }
  };

  const handleOAuthSignIn = async () => {
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: "https://mindme.vercel.app/auth/callback",
          skipBrowserRedirect: false,
        },
      });
      if (error) throw error;
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    } finally {
      setLoading(false);
    }
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
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (!isLogin) {
                    setPasswordError(validatePassword(e.target.value));
                  }
                }}
                required
                minLength={8}
                className={`transition-all focus:shadow-sm ${
                  passwordError ? "border-destructive" : ""
                }`}
              />
              {!isLogin && (
                <div className="text-xs space-y-1 mt-2">
                  <p
                    className={`${
                      password.length >= 8
                        ? "text-green-600"
                        : "text-muted-foreground"
                    } flex items-center gap-1`}
                  >
                    {password.length >= 8 ? "✓" : "-"} Mínimo 8 caracteres
                  </p>
                  <p
                    className={`${
                      /[A-Z]/.test(password)
                        ? "text-green-600"
                        : "text-muted-foreground"
                    } flex items-center gap-1`}
                  >
                    {/[A-Z]/.test(password) ? "✓" : "-"} Al menos 1 mayúscula
                  </p>
                  <p
                    className={`${
                      /[0-9]/.test(password)
                        ? "text-green-600"
                        : "text-muted-foreground"
                    } flex items-center gap-1`}
                  >
                    {/[0-9]/.test(password) ? "✓" : "-"} Al menos 1 número
                  </p>
                  <p
                    className={`${
                      /[!@#$%^&*(),.?":{}|<>]/.test(password)
                        ? "text-green-600"
                        : "text-muted-foreground"
                    } flex items-center gap-1`}
                  >
                    {/[!@#$%^&*(),.?":{}|<>]/.test(password) ? "✓" : "-"} Al
                    menos 1 carácter especial
                  </p>
                </div>
              )}

              {passwordError && (
                <p className="text-xs text-destructive">{passwordError}</p>
              )}
            </div>
            <Button
              type="submit"
              className="w-full bg-primary hover:opacity-90 transition-opacity"
              disabled={loading || (!isLogin && passwordError !== "")}
            >
              {loading
                ? "Cargando..."
                : isLogin
                ? "Iniciar Sesión"
                : "Registrarse"}
            </Button>
            <div className="mt-6 space-y-4">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">
                    O continúa con
                  </span>
                </div>
              </div>

              <div className="mt-6 flex justify-center space-y-4 gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleOAuthSignIn()}
                  className="transition-all center"
                >
                  <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Google
                </Button>
              </div>
            </div>
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

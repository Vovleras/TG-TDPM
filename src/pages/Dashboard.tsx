import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserRole } from "@/hooks/useUserRole";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { LogOut, Users, FileText, TrendingUp } from "lucide-react";
import { toast } from "sonner";

interface SurveyStats {
  totalResponses: number;
  totalUsers: number;
  averageDepression: number;
  averageAnxiety: number;
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const { role, loading: roleLoading, isAdmin } = useUserRole(user?.id);
  const [stats, setStats] = useState<SurveyStats>({
    totalResponses: 0,
    totalUsers: 0,
    averageDepression: 0,
    averageAnxiety: 0,
  });
  const [surveys, setSurveys] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   if (!roleLoading && !isAdmin) {
  //     toast.error("No tienes permisos para acceder al dashboard");
  //     navigate("/");
  //   }
  // }, [roleLoading, isAdmin, navigate]);

  const handleSignOut = () => {
    // Lógica de cierre de sesión
    toast.success("Has cerrado sesión exitosamente");
    navigate("/auth");
  };

  /* if (roleLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Cargando dashboard...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  } */

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Dashboard Administrativo</h1>
          <Button onClick={handleSignOut} variant="outline" size="sm">
            <LogOut className="w-4 h-4 mr-2" />
            Cerrar Sesión
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Respuestas
              </CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalResponses}</div>
              <p className="text-xs text-muted-foreground">
                Encuestas completadas
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Usuarios
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUsers}</div>
              <p className="text-xs text-muted-foreground">
                Usuarios registrados
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Depresión Promedio
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stats.averageDepression}/10
              </div>
              <p className="text-xs text-muted-foreground">Nivel promedio</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Ansiedad Promedio
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stats.averageAnxiety}/10
              </div>
              <p className="text-xs text-muted-foreground">Nivel promedio</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="recent" className="space-y-4">
          <TabsList>
            <TabsTrigger value="recent">Respuestas Recientes</TabsTrigger>
            <TabsTrigger value="users">Por Usuario</TabsTrigger>
          </TabsList>

          <TabsContent value="recent" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Últimas 10 Encuestas</CardTitle>
                <CardDescription>
                  Las encuestas más recientes del sistema
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {surveys.slice(0, 10).map((survey) => (
                    <div
                      key={survey.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="space-y-1">
                        <p className="text-sm font-medium">
                          Fecha:{" "}
                          {new Date(survey.survey_date).toLocaleDateString(
                            "es-ES"
                          )}
                        </p>
                        <div className="flex gap-4 text-xs text-muted-foreground">
                          {survey.depression_level && (
                            <span>Depresión: {survey.depression_level}/10</span>
                          )}
                          {survey.anxiety_level && (
                            <span>Ansiedad: {survey.anxiety_level}/10</span>
                          )}
                          {survey.irritability_level && (
                            <span>
                              Irritabilidad: {survey.irritability_level}/10
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {new Date(survey.created_at).toLocaleString("es-ES")}
                      </div>
                    </div>
                  ))}
                  {surveys.length === 0 && (
                    <p className="text-center text-muted-foreground py-8">
                      No hay encuestas registradas
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Respuestas por Usuario</CardTitle>
                <CardDescription>
                  Visualización de datos por usuario (próximamente)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Funcionalidad en desarrollo: gráficas por usuario, filtros por
                  fecha, exportación de datos.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

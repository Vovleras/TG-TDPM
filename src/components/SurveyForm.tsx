import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface SurveyFormProps {
  onComplete: () => void;
}

const SurveyForm = ({ onComplete }: SurveyFormProps) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    menstruation_in_week: null as boolean | null,
    mood_changes: [] as string[],
    irritability_level: 5,
    anger_level: 5,
    concentration_difficulty: null as boolean | null,
    sleep_changes: "",
    felt_overwhelmed: null as boolean | null,
    overwhelmed_feeling: "",
    suicidal_thoughts: null as boolean | null,
    physical_changes: [] as string[],
    depression_level: 5,
    interpersonal_conflicts_level: 5,
    negative_thoughts: [] as string[],
    anxiety_level: 5,
    tension_level: 5,
    lost_interest: null as boolean | null,
    lost_interest_unusual: null as boolean | null,
    fatigue_level: 5,
    felt_sleepy: null as boolean | null,
    sleepiness_level: 5,
    energy_level: "",
    appetite_changes: null as boolean | null,
    has_menstruation: null as boolean | null,
    menstruation_start_date: null as string | null,
    menstruation_end_date: null as string | null,
    menstruation_likely_next_7days: null as boolean | null,
    menstruation_7days_ago: null as boolean | null,
  });

  const handleCheckboxChange = (
    field: string,
    value: string,
    checked: boolean
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: checked
        ? [...(prev[field as keyof typeof prev] as string[]), value]
        : (prev[field as keyof typeof prev] as string[]).filter(
            (v) => v !== value
          ),
    }));
  };

  const handleSubmit = () => {
    setLoading(true);
    // Simulate form submission
    setTimeout(() => {
      setLoading(false);
      onComplete();
    }, 1000);
  };

  const ScaleInput = ({
    label,
    value,
    onChange,
  }: {
    label: string;
    value: number;
    onChange: (v: number) => void;
  }) => (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="flex items-center gap-4">
        <span className="text-sm text-muted-foreground w-8">1</span>
        <input
          type="range"
          min="1"
          max="10"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="flex-1 accent-primary"
        />
        <span className="text-sm text-muted-foreground w-8">10</span>
        <span className="text-lg font-semibold text-primary w-8">{value}</span>
      </div>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Ciclo Menstrual</CardTitle>
          <CardDescription>Información sobre tu ciclo</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>
              ¿Dentro de una semana te puede llegar la menstruación?
            </Label>
            <RadioGroup
              onValueChange={(v) =>
                setFormData({ ...formData, menstruation_in_week: v === "si" })
              }
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="si" id="menst-week-si" />
                <Label htmlFor="menst-week-si">Sí</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="menst-week-no" />
                <Label htmlFor="menst-week-no">No</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label>¿Tienes la menstruación actualmente?</Label>
            <RadioGroup
              onValueChange={(v) =>
                setFormData({ ...formData, has_menstruation: v === "si" })
              }
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="si" id="has-menst-si" />
                <Label htmlFor="has-menst-si">Sí</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="has-menst-no" />
                <Label htmlFor="has-menst-no">No</Label>
              </div>
            </RadioGroup>
          </div>

          {formData.has_menstruation && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="menst-start">Fecha de inicio</Label>
                <Input
                  id="menst-start"
                  type="date"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      menstruation_start_date: e.target.value,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="menst-end">Fecha de fin (si ya terminó)</Label>
                <Input
                  id="menst-end"
                  type="date"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      menstruation_end_date: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          )}

          {/* <div className="space-y-2">
            <Label>¿En los próximos 7 días es probable que te llegue?</Label>
            <RadioGroup
              onValueChange={(v) =>
                setFormData({
                  ...formData,
                  menstruation_likely_next_7days: v === "si",
                })
              }
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="si" id="next7-si" />
                <Label htmlFor="next7-si">Sí</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="next7-no" />
                <Label htmlFor="next7-no">No</Label>
              </div>
            </RadioGroup>
          </div> */}

          <div className="space-y-2">
            <Label>¿Hace 7 días te llegó la menstruación?</Label>
            <RadioGroup
              onValueChange={(v) =>
                setFormData({ ...formData, menstruation_7days_ago: v === "si" })
              }
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="si" id="past7-si" />
                <Label htmlFor="past7-si">Sí</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="past7-no" />
                <Label htmlFor="past7-no">No</Label>
              </div>
            </RadioGroup>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Estado Emocional</CardTitle>
          <CardDescription>¿Cómo te has sentido esta semana?</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>
              ¿Sientes cambios marcados en tu estado de ánimo el dia de hoy?
            </Label>
            <div className="space-y-2">
              {[
                "Cambios bruscos de humor",
                "Tristeza o llanto",
                "Mayor sensibilidad al rechazo",
                "Otros",
              ].map((option) => (
                <div key={option} className="flex items-center space-x-2">
                  <Checkbox
                    id={`mood-${option}`}
                    onCheckedChange={(checked) =>
                      handleCheckboxChange(
                        "mood_changes",
                        option,
                        checked as boolean
                      )
                    }
                  />
                  <Label htmlFor={`mood-${option}`}>{option}</Label>
                </div>
              ))}
            </div>
          </div>

          <ScaleInput
            label="¿Cuál fue tu nivel de irritabilidad hoy? (1-10)"
            value={formData.irritability_level}
            onChange={(v) =>
              setFormData({ ...formData, irritability_level: v })
            }
          />

          <ScaleInput
            label="¿Cuál fue tu nivel de enojo hoy? (1-10)"
            value={formData.anger_level}
            onChange={(v) => setFormData({ ...formData, anger_level: v })}
          />

          <ScaleInput
            label="¿Qué tan deprimida o triste te has sentido hoy? (1-10)"
            value={formData.depression_level}
            onChange={(v) => setFormData({ ...formData, depression_level: v })}
          />

          <ScaleInput
            label="¿Cuál fue tu nivel de ansiedad hoy? (1-10)"
            value={formData.anxiety_level}
            onChange={(v) => setFormData({ ...formData, anxiety_level: v })}
          />

          <ScaleInput
            label="¿Cuál fue tu nivel de tensión esta semana? (1-10)"
            value={formData.tension_level}
            onChange={(v) => setFormData({ ...formData, tension_level: v })}
          />

          <ScaleInput
            label="¿Sientes que tus relaciones interpersonales fueron conflictivas el dia de hoy? (1-10)"
            value={formData.interpersonal_conflicts_level}
            onChange={(v) =>
              setFormData({ ...formData, interpersonal_conflicts_level: v })
            }
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Síntomas Cognitivos y Físicos</CardTitle>
          <CardDescription>
            Aspectos relacionados con tu salud física y mental
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>¿Tuviste dificultades para concentrarte?</Label>
            <RadioGroup
              onValueChange={(v) =>
                setFormData({
                  ...formData,
                  concentration_difficulty: v === "si",
                })
              }
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="si" id="conc-si" />
                <Label htmlFor="conc-si">Sí</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="conc-no" />
                <Label htmlFor="conc-no">No</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label>¿Tuviste cambios en el ciclo de sueño?</Label>
            <RadioGroup
              onValueChange={(v) =>
                setFormData({ ...formData, sleep_changes: v })
              }
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="dormi_mas" id="sleep-mas" />
                <Label htmlFor="sleep-mas">Dormí más</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="dormi_menos" id="sleep-menos" />
                <Label htmlFor="sleep-menos">Dormí menos</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="normal" id="sleep-normal" />
                <Label htmlFor="sleep-normal">Normal</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label>¿Te sentiste somnolienta el dia de hoy?</Label>
            <RadioGroup
              onValueChange={(v) =>
                setFormData({ ...formData, felt_sleepy: v === "si" })
              }
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="si" id="sleepy-si" />
                <Label htmlFor="sleepy-si">Sí</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="sleepy-no" />
                <Label htmlFor="sleepy-no">No</Label>
              </div>
            </RadioGroup>
          </div>

          {formData.felt_sleepy && (
            <ScaleInput
              label="¿Cuál fue tu nivel de somnolencia? (1-10)"
              value={formData.sleepiness_level}
              onChange={(v) =>
                setFormData({ ...formData, sleepiness_level: v })
              }
            />
          )}

          <ScaleInput
            label="¿Cuál fue tu nivel de fatiga el día de hoy? (1-10)"
            value={formData.fatigue_level}
            onChange={(v) => setFormData({ ...formData, fatigue_level: v })}
          />

          <div className="space-y-2">
            <Label>¿Cuál fue tu nivel de energía durante el día de hoy?</Label>
            <RadioGroup
              onValueChange={(v) =>
                setFormData({ ...formData, energy_level: v })
              }
            >
              {["Nada", "Poco", "Moderada", "Normal", "Mucho", "Demasiada"].map(
                (option) => (
                  <div key={option} className="flex items-center space-x-2">
                    <RadioGroupItem
                      value={option.toLowerCase()}
                      id={`energy-${option}`}
                    />
                    <Label htmlFor={`energy-${option}`}>{option}</Label>
                  </div>
                )
              )}
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label>Notaste cambios físicos el dia de hoy:</Label>
            <div className="space-y-2">
              {[
                "Sensibilidad o inflamación en los senos",
                "Dolor en articulaciones o músculos",
                "Sensación de hinchazón o aumento de peso",
              ].map((option) => (
                <div key={option} className="flex items-center space-x-2">
                  <Checkbox
                    id={`physical-${option}`}
                    onCheckedChange={(checked) =>
                      handleCheckboxChange(
                        "physical_changes",
                        option,
                        checked as boolean
                      )
                    }
                  />
                  <Label htmlFor={`physical-${option}`}>{option}</Label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label>
              ¿Tuviste cambios notables en tu apetito el dia de hoy?
            </Label>
            <RadioGroup
              onValueChange={(v) =>
                setFormData({ ...formData, appetite_changes: v === "si" })
              }
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="si" id="appetite-si" />
                <Label htmlFor="appetite-si">
                  Sí (sobrealimentación o antojos específicos)
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="appetite-no" />
                <Label htmlFor="appetite-no">No</Label>
              </div>
            </RadioGroup>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Bienestar General</CardTitle>
          <CardDescription>Preguntas sobre tu estado general</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>¿Te sentiste abrumada o fuera de control esta semana?</Label>
            <RadioGroup
              onValueChange={(v) =>
                setFormData({ ...formData, felt_overwhelmed: v === "si" })
              }
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="si" id="overwhelmed-si" />
                <Label htmlFor="overwhelmed-si">Sí</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="overwhelmed-no" />
                <Label htmlFor="overwhelmed-no">No</Label>
              </div>
            </RadioGroup>
          </div>

          {formData.felt_overwhelmed && (
            <div className="space-y-2">
              <Label htmlFor="overwhelmed-feeling">¿Qué sentiste?</Label>
              <Textarea
                id="overwhelmed-feeling"
                placeholder="Describe cómo te sentiste..."
                value={formData.overwhelmed_feeling}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    overwhelmed_feeling: e.target.value,
                  })
                }
                className="min-h-[100px]"
              />
            </div>
          )}

          <div className="space-y-2">
            <Label>
              ¿Sientes que tuviste desinterés en tus actividades usuales durante
              la semana?
            </Label>
            <RadioGroup
              onValueChange={(v) =>
                setFormData({ ...formData, lost_interest: v === "si" })
              }
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="si" id="interest-si" />
                <Label htmlFor="interest-si">Sí</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="interest-no" />
                <Label htmlFor="interest-no">No</Label>
              </div>
            </RadioGroup>
          </div>

          {formData.lost_interest && (
            <div className="space-y-2">
              <Label>¿Esto fue algo inusual?</Label>
              <RadioGroup
                onValueChange={(v) =>
                  setFormData({
                    ...formData,
                    lost_interest_unusual: v === "si",
                  })
                }
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="si" id="unusual-si" />
                  <Label htmlFor="unusual-si">Sí</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="unusual-no" />
                  <Label htmlFor="unusual-no">No</Label>
                </div>
              </RadioGroup>
            </div>
          )}

          <div className="space-y-2">
            <Label>
              ¿Has tenido alguno de estos pensamientos durante la semana?
            </Label>
            <div className="space-y-2">
              {[
                "Sensación de desesperanza marcada",
                "Pensamientos de desprecio marcada",
                "Pensamientos de suicidio marcada",
              ].map((option) => (
                <div key={option} className="flex items-center space-x-2">
                  <Checkbox
                    id={`thought-${option}`}
                    onCheckedChange={(checked) =>
                      handleCheckboxChange(
                        "negative_thoughts",
                        option,
                        checked as boolean
                      )
                    }
                  />
                  <Label htmlFor={`thought-${option}`}>{option}</Label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
            <Label className="text-destructive font-semibold">
              ¿Tuviste pensamientos suicidas?
            </Label>
            <RadioGroup
              onValueChange={(v) =>
                setFormData({ ...formData, suicidal_thoughts: v === "si" })
              }
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="si" id="suicide-si" />
                <Label htmlFor="suicide-si">Sí</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="suicide-no" />
                <Label htmlFor="suicide-no">No</Label>
              </div>
            </RadioGroup>
            <p className="text-xs text-muted-foreground mt-2">
              Si estás experimentando pensamientos suicidas, por favor busca
              ayuda profesional inmediatamente.
            </p>
          </div>
        </CardContent>
      </Card>

      <Button
        type="submit"
        disabled={loading}
        className="w-full bg-primary hover:opacity-90 transition-opacity"
        size="lg"
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Guardando...
          </>
        ) : (
          "Completar Encuesta"
        )}
      </Button>
    </form>
  );
};

export default SurveyForm;

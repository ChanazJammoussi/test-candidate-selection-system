"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  GraduationCap,
  Eye,
  EyeOff,
  Mail,
  Lock,
  Calendar,
  Users,
  ArrowRight,
  ChevronLeft,
  Building2,
  BookOpen,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { FieldGroup, Field, FieldLabel } from "@/components/ui/field"
import { CONCOURS_OUVERTS, type Concours } from "@/lib/mock-concours"

type Step = "select" | "login"

const DOMAINE_COLORS: Record<string, string> = {
  "Génie Civil": "bg-orange-100 text-orange-700 border-orange-200",
  "Informatique": "bg-blue-100 text-blue-700 border-blue-200",
  "Finance": "bg-green-100 text-green-700 border-green-200",
  "Médecine": "bg-red-100 text-red-700 border-red-200",
}

export default function CandidatLoginPage() {
  const router = useRouter()
  const [step, setStep] = useState<Step>("select")
  const [selectedConcours, setSelectedConcours] = useState<Concours | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({ email: "", password: "" })

  const handleSelectConcours = (concours: Concours) => {
    setSelectedConcours(concours)
    setStep("login")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedConcours) return
    setIsLoading(true)
    setTimeout(() => {
      router.push(`/candidat/${selectedConcours.id}`)
      setIsLoading(false)
    }, 1000)
  }

  const tauxRemplissage = (c: Concours) =>
    Math.round((c.candidatsInscrits / (c.placesDisponibles * 6)) * 100)

  return (
    <div className="flex min-h-screen bg-background">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-2/5 bg-sidebar flex-col justify-between p-12">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
            <GraduationCap className="h-6 w-6 text-primary-foreground" />
          </div>
          <span className="text-xl font-semibold text-sidebar-foreground">SGCI</span>
        </div>

        <div className="space-y-6">
          <h1 className="text-4xl font-bold text-sidebar-foreground leading-tight">
            Système de Gestion des Concours d'Intégration
          </h1>
          <p className="text-lg text-sidebar-foreground/70 leading-relaxed">
            Selectionnez un concours ouvert, connectez-vous et gerez votre candidature en ligne.
          </p>
          <div className="flex flex-col gap-3 pt-4">
            {[
              "Soumission de candidatures en ligne",
              "Suivi en temps réel de votre dossier",
              "Résultats et classements instantanés",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 text-sidebar-foreground/80">
                <div className="h-2 w-2 rounded-full bg-accent flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="text-sm text-sidebar-foreground/50">© 2026 SGCI. Tous droits réservés.</p>
      </div>

      {/* Right panel */}
      <div className="flex flex-1 flex-col items-center justify-center p-6 lg:p-12 overflow-y-auto">
        <div className="w-full max-w-2xl py-8">

          {step === "select" && (
            <div className="space-y-6">
              <div className="space-y-1">
                <h2 className="text-2xl font-bold text-foreground">Concours ouverts</h2>
                <p className="text-muted-foreground">
                  Selectionnez le concours auquel vous souhaitez postuler
                </p>
              </div>

              <div className="grid gap-4">
                {CONCOURS_OUVERTS.map((concours) => {
                  const taux = tauxRemplissage(concours)
                  const domaineColor =
                    DOMAINE_COLORS[concours.domaine] ??
                    "bg-secondary text-secondary-foreground border-border"

                  return (
                    <Card
                      key={concours.id}
                      className="cursor-pointer border-border hover:border-primary/50 hover:shadow-md transition-all duration-200 group"
                      onClick={() => handleSelectConcours(concours)}
                    >
                      <CardContent className="p-5">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-start gap-4 flex-1 min-w-0">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 flex-shrink-0">
                              <BookOpen className="h-6 w-6 text-primary" />
                            </div>
                            <div className="flex-1 min-w-0 space-y-2">
                              <div className="flex items-center gap-2 flex-wrap">
                                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                                  {concours.titre}
                                </h3>
                                <Badge variant="outline" className={domaineColor}>
                                  {concours.domaine}
                                </Badge>
                              </div>
                              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                                <Building2 className="h-3.5 w-3.5 flex-shrink-0" />
                                <span className="truncate">{concours.institution}</span>
                              </div>
                              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1.5">
                                  <Calendar className="h-3.5 w-3.5" />
                                  <span>Cloture : {concours.dateClotureInscription}</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                  <Users className="h-3.5 w-3.5" />
                                  <span>{concours.placesDisponibles} places</span>
                                </div>
                              </div>
                              <div className="space-y-1">
                                <div className="flex justify-between text-xs text-muted-foreground">
                                  <span>{concours.candidatsInscrits} candidats inscrits</span>
                                  <span>{Math.min(taux, 100)}% de saturation</span>
                                </div>
                                <div className="h-1.5 w-full rounded-full bg-secondary overflow-hidden">
                                  <div
                                    className="h-full rounded-full bg-primary transition-all"
                                    style={{ width: `${Math.min(taux, 100)}%` }}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0 mt-1" />
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>

              <p className="text-center text-sm text-muted-foreground">
                Administrateur ?{" "}
                <a href="/admin/login" className="text-primary hover:underline font-medium">
                  Connexion administration
                </a>
              </p>
            </div>
          )}

          {step === "login" && selectedConcours && (
            <div className="space-y-6 max-w-md mx-auto">
              <button
                type="button"
                onClick={() => setStep("select")}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <ChevronLeft className="h-4 w-4" />
                Changer de concours
              </button>

              <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 flex-shrink-0">
                  <BookOpen className="h-5 w-5 text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="font-medium text-foreground truncate">{selectedConcours.titre}</p>
                  <p className="text-sm text-muted-foreground truncate">{selectedConcours.institution}</p>
                </div>
              </div>

              <div className="space-y-1">
                <h2 className="text-2xl font-bold text-foreground">Connexion</h2>
                <p className="text-muted-foreground">Connectez-vous pour acceder a votre candidature</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor="email">Adresse email</FieldLabel>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="votre@email.com"
                        className="pl-9"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        autoFocus
                      />
                    </div>
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="password">Mot de passe</FieldLabel>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Votre mot de passe"
                        className="pl-9 pr-10"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </Field>
                </FieldGroup>

                <div className="flex items-center justify-end">
                  <a href="#" className="text-sm text-primary hover:underline">
                    Mot de passe oublié ?
                  </a>
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Connexion en cours..." : "Se connecter"}
                </Button>
              </form>

              <p className="text-center text-sm text-muted-foreground">
                Pas encore de compte ?{" "}
                <a href="#" className="text-primary hover:underline font-medium">
                  Créer un compte
                </a>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
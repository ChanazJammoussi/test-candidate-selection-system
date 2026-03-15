"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { GraduationCap, Eye, EyeOff, Mail, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FieldGroup, Field, FieldLabel } from "@/components/ui/field"

export default function LoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate authentication - in production, this would call an API
    setTimeout(() => {
      // Demo: admin@example.com goes to admin, others go to candidate
      if (formData.email.includes("admin")) {
        router.push("/admin")
      } else {
        router.push("/candidat")
      }
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="flex min-h-screen bg-background">
      {/* Left side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-sidebar flex-col justify-between p-12">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
            <GraduationCap className="h-6 w-6 text-primary-foreground" />
          </div>
          <span className="text-xl font-semibold text-sidebar-foreground">SGCI</span>
        </div>
        
        <div className="space-y-6">
          <h1 className="text-4xl font-bold text-sidebar-foreground leading-tight text-balance">
            Système de Gestion des Concours d'Intégration
          </h1>
          <p className="text-lg text-sidebar-foreground/70 leading-relaxed">
            Plateforme digitale pour la gestion complète des candidatures et la sélection des candidats aux concours d'intégration.
          </p>
          <div className="flex flex-col gap-4 pt-4">
            <div className="flex items-center gap-3 text-sidebar-foreground/80">
              <div className="h-2 w-2 rounded-full bg-accent" />
              <span>Soumission de candidatures en ligne</span>
            </div>
            <div className="flex items-center gap-3 text-sidebar-foreground/80">
              <div className="h-2 w-2 rounded-full bg-accent" />
              <span>Suivi en temps réel de votre dossier</span>
            </div>
            <div className="flex items-center gap-3 text-sidebar-foreground/80">
              <div className="h-2 w-2 rounded-full bg-accent" />
              <span>Résultats et classements instantanés</span>
            </div>
          </div>
        </div>

        <p className="text-sm text-sidebar-foreground/50">
          © 2026 SGCI. Tous droits réservés.
        </p>
      </div>

      {/* Right side - Login Form */}
      <div className="flex w-full lg:w-1/2 items-center justify-center p-8">
        <Card className="w-full max-w-md border-0 shadow-lg">
          <CardHeader className="space-y-1 text-center">
            <div className="flex justify-center lg:hidden mb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary">
                <GraduationCap className="h-7 w-7 text-primary-foreground" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold">Connexion</CardTitle>
            <CardDescription>
              Entrez vos identifiants pour accéder à votre espace
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="email">Adresse email</FieldLabel>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="exemple@email.com"
                      className="pl-10"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                </Field>

                <Field>
                  <div className="flex items-center justify-between">
                    <FieldLabel htmlFor="password">Mot de passe</FieldLabel>
                    <Link
                      href="/recuperation"
                      className="text-sm text-primary hover:underline"
                    >
                      Mot de passe oublié ?
                    </Link>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="pl-10 pr-10"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </Field>
              </FieldGroup>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Connexion en cours..." : "Se connecter"}
              </Button>

              <p className="text-center text-sm text-muted-foreground">
                Vous n'avez pas de compte ?{" "}
                <Link href="/inscription" className="text-primary hover:underline font-medium">
                  Créer un compte
                </Link>
              </p>
            </form>

            <div className="mt-6 p-4 rounded-lg bg-muted/50">
              <p className="text-xs text-muted-foreground text-center">
                <strong>Demo:</strong> Utilisez "admin@example.com" pour l'espace admin ou tout autre email pour l'espace candidat.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

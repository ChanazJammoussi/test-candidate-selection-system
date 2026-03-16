"use client"

import { notFound } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  FileText,
  Clock,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  Calendar,
  Trophy,
  Building2,
  Users,
  BookOpen,
} from "lucide-react"
import Link from "next/link"
import { getConcoursById } from "@/lib/mock-concours"

export default async function CandidatConcoursDashboard({
  params,
}: {
  params: Promise<{ concourId: string }>
}) {
  const { concourId } = await params
  const concours = getConcoursById(concourId)

  if (!concours) {
    notFound()
  }

  const candidatureStatus = "en_examen"
  const documentsProgress = 75

  const statusConfig = {
    pending: {
      label: "En attente",
      color: "bg-warning text-warning-foreground",
      icon: Clock,
      description: "Votre candidature est en attente de traitement",
    },
    en_examen: {
      label: "En cours d'examen",
      color: "bg-primary text-primary-foreground",
      icon: AlertCircle,
      description: "Votre candidature est actuellement examinée par le jury",
    },
    accepte: {
      label: "Acceptée",
      color: "bg-success text-success-foreground",
      icon: CheckCircle,
      description: "Félicitations ! Votre candidature a été acceptée",
    },
    rejete: {
      label: "Non retenue",
      color: "bg-destructive text-destructive-foreground",
      icon: AlertCircle,
      description: "Votre candidature n'a pas été retenue",
    },
  }

  const currentStatus = statusConfig[candidatureStatus as keyof typeof statusConfig]
  const StatusIcon = currentStatus.icon

  const documents = [
    { name: "Carte d'identité", status: "approved" },
    { name: "Relevé de notes", status: "approved" },
    { name: "Diplôme", status: "pending" },
    { name: "Lettre de motivation", status: "correction" },
  ]

  const docStatusConfig = {
    approved: { label: "Validé", class: "bg-success/10 text-success border-success/20" },
    pending: { label: "En attente", class: "bg-warning/10 text-warning border-warning/20" },
    correction: { label: "Correction requise", class: "bg-destructive/10 text-destructive border-destructive/20" },
    rejected: { label: "Rejeté", class: "bg-destructive/10 text-destructive border-destructive/20" },
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-foreground">Tableau de bord</h2>
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <Building2 className="h-4 w-4 flex-shrink-0" />
            <span>{concours.institution}</span>
          </div>
        </div>
        <Link href={`/candidat/${params.concourId}/candidature`}>
          <Button>
            <FileText className="mr-2 h-4 w-4" />
            Voir ma candidature
          </Button>
        </Link>
      </div>

      {/* Concours info banner */}
      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="p-5">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 flex-shrink-0">
              <BookOpen className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1 min-w-0 space-y-3">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-semibold text-foreground">{concours.titre}</h3>
                <Badge variant="outline" className="border-primary/30 text-primary">
                  {concours.domaine}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">{concours.description}</p>
              <div className="flex flex-wrap gap-6 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>Cloture : <span className="font-medium text-foreground">{concours.dateClotureInscription}</span></span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Trophy className="h-4 w-4" />
                  <span>Épreuves : <span className="font-medium text-foreground">{concours.dateEpreuve}</span></span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span><span className="font-medium text-foreground">{concours.placesDisponibles}</span> places</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats row */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Statut candidature</p>
                <div className="mt-1">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${currentStatus.color}`}>
                    <StatusIcon className="h-3.5 w-3.5" />
                    {currentStatus.label}
                  </span>
                </div>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <FileText className="h-5 w-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Documents</p>
                <p className="text-2xl font-bold text-foreground">{documentsProgress}%</p>
                <div className="w-32">
                  <Progress value={documentsProgress} className="h-1.5" />
                </div>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <CheckCircle className="h-5 w-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Candidats inscrits</p>
                <p className="text-2xl font-bold text-foreground">{concours.candidatsInscrits}</p>
                <p className="text-xs text-muted-foreground">pour {concours.placesDisponibles} places</p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Users className="h-5 w-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Statut detaille */}
        <Card>
          <CardHeader>
            <CardTitle>Statut de la candidature</CardTitle>
            <CardDescription>{currentStatus.description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { label: "Candidature soumise", done: true, date: "10 Mars 2026" },
              { label: "Documents vérifiés", done: true, date: "12 Mars 2026" },
              { label: "Examen du dossier", done: candidatureStatus !== "pending", date: "En cours" },
              { label: "Délibération du jury", done: false, date: "À venir" },
              { label: "Publication des résultats", done: false, date: "1 Avril 2026" },
            ].map((step, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className={`flex h-6 w-6 items-center justify-center rounded-full flex-shrink-0 ${
                  step.done ? "bg-success text-success-foreground" : "bg-secondary text-muted-foreground"
                }`}>
                  {step.done ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : (
                    <Clock className="h-3.5 w-3.5" />
                  )}
                </div>
                <div className="flex-1 flex items-center justify-between gap-2">
                  <span className={`text-sm ${step.done ? "text-foreground font-medium" : "text-muted-foreground"}`}>
                    {step.label}
                  </span>
                  <span className="text-xs text-muted-foreground flex-shrink-0">{step.date}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Documents */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Mes documents</CardTitle>
              <CardDescription>Etat de vos pieces jointes</CardDescription>
            </div>
            <Link href={`/candidat/${params.concourId}/candidature`}>
              <Button variant="ghost" size="sm" className="gap-1.5">
                Gérer
                <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="space-y-3">
            {documents.map((doc) => {
              const config = docStatusConfig[doc.status as keyof typeof docStatusConfig]
              return (
                <div key={doc.name} className="flex items-center justify-between gap-2 p-3 rounded-lg border border-border">
                  <div className="flex items-center gap-3 min-w-0">
                    <FileText className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                    <span className="text-sm font-medium truncate">{doc.name}</span>
                  </div>
                  <Badge variant="outline" className={`text-xs flex-shrink-0 ${config.class}`}>
                    {config.label}
                  </Badge>
                </div>
              )
            })}
          </CardContent>
        </Card>
      </div>

      {/* Actions rapides */}
      <Card>
        <CardHeader>
          <CardTitle>Actions rapides</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Link href={`/candidat/${params.concourId}/candidature`}>
              <Button variant="outline" className="gap-2">
                <FileText className="h-4 w-4" />
                Modifier ma candidature
              </Button>
            </Link>
            <Link href={`/candidat/${params.concourId}/suivi`}>
              <Button variant="outline" className="gap-2">
                <Clock className="h-4 w-4" />
                Suivi du dossier
              </Button>
            </Link>
            <Link href={`/candidat/${params.concourId}/resultats`}>
              <Button variant="outline" className="gap-2">
                <Trophy className="h-4 w-4" />
                Résultats
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
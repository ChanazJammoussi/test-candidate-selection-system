"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  CheckCircle,
  Clock,
  Download,
  FileText,
  AlertCircle,
  XCircle,
  Calendar,
  Mail,
} from "lucide-react"

export default function ResultatsPage() {
  // Mock data - In production this would come from an API
  const resultStatus = "liste_attente" // "admis" | "liste_attente" | "rejete" | "pending"
  const resultsPublished = true

  const resultConfig = {
    admis: {
      title: "Félicitations ! Vous êtes admis(e)",
      description: "Votre candidature a été retenue pour le concours d'intégration 2026",
      icon: CheckCircle,
      color: "bg-success/10 border-success/20 text-success",
      iconColor: "text-success",
      badgeColor: "bg-success text-success-foreground",
    },
    liste_attente: {
      title: "Vous êtes sur liste d'attente",
      description: "Votre candidature est en attente. Vous serez notifié(e) si une place se libère.",
      icon: Clock,
      color: "bg-warning/10 border-warning/20 text-warning",
      iconColor: "text-warning",
      badgeColor: "bg-warning text-warning-foreground",
    },
    rejete: {
      title: "Candidature non retenue",
      description: "Malheureusement, votre candidature n'a pas été retenue cette année.",
      icon: XCircle,
      color: "bg-destructive/10 border-destructive/20 text-destructive",
      iconColor: "text-destructive",
      badgeColor: "bg-destructive text-destructive-foreground",
    },
    pending: {
      title: "Résultats en attente",
      description: "Les résultats du concours seront publiés prochainement.",
      icon: AlertCircle,
      color: "bg-muted border-border text-muted-foreground",
      iconColor: "text-muted-foreground",
      badgeColor: "bg-muted text-muted-foreground",
    },
  }

  const currentResult = resultConfig[resultStatus as keyof typeof resultConfig]
  const ResultIcon = currentResult.icon

  const nextSteps = {
    admis: [
      {
        title: "Télécharger la lettre d'admission",
        description: "Conservez ce document pour vos démarches administratives",
        action: "Télécharger",
        icon: Download,
      },
      {
        title: "Confirmer votre inscription",
        description: "Date limite: 15 Avril 2026",
        action: "Confirmer",
        icon: CheckCircle,
      },
      {
        title: "Compléter le dossier d'inscription",
        description: "Documents supplémentaires requis",
        action: "Voir détails",
        icon: FileText,
      },
    ],
    liste_attente: [
      {
        title: "Activer les notifications",
        description: "Recevez une alerte si une place se libère",
        action: "Activer",
        icon: Mail,
      },
      {
        title: "Consulter le classement",
        description: "Suivez l'évolution de votre position",
        action: "Voir",
        icon: FileText,
      },
    ],
    rejete: [
      {
        title: "Télécharger la notification",
        description: "Document officiel de refus",
        action: "Télécharger",
        icon: Download,
      },
      {
        title: "Consulter les autres concours",
        description: "D'autres opportunités sont disponibles",
        action: "Explorer",
        icon: FileText,
      },
    ],
    pending: [],
  }

  const steps = nextSteps[resultStatus as keyof typeof nextSteps]

  if (!resultsPublished) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Résultats</h2>
          <p className="text-muted-foreground">Consultez les résultats de votre candidature</p>
        </div>

        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Clock className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">Résultats non encore publiés</h3>
            <p className="text-muted-foreground text-center max-w-md">
              Les résultats du concours d'intégration 2026 seront publiés le 1er Avril 2026.
              Vous recevrez une notification par email dès leur publication.
            </p>
            <div className="flex items-center gap-2 mt-6 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>Publication prévue: 1 Avril 2026</span>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Résultats</h2>
        <p className="text-muted-foreground">Consultez les résultats de votre candidature</p>
      </div>

      {/* Result Status */}
      <Alert className={currentResult.color}>
        <ResultIcon className={`h-5 w-5 ${currentResult.iconColor}`} />
        <AlertTitle className="text-lg">{currentResult.title}</AlertTitle>
        <AlertDescription>{currentResult.description}</AlertDescription>
      </Alert>

      {/* Result Details */}
      <Card>
        <CardHeader>
          <CardTitle>Détails de votre résultat</CardTitle>
          <CardDescription>Informations sur votre candidature</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-4">
              <div className="flex justify-between py-2 border-b border-border">
                <span className="text-muted-foreground">Statut</span>
                <Badge className={currentResult.badgeColor}>
                  {resultStatus === "admis" && "Admis(e)"}
                  {resultStatus === "liste_attente" && "Liste d'attente"}
                  {resultStatus === "rejete" && "Non retenu(e)"}
                  {resultStatus === "pending" && "En attente"}
                </Badge>
              </div>
              <div className="flex justify-between py-2 border-b border-border">
                <span className="text-muted-foreground">Concours</span>
                <span className="font-medium">Intégration 2026</span>
              </div>
              <div className="flex justify-between py-2 border-b border-border">
                <span className="text-muted-foreground">Score final</span>
                <span className="font-medium">78.5/100</span>
              </div>
              <div className="flex justify-between py-2 border-b border-border">
                <span className="text-muted-foreground">Classement</span>
                <span className="font-medium">12ème / 156</span>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between py-2 border-b border-border">
                <span className="text-muted-foreground">Places disponibles</span>
                <span className="font-medium">10</span>
              </div>
              <div className="flex justify-between py-2 border-b border-border">
                <span className="text-muted-foreground">Date de publication</span>
                <span className="font-medium">15 Mars 2026</span>
              </div>
              <div className="flex justify-between py-2 border-b border-border">
                <span className="text-muted-foreground">Position liste d'attente</span>
                <span className="font-medium">2ème</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Next Steps */}
      {steps.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Prochaines étapes</CardTitle>
            <CardDescription>Actions recommandées suite à votre résultat</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {steps.map((step, index) => {
                const StepIcon = step.icon
                return (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 rounded-lg border border-border"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <StepIcon className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium">{step.title}</p>
                        <p className="text-sm text-muted-foreground">{step.description}</p>
                      </div>
                    </div>
                    <Button variant="outline">{step.action}</Button>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Download Section */}
      <Card>
        <CardHeader>
          <CardTitle>Documents</CardTitle>
          <CardDescription>Téléchargez vos documents officiels</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Notification officielle
            </Button>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Récapitulatif de candidature
            </Button>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Détail du score
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

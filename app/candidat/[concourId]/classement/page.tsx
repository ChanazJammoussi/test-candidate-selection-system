"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Search, Trophy, Medal, Award, TrendingUp } from "lucide-react"
import { useState } from "react"

interface Candidate {
  rank: number
  name: string
  score: number
  status: "admis" | "liste_attente" | "en_cours"
  isCurrentUser?: boolean
}

export default function ClassementPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const candidates: Candidate[] = [
    { rank: 1, name: "Marie Martin", score: 92.5, status: "admis" },
    { rank: 2, name: "Pierre Durand", score: 91.0, status: "admis" },
    { rank: 3, name: "Sophie Bernard", score: 89.5, status: "admis" },
    { rank: 4, name: "Lucas Petit", score: 88.0, status: "admis" },
    { rank: 5, name: "Emma Leroy", score: 87.5, status: "admis" },
    { rank: 6, name: "Thomas Moreau", score: 86.0, status: "admis" },
    { rank: 7, name: "Julie Simon", score: 85.5, status: "admis" },
    { rank: 8, name: "Nicolas Laurent", score: 84.0, status: "admis" },
    { rank: 9, name: "Camille Roux", score: 83.5, status: "admis" },
    { rank: 10, name: "Alexandre Fournier", score: 82.0, status: "liste_attente" },
    { rank: 11, name: "Léa Girard", score: 80.5, status: "liste_attente" },
    { rank: 12, name: "Jean Dupont", score: 78.5, status: "en_cours", isCurrentUser: true },
    { rank: 13, name: "Manon Bonnet", score: 77.0, status: "en_cours" },
    { rank: 14, name: "Hugo Dubois", score: 75.5, status: "en_cours" },
    { rank: 15, name: "Chloé Michel", score: 74.0, status: "en_cours" },
  ]

  const filteredCandidates = candidates.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const currentUser = candidates.find((c) => c.isCurrentUser)
  const totalCandidates = 156
  const placesAvailable = 10

  const getStatusBadge = (status: Candidate["status"]) => {
    switch (status) {
      case "admis":
        return <Badge className="bg-success text-success-foreground">Admis</Badge>
      case "liste_attente":
        return <Badge className="bg-warning text-warning-foreground">Liste d'attente</Badge>
      default:
        return <Badge variant="outline">En cours</Badge>
    }
  }

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-5 w-5 text-yellow-500" />
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />
      case 3:
        return <Award className="h-5 w-5 text-amber-600" />
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Classement</h2>
        <p className="text-muted-foreground">Consultez le classement des candidats au concours</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Votre position
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <span className="text-3xl font-bold">{currentUser?.rank}</span>
              <span className="text-lg text-muted-foreground">/ {totalCandidates}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Votre score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <span className="text-3xl font-bold">{currentUser?.score}</span>
              <span className="text-lg text-muted-foreground">/ 100</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Places disponibles
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <span className="text-3xl font-bold">{placesAvailable}</span>
              <TrendingUp className="h-5 w-5 text-success" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total candidats
            </CardTitle>
          </CardHeader>
          <CardContent>
            <span className="text-3xl font-bold">{totalCandidates}</span>
          </CardContent>
        </Card>
      </div>

      {/* Your Position Highlight */}
      {currentUser && (
        <Card className="border-primary bg-primary/5">
          <CardContent className="flex items-center justify-between p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg">
                {currentUser.rank}
              </div>
              <div>
                <h3 className="font-semibold">{currentUser.name} (Vous)</h3>
                <p className="text-sm text-muted-foreground">
                  Score: {currentUser.score}/100
                </p>
              </div>
            </div>
            {getStatusBadge(currentUser.status)}
          </CardContent>
        </Card>
      )}

      {/* Ranking Table */}
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle>Tableau de classement</CardTitle>
              <CardDescription>Classement par score décroissant</CardDescription>
            </div>
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Rechercher un candidat..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-20">Rang</TableHead>
                <TableHead>Nom du candidat</TableHead>
                <TableHead className="text-right">Score</TableHead>
                <TableHead className="text-right">Statut</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCandidates.map((candidate) => (
                <TableRow
                  key={candidate.rank}
                  className={candidate.isCurrentUser ? "bg-primary/5" : ""}
                >
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      {getRankIcon(candidate.rank)}
                      <span>{candidate.rank}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {candidate.name}
                      {candidate.isCurrentUser && (
                        <Badge variant="outline" className="text-xs">
                          Vous
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    {candidate.score}
                  </TableCell>
                  <TableCell className="text-right">
                    {getStatusBadge(candidate.status)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Info */}
      <Card>
        <CardContent className="p-4">
          <p className="text-sm text-muted-foreground text-center">
            Le classement est mis à jour quotidiennement. Les résultats finaux seront publiés le 1er Avril 2026.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

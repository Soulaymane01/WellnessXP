"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Phone, Clock, AlertCircle, Heart, Search } from "lucide-react"

interface HealthCenter {
  id: number
  name: string
  type: string
  address: string
  phone: string
  hours: string
  services: string[]
  distance: string
  rating: number
}

const HEALTH_CENTERS: HealthCenter[] = [
  {
    id: 1,
    name: "Centre de Santé Reproductive Casablanca",
    type: "Clinique Spécialisée",
    address: "123 Boulevard Mohammed V, Casablanca",
    phone: "+212 5 22 12 34 56",
    hours: "Lun-Ven: 8h-18h, Sam: 9h-13h",
    services: ["Contraception", "Dépistage IST", "Consultation Gynécologique", "Éducation Sexuelle"],
    distance: "2.3 km",
    rating: 4.8,
  },
  {
    id: 2,
    name: "Hôpital Universitaire Ibn Sina",
    type: "Hôpital Public",
    address: "Rue Tarik Ibn Ziad, Rabat",
    phone: "+212 5 37 77 88 99",
    hours: "24h/24, 7j/7",
    services: ["Urgences", "Consultation Générale", "Dépistage IST", "Conseil Contraceptif"],
    distance: "5.1 km",
    rating: 4.5,
  },
  {
    id: 3,
    name: "Clinique Privée Al-Amal",
    type: "Clinique Privée",
    address: "456 Avenue Hassan II, Fès",
    phone: "+212 5 35 62 34 56",
    hours: "Lun-Ven: 9h-19h, Sam: 10h-14h",
    services: ["Consultation Confidentielle", "Contraception", "Dépistage", "Suivi Gynécologique"],
    distance: "3.7 km",
    rating: 4.9,
  },
  {
    id: 4,
    name: "Centre de Santé Communautaire Marrakech",
    type: "Centre Communautaire",
    address: "789 Rue de la Médina, Marrakech",
    phone: "+212 5 24 43 21 10",
    hours: "Lun-Ven: 8h-17h",
    services: ["Éducation Sexuelle", "Conseil Gratuit", "Dépistage Gratuit", "Support Psychologique"],
    distance: "1.9 km",
    rating: 4.6,
  },
  {
    id: 5,
    name: "Pharmacie Conseil Plus",
    type: "Pharmacie",
    address: "321 Boulevard Zerktouni, Agadir",
    phone: "+212 5 28 84 12 34",
    hours: "Lun-Dim: 8h-21h",
    services: ["Conseil Contraceptif", "Vente Préservatifs", "Conseil Hygiène", "Orientation Médicale"],
    distance: "0.8 km",
    rating: 4.7,
  },
  {
    id: 6,
    name: "Association Santé Jeunesse Tangier",
    type: "Association",
    address: "654 Rue de Fès, Tanger",
    phone: "+212 5 39 93 45 67",
    hours: "Lun-Ven: 10h-18h",
    services: ["Éducation Sexuelle", "Support Psychologique", "Groupe de Soutien", "Ressources Gratuites"],
    distance: "4.2 km",
    rating: 4.4,
  },
]

const EMERGENCY_NUMBERS = [
  { label: "Urgences Médicales", number: "15", description: "Appel gratuit 24h/24" },
  { label: "Police", number: "17", description: "En cas de danger" },
  { label: "Ligne d'Écoute Santé Mentale", number: "+212 5 22 47 47 47", description: "Confidentiel et gratuit" },
  { label: "Aide aux Victimes", number: "+212 6 XX XX XX XX", description: "Support et ressources" },
]

export default function HealthMap() {
  const [selectedCenter, setSelectedCenter] = useState<HealthCenter | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [showSOS, setShowSOS] = useState(false)

  const filteredCenters = HEALTH_CENTERS.filter(
    (center) =>
      center.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      center.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      center.services.some((service) => service.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-chart-5/5 md:ml-64">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
              <div className="w-10 h-10 bg-chart-5/20 rounded-lg flex items-center justify-center">
                <MapPin className="w-6 h-6 text-chart-5" />
              </div>
              Ressources & Centres de Santé
            </h1>
            <p className="text-muted-foreground mt-2">Trouvez les ressources et l'aide dont vous avez besoin</p>
          </div>
          <Button
            onClick={() => setShowSOS(!showSOS)}
            className="bg-red-600 hover:bg-red-700 text-white flex items-center gap-2"
          >
            <AlertCircle className="w-5 h-5" />
            SOS
          </Button>
        </div>

        {showSOS && (
          <Card className="border-red-500/50 bg-red-500/5 mb-8">
            <CardHeader>
              <CardTitle className="text-red-600 flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                Ressources d'Urgence
              </CardTitle>
              <CardDescription>Numéros d'urgence et ressources d'aide immédiate</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {EMERGENCY_NUMBERS.map((emergency, idx) => (
                  <div key={idx} className="p-4 bg-background rounded-lg border border-border/50">
                    <p className="font-semibold text-foreground mb-1">{emergency.label}</p>
                    <p className="text-2xl font-bold text-red-600 mb-2">{emergency.number}</p>
                    <p className="text-sm text-muted-foreground">{emergency.description}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                <p className="text-sm text-foreground">
                  <strong>Important:</strong> Si vous êtes en danger immédiat, appelez les urgences (15) ou allez au
                  centre d'urgence le plus proche. Votre sécurité est notre priorité.
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="border-border/50 mb-6">
              <CardHeader>
                <CardTitle>Rechercher un Centre</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Rechercher par nom, type ou service..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              {filteredCenters.map((center) => (
                <Card
                  key={center.id}
                  className={`border-border/50 cursor-pointer transition-all hover:border-primary/50 ${
                    selectedCenter?.id === center.id ? "border-primary bg-primary/5" : ""
                  }`}
                  onClick={() => setSelectedCenter(center)}
                >
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-foreground text-lg">{center.name}</h3>
                        <p className="text-sm text-muted-foreground">{center.type}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                        <span className="text-sm font-medium text-foreground">{center.rating}</span>
                      </div>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-start gap-2 text-sm">
                        <MapPin className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-foreground">{center.address}</p>
                          <p className="text-muted-foreground">{center.distance}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="w-4 h-4 text-muted-foreground" />
                        <p className="text-foreground">{center.phone}</p>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <p className="text-foreground">{center.hours}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {center.services.map((service, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-secondary/20 text-secondary-foreground text-xs rounded-full"
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-8">
              {selectedCenter ? (
                <Card className="border-primary bg-primary/5">
                  <CardHeader>
                    <CardTitle className="text-lg">{selectedCenter.name}</CardTitle>
                    <CardDescription>{selectedCenter.type}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm font-semibold text-muted-foreground mb-1">Adresse</p>
                      <p className="text-sm text-foreground">{selectedCenter.address}</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-muted-foreground mb-1">Téléphone</p>
                      <a
                        href={`tel:${selectedCenter.phone}`}
                        className="text-sm text-primary hover:underline font-medium"
                      >
                        {selectedCenter.phone}
                      </a>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-muted-foreground mb-1">Horaires</p>
                      <p className="text-sm text-foreground">{selectedCenter.hours}</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-muted-foreground mb-2">Services</p>
                      <div className="space-y-1">
                        {selectedCenter.services.map((service, idx) => (
                          <p key={idx} className="text-sm text-foreground flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                            {service}
                          </p>
                        ))}
                      </div>
                    </div>
                    <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                      <Phone className="w-4 h-4 mr-2" />
                      Appeler
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <Card className="border-border/50">
                  <CardContent className="pt-6">
                    <p className="text-sm text-muted-foreground text-center">
                      Sélectionnez un centre pour voir les détails
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Phone, Clock, AlertCircle, Heart, Search, Filter, X, Map, List } from "lucide-react"

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
  lat: number
  lng: number
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
    lat: 33.5731,
    lng: -7.5898,
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
    lat: 34.0209,
    lng: -6.8416,
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
    lat: 34.0181,
    lng: -5.0078,
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
    lat: 31.6295,
    lng: -7.9811,
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
    lat: 30.4278,
    lng: -9.5981,
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
    lat: 35.7595,
    lng: -5.8340,
  },
]

const EMERGENCY_NUMBERS = [
  { label: "Urgences Médicales", number: "15", description: "Appel gratuit 24h/24" },
  { label: "Police", number: "17", description: "En cas de danger" },
  { label: "Ligne d'Écoute Santé Mentale", number: "+212 5 22 47 47 47", description: "Confidentiel et gratuit" },
  { label: "Aide aux Victimes", number: "+212 6 XX XX XX XX", description: "Support et ressources" },
]

const CENTER_TYPES = ["Tous", "Clinique Spécialisée", "Hôpital Public", "Clinique Privée", "Centre Communautaire", "Pharmacie", "Association"]
const ALL_SERVICES = ["Contraception", "Dépistage IST", "Consultation Gynécologique", "Éducation Sexuelle", "Urgences", "Consultation Générale", "Conseil Contraceptif", "Consultation Confidentielle", "Suivi Gynécologique", "Dépistage", "Conseil Gratuit", "Dépistage Gratuit", "Support Psychologique", "Vente Préservatifs", "Conseil Hygiène", "Orientation Médicale", "Groupe de Soutien", "Ressources Gratuites"]

export default function HealthMap() {
  const [selectedCenter, setSelectedCenter] = useState<HealthCenter | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [showSOS, setShowSOS] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list')
  const [selectedType, setSelectedType] = useState("Tous")
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const [minRating, setMinRating] = useState(0)

  const toggleService = (service: string) => {
    setSelectedServices(prev => 
      prev.includes(service) 
        ? prev.filter(s => s !== service)
        : [...prev, service]
    )
  }

  const filteredCenters = HEALTH_CENTERS.filter((center) => {
    const matchesSearch = center.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      center.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      center.services.some((service) => service.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesType = selectedType === "Tous" || center.type === selectedType
    const matchesServices = selectedServices.length === 0 || selectedServices.some(s => center.services.includes(s))
    const matchesRating = center.rating >= minRating

    return matchesSearch && matchesType && matchesServices && matchesRating
  })

  const clearFilters = () => {
    setSelectedType("Tous")
    setSelectedServices([])
    setMinRating(0)
    setSearchTerm("")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-chart-5/5 md:ml-64">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-8">
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-chart-5/20 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg">
                <MapPin className="w-6 h-6 sm:w-7 sm:h-7 text-chart-5" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">
                  Ressources & Centres
                </h1>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1">Trouvez l'aide dont vous avez besoin</p>
              </div>
            </div>
            <Button
              onClick={() => setShowSOS(!showSOS)}
              className="bg-red-600 hover:bg-red-700 text-white flex items-center gap-2 shadow-lg px-4 py-4 sm:px-6 sm:py-6 w-full sm:w-auto"
            >
              <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="font-semibold">SOS Urgence</span>
            </Button>
          </div>
        </div>

        {showSOS && (
          <Card className="border-red-500/50 bg-red-500/5 mb-6 sm:mb-8 shadow-xl">
            <CardHeader className="pb-3 sm:pb-4 px-4 sm:px-6">
              <CardTitle className="text-red-600 flex items-center gap-2 sm:gap-3 text-lg sm:text-2xl">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-red-600 rounded-full flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                Ressources d'Urgence
              </CardTitle>
              <CardDescription className="text-sm sm:text-base">Numéros d'urgence et aide immédiate</CardDescription>
            </CardHeader>
            <CardContent className="px-4 sm:px-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {EMERGENCY_NUMBERS.map((emergency, idx) => (
                  <div key={idx} className="p-4 sm:p-5 bg-background rounded-lg sm:rounded-xl border-2 border-border shadow-md hover:shadow-lg transition-all hover:border-red-300">
                    <p className="font-semibold text-foreground mb-1 sm:mb-2 text-xs sm:text-sm uppercase tracking-wide">{emergency.label}</p>
                    <a href={`tel:${emergency.number.replace(/\s/g, '')}`} className="text-2xl sm:text-3xl font-bold text-red-600 mb-1 sm:mb-2 block hover:underline">{emergency.number}</a>
                    <p className="text-xs sm:text-sm text-muted-foreground">{emergency.description}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 sm:mt-6 p-4 sm:p-5 bg-yellow-500/10 border-2 border-yellow-500/30 rounded-lg sm:rounded-xl shadow-md">
                <p className="text-xs sm:text-sm text-foreground leading-relaxed">
                  <strong className="text-yellow-700">⚠️ Important:</strong> Si vous êtes en danger immédiat, appelez les urgences (15) ou allez au
                  centre d'urgence le plus proche. Votre sécurité est notre priorité.
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Barre de recherche et filtres */}
        <Card className="border-border/50 mb-4 sm:mb-6 shadow-lg bg-card">
          <CardHeader className="px-4 sm:px-6 py-3 sm:py-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <CardTitle className="flex items-center gap-2 text-base sm:text-xl">
                <Search className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                Rechercher
              </CardTitle>
              <div className="flex gap-2 w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowFilters(!showFilters)}
                  className={`flex-1 sm:flex-none text-xs sm:text-sm ${showFilters ? "bg-primary text-primary-foreground" : ""}`}
                >
                  <Filter className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  Filtres
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setViewMode(viewMode === 'list' ? 'map' : 'list')}
                  className="flex-1 sm:flex-none text-xs sm:text-sm"
                >
                  {viewMode === 'list' ? <Map className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" /> : <List className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />}
                  {viewMode === 'list' ? 'Carte' : 'Liste'}
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="px-4 sm:px-6">
            <div className="relative mb-3 sm:mb-4">
              <Search className="absolute left-3 sm:left-4 top-2.5 sm:top-3.5 w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Nom, type ou service..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2 sm:py-3 text-sm sm:text-base rounded-lg sm:rounded-xl border-2 border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              />
            </div>

            {showFilters && (
              <div className="space-y-3 sm:space-y-4 pt-3 sm:pt-4 border-t border-border">
                <div>
                  <label className="text-xs sm:text-sm font-semibold text-foreground mb-2 block">Type de Centre</label>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {CENTER_TYPES.map(type => (
                      <button
                        key={type}
                        onClick={() => setSelectedType(type)}
                        className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs font-medium transition-all ${
                          selectedType === type
                            ? "bg-primary text-primary-foreground"
                            : "bg-secondary/20 text-secondary-foreground hover:bg-secondary/30"
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs sm:text-sm font-semibold text-foreground mb-2 block">Services</label>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 max-h-28 sm:max-h-32 overflow-y-auto">
                    {ALL_SERVICES.map(service => (
                      <button
                        key={service}
                        onClick={() => toggleService(service)}
                        className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs font-medium transition-all ${
                          selectedServices.includes(service)
                            ? "bg-primary text-primary-foreground"
                            : "bg-secondary/20 text-secondary-foreground hover:bg-secondary/30"
                        }`}
                      >
                        {service}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs sm:text-sm font-semibold text-foreground mb-2 block">Note minimale: {minRating} ⭐</label>
                  <input
                    type="range"
                    min="0"
                    max="5"
                    step="0.5"
                    value={minRating}
                    onChange={(e) => setMinRating(parseFloat(e.target.value))}
                    className="w-full h-2"
                  />
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pt-2">
                  <p className="text-xs sm:text-sm text-muted-foreground">{filteredCenters.length} résultat(s)</p>
                  <Button variant="outline" size="sm" onClick={clearFilters} className="w-full sm:w-auto text-xs sm:text-sm">
                    <X className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                    Réinitialiser
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {viewMode === 'list' ? (
            <>
              <div className="lg:col-span-2">
                <div className="space-y-3 sm:space-y-4">
                  {filteredCenters.length > 0 ? (
                    filteredCenters.map((center) => (
                      <Card
                        key={center.id}
                        className={`border-2 cursor-pointer transition-all active:scale-[0.98] sm:hover:shadow-xl sm:hover:scale-[1.02] bg-card ${
                          selectedCenter?.id === center.id ? "border-primary bg-primary/5 shadow-lg" : "border-border/50 sm:hover:border-primary/50"
                        }`}
                        onClick={() => setSelectedCenter(center)}
                      >
                        <CardContent className="pt-4 sm:pt-6 px-4 sm:px-6">
                          <div className="flex items-start justify-between mb-3 sm:mb-4">
                            <div className="flex-1 min-w-0 pr-2">
                              <h3 className="font-bold text-foreground text-base sm:text-xl mb-1 truncate">{center.name}</h3>
                              <span className="inline-block px-2 sm:px-3 py-0.5 sm:py-1 bg-secondary/20 text-secondary-foreground text-xs font-semibold rounded-full">
                                {center.type}
                              </span>
                            </div>
                            <div className="flex items-center gap-1 sm:gap-1.5 bg-red-50 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full flex-shrink-0">
                              <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-red-500 fill-red-500" />
                              <span className="text-xs sm:text-sm font-bold text-red-600">{center.rating}</span>
                            </div>
                          </div>

                          <div className="space-y-2 sm:space-y-3 mb-3 sm:mb-4">
                            <div className="flex items-start gap-2 sm:gap-3 text-xs sm:text-sm bg-secondary/10 p-2 sm:p-3 rounded-lg">
                              <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-primary mt-0.5 flex-shrink-0" />
                              <div className="min-w-0 flex-1">
                                <p className="text-foreground font-medium break-words">{center.address}</p>
                                <p className="text-muted-foreground text-xs mt-1">📍 {center.distance}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm bg-secondary/10 p-2 sm:p-3 rounded-lg">
                              <Phone className="w-3 h-3 sm:w-4 sm:h-4 text-primary flex-shrink-0" />
                              <a href={`tel:${center.phone.replace(/\s/g, '')}`} className="text-foreground font-medium hover:underline">{center.phone}</a>
                            </div>
                            <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm bg-secondary/10 p-2 sm:p-3 rounded-lg">
                              <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-primary flex-shrink-0" />
                              <p className="text-foreground font-medium">{center.hours}</p>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-1.5 sm:gap-2">
                            {center.services.map((service, idx) => (
                              <span
                                key={idx}
                                className="px-2 sm:px-3 py-1 sm:py-1.5 bg-secondary/20 text-secondary-foreground text-xs font-medium rounded-full border border-border"
                              >
                                {service}
                              </span>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <Card className="border-border/50">
                      <CardContent className="pt-4 sm:pt-6 px-4 sm:px-6">
                        <div className="text-center py-8 sm:py-12">
                          <Search className="w-12 h-12 sm:w-16 sm:h-16 text-muted-foreground/30 mx-auto mb-3 sm:mb-4" />
                          <p className="text-base sm:text-lg text-foreground font-semibold mb-2">Aucun résultat</p>
                          <p className="text-xs sm:text-sm text-muted-foreground">Modifiez vos filtres</p>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>

              <div className="lg:col-span-1 hidden lg:block">
                <div className="sticky top-8">
                  {selectedCenter ? (
                    <Card className="border-2 border-primary bg-primary/5 shadow-xl">
                      <CardHeader className="pb-4">
                        <CardTitle className="text-xl text-foreground">{selectedCenter.name}</CardTitle>
                        <span className="inline-block px-3 py-1 bg-secondary/20 text-secondary-foreground text-xs font-semibold rounded-full w-fit">
                          {selectedCenter.type}
                        </span>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="bg-card p-4 rounded-lg shadow-sm border border-border">
                          <p className="text-xs font-bold text-primary mb-2 uppercase tracking-wide">📍 Adresse</p>
                          <p className="text-sm text-foreground">{selectedCenter.address}</p>
                        </div>
                        <div className="bg-card p-4 rounded-lg shadow-sm border border-border">
                          <p className="text-xs font-bold text-primary mb-2 uppercase tracking-wide">📞 Téléphone</p>
                          <a
                            href={`tel:${selectedCenter.phone}`}
                            className="text-sm text-primary hover:text-primary/80 hover:underline font-semibold"
                          >
                            {selectedCenter.phone}
                          </a>
                        </div>
                        <div className="bg-card p-4 rounded-lg shadow-sm border border-border">
                          <p className="text-xs font-bold text-primary mb-2 uppercase tracking-wide">🕒 Horaires</p>
                          <p className="text-sm text-foreground">{selectedCenter.hours}</p>
                        </div>
                        <div className="bg-card p-4 rounded-lg shadow-sm border border-border">
                          <p className="text-xs font-bold text-primary mb-3 uppercase tracking-wide">🏥 Services</p>
                          <div className="space-y-2">
                            {selectedCenter.services.map((service, idx) => (
                              <p key={idx} className="text-sm text-foreground flex items-center gap-2">
                                <span className="w-2 h-2 bg-primary rounded-full" />
                                {service}
                              </p>
                            ))}
                          </div>
                        </div>
                        <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg py-6 text-base font-semibold">
                          <Phone className="w-5 h-5 mr-2" />
                          Appeler Maintenant
                        </Button>
                      </CardContent>
                    </Card>
                  ) : (
                    <Card className="border-2 border-border/50 bg-card shadow-lg">
                      <CardContent className="pt-6">
                        <div className="text-center py-8">
                          <MapPin className="w-12 h-12 text-muted-foreground/50 mx-auto mb-3" />
                          <p className="text-sm text-muted-foreground">
                            Sélectionnez un centre
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>

              {/* Panel mobile pour centre sélectionné */}
              {selectedCenter && (
                <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-card border-t-2 border-primary shadow-2xl z-50 animate-in slide-in-from-bottom">
                  <div className="p-4 max-h-[70vh] overflow-y-auto">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1 min-w-0 pr-2">
                        <h3 className="text-lg font-bold text-foreground truncate">{selectedCenter.name}</h3>
                        <span className="inline-block px-2 py-0.5 bg-secondary/20 text-secondary-foreground text-xs font-semibold rounded-full mt-1">
                          {selectedCenter.type}
                        </span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedCenter(null)}
                        className="flex-shrink-0"
                      >
                        <X className="w-5 h-5" />
                      </Button>
                    </div>
                    <div className="space-y-3">
                      <div className="bg-secondary/10 p-3 rounded-lg">
                        <p className="text-xs font-bold text-primary mb-1">📍 Adresse</p>
                        <p className="text-sm text-foreground">{selectedCenter.address}</p>
                      </div>
                      <div className="bg-secondary/10 p-3 rounded-lg">
                        <p className="text-xs font-bold text-primary mb-1">🕒 Horaires</p>
                        <p className="text-sm text-foreground">{selectedCenter.hours}</p>
                      </div>
                      <div className="bg-secondary/10 p-3 rounded-lg">
                        <p className="text-xs font-bold text-primary mb-2">🏥 Services</p>
                        <div className="flex flex-wrap gap-1.5">
                          {selectedCenter.services.map((service, idx) => (
                            <span key={idx} className="px-2 py-1 bg-secondary/20 text-secondary-foreground text-xs rounded-full">
                              {service}
                            </span>
                          ))}
                        </div>
                      </div>
                      <a href={`tel:${selectedCenter.phone.replace(/\s/g, '')}`} className="block">
                        <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-5">
                          <Phone className="w-5 h-5 mr-2" />
                          Appeler - {selectedCenter.phone}
                        </Button>
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="lg:col-span-3">
              <Card className="border-border/50 shadow-lg bg-card">
                <CardContent className="p-0">
                  <div className="relative w-full h-[400px] sm:h-[600px] bg-secondary/10 rounded-lg overflow-hidden">
                    <iframe
                      src={`https://www.openstreetmap.org/export/embed.html?bbox=-10.5,28.5,-1.0,36.0&layer=mapnik&marker=33.9716,-6.8498`}
                      className="w-full h-full border-0"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                    ></iframe>
                    <div className="absolute top-2 sm:top-4 left-2 sm:left-4 bg-card p-3 sm:p-4 rounded-lg shadow-xl border border-border max-w-[calc(100vw-140px)] sm:max-w-xs">
                      <h3 className="font-bold text-foreground mb-2 text-sm sm:text-base">Centres Disponibles</h3>
                      <div className="space-y-1.5 sm:space-y-2 max-h-64 sm:max-h-96 overflow-y-auto">
                        {filteredCenters.map((center) => (
                          <button
                            key={center.id}
                            onClick={() => setSelectedCenter(center)}
                            className={`w-full text-left p-2 sm:p-3 rounded-lg transition-all text-xs sm:text-sm ${
                              selectedCenter?.id === center.id
                                ? "bg-primary text-primary-foreground"
                                : "bg-secondary/20 hover:bg-secondary/30"
                            }`}
                          >
                            <p className="font-semibold truncate">{center.name}</p>
                            <p className="text-xs opacity-80">{center.distance}</p>
                          </button>
                        ))}
                      </div>
                    </div>
                    {selectedCenter && (
                      <div className="absolute bottom-2 sm:bottom-4 right-2 sm:right-4 bg-card p-3 sm:p-4 rounded-lg shadow-xl border border-border max-w-[calc(100vw-20px)] sm:max-w-sm">
                        <h3 className="font-bold text-foreground mb-1 sm:mb-2 text-sm sm:text-base truncate">{selectedCenter.name}</h3>
                        <p className="text-xs sm:text-sm text-muted-foreground mb-2 sm:mb-3 line-clamp-2">{selectedCenter.address}</p>
                        <Button 
                          size="sm" 
                          className="w-full text-xs sm:text-sm"
                          onClick={() => setViewMode('list')}
                        >
                          Voir les détails
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
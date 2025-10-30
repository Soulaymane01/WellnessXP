"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Phone, Clock, AlertCircle, Search, Filter, X, Map, List, Navigation, Award, CheckCircle, Loader2, Shield, Heart, ExternalLink } from "lucide-react"
import { useUser } from "@/lib/user-context"

interface HealthCenter {
  id: string
  name: string
  nameAr: string
  nameEn: string
  address: string
  addressAr: string
  addressEn: string
  phone: string
  services: string[]
  servicesLabels: Record<string, string>
  location: { lat: number; lng: number }
  hours: string
  hoursAr: string
  hoursEn: string
  isYouthFriendly: boolean
  isFree: boolean
  description: string
  descriptionAr: string
  descriptionEn: string
  createdAt: string
  rating?: number
  distance?: string
}

const EMERGENCY_NUMBERS = [
  { label: "Urgences Médicales", labelAr: "الطوارئ الطبية", labelEn: "Medical Emergency", number: "15", description: "Appel gratuit 24h/24", descriptionAr: "مكالمة مجانية 24/7", descriptionEn: "Free call 24/7", icon: "🚑" },
  { label: "Police", labelAr: "الشرطة", labelEn: "Police", number: "19", description: "En cas de danger", descriptionAr: "في حالة الخطر", descriptionEn: "In case of danger", icon: "👮" },
  { label: "Ligne d'Écoute", labelAr: "خط الاستماع", labelEn: "Helpline", number: "+212 5 22 47 47 47", description: "Confidentiel et gratuit", descriptionAr: "سري ومجاني", descriptionEn: "Confidential and free", icon: "📞" },
  { label: "Aide aux Victimes", labelAr: "مساعدة الضحايا", labelEn: "Victim Support", number: "8350", description: "Support et ressources", descriptionAr: "دعم وموارد", descriptionEn: "Support and resources", icon: "🤝" },
]

const SERVICE_LABELS: Record<string, { fr: string; ar: string; en: string }> = {
  contraception: { fr: "Contraception", ar: "منع الحمل", en: "Contraception" },
  sti_testing: { fr: "Dépistage IST", ar: "فحص الأمراض المنقولة جنسياً", en: "STI Testing" },
  counseling: { fr: "Conseil", ar: "استشارة", en: "Counseling" },
  pregnancy_test: { fr: "Test de grossesse", ar: "اختبار الحمل", en: "Pregnancy Test" },
  education: { fr: "Éducation", ar: "تعليم", en: "Education" },
  gynecology: { fr: "Gynécologie", ar: "أمراض النساء", en: "Gynecology" },
  emergency: { fr: "Urgences", ar: "طوارئ", en: "Emergency" },
}

export default function EnhancedHealthCenters() {
  const { settings } = useUser()
  const [centers, setCenters] = useState<HealthCenter[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCenter, setSelectedCenter] = useState<HealthCenter | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [showSOS, setShowSOS] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list')
  const [filterYouthFriendly, setFilterYouthFriendly] = useState(false)
  const [filterFree, setFilterFree] = useState(false)
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const [isNavOpen, setIsNavOpen] = useState(true)

  const getText = (fr: string, ar: string, en: string) => {
    if (settings.language === 'ar') return ar
    if (settings.language === 'en') return en
    return fr
  }

  const getCenterName = (center: HealthCenter) => getText(center.name, center.nameAr, center.nameEn)
  const getCenterAddress = (center: HealthCenter) => getText(center.address, center.addressAr, center.addressEn)
  const getCenterHours = (center: HealthCenter) => getText(center.hours, center.hoursAr, center.hoursEn)
  const getCenterDescription = (center: HealthCenter) => getText(center.description, center.descriptionAr, center.descriptionEn)

  useEffect(() => {
    const observer = new MutationObserver(() => {
      const navWidth = getComputedStyle(document.documentElement).getPropertyValue('--nav-width').trim()
      setIsNavOpen(navWidth === '16rem')
    })

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['style']
    })

    const initialWidth = getComputedStyle(document.documentElement).getPropertyValue('--nav-width').trim()
    setIsNavOpen(initialWidth === '16rem' || initialWidth === '')

    return () => observer.disconnect()
  }, [])

  // Fetch centers from Firebase
  useEffect(() => {
    const fetchCenters = async () => {
      setLoading(true)
      try {
        // Simulate Firebase fetch - replace with actual getAllHealthCenters()
        await new Promise(resolve => setTimeout(resolve, 800))
        
        const mockCenters: HealthCenter[] = [
          {
            id: "center_tanger_1",
            name: "Centre de Santé de Tanger Ville",
            nameAr: "مركز صحة مدينة طنجة",
            nameEn: "Tangier City Health Center",
            address: "Avenue Mohammed V, Tanger",
            addressAr: "شارع محمد الخامس، طنجة",
            addressEn: "Avenue Mohammed V, Tangier",
            phone: "+212 539 123 456",
            services: ["contraception", "sti_testing", "counseling", "pregnancy_test"],
            servicesLabels: {
              contraception: "Contraception",
              sti_testing: "Dépistage IST",
              counseling: "Conseil",
              pregnancy_test: "Test de grossesse",
            },
            location: { lat: 35.7595, lng: -5.834 },
            hours: "Lundi-Vendredi: 8:00-18:00",
            hoursAr: "الإثنين-الجمعة: 8:00-18:00",
            hoursEn: "Monday-Friday: 8:00-18:00",
            isYouthFriendly: true,
            isFree: true,
            description: "Centre de santé offrant des services complets de santé reproductive",
            descriptionAr: "مركز صحي يقدم خدمات شاملة للصحة الإنجابية",
            descriptionEn: "Health center offering comprehensive reproductive health services",
            createdAt: new Date().toISOString(),
            rating: 4.8,
            distance: "1.2 km"
          },
          {
            id: "center_tanger_2",
            name: "Clinique Jeunesse Tanger",
            nameAr: "عيادة الشباب طنجة",
            nameEn: "Youth Clinic Tangier",
            address: "Rue de Fès, Tanger",
            addressAr: "شارع فاس، طنجة",
            addressEn: "Rue de Fès, Tangier",
            phone: "+212 539 987 654",
            services: ["contraception", "counseling", "education"],
            servicesLabels: {
              contraception: "Contraception",
              counseling: "Conseil",
              education: "Éducation",
            },
            location: { lat: 35.7692, lng: -5.8108 },
            hours: "Lundi-Samedi: 9:00-17:00",
            hoursAr: "الإثنين-السبت: 9:00-17:00",
            hoursEn: "Monday-Saturday: 9:00-17:00",
            isYouthFriendly: true,
            isFree: false,
            description: "Clinique spécialisée pour les jeunes avec personnel formé",
            descriptionAr: "عيادة متخصصة للشباب مع موظفين مدربين",
            descriptionEn: "Specialized clinic for youth with trained staff",
            createdAt: new Date().toISOString(),
            rating: 4.6,
            distance: "2.8 km"
          },
          {
            id: "center_tanger_3",
            name: "Hôpital Mohammed V",
            nameAr: "مستشفى محمد الخامس",
            nameEn: "Mohammed V Hospital",
            address: "Boulevard Pasteur, Tanger",
            addressAr: "شارع باستور، طنجة",
            addressEn: "Boulevard Pasteur, Tangier",
            phone: "+212 539 333 444",
            services: ["contraception", "sti_testing", "counseling", "pregnancy_test", "gynecology", "emergency"],
            servicesLabels: {
              contraception: "Contraception",
              sti_testing: "Dépistage IST",
              counseling: "Conseil",
              pregnancy_test: "Test de grossesse",
              gynecology: "Gynécologie",
              emergency: "Urgences",
            },
            location: { lat: 35.7644, lng: -5.8137 },
            hours: "24h/24, 7j/7",
            hoursAr: "24 ساعة، 7 أيام",
            hoursEn: "24/7",
            isYouthFriendly: true,
            isFree: true,
            description: "Hôpital public avec service d'urgence 24h/24",
            descriptionAr: "مستشفى عام مع خدمة طوارئ 24 ساعة",
            descriptionEn: "Public hospital with 24/7 emergency service",
            createdAt: new Date().toISOString(),
            rating: 4.5,
            distance: "3.5 km"
          }
        ]
        
        setCenters(mockCenters)
      } catch (error) {
        console.error("Error fetching centers:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchCenters()
  }, [])

  const toggleService = (service: string) => {
    setSelectedServices(prev => 
      prev.includes(service) 
        ? prev.filter(s => s !== service)
        : [...prev, service]
    )
  }

  const filteredCenters = centers.filter((center) => {
    const matchesSearch = getCenterName(center).toLowerCase().includes(searchTerm.toLowerCase()) ||
      getCenterAddress(center).toLowerCase().includes(searchTerm.toLowerCase()) ||
      center.services.some(s => {
        const label = SERVICE_LABELS[s]
        return label && (
          label.fr.toLowerCase().includes(searchTerm.toLowerCase()) ||
          label.ar.includes(searchTerm) ||
          label.en.toLowerCase().includes(searchTerm.toLowerCase())
        )
      })
    
    const matchesYouthFriendly = !filterYouthFriendly || center.isYouthFriendly
    const matchesFree = !filterFree || center.isFree
    const matchesServices = selectedServices.length === 0 || selectedServices.some(s => center.services.includes(s))

    return matchesSearch && matchesYouthFriendly && matchesFree && matchesServices
  })

  const clearFilters = () => {
    setFilterYouthFriendly(false)
    setFilterFree(false)
    setSelectedServices([])
    setSearchTerm("")
  }

  const allServices = Array.from(new Set(centers.flatMap(c => c.services)))

  return (
    <div className={`min-h-screen bg-gradient-to-br from-background via-background to-chart-5/5 transition-all duration-300 ${
      isNavOpen ? 'md:ml-64' : 'md:ml-20'
    }`}>
      {/* Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-chart-5 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-chart-5 to-pink-600 bg-clip-text text-transparent">
                  {getText("Centres de Santé", "المراكز الصحية", "Health Centers")}
                </h1>
                <p className="text-xs text-muted-foreground">
                  {getText("Trouvez l'aide dont vous avez besoin", "ابحث عن المساعدة التي تحتاجها", "Find the help you need")}
                </p>
              </div>
            </div>
            <Button
              onClick={() => setShowSOS(!showSOS)}
              className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white flex items-center gap-2 shadow-lg px-3 py-2 md:px-4 md:py-2"
            >
              <AlertCircle className="w-4 h-4 md:w-5 md:h-5 animate-pulse" />
              <span className="hidden md:inline font-semibold">{getText("SOS Urgence", "طوارئ", "SOS Emergency")}</span>
              <span className="md:hidden font-semibold">SOS</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-8">
        {/* Emergency Numbers */}
        {showSOS && (
          <Card className="border-red-500/50 bg-red-500/5 mb-6 sm:mb-8 shadow-xl animate-in slide-in-from-top">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 via-orange-500 to-red-500" />
            <CardHeader className="pb-3 sm:pb-4 px-4 sm:px-6">
              <CardTitle className="text-red-600 flex items-center gap-2 sm:gap-3 text-lg sm:text-2xl">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-red-600 rounded-full flex items-center justify-center animate-pulse">
                  <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                {getText("Ressources d'Urgence", "موارد الطوارئ", "Emergency Resources")}
              </CardTitle>
              <CardDescription className="text-sm sm:text-base">
                {getText("Numéros d'urgence et aide immédiate", "أرقام الطوارئ والمساعدة الفورية", "Emergency numbers and immediate help")}
              </CardDescription>
            </CardHeader>
            <CardContent className="px-4 sm:px-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {EMERGENCY_NUMBERS.map((emergency, idx) => (
                  <div key={idx} className="p-4 sm:p-5 bg-background rounded-lg sm:rounded-xl border-2 border-border shadow-md hover:shadow-lg transition-all hover:border-red-300 group">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl group-hover:scale-110 transition-transform">{emergency.icon}</span>
                      <p className="font-semibold text-foreground text-xs sm:text-sm uppercase tracking-wide">
                        {getText(emergency.label, emergency.labelAr, emergency.labelEn)}
                      </p>
                    </div>
                    <a href={`tel:${emergency.number.replace(/\s/g, '')}`} className="text-2xl sm:text-3xl font-bold text-red-600 mb-1 sm:mb-2 block hover:underline">{emergency.number}</a>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      {getText(emergency.description, emergency.descriptionAr, emergency.descriptionEn)}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-4 sm:mt-6 p-4 sm:p-5 bg-yellow-500/10 border-2 border-yellow-500/30 rounded-lg sm:rounded-xl shadow-md">
                <p className="text-xs sm:text-sm text-foreground leading-relaxed">
                  <strong className="text-yellow-700">⚠️ {getText("Important", "مهم", "Important")}:</strong> {getText(
                    "Si vous êtes en danger immédiat, appelez les urgences (15) ou allez au centre d'urgence le plus proche. Votre sécurité est notre priorité.",
                    "إذا كنت في خطر فوري، اتصل بالطوارئ (15) أو اذهب إلى أقرب مركز طوارئ. سلامتك هي أولويتنا.",
                    "If you are in immediate danger, call emergency services (15) or go to the nearest emergency center. Your safety is our priority."
                  )}
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Search and Filters */}
        <Card className="border-border/50 mb-4 sm:mb-6 shadow-lg bg-card">
          <CardHeader className="px-4 sm:px-6 py-3 sm:py-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <CardTitle className="flex items-center gap-2 text-base sm:text-xl">
                <Search className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                {getText("Rechercher", "بحث", "Search")}
              </CardTitle>
              <div className="flex gap-2 w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowFilters(!showFilters)}
                  className={`flex-1 sm:flex-none text-xs sm:text-sm ${showFilters ? "bg-primary text-primary-foreground" : ""}`}
                >
                  <Filter className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  {getText("Filtres", "فلاتر", "Filters")}
                  {(filterYouthFriendly || filterFree || selectedServices.length > 0) && (
                    <span className="ml-2 w-5 h-5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center">
                      {(filterYouthFriendly ? 1 : 0) + (filterFree ? 1 : 0) + selectedServices.length}
                    </span>
                  )}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setViewMode(viewMode === 'list' ? 'map' : 'list')}
                  className="flex-1 sm:flex-none text-xs sm:text-sm"
                >
                  {viewMode === 'list' ? <Map className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" /> : <List className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />}
                  {viewMode === 'list' ? getText('Carte', 'خريطة', 'Map') : getText('Liste', 'قائمة', 'List')}
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="px-4 sm:px-6">
            <div className="relative mb-3 sm:mb-4">
              <Search className="absolute left-3 sm:left-4 top-2.5 sm:top-3.5 w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder={getText("Nom, adresse ou service...", "الاسم أو العنوان أو الخدمة...", "Name, address or service...")}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2 sm:py-3 text-sm sm:text-base rounded-lg sm:rounded-xl border-2 border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              />
            </div>

            {showFilters && (
              <div className="space-y-3 sm:space-y-4 pt-3 sm:pt-4 border-t border-border animate-in slide-in-from-top">
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setFilterYouthFriendly(!filterYouthFriendly)}
                    className={`px-3 py-2 rounded-full text-xs sm:text-sm font-medium transition-all flex items-center gap-2 ${
                      filterYouthFriendly
                        ? "bg-gradient-to-r from-chart-5 to-pink-500 text-white shadow-lg"
                        : "bg-secondary/20 text-secondary-foreground hover:bg-secondary/30"
                    }`}
                  >
                    <Award className="w-4 h-4" />
                    {getText("Jeunes", "شباب", "Youth Friendly")}
                  </button>
                  <button
                    onClick={() => setFilterFree(!filterFree)}
                    className={`px-3 py-2 rounded-full text-xs sm:text-sm font-medium transition-all flex items-center gap-2 ${
                      filterFree
                        ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg"
                        : "bg-secondary/20 text-secondary-foreground hover:bg-secondary/30"
                    }`}
                  >
                    <CheckCircle className="w-4 h-4" />
                    {getText("Gratuit", "مجاني", "Free")}
                  </button>
                </div>

                <div>
                  <label className="text-xs sm:text-sm font-semibold text-foreground mb-2 block flex items-center gap-2">
                    <Shield className="w-4 h-4 text-primary" />
                    {getText("Services", "الخدمات", "Services")}
                  </label>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {allServices.map(service => {
                      const label = SERVICE_LABELS[service]
                      return (
                        <button
                          key={service}
                          onClick={() => toggleService(service)}
                          className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs font-medium transition-all ${
                            selectedServices.includes(service)
                              ? "bg-primary text-primary-foreground"
                              : "bg-secondary/20 text-secondary-foreground hover:bg-secondary/30"
                          }`}
                        >
                          {label ? getText(label.fr, label.ar, label.en) : service}
                        </button>
                      )
                    })}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pt-2">
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    <span className="font-semibold text-primary">{filteredCenters.length}</span> {getText("résultat(s)", "نتيجة", "result(s)")}
                  </p>
                  <Button variant="outline" size="sm" onClick={clearFilters} className="w-full sm:w-auto text-xs sm:text-sm">
                    <X className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                    {getText("Réinitialiser", "إعادة تعيين", "Reset")}
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
            <p className="text-muted-foreground">{getText("Chargement des centres...", "جاري تحميل المراكز...", "Loading centers...")}</p>
          </div>
        )}

        {/* Centers Display */}
        {!loading && (
          <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
            {/* Left Sidebar - Centers List (Desktop) */}
            <div className="hidden lg:flex flex-col w-80 bg-card/50 backdrop-blur-sm border border-border rounded-xl p-4 overflow-y-auto max-h-[calc(100vh-250px)] sticky top-[180px]">
              <div className="mb-4">
                <h3 className="text-lg font-bold mb-1">
                  {getText("Tous les Centres", "جميع المراكز", "All Centers")}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {filteredCenters.length} {getText("centre(s) disponible(s)", "مركز متاح", "center(s) available")}
                </p>
              </div>
              <div className="space-y-2">
                {filteredCenters.map((center) => (
                  <button
                    key={center.id}
                    onClick={() => setSelectedCenter(center)}
                    className={`w-full p-3 rounded-xl transition-all text-left relative overflow-hidden group ${
                      selectedCenter?.id === center.id
                        ? "bg-gradient-to-r from-chart-5/20 to-pink-500/20 border-2 border-chart-5"
                        : "bg-card hover:bg-secondary/20 border-2 border-transparent"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm truncate">{getCenterName(center)}</p>
                        <p className="text-xs text-muted-foreground truncate mt-0.5">{getCenterAddress(center)}</p>
                        <div className="flex items-center gap-2 mt-2 flex-wrap">
                          {center.isYouthFriendly && (
                            <Badge className="bg-chart-5/10 text-chart-5 border-chart-5/20 text-xs px-2 py-0">
                              <Award className="w-3 h-3 mr-1" />
                              {getText("Jeunes", "شباب", "Youth")}
                            </Badge>
                          )}
                          {center.isFree && (
                            <Badge className="bg-green-500/10 text-green-600 border-green-500/20 text-xs px-2 py-0">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              {getText("Gratuit", "مجاني", "Free")}
                            </Badge>
                          )}
                          {center.distance && (
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                              <Navigation className="w-3 h-3" />
                              {center.distance}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              {viewMode === 'list' ? (
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
                              <h3 className="font-bold text-foreground text-base sm:text-xl mb-2">{getCenterName(center)}</h3>
                              <div className="flex flex-wrap gap-2">
                                {center.isYouthFriendly && (
                                  <Badge className="bg-chart-5/10 text-chart-5 border-chart-5/20">
                                    <Award className="w-3 h-3 mr-1" />
                                    {getText("Jeunes", "شباب", "Youth")}
                                  </Badge>
                                )}
                                {center.isFree && (
                                  <Badge className="bg-green-500/10 text-green-600 border-green-500/20">
                                    <CheckCircle className="w-3 h-3 mr-1" />
                                    {getText("Gratuit", "مجاني", "Free")}
                                  </Badge>
                                )}
                              </div>
                            </div>
                            <div className="flex flex-col items-end gap-2">
                              {center.rating && (
                                <div className="flex items-center gap-1.5 bg-red-50 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full flex-shrink-0">
                                  <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-red-500 fill-red-500" />
                                  <span className="text-xs sm:text-sm font-bold text-red-600">{center.rating}</span>
                                </div>
                              )}
                              {center.distance && (
                                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                  <Navigation className="w-3 h-3" />
                                  {center.distance}
                                </div>
                              )}
                            </div>
                          </div>

                          <p className="text-sm text-muted-foreground mb-3 sm:mb-4 line-clamp-2">{getCenterDescription(center)}</p>

                          <div className="space-y-2 sm:space-y-3 mb-3 sm:mb-4">
                            <div className="flex items-start gap-2 sm:gap-3 text-xs sm:text-sm bg-secondary/10 p-2 sm:p-3 rounded-lg">
                              <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-primary mt-0.5 flex-shrink-0" />
                              <div className="min-w-0 flex-1">
                                <p className="text-foreground font-medium break-words">{getCenterAddress(center)}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm bg-secondary/10 p-2 sm:p-3 rounded-lg">
                              <Phone className="w-3 h-3 sm:w-4 sm:h-4 text-primary flex-shrink-0" />
                              <a href={`tel:${center.phone.replace(/\s/g, '')}`} className="text-foreground font-medium hover:underline">{center.phone}</a>
                            </div>
                            <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm bg-secondary/10 p-2 sm:p-3 rounded-lg">
                              <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-primary flex-shrink-0" />
                              <p className="text-foreground font-medium">{getCenterHours(center)}</p>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-1.5 sm:gap-2">
                            {center.services.map((service) => {
                              const label = SERVICE_LABELS[service]
                              return (
                                <span
                                  key={service}
                                  className="px-2 sm:px-3 py-1 sm:py-1.5 bg-secondary/20 text-secondary-foreground text-xs font-medium rounded-full border border-border"
                                >
                                  {label ? getText(label.fr, label.ar, label.en) : service}
                                </span>
                              )
                            })}
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <Card className="border-border/50">
                      <CardContent className="pt-4 sm:pt-6 px-4 sm:px-6">
                        <div className="text-center py-8 sm:py-12">
                          <Search className="w-12 h-12 sm:w-16 sm:h-16 text-muted-foreground/30 mx-auto mb-3 sm:mb-4" />
                          <p className="text-base sm:text-lg text-foreground font-semibold mb-2">
                            {getText("Aucun résultat", "لا توجد نتائج", "No results")}
                          </p>
                          <p className="text-xs sm:text-sm text-muted-foreground">
                            {getText("Modifiez vos filtres", "قم بتعديل الفلاتر", "Modify your filters")}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              ) : (
                <Card className="border-border/50 shadow-lg bg-card">
                  <CardContent className="p-0">
                    <div className="relative w-full h-[400px] sm:h-[600px] bg-secondary/10 rounded-lg overflow-hidden">
                      <iframe
                        src={`https://www.openstreetmap.org/export/embed.html?bbox=-5.9,35.7,-5.7,35.85&layer=mapnik&marker=35.7595,-5.834`}
                        className="w-full h-full border-0"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                      ></iframe>
                      <div className="absolute top-2 sm:top-4 left-2 sm:left-4 bg-card p-3 sm:p-4 rounded-lg shadow-xl border border-border max-w-[calc(100vw-140px)] sm:max-w-xs">
                        <h3 className="font-bold text-foreground mb-2 text-sm sm:text-base">
                          {getText("Centres Disponibles", "المراكز المتاحة", "Available Centers")}
                        </h3>
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
                              <p className="font-semibold truncate">{getCenterName(center)}</p>
                              <p className="text-xs opacity-80">{center.distance}</p>
                            </button>
                          ))}
                        </div>
                      </div>
                      {selectedCenter && (
                        <div className="absolute bottom-2 sm:bottom-4 right-2 sm:right-4 bg-card p-3 sm:p-4 rounded-lg shadow-xl border border-border max-w-[calc(100vw-20px)] sm:max-w-sm">
                          <h3 className="font-bold text-foreground mb-1 sm:mb-2 text-sm sm:text-base truncate">{getCenterName(selectedCenter)}</h3>
                          <p className="text-xs sm:text-sm text-muted-foreground mb-2 sm:mb-3 line-clamp-2">{getCenterAddress(selectedCenter)}</p>
                          <Button 
                            size="sm" 
                            className="w-full text-xs sm:text-sm"
                            onClick={() => setViewMode('list')}
                          >
                            {getText("Voir les détails", "عرض التفاصيل", "View details")}
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        )}

        {/* Mobile Selected Center Panel */}
        {selectedCenter && viewMode === 'list' && (
          <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-card border-t-2 border-primary shadow-2xl z-50 animate-in slide-in-from-bottom">
            <div className="p-4 max-h-[70vh] overflow-y-auto">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1 min-w-0 pr-2">
                  <h3 className="text-lg font-bold text-foreground truncate">{getCenterName(selectedCenter)}</h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedCenter.isYouthFriendly && (
                      <Badge className="bg-chart-5/10 text-chart-5 border-chart-5/20">
                        <Award className="w-3 h-3 mr-1" />
                        {getText("Jeunes", "شباب", "Youth")}
                      </Badge>
                    )}
                    {selectedCenter.isFree && (
                      <Badge className="bg-green-500/10 text-green-600 border-green-500/20">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        {getText("Gratuit", "مجاني", "Free")}
                      </Badge>
                    )}
                  </div>
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
                  <p className="text-xs font-bold text-primary mb-1 flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {getText("Adresse", "العنوان", "Address")}
                  </p>
                  <p className="text-sm text-foreground">{getCenterAddress(selectedCenter)}</p>
                </div>
                <div className="bg-secondary/10 p-3 rounded-lg">
                  <p className="text-xs font-bold text-primary mb-1 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {getText("Horaires", "ساعات العمل", "Hours")}
                  </p>
                  <p className="text-sm text-foreground">{getCenterHours(selectedCenter)}</p>
                </div>
                <div className="bg-secondary/10 p-3 rounded-lg">
                  <p className="text-xs font-bold text-primary mb-2 flex items-center gap-1">
                    <Shield className="w-3 h-3" />
                    {getText("Services", "الخدمات", "Services")}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedCenter.services.map((service) => {
                      const label = SERVICE_LABELS[service]
                      return (
                        <span key={service} className="px-2 py-1 bg-secondary/20 text-secondary-foreground text-xs rounded-full">
                          {label ? getText(label.fr, label.ar, label.en) : service}
                        </span>
                      )
                    })}
                  </div>
                </div>
                <a href={`tel:${selectedCenter.phone.replace(/\s/g, '')}`} className="block">
                  <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-5">
                    <Phone className="w-5 h-5 mr-2" />
                    {getText("Appeler", "اتصل", "Call")} - {selectedCenter.phone}
                  </Button>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
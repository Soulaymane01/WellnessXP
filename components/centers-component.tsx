"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Phone, Clock, AlertCircle, Search, Filter, X, Map, List, Navigation, Award, CheckCircle, Loader2, Shield, Heart } from "lucide-react"
import { useUser } from "@/lib/user-context"
import { HealthCenter } from "@/lib/types"

interface CentersProps {
    initialCenters: HealthCenter[]
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

export default function Centers({ initialCenters }: CentersProps) {
    const { settings } = useUser()
    const [centers] = useState<HealthCenter[]>(initialCenters)
    const [selectedCenter, setSelectedCenter] = useState<HealthCenter | null>(null)
    const [searchTerm, setSearchTerm] = useState("")
    const [showSOS, setShowSOS] = useState(false)
    const [showFilters, setShowFilters] = useState(false)
    const [viewMode, setViewMode] = useState<'list' | 'map'>('list')
    const [filterYouthFriendly, setFilterYouthFriendly] = useState(false)
    const [filterFree, setFilterFree] = useState(false)
    const [selectedServices, setSelectedServices] = useState<string[]>([])

    const getText = (fr: string, ar: string, en: string) => {
        if (settings.language === 'ar') return ar
        if (settings.language === 'en') return en
        return fr
    }

    const getCenterName = (center: HealthCenter) => getText(center.name, center.nameAr, center.nameEn)
    const getCenterAddress = (center: HealthCenter) => getText(center.address, center.addressAr, center.addressEn)
    const getCenterHours = (center: HealthCenter) => getText(center.hours, center.hoursAr, center.hoursEn)
    const getCenterDescription = (center: HealthCenter) => getText(center.description, center.descriptionAr, center.descriptionEn)

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
        <div className="min-h-screen bg-transparent">
            {/* Header with SOS Button */}
            <div className="sticky top-0 z-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b dark:border-gray-800">
                <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg">
                            <MapPin className="w-5 h-5 text-white" />
                        </div>
                        <h1 className="text-xl md:text-2xl font-bold">{getText("Centres de Santé", "المراكز الصحية", "Health Centers")}</h1>
                    </div>
                    <Button
                        onClick={() => setShowSOS(!showSOS)}
                        className="bg-red-500 hover:bg-red-600 text-white flex items-center gap-2"
                    >
                        <AlertCircle className="w-4 h-4 animate-pulse" />
                        <span className="font-semibold">SOS</span>
                    </Button>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Emergency Numbers */}
                {showSOS && (
                    <Card className="border-red-500 bg-red-500/5 mb-8 shadow-xl animate-in fade-in slide-in-from-top duration-300">
                        <CardHeader>
                            <CardTitle className="text-red-600 flex items-center gap-2">
                                <AlertCircle className="w-6 h-6" />
                                {getText("Ressources d'Urgence", "موارد الطوارئ", "Emergency Resources")}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                {EMERGENCY_NUMBERS.map((emergency, idx) => (
                                    <div key={idx} className="p-4 bg-white dark:bg-gray-800 rounded-xl border border-red-200 dark:border-red-900 shadow-md">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="text-2xl">{emergency.icon}</span>
                                            <p className="font-semibold text-sm">{getText(emergency.label, emergency.labelAr, emergency.labelEn)}</p>
                                        </div>
                                        <a href={`tel:${emergency.number}`} className="text-xl font-bold text-red-600 mb-1 block">{emergency.number}</a>
                                        <p className="text-xs text-gray-500">{getText(emergency.description, emergency.descriptionAr, emergency.descriptionEn)}</p>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Search and Filters */}
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder={getText("Rechercher un centre...", "بحث عن مركز...", "Search a center...")}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 rounded-xl border-2 border-transparent bg-white dark:bg-gray-800 shadow-sm focus:border-emerald-500 transition-all outline-none"
                        />
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="rounded-xl">
                            <Filter className="w-4 h-4 mr-2" />
                            {getText("Filtres", "فلاتر", "Filters")}
                        </Button>
                        <Button variant="outline" onClick={() => setViewMode(viewMode === 'list' ? 'map' : 'list')} className="rounded-xl">
                            {viewMode === 'list' ? <Map className="w-4 h-4 mr-2" /> : <List className="w-4 h-4 mr-2" />}
                            {viewMode === 'list' ? 'Map' : 'List'}
                        </Button>
                    </div>
                </div>

                {showFilters && (
                    <Card className="mb-6 p-4 animate-in fade-in duration-200">
                        <div className="flex flex-wrap gap-4">
                            <div className="flex items-center gap-2">
                                <Button
                                    variant={filterYouthFriendly ? "default" : "outline"}
                                    onClick={() => setFilterYouthFriendly(!filterYouthFriendly)}
                                    size="sm"
                                    className="rounded-full"
                                >
                                    <Award className="w-4 h-4 mr-1" />
                                    {getText("Jeunes", "شباب", "Youth Friendly")}
                                </Button>
                                <Button
                                    variant={filterFree ? "default" : "outline"}
                                    onClick={() => setFilterFree(!filterFree)}
                                    size="sm"
                                    className="rounded-full"
                                >
                                    <CheckCircle className="w-4 h-4 mr-1" />
                                    {getText("Gratuit", "مجاني", "Free")}
                                </Button>
                            </div>
                            <div className="flex flex-wrap gap-2 pt-2 border-t md:border-t-0 md:pt-0">
                                {Object.keys(SERVICE_LABELS).map(service => (
                                    <Button
                                        key={service}
                                        variant={selectedServices.includes(service) ? "default" : "outline"}
                                        onClick={() => toggleService(service)}
                                        size="xs"
                                        className="rounded-full px-3 py-1 text-[10px]"
                                    >
                                        {getText(SERVICE_LABELS[service].fr, SERVICE_LABELS[service].ar, SERVICE_LABELS[service].en)}
                                    </Button>
                                ))}
                            </div>
                        </div>
                        {(filterYouthFriendly || filterFree || selectedServices.length > 0) && (
                            <Button variant="ghost" size="sm" onClick={clearFilters} className="mt-4 text-xs text-red-500">
                                <X className="w-3 h-3 mr-1" /> {getText("Réinitialiser", "إعادة تعيين", "Reset")}
                            </Button>
                        )}
                    </Card>
                )}

                {/* Content */}
                {viewMode === 'list' ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredCenters.map(center => (
                            <Card key={center.id} className="group hover:shadow-xl transition-all duration-300 border-none bg-white dark:bg-gray-800 shadow-lg overflow-hidden flex flex-col">
                                <div className="h-32 bg-gradient-to-br from-emerald-400 to-teal-500 relative">
                                    <div className="absolute inset-0 bg-black/10" />
                                    <div className="absolute bottom-4 left-4">
                                        <h3 className="text-white font-bold text-lg leading-tight">{getCenterName(center)}</h3>
                                    </div>
                                </div>
                                <CardContent className="p-5 flex-1 flex flex-col">
                                    <div className="flex gap-2 mb-4">
                                        {center.isYouthFriendly && <Badge className="bg-emerald-500/10 text-emerald-600 border-none">#Jeunes</Badge>}
                                        {center.isFree && <Badge className="bg-blue-500/10 text-blue-600 border-none">#Gratuit</Badge>}
                                    </div>

                                    <div className="space-y-3 mb-6 flex-1">
                                        <div className="flex items-start gap-3 text-sm">
                                            <MapPin className="w-4 h-4 text-emerald-500 mt-1 flex-shrink-0" />
                                            <p className="text-gray-600 dark:text-gray-400">{getCenterAddress(center)}</p>
                                        </div>
                                        <div className="flex items-center gap-3 text-sm">
                                            <Phone className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                                            <p className="text-gray-600 dark:text-gray-400 font-medium">{center.phone}</p>
                                        </div>
                                        <div className="flex items-center gap-3 text-sm">
                                            <Clock className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                                            <p className="text-gray-600 dark:text-gray-400">{getCenterHours(center)}</p>
                                        </div>
                                    </div>

                                    <Button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl py-6" asChild>
                                        <a href={`tel:${center.phone.replace(/\s/g, '')}`}>
                                            <Phone className="w-4 h-4 mr-2" />
                                            {getText("Appeler", "اتصل", "Call")}
                                        </a>
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <Card className="h-[600px] overflow-hidden rounded-2xl shadow-2xl relative">
                        <iframe
                            src={`https://www.openstreetmap.org/export/embed.html?bbox=-5.9,35.7,-5.7,35.85&layer=mapnik&marker=35.7595,-5.834`}
                            className="w-full h-full border-0"
                            allowFullScreen
                            loading="lazy"
                        ></iframe>
                        <div className="absolute top-4 left-4 bg-white dark:bg-gray-900 p-4 rounded-xl shadow-xl max-w-xs border dark:border-gray-800">
                            <h3 className="font-bold mb-2">{getText("Centres à proximité", "مراكز قريبة", "Nearby Centers")}</h3>
                            <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
                                {filteredCenters.map(center => (
                                    <div key={center.id} className="p-2 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-lg cursor-pointer transition-colors border border-transparent hover:border-emerald-200">
                                        <p className="text-xs font-bold line-clamp-1">{getCenterName(center)}</p>
                                        <p className="text-[10px] text-gray-500 line-clamp-1">{getCenterAddress(center)}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Card>
                )}

                {filteredCenters.length === 0 && (
                    <div className="text-center py-20">
                        <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-gray-500 font-medium">{getText("Aucun centre trouvé", "لم يتم العثور على مراكز", "No centers found")}</h3>
                    </div>
                )}
            </div>
        </div>
    )
}

// app/components/rewards-component.tsx
"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { 
  Gift, Award, Calendar, MapPin, Clock, CheckCircle2, Lock, 
  Sparkles, Users, Trophy, Tag, TrendingUp, Filter, Search,
  Star, Heart, Ticket, GraduationCap, AlertCircle, Copy, Check,
  Menu, X, Zap, Crown, Coffee, BookOpen, Video, Music, Camera,
  ShoppingBag, Utensils, Car, Plane, Hotel, Music2
} from "lucide-react"
import { useUser } from "@/lib/user-context"
import { 
  Reward, UserReward, MentorApplication,
  getAllRewards, getUserRewards, claimReward, 
  useReward, submitMentorApplication, getMentorApplication,
  getRewardStats, getAvailableRewards
} from "@/lib/rewards-service"

type TabType = 'available' | 'my-rewards' | 'mentor'

export default function RewardsPage() {
  const { progress, settings } = useUser()
  const [activeTab, setActiveTab] = useState<TabType>('available')
  const [allRewards, setAllRewards] = useState<Reward[]>([])
  const [myRewards, setMyRewards] = useState<UserReward[]>([])
  const [mentorApp, setMentorApp] = useState<MentorApplication | null>(null)
  const [stats, setStats] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [claimingId, setClaimingId] = useState<string | null>(null)
  const [filterType, setFilterType] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [isNavOpen, setIsNavOpen] = useState(true)
  const [copiedCode, setCopiedCode] = useState<string | null>(null)
  const [showFilters, setShowFilters] = useState(false)
  const [activeCategory, setActiveCategory] = useState<string>('all')
  
  // Mentor application form
  const [mentorForm, setMentorForm] = useState({
    motivation: '',
    experience: '',
    availability: ''
  })

  // Déplacer getText avant son utilisation
  const getText = (fr: string, ar: string, en: string) => {
    if (settings.language === 'ar') return ar
    if (settings.language === 'en') return en
    return fr
  }

  // Maintenant les catégories peuvent utiliser getText
  const categories = [
    { id: 'all', label: getText('Toutes', 'الكل', 'All'), icon: Gift, count: allRewards.length },
    { id: 'premium', label: getText('Premium', 'المميزة', 'Premium'), icon: Crown, count: allRewards.filter(r => r.category === 'premium').length },
    { id: 'education', label: getText('Éducation', 'التعليم', 'Education'), icon: BookOpen, count: allRewards.filter(r => r.category === 'education').length },
    { id: 'entertainment', label: getText('Divertissement', 'الترفيه', 'Entertainment'), icon: Music2, count: allRewards.filter(r => r.category === 'entertainment').length },
    { id: 'food', label: getText('Nourriture', 'الطعام', 'Food'), icon: Utensils, count: allRewards.filter(r => r.category === 'food').length },
    { id: 'shopping', label: getText('Shopping', 'التسوق', 'Shopping'), icon: ShoppingBag, count: allRewards.filter(r => r.category === 'shopping').length },
    { id: 'travel', label: getText('Voyage', 'السفر', 'Travel'), icon: Plane, count: allRewards.filter(r => r.category === 'travel').length }
  ]

  // Rewards spéciales - Featured
  const featuredRewards = allRewards.filter(reward => reward.featured)

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

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    setLoading(true)
    try {
      const [rewards, userRewards, application, statistics] = await Promise.all([
        getAvailableRewards(progress.level, progress.badges),
        getUserRewards(),
        getMentorApplication(),
        getRewardStats()
      ])
      
      setAllRewards(rewards)
      setMyRewards(userRewards)
      setMentorApp(application)
      setStats(statistics)
    } catch (error) {
      console.error('Error loading rewards:', error)
    } finally {
      setLoading(false)
    }
  }

  const getRewardTitle = (reward: Reward) => getText(reward.title, reward.titleAr, reward.titleEn)
  const getRewardDesc = (reward: Reward) => getText(reward.description, reward.descriptionAr, reward.descriptionEn)

  const handleClaimReward = async (rewardId: string) => {
    setClaimingId(rewardId)
    try {
      const result = await claimReward(rewardId)
      if (result.success) {
        alert(`${getText('Succès!', 'نجح!', 'Success!')} ${result.message}\n${getText('Code', 'الرمز', 'Code')}: ${result.code}`)
        await loadData()
      } else {
        alert(result.message)
      }
    } catch (error) {
      alert(getText('Erreur lors de la réclamation', 'خطأ في المطالبة', 'Error claiming reward'))
    } finally {
      setClaimingId(null)
    }
  }

  const handleUseReward = async (userRewardId: string) => {
    try {
      const result = await useReward(userRewardId)
      if (result.success) {
        await loadData()
      }
    } catch (error) {
      alert(getText('Erreur', 'خطأ', 'Error'))
    }
  }

  const handleSubmitMentorApp = async () => {
    if (!mentorForm.motivation || !mentorForm.experience || !mentorForm.availability) {
      alert(getText('Veuillez remplir tous les champs', 'يرجى ملء جميع الحقول', 'Please fill all fields'))
      return
    }

    try {
      const result = await submitMentorApplication(mentorForm)
      if (result.success) {
        alert(result.message)
        await loadData()
        setMentorForm({ motivation: '', experience: '', availability: '' })
      } else {
        alert(result.message)
      }
    } catch (error) {
      alert(getText('Erreur lors de la soumission', 'خطأ في الإرسال', 'Error submitting'))
    }
  }

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(code)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  const filteredRewards = allRewards.filter(reward => {
    const matchesType = filterType === 'all' || reward.type === filterType
    const matchesCategory = activeCategory === 'all' || reward.category === activeCategory
    const matchesSearch = searchQuery === '' || 
      getRewardTitle(reward).toLowerCase().includes(searchQuery.toLowerCase()) ||
      getRewardDesc(reward).toLowerCase().includes(searchQuery.toLowerCase())
    return matchesType && matchesCategory && matchesSearch
  })

  const canApplyForMentor = progress.level >= 15 && progress.badges.length >= 5

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'coupon': return <Tag className="w-4 h-4" />
      case 'activity': return <Calendar className="w-4 h-4" />
      case 'mentor': return <GraduationCap className="w-4 h-4" />
      default: return <Gift className="w-4 h-4" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'coupon': return 'from-emerald-500 to-teal-500'
      case 'activity': return 'from-cyan-500 to-blue-500'
      case 'mentor': return 'from-purple-500 to-indigo-500'
      default: return 'from-green-500 to-emerald-600'
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'premium': return 'from-yellow-500 to-orange-500'
      case 'education': return 'from-blue-500 to-indigo-500'
      case 'entertainment': return 'from-purple-500 to-pink-500'
      case 'food': return 'from-red-500 to-orange-500'
      case 'shopping': return 'from-green-500 to-emerald-500'
      case 'travel': return 'from-cyan-500 to-blue-500'
      default: return 'from-gray-500 to-gray-600'
    }
  }

  if (loading) {
    return (
      <div className={`min-h-screen bg-gradient-to-br from-background via-background to-emerald-500/5 transition-all duration-300 flex items-center justify-center`}>
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">{getText('Chargement...', 'جاري التحميل...', 'Loading...')}</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br from-background via-background to-emerald-500/5 transition-all duration-300`}>
      {/* Header Mobile Optimized */}
      <div className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-20">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
                <Gift className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  {getText("Récompenses", "المكافآت", "Rewards")}
                </h1>
                <p className="text-xs text-muted-foreground">
                  {getText("Échangez vos XP", "استبدل نقاط الخبرة", "Exchange your XP")}
                </p>
              </div>
            </div>
            
            {/* Mobile Stats */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 px-2 py-1 bg-emerald-500/10 rounded-full border border-emerald-500/20">
                <Trophy className="w-3 h-3 text-emerald-600" />
                <span className="text-xs font-medium">{progress.level}</span>
              </div>
              <div className="flex items-center gap-1 px-2 py-1 bg-teal-500/10 rounded-full border border-teal-500/20">
                <Star className="w-3 h-3 text-teal-600" />
                <span className="text-xs font-medium">{progress.totalXP}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 py-4">
        {/* Stats Cards - Mobile Grid */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <Card className="border-border/50 bg-gradient-to-br from-emerald-500/5 to-transparent">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">
                    {getText('Disponibles', 'متاح', 'Available')}
                  </p>
                  <p className="text-xl font-bold text-emerald-600">{allRewards.length}</p>
                </div>
                <Gift className="w-6 h-6 text-emerald-500/20" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-gradient-to-br from-teal-500/5 to-transparent">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">
                    {getText('Réclamées', 'مطالب بها', 'Claimed')}
                  </p>
                  <p className="text-xl font-bold text-teal-600">{stats?.totalClaimed || 0}</p>
                </div>
                <CheckCircle2 className="w-6 h-6 text-teal-500/20" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-gradient-to-br from-cyan-500/5 to-transparent">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">
                    {getText('Actives', 'نشط', 'Active')}
                  </p>
                  <p className="text-xl font-bold text-cyan-600">{stats?.totalActive || 0}</p>
                </div>
                <Sparkles className="w-6 h-6 text-cyan-500/20" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-gradient-to-br from-green-500/5 to-transparent">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">
                    {getText('Utilisées', 'مستخدم', 'Used')}
                  </p>
                  <p className="text-xl font-bold text-green-600">{stats?.totalUsed || 0}</p>
                </div>
                <TrendingUp className="w-6 h-6 text-green-500/20" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs - Mobile Scrollable */}
        <div className="flex gap-1 mb-6 border-b border-border overflow-x-auto scrollbar-hide">
          {[
            { id: 'available', label: getText('Disponibles', 'متاح', 'Available'), icon: Gift, shortLabel: getText('Dispo', 'متاح', 'Avail') },
            { id: 'my-rewards', label: getText('Mes Récompenses', 'مكافآتي', 'My Rewards'), icon: Heart, shortLabel: getText('Mes', 'خاصتي', 'My') },
            { id: 'mentor', label: getText('Mentor', 'مرشد', 'Mentor'), icon: GraduationCap, shortLabel: getText('Mentor', 'مرشد', 'Mentor') }
          ].map(tab => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`flex items-center gap-2 px-4 py-3 font-medium transition-all flex-shrink-0 min-w-max ${
                  activeTab === tab.id
                    ? 'text-emerald-600 border-b-2 border-emerald-600'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="sm:hidden text-xs">{tab.shortLabel}</span>
              </button>
            )
          })}
        </div>

        {/* Available Rewards Tab */}
        {activeTab === 'available' && (
          <div>
            {/* Featured Rewards Section */}
            {featuredRewards.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold flex items-center gap-2">
                    <Zap className="w-5 h-5 text-yellow-500" />
                    {getText('Récompenses en Vedette', 'المكافآت المميزة', 'Featured Rewards')}
                  </h2>
                  <Badge variant="secondary" className="bg-yellow-500/10 text-yellow-700">
                    {getText('Populaire', 'شائع', 'Popular')}
                  </Badge>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  {featuredRewards.slice(0, 2).map(reward => (
                    <FeaturedRewardCard 
                      key={reward.id}
                      reward={reward}
                      onClaim={handleClaimReward}
                      claimingId={claimingId}
                      getText={getText}
                      getRewardTitle={getRewardTitle}
                      getRewardDesc={getRewardDesc}
                      progress={progress}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Quick Categories */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold mb-3 text-muted-foreground">
                {getText('Catégories', 'الفئات', 'Categories')}
              </h3>
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-full transition-all flex-shrink-0 ${
                      activeCategory === category.id
                        ? 'bg-emerald-500 text-white shadow-lg'
                        : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                    }`}
                  >
                    <category.icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{category.label}</span>
                    <Badge variant="secondary" className={`ml-1 ${
                      activeCategory === category.id ? 'bg-white/20 text-white' : 'bg-muted'
                    }`}>
                      {category.count}
                    </Badge>
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Filters */}
            <div className="mb-4 space-y-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder={getText("Rechercher...", "ابحث...", "Search...")}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-card border-border text-sm"
                />
              </div>
              
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2"
                >
                  <Filter className="w-4 h-4" />
                  <span>{getText('Filtrer', 'تصفية', 'Filter')}</span>
                </Button>
                
                {showFilters && (
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="flex-1 px-3 py-2 border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                  >
                    <option value="all">{getText('Tous types', 'كل الأنواع', 'All types')}</option>
                    <option value="coupon">{getText('Coupons', 'كوبونات', 'Coupons')}</option>
                    <option value="activity">{getText('Activités', 'أنشطة', 'Activities')}</option>
                    <option value="mentor">{getText('Mentor', 'مرشد', 'Mentor')}</option>
                  </select>
                )}
              </div>
            </div>

            {/* Rewards Count */}
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-muted-foreground">
                {filteredRewards.length} {getText('récompenses trouvées', 'مكافأة وجدت', 'rewards found')}
              </p>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">
                  {getText('Niveau', 'مس', 'Lvl')} {progress.level}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {progress.badges.length} {getText('badges', 'شارات', 'badges')}
                </Badge>
              </div>
            </div>

            {/* Rewards Grid */}
            <div className="grid grid-cols-1 gap-4">
              {filteredRewards.map(reward => {
                const canClaim = progress.level >= reward.requiredLevel
                const hasRequiredBadges = !reward.requiredBadges || 
                  reward.requiredBadges.every(badge => progress.badges.includes(badge))
                const isAvailable = canClaim && hasRequiredBadges

                return (
                  <RewardCard 
                    key={reward.id}
                    reward={reward}
                    isAvailable={isAvailable}
                    claimingId={claimingId}
                    onClaim={handleClaimReward}
                    getText={getText}
                    getRewardTitle={getRewardTitle}
                    getRewardDesc={getRewardDesc}
                    getTypeColor={getTypeColor}
                    getTypeIcon={getTypeIcon}
                    progress={progress}
                  />
                )
              })}
            </div>

            {filteredRewards.length === 0 && (
              <div className="text-center py-8">
                <Gift className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground text-sm mb-2">
                  {getText(
                    'Aucune récompense disponible',
                    'لا توجد مكافآت متاحة',
                    'No rewards available'
                  )}
                </p>
                <p className="text-xs text-muted-foreground">
                  {getText(
                    'Essayez de changer les filtres ou continuez à progresser',
                    'حاول تغيير الفلاتر أو استمر في التقدم',
                    'Try changing filters or continue progressing'
                  )}
                </p>
              </div>
            )}

            {/* Progress Section */}
            <Card className="mt-8 border-border/50 bg-gradient-to-br from-blue-500/5 to-purple-500/5">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm mb-1">
                      {getText('Prochain niveau', 'المستوى التالي', 'Next level')}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {getText(
                        `Plus que ${1000 - (progress.totalXP % 1000)} XP pour débloquer de nouvelles récompenses`,
                        `تبقى ${1000 - (progress.totalXP % 1000)} نقطة خبرة لفتح مكافآت جديدة`,
                        `Only ${1000 - (progress.totalXP % 1000)} XP left to unlock new rewards`
                      )}
                    </p>
                  </div>
                </div>
                <div className="mt-3 bg-secondary rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${(progress.totalXP % 1000) / 10}%` }}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Rest of the code remains the same for other tabs */}
        {/* My Rewards Tab */}
        {activeTab === 'my-rewards' && (
          <div>
            {myRewards.length > 0 ? (
              <div className="grid grid-cols-1 gap-4">
                {myRewards.map(userReward => (
                  <Card key={userReward.id} className="border-border/50 overflow-hidden">
                    <div className={`h-20 bg-gradient-to-br ${getTypeColor(userReward.reward.type)} relative`}>
                      <div className="absolute inset-0 bg-black/20" />
                      <div className="absolute inset-0 flex items-center justify-center text-4xl">
                        {userReward.reward.icon}
                      </div>
                      <Badge className={`absolute top-2 right-2 text-xs ${
                        userReward.status === 'claimed' ? 'bg-emerald-500' :
                        userReward.status === 'used' ? 'bg-cyan-500' : 'bg-gray-500'
                      } text-white`}>
                        {userReward.status === 'claimed' ? getText('Actif', 'نشط', 'Active') :
                         userReward.status === 'used' ? getText('Utilisé', 'مستخدم', 'Used') :
                         getText('Expiré', 'منتهي', 'Expired')}
                      </Badge>
                    </div>
                    
                    <CardContent className="p-4">
                      <h3 className="font-bold text-base mb-1">{getRewardTitle(userReward.reward)}</h3>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{getRewardDesc(userReward.reward)}</p>
                      
                      {userReward.code && (
                        <div className="bg-secondary/20 p-3 rounded-lg mb-3">
                          <p className="text-xs text-muted-foreground mb-1">
                            {getText('Code', 'الرمز', 'Code')}
                          </p>
                          <div className="flex items-center justify-between">
                            <code className="font-mono font-bold text-sm">{userReward.code}</code>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => copyToClipboard(userReward.code!)}
                              className="h-6 px-2"
                            >
                              {copiedCode === userReward.code ? (
                                <Check className="w-3 h-3 text-emerald-600" />
                              ) : (
                                <Copy className="w-3 h-3" />
                              )}
                            </Button>
                          </div>
                        </div>
                      )}
                      
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                        <Clock className="w-3 h-3" />
                        <span>
                          {new Date(userReward.claimedAt).toLocaleDateString()}
                        </span>
                      </div>
                      
                      {userReward.expiresAt && (
                        <div className="flex items-center gap-2 text-xs text-emerald-600 mb-3">
                          <AlertCircle className="w-3 h-3" />
                          <span>
                            {getText('Expire', 'تنتهي', 'Expires')} {new Date(userReward.expiresAt).toLocaleDateString()}
                          </span>
                        </div>
                      )}
                      
                      {userReward.status === 'claimed' && (
                        <Button
                          onClick={() => handleUseReward(userReward.id)}
                          variant="outline"
                          size="sm"
                          className="w-full text-sm"
                        >
                          <CheckCircle2 className="w-3 h-3 mr-1" />
                          {getText('Marquer utilisé', 'تعليم كمستخدم', 'Mark used')}
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Heart className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground text-sm mb-4">
                  {getText(
                    "Aucune récompense réclamée",
                    'لم تطالب بأي مكافآت',
                    "No rewards claimed"
                  )}
                </p>
                <Button 
                  onClick={() => setActiveTab('available')} 
                  size="sm"
                  className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white"
                >
                  {getText('Découvrir', 'اكتشف', 'Discover')}
                </Button>
              </div>
            )}
          </div>
        )}

        {/* Mentor Program Tab */}
        {activeTab === 'mentor' && (
          <div>
            <Card className="border-border/50 overflow-hidden mb-6">
              <div className="h-28 bg-gradient-to-br from-purple-500 to-indigo-500 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <GraduationCap className="w-16 h-16 text-white/90" />
                </div>
              </div>
              
              <CardContent className="p-4">
                <h2 className="text-xl font-bold mb-3">
                  {getText('Programme Mentor', 'برنامج المرشد', 'Mentor Program')}
                </h2>
                <p className="text-sm text-muted-foreground mb-4">
                  {getText(
                    "Devenez mentor et aidez d'autres jeunes.",
                    'كن مرشدًا وساعد الشباب الآخرين.',
                    'Become a mentor and help other youth.'
                  )}
                </p>
                
                <div className="bg-secondary/10 p-4 rounded-lg mb-4">
                  <h3 className="font-semibold mb-2 flex items-center gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    {getText('Conditions', 'الشروط', 'Requirements')}
                  </h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                        progress.level >= 15 ? 'bg-emerald-500' : 'bg-gray-300'
                      }`}>
                        {progress.level >= 15 ? (
                          <CheckCircle2 className="w-3 h-3 text-white" />
                        ) : (
                          <Lock className="w-3 h-3 text-white" />
                        )}
                      </div>
                      <span>
                        {getText('Niveau 15', 'المستوى 15', 'Level 15')}
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                        progress.badges.length >= 5 ? 'bg-emerald-500' : 'bg-gray-300'
                      }`}>
                        {progress.badges.length >= 5 ? (
                          <CheckCircle2 className="w-3 h-3 text-white" />
                        ) : (
                          <Lock className="w-3 h-3 text-white" />
                        )}
                      </div>
                      <span>
                        {getText('5 badges', '5 شارات', '5 badges')}
                      </span>
                    </li>
                  </ul>
                </div>

                {mentorApp ? (
                  <div className="bg-emerald-100 border border-emerald-300 text-emerald-800 p-3 rounded-lg text-sm">
                    <h3 className="font-semibold mb-1 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      {getText('Candidature envoyée', 'تم إرسال الطلب', 'Application sent')}
                    </h3>
                    <p className="text-xs">
                      {getText(
                        "Nous vous contacterons bientôt.",
                        "سنتصل بك قريبًا.",
                        "We'll contact you soon."
                      )}
                    </p>
                  </div>
                ) : canApplyForMentor ? (
                  <div>
                    <h3 className="font-semibold mb-3 text-sm">
                      {getText('Formulaire', 'النموذج', 'Application')}
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs font-medium mb-1">
                          {getText('Motivation', 'الدافع', 'Motivation')}
                        </label>
                        <Textarea
                          value={mentorForm.motivation}
                          onChange={(e) => setMentorForm({ ...mentorForm, motivation: e.target.value })}
                          placeholder={getText(
                            'Pourquoi devenir mentor ?',
                            'لماذا تصبح مرشدًا؟',
                            'Why become a mentor?'
                          )}
                          className="text-sm min-h-[80px]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium mb-1">
                          {getText('Expérience', 'الخبرة', 'Experience')}
                        </label>
                        <Textarea
                          value={mentorForm.experience}
                          onChange={(e) => setMentorForm({ ...mentorForm, experience: e.target.value })}
                          placeholder={getText(
                            'Votre expérience...',
                            'خبرتك...',
                            'Your experience...'
                          )}
                          className="text-sm min-h-[80px]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium mb-1">
                          {getText('Disponibilité', 'التوفر', 'Availability')}
                        </label>
                        <Input
                          type="text"
                          value={mentorForm.availability}
                          onChange={(e) => setMentorForm({ ...mentorForm, availability: e.target.value })}
                          placeholder={getText(
                            'Vos disponibilités',
                            'مواعيدك',
                            'Your availability'
                          )}
                          className="text-sm"
                        />
                      </div>

                      <Button
                        onClick={handleSubmitMentorApp}
                        className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white w-full text-sm"
                        size="sm"
                      >
                        <SendIcon className="w-4 h-4 mr-1" />
                        {getText('Soumettre', 'إرسال', 'Submit')}
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="bg-yellow-50 border border-yellow-300 text-yellow-800 p-3 rounded-lg text-sm">
                    <h3 className="font-semibold mb-1 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-yellow-600" />
                      {getText('Conditions non remplies', 'شروط غير مكتملة', 'Requirements not met')}
                    </h3>
                    <p className="text-xs">
                      {getText(
                        "Niveau 15 et 5 badges requis",
                        "المستوى 15 و 5 شارات مطلوبة",
                        "Level 15 and 5 badges required"
                      )}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}

// Composants auxiliaires restent identiques...
function FeaturedRewardCard({ reward, onClaim, claimingId, getText, getRewardTitle, getRewardDesc, progress }: any) {
  const canClaim = progress.level >= reward.requiredLevel
  const hasRequiredBadges = !reward.requiredBadges || 
    reward.requiredBadges.every((badge: string) => progress.badges.includes(badge))
  const isAvailable = canClaim && hasRequiredBadges

  return (
    <Card className="border-2 border-yellow-300/50 bg-gradient-to-br from-yellow-500/5 to-orange-500/5 overflow-hidden">
      <div className="h-28 bg-gradient-to-br from-yellow-400 to-orange-500 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <div className="absolute inset-0 flex items-center justify-center text-6xl">
          {reward.icon}
        </div>
        <div className="absolute top-3 left-3">
          <Badge className="bg-white/90 text-yellow-900 font-bold">
            {getText('Vedette', 'مميز', 'Featured')}
          </Badge>
        </div>
        {!isAvailable && (
          <div className="absolute top-3 right-3">
            <Lock className="w-6 h-6 text-white" />
          </div>
        )}
      </div>
      
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-bold text-lg text-yellow-900">{getRewardTitle(reward)}</h3>
          <Crown className="w-5 h-5 text-yellow-600" />
        </div>
        
        <p className="text-sm text-yellow-800/80 mb-4">{getRewardDesc(reward)}</p>
        
        <div className="flex items-center justify-between pt-3 border-t border-yellow-300/50">
          <div className="flex items-center gap-1 text-sm text-yellow-800">
            <Trophy className="w-4 h-4" />
            <span className="font-semibold">
              {getText('Niv.', 'مس.', 'Lvl.')} {reward.requiredLevel}
            </span>
          </div>
          
          <Button
            onClick={() => onClaim(reward.id)}
            disabled={!isAvailable || claimingId === reward.id}
            className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white hover:from-yellow-600 hover:to-orange-600"
            size="sm"
          >
            {claimingId === reward.id ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                {getText('...', '...', '...')}
              </div>
            ) : !isAvailable ? (
              <>
                <Lock className="w-4 h-4 mr-1" />
                {getText('Verrouillé', 'مقفل', 'Locked')}
              </>
            ) : (
              <>
                <Zap className="w-4 h-4 mr-1" />
                {getText('Réclamer', 'مطالبة', 'Claim')}
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

function RewardCard({ reward, isAvailable, claimingId, onClaim, getText, getRewardTitle, getRewardDesc, getTypeColor, getTypeIcon, progress }: any) {
  return (
    <Card className={`border-border/50 overflow-hidden hover:shadow-lg transition-all ${!isAvailable ? 'opacity-60' : ''}`}>
      <div className={`h-24 bg-gradient-to-br ${getTypeColor(reward.type)} relative overflow-hidden`}>
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 flex items-center justify-center text-5xl">
          {reward.icon}
        </div>
        <div className="absolute top-2 left-2">
          <Badge className="bg-white/90 text-gray-900 text-xs">
            {reward.category}
          </Badge>
        </div>
        {!isAvailable && (
          <div className="absolute top-2 right-2">
            <Lock className="w-5 h-5 text-white" />
          </div>
        )}
      </div>
      
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-bold text-base leading-tight">{getRewardTitle(reward)}</h3>
          <div className="flex items-center gap-1 text-emerald-600 font-bold">
            {getTypeIcon(reward.type)}
          </div>
        </div>
        
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{getRewardDesc(reward)}</p>
        
        {/* Reward Details - Compact */}
        <div className="space-y-1 mb-3">
          {reward.partner && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Users className="w-3 h-3" />
              <span className="truncate">{reward.partner}</span>
            </div>
          )}
          
          {reward.location && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <MapPin className="w-3 h-3" />
              <span className="truncate">{reward.location}</span>
            </div>
          )}
          
          {reward.date && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Calendar className="w-3 h-3" />
              <span>{reward.date}</span>
            </div>
          )}
        </div>
        
        <div className="flex items-center justify-between pt-3 border-t border-border">
          <div className="flex items-center gap-1 text-xs">
            <Trophy className="w-3 h-3 text-emerald-600" />
            <span className="font-semibold">
              {getText('Niv.', 'مس.', 'Lvl.')} {reward.requiredLevel}
            </span>
          </div>
          {reward.totalAvailable && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Ticket className="w-3 h-3" />
              <span>{reward.totalAvailable - reward.claimed} {getText('rest.', 'متب.', 'left')}</span>
            </div>
          )}
        </div>
        
        <Button
          onClick={() => onClaim(reward.id)}
          disabled={!isAvailable || claimingId === reward.id}
          className={`w-full mt-3 text-sm ${
            isAvailable 
              ? `bg-gradient-to-r ${getTypeColor(reward.type)} text-white hover:opacity-90`
              : 'bg-secondary text-secondary-foreground'
          }`}
          size="sm"
        >
          {claimingId === reward.id ? (
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
              {getText('...', '...', '...')}
            </div>
          ) : !isAvailable ? (
            <>
              <Lock className="w-3 h-3 mr-1" />
              {getText('Verrouillé', 'مقفل', 'Locked')}
            </>
          ) : (
            <>
              <Gift className="w-3 h-3 mr-1" />
              {getText('Réclamer', 'مطالبة', 'Claim')}
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  )
}

function SendIcon(props: any) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4l16 8-16 8 4-8-4-8z" /></svg>
}
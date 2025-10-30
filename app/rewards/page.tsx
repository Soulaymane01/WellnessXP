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
  Star, Heart, Ticket, GraduationCap, AlertCircle, Copy, Check
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
  
  // Mentor application form
  const [mentorForm, setMentorForm] = useState({
    motivation: '',
    experience: '',
    availability: ''
  })

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

  const getText = (fr: string, ar: string, en: string) => {
    if (settings.language === 'ar') return ar
    if (settings.language === 'en') return en
    return fr
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
    const matchesSearch = searchQuery === '' || 
      getRewardTitle(reward).toLowerCase().includes(searchQuery.toLowerCase()) ||
      getRewardDesc(reward).toLowerCase().includes(searchQuery.toLowerCase())
    return matchesType && matchesSearch
  })

  const canApplyForMentor = progress.level >= 15 && progress.badges.length >= 5

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'coupon': return <Tag className="w-5 h-5" />
      case 'activity': return <Calendar className="w-5 h-5" />
      case 'mentor': return <GraduationCap className="w-5 h-5" />
      default: return <Gift className="w-5 h-5" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'coupon': return 'from-green-500 to-emerald-500'
      case 'activity': return 'from-blue-500 to-cyan-500'
      case 'mentor': return 'from-purple-500 to-pink-500'
      default: return 'from-orange-500 to-red-500'
    }
  }

  if (loading) {
    return (
      <div className={`min-h-screen bg-gradient-to-br from-background via-background to-orange-500/5 transition-all duration-300 flex items-center justify-center`}>
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">{getText('Chargement...', 'جاري التحميل...', 'Loading...')}</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br from-background via-background to-orange-500/5 transition-all duration-300`}>
      {/* Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center shadow-lg">
                <Gift className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                  {getText("Récompenses", "المكافآت", "Rewards")}
                </h1>
                <p className="text-sm text-muted-foreground">
                  {getText("Échangez vos XP contre des récompenses", "استبدل نقاط الخبرة الخاصة بك بالمكافآت", "Exchange your XP for rewards")}
                </p>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-3">
              <div className="flex items-center gap-2 px-4 py-2 bg-orange-500/10 rounded-full border border-orange-500/20">
                <Trophy className="w-4 h-4 text-orange-600" />
                <span className="text-sm font-medium">{getText('Niveau', 'المستوى', 'Level')} {progress.level}</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-yellow-500/10 rounded-full border border-yellow-500/20">
                <Star className="w-4 h-4 text-yellow-600" />
                <span className="text-sm font-medium">{progress.totalXP} XP</span>
              </div>
              {stats && (
                <div className="flex items-center gap-2 px-4 py-2 bg-green-500/10 rounded-full border border-green-500/20">
                  <Gift className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium">{stats.totalClaimed} {getText('réclamées', 'مطالب بها', 'claimed')}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="border-border/50 bg-gradient-to-br from-orange-500/5 to-transparent">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    {getText('Disponibles', 'متاح', 'Available')}
                  </p>
                  <p className="text-3xl font-bold text-orange-600">{allRewards.length}</p>
                </div>
                <Gift className="w-10 h-10 text-orange-500/20" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-gradient-to-br from-green-500/5 to-transparent">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    {getText('Réclamées', 'مطالب بها', 'Claimed')}
                  </p>
                  <p className="text-3xl font-bold text-green-600">{stats?.totalClaimed || 0}</p>
                </div>
                <CheckCircle2 className="w-10 h-10 text-green-500/20" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-gradient-to-br from-blue-500/5 to-transparent">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    {getText('Actives', 'نشط', 'Active')}
                  </p>
                  <p className="text-3xl font-bold text-blue-600">{stats?.totalActive || 0}</p>
                </div>
                <Sparkles className="w-10 h-10 text-blue-500/20" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-gradient-to-br from-purple-500/5 to-transparent">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    {getText('Utilisées', 'مستخدم', 'Used')}
                  </p>
                  <p className="text-3xl font-bold text-purple-600">{stats?.totalUsed || 0}</p>
                </div>
                <TrendingUp className="w-10 h-10 text-purple-500/20" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-border">
          {[
            { id: 'available', label: getText('Disponibles', 'متاح', 'Available'), icon: Gift },
            { id: 'my-rewards', label: getText('Mes Récompenses', 'مكافآتي', 'My Rewards'), icon: Heart },
            { id: 'mentor', label: getText('Programme Mentor', 'برنامج المرشد', 'Mentor Program'), icon: GraduationCap }
          ].map(tab => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`flex items-center gap-2 px-6 py-3 font-medium transition-all relative ${
                  activeTab === tab.id
                    ? 'text-orange-600 border-b-2 border-orange-600'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            )
          })}
        </div>

        {/* Available Rewards Tab */}
        {activeTab === 'available' && (
          <div>
            {/* Filters */}
            <div className="mb-6 flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder={getText("Rechercher une récompense...", "ابحث عن مكافأة...", "Search for a reward...")}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-card border-border"
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-muted-foreground" />
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="px-4 py-2 border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="all">{getText('Tous les types', 'جميع الأنواع', 'All types')}</option>
                  <option value="coupon">{getText('Coupons', 'كوبونات', 'Coupons')}</option>
                  <option value="activity">{getText('Activités', 'أنشطة', 'Activities')}</option>
                  <option value="mentor">{getText('Mentor', 'مرشد', 'Mentor')}</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRewards.map(reward => {
                const canClaim = progress.level >= reward.requiredLevel
                const hasRequiredBadges = !reward.requiredBadges || 
                  reward.requiredBadges.every(badge => progress.badges.includes(badge))
                const isAvailable = canClaim && hasRequiredBadges

                return (
                  <Card key={reward.id} className={`border-border/50 overflow-hidden hover:shadow-lg transition-all ${!isAvailable ? 'opacity-60' : ''}`}>
                    <div className={`h-32 bg-gradient-to-br ${getTypeColor(reward.type)} relative overflow-hidden`}>
                      <div className="absolute inset-0 bg-black/20" />
                      <div className="absolute inset-0 flex items-center justify-center text-6xl">
                        {reward.icon}
                      </div>
                      <div className="absolute top-3 left-3">
                        <Badge className="bg-white/90 text-gray-900">
                          {reward.category}
                        </Badge>
                      </div>
                      {!isAvailable && (
                        <div className="absolute top-3 right-3">
                          <Lock className="w-6 h-6 text-white" />
                        </div>
                      )}
                    </div>
                    
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-bold text-lg">{getRewardTitle(reward)}</h3>
                        <div className="flex items-center gap-1 text-orange-600 font-bold">
                          {getTypeIcon(reward.type)}
                        </div>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-4">{getRewardDesc(reward)}</p>
                      
                      {reward.partner && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                          <Users className="w-4 h-4" />
                          <span>{reward.partner}</span>
                        </div>
                      )}
                      
                      {reward.location && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                          <MapPin className="w-4 h-4" />
                          <span>{reward.location}</span>
                        </div>
                      )}
                      
                      {reward.date && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                          <Calendar className="w-4 h-4" />
                          <span>{reward.date}</span>
                        </div>
                      )}
                      
                      <div className="flex items-center gap-3 mt-4 pt-4 border-t border-border">
                        <div className="flex items-center gap-1 text-sm">
                          <Trophy className="w-4 h-4 text-orange-600" />
                          <span className="font-semibold">
                            {getText('Niveau', 'المستوى', 'Level')} {reward.requiredLevel}
                          </span>
                        </div>
                        {reward.totalAvailable && (
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Ticket className="w-4 h-4" />
                            <span>{reward.totalAvailable - reward.claimed} {getText('restants', 'متبقي', 'left')}</span>
                          </div>
                        )}
                      </div>
                      
                      <Button
                        onClick={() => handleClaimReward(reward.id)}
                        disabled={!isAvailable || claimingId === reward.id}
                        className={`w-full mt-4 ${
                          isAvailable 
                            ? `bg-gradient-to-r ${getTypeColor(reward.type)} text-white hover:opacity-90`
                            : 'bg-secondary text-secondary-foreground'
                        }`}
                      >
                        {claimingId === reward.id ? (
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            {getText('Réclamation...', 'جاري المطالبة...', 'Claiming...')}
                          </div>
                        ) : !isAvailable ? (
                          <>
                            <Lock className="w-4 h-4 mr-2" />
                            {getText('Verrouillé', 'مقفل', 'Locked')}
                          </>
                        ) : (
                          <>
                            <Gift className="w-4 h-4 mr-2" />
                            {getText('Réclamer', 'مطالبة', 'Claim')}
                          </>
                        )}
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {filteredRewards.length === 0 && (
              <div className="text-center py-12">
                <Gift className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  {getText(
                    'Aucune récompense disponible pour le moment',
                    'لا توجد مكافآت متاحة في الوقت الحالي',
                    'No rewards available at the moment'
                  )}
                </p>
              </div>
            )}
          </div>
        )}

        {/* My Rewards Tab */}
        {activeTab === 'my-rewards' && (
          <div>
            {myRewards.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {myRewards.map(userReward => (
                  <Card key={userReward.id} className="border-border/50 overflow-hidden">
                    <div className={`h-24 bg-gradient-to-br ${getTypeColor(userReward.reward.type)} relative`}>
                      <div className="absolute inset-0 bg-black/20" />
                      <div className="absolute inset-0 flex items-center justify-center text-5xl">
                        {userReward.reward.icon}
                      </div>
                      <Badge className={`absolute top-3 right-3 ${
                        userReward.status === 'claimed' ? 'bg-green-500' :
                        userReward.status === 'used' ? 'bg-blue-500' : 'bg-gray-500'
                      } text-white`}>
                        {userReward.status === 'claimed' ? getText('Actif', 'نشط', 'Active') :
                         userReward.status === 'used' ? getText('Utilisé', 'مستخدم', 'Used') :
                         getText('Expiré', 'منتهي الصلاحية', 'Expired')}
                      </Badge>
                    </div>
                    
                    <CardContent className="pt-6">
                      <h3 className="font-bold text-lg mb-2">{getRewardTitle(userReward.reward)}</h3>
                      <p className="text-sm text-muted-foreground mb-4">{getRewardDesc(userReward.reward)}</p>
                      
                      {userReward.code && (
                        <div className="bg-secondary/20 p-4 rounded-lg mb-4">
                          <p className="text-xs text-muted-foreground mb-2">
                            {getText('Code de récompense', 'رمز المكافأة', 'Reward code')}
                          </p>
                          <div className="flex items-center justify-between">
                            <code className="font-mono font-bold text-sm">{userReward.code}</code>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => copyToClipboard(userReward.code!)}
                              className="h-8 px-2"
                            >
                              {copiedCode === userReward.code ? (
                                <Check className="w-4 h-4 text-green-600" />
                              ) : (
                                <Copy className="w-4 h-4" />
                              )}
                            </Button>
                          </div>
                        </div>
                      )}
                      
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                        <Clock className="w-4 h-4" />
                        <span>
                          {getText('Réclamé le', 'مطالب به في', 'Claimed on')} {new Date(userReward.claimedAt).toLocaleDateString()}
                        </span>
                      </div>
                      
                      {userReward.expiresAt && (
                        <div className="flex items-center gap-2 text-sm text-orange-600 mb-4">
                          <AlertCircle className="w-4 h-4" />
                          <span>
                            {getText('Expire le', 'تنتهي صلاحيته في', 'Expires on')} {new Date(userReward.expiresAt).toLocaleDateString()}
                          </span>
                        </div>
                      )}
                      
                      {userReward.status === 'claimed' && (
                        <Button
                          onClick={() => handleUseReward(userReward.id)}
                          variant="outline"
                          className="w-full"
                        >
                          <CheckCircle2 className="w-4 h-4 mr-2" />
                          {getText('Marquer comme utilisé', 'وضع علامة كمستخدم', 'Mark as used')}
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Heart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground mb-4">
                  {getText(
                    "Vous n'avez pas encore réclamé de récompenses",
                    'لم تطالب بأي مكافآت بعد',
                    "You haven't claimed any rewards yet"
                  )}
                </p>
                <Button onClick={() => setActiveTab('available')} className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
                  {getText('Découvrir les récompenses', 'اكتشف المكافآت', 'Discover rewards')}
                </Button>
              </div>
            )}
          </div>
        )}

        {/* Mentor Program Tab */}
        {activeTab === 'mentor' && (
          <div className="max-w-3xl mx-auto">
            <Card className="border-border/50 overflow-hidden mb-6">
              <div className="h-40 bg-gradient-to-br from-purple-500 to-pink-500 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <GraduationCap className="w-24 h-24 text-white/90" />
                </div>
              </div>
              
              <CardContent className="pt-6">
                <h2 className="text-2xl font-bold mb-4">
                  {getText('Programme Mentor', 'برنامج المرشد', 'Mentor Program')}
                </h2>
                <p className="text-muted-foreground mb-6">
                  {getText(
                    "Devenez mentor et aidez d'autres jeunes à apprendre sur la santé sexuelle et reproductive. Partagez vos connaissances dans des associations et gagnez la reconnaissance de la communauté.",
                    'كن مرشدًا وساعد الشباب الآخرين على التعلم عن الصحة الجنسية والإنجابية. شارك معرفتك في الجمعيات واكسب اعتراف المجتمع.',
                    'Become a mentor and help other young people learn about sexual and reproductive health. Share your knowledge in associations and earn community recognition.'
                  )}
                </p>
                
                <div className="bg-secondary/10 p-6 rounded-lg mb-6">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                    {getText('Conditions requises', 'الشروط المطلوبة', 'Requirements')}
                  </h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                        progress.level >= 15 ? 'bg-green-500' : 'bg-gray-300'
                      }`                      }>
                        {progress.level >= 15 ? (
                          <CheckCircle2 className="w-4 h-4 text-white" />
                        ) : (
                          <Lock className="w-4 h-4 text-white" />
                        )}
                      </div>
                      <span>
                        {getText('Niveau 15 ou plus', 'المستوى 15 أو أكثر', 'Level 15 or above')}
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                        progress.badges.length >= 5 ? 'bg-green-500' : 'bg-gray-300'
                      }`}>
                        {progress.badges.length >= 5 ? (
                          <CheckCircle2 className="w-4 h-4 text-white" />
                        ) : (
                          <Lock className="w-4 h-4 text-white" />
                        )}
                      </div>
                      <span>
                        {getText('Au moins 5 badges obtenus', 'الحصول على 5 شارات على الأقل', 'At least 5 badges earned')}
                      </span>
                    </li>
                  </ul>
                </div>

                {mentorApp ? (
                  <div className="bg-green-100 border border-green-300 text-green-800 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                      {getText('Candidature envoyée', 'تم إرسال الطلب', 'Application submitted')}
                    </h3>
                    <p className="text-sm">
                      {getText(
                        "Merci ! Votre candidature a été reçue. Nous vous contacterons bientôt.",
                        "شكرًا! تم استلام طلبك وسنتصل بك قريبًا.",
                        "Thank you! Your application has been received. We'll contact you soon."
                      )}
                    </p>
                  </div>
                ) : canApplyForMentor ? (
                  <div>
                    <h3 className="font-semibold mb-3">
                      {getText('Formulaire de candidature', 'نموذج الطلب', 'Application form')}
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          {getText('Motivation', 'الدافع', 'Motivation')}
                        </label>
                        <Textarea
                          value={mentorForm.motivation}
                          onChange={(e) => setMentorForm({ ...mentorForm, motivation: e.target.value })}
                          placeholder={getText(
                            'Pourquoi souhaitez-vous devenir mentor ?',
                            'لماذا ترغب في أن تصبح مرشدًا؟',
                            'Why do you want to become a mentor?'
                          )}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1">
                          {getText('Expérience', 'الخبرة', 'Experience')}
                        </label>
                        <Textarea
                          value={mentorForm.experience}
                          onChange={(e) => setMentorForm({ ...mentorForm, experience: e.target.value })}
                          placeholder={getText(
                            'Avez-vous une expérience dans la sensibilisation ou le mentorat ?',
                            'هل لديك خبرة في التوعية أو الإرشاد؟',
                            'Do you have experience in awareness or mentoring?'
                          )}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1">
                          {getText('Disponibilité', 'التوفر', 'Availability')}
                        </label>
                        <Input
                          type="text"
                          value={mentorForm.availability}
                          onChange={(e) => setMentorForm({ ...mentorForm, availability: e.target.value })}
                          placeholder={getText(
                            'Ex: weekends, 3 heures par semaine...',
                            'مثلاً: عطلات نهاية الأسبوع، 3 ساعات أسبوعيًا...',
                            'e.g., weekends, 3 hours per week...'
                          )}
                        />
                      </div>

                      <Button
                        onClick={handleSubmitMentorApp}
                        className="bg-gradient-to-r from-purple-500 to-pink-500 text-white w-full"
                      >
                        <SendIcon className="w-4 h-4 mr-2" />
                        {getText('Soumettre la candidature', 'إرسال الطلب', 'Submit application')}
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="bg-yellow-50 border border-yellow-300 text-yellow-800 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <AlertCircle className="w-5 h-5 text-yellow-600" />
                      {getText('Conditions non remplies', 'الشروط غير مستوفاة', 'Requirements not met')}
                    </h3>
                    <p className="text-sm">
                      {getText(
                        "Atteignez le niveau 15 et obtenez au moins 5 badges pour pouvoir postuler.",
                        "احصل على المستوى 15 وعلى الأقل 5 شارات لتتمكن من التقديم.",
                        "Reach level 15 and earn at least 5 badges to apply."
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

function SendIcon(props: any) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4l16 8-16 8 4-8-4-8z" /></svg>
}

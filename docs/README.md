Une application web interactive de santé sexuelle et reproductive pour adolescents et jeunes marocains (14-25 ans). **Design style dashboard gamifié adulte** (inspiré de Notion, Linear, Duolingo) : épuré, professionnel mais ludique, avec système de progression visible. Interface **mobile-first** en **français et darija marocaine**.

## Aesthetic & Design Philosophy

**Style Dashboard Gamifié :**
- Layout type Notion : sections modulaires, cartes élégantes, espaces blancs généreux
- Sidebar navigation (desktop) / Bottom nav (mobile)
- Micro-animations subtiles et professionnelles
- Glassmorphism léger (cartes avec backdrop-blur)
- Gradient accents subtils, pas de couleurs criardes
- Typography moderne et lisible (Inter, SF Pro)
- Dark mode disponible
- Progress bars, level indicators, streak counters intégrés élégamment

**Pas un site pour enfants** : éviter :
- ❌ Couleurs trop vives/flashy
- ❌ Illustrations cartoon enfantines
- ❌ Too many emojis partout
- ❌ Comic Sans ou fonts "cute"

**Viser plutôt :**
- ✅ Duolingo (gamification adulte)
- ✅ Notion (organisation claire)
- ✅ Linear (design épuré)
- ✅ Stripe dashboard (professionnel mais accessible)

## Fonctionnalités principales

### 1. DASHBOARD PRINCIPAL (Page d'accueil)

**Header :**
- Logo "WellnessXP" (typographie moderne)
- Sélecteur langue : 🇲🇦 Darija / 🇫🇷 Français (toggle élégant)
- User profile icon (click → dropdown avec stats/settings)

**Hero Section :**
- Grande carte avec gradient subtil
- "Ton espace santé confidentiel" / "L'espace dyalek dyal sa7a"
- Stats personnelles en cards horizontales :
  - 🔥 Streak : X jours consécutifs
  - ⭐ Niveau : Expert·e (Level 3)
  - 🏆 XP : 750 / 1000
- Progress bar élégante sous les stats

**Grid de Cards Principales** (2x2 ou 2x3 selon écran) :

Chaque card = design Notion-style :
- Icône élégante en haut à gauche
- Titre + courte description
- Badge de notification si nouveau contenu
- Hover effect subtil (lift + shadow)

Cards :
1. 💬 **Parle à Dr. Amina**
   - "Chatbot IA médical - Anonyme & Confidentiel"
   - Badge : "3 nouvelles réponses populaires"

2. 📱 **Stories & Défis**
   - "Apprends en swipant - Format TikTok"
   - Badge : "2 nouveaux scénarios"

3. 📚 **Ressources & Blog**
   - "Articles validés par des expert·e·s"
   - Badge : "5 nouveaux articles cette semaine"

4. 📍 **Centres de Santé**
   - "Trouve de l'aide près de toi"
   - "15 centres à Casablanca"

5. 🎯 **Quiz du Jour**
   - "5 questions rapides - Gagne 100 XP"
   - Timer : "Expire dans 4h"

6. 🆘 **Aide Urgente**
   - Card rouge/orange avec outline
   - "Accès rapide aux ressources d'urgence"

**Section "Continue ton parcours"** (si user a commencé des stories) :
- Carousel horizontal de stories en cours
- Preview + progress bar
- "Tu as complété 2/5 stories"

**Disclaimer Footer :**
- Petit texte gris : "Informations éducatives uniquement - consulte un·e professionnel·le pour un diagnostic"

### 2. CHATBOT "DR. AMINA" - Style WhatsApp professionnel

**Interface Messaging moderne :**
- Full-screen modal ou page dédiée
- Header fixe :
  - Avatar Dr. Amina (illustration professionnelle femme médecin)
  - "Dr. Amina - Assistante Santé IA"
  - Status : "En ligne • Répond en quelques secondes"
  - Bouton "Effacer historique" (icône discrète)

**Zone de chat :**
- Messages user : bulles bleues/vertes à droite
- Messages Dr. Amina : bulles grises à gauche
- Timestamp discret
- Typing indicator ("Dr. Amina écrit...")
- Auto-scroll smooth

**Quick Replies (Pills cliquables en bas) :**
Avant que user écrive, afficher suggestions en grid :

Français :
- "C'est quoi une IST ?"
- "Prévention VIH/SIDA"
- "Contraception au Maroc"
- "Où faire un test gratuit ?"
- "Violences basées sur le genre"
- "Pilule du lendemain"

Darija :
- "Chnou hiya l-IST?"
- "Kifash nwqa3 rassi mn SIDA?"
- "Contraception f Maroc"
- "Fin ndir test bla flouss?"
- "9anoun 103-13"
- "Pilule dial lendemain"

**Exemple conversation (ton professionnel mais friendly) :**

```
User: "C'est quoi le VIH/SIDA ?"

Dr. Amina: "Le VIH est un virus qui affaiblit ton système immunitaire 🦠

Ce qu'il faut savoir au Maroc :

✅ Dépistage GRATUIT et ANONYME dans les centres ALCS
✅ Traitement efficace disponible (les personnes traitées vivent normalement)
✅ Prévention simple : préservatifs, PrEP

📊 Au Maroc, le dépistage précoce sauve des vies.

Tu veux en savoir plus sur :"

[Pills: "Comment se transmet-il ?" | "Où faire un test ?" | "Prévention"]
```

**Feature clé : Bouton "Parler à un·e vrai·e pro"**
- Si question complexe ou urgente
- Affiche modal avec :
  - Numéros d'urgence marocains
  - Chat lines (si disponibles)
  - "Trouve un centre près de toi"

**10-15 Q&R pre-programmées** couvrant :
- VIH/SIDA (transmission, prévention, test, traitement au Maroc)
- IST courantes (symptômes, dépistage)
- Contraception (types, où obtenir, gratuité)
- Pilule du lendemain (délai 72h, où acheter, prix ~50-80 DH)
- Grossesses non désirées (options, planning familial AMPF)
- Consentement (définition, comment dire non)
- Violences (loi 103-13, numéro 8350)
- Cancers sein/col utérus (dépistage gratuit Lalla Salma, autopalpation)
- Menstruations (normalité, hygiène)
- Première fois (préparation, protection)

### 3. STORIES INTERACTIVES - Format TikTok/Instagram vertical

**Interface Stories full-screen :**
- Format **vertical 9:16** (comme TikTok/IG)
- **Swipe up/down** pour passer à la story suivante
- **Tap left/right** : aller avant/arrière dans la même story
- Progress bars en haut (5 barres pour 5 étapes de la story)
- Bouton X en haut à droite pour fermer
- Background : image/illustration + overlay gradient sombre
- Texte en blanc, large, lisible

**Structure d'une Story (5 étapes) :**

**STORY 1 : "La Soirée de Mariage"** 🎊

**Étape 1 - Setup :**
- Image : Jeunes à une fête marocaine (illustrations modernes, pas cartoon)
- Texte overlay : "Tu es à un mariage avec des ami·e·s à Casablanca"
- Musique background (optionnel)
- [Tap pour continuer]

**Étape 2 - Situation :**
- "Après la fête, quelqu'un que tu trouves intéressant·e te propose de te raccompagner... seul·e 👀"
- Texte darija en plus petit : "Mn ba3d l3ers, chi wa7ed/wahda 9alek yewsellek wahdkom"

**Étape 3 - Choix (critical) :**
- Fond assombri, focus sur 3 gros boutons :

```
┌─────────────────────────┐
│  😬 J'accepte           │
│  (sans préparation)     │
└─────────────────────────┘

┌─────────────────────────┐
│  ✅ J'ai des préservatifs│
│  On peut en parler      │
└─────────────────────────┘

┌─────────────────────────┐
│  🚶 Je rentre avec      │
│  mes ami·e·s            │
└─────────────────────────┘
```

**Étape 4a - Mauvais choix :**
- Background rouge/orange
- "⚠️ Attention aux risques !"
- Liste rapide :
  - IST (syphilis, chlamydia, VIH...)
  - Grossesse non désirée
  - Absence de consentement clair
- "+0 XP"
- [Bouton : Recommencer | Continuer]

**Étape 4b - Bon choix (préservatifs) :**
- Background vert
- "🎉 Excellente décision !"
- "Communication + protection = combo gagnant"
- Animation confetti
- "+50 XP"
- Badge débloqué : "Protecteur·ice Averti·e" 🛡️

**Étape 4c - Bon choix (rentrer) :**
- Background bleu
- "💪 Tu respectes tes limites !"
- "Dire non, c'est ton droit absolu"
- "+50 XP"
- Badge : "Respect de Soi" ✨

**Étape 5 - Learning :**
- Écran final avec key takeaways
- "Ce que tu dois retenir :"
  - Toujours se protéger
  - Le consentement est obligatoire
  - Avoir des préservatifs n'est jamais honteux
- "📍 Où trouver des préservatifs à Casa ?"
  - Pharmacies (10-30 DH)
  - Centres ALCS (gratuits)
- [Bouton : Story suivante]

---

**STORY 2 : "Le Doute" - Post-exposition**

**5 étapes similaires :**
1. Setup : "3 semaines après un rapport non protégé à Rabat..."
2. Situation : "Tu stresses, tu ne sais pas quoi faire 😰"
3. Choix :
   - ❌ "J'attends, ça va passer"
   - ✅ "Je vais faire un test à l'ALCS"
   - ✅ "J'en parle à quelqu'un de confiance"
4. Feedback avec XP
5. Info : "Dépistage VIH gratuit et anonyme - Résultats en 15 min - Liste centres ALCS"

---

**STORY 3 : "La Pression du Groupe"**

Setup : Ami·e·s qui se moquent de toi car tu insistes sur la protection
Choix : comment réagir
Learning : Le vrai courage c'est de se protéger, pas de céder à la pression

---

**STORY 4 : "Accès Contraception - Rabat"**

Setup : Tu veux la pilule mais tu ne sais pas où aller
Choix : pharmacie / centre de santé / AMPF / demander à un·e ami·e
Learning : Contraception gratuite dans centres publics + AMPF, pilule 30-80 DH en pharmacie

---

**STORY 5 : "Harcèlement de Rue (Tbara9)"**

Setup : Quelqu'un te suit dans la rue et te fait des remarques déplacées
Choix : Comment réagir de manière sûre
Learning : Loi 103-13, harcèlement puni, numéro 8350

---

**Navigation Stories :**
- Liste des stories en grid avant d'entrer
- Preview image + titre + durée (ex: "5 min")
- Progress indicator : "3/5 complétées"
- Badges débloquables affichés

### 4. BLOG & RESSOURCES - Style Medium/Notion

**Layout :**
- Vue liste ou grid de cards d'articles
- Chaque card :
  - Image header (illustration/photo)
  - Catégorie tag (couleur-coded)
  - Titre accrocheur
  - Auteur : "Dr. Fatima Z., Gynécologue à Rabat"
  - Temps de lecture : "5 min"
  - Bookmark icon

**Catégories (filtres en tabs) :**
- 🛡️ Prévention VIH/IST
- 💊 Contraception
- 👩‍⚕️ Santé Féminine
- 🧠 Bien-être Mental
- ⚖️ Droits & Lois
- 🌍 Actualités

**Exemples d'articles (10 articles fictifs à créer) :**

1. **"Dépistage VIH au Maroc : tout ce que tu dois savoir"**
   - Dr. Amina K., Infectiologue ALCS Casa
   - Où, comment, gratuit, anonyme, délais résultats

2. **"Pilule du lendemain : mode d'emploi complet"**
   - Dr. Sara L., Pharmacienne Rabat
   - Prix, efficacité, délai 72h, où acheter, effets secondaires

3. **"La loi 103-13 expliquée simplement : tes droits face aux violences"**
   - Me. Leila M., Avocate
   - Harcèlement, violence conjugale, recours, numéro 8350

4. **"Cancer du sein : l'autopalpation en 5 étapes"**
   - Dr. Khadija B., Fondation Lalla Salma
   - Illustrations, quand le faire, signes d'alerte

5. **"IST les plus courantes au Maroc : symptômes et traitements"**
   - Dr. Youssef H., Dermatologie
   - Chlamydia, gonorrhée, syphilis, HPV

6. **"Témoignage : J'ai fait un test VIH à 19 ans"**
   - Anonyme, Marrakech
   - Récit positif, dédramatisation

7. **"Contraception gratuite au Maroc : le guide complet"**
   - AMPF
   - Centres, types, comment obtenir

8. **"Consentement : savoir dire oui, savoir dire non"**
   - Psychologue clinicienne
   - Communication, limites, respect

9. **"Mythes et réalités sur le VIH/SIDA"**
   - ALCS
   - Déconstruction idées reçues

10. **"Vaccination HPV : prévention cancer col utérus"**
    - Ministère Santé
    - Qui, quand, où, gratuit pour qui

**Page Article (simple et lisible) :**
- Hero image
- Titre H1
- Byline (auteur, date, temps lecture)
- Contenu en prose (pas de bullets)
- Sidebar : articles reliés
- CTA fin d'article : "Pose ta question à Dr. Amina"

### 5. QUIZ & DÉFIS - Gamification légère

**Page Quiz :**
- Hero card "Quiz du Jour" avec timer
- Autres quiz disponibles en grid

**Quiz Flash (5 questions, style Duolingo) :**

Question 1 :
```
┌─────────────────────────────────┐
│  Le dépistage VIH est-il        │
│  gratuit au Maroc ?             │
│                                 │
│  ○ Oui, dans les centres ALCS   │
│  ○ Non, toujours payant         │
│  ○ Seulement avec ordonnance    │
└─────────────────────────────────┘
```

Feedback immédiat après chaque réponse :
- ✅ Correct : animation verte, +20 XP, explication courte
- ❌ Incorrect : animation rouge, 0 XP, explication + bonne réponse

**Écran final :**
- Score : 4/5 ✨
- Total XP gagné : +80 XP
- Nouveau niveau ? (si applicable)
- Leaderboard position (optionnel)

**Défi du Jour :**
- 1 défi quotidien, change tous les jours
- Exemples :
  - "📍 Trouve l'adresse d'un centre ALCS dans ta ville"
  - "📖 Lis un article sur la contraception"
  - "💬 Pose une question à Dr. Amina"
  - "🎯 Complète une story"
- Complétion = +100 XP + badge spécial

**Leaderboard (optionnel) :**
- Top 10 de la semaine
- Pseudos anonymes ("Utilisateur #1234")
- XP total
- Pas de pression sociale, juste motivation

### 6. CARTE INTERACTIVE - Centres de Santé Maroc

**Interface Map :**
- Fullscreen map (Leaflet/Mapbox)
- Centré sur ville user (ou Casablanca par défaut)
- Filtres en sidebar/bottom sheet :
  - Type : ALCS, AMPF, CSU, Pharmacies, Centres VBG
  - Ville : dropdown avec villes principales
  - Service : Dépistage VIH, Contraception, Urgence

**Pins colorés par type :**
- 🔴 ALCS (dépistage VIH/IST)
- 🟢 AMPF (planning familial)
- 🔵 Centres de Santé Urbains
- 🟠 Centres VBG
- 🟣 Pharmacies de garde

**Popup au clic (card élégante) :**
```
┌──────────────────────────────┐
│ ALCS Casablanca - Derb Ghallef│
│ 📍 Boulevard Zerktouni, Casa  │
│                               │
│ Services :                    │
│ • Dépistage VIH/IST gratuit   │
│ • Conseil personnalisé        │
│ • Préservatifs gratuits       │
│                               │
│ 🕐 Lun-Ven : 9h-17h           │
│ ☎️  0522-XX-XX-XX             │
│                               │
│ ⭐⭐⭐⭐⭐ (124 avis)            │
│ "Personnel très pro et discret"│
│                               │
│ [Itinéraire 🗺️] [Appeler 📞] │
└──────────────────────────────┘
```

**Liste scrollable en dessous de la carte :**
- Tous les centres avec même info
- Bouton "Voir sur la carte"

**10-15 centres fictifs mais réalistes** pour villes principales :
- Casablanca (3-4)
- Rabat (2-3)
- Marrakech (2)
- Tanger (2)
- Fès, Agadir, Oujda (1 chacun)

### 7. SOS URGENCE - Accès rapide

**Bouton flottant rouge/orange** présent sur TOUTES les pages :
- Position : bottom-right (desktop) / bottom-center (mobile)
- Icon : 🆘 ou croix rouge
- Label : "Urgence"
- Au clic : ouvre fullscreen modal

**Modal SOS (4 sections) :**

**1. Rapport Non Protégé** 📍
```
┌─────────────────────────────────┐
│ ⏰ PILULE DU LENDEMAIN          │
│                                 │
│ Tu as 72 heures (3 jours)       │
│                                 │
│ Où l'obtenir :                  │
│ • Pharmacie SANS ordonnance     │
│ • Prix : 50-80 DH               │
│ • Gratuit : centres AMPF        │
│                                 │
│ Noms : Norlevo, Postinor, Levodonna│
│                                 │
│ [Pharmacies de garde près de moi]│
└─────────────────────────────────┘
```

**2. Test VIH/IST** 🔬
```
GRATUIT & ANONYME au Maroc

Centres ALCS :
🏥 Casa - Bd Zerktouni | ☎️ 0522-XX-XX-XX
🏥 Rabat - Avenue Hassan II | ☎️ 0537-XX-XX-XX
🏥 Marrakech - Guéliz | ☎️ 0524-XX-XX-XX
🏥 Tanger - Centre | ☎️ 0539-XX-XX-XX

✅ Résultats en 15-30 minutes
✅ Pas de carte d'identité requise

[Voir tous les centres 🗺️]
```

**3. Violence/Harcèlement** 🚨
```
TU N'ES PAS SEUL·E

Numéros d'urgence (gratuits) :
📞 8350 - Écoute Violence (24h/24)
🚔 19 - Police
👮 177 - Gendarmerie Royale
🏥 141 - SAMU

Loi 103-13 : Le harcèlement et les violences sont PUNIS par la loi marocaine.

[Chat confidentiel] [Centres d'écoute]
```

**4. Contraception** 💊
```
ACCÈS RAPIDE

Types disponibles :
• Préservatifs : 10-30 DH (pharmacies)
• Pilule : Gratuit (CSU) ou 30-80 DH
• Implant/Stérilet : Gratuit/peu coûteux (AMPF)
• Pilule lendemain : 50-80 DH

Où obtenir GRATUITEMENT :
🏥 Centres de Santé Urbains (CSU)
🏥 AMPF (sur RDV)

[Trouver un centre 📍]
```

**Bouton "Écran Panic"** en bas du modal :
- Redirige vers page neutre (météo, actualités) si quelqu'un arrive
- Protection de la confidentialité

### 8. PROFIL & PROGRESSION - Dashboard style

**Page Profil (élégante, type Notion) :**

**Header Card :**
```
┌────────────────────────────────────┐
│  [Avatar] Utilisateur #7482        │
│  📍 Casablanca                     │
│  🗣️ Français                       │
│                                    │
│  Membre depuis : 15 jours          │
│  Dernière visite : Aujourd'hui     │
└────────────────────────────────────┘
```

**Stats Cards (grid 2x2) :**

```
┌──────────────┐  ┌──────────────┐
│ 🔥 Streak    │  │ ⭐ Niveau    │
│              │  │              │
│   7 jours    │  │  Expert·e    │
│   ████░░░    │  │  Level 3     │
└──────────────┘  └──────────────┘

┌──────────────┐  ┌──────────────┐
│ 🏆 XP Total  │  │ 🎯 Badges    │
│              │  │              │
│  750 / 1000  │  │   8 / 15     │
│  ██████░░░░  │  │  ⭐⭐⭐⭐⭐⭐⭐⭐│
└──────────────┘  └──────────────┘
```

**Section Badges (grid 3x3 ou 4x4) :**

Badges élégants (pas cartoon) :
- 🛡️ Protecteur·ice Averti·e (module VIH complété)
- 💬 Communicateur·ice (20 questions à Dr. Amina)
- 📖 Lecteur·ice Assidu·e (10 articles lus)
- 🎯 Warrior 7 Jours (streak de 7 jours)
- 🌟 Explorateur·ice (visite toutes les sections)
- 🧠 Cerveau IST (quiz IST 100%)
- 🏥 Connaisseur·se ALCS (visite page centres)
- 💪 Champion·ne Consentement (story complétée)
- 🗣️ Briseur·euse de Tabous (première utilisation)

Badges non débloqués : icône grisée + "???"

**Section Activité Récente :**
- Timeline élégante
- "Il y a 2h : Story complétée (+50 XP)"
- "Il y a 1 jour : Quiz du jour (+80 XP)"
- "Il y a 3 jours : Niveau 3 atteint ! 🎉"

**Section Statistiques :**
- X questions posées à Dr. Amina
- X stories complétées (5/8)
- X articles lus
- X quiz terminés
- X centres visités sur la carte

**Settings (section repliable) :**
- Langue : [Français ▼] [Darija ▼]
- Thème : [Clair ○ | ●Sombre]
- Notifications : [Toggle]
- Confidentialité :
  - "Effacer tout l'historique de chat"
  - "Réinitialiser la progression"
  - "Activer mode privé"

### 9. NAVIGATION & STRUCTURE

**Desktop (Sidebar gauche) :**
```
┌─────────────────┐
│  WellnessXP 🌟  │
├─────────────────┤
│ 🏠 Dashboard    │
│ 💬 Dr. Amina    │
│ 📱 Stories      │
│ 📚 Blog         │
│ 🎯 Quiz         │
│ 📍 Centres      │
│ 👤 Profil       │
├─────────────────┤
│ 🆘 URGENCE      │
└─────────────────┘
```

**Mobile (Bottom Navigation) :**
```
┌────┬────┬────┬────┬────┐
│ 🏠 │ 💬 │ 📱 │ 📍 │ 👤 │
└────┴────┴────┴────┴────┘
```
+ Bouton flottant 🆘 au centre-top

## DESIGN SYSTEM - Gamified Professional

**Palette Couleurs (mode clair) :**
- Primary : Emerald (#10B981) - santé, Maroc
- Secondary : Indigo (#6366F1) - confiance
- Accent : Violet (#8B5CF6) - créativité
- Success : Green (#22C55E)
- Warning : Amber (#F59E0B)
- Danger : Red (#EF4444)
- Background : White (#FFFFFF)
- Surface : Gray-50 (#F9FAFB)
- Text : Gray-900 (#111827)
- Text-secondary : Gray-600

**Palette Couleurs (mode sombre) :**
- Background : Gray-950 (#030712)
- Surface : Gray-900 (#111827)
- Text : Gray-50
- Autres couleurs légèrement désaturées

**Typography :**
- Font : Inter ou SF Pro Display
- H1 : 32-40px, Bold
- H2 : 24-28px, Semibold
- H3 : 20px, Semibold
- Body : 16px, Regular
- Small : 14px, Regular

**Spacing :**
- Utiliser échelle 4/8/12/16/24/32/48/64px
- Padding cards : 24px
- Gap grids : 16-24px

**Components :**
- Border-radius : 12px (cards), 8px (buttons), 24px (pills)
- Shadows : subtiles (Tailwind shadow-sm, shadow-md)
- Hover effects : transform scale(1.02), shadow lift
- Transitions : 200-300ms ease
- Glassmorphism : backdrop-blur + opacity

**Micro-animations :**
- XP gain : counter animation + confetti
- Badge unlock : scale + glow effect
- Level up : fullscreen celebration
- Streak maintain : fire animation
- Button clicks : ripple effect

**Icons :**
- Lucide React (consistant, moderne)
- Taille : 20-24px (interface), 32-40px (hero)

## CONTENU MULTILINGUE

**Structure data :**
```javascript
const content = {
  fr: {
    nav: {
      home: "Accueil",
      chat: "Dr. Amina",
      stories: "Stories",
      // ...
    },
    chat: {
      placeholder: "Pose ta question...",
      quickReplies: [...],
      // ...
    }
  },
  darija: {
    nav: {
      home: "Accueil", // ou "Dar"
      chat: "Dr. Amina",
      stories: "Stories",
      // ...
    },
    chat: {
      placeholder: "Souwel sou'alek...",
      quickReplies: [...],
      // ...
    }
  }
}
```

**Priorité :** Français complet pour démo, darija pour phrases clés

## CONFIDENTIALITÉ & SÉCURITÉ

**Priorités absolues :**
- ✅ Pas d'inscription requise
- ✅ Pseudonyme auto-généré ("Utilisateur #XXXX")
- ✅ Données 100% localStorage (pas de serveur)
- ✅ Effacement historique en 1 clic
- ✅ Mode privé (bouton panic)
 
**Footer disclaimer (toutes pages) :**
"🔒 100% anonyme - Tes données restent sur ton appareil - Aucune collecte d'informations personnelles"

**Page Confidentialité (obligatoire) :**
```
┌─────────────────────────────────────┐
│  🔒 Ta Vie Privée, Notre Priorité  │
│                                     │
│  ✅ Zéro collecte de données        │
│  ✅ Conversations 100% privées      │
│  ✅ Pas de compte requis            │
│  ✅ Tout reste sur ton appareil     │
│  ✅ Efface l'historique quand tu veux│
│                                     │
│  Conformité loi marocaine 09-08     │
│  sur la protection des données      │
└─────────────────────────────────────┘
```

## TECHNICAL STACK

**Frontend :**
- React 18+ avec TypeScript (optionnel)
- Tailwind CSS pour styling
- Framer Motion pour animations (optionnel)
- React Router pour navigation
- Lucide React pour icônes
- Leaflet ou Mapbox GL pour carte

**State Management :**
- useState/useReducer pour state local
- Context API pour langue, thème
- localStorage pour persistence

**Structure :**
```
src/
├── components/
│   ├── ui/              # Boutons, Cards, Modals
│   ├── navigation/      # Sidebar, BottomNav
│   ├── gamification/    # XPBar, Badges, LevelUp
│   └── chat/            # ChatBubble, QuickReply
├── pages/
│   ├── Dashboard.jsx
│   ├── Chat.jsx
│   ├── Stories.jsx
│   ├── Blog.jsx
│   ├── Quiz.jsx
│   ├── Map.jsx
│   ├── SOS.jsx
│   └── Profile.jsx
├── data/
│   ├── chatResponses.js  # Q&R chatbot
│   ├── stories.js        # Scénarios stories
│   ├── articles.js       # Articles blog
│   ├── centers.js        # Centres santé
│   ├── quizzes.js        # Questions quiz
│   └── content.js        # Traductions FR/Darija
├── hooks/
│   ├── useXP.js          # Gestion XP/levels
│   ├── useBadges.js      # Unlock badges
│   ├── useStreak.js      # Streak tracking
│   └── useLanguage.js    # i18n
├── utils/
│   ├── localStorage.js   # Helpers storage
│   ├── xpCalculator.js   # Logique gamification
│   └── constants.js      # Levels, badges config
└── styles/
    └── globals.css       # Tailwind + custom
```

## DATA STRUCTURES

**User Profile (localStorage) :**
```javascript
{
  id: "user_7482",
  pseudo: "Utilisateur #7482",
  city: "Casablanca",
  language: "fr", // or "darija"
  theme: "light", // or "dark"
  createdAt: "2025-10-01",
  lastVisit: "2025-10-24",
  
  progression: {
    xp: 750,
    level: 3,
    streak: 7,
    lastStreakDate: "2025-10-24"
  },
  
  badges: [
    "protector",
    "communicator",
    "reader",
    "streak_7",
    "explorer"
  ],
  
  activity: {
    chatQuestions: 23,
    storiesCompleted: [
      "story_wedding",
      "story_doubt",
      "story_pressure"
    ],
    articlesRead: [
      "article_hiv_testing",
      "article_morning_after",
      "article_law_103_13"
    ],
    quizzesDone: {
      "quiz_hiv_basics": { score: 5, date: "2025-10-23" },
      "quiz_contraception": { score: 4, date: "2025-10-24" }
    },
    centersVisited: ["alcs_casa", "ampf_rabat"]
  },
  
  settings: {
    notifications: true,
    privateMode: false
  }
}
```

**Chat History (effaçable) :**
```javascript
{
  chatHistory: [
    {
      id: "msg_1",
      sender: "user",
      message: "C'est quoi le VIH ?",
      timestamp: "2025-10-24T10:30:00"
    },
    {
      id: "msg_2",
      sender: "bot",
      message: "Le VIH est un virus...",
      timestamp: "2025-10-24T10:30:02"
    }
  ]
}
```

**Stories Data Structure :**
```javascript
const stories = [
  {
    id: "story_wedding",
    title: {
      fr: "La Soirée de Mariage",
      darija: "L3ers"
    },
    category: "consentement",
    duration: "5 min",
    thumbnail: "/images/wedding.jpg",
    xpReward: 50,
    badgeUnlock: "protector",
    
    steps: [
      {
        type: "intro",
        background: "/images/wedding-1.jpg",
        text: {
          fr: "Tu es à un mariage avec des ami·e·s à Casablanca",
          darija: "Nta/Nti f 3ers m3a s7abek f Casa"
        }
      },
      {
        type: "situation",
        background: "/images/wedding-2.jpg",
        text: {
          fr: "Après la fête, quelqu'un te propose de te raccompagner... seul·e 👀",
          darija: "Mn ba3d l3ers, chi wa7ed/wahda 9alek yewsellek wahdkom"
        }
      },
      {
        type: "choice",
        background: "/images/wedding-3.jpg",
        question: {
          fr: "Que fais-tu ?",
          darija: "Chnou ghadi dir?"
        },
        choices: [
          {
            id: "choice_a",
            text: {
              fr: "J'accepte sans préparation",
              darija: "Nqbel bla ma nwejed rassi"
            },
            correct: false,
            xp: 0
          },
          {
            id: "choice_b",
            text: {
              fr: "J'ai des préservatifs, on peut en parler",
              darija: "3andi les préservatifs, naqder nhder"
            },
            correct: true,
            xp: 50,
            badgeUnlock: "protector"
          },
          {
            id: "choice_c",
            text: {
              fr: "Je rentre avec mes ami·e·s",
              darija: "Nrje3 m3a s7abi"
            },
            correct: true,
            xp: 50,
            badgeUnlock: "self_respect"
          }
        ]
      },
      {
        type: "feedback_bad",
        forChoice: "choice_a",
        background: "red-gradient",
        text: {
          fr: "⚠️ Attention aux risques !",
          darija: "⚠️ Rdd lbalk mn les risques!"
        },
        details: {
          fr: [
            "IST (VIH, syphilis, chlamydia...)",
            "Grossesse non désirée",
            "Absence de consentement clair"
          ],
          darija: [
            "IST (SIDA, syphilis, chlamydia...)",
            "Grossesse ma bghitihash",
            "Ma kansh consentement"
          ]
        }
      },
      {
        type: "feedback_good",
        forChoice: "choice_b",
        background: "green-gradient",
        text: {
          fr: "🎉 Excellente décision !",
          darija: "🎉 Décision mezyana bezzaf!"
        },
        details: {
          fr: "Communication + protection = combo gagnant",
          darija: "Communication + protection = combinaison mzyana"
        },
        animation: "confetti"
      },
      {
        type: "feedback_good",
        forChoice: "choice_c",
        background: "blue-gradient",
        text: {
          fr: "💪 Tu respectes tes limites !",
          darija: "💪 Ka t7tarem lhodoud dyalek!"
        },
        details: {
          fr: "Dire non, c'est ton droit absolu",
          darija: "T9oul la, hadchi haq dyalek"
        }
      },
      {
        type: "learning",
        background: "/images/learning-bg.jpg",
        title: {
          fr: "Ce que tu dois retenir :",
          darija: "Chnou khassek t3ref:"
        },
        points: {
          fr: [
            "Toujours se protéger",
            "Le consentement est obligatoire",
            "Avoir des préservatifs n'est jamais honteux"
          ],
          darija: [
            "Dima waqe3 rasek",
            "Consentement darouri",
            "Préservatifs machi 7chouma"
          ]
        },
        resources: {
          fr: "📍 Où trouver des préservatifs à Casa : Pharmacies (10-30 DH), ALCS (gratuits)",
          darija: "📍 Fin tl9a préservatifs f Casa: Pharmacies (10-30 DH), ALCS (bla flouss)"
        }
      }
    ]
  },
  
  // Story 2, 3, 4, 5... même structure
]
```

**Blog Articles Structure :**
```javascript
const articles = [
  {
    id: "article_hiv_testing",
    category: "prevention",
    title: {
      fr: "Dépistage VIH au Maroc : tout ce que tu dois savoir",
      darija: "Test dyal SIDA f Maroc: koulchi khassek t3ref"
    },
    author: {
      name: "Dr. Amina Khalil",
      title: "Infectiologue, ALCS Casablanca",
      avatar: "/avatars/dr-amina.jpg"
    },
    publishedDate: "2025-10-15",
    readTime: "5 min",
    thumbnail: "/images/hiv-testing.jpg",
    
    content: {
      fr: `
# Dépistage VIH au Maroc : tout ce que tu dois savoir

Le dépistage du VIH est **gratuit, anonyme et accessible** partout au Maroc. Voici tout ce qu'il faut savoir.

## Pourquoi se faire dépister ?

Le dépistage précoce permet de :
- Commencer un traitement rapidement
- Vivre une vie normale et longue
- Protéger ses partenaires

## Où faire le test ?

Au Maroc, plusieurs options s'offrent à toi :

**Les centres ALCS** (Association de Lutte Contre le SIDA)
- Présents dans toutes les grandes villes
- Test **gratuit et anonyme**
- Résultats en 15-30 minutes
- Aucune carte d'identité requise

**Adresses principales :**
- Casablanca : Boulevard Zerktouni
- Rabat : Avenue Hassan II
- Marrakech : Quartier Guéliz
- Tanger : Centre-ville

...
      `,
      darija: `
# Test dyal SIDA f Maroc: koulchi khassek t3ref

Test dyal VIH/SIDA f Maroc **bla flouss, sirri (anonymous), w accessible** f koulchi blayess. Hadi koulchi khassek t3ref.

## 3lach khassek dir test?

Test bakri kayfidek bash:
- Tbda traitement dghya
- T3ich 7aytek 3adiya w twila
- Twaqe3 les partenaires dyalek

...
      `
    },
    
    tags: ["VIH", "SIDA", "dépistage", "ALCS", "gratuit"],
    relatedArticles: ["article_hiv_prevention", "article_ist_common"]
  },
  
  // 9 autres articles...
]
```

**Quiz Structure :**
```javascript
const quizzes = [
  {
    id: "quiz_hiv_basics",
    title: {
      fr: "Quiz VIH/SIDA : Les Bases",
      darija: "Quiz SIDA: Les Bases"
    },
    category: "prevention",
    difficulty: "easy",
    xpReward: 80,
    questions: [
      {
        id: "q1",
        question: {
          fr: "Le dépistage VIH est-il gratuit au Maroc ?",
          darija: "Wash test dyal SIDA bla flouss f Maroc?"
        },
        type: "single_choice",
        options: [
          {
            id: "a",
            text: {
              fr: "Oui, dans les centres ALCS",
              darija: "Ayeh, f les centres ALCS"
            },
            correct: true
          },
          {
            id: "b",
            text: {
              fr: "Non, toujours payant",
              darija: "La, dima khassek tkhelles"
            },
            correct: false
          },
          {
            id: "c",
            text: {
              fr: "Seulement avec ordonnance",
              darija: "Ghir bla ordonnance"
            },
            correct: false
          }
        ],
        explanation: {
          fr: "Le dépistage VIH est totalement gratuit et anonyme dans tous les centres ALCS au Maroc.",
          darija: "Test dyal SIDA bla flouss w sirri f ga3 les centres ALCS f Maroc."
        },
        xp: 20
      },
      
      // 4 autres questions...
    ]
  },
  
  // Autres quiz...
]
```

**Health Centers Data :**
```javascript
const centers = [
  {
    id: "alcs_casa_derb_ghallef",
    type: "alcs",
    name: "ALCS Casablanca - Derb Ghallef",
    city: "Casablanca",
    address: "Boulevard Zerktouni, Derb Ghallef",
    coordinates: [33.5731, -7.5898],
    phone: "0522-XX-XX-XX",
    
    services: {
      fr: [
        "Dépistage VIH/IST gratuit",
        "Conseil personnalisé",
        "Préservatifs gratuits",
        "Accompagnement psychologique"
      ],
      darija: [
        "Test SIDA/IST bla flouss",
        "Conseil personnalisé",
        "Préservatifs bla flouss",
        "Accompagnement psychologique"
      ]
    },
    
    hours: {
      fr: "Lundi - Vendredi : 9h00 - 17h00",
      darija: "Litnayn - Jom3a: 9h - 5h"
    },
    
    rating: 4.8,
    reviewsCount: 124,
    featuredReview: {
      fr: "Personnel très professionnel et discret. Je me suis senti·e en confiance.",
      darija: "Personnel professionnel bezzaf w discret. Kant 3andi confiance."
    },
    
    isOpen: true,
    isFree: true,
    requiresAppointment: false
  },
  
  // 14 autres centres pour différentes villes...
]
```

**XP & Levels System :**
```javascript
const XP_SYSTEM = {
  levels: [
    { level: 1, name: { fr: "Débutant·e", darija: "Mobtadi2" }, minXP: 0, maxXP: 200 },
    { level: 2, name: { fr: "Informé·e", darija: "3aref/a" }, minXP: 200, maxXP: 500 },
    { level: 3, name: { fr: "Expert·e", darija: "Expert/a" }, minXP: 500, maxXP: 1000 },
    { level: 4, name: { fr: "Champion·ne", darija: "Champion/a" }, minXP: 1000, maxXP: 2000 },
    { level: 5, name: { fr: "Ambassadeur·ice", darija: "Ambassadeur/drice" }, minXP: 2000, maxXP: Infinity }
  ],
  
  xpRewards: {
    chatQuestion: 5,
    storyCompleted: 50,
    quizPerfect: 100,
    quizQuestion: 20,
    articleRead: 10,
    centerVisited: 15,
    dailyChallenge: 100,
    streakMaintained: 25,
    badgeUnlocked: 50
  }
}

const BADGES = [
  {
    id: "protector",
    name: { fr: "Protecteur·ice Averti·e", darija: "Protecteur/trice" },
    description: { fr: "A complété la story sur la protection", darija: "Kamel story 3la protection" },
    icon: "🛡️",
    requirement: "complete_story_wedding"
  },
  {
    id: "communicator",
    name: { fr: "Communicateur·ice", darija: "Communicateur/trice" },
    description: { fr: "A posé 20 questions à Dr. Amina", darija: "Souwel 20 sou2al l Dr. Amina" },
    icon: "💬",
    requirement: "chat_questions_20"
  },
  {
    id: "reader",
    name: { fr: "Lecteur·ice Assidu·e", darija: "9ari2/a" },
    description: { fr: "A lu 10 articles complets", darija: "9ra 10 articles kamliin" },
    icon: "📖",
    requirement: "articles_read_10"
  },
  {
    id: "streak_7",
    name: { fr: "Warrior 7 Jours", darija: "Warrior 7 ayyam" },
    description: { fr: "7 jours consécutifs de connexion", darija: "7 ayyam mutataliya connexion" },
    icon: "🔥",
    requirement: "streak_7"
  },
  {
    id: "explorer",
    name: { fr: "Explorateur·ice", darija: "Explorateur/trice" },
    description: { fr: "A visité toutes les sections", darija: "Zar ga3 les sections" },
    icon: "🌟",
    requirement: "visited_all_sections"
  },
  {
    id: "brain_ist",
    name: { fr: "Cerveau IST", darija: "Brain IST" },
    description: { fr: "Score parfait au quiz IST", darija: "Score kamla f quiz IST" },
    icon: "🧠",
    requirement: "quiz_ist_perfect"
  },
  {
    id: "alcs_friend",
    name: { fr: "Ami·e ALCS", darija: "Sa7eb/a ALCS" },
    description: { fr: "A consulté les centres ALCS", darija: "Shaf les centres ALCS" },
    icon: "🏥",
    requirement: "visited_map_alcs"
  },
  {
    id: "consent_champion",
    name: { fr: "Champion·ne Consentement", darija: "Champion/a Consentement" },
    description: { fr: "Maîtrise le consentement", darija: "3aref/a consentement mezyan" },
    icon: "💪",
    requirement: "complete_story_consent"
  },
  {
    id: "taboo_breaker",
    name: { fr: "Briseur·euse de Tabous", darija: "Kasar/a Tabou" },
    description: { fr: "Premier pas vers l'information", darija: "Awal khutwa l l'information" },
    icon: "🗣️",
    requirement: "first_login"
  },
  
  // 6 autres badges...
]
```

## ANIMATIONS & INTERACTIONS

**XP Gain Animation :**
```javascript
// Quand user gagne des XP
- Counter qui monte progressivement (0 → 50)
- Particle effect (petites étoiles qui montent)
- Sound effect subtil (optionnel)
- Si level up → fullscreen celebration
```

**Level Up Celebration :**
```javascript
// Fullscreen modal élégant
┌────────────────────────────────────┐
│                                    │
│         🎉 NIVEAU 3 ! 🎉          │
│                                    │
│         ⭐ Expert·e ⭐             │
│                                    │
│   Tu maîtrises maintenant les      │
│   bases de la santé reproductive   │
│                                    │
│   Continue comme ça ! 💪           │
│                                    │
│        [Continuer]                 │
│                                    │
└────────────────────────────────────┘
// Confetti animation background
```

**Badge Unlock Animation :**
```javascript
// Modal avec badge qui grossit (scale animation)
┌────────────────────────────────────┐
│                                    │
│            🛡️                      │
│    (animation scale + glow)        │
│                                    │
│  Badge Débloqué !                  │
│                                    │
│  Protecteur·ice Averti·e           │
│                                    │
│  Tu connais les méthodes de        │
│  protection essentielles           │
│                                    │
│        [Voir mes badges]           │
│                                    │
└────────────────────────────────────┘
```

**Streak Fire Animation :**
```javascript
// Sur le dashboard, le 🔥 s'anime tous les jours
- Pulse effect
- Color shift (orange → yellow)
- Particles
```

**Story Transition :**
```javascript
// Entre chaque step de story
- Fade out/in
- Slide transition (swipe gesture)
- Progress bars qui se remplissent
```

## RESPONSIVE DESIGN

**Mobile (< 768px) :**
- Bottom navigation (5 items)
- Full-width cards
- Stories en fullscreen vertical
- Chat en fullscreen
- Sidebar hidden, burger menu

**Tablet (768px - 1024px) :**
- Adaptative grid (2 colonnes)
- Bottom nav ou sidebar selon orientation
- Stories peuvent être modal ou fullscreen

**Desktop (> 1024px) :**
- Sidebar navigation fixe à gauche
- Grid 2-3 colonnes pour dashboard
- Stories en modal centered (9:16 ratio)
- Chat peut être split-view ou modal

## ACCESSIBILITY

- ✅ Contraste WCAG AA minimum (4.5:1 texte, 3:1 UI)
- ✅ Navigation clavier (Tab, Enter, Esc)
- ✅ Focus indicators visibles
- ✅ Alt text sur images importantes
- ✅ Aria labels sur boutons icon-only
- ✅ Text zoom jusqu'à 200%
- ✅ Pas d'animations pour users qui préfèrent (prefers-reduced-motion)

## PERFORMANCE

- ✅ Lazy loading images
- ✅ Code splitting par route
- ✅ Optimisation images (WebP, tailles multiples)
- ✅ localStorage limité (< 5MB)
- ✅ Debounce sur search inputs
- ✅ Virtualization si longues listes

## DÉVELOPPEMENT - ORDRE DE PRIORITÉ

### Phase 1 - MVP Hackathon (Essential)
1. ✅ **Setup projet** : React + Tailwind + Router
2. ✅ **Design system** : colors, typography, components de base
3. ✅ **Dashboard** : hero, stats cards, navigation
4. ✅ **Chatbot Dr. Amina** : interface + 10 Q&R en français
5. ✅ **2-3 Stories complètes** : wedding + doubt (FR)
6. ✅ **Page SOS** : 4 cards urgence avec vraies ressources
7. ✅ **Profil** : XP, levels, 5 badges basiques
8. ✅ **localStorage** : save/load user data

### Phase 2 - Si temps au hackathon
9. ✅ **Blog** : 5 articles fictifs avec beau layout
10. ✅ **Carte** : 10 centres avec pins interactifs
11. ✅ **Quiz** : 1 quiz fonctionnel avec feedback
12. ✅ **Darija** : traduction phrases clés chatbot + stories
13. ✅ **Dark mode** : toggle + palette sombre

### Phase 3 - Post-hackathon / Améliorations
14. Mode hors ligne (service worker)
15. Plus de Q&R chatbot (30+)
16. 8 stories complètes
17. 10 articles complets
18. Darija full
19. Animations avancées
20. PWA features

## CONTENT À CRÉER (Minimum pour démo)

**Chatbot - 10 Q&R essentielles (FR) :**
1. "C'est quoi le VIH/SIDA ?"
2. "Comment se transmet le VIH ?"
3. "Où faire un test VIH gratuit au Maroc ?"
4. "C'est quoi une IST ?"
5. "Comment utiliser un préservatif ?"
6. "Où obtenir des préservatifs au Maroc ?"
7. "C'est quoi la pilule du lendemain ?"
8. "C'est quoi le consentement ?"
9. "Que faire en cas de violence ?"
10. "Où obtenir la contraception gratuitement ?"

**Stories - 3 complètes :**
1. La Soirée de Mariage (consentement + protection)
2. Le Doute (post-exposition, dépistage)
3. La Pression du Groupe (dire non)

**Blog - 5 articles :**
1. Dépistage VIH au Maroc
2. Pilule du lendemain : guide complet
3. Loi 103-13 expliquée
4. IST courantes au Maroc
5. Contraception gratuite : où et comment

**Carte - 10 centres :**
- 3 ALCS (Casa, Rabat, Marrakech)
- 2 AMPF (Casa, Rabat)
- 3 CSU (diverses villes)
- 2 Centres VBG (Casa, Rabat)

**Quiz - 1 quiz complet :**
- "VIH/SIDA : Les Bases" (5 questions)

## MESSAGES FINAUX

**Disclaimer visible partout (footer) :**
"💡 WellnessXP fournit des informations éducatives validées par des professionnel·le·s de santé. En cas d'urgence ou pour un diagnostic, consulte un·e médecin."

**About WellnessXP (page optionnelle) :**
```
WellnessXP est une plateforme éducative développée pour le Digi-Hackathon Mobile Health 2025.

Notre mission : rendre l'information sur la santé sexuelle et reproductive accessible, fiable et sans jugement pour tous les jeunes au Maroc.

Partenaires (fictifs pour démo) :
- Ministère de la Santé
- ALCS Maroc
- AMPF
- Fondation Lalla Salma

Contact : contact@wellnessxp.ma (fictif)
```

---

## RÉSUMÉ STYLE & TON

**Design :** Dashboard gamifié adulte, épuré, professionnel mais ludique (Notion + Duolingo)
**Couleurs :** Emerald + Indigo + Violet, mode clair/sombre
**Animations :** Subtiles, professionnelles, micro-interactions
**Ton contenu :** Respectueux, informatif, empathique, sans jugement
**Langues :** Français prioritaire, darija pour phrases clés
**Gamification :** XP, levels, badges, streaks (motivant mais pas enfantin)
**Mobile :** Format stories TikTok/IG vertical, swipeable, immersif

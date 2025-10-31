
export const seedBadges = [
  {
    id: "reel-watcher",
    name: "Observateur de Reels",
    nameAr: "مشاهد الريلز",
    nameEn: "Reel Watcher",
    description: "Regardé 5 reels éducatifs",
    descriptionAr: "شاهدت 5 ريلز تعليمية",
    descriptionEn: "Watched 5 educational reels",
    icon: "🎬",
    requirement: { type: "reels", count: 5 },
    xpReward: 50,
  },
  {
    id: "reel-master",
    name: "Maître des Reels",
    nameAr: "سيد الريلز",
    nameEn: "Reel Master",
    description: "Regardé 15 reels éducatifs",
    descriptionAr: "شاهدت 15 ريلز تعليمية",
    descriptionEn: "Watched 15 educational reels",
    icon: "🏆",
    requirement: { type: "reels", count: 15 },
    xpReward: 100,
  },
  {
    id: "knowledge-seeker",
    name: "Chercheur de Connaissances",
    nameAr: "باحث عن المعرفة",
    nameEn: "Knowledge Seeker",
    description: "Atteint 1000 XP",
    descriptionAr: "وصلت إلى 1000 نقطة خبرة",
    descriptionEn: "Reached 1000 XP",
    icon: "🧠",
    requirement: { type: "xp", count: 1000 },
    xpReward: 200,
  },
  {
    id: "quiz-champion",
    name: "Champion des Quiz",
    nameAr: "بطل الاختبارات",
    nameEn: "Quiz Champion",
    description: "Complété 10 quiz avec succès",
    descriptionAr: "أكملت 10 اختبارات بنجاح",
    descriptionEn: "Completed 10 quizzes successfully",
    icon: "🎯",
    requirement: { type: "quiz", count: 10 },
    xpReward: 150,
  },
  {
    id: "story-lover",
    name: "Amateur d'Histoires",
    nameAr: "عاشق القصص",
    nameEn: "Story Lover",
    description: "Lu 5 histoires complètes",
    descriptionAr: "قرأت 5 قصص كاملة",
    descriptionEn: "Read 5 complete stories",
    icon: "📖",
    requirement: { type: "stories", count: 5 },
    xpReward: 120,
  },
]

export const seedQuizzes = [
  {
    id: "quiz_contraception_basics",
    title: "Connaissances de Base sur la Contraception",
    titleAr: "المعرفة الأساسية حول وسائل منع الحمل",
    titleEn: "Basic Knowledge about Contraception",
    category: "contraception",
    difficulty: "easy",
    xpReward: 100,
    estimatedTime: 5,
    questions: [
      {
        id: "q1",
        question: "Quelle est la méthode contraceptive la plus efficace?",
        questionAr: "ما هي وسيلة منع الحمل الأكثر فعالية؟",
        questionEn: "What is the most effective contraceptive method?",
        options: [
          "Préservatif",
          "Pilule contraceptive",
          "Implant contraceptif",
          "Méthode du retrait",
        ],
        optionsAr: [
          "الواقي الذكري",
          "حبوب منع الحمل",
          "الغرسة المانعة للحمل",
          "طريقة الانسحاب",
        ],
        optionsEn: ["Condom", "Birth control pill", "Contraceptive implant", "Withdrawal method"],
        correctAnswer: 2,
        explanation:
          "L'implant contraceptif a une efficacité de plus de 99% et dure jusqu'à 3 ans.",
        explanationAr: "الغرسة المانعة للحمل لديها فعالية تزيد عن 99٪ وتستمر حتى 3 سنوات.",
        explanationEn: "The contraceptive implant has an effectiveness of over 99% and lasts up to 3 years.",
      },
      {
        id: "q2",
        question: "Le préservatif protège contre:",
        questionAr: "الواقي الذكري يحمي من:",
        questionEn: "The condom protects against:",
        options: [
          "Seulement les grossesses",
          "Seulement les IST",
          "Les grossesses et les IST",
          "Aucun des deux",
        ],
        optionsAr: [
          "الحمل فقط",
          "الأمراض المنقولة جنسياً فقط",
          "الحمل والأمراض المنقولة جنسياً",
          "لا شيء من هذا",
        ],
        optionsEn: [
          "Only pregnancies",
          "Only STIs",
          "Both pregnancies and STIs",
          "Neither",
        ],
        correctAnswer: 2,
        explanation:
          "Le préservatif est la seule méthode qui protège à la fois contre les grossesses non désirées et les infections sexuellement transmissibles.",
        explanationAr:
          "الواقي الذكري هو الطريقة الوحيدة التي تحمي من الحمل غير المرغوب فيه والأمراض المنقولة جنسياً.",
        explanationEn:
          "The condom is the only method that protects against both unwanted pregnancies and sexually transmitted infections.",
      },
      {
        id: "q3",
        question: "À quel âge peut-on commencer à utiliser la contraception?",
        questionAr: "في أي عمر يمكن البدء في استخدام وسائل منع الحمل؟",
        questionEn: "At what age can you start using contraception?",
        options: [
          "Seulement après 18 ans",
          "Après le mariage",
          "Dès le début de l'activité sexuelle",
          "Après avoir eu un enfant",
        ],
        optionsAr: [
          "فقط بعد 18 عاماً",
          "بعد الزواج",
          "منذ بداية النشاط الجنسي",
          "بعد إنجاب طفل",
        ],
        optionsEn: [
          "Only after 18 years",
          "After marriage",
          "From the start of sexual activity",
          "After having a child",
        ],
        correctAnswer: 2,
        explanation:
          "La contraception peut être utilisée dès le début de l'activité sexuelle, quel que soit l'âge ou le statut marital.",
        explanationAr:
          "يمكن استخدام وسائل منع الحمل منذ بداية النشاط الجنسي، بغض النظر عن العمر أو الحالة الزوجية.",
        explanationEn:
          "Contraception can be used from the start of sexual activity, regardless of age or marital status.",
      },
    ],
    createdAt: new Date().toISOString(),
  },
  {
    id: "quiz_consent_understanding",
    title: "Comprendre le Consentement",
    titleAr: "فهم الموافقة",
    titleEn: "Understanding Consent",
    category: "consent",
    difficulty: "easy",
    xpReward: 80,
    estimatedTime: 4,
    questions: [
      {
        id: "q1",
        question: "Le consentement doit être:",
        questionAr: "يجب أن تكون الموافقة:",
        questionEn: "Consent must be:",
        options: [
          "Donné une seule fois",
          "Clair, libre et enthousiaste",
          "Implicite",
          "Permanent",
        ],
        optionsAr: ["معطاة مرة واحدة", "واضحة وحرة ومتحمسة", "ضمنية", "دائمة"],
        optionsEn: ["Given once", "Clear, free and enthusiastic", "Implicit", "Permanent"],
        correctAnswer: 1,
        explanation:
          "Le consentement doit toujours être clair, donné librement et avec enthousiasme. Il peut être retiré à tout moment.",
        explanationAr:
          "يجب أن تكون الموافقة دائماً واضحة ومعطاة بحرية وبحماس. يمكن سحبها في أي وقت.",
        explanationEn:
          "Consent must always be clear, given freely and enthusiastically. It can be withdrawn at any time.",
      },
      {
        id: "q2",
        question: "Peut-on retirer son consentement après l'avoir donné?",
        questionAr: "هل يمكن سحب الموافقة بعد إعطائها؟",
        questionEn: "Can consent be withdrawn after being given?",
        options: [
          "Non, une fois donné c'est définitif",
          "Oui, à tout moment",
          "Seulement avant de commencer",
          "Non, ce serait impoli",
        ],
        optionsAr: [
          "لا، بمجرد إعطائها تكون نهائية",
          "نعم، في أي وقت",
          "فقط قبل البدء",
          "لا، سيكون ذلك غير مهذب",
        ],
        optionsEn: [
          "No, once given it's final",
          "Yes, at any time",
          "Only before starting",
          "No, it would be rude",
        ],
        correctAnswer: 1,
        explanation:
          "Le consentement peut être retiré à n'importe quel moment. Tout le monde a le droit de changer d'avis.",
        explanationAr: "يمكن سحب الموافقة في أي لحظة. كل شخص له الحق في تغيير رأيه.",
        explanationEn: "Consent can be withdrawn at any time. Everyone has the right to change their mind.",
      },
    ],
    createdAt: new Date().toISOString(),
  },
  {
    id: "quiz_sti_prevention",
    title: "Prévention des IST",
    titleAr: "الوقاية من الأمراض المنقولة جنسياً",
    titleEn: "STI Prevention",
    category: "prevention",
    difficulty: "medium",
    xpReward: 120,
    estimatedTime: 6,
    questions: [
      {
        id: "q1",
        question: "Quelle est la meilleure protection contre les IST?",
        questionAr: "ما هي أفضل حماية ضد الأمراض المنقولة جنسياً؟",
        questionEn: "What is the best protection against STIs?",
        options: [
          "L'abstinence seulement",
          "Le préservatif",
          "La pilule contraceptive",
          "Le dépistage régulier",
        ],
        optionsAr: [
          "الامتناع فقط",
          "الواقي الذكري",
          "حبوب منع الحمل",
          "الفحص المنتظم",
        ],
        optionsEn: ["Abstinence only", "Condom", "Birth control pill", "Regular screening"],
        correctAnswer: 1,
        explanation:
          "Le préservatif, lorsqu'il est utilisé correctement, est la meilleure protection contre les IST lors des rapports sexuels.",
        explanationAr:
          "الواقي الذكري، عند استخدامه بشكل صحيح، هو أفضل حماية ضد الأمراض المنقولة جنسياً أثناء العلاقات الجنسية.",
        explanationEn:
          "The condom, when used correctly, is the best protection against STIs during sexual intercourse.",
      },
      {
        id: "q2",
        question: "Les IST peuvent être transmises par:",
        questionAr: "يمكن نقل الأمراض المنقولة جنسياً عن طريق:",
        questionEn: "STIs can be transmitted through:",
        options: [
          "Seulement les rapports vaginaux",
          "Tous types de rapports sexuels",
          "Les toilettes publiques",
          "Les poignées de main",
        ],
        optionsAr: [
          "العلاقات المهبلية فقط",
          "جميع أنواع العلاقات الجنسية",
          "المراحيض العامة",
          "المصافحة",
        ],
        optionsEn: [
          "Only vaginal intercourse",
          "All types of sexual intercourse",
          "Public toilets",
          "Handshakes",
        ],
        correctAnswer: 1,
        explanation:
          "Les IST peuvent être transmises par tous types de rapports sexuels: vaginaux, anaux et oraux.",
        explanationAr:
          "يمكن نقل الأمراض المنقولة جنسياً عن طريق جميع أنواع العلاقات الجنسية: المهبلية والشرجية والفموية.",
        explanationEn:
          "STIs can be transmitted through all types of sexual intercourse: vaginal, anal and oral.",
      },
    ],
    createdAt: new Date().toISOString(),
  },
]

export const seedStories = [
  {
    id: "story_amina_choice",
    title: "Le Choix d'Amina",
    titleAr: "اختيار أمينة",
    titleEn: "Amina's Choice",
    description: "Amina fait face à une décision importante concernant sa santé reproductive",
    descriptionAr: "تواجه أمينة قراراً مهماً بشأن صحتها الإنجابية",
    descriptionEn: "Amina faces an important decision about her reproductive health",
    category: "contraception",
    coverImage: "👧",
    difficulty: "easy",
    xpReward: 150,
    estimatedTime: 10,
    chapters: [
      {
        id: 1,
        content:
          "Amina, 19 ans, étudiante à l'université, vient de commencer une relation sérieuse avec Karim. Ils parlent de leur avenir ensemble et Amina se pose des questions sur la contraception.",
        contentAr:
          "أمينة، 19 عاماً، طالبة في الجامعة، بدأت للتو علاقة جدية مع كريم. يتحدثان عن مستقبلهما معاً وأمينة تتساءل عن وسائل منع الحمل.",
        contentEn:
          "Amina, 19, a university student, has just started a serious relationship with Karim. They talk about their future together and Amina wonders about contraception.",
        choices: [
          {
            text: "Parler à Karim de ses préoccupations",
            textAr: "التحدث إلى كريم عن مخاوفها",
            textEn: "Talk to Karim about her concerns",
            nextChapter: 2,
            xp: 20,
            feedback: "Excellente décision! La communication est essentielle.",
            feedbackAr: "قرار ممتاز! التواصل أساسي.",
            feedbackEn: "Excellent decision! Communication is essential.",
          },
          {
            text: "Consulter un professionnel de santé seule",
            textAr: "استشارة أخصائي صحي بمفردها",
            textEn: "Consult a healthcare professional alone",
            nextChapter: 3,
            xp: 15,
            feedback: "Bon choix! Prendre soin de sa santé est important.",
            feedbackAr: "اختيار جيد! العناية بصحتها مهم.",
            feedbackEn: "Good choice! Taking care of one's health is important.",
          },
          {
            text: "Ne rien faire et espérer que tout ira bien",
            textAr: "عدم فعل أي شيء والأمل أن كل شيء سيكون على ما يرام",
            textEn: "Do nothing and hope everything will be fine",
            nextChapter: 4,
            xp: 0,
            feedback: "Ce n'est pas la meilleure approche. Il vaut mieux être proactive.",
            feedbackAr: "هذا ليس أفضل نهج. من الأفضل أن تكون استباقية.",
            feedbackEn: "This is not the best approach. It's better to be proactive.",
          },
        ],
      },
      {
        id: 2,
        content:
          "Amina décide de parler à Karim. Il est compréhensif et propose d'aller ensemble consulter un professionnel de santé. Ils prennent rendez-vous dans un centre de planification familiale.",
        contentAr:
          "قررت أمينة التحدث إلى كريم. هو متفهم ويقترح الذهاب معاً لاستشارة أخصائي صحي. يحددان موعداً في مركز تنظيم الأسرة.",
        contentEn:
          "Amina decides to talk to Karim. He is understanding and suggests going together to consult a healthcare professional. They make an appointment at a family planning center.",
        choices: [
          {
            text: "Aller au rendez-vous ensemble",
            textAr: "الذهاب إلى الموعد معاً",
            textEn: "Go to the appointment together",
            nextChapter: 5,
            xp: 30,
            feedback: "Parfait! Prendre des décisions ensemble renforce la relation.",
            feedbackAr: "مثالي! اتخاذ القرارات معاً يقوي العلاقة.",
            feedbackEn: "Perfect! Making decisions together strengthens the relationship.",
          },
        ],
      },
      {
        id: 3,
        content:
          "Amina se rend seule à un centre de santé. Le médecin l'accueille chaleureusement et lui explique toutes les options de contraception disponibles.",
        contentAr:
          "تذهب أمينة بمفردها إلى مركز صحي. يستقبلها الطبيب بحرارة ويشرح لها جميع خيارات منع الحمل المتاحة.",
        contentEn:
          "Amina goes alone to a health center. The doctor welcomes her warmly and explains all available contraception options.",
        choices: [
          {
            text: "Poser toutes ses questions au médecin",
            textAr: "طرح جميع أسئلتها على الطبيب",
            textEn: "Ask all her questions to the doctor",
            nextChapter: 5,
            xp: 25,
            feedback: "Excellent! N'hésitez jamais à poser des questions à votre médecin.",
            feedbackAr: "ممتاز! لا تتردد أبداً في طرح الأسئلة على طبيبك.",
            feedbackEn: "Excellent! Never hesitate to ask your doctor questions.",
          },
        ],
      },
      {
        id: 4,
        content:
          "Amina décide de ne rien faire. Quelques mois plus tard, elle se retrouve face à une grossesse non planifiée. Elle regrette de ne pas avoir été plus proactive.",
        contentAr:
          "قررت أمينة عدم فعل أي شيء. بعد بضعة أشهر، تجد نفسها أمام حمل غير مخطط له. تندم على عدم كونها أكثر استباقية.",
        contentEn:
          "Amina decides to do nothing. A few months later, she faces an unplanned pregnancy. She regrets not being more proactive.",
        choices: [
          {
            text: "Recommencer et faire un meilleur choix",
            textAr: "البدء من جديد واتخاذ خيار أفضل",
            textEn: "Start over and make a better choice",
            nextChapter: 1,
            xp: 5,
            feedback: "On apprend de ses erreurs. Essayons à nouveau!",
            feedbackAr: "نتعلم من أخطائنا. لنحاول مرة أخرى!",
            feedbackEn: "We learn from our mistakes. Let's try again!",
          },
        ],
      },
      {
        id: 5,
        content:
          "Après avoir écouté toutes les options, Amina choisit une méthode de contraception adaptée à sa situation. Elle se sent confiante et informée sur sa santé reproductive.",
        contentAr:
          "بعد الاستماع إلى جميع الخيارات، تختار أمينة طريقة لمنع الحمل مناسبة لحالتها. تشعر بالثقة والمعرفة حول صحتها الإنجابية.",
        contentEn:
          "After listening to all the options, Amina chooses a contraception method suitable for her situation. She feels confident and informed about her reproductive health.",
        choices: [
          {
            text: "Terminer l'histoire",
            textAr: "إنهاء القصة",
            textEn: "Finish the story",
            nextChapter: -1,
            xp: 50,
            feedback:
              "Félicitations! Vous avez aidé Amina à prendre une décision éclairée sur sa santé reproductive.",
            feedbackAr: "تهانينا! لقد ساعدت أمينة على اتخاذ قرار مستنير بشأن صحتها الإنجابية.",
            feedbackEn:
              "Congratulations! You helped Amina make an informed decision about her reproductive health.",
          },
        ],
      },
    ],
    createdAt: new Date().toISOString(),
  },
]

export const seedHealthCenters = [
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
  },
]


// reels

// In your seed-data.ts or create new data
export const seedReels =
  [
  {
    "id": "reel_consentement",
    "title": "Consentement: C'est Quoi?",
    "titleAr": "الموافقة: ما هي؟",
    "titleEn": "Consent: What Is It?",
    "description": "Le consentement est un accord clair, enthousiaste et continu entre les partenaires.",
    "descriptionAr": "الموافقة هي اتفاق واضح ومتحمس ومستمر بين الشريكين.",
    "descriptionEn": "Consent is a clear, enthusiastic, and ongoing agreement between partners.",
    "topic": "Consentement",
    "topicAr": "الموافقة",
    "topicEn": "Consent",
    "category": "health",
    "difficulty": "easy",
    "duration": 38,
    "educational": true,
    "views": 3200,
    "likes": 521,
    "liked": false,
    "points": 50,
    "videoColor": "from-indigo-500 to-blue-500",
    "icon": "🤝",
    "createdAt": "2025-10-30T00:27:30.220Z"
  },
  {
    "id": "reel_prevention_ist",
    "title": "Prévention des ISTs",
    "titleAr": "الوقاية من الأمراض المنقولة جنسياً",
    "titleEn": "Prevention of STIs",
    "description": "Apprenez comment vous protéger contre les infections sexuellement transmissibles.",
    "descriptionAr": "تعلم كيف تحمي نفسك من العدوى المنقولة جنسياً.",
    "descriptionEn": "Learn how to protect yourself from sexually transmitted infections.",
    "topic": "Prévention",
    "topicAr": "الوقاية",
    "topicEn": "Prevention",
    "category": "health",
    "difficulty": "medium",
    "duration": 52,
    "educational": true,
    "views": 1800,
    "likes": 289,
    "liked": false,
    "points": 75,
    "videoColor": "from-violet-500 to-purple-500",
    "icon": "🛡️",
    "createdAt": "2025-10-30T00:27:30.220Z"
  },
  {
    "id": "reel_contraception",
    "title": "Contraception: Options Disponibles",
    "titleAr": "وسائل منع الحمل: الخيارات المتاحة",
    "titleEn": "Contraception: Available Options",
    "description": "Explorez les différentes méthodes de contraception et trouvez celle qui vous convient.",
    "descriptionAr": "استكشف وسائل منع الحمل المختلفة واختر الأنسب لك.",
    "descriptionEn": "Explore different methods of contraception and find the one that suits you.",
    "topic": "Contraception",
    "topicAr": "وسائل منع الحمل",
    "topicEn": "Contraception",
    "category": "health",
    "difficulty": "medium",
    "duration": 48,
    "educational": true,
    "views": 2100,
    "likes": 412,
    "liked": false,
    "points": 60,
    "videoColor": "from-pink-500 to-rose-500",
    "icon": "💊",
    "createdAt": "2025-10-30T00:27:30.220Z"
  },
  {
    "id": "reel_sante_mentale",
    "title": "Santé Mentale & Bien-être",
    "titleAr": "الصحة النفسية والرفاهية",
    "titleEn": "Mental Health & Well-being",
    "description": "Votre santé mentale est aussi importante que votre santé physique.",
    "descriptionAr": "صحتك النفسية مهمة بقدر صحتك الجسدية.",
    "descriptionEn": "Your mental health is just as important as your physical health.",
    "topic": "Bien-être",
    "topicAr": "الرفاهية",
    "topicEn": "Well-being",
    "category": "health",
    "difficulty": "easy",
    "duration": 41,
    "educational": true,
    "views": 2800,
    "likes": 456,
    "liked": false,
    "points": 55,
    "videoColor": "from-cyan-500 to-blue-500",
    "icon": "🧠",
    "createdAt": "2025-10-30T00:27:30.220Z"
  },
  
]

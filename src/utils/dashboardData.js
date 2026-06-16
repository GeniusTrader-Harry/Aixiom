// Student dashboard data — edit this file to manage access codes,
// course materials, and mentors shown in the dashboard.
//
// NOTE: this is a client-side gate only (no backend). Access codes keep
// casual visitors out but are not real security — don't link anything
// truly confidential here.

export const ACCESS_CODES = [
  'COOPER-5LSQ', // Cooper's code — give to your own students
  'HARRY-TYDW', // Harry's code — give to his students
]

export const courseMaterials = [
  {
    id: 'alevel-econ',
    subject: { en: 'A-Level Economics', zh: 'A-Level 经济学' },
    description: {
      en: 'Lesson slides, past-paper packs, and the curated reading list.',
      zh: '课程讲义、历年真题合集与精选阅读书单。',
    },
    icon: 'FaChartLine',
    materials: [
      {
        title: { en: 'Economics Reading List', zh: '经济学阅读书单' },
        type: 'link',
        url: 'https://docs.google.com/spreadsheets/d/1R6sQ5eBFC2oZENr46G8NnnV9lyrWAwa4RYGlzm8s_2c/edit?gid=1678606726#gid=1678606726',
      },
      {
        title: { en: 'Lesson Slides (Google Drive)', zh: '课程讲义（Google Drive）' },
        type: 'drive',
        url: '#', // TODO: paste your Drive folder link
      },
      {
        title: { en: 'Past Paper Pack', zh: '历年真题合集' },
        type: 'file',
        url: '#', // TODO: paste your Drive folder link
      },
    ],
  },
  {
    id: 'igcse',
    subject: { en: 'IGCSE Economics', zh: 'IGCSE 经济学' },
    description: {
      en: 'Structured notes and exam practice for IGCSE students.',
      zh: '为IGCSE学生准备的结构化笔记与考试练习。',
    },
    icon: 'FaGlobe',
    materials: [
      {
        title: { en: 'Course Notes', zh: '课程笔记' },
        type: 'file',
        url: '#', // TODO: paste link
      },
      {
        title: { en: 'Exam Practice Sets', zh: '考试练习题' },
        type: 'file',
        url: '#', // TODO: paste link
      },
    ],
  },
  {
    id: 'ielts',
    subject: { en: 'IELTS', zh: '雅思' },
    description: {
      en: 'Preparation materials for Listening, Reading, Writing, and Speaking.',
      zh: '听力、阅读、写作和口语四项备考资料。',
    },
    icon: 'FaLanguage',
    materials: [
      {
        title: { en: 'Writing Task Bank', zh: '写作题库' },
        type: 'file',
        url: '#', // TODO: paste link
      },
      {
        title: { en: 'Speaking Practice Prompts', zh: '口语练习题' },
        type: 'file',
        url: '#', // TODO: paste link
      },
    ],
  },
  {
    id: 'epq',
    subject: { en: 'EPQ', zh: 'EPQ 拓展项目' },
    description: {
      en: 'Extended Project Qualification — topic selection, research methods, and dissertation structure.',
      zh: '拓展项目资格（EPQ）——选题指导、研究方法与论文结构。',
    },
    icon: 'FaLightbulb',
    materials: [
      {
        title: { en: 'EPQ Planning Guide', zh: 'EPQ规划指南' },
        type: 'file',
        url: '#', // TODO: paste link
      },
      {
        title: { en: 'Research & Referencing Toolkit', zh: '研究与引用工具包' },
        type: 'file',
        url: '#', // TODO: paste link
      },
    ],
  },
  {
    id: 'pf-debate',
    subject: { en: 'PF Debate', zh: '公共论坛辩论' },
    description: {
      en: 'Case construction templates, rebuttal drills, and round recordings.',
      zh: '立论模板、反驳训练与比赛录像。',
    },
    icon: 'FaComments',
    materials: [
      {
        title: { en: 'Case Construction Template', zh: '立论模板' },
        type: 'file',
        url: '#', // TODO: paste link
      },
    ],
  },
]

export const mentors = [
  {
    id: 'cooper-wu',
    name: 'Cooper Wu',
    role: { en: 'Head Mentor · Economics & UK Admissions', zh: '首席导师 · 经济学与英国申请' },
    bio: {
      en: 'PPE at UCL. Leads A-Level Economics tutoring and UK/Oxbridge application mentoring.',
      zh: '伦敦大学学院PPE专业。负责A-Level经济学辅导与英国/牛剑申请指导。',
    },
    emoji: '🎓',
    calendly: 'https://calendly.com/wucooper464/new-meeting',
  },
  {
    id: 'harry-zhu',
    name: 'Harry Zhu',
    role: { en: 'Head Mentor · UK Admissions, Economics & Maths', zh: '首席导师 · 英国申请、经济学与数学' },
    bio: {
      en: 'Economics, Finance & Data Science at Imperial College London. Specialises in monetary and behavioural economics, Maths, and UK admissions mentoring.',
      zh: '帝国理工学院经济、金融与数据科学专业。专注于货币与行为经济学、数学辅导及英国申请指导。',
    },
    emoji: '📈',
    calendly: 'https://calendly.com/harry-w-zhu/1v1-mentor-session',
  },
]

// Everything we offer — shown in the "Session type" dropdown of the
// request form. `en` is stored in booking records and emails; `zh` is
// what Chinese-language users see in the dropdown.
export const sessionTypes = [
  { en: 'A-Level', zh: 'A-Level' },
  { en: 'IGCSE', zh: 'IGCSE' },
  { en: 'AP', zh: 'AP' },
  { en: 'IELTS', zh: '雅思' },
  { en: 'PF Debate', zh: '公共论坛辩论' },
  { en: 'EPQ', zh: 'EPQ' },
  { en: 'University Admissions (AiXiom Academy)', zh: '大学申请（AiXiom学院）' },
]

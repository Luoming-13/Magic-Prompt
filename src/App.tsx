import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

// 翻译字典
const translations = {
  // Nanobana 字段
  subject: { zh: '主体描述', en: 'Subject' },
  environment: { zh: '环境与背景', en: 'Environment' },
  lighting: { zh: '光影氛围', en: 'Lighting' },
  composition: { zh: '画面构图', en: 'Composition' },
  style: { zh: '艺术风格', en: 'Art Style' },

  // Midjourney 字段
  mjSubject: { zh: '画面主体', en: 'Subject' },
  medium: { zh: '媒介与材质', en: 'Medium' },
  mjEnvironment: { zh: '环境与光影', en: 'Environment' },
  mjStyle: { zh: '艺术风格', en: 'Art Style' },
  aspectRatio: { zh: '画面比例参数', en: 'Aspect Ratio' },
  stylize: { zh: '风格化程度', en: 'Stylize' },

  // Seedance 字段
  cameraMovement: { zh: '镜头语言', en: 'Camera Movement' },
  sdSubject: { zh: '核心主体', en: 'Subject' },
  sdEnvironment: { zh: '环境氛围', en: 'Environment' },
  sdLighting: { zh: '色调与光影', en: 'Tone & Lighting' },
  quality: { zh: '终极画质', en: 'Quality' },

  // 下拉选项
  none: { zh: '无', en: 'None' },
  naturalLight: { zh: '自然光', en: 'Natural Light' },
  cinematicLight: { zh: '电影光', en: 'Cinematic Light' },
  neonLight: { zh: '霓虹灯', en: 'Neon Light' },
  closeUp: { zh: '特写', en: 'Close-up' },
  mediumShot: { zh: '中景', en: 'Medium Shot' },
  longShot: { zh: '远景', en: 'Long Shot' },
  wideAngle: { zh: '广角', en: 'Wide Angle' },
  closeUpShot: { zh: '特写镜头', en: 'Close-up Shot' },
  pushShot: { zh: '推镜头', en: 'Push Shot' },
  aerialView: { zh: '航拍视角', en: 'Aerial View' },
  followShot: { zh: '跟随运镜', en: 'Follow Shot' },
  cinematicQuality: { zh: '电影级极高画质', en: 'Cinematic Quality' },
  resolution8k: { zh: '8k分辨率', en: '8K Resolution' },
  masterpiece: { zh: '杰作', en: 'Masterpiece' },

  // 画面比例选项
  ratio16_9: { zh: '16:9 (宽屏)', en: '16:9 (Widescreen)' },
  ratio9_16: { zh: '9:16 (竖屏)', en: '9:16 (Portrait)' },
  ratio1_1: { zh: '1:1 (正方形)', en: '1:1 (Square)' },
  ratio21_9: { zh: '21:9 (超宽)', en: '21:9 (Ultrawide)' },

  // 风格化程度滑块
  realistic: { zh: '写实', en: 'Realistic' },
  artistic: { zh: '艺术', en: 'Artistic' },

  // 按钮
  copyPrompt: { zh: '复制提示词', en: 'Copy Prompt' },
  copied: { zh: '已复制!', en: 'Copied!' },
  copy: { zh: '复制', en: 'Copy' },
  reset: { zh: '重置', en: 'Reset' },

  // 占位符
  placeholderSubject: { zh: '描述你想要生成的主体...', en: 'Describe your subject...' },
  placeholderEnv: { zh: '例如：森林、城市街道...', en: 'e.g., forest, city street...' },
  placeholderStyle: { zh: '例如：极简主义、赛博朋克...', en: 'e.g., minimalist, cyberpunk...' },
  placeholderMjSubject: { zh: '例如：Cyberpunk knight', en: 'e.g., Cyberpunk knight' },
  placeholderMedium: { zh: '例如：Oil painting, Unreal Engine 5', en: 'e.g., Oil painting, Unreal Engine 5' },
  placeholderMjEnv: { zh: '例如：Tokyo street, neon lighting', en: 'e.g., Tokyo street, neon lighting' },
  placeholderMjStyle: { zh: '例如：Concept art, hyper-realistic', en: 'e.g., Concept art, hyper-realistic' },
  placeholderSdSubject: { zh: '例如：身穿红色机甲的赛博朋克武士', en: 'e.g., Cyberpunk samurai in red mech armor' },
  placeholderSdEnv: { zh: '例如：雨后的废土城市，充满霓虹灯', en: 'e.g., Post-apocalyptic city with neon lights' },
  placeholderSdLighting: { zh: '例如：赛博朋克色调，丁达尔光效', en: 'e.g., Cyberpunk tones, Tyndall effect' },

  // 预览区
  previewPlaceholder: { zh: '在左侧填写参数后，提示词将在这里实时显示...', en: 'Fill in the parameters on the left, the prompt will be displayed here...' },
  selectLighting: { zh: '选择光影氛围', en: 'Select lighting' },
  selectComposition: { zh: '选择画面构图', en: 'Select composition' },
  selectRatio: { zh: '选择画面比例', en: 'Select aspect ratio' },
  selectCamera: { zh: '选择镜头语言', en: 'Select camera movement' },
  selectQuality: { zh: '选择画质', en: 'Select quality' },
}

// 获取翻译
const t = (key: keyof typeof translations, isEnglish: boolean) => {
  return isEnglish ? translations[key].en : translations[key].zh
}

// Nanobana 表单数据
interface NanobanaFormData {
  subject: string
  environment: string
  lighting: string
  composition: string
  style: string
}

// Midjourney 表单数据
interface MidjourneyFormData {
  subject: string
  medium: string
  environment: string
  style: string
  aspectRatio: string
  stylize: number
}

// Seedance 表单数据
interface SeedanceFormData {
  cameraMovement: string
  subject: string
  environment: string
  lighting: string
  quality: string
}

function App() {
  const [activeModel, setActiveModel] = useState('nanobana')
  const [copied, setCopied] = useState(false)
  const [isEnglish, setIsEnglish] = useState(false)

  // Nanobana 表单状态
  const [nanobanaData, setNanobanaData] = useState<NanobanaFormData>({
    subject: '',
    environment: '',
    lighting: '无',
    composition: '无',
    style: ''
  })

  // Midjourney 表单状态
  const [midjourneyData, setMidjourneyData] = useState<MidjourneyFormData>({
    subject: '',
    medium: '',
    environment: '',
    style: '',
    aspectRatio: '16:9',
    stylize: 250
  })

  // Seedance 表单状态
  const [seedanceData, setSeedanceData] = useState<SeedanceFormData>({
    cameraMovement: '无',
    subject: '',
    environment: '',
    lighting: '',
    quality: '无'
  })

  const models = [
    { id: 'nanobana', label: 'Nanobana', bgImage: '/images/nanobanabg.jpg', tabImage: '/images/nanobana.jpg' },
    { id: 'midjourney', label: 'Midjourney', bgImage: '/images/mjbg.jpg', tabImage: '/images/mj.jpg' },
    { id: 'seedance', label: 'Seedance', bgImage: '/images/seedancebg.jpg', tabImage: '/images/seedance.jpg' },
  ]

  // 当前模型的背景图片
  const currentBgImage = models.find(m => m.id === activeModel)?.bgImage

  // Nanobana 提示词生成
  const generateNanobanaPrompt = (): string => {
    const parts: string[] = []

    if (nanobanaData.subject) {
      parts.push(nanobanaData.subject)
    }
    if (nanobanaData.environment) {
      parts.push(`situated in ${nanobanaData.environment}`)
    }
    if (nanobanaData.lighting && nanobanaData.lighting !== '无') {
      parts.push(`illuminated by ${nanobanaData.lighting}`)
    }
    if (nanobanaData.composition && nanobanaData.composition !== '无') {
      parts.push(`${nanobanaData.composition} shot`)
    }
    if (nanobanaData.style) {
      parts.push(`styled as ${nanobanaData.style}`)
    }

    return parts.join(', ')
  }

  // Midjourney 提示词生成
  const generateMidjourneyPrompt = (): string => {
    const parts: string[] = []

    if (midjourneyData.subject) {
      parts.push(midjourneyData.subject)
    }
    if (midjourneyData.medium) {
      parts.push(midjourneyData.medium)
    }
    if (midjourneyData.environment) {
      parts.push(midjourneyData.environment)
    }
    if (midjourneyData.style) {
      parts.push(midjourneyData.style)
    }

    // 添加参数后缀
    const params = []
    if (midjourneyData.aspectRatio) {
      params.push(`--ar ${midjourneyData.aspectRatio}`)
    }
    params.push('--v 6.1')
    params.push(`--stylize ${midjourneyData.stylize}`)

    const content = parts.join(', ')
    const paramStr = params.join(' ')

    return content ? `${content} ${paramStr}` : paramStr
  }

  // Seedance 提示词生成（使用中文逗号）
  const generateSeedancePrompt = (): string => {
    const parts: string[] = []

    if (seedanceData.cameraMovement && seedanceData.cameraMovement !== '无') {
      parts.push(seedanceData.cameraMovement)
    }
    if (seedanceData.subject) {
      parts.push(seedanceData.subject)
    }
    if (seedanceData.environment) {
      parts.push(seedanceData.environment)
    }
    if (seedanceData.lighting) {
      parts.push(seedanceData.lighting)
    }
    if (seedanceData.quality && seedanceData.quality !== '无') {
      parts.push(seedanceData.quality)
    }

    return parts.join('，') // 使用中文逗号
  }

  // 根据模型生成提示词
  const generatePrompt = (): string => {
    switch (activeModel) {
      case 'nanobana':
        return generateNanobanaPrompt()
      case 'midjourney':
        return generateMidjourneyPrompt()
      case 'seedance':
        return generateSeedancePrompt()
      default:
        return ''
    }
  }

  const handleCopy = async () => {
    const prompt = generatePrompt()
    if (prompt) {
      await navigator.clipboard.writeText(prompt)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  // 重置当前模型的表单
  const handleReset = () => {
    if (activeModel === 'nanobana') {
      setNanobanaData({
        subject: '',
        environment: '',
        lighting: '无',
        composition: '无',
        style: ''
      })
    } else if (activeModel === 'midjourney') {
      setMidjourneyData({
        subject: '',
        medium: '',
        environment: '',
        style: '',
        aspectRatio: '16:9',
        stylize: 250
      })
    } else if (activeModel === 'seedance') {
      setSeedanceData({
        cameraMovement: '无',
        subject: '',
        environment: '',
        lighting: '',
        quality: '无'
      })
    }
  }

  return (
    <div className="bg-crt min-h-screen">
      {/* 背景图片层 */}
      <div
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: `url(${currentBgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          transition: 'background-image 0.5s ease'
        }}
      />
      {/* 半透明黑色遮罩 */}
      <div className="fixed inset-0 z-0 bg-black/70" />
      {/* ═══════════════════════════════════════════════════════════
          顶部导航栏
          ═══════════════════════════════════════════════════════════ */}
      <header className="nav-header">
        <div className="mx-auto max-w-[1600px] px-4 py-2">
          <div className="flex items-center justify-between">
            <h1 className="nav-brand">
              MAGIC PROMPT
            </h1>
            <div className="flex-1" /> {/* 中间占位 */}
            <div className="flex justify-end">
              <button
                onClick={() => setIsEnglish(!isEnglish)}
                className="lang-switch"
              >
                <span className={`lang-zh ${isEnglish ? 'text-[var(--text-dim)]' : ''}`}>中</span>
                <span className="separator">|</span>
                <span className={`lang-en ${isEnglish ? '' : 'text-[var(--text-dim)]'}`}>En</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ═══════════════════════════════════════════════════════════
          模型切换标签
          ═══════════════════════════════════════════════════════════ */}
      <section className="relative z-10 py-8 flex justify-center">
        <nav className="model-tabs model-tabs-large">
          {models.map((model) => (
            <button
              key={model.id}
              className={`model-tab model-tab-large ${activeModel === model.id ? 'active' : ''}`}
              onClick={() => setActiveModel(model.id)}
              style={{
                backgroundImage: activeModel === model.id ? `url(${model.tabImage})` : 'none',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              <span className="relative z-10">{model.label}</span>
              {/* 背景遮罩 */}
              <span
                className={`absolute inset-0 transition-all ${
                  activeModel === model.id
                    ? 'bg-black/40'
                    : 'bg-black/60 hover:bg-black/50'
                }`}
                style={{ borderRadius: '6px' }}
              />
            </button>
          ))}
        </nav>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          主体区域 - 两个独立卡片
          ═══════════════════════════════════════════════════════════ */}
      <main className="relative z-10 mx-auto max-w-[1600px] px-4 py-8">
        <div className="flex gap-6">
          {/* 左侧参数配置卡片 - 40% */}
          <div className="w-[40%] game-card animate-fade-up animate-delay-1">
            <div className="game-card-header">
              <h2 className="game-card-title">
                PROMPT OPTIONS
                <span className="title-divider">|</span>
                <span className="title-accent">
                  {models.find(m => m.id === activeModel)?.label?.toUpperCase()}
                </span>
              </h2>
            </div>
            <div className="game-card-content">
              <div className="space-y-6">
                {/* 表单区域 - Nanobana */}
                {activeModel === 'nanobana' && (
                  <div className="space-y-5">
                    {/* 主体描述 */}
                    <div className="space-y-2">
                      <Label className="text-xs font-medium text-[var(--text-gray)] uppercase tracking-wider">
                        {t('subject', isEnglish)} <span className="text-[var(--finals-red)]">*</span>
                      </Label>
                      <Textarea
                        value={nanobanaData.subject}
                        onChange={(e) => setNanobanaData({ ...nanobanaData, subject: e.target.value })}
                        placeholder={t('placeholderSubject', isEnglish)}
                        rows={3}
                        className="bg-[var(--bg-card)] border-2 border-[var(--text-dim)] text-[var(--text-white)] placeholder:text-[var(--text-dim)] focus:border-[var(--finals-red)] focus:ring-0 resize-none"
                      />
                    </div>

                    {/* 环境与背景 */}
                    <div className="space-y-2">
                      <Label className="text-xs font-medium text-[var(--text-white)] uppercase tracking-wider">
                        {t('environment', isEnglish)}
                      </Label>
                      <Input
                        value={nanobanaData.environment}
                        onChange={(e) => setNanobanaData({ ...nanobanaData, environment: e.target.value })}
                        placeholder={t('placeholderEnv', isEnglish)}
                        className="bg-[var(--bg-card)] border-2 border-[var(--text-dim)] text-[var(--text-white)] placeholder:text-[var(--text-dim)] focus:border-[var(--finals-red)] focus:ring-0"
                      />
                    </div>

                    {/* 光影氛围 */}
                    <div className="space-y-2">
                      <Label className="text-xs font-medium text-[var(--text-white)] uppercase tracking-wider">
                        {t('lighting', isEnglish)}
                      </Label>
                      <Select
                        value={nanobanaData.lighting}
                        onValueChange={(value) => setNanobanaData({ ...nanobanaData, lighting: value ?? '无' })}
                      >
                        <SelectTrigger className="bg-[var(--bg-card)] border-2 border-[var(--text-dim)] text-[var(--text-white)] focus:border-[var(--finals-red)] focus:ring-0">
                          <SelectValue placeholder={t('selectLighting', isEnglish)} />
                        </SelectTrigger>
                        <SelectContent className="bg-[#0F0F0F] border-2 border-[var(--text-dim)]">
                          <SelectItem value="无" className="text-[var(--text-white)] focus:bg-[var(--finals-red)]/20 focus:text-[var(--text-white)]">{t('none', isEnglish)}</SelectItem>
                          <SelectItem value="自然光" className="text-[var(--text-white)] focus:bg-[var(--finals-red)]/20 focus:text-[var(--text-white)]">{t('naturalLight', isEnglish)}</SelectItem>
                          <SelectItem value="电影光" className="text-[var(--text-white)] focus:bg-[var(--finals-red)]/20 focus:text-[var(--text-white)]">{t('cinematicLight', isEnglish)}</SelectItem>
                          <SelectItem value="霓虹灯" className="text-[var(--text-white)] focus:bg-[var(--finals-red)]/20 focus:text-[var(--text-white)]">{t('neonLight', isEnglish)}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* 画面构图 */}
                    <div className="space-y-2">
                      <Label className="text-xs font-medium text-[var(--text-white)] uppercase tracking-wider">
                        {t('composition', isEnglish)}
                      </Label>
                      <Select
                        value={nanobanaData.composition}
                        onValueChange={(value) => setNanobanaData({ ...nanobanaData, composition: value ?? '无' })}
                      >
                        <SelectTrigger className="bg-[var(--bg-card)] border-2 border-[var(--text-dim)] text-[var(--text-white)] focus:border-[var(--finals-red)] focus:ring-0">
                          <SelectValue placeholder={t('selectComposition', isEnglish)} />
                        </SelectTrigger>
                        <SelectContent className="bg-[#0F0F0F] border-2 border-[var(--text-dim)]">
                          <SelectItem value="无" className="text-[var(--text-white)] focus:bg-[var(--finals-red)]/20 focus:text-[var(--text-white)]">{t('none', isEnglish)}</SelectItem>
                          <SelectItem value="特写" className="text-[var(--text-white)] focus:bg-[var(--finals-red)]/20 focus:text-[var(--text-white)]">{t('closeUp', isEnglish)}</SelectItem>
                          <SelectItem value="中景" className="text-[var(--text-white)] focus:bg-[var(--finals-red)]/20 focus:text-[var(--text-white)]">{t('mediumShot', isEnglish)}</SelectItem>
                          <SelectItem value="远景" className="text-[var(--text-white)] focus:bg-[var(--finals-red)]/20 focus:text-[var(--text-white)]">{t('longShot', isEnglish)}</SelectItem>
                          <SelectItem value="广角" className="text-[var(--text-white)] focus:bg-[var(--finals-red)]/20 focus:text-[var(--text-white)]">{t('wideAngle', isEnglish)}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* 艺术风格 */}
                    <div className="space-y-2">
                      <Label className="text-xs font-medium text-[var(--text-white)] uppercase tracking-wider">
                        {t('style', isEnglish)}
                      </Label>
                      <Input
                        value={nanobanaData.style}
                        onChange={(e) => setNanobanaData({ ...nanobanaData, style: e.target.value })}
                        placeholder={t('placeholderStyle', isEnglish)}
                        className="bg-[var(--bg-card)] border-2 border-[var(--text-dim)] text-[var(--text-white)] placeholder:text-[var(--text-dim)] focus:border-[var(--finals-red)] focus:ring-0"
                      />
                    </div>
                  </div>
                )}

                {/* 表单区域 - Midjourney */}
                {activeModel === 'midjourney' && (
                  <div className="space-y-5">
                    {/* 画面主体 */}
                    <div className="space-y-2">
                      <Label className="text-xs font-medium text-[var(--text-white)] uppercase tracking-wider">
                        {t('mjSubject', isEnglish)} <span className="text-[var(--finals-red)]">*</span>
                      </Label>
                      <Textarea
                        value={midjourneyData.subject}
                        onChange={(e) => setMidjourneyData({ ...midjourneyData, subject: e.target.value })}
                        placeholder={t('placeholderMjSubject', isEnglish)}
                        rows={2}
                        className="bg-[var(--bg-card)] border-2 border-[var(--text-dim)] text-[var(--text-white)] placeholder:text-[var(--text-dim)] focus:border-[var(--finals-red)] focus:ring-0 resize-none"
                      />
                    </div>

                    {/* 媒介与材质 */}
                    <div className="space-y-2">
                      <Label className="text-xs font-medium text-[var(--text-white)] uppercase tracking-wider">
                        {t('medium', isEnglish)}
                      </Label>
                      <Input
                        value={midjourneyData.medium}
                        onChange={(e) => setMidjourneyData({ ...midjourneyData, medium: e.target.value })}
                        placeholder={t('placeholderMedium', isEnglish)}
                        className="bg-[var(--bg-card)] border-2 border-[var(--text-dim)] text-[var(--text-white)] placeholder:text-[var(--text-dim)] focus:border-[var(--finals-red)] focus:ring-0"
                      />
                    </div>

                    {/* 环境与光影 */}
                    <div className="space-y-2">
                      <Label className="text-xs font-medium text-[var(--text-white)] uppercase tracking-wider">
                        {t('mjEnvironment', isEnglish)}
                      </Label>
                      <Input
                        value={midjourneyData.environment}
                        onChange={(e) => setMidjourneyData({ ...midjourneyData, environment: e.target.value })}
                        placeholder={t('placeholderMjEnv', isEnglish)}
                        className="bg-[var(--bg-card)] border-2 border-[var(--text-dim)] text-[var(--text-white)] placeholder:text-[var(--text-dim)] focus:border-[var(--finals-red)] focus:ring-0"
                      />
                    </div>

                    {/* 艺术风格 */}
                    <div className="space-y-2">
                      <Label className="text-xs font-medium text-[var(--text-white)] uppercase tracking-wider">
                        {t('mjStyle', isEnglish)}
                      </Label>
                      <Input
                        value={midjourneyData.style}
                        onChange={(e) => setMidjourneyData({ ...midjourneyData, style: e.target.value })}
                        placeholder={t('placeholderMjStyle', isEnglish)}
                        className="bg-[var(--bg-card)] border-2 border-[var(--text-dim)] text-[var(--text-white)] placeholder:text-[var(--text-dim)] focus:border-[var(--finals-red)] focus:ring-0"
                      />
                    </div>

                    {/* 画面比例参数 */}
                    <div className="space-y-2">
                      <Label className="text-xs font-medium text-[var(--text-white)] uppercase tracking-wider">
                        {t('aspectRatio', isEnglish)}
                      </Label>
                      <Select
                        value={midjourneyData.aspectRatio}
                        onValueChange={(value) => setMidjourneyData({ ...midjourneyData, aspectRatio: value ?? '16:9' })}
                      >
                        <SelectTrigger className="bg-[var(--bg-card)] border-2 border-[var(--text-dim)] text-[var(--text-white)] focus:border-[var(--finals-red)] focus:ring-0">
                          <SelectValue placeholder={t('selectRatio', isEnglish)} />
                        </SelectTrigger>
                        <SelectContent className="bg-[#0F0F0F] border-2 border-[var(--text-dim)]">
                          <SelectItem value="16:9" className="text-[var(--text-white)] focus:bg-[var(--finals-red)]/20 focus:text-[var(--text-white)]">{t('ratio16_9', isEnglish)}</SelectItem>
                          <SelectItem value="9:16" className="text-[var(--text-white)] focus:bg-[var(--finals-red)]/20 focus:text-[var(--text-white)]">{t('ratio9_16', isEnglish)}</SelectItem>
                          <SelectItem value="1:1" className="text-[var(--text-white)] focus:bg-[var(--finals-red)]/20 focus:text-[var(--text-white)]">{t('ratio1_1', isEnglish)}</SelectItem>
                          <SelectItem value="21:9" className="text-[var(--text-white)] focus:bg-[var(--finals-red)]/20 focus:text-[var(--text-white)]">{t('ratio21_9', isEnglish)}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* 风格化程度 */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label className="text-xs font-medium text-[var(--text-white)] uppercase tracking-wider">
                          {t('stylize', isEnglish)}
                        </Label>
                        <span className="text-xs font-mono text-[var(--finals-red)]">
                          --s {midjourneyData.stylize}
                        </span>
                      </div>
                      <Slider
                        value={[midjourneyData.stylize]}
                        onValueChange={(value) => setMidjourneyData({ ...midjourneyData, stylize: Array.isArray(value) ? value[0] : value })}
                        min={0}
                        max={1000}
                        step={10}
                        className="w-full [&_[data-slot=slider-track]]:bg-[var(--text-dim)] [&_[data-slot=slider-range]]:bg-[var(--finals-red)] [&_[data-slot=slider-thumb]]:border-[var(--finals-red)] [&_[data-slot=slider-thumb]]:bg-[var(--text-white)] [&_[data-slot=slider-thumb]]:hover:ring-[var(--finals-red)]/50"
                      />
                      <div className="flex justify-between text-xs text-[var(--text-dim)]">
                        <span>0 ({t('realistic', isEnglish)})</span>
                        <span>1000 ({t('artistic', isEnglish)})</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* 表单区域 - Seedance */}
                {activeModel === 'seedance' && (
                  <div className="space-y-5">
                    {/* 镜头语言 */}
                    <div className="space-y-2">
                      <Label className="text-xs font-medium text-[var(--text-white)] uppercase tracking-wider">
                        {t('cameraMovement', isEnglish)}
                      </Label>
                      <Select
                        value={seedanceData.cameraMovement}
                        onValueChange={(value) => setSeedanceData({ ...seedanceData, cameraMovement: value ?? '无' })}
                      >
                        <SelectTrigger className="bg-[var(--bg-card)] border-2 border-[var(--text-dim)] text-[var(--text-white)] focus:border-[var(--finals-red)] focus:ring-0">
                          <SelectValue placeholder={t('selectCamera', isEnglish)} />
                        </SelectTrigger>
                        <SelectContent className="bg-[#0F0F0F] border-2 border-[var(--text-dim)]">
                          <SelectItem value="无" className="text-[var(--text-white)] focus:bg-[var(--finals-red)]/20 focus:text-[var(--text-white)]">{t('none', isEnglish)}</SelectItem>
                          <SelectItem value="特写镜头" className="text-[var(--text-white)] focus:bg-[var(--finals-red)]/20 focus:text-[var(--text-white)]">{t('closeUpShot', isEnglish)}</SelectItem>
                          <SelectItem value="推镜头" className="text-[var(--text-white)] focus:bg-[var(--finals-red)]/20 focus:text-[var(--text-white)]">{t('pushShot', isEnglish)}</SelectItem>
                          <SelectItem value="航拍视角" className="text-[var(--text-white)] focus:bg-[var(--finals-red)]/20 focus:text-[var(--text-white)]">{t('aerialView', isEnglish)}</SelectItem>
                          <SelectItem value="跟随运镜" className="text-[var(--text-white)] focus:bg-[var(--finals-red)]/20 focus:text-[var(--text-white)]">{t('followShot', isEnglish)}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* 核心主体 */}
                    <div className="space-y-2">
                      <Label className="text-xs font-medium text-[var(--text-white)] uppercase tracking-wider">
                        {t('sdSubject', isEnglish)} <span className="text-[var(--finals-red)]">*</span>
                      </Label>
                      <Textarea
                        value={seedanceData.subject}
                        onChange={(e) => setSeedanceData({ ...seedanceData, subject: e.target.value })}
                        placeholder={t('placeholderSdSubject', isEnglish)}
                        rows={2}
                        className="bg-[var(--bg-card)] border-2 border-[var(--text-dim)] text-[var(--text-white)] placeholder:text-[var(--text-dim)] focus:border-[var(--finals-red)] focus:ring-0 resize-none"
                      />
                    </div>

                    {/* 环境氛围 */}
                    <div className="space-y-2">
                      <Label className="text-xs font-medium text-[var(--text-white)] uppercase tracking-wider">
                        {t('sdEnvironment', isEnglish)}
                      </Label>
                      <Input
                        value={seedanceData.environment}
                        onChange={(e) => setSeedanceData({ ...seedanceData, environment: e.target.value })}
                        placeholder={t('placeholderSdEnv', isEnglish)}
                        className="bg-[var(--bg-card)] border-2 border-[var(--text-dim)] text-[var(--text-white)] placeholder:text-[var(--text-dim)] focus:border-[var(--finals-red)] focus:ring-0"
                      />
                    </div>

                    {/* 色调与光影 */}
                    <div className="space-y-2">
                      <Label className="text-xs font-medium text-[var(--text-white)] uppercase tracking-wider">
                        {t('sdLighting', isEnglish)}
                      </Label>
                      <Input
                        value={seedanceData.lighting}
                        onChange={(e) => setSeedanceData({ ...seedanceData, lighting: e.target.value })}
                        placeholder={t('placeholderSdLighting', isEnglish)}
                        className="bg-[var(--bg-card)] border-2 border-[var(--text-dim)] text-[var(--text-white)] placeholder:text-[var(--text-dim)] focus:border-[var(--finals-red)] focus:ring-0"
                      />
                    </div>

                    {/* 终极画质 */}
                    <div className="space-y-2">
                      <Label className="text-xs font-medium text-[var(--text-white)] uppercase tracking-wider">
                        {t('quality', isEnglish)}
                      </Label>
                      <Select
                        value={seedanceData.quality}
                        onValueChange={(value) => setSeedanceData({ ...seedanceData, quality: value ?? '无' })}
                      >
                        <SelectTrigger className="bg-[var(--bg-card)] border-2 border-[var(--text-dim)] text-[var(--text-white)] focus:border-[var(--finals-red)] focus:ring-0">
                          <SelectValue placeholder={t('selectQuality', isEnglish)} />
                        </SelectTrigger>
                        <SelectContent className="bg-[#0F0F0F] border-2 border-[var(--text-dim)]">
                          <SelectItem value="无" className="text-[var(--text-white)] focus:bg-[var(--finals-red)]/20 focus:text-[var(--text-white)]">{t('none', isEnglish)}</SelectItem>
                          <SelectItem value="电影级极高画质" className="text-[var(--text-white)] focus:bg-[var(--finals-red)]/20 focus:text-[var(--text-white)]">{t('cinematicQuality', isEnglish)}</SelectItem>
                          <SelectItem value="8k分辨率" className="text-[var(--text-white)] focus:bg-[var(--finals-red)]/20 focus:text-[var(--text-white)]">{t('resolution8k', isEnglish)}</SelectItem>
                          <SelectItem value="杰作" className="text-[var(--text-white)] focus:bg-[var(--finals-red)]/20 focus:text-[var(--text-white)]">{t('masterpiece', isEnglish)}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}

                {/* 操作按钮 */}
                <div className="flex gap-3 pt-2">
                  <button
                    className="flex-1 btn-primary"
                    onClick={handleCopy}
                    disabled={!generatePrompt()}
                  >
                    {copied ? t('copied', isEnglish) : t('copyPrompt', isEnglish)}
                  </button>
                  <button className="btn-secondary" onClick={handleReset}>
                    {t('reset', isEnglish)}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* 右侧预览卡片 - 60% */}
          <div className="w-[60%] game-card animate-fade-up animate-delay-2">
            <div className="game-card-header">
              <h2 className="game-card-title">
                OUTPUT PREVIEW
                <span className="title-divider">|</span>
                <span className="title-accent">RESULT</span>
              </h2>
            </div>
            <div className="game-card-content">
              <div className="preview-area min-h-[420px]">
                <div className="preview-content">
                  {generatePrompt() ? (
                    <>
                      <p className="text-[var(--text-dim)] text-xs mb-3">
                        <span className="text-finals">--model</span>{" "}
                        <span className="text-[var(--text-white)]-accent">{activeModel}</span>
                      </p>
                      <p className="text-[var(--text-white)] leading-relaxed whitespace-pre-wrap">
                        {generatePrompt()}
                      </p>
                    </>
                  ) : (
                    <p className="text-[var(--text-dim)]">
                      在左侧填写参数后，提示词将在这里实时显示...
                    </p>
                  )}
                </div>
              </div>
              <div className="flex justify-end pt-4">
                <button
                  className="btn-secondary"
                  onClick={handleCopy}
                  disabled={!generatePrompt()}
                >
                  {copied ? t('copied', isEnglish) : t('copy', isEnglish)}
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App

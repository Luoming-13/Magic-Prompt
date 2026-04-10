# 米哈游风格设计系统
# Hoyoverse Design System - "Neon Archive" / 霓虹档案

## 设计理念

融合《原神》的精致优雅与《绝区零》的赛博冲击力，打造现代都市机能风格。

---

## 1. 全局背景系统

### 核心背景
- **基础色**: 深蓝灰 `#0a0e14` (非纯黑)
- **CRT 扫描线**: 细微水平线条，模拟复古显示器
- **Noise 纹理**: 分形噪声叠加，营造 ZZZ 复古未来感
- **氛围光**: 右上角微弱的青蓝色辉光

### 实现要点
```css
background:
  /* CRT 扫描线 */
  repeating-linear-gradient(
    0deg,
    transparent,
    transparent 2px,
    rgba(0, 0, 0, 0.15) 2px,
    rgba(0, 0, 0, 0.15) 4px
  ),
  /* Noise 纹理 */
  url("data:image/svg+xml,..."),
  /* 氛围光 */
  radial-gradient(ellipse at top right, rgba(0, 255, 200, 0.03), transparent),
  /* 基础色 */
  #0a0e14;
```

---

## 2. 卡片与层级系统

### 材质特性
- **毛玻璃**: `backdrop-filter: blur(20px) saturate(180%)`
- **半透明背景**: `rgba(10, 18, 28, 0.75)`
- **边缘处理**: 斜切角 (clip-path 或 border 技巧)
- **发光边框**: 渐变发光边缘 (原神风格)

### 边框发光
```css
/* 浅金色发光边框 - 原神装备页风格 */
border: 1px solid rgba(255, 215, 100, 0.15);
box-shadow:
  inset 0 1px 0 rgba(255, 255, 255, 0.05),
  0 0 20px rgba(255, 215, 100, 0.05);
```

### 斜切角实现
```css
/* 左上和右下斜切 */
clip-path: polygon(
  12px 0, 100% 0, 100% calc(100% - 12px),
  calc(100% - 12px) 100%, 0 100%, 0 12px
);
```

---

## 3. 色彩系统

### 主色调
| 名称 | 色值 | 用途 |
|------|------|------|
| `--void` | `#0a0e14` | 最深背景 |
| `--abyss` | `#101820` | 次级背景 |
| `--slate-cold` | `#1a2433` | 卡片背景 |
| `--slate-mid` | `#232d3d` | 交互背景 |

### 强调色 - ZZZ 荧光系
| 名称 | 色值 | 用途 |
|------|------|------|
| `--neon-yellow` | `#e8ff4a` | 主强调/CTA |
| `--neon-lime` | `#b8ff4a` | 次强调/成功 |
| `--neon-cyan` | `#00ffc8` | 链接/交互 |
| `--neon-magenta` | `#ff4a8d` | 警告/重要 |

### 发光渐变
```css
/* ZZZ 风格荧光渐变 */
--gradient-neon: linear-gradient(135deg, #e8ff4a, #b8ff4a);
--gradient-cyan: linear-gradient(135deg, #00ffc8, #00b8ff);
```

### 原神风格金色
| 名称 | 色值 | 用途 |
|------|------|------|
| `--gold-soft` | `#d4a853` | 边框发光 |
| `--gold-bright` | `#ffd666` | 高亮装饰 |
| `--gold-muted` | `rgba(212, 168, 83, 0.2)` | 背景点缀 |

---

## 4. 字体系统

### 标题字体 - ZZZ 潮酷风格
- **首选**: "Orbitron" - 科技感、粗壮扁平
- **备选**: "Rajdhani" - 现代潮酷
- **特点**: 粗字重 (600-700)，紧凑字距

### 正文字体 - 原神优雅风格
- **首选**: "Noto Sans SC" - 中文黑体
- **英文**: "Inter" 或 "DM Sans"
- **特点**: 干净、优雅、高可读性

### 字体层级
```css
--font-display: "Orbitron", "Rajdhani", sans-serif;
--font-body: "Noto Sans SC", "Inter", "DM Sans", sans-serif;
--font-mono: "JetBrains Mono", monospace;
```

---

## 5. 阴影与深度

### 发光阴影
```css
/* 荧光按钮阴影 */
--shadow-neon:
  0 4px 20px rgba(232, 255, 74, 0.3),
  0 0 40px rgba(232, 255, 74, 0.15);

/* 卡片浮起阴影 */
--shadow-elevated:
  0 8px 32px rgba(0, 0, 0, 0.4),
  0 0 60px rgba(0, 255, 200, 0.03);
```

---

## 6. 动效系统

### 时间曲线
- **快速**: `150ms cubic-bezier(0.22, 1, 0.36, 1)` - 状态切换
- **标准**: `250ms cubic-bezier(0.22, 1, 0.36, 1)` - 通用过渡
- **弹性**: `400ms cubic-bezier(0.34, 1.56, 0.64, 1)` - 弹出效果

### 关键动效
```css
/* 荧光脉冲 */
@keyframes neon-pulse {
  0%, 100% { opacity: 1; filter: brightness(1); }
  50% { opacity: 0.85; filter: brightness(1.1); }
}

/* 扫描线动画 */
@keyframes scanline {
  0% { transform: translateY(-100%); }
  100% { transform: translateY(100vh); }
}
```

---

## 7. 组件规范

### 按钮
- **主按钮**: 荧光黄渐变背景，深色文字，强发光阴影
- **次要按钮**: 透明背景，荧光边框，hover 时填充
- **禁用状态**: 降低亮度，移除发光

### 标签/Tab
- **激活态**: 荧光渐变背景，锐利斜切角
- **未激活**: 半透明背景，淡色文字

### 卡片
- **容器**: 毛玻璃材质，斜切角边缘
- **边框**: 金色/青色发光边缘
- **内容**: 清晰的层级划分

---

## 8. 无障碍考量

- 荧光色对比度需确保 4.5:1 以上
- 提供减少动画选项
- 键盘导航支持
- ARIA 标签完善

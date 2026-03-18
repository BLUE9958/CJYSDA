# GSAP 动画库分类文档

## 📊 动画分类总览

## 🎯 普通元素动画 (Element Effects)

### 出场动画 (入场效果)

```
'fadeIn',           // 淡入
'slideLeft',        // 左滑进入
'slideRight',       // 右滑进入  
'slideTop',         // 上滑进入
'slideBottom',      // 下滑进入
'scaleUp',          // 放大进入
'rotateIn',         // 旋入
'bounceIn',         // 弹入
'elasticIn',        // 弹性进入
'blurIn',           // 模糊进入
'flipX',            // 水平翻转进入
'flipY',            // 垂直翻转进入
'zoomInRotate',     // 缩放旋转进入
'swing'             // 摆动进入
```

**特点**: 使用 `gsap.from()`，元素从隐藏/起始状态动画到可见/最终状态

**可编辑参数** (低门槛操作):
- **duration**: 持续时间 (默认1秒，范围：0.1 - 5秒)

**完整默认参数** (供开发查阅):
- **duration**: 1秒
- **ease**: "power1.out" (淡入/淡出), "power2.out" (滑动), "back.out(1.7)" (缩放/旋转), "elastic.out(1, 0.3)" (弹性)
- **opacity**: 0 (所有入场动画)
- **distance**: 300px (滑动类动画)
- **scale**: 0 (缩放类动画)
- **rotation**: -360° (旋转类动画)
- **x**: -300px (弹性进入)
- **blur**: 20px (模糊进入)

### 强调动画 (循环/持续效果)

```
'breathing',        // 呼吸效果（循环）
'neonPulse',        // 霓虹脉冲（循环）
'shake',            // 抖动（单次）
'wobble',           // 摇晃（单次）
'jello',            // 果冻（单次）
'colorCycle',       // 色彩循环（无限循环）
'flash',            // 闪烁（单次）
'rubberBand',       // 橡皮筋（单次）
'tada',             // 哒哒（单次）
'heartbeat',        // 心跳（无限循环）
'float'             // 漂浮（无限循环）
```

**特点**: 包含循环(repeat: -1)或复杂的时序效果，用于持续吸引注意力

**可编辑参数** (低门槛操作):
- **duration**: 单次/循环时间 (默认1秒，范围：0.1 - 3秒)

**完整默认参数** (供开发查阅):
- **duration**: 1秒 (呼吸/漂浮), 0.5秒 (霓虹脉冲), 0.1秒 (抖动/橡胶带等)
- **scale**: 1.1 (呼吸/心跳), 1.3 (心跳)
- **opacity**: 0.8 (呼吸)
- **color**: "rgba(0, 243, 255, 1)" (霓虹脉冲)
- **intensity**: 1 (抖动/摇晃/果冻)
- **speed**: 0.1秒 (抖动)
- **y**: -20px (漂浮)
- **repeat**: -1 (无限循环，适用于呼吸/霓虹脉冲/色彩循环/心跳/漂浮)

### 退场动画 (离场效果)

```
'fadeOut',          // 淡出
'scaleDown',        // 缩小离开
'rotateOut',        // 旋出
'glitch'            // 故障效果（可作为退场）
```

**特点**: 使用 `gsap.to()`，元素从可见状态动画到隐藏/离开状态

**可编辑参数** (低门槛操作):
- **duration**: 持续时间 (默认1秒，范围：0.1 - 5秒)

**完整默认参数** (供开发查阅):
- **duration**: 1秒
- **ease**: "power1.in" (淡出), "power2.in" (旋出)
- **opacity**: 0 (所有退场动画)
- **scale**: 2 (缩小离开), 0 (旋出/故障)
- **rotation**: 360° (旋出)

## 📝 文本动画 (Text Effects)

### 出场动画 (入场效果)

```
'charFadeIn',       // 字符淡入
'charSlideUp',      // 字符上滑
'spacingExpand',    // 间距展开
'blurReveal',       // 模糊显现
'elasticChars',     // 弹性字符
'scatterReveal',    // 随机分散
'gradientwipe',     // 渐变擦除
'decode'            // 解码效果
```

**可编辑参数** (低门槛操作):
- **duration**: 持续时间 (默认1秒，范围：0.5 - 3秒)

**完整默认参数** (供开发查阅):
- **duration**: 1秒
- **stagger**: 0.1秒 (字符淡入/上滑/弹性)
- **ease**: "power2.out" (字符淡入/上滑), "elastic.out(1, 0.3)" (弹性字符)
- **opacity**: 0 (大部分入场动画)
- **y**: -50px (字符上滑)
- **letterSpacing**: -10px (间距展开)
- **blur**: 20px (模糊显现)
- **speed**: 0.1秒 (解码效果)

### 强调动画 (循环/持续效果)

```
'rainbowFlow',      // 彩虹流动（无限循环）
'glitchText',       // 故障文字（无限循环）
'waveText',         // 波浪效果（无限循环）
'shadowPop',        // 阴影弹出（无限循环）
'neonFlicker',      // 霓虹闪烁（无限循环）
'wordRotate'        // 3D旋转（无限循环）
```

**可编辑参数** (低门槛操作):
- **duration**: 循环周期 (默认2秒，范围：0.5 - 5秒)

**完整默认参数** (供开发查阅):
- **duration**: 2秒 (彩虹流动/波浪效果), 1秒 (霓虹闪烁)
- **speed**: 0.1秒 (故障文字)
- **y**: -20px (波浪效果)
- **x**: -4px, y: -4px (阴影弹出)
- **repeat**: -1 (所有强调动画)

### 退场动画 (离场效果)

```
'textScramble'      // 乱码效果（可作为退场）
```

**注**: 文本动画主要侧重入场和强调，退场效果较少

**可编辑参数** (低门槛操作):
- **duration**: 持续时间 (默认1.5秒，范围：0.5 - 3秒)

**完整默认参数** (供开发查阅):
- **duration**: 1.5秒
- **opacity**: 1 (保持可见)

## 👥 组动画 (Group Effects)

### 出场动画

```
'gridStagger',      // 网格交错
'staggerSlide',     // 滑动交错
'meetInMiddle',     // 汇聚
'dominoCascade',    // 多米诺
'spiralGrid',       // 螺旋
'chaosConverge',    // 混沌网格
'elasticList'       // 弹性堆叠
```

**可编辑参数** (低门槛操作):
- **duration**: 持续时间 (默认1秒，范围：0.3 - 5秒)

**完整默认参数** (供开发查阅):
- **duration**: 1秒 (大部分), 0.5秒 (网格交错)
- **staggerAmount**: 1秒 (网格交错/波纹涟漪)
- **ease**: "back.out(1.7)" (网格交错/多米诺), "elastic.out(1, 0.5)" (弹性堆叠)
- **distance**: 200px (汇聚), 300px (滑动交错)
- **opacity**: 0 (所有出场动画)
- **xOffset**: 100px (滑动交错)
- **range**: 500px (混沌网格)

### 强调动画

```
'waveRipple',       // 波纹涟漪（循环）
'checkerboard'      // 棋盘格（循环）
```

**可编辑参数** (低门槛操作):
- **duration**: 循环周期 (默认0.5秒，范围：0.3 - 3秒)

**完整默认参数** (供开发查阅):
- **duration**: 0.5秒
- **staggerAmount**: 1秒 (波纹涟漪)
- **scale**: 0.8 (棋盘格)
- **repeat**: -1 (所有强调动画)

### 退场动画

```
'explodeOut'        // 爆炸退场
```

**可编辑参数** (低门槛操作):
- **duration**: 持续时间 (默认1秒，范围：0.5 - 3秒)

**完整默认参数** (供开发查阅):
- **duration**: 1秒
- **distance**: 50px
- **rotation**: 180°
- **ease**: "power2.inOut"

## 💡 使用建议

- **出场动画** → 页面加载、元素首次出现时使用
- **强调动画** → 需要吸引用户注意力、提示交互时使用  
- **退场动画** → 元素移除、页面跳转时使用

这种分类方式有助于在项目中根据不同的交互场景选择合适的动画效果。
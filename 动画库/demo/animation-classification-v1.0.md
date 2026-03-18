# GSAP 动画库分类文档 v1.0

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

### 动画代码实现

#### fadeIn (淡入)
```javascript
{ 
    id: 'fadeIn', name: '淡入', enName: 'Fade In', 
    defaultParams: { duration: 1, ease: "power1.out" },
    run: (el, config = {}) => gsap.from(el, { duration: 1, ease: "power1.out", ...config, opacity: 0 }) 
}
```

#### slideLeft (左滑进入)
```javascript
{ 
    id: 'slideLeft', name: '左滑', enName: 'Slide Left', 
    defaultParams: { duration: 1, distance: 300, ease: "power2.out" },
    run: (el, { duration = 1, distance = 300, ease = "power2.out" } = {}) => gsap.from(el, { 
        duration, 
        x: -distance, 
        opacity: 0, 
        ease 
    }) 
}
```

#### slideRight (右滑进入)
```javascript
{ 
    id: 'slideRight', name: '右滑', enName: 'Slide Right', 
    defaultParams: { duration: 1, distance: 300, ease: "power2.out" },
    run: (el, { duration = 1, distance = 300, ease: "power2.out" } = {}) => gsap.from(el, { 
        duration, 
        x: distance, 
        opacity: 0, 
        ease 
    }) 
}
```

#### slideTop (上滑进入)
```javascript
{ 
    id: 'slideTop', name: '上滑', enName: 'Slide Top', 
    defaultParams: { duration: 1, distance: 300, ease: "power2.out" },
    run: (el, { duration = 1, distance = 300, ease: "power2.out" } = {}) => gsap.from(el, { 
        duration, 
        y: -distance, 
        opacity: 0, 
        ease 
    }) 
}
```

#### slideBottom (下滑进入)
```javascript
{ 
    id: 'slideBottom', name: '下滑', enName: 'Slide Bottom', 
    defaultParams: { duration: 1, distance: 300, ease: "power2.out" },
    run: (el, { duration = 1, distance = 300, ease: "power2.out" } = {}) => gsap.from(el, { 
        duration, 
        y: distance, 
        opacity: 0, 
        ease 
    }) 
}
```

#### scaleUp (放大进入)
```javascript
{ 
    id: 'scaleUp', name: '放大', enName: 'Scale Up', 
    defaultParams: { duration: 1, scale: 0, ease: "back.out(1.7)" },
    run: (el, { duration = 1, scale = 0, ease: "back.out(1.7)" } = {}) => gsap.from(el, { 
        duration, 
        scale, 
        opacity: 0, 
        ease 
    }) 
}
```

#### rotateIn (旋入)
```javascript
{ 
    id: 'rotateIn', name: '旋入', enName: 'Rotate In', 
    defaultParams: { duration: 1, rotation: -360, ease: "back.out(1.7)" },
    run: (el, { duration = 1, rotation = -360, ease: "back.out(1.7)" } = {}) => gsap.from(el, { 
        duration, 
        rotation, 
        opacity: 0, 
        scale: 0, 
        ease 
    }) 
}
```

#### bounceIn (弹入)
```javascript
{ 
    id: 'bounceIn', name: '弹入', enName: 'Bounce In', 
    defaultParams: { duration: 1 },
    run: (el, config = {}) => gsap.from(el, { duration: 1, ease: "bounce.out", ...config, scale: 0 }) 
}
```

#### elasticIn (弹性进入)
```javascript
{ 
    id: 'elasticIn', name: '弹性进入', enName: 'Elastic In', 
    defaultParams: { duration: 1.5, x: -300 },
    run: (el, config = {}) => gsap.from(el, { 
        duration: 1.5, 
        x: -300, 
        ease: "elastic.out(1, 0.3)",
        ...config
    }) 
}
```

#### blurIn (模糊进入)
```javascript
{ 
    id: 'blurIn', name: '模糊进入', enName: 'Blur In', 
    defaultParams: { duration: 1, blur: 20 },
    run: (el, { duration = 1, blur = 20 } = {}) => gsap.fromTo(el, 
        { filter: `blur(${blur}px)`, opacity: 0 }, 
        { duration, filter: "blur(0px)", opacity: 1 }
    ) 
}
```

#### flipX (水平翻转进入)
```javascript
{ 
    id: 'flipX', name: '水平翻转', enName: 'Flip X', 
    defaultParams: { duration: 1 },
    run: (el, { duration = 1 } = {}) => {
         const tl = gsap.timeline({ repeat: 1, yoyo: true });
        tl.to(el, { duration, rotationX: 360, ease: "back.out(1.7)" }) 
        return tl;
    }
}
```

#### flipY (垂直翻转进入)
```javascript
{ 
    id: 'flipY', name: '垂直翻转', enName: 'Flip Y', 
    defaultParams: { duration: 1 },
    run: (el, { duration = 1 } = {}) => gsap.to(el, { 
        duration, 
        rotationY: 360, 
        ease: "back.out(1.7)" 
    }) 
}
```

#### zoomInRotate (缩放旋转进入)
```javascript
{ 
    id: 'zoomInRotate', name: '缩放旋转', enName: 'Zoom Rotate', 
    defaultParams: { duration: 1 },
    run: (el, { duration = 1 } = {}) => gsap.from(el, { 
        duration, 
        scale: 0, 
        rotation: 180, 
        opacity: 0 
    }) 
}
```

#### swing (摆动进入)
```javascript
{ 
    id: 'swing', name: '摆动', enName: 'Swing', 
    defaultParams: { rotation: 15, duration: 0.2 },
    run: (el, { rotation = 15, duration = 0.2 } = {}) => {
        const t1 = gsap.to(el, { duration, rotation, transformOrigin: "50% 0%" });
        gsap.to(el, { duration: 2, rotation: 0, ease: "elastic.out(1.75, 0.1)", delay: duration });
        return t1; 
    }
}
```

**特点**: 元素从隐藏/起始状态动画到可见/最终状态

**可编辑参数**:
- **duration**: 持续时间 (默认1秒，范围：0.1 - 5秒)

### 强调动画 (持续效果)

```
'breathing',        // 呼吸效果
'neonPulse',        // 霓虹脉冲
'shake',            // 抖动
'wobble',           // 摇晃
'jello',            // 果冻
'colorCycle',       // 色彩循环
'flash',            // 闪烁
'rubberBand',       // 橡皮筋
'tada',             // 哒哒
'heartbeat',        // 心跳
'float'             // 漂浮
```

### 动画代码实现

#### breathing (呼吸效果)
```javascript
{ 
    id: 'breathing', name: '呼吸', enName: 'Breathing', 
    defaultParams: { duration: 1, scale: 1.1, opacity: 0.8 },
    run: (el, { duration = 1, scale = 1.1, opacity = 0.8 } = {}) => {
        const tl = gsap.timeline({ repeat: -1, yoyo: true });
        tl.to(el, { 
            duration, 
            scale, 
            opacity, 
            ease: "sine.inOut" 
        });
        return tl;
    }
}
```

#### neonPulse (霓虹脉冲)
```javascript
{ 
    id: 'neonPulse', name: '霓虹脉冲', enName: 'Neon Pulse', 
    defaultParams: { duration: 0.5, color: "rgba(0, 243, 255, 1)" },
    run: (el, { duration = 0.5, color = "rgba(0, 243, 255, 1)" } = {}) => {
        const tl = gsap.timeline({ repeat: -1, yoyo: true });
        const finalColor = color;
        const glowColor = finalColor.replace('1)', '0.8)').replace('rgb', 'rgba');
        const bgColor = finalColor.replace('1)', '0.4)').replace('rgb', 'rgba');
        
        tl.to(el, { 
            duration, 
            boxShadow: `0 0 50px ${finalColor}, 0 0 20px ${glowColor}`,
            border: `5px solid ${finalColor}`,
            backgroundColor: bgColor
        });
        return tl;
    }
}
```

#### shake (抖动)
```javascript
{ 
    id: 'shake', name: '抖动', enName: 'Shake', 
    defaultParams: { intensity: 10, speed: 0.1 },
    run: (el, { intensity = 10, speed = 0.1 } = {}) => {
        const tl = gsap.timeline();
        tl.to(el, { x: -intensity, duration: speed })
          .to(el, { x: intensity, duration: speed })
          .to(el, { x: -intensity, duration: speed })
          .to(el, { x: intensity, duration: speed })
          .to(el, { x: 0, duration: speed });
        return tl;
    }
}
```

#### wobble (摇晃)
```javascript
{ 
    id: 'wobble', name: '摇晃', enName: 'Wobble', 
    defaultParams: { duration: 0.15, intensity: 1 },
    run: (el, { duration = 0.15, intensity = 1 } = {}) => {
        const i = intensity;
        const tl = gsap.timeline();
        tl.to(el, { rotation: -5 * i, x: -10 * i, duration })
          .to(el, { rotation: 3 * i, x: 10 * i, duration })
          .to(el, { rotation: -3 * i, x: -5 * i, duration })
          .to(el, { rotation: 2 * i, x: 5 * i, duration })
          .to(el, { rotation: 0, x: 0, duration });
        return tl;
    }
}
```

#### jello (果冻)
```javascript
{ 
    id: 'jello', name: '果冻', enName: 'Jello', 
    defaultParams: { duration: 0.2, intensity: 1 },
    run: (el, { duration = 0.2, intensity = 1 } = {}) => {
        const i = intensity;
        const tl = gsap.timeline();
        tl.to(el, { skewX: 12.5 * i, skewY: 12.5 * i, duration })
          .to(el, { skewX: -6.25 * i, skewY: -6.25 * i, duration })
          .to(el, { skewX: 3.125 * i, skewY: 3.125 * i, duration })
          .to(el, { skewX: 0, skewY: 0, duration });
        return tl;
    }
}
```

#### colorCycle (色彩循环)
```javascript
{ 
    id: 'colorCycle', name: '色彩循环', enName: 'Color Cycle', 
    defaultParams: { duration: 1 },
    run: (el, { duration = 1 } = {}) => {
        const tl = gsap.timeline({ repeat: -1, yoyo: true });
        tl.to(el, { backgroundColor: "#ff0000", duration })
          .to(el, { backgroundColor: "#00ff00", duration })
          .to(el, { backgroundColor: "#0000ff", duration });
        return tl;
    }
}
```

#### flash (闪烁)
```javascript
{ 
    id: 'flash', name: '闪烁', enName: 'Flash', 
    defaultParams: { duration: 0.2 },
    run: (el, { duration = 0.2 } = {}) => {
        const tl = gsap.timeline();
        tl.to(el, { opacity: 0, duration })
          .to(el, { opacity: 1, duration })
          .to(el, { opacity: 0, duration })
          .to(el, { opacity: 1, duration });
        return tl;
    }
}
```

#### rubberBand (橡皮筋)
```javascript
{ 
    id: 'rubberBand', name: '橡皮筋', enName: 'Rubber Band', 
    defaultParams: { duration: 0.1 },
    run: (el, { duration = 0.1 } = {}) => {
        const tl = gsap.timeline();
        tl.to(el, { scaleX: 1.25, scaleY: 0.75, duration: duration * 3 })
          .to(el, { scaleX: 0.75, scaleY: 1.25, duration })
          .to(el, { scaleX: 1.15, scaleY: 0.85, duration })
          .to(el, { scaleX: 0.95, scaleY: 1.05, duration })
          .to(el, { scaleX: 1, scaleY: 1, duration });
          return tl;
    }
}
```

#### tada (哒哒)
```javascript
{ 
    id: 'tada', name: '哒哒', enName: 'Tada', 
    defaultParams: { duration: 0.1, scale: 1.1, rotation: 3 },
    run: (el, { duration = 0.1, scale = 1.1, rotation = 3 } = {}) => {
        const tl = gsap.timeline();
        tl.to(el, { scale: 0.9, rotation: -rotation, duration })
          .to(el, { scale, rotation, duration })
          .to(el, { scale, rotation: -rotation, duration })
          .to(el, { scale, rotation, duration })
          .to(el, { scale: 1, rotation: 0, duration });
          return tl;
    }
}
```

#### heartbeat (心跳)
```javascript
{ 
    id: 'heartbeat', name: '心跳', enName: 'Heartbeat', 
    defaultParams: { duration: 0.15, scale: 1.3 },
    run: (el, { duration = 0.15, scale = 1.3 } = {}) => {
        const tl = gsap.timeline({ repeat: -1 });
        tl.to(el, { scale, duration, ease: "power1.out" })
          .to(el, { scale: 1, duration, ease: "power1.in" })
          .to(el, { scale, duration, ease: "power1.out", delay: 0.1 })
          .to(el, { scale: 1, duration: duration * 2, ease: "power1.in" });
        return tl;
    }
}
```

#### float (漂浮)
```javascript
{ 
    id: 'float', name: '漂浮', enName: 'Float', 
    defaultParams: { duration: 2, y: -20 },
    run: (el, { duration = 2, y = -20 } = {}) => {
        const tl = gsap.timeline({ repeat: -1, yoyo: true });
        tl.to(el, { y, duration, ease: "sine.inOut" });
        return tl;
    }
}
```

**特点**: 包含复杂时序效果，用于吸引注意力

**播放设置**:
- **默认**: 所有强调动画默认播放仅1次
- **支持无限循环设置**: breathing, neonPulse, colorCycle, heartbeat, float

**可编辑参数**:
- **duration**: 持续时间 (默认1秒，范围：0.1 - 3秒)
- **循环设置**: 部分动画支持开启无限循环

### 退场动画 (离场效果)

```
'fadeOut',          // 淡出
'scaleDown',        // 缩小离开
'rotateOut',        // 旋出
'glitch'            // 故障效果（可作为退场）
```

### 动画代码实现

#### fadeOut (淡出)
```javascript
{ 
    id: 'fadeOut', name: '淡出', enName: 'Fade Out', 
    defaultParams: { duration: 1, ease: "power1.in" },
    run: (el, config = {}) => gsap.to(el, { duration: 1, ease: "power1.in", ...config, opacity: 0 }) 
}
```

#### scaleDown (缩小离开)
```javascript
{ 
    id: 'scaleDown', name: '缩小', enName: 'Scale Down', 
    defaultParams: { duration: 1, scale: 2, ease: "power2.out" },
    run: (el, { duration = 1, scale = 2, ease: "power2.out" } = {}) => gsap.from(el, { 
        duration, 
        scale, 
        opacity: 0, 
        ease 
    }) 
}
```

#### rotateOut (旋出)
```javascript
{ 
    id: 'rotateOut', name: '旋出', enName: 'Rotate Out', 
    defaultParams: { duration: 1, rotation: 360, ease: "power2.in" },
    run: (el, { duration = 1, rotation = 360, ease: "power2.in" } = {}) => gsap.to(el, { 
        duration, 
        rotation, 
        opacity: 0, 
        scale: 0, 
        ease 
    }) 
}
```

#### glitch (故障效果)
```javascript
{ 
    id: 'glitch', name: '故障', enName: 'Glitch', 
    defaultParams: { duration: 0.1 },
    run: (el, { duration = 0.1 } = {}) => {
        const tl = gsap.timeline({ repeat: 2 });
        tl.to(el, { x: -5, skewX: 5, duration, ease: "steps(1)" })
          .to(el, { x: 5, skewX: -5, duration, ease: "steps(1)" })
          .to(el, { x: 0, skewX: 0, duration });
        return tl;
    }
}
```

**特点**: 元素从可见状态动画到隐藏/离开状态

**可编辑参数**:
- **duration**: 持续时间 (默认1秒，范围：0.1 - 5秒)

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

### 动画代码实现

#### charFadeIn (字符淡入)
```javascript
{ 
    id: 'charFadeIn', name: '字符淡入', enName: 'Char Fade',
    config: { useSplitText: true },
    defaultParams: { duration: 1, stagger: 0.1, ease: "power2.out" },
    run: (el, { duration, stagger, ease } = {}) => {
        let chars = el.querySelectorAll('.char');
        
        // 如果没有找到 .char 元素，手动进行文本拆分
        if (chars.length === 0) {
            const text = el.innerText || el.textContent || "";
            const newHtml = text.split('').map(char => {
                const content = char === ' ' ? '&nbsp;' : char;
                return `<span class="char" style="display:inline-block; min-width: 0.3em;">${content}</span>`;
            }).join('');
            el.innerHTML = newHtml;
            chars = el.querySelectorAll('.char');
        } else {
            gsap.killTweensOf(chars);
            gsap.set(chars, { clearProps: "all" });
            gsap.set(chars, { display: "inline-block", minWidth: "0.3em" });
        }

        return gsap.from(chars, { 
            opacity: 0, 
            duration: duration || 1, 
            stagger: stagger || 0.1, 
            ease: ease || "power2.out" 
        });
    }
}
```

#### charSlideUp (字符上滑)
```javascript
{ 
    id: 'charSlideUp', name: '字符上滑', enName: 'Char Slide Up',
    config: { useSplitText: true },
    defaultParams: { duration: 0.8, stagger: 0.05, y: 50, ease: "back.out(2)" },
    run: (el, { duration, stagger, y, ease } = {}) => {
        const chars = el.querySelectorAll('.char');
        return gsap.from(chars, { 
            y: y || 50, 
            opacity: 0, 
            duration: duration || 0.8, 
            stagger: stagger || 0.05, 
            ease: ease || "back.out(2)" 
        });
    }
}
```

#### spacingExpand (间距展开)
```javascript
{ 
    id: 'spacingExpand', name: '间距展开', enName: 'Spacing Exp',
    config: { useSplitText: true },
    defaultParams: { duration: 1.5, letterSpacing: "-10px", ease: "power3.out" },
    run: (el, { duration, letterSpacing, ease } = {}) => gsap.from(el, { 
        letterSpacing: letterSpacing || "-10px", 
        opacity: 0, 
        duration: duration || 1.5, 
        ease: ease || "power3.out" 
    })
}
```

#### blurReveal (模糊显现)
```javascript
{ 
    id: 'blurReveal', name: '模糊显现', enName: 'Blur Reveal',
    config: { useSplitText: false },
    defaultParams: { duration: 1.5, blur: 20, ease: "power2.out" },
    run: (el, { duration, blur, ease } = {}) => gsap.fromTo(el, 
        { filter: `blur(${blur || 20}px)`, opacity: 0 }, 
        { duration: duration || 1.5, filter: "blur(0px)", opacity: 1, ease: ease || "power2.out" }
    )
}
```

#### elasticChars (弹性字符)
```javascript
{ 
    id: 'elasticChars', name: '弹性字符', enName: 'Elastic Char',
    config: { useSplitText: true },
    defaultParams: { duration: 1, stagger: 0.5, ease: "elastic.out(1, 0.3)" },
    run: (el, { duration, stagger, ease } = {}) => {
        const chars = el.querySelectorAll('.char');
        return gsap.from(chars, { 
            scale: 0, 
            duration: duration || 1, 
            stagger: { amount: stagger || 0.5, from: "center" }, 
            ease: ease || "elastic.out(1, 0.3)" 
        });
    }
}
```

#### scatterReveal (随机分散)
```javascript
{ 
    id: 'scatterReveal', name: '随机分散', enName: 'Scatter Reveal',
    config: { useSplitText: true },
    defaultParams: { duration: 1.2, stagger: 0.05, ease: "back.out(1.2)" },
    run: (el, { duration, stagger, ease } = {}) => {
        let chars = el.querySelectorAll('.char');
        
        // 如果没有找到 .char 元素，手动进行文本拆分
        if (chars.length === 0) {
            const text = el.innerText || el.textContent || "";
            const newHtml = text.split('').map(char => {
                // 处理空格，防止布局塌陷
                const content = char === ' ' ? '&nbsp;' : char;
                return `<span class="char" style="display:inline-block; min-width: 0.3em;">${content}</span>`;
            }).join('');
            el.innerHTML = newHtml;
            chars = el.querySelectorAll('.char');
        } else {
            // 如果已存在，先重置状态，防止之前的动画属性残留
            gsap.killTweensOf(chars);
            gsap.set(chars, { clearProps: "all" });
            // 重新设置必要的样式，因为 clearProps: "all" 会清除 style 中的 inline-block
            gsap.set(chars, { display: "inline-block", minWidth: "0.3em" });
        }

        return gsap.from(chars, {
            yPercent: "random(-200, 200)",
            rotation: "random(-20, 20)",
            opacity: 0,
            duration: duration || 1.2,
            stagger: stagger || 0.05,
            ease: ease || "back.out(1.2)"
        });
    }
}
```

#### gradientwipe (渐变擦除)
```javascript
{ 
    id: 'gradientwipe', name: '渐变擦除', enName: 'Gradient Wipe',
    config: { useSplitText: false },
    defaultParams: { duration: 1.5, ease: "power2.inOut" },
    run: (el, { duration, ease } = {}) => {
        gsap.set(el, {
            backgroundImage: "linear-gradient(90deg, #fff 50%, transparent 50%)",
            backgroundSize: "200% 100%",
            backgroundClip: "text",
            webkitBackgroundClip: "text",
            color: "transparent",
            backgroundPosition: "100% 0"
        });
        return gsap.to(el, { 
            backgroundPosition: "0% 0", 
            duration: duration || 1.5, 
            ease: ease || "power2.inOut" 
        });
    }
}
```

#### decode (解码效果)
```javascript
{ 
    id: 'decode', name: '解码', enName: 'Decode',
    config: { useSplitText: true },
    defaultParams: { duration: 1, speed: 0.1 },
    run: (el, { duration, speed } = {}) => {
        const chars = el.querySelectorAll('.char');
        chars.forEach((char, i) => {
            const original = char.innerText;
            const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            gsap.to(char, {
                duration: (duration || 1) + (i * (speed || 0.1)),
                onUpdate: function() {
                    if (this.progress() < 1) {
                        char.innerText = alphabet[Math.floor(Math.random() * alphabet.length)];
                    } else {
                        char.innerText = original;
                    }
                }
            });
        });
        return null; 
    }
}
```

**可编辑参数**:
- **duration**: 持续时间 (默认1秒，范围：0.5 - 3秒)

### 强调动画 (持续效果)

```
'rainbowFlow',      // 彩虹流动
'glitchText',       // 故障文字
'waveText',         // 波浪效果
'shadowPop',        // 阴影弹出
'neonFlicker',      // 霓虹闪烁
'wordRotate'        // 3D旋转
```

### 动画代码实现

#### rainbowFlow (彩虹流动)
```javascript
{ 
    id: 'rainbowFlow', name: '彩虹', enName: 'Rainbow',
    config: { useSplitText: false },
    defaultParams: { duration: 2 },
    run: (el, { duration } = {}) => {
        gsap.set(el, {
            backgroundImage: "linear-gradient(90deg, #00f3ff, #bc13fe, #00f3ff)",
            backgroundSize: "200% auto",
            backgroundClip: "text",
            webkitBackgroundClip: "text",
            color: "transparent"
        });
        return gsap.to(el, { 
            backgroundPosition: "200% center", 
            duration: duration || 2, 
            ease: "linear", 
            repeat: -1 
        });
    }
}
```

#### glitchText (故障文字)
```javascript
{ 
    id: 'glitchText', name: '故障文字', enName: 'Glitch Text',
    config: { useSplitText: false },
    defaultParams: { speed: 0.05 },
    run: (el, { speed } = {}) => {
        const s = speed || 0.05;
        const tl = gsap.timeline({ repeat: -1, repeatDelay: 2 });
        tl.to(el, { skewX: 70, ease: "power4.inOut", duration: s })
          .to(el, { skewX: 0, ease: "power4.inOut", duration: s })
          .to(el, { opacity: 0, duration: s })
          .to(el, { opacity: 1, duration: s })
          .to(el, { x: -20, duration: s })
          .to(el, { x: 0, duration: s });
        return tl;
    }
}
```

#### waveText (波浪效果)
```javascript
{ 
    id: 'waveText', name: '波浪', enName: 'Wave',
    config: { useSplitText: true },
    defaultParams: { duration: 0.5, y: -20, stagger: 0.1 },
    run: (el, { duration, y, stagger } = {}) => {
        let chars = el.querySelectorAll('.char');
        
        // 如果没有找到 .char 元素，手动进行文本拆分
        if (chars.length === 0) {
            const text = el.innerText || el.textContent || "";
            const newHtml = text.split('').map(char => {
                const content = char === ' ' ? '&nbsp;' : char;
                return `<span class="char" style="display:inline-block; min-width: 0.3em;">${content}</span>`;
            }).join('');
            el.innerHTML = newHtml;
            chars = el.querySelectorAll('.char');
        } else {
            gsap.killTweensOf(chars);
            gsap.set(chars, { clearProps: "all" });
            gsap.set(chars, { display: "inline-block", minWidth: "0.3em" });
        }

        const tl = gsap.timeline({ repeat: -1, yoyo: true });
        tl.fromTo(chars, 
            { y: 0 }, 
            { 
                y: y || -20, 
                duration: duration || 0.5, 
                stagger: { each: stagger || 0.1, yoyo: true, repeat: -1 }, 
                ease: "sine.inOut" 
            }
        );
        return tl;
    }
}
```

#### shadowPop (阴影弹出)
```javascript
{ 
    id: 'shadowPop', name: '阴影弹出', enName: 'Shadow Pop',
    config: { useSplitText: false },
    defaultParams: { duration: 0.3, x: -4, y: -4, ease: "power1.out" },
    run: (el, { duration, x, y, ease } = {}) => {
        return gsap.to(el, {
            textShadow: "1px 1px var(--accent-cyan), 2px 2px var(--accent-cyan), 3px 3px var(--accent-cyan), 4px 4px var(--accent-cyan)",
            x: x || -4,
            y: y || -4,
            duration: duration || 0.3,
            ease: ease || "power1.out",
            repeat: -1,
            yoyo: true,
            repeatDelay: 0.5
        });
    }
}
```

#### neonFlicker (霓虹闪烁)
```javascript
{ 
    id: 'neonFlicker', name: '霓虹闪烁', enName: 'Neon Flicker',
    config: { useSplitText: false },
    defaultParams: { duration: 1 },
    run: (el, { duration } = {}) => {
        const dur = duration || 1;
        gsap.set(el, { color: "#fff", textShadow: "0 0 10px #fff, 0 0 20px #fff, 0 0 30px var(--accent-purple), 0 0 40px var(--accent-purple)" });
        const tl = gsap.timeline({ repeat: -1 });
        tl.to(el, { opacity: 0.5, duration: 0.05 })
          .to(el, { opacity: 1, duration: 0.05 })
          .to(el, { opacity: 0.3, duration: 0.05 })
          .to(el, { opacity: 1, duration: 0.05 })
          .to(el, { opacity: 1, duration: dur });
        return tl;
    }
}
```

#### wordRotate (3D旋转)
```javascript
{ 
    id: 'wordRotate', name: '3D旋转', enName: '3D Rotate',
    config: { useSplitText: false },
    defaultParams: { duration: 0.5, delay: 1 },
    run: (el, configOrCb, cb) => {
        let config = configOrCb || {};
        let updateLabelCallback = cb;
        if (typeof configOrCb === 'function') {
            updateLabelCallback = configOrCb;
            config = {};
        }
        const { duration, delay } = config;

        gsap.set(el.parentNode, { perspective: 800 }); 
        const tl = gsap.timeline({ repeat: -1 });
        const words = ["未来", "科技", "动画", "GSAP"];
        words.forEach((word) => {
            tl.call(() => { if(updateLabelCallback) updateLabelCallback(word); })
              .fromTo(el, { rotationX: 90, opacity: 0 }, { rotationX: 0, opacity: 1, duration: duration || 0.5 })
              .to(el, { rotationX: -90, opacity: 0, duration: duration || 0.5, delay: delay || 1 });
        });
        return tl;
    }
}
```

**特点**: 用于强调文本内容，吸引注意力

**播放设置**:
- **默认**: 所有强调动画默认播放仅1次
- **支持无限循环设置**: 所有文本强调动画

**可编辑参数**:
- **duration**: 持续时间 (默认2秒，范围：0.5 - 5秒)
- **循环设置**: 支持开启无限循环

### 退场动画 (离场效果)

```
'textScramble'      // 乱码效果（可作为退场）
```

### 动画代码实现

#### textScramble (乱码效果)
```javascript
{ 
    id: 'textScramble', name: '乱码', enName: 'Scramble',
    config: { useSplitText: false },
    defaultParams: { duration: 1.5 },
    run: (el, config = {}) => {
        const duration = config.duration || 1.5;
        
        // 1. 获取并保存原始内容
        let endText = el.dataset.originalText;
        if (!endText) {
            endText = el.innerText || el.textContent || "";
            el.dataset.originalText = endText;
        }

        // 2. 确保元素可见
        gsap.set(el, { opacity: 1 });
        
        const chars = "!<>-_\\/[]{}—=+*^?#________";
        let obj = { val: 0 };
        
        return gsap.to(obj, {
            val: 1,
            duration: duration,
            onUpdate: () => {
                const progress = obj.val;
                let str = "";
                for(let i=0; i<endText.length; i++) {
                    if (progress * endText.length > i) {
                        str += endText[i];
                    } else {
                        str += chars[Math.floor(Math.random() * chars.length)];
                    }
                }
                el.innerText = str;
            }
        });
    }
}
```

**注**: 文本动画主要侧重入场和强调，退场效果较少

**可编辑参数**:
- **duration**: 持续时间 (默认1.5秒，范围：0.5 - 3秒)



-----暂不实现-------
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

**可编辑参数**:
- **duration**: 持续时间 (默认1秒，范围：0.3 - 5秒)

### 强调动画

```
'waveRipple',       // 波纹涟漪
'checkerboard'      // 棋盘格
```

**播放设置**:
- **默认**: 所有强调动画默认播放仅1次
- **支持无限循环设置**: 所有组强调动画

**可编辑参数**:
- **duration**: 持续时间 (默认0.5秒，范围：0.3 - 3秒)
- **循环设置**: 支持开启无限循环

### 退场动画

```
'explodeOut'        // 爆炸退场
```

**可编辑参数**:
- **duration**: 持续时间 (默认1秒，范围：0.5 - 3秒)

## 💡 使用建议

- **出场动画** → 页面加载、元素首次出现时使用
- **强调动画** → 需要吸引用户注意力、提示交互时使用  
- **退场动画** → 元素移除、页面跳转时使用
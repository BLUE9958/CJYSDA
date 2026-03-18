import { gsap } from 'gsap';

/**
 * author: duke
 * 场景大师动画库模版
 * Animation Library
 * Contains all animation definitions and logic for the GSAP Animation Lab.
 */

export const AnimationLib = {
    // -------------------------------------------------------------------------
    // Element Effects (Basic Transitions)
    // -------------------------------------------------------------------------
    elementEffects: [
        { 
            id: 'fadeIn', name: '淡入', enName: 'Fade In', 
            defaultParams: { duration: 1, ease: "power1.out" },
            // 使用 ...config 允许透传 duration, ease 等通用参数，但强制 opacity: 0
            run: (el, config = {}) => gsap.from(el, { duration: 1, ease: "power1.out", ...config, opacity: 0 }) 
        },
        { 
            id: 'fadeOut', name: '淡出', enName: 'Fade Out', 
            defaultParams: { duration: 1, ease: "power1.in" },
            run: (el, config = {}) => gsap.to(el, { duration: 1, ease: "power1.in", ...config, opacity: 0 }) 
        },
        { 
            id: 'slideLeft', name: '左滑', enName: 'Slide Left', 
            defaultParams: { duration: 1, distance: 300, ease: "power2.out" },
            // 解构业务参数 distance，映射为 x: -distance
            run: (el, { duration = 1, distance = 300, ease = "power2.out" } = {}) => gsap.from(el, { 
                duration, 
                x: -distance, 
                opacity: 0, 
                ease 
            }) 
        },
        { 
            id: 'slideRight', name: '右滑', enName: 'Slide Right', 
            defaultParams: { duration: 1, distance: 300, ease: "power2.out" },
            run: (el, { duration = 1, distance = 300, ease = "power2.out" } = {}) => gsap.from(el, { 
                duration, 
                x: distance, 
                opacity: 0, 
                ease 
            }) 
        },
        { 
            id: 'slideTop', name: '上滑', enName: 'Slide Top', 
            defaultParams: { duration: 1, distance: 300, ease: "power2.out" },
            run: (el, { duration = 1, distance = 300, ease = "power2.out" } = {}) => gsap.from(el, { 
                duration, 
                y: -distance, 
                opacity: 0, 
                ease 
            }) 
        },
        { 
            id: 'slideBottom', name: '下滑', enName: 'Slide Bottom', 
            defaultParams: { duration: 1, distance: 300, ease: "power2.out" },
            run: (el, { duration = 1, distance = 300, ease = "power2.out" } = {}) => gsap.from(el, { 
                duration, 
                y: distance, 
                opacity: 0, 
                ease 
            }) 
        },
        { 
            id: 'scaleUp', name: '放大', enName: 'Scale Up', 
            defaultParams: { duration: 1, scale: 0, ease: "back.out(1.7)" },
            run: (el, { duration = 1, scale = 0, ease = "back.out(1.7)" } = {}) => gsap.from(el, { 
                duration, 
                scale, 
                opacity: 0, 
                ease 
            }) 
        },
        { 
            id: 'scaleDown', name: '缩小', enName: 'Scale Down', 
            defaultParams: { duration: 1, scale: 2, ease: "power2.out" },
            run: (el, { duration = 1, scale = 2, ease = "power2.out" } = {}) => gsap.from(el, { 
                duration, 
                scale, 
                opacity: 0, 
                ease 
            }) 
        },
        { 
            id: 'rotateIn', name: '旋入', enName: 'Rotate In', 
            defaultParams: { duration: 1, rotation: -360, ease: "back.out(1.7)" },
            run: (el, { duration = 1, rotation = -360, ease = "back.out(1.7)" } = {}) => gsap.from(el, { 
                duration, 
                rotation, 
                opacity: 0, 
                scale: 0, 
                ease 
            }) 
        },
        { 
            id: 'rotateOut', name: '旋出', enName: 'Rotate Out', 
            defaultParams: { duration: 1, rotation: 360, ease: "power2.in" },
            run: (el, { duration = 1, rotation = 360, ease = "power2.in" } = {}) => gsap.to(el, { 
                duration, 
                rotation, 
                opacity: 0, 
                scale: 0, 
                ease 
            }) 
        },
        { 
            id: 'bounceIn', name: '弹入', enName: 'Bounce In', 
            defaultParams: { duration: 1 },
            run: (el, config = {}) => gsap.from(el, { duration: 1, ease: "bounce.out", ...config, scale: 0 }) 
        },
        { 
            id: 'elasticIn', name: '弹性进入', enName: 'Elastic In', 
            defaultParams: { duration: 1.5, x: -300 },
            run: (el, config = {}) => gsap.from(el, { 
                duration: 1.5, 
                x: -300, 
                ease: "elastic.out(1, 0.3)",
                ...config
            }) 
        },
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
        },
        { 
            id: 'neonPulse', name: '霓虹脉冲', enName: 'Neon Pulse', 
            defaultParams: { duration: 0.5, color: "rgba(0, 243, 255, 1)" },
            run: (el, { duration = 0.5, color = "rgba(0, 243, 255, 1)" } = {}) => {
                const tl = gsap.timeline({ repeat: -1, yoyo: true });
                const finalColor = color;
                const glowColor = finalColor.replace('1)', '0.8)').replace('rgb', 'rgba'); // Simple logic for demo
                const bgColor = finalColor.replace('1)', '0.4)').replace('rgb', 'rgba');
                
                tl.to(el, { 
                    duration, 
                    boxShadow: `0 0 50px ${finalColor}, 0 0 20px ${glowColor}`,
                    border: `5px solid ${finalColor}`,
                    backgroundColor: bgColor
                });
                return tl;
            }
        },
        { 
            id: 'blurIn', name: '模糊进入', enName: 'Blur In', 
            defaultParams: { duration: 1, blur: 20 },
            run: (el, { duration = 1, blur = 20 } = {}) => gsap.fromTo(el, 
                { filter: `blur(${blur}px)`, opacity: 0 }, 
                { duration, filter: "blur(0px)", opacity: 1 }
            ) 
        },
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
        },
        // {
        //     id: 'typewriter', name: '打字机', enName: 'Typewriter',
        //     config: { isTextEffect: true, useSplitText: false, overrideLabel: "系统入侵" },
        //     defaultParams: { duration: 2, width: "380px" },
        //     run: (el, { duration = 2, width = "380px" } = {}) => {
        //         gsap.set(el, { width: 0, color: 'var(--accent-cyan)', borderRight: "2px solid var(--accent-cyan)", overflow: "hidden", background: 'none', boxShadow: 'none' });
        //         const t1 = gsap.to(el, { duration, width, ease: "steps(13)" });
        //         gsap.to(el, { borderRightColor: "transparent", repeat: -1, yoyo: true, duration: 0.5, ease: "steps(1)" });
        //         return t1;
        //     }
        // },
        { 
            id: 'flipX', name: '水平翻转', enName: 'Flip X', 
            defaultParams: { duration: 1 },
            run: (el, { duration = 1 } = {}) => {
                 const tl = gsap.timeline({ repeat: 1, yoyo: true });
                tl.to(el, { duration, rotationX: 360, ease: "back.out(1.7)" }) 
                return tl;
            }
        },
        { 
            id: 'flipY', name: '垂直翻转', enName: 'Flip Y', 
            defaultParams: { duration: 1 },
            run: (el, { duration = 1 } = {}) => gsap.to(el, { 
                duration, 
                rotationY: 360, 
                ease: "back.out(1.7)" 
            }) 
        },
        { 
            id: 'zoomInRotate', name: '缩放旋转', enName: 'Zoom Rotate', 
            defaultParams: { duration: 1 },
            run: (el, { duration = 1 } = {}) => gsap.from(el, { 
                duration, 
                scale: 0, 
                rotation: 180, 
                opacity: 0 
            }) 
        },
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
        },
        { 
            id: 'swing', name: '摆动', enName: 'Swing', 
            defaultParams: { rotation: 15, duration: 0.2 },
            run: (el, { rotation = 15, duration = 0.2 } = {}) => {
                const t1 = gsap.to(el, { duration, rotation, transformOrigin: "50% 0%" });
                gsap.to(el, { duration: 2, rotation: 0, ease: "elastic.out(1.75, 0.1)", delay: duration });
                return t1; 
            }
        },
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
        },
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
        },
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
        },
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
        },
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
        },
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
        },
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
        },
        { 
            id: 'float', name: '漂浮', enName: 'Float', 
            defaultParams: { duration: 2, y: -20 },
            run: (el, { duration = 2, y = -20 } = {}) => {
                const tl = gsap.timeline({ repeat: -1, yoyo: true });
                tl.to(el, { y, duration, ease: "sine.inOut" });
                return tl;
            }
        }
    ],

    // -------------------------------------------------------------------------
    // Text Effects
    // -------------------------------------------------------------------------
    textEffects: [
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
        },
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
        },
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
        },
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
        },
        { 
            id: 'blurReveal', name: '模糊显现', enName: 'Blur Reveal',
            config: { useSplitText: false },
            defaultParams: { duration: 1.5, blur: 20, ease: "power2.out" },
            run: (el, { duration, blur, ease } = {}) => gsap.fromTo(el, 
                { filter: `blur(${blur || 20}px)`, opacity: 0 }, 
                { duration: duration || 1.5, filter: "blur(0px)", opacity: 1, ease: ease || "power2.out" }
            )
        },
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
        },
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
        },
        { 
            id: 'typewriterCursors', name: '打字机+', enName: 'Typewriter+',
            config: { useSplitText: false, initialLabel: "" },
            defaultParams: { duration: 3 },
            run: (el, config = {}) => {
                const duration = config.duration || 3;
                
                // 1. 获取并保存原始内容
                // 优先从 dataset 获取（避免之前的动画导致文本截断后再次获取到错误文本）
                // 如果没有 dataset，则从 element 获取，并保存到 dataset
                let originalText = el.dataset.originalText;
                if (!originalText) {
                    originalText = el.innerText || el.textContent || "";
                    el.dataset.originalText = originalText;
                }
                
                // 2. 样式重置与覆盖
                // width: 100% / height: 100% 会导致光标位置错误（在容器边缘而不是文字旁）
                // 强制使用 inline-block 和 auto 尺寸
                gsap.set(el, { 
                    opacity: 1, 
                    display: "inline-block", 
                    minWidth: "10px", 
                    width: "auto", 
                    height: "auto",
                    borderRight: "2px solid var(--accent-cyan)",
                    textShadow: "none" // 清除可能存在的文字阴影干扰
                });

                // 3. 光标闪烁动画
                gsap.fromTo(el, 
                    { borderRightColor: "var(--accent-cyan)" },
                    { 
                        borderRightColor: "transparent", 
                        duration: 0.5, 
                        repeat: -1, 
                        yoyo: true, 
                        ease: "steps(1)" 
                    }
                );
                
                // 4. 打字动画
                let cursorObj = { i: 0 };
                return gsap.to(cursorObj, {
                    i: originalText.length,
                    duration: duration,
                    ease: "steps(" + (originalText.length || 10) + ")",
                    onUpdate: () => {
                        const count = Math.ceil(cursorObj.i);
                        el.innerText = originalText.substring(0, count);
                    }
                });
            }
        },
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
        },
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
        },
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
        },
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
        },
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
        },
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
        },
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
        },
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
    ],

    // -------------------------------------------------------------------------
    // Group Effects
    // -------------------------------------------------------------------------
    groupEffects: [
        { 
            id: 'gridStagger', name: '网格交错', enName: 'Grid Stagger',
            defaultParams: { duration: 0.5, staggerAmount: 1, ease: "back.out(1.7)" },
            run: (container, configOrItems, extraItems) => {
                let config = configOrItems || {};
                let items = extraItems;
                if (configOrItems instanceof NodeList || Array.isArray(configOrItems)) {
                    items = configOrItems;
                    config = {};
                }
                const { duration, staggerAmount, ease } = config;
                
                const targets = items || container.children;
                return gsap.from(targets, {
                    scale: 0, opacity: 0, 
                    duration: duration || 0.5,
                    stagger: { grid: [3, 3], from: "start", amount: staggerAmount || 1 },
                    ease: ease || "back.out(1.7)"
                });
            }
        },
        { 
            id: 'staggerSlide', name: '滑动交错', enName: 'Slide Stagger',
            defaultParams: { duration: 0.8, stagger: 0.1, xOffset: 100, ease: "power2.out" },
            run: (container, configOrItems, extraItems) => {
                let config = configOrItems || {};
                let items = extraItems;
                if (configOrItems instanceof NodeList || Array.isArray(configOrItems)) {
                    items = configOrItems;
                    config = {};
                }
                const { duration, stagger, xOffset, ease } = config;

                const targets = items || container.children;
                const offset = xOffset || 100;
                return gsap.from(targets, {
                    x: (i) => i % 3 === 0 ? -offset : offset,
                    opacity: 0, 
                    duration: duration || 0.8, 
                    stagger: stagger || 0.1, 
                    ease: ease || "power2.out"
                });
            }
        },
        { 
            id: 'waveRipple', name: '波纹涟漪', enName: 'Wave Ripple',
            defaultParams: { duration: 0.5, scale: 0.5, staggerAmount: 1, ease: "power1.inOut" },
            run: (container, configOrItems, extraItems) => {
                let config = configOrItems || {};
                let items = extraItems;
                if (configOrItems instanceof NodeList || Array.isArray(configOrItems)) {
                    items = configOrItems;
                    config = {};
                }
                const { duration, scale, staggerAmount, ease } = config;

                const targets = items || container.children;
                const tl = gsap.timeline({ repeat: -1, yoyo: true });
                tl.to(targets, {
                    scale: scale || 0.5, 
                    duration: duration || 0.5,
                    stagger: { grid: [3, 3], from: "center", amount: staggerAmount || 1 },
                    ease: ease || "power1.inOut"
                });
                return tl;
            }
        },
        { 
            id: 'meetInMiddle', name: '汇聚', enName: 'Converge',
            defaultParams: { duration: 1, distance: 200, ease: "power4.out" },
            run: (container, configOrItems, extraItems) => {
                let config = configOrItems || {};
                let items = extraItems;
                if (configOrItems instanceof NodeList || Array.isArray(configOrItems)) {
                    items = configOrItems;
                    config = {};
                }
                const { duration, distance, ease } = config;
                
                const targets = items || container.children;
                const dist = distance || 200;
                return gsap.from(targets, {
                    x: (i) => (i % 3 - 1) * dist,
                    y: (i) => (Math.floor(i / 3) - 1) * dist,
                    opacity: 0, 
                    duration: duration || 1, 
                    ease: ease || "power4.out"
                });
            }
        },
        { 
            id: 'explodeOut', name: '爆炸', enName: 'Explode',
            defaultParams: { duration: 1, distance: 50, rotation: 180, ease: "power2.inOut" },
            run: (container, configOrItems, extraItems) => {
                let config = configOrItems || {};
                let items = extraItems;
                if (configOrItems instanceof NodeList || Array.isArray(configOrItems)) {
                    items = configOrItems;
                    config = {};
                }
                const { duration, distance, rotation, ease } = config;

                const targets = items || container.children;
                const dist = distance || 50;
                const tl = gsap.timeline();
                tl.to(targets, {
                    x: (i) => (i % 3 - 1) * dist,
                    y: (i) => (Math.floor(i / 3) - 1) * dist,
                    rotation: rotation || 180, 
                    duration: duration || 1, 
                    ease: ease || "power2.inOut"
                })
                .to(targets, { x: 0, y: 0, rotation: 0, duration: duration || 1, ease: "elastic.out(1, 0.5)" });
                return tl;
            }
        },
        { 
            id: 'dominoCascade', name: '多米诺', enName: 'Domino',
            defaultParams: { duration: 0.5, stagger: 0.1, rotationX: -90, ease: "back.out(1.7)" },
            run: (container, configOrItems, extraItems) => {
                let config = configOrItems || {};
                let items = extraItems;
                if (configOrItems instanceof NodeList || Array.isArray(configOrItems)) {
                    items = configOrItems;
                    config = {};
                }
                const { duration, stagger, rotationX, ease } = config;

                const targets = items || container.children;
                return gsap.from(targets, {
                    rotationX: rotationX || -90, 
                    opacity: 0, 
                    duration: duration || 0.5, 
                    stagger: stagger || 0.1, 
                    ease: ease || "back.out(1.7)"
                });
            }
        },
        { 
            id: 'spiralGrid', name: '螺旋', enName: 'Spiral',
            defaultParams: { duration: 0.5, stagger: 0.15, ease: "back.out(1.7)" },
            run: (container, configOrItems, extraItems) => {
                let config = configOrItems || {};
                let items = extraItems;
                if (configOrItems instanceof NodeList || Array.isArray(configOrItems)) {
                    items = configOrItems;
                    config = {};
                }
                const { duration, stagger, ease } = config;

                const targets = items || container.children;
                const spiralOrder = [0, 1, 2, 5, 8, 7, 6, 3, 4];
                const tl = gsap.timeline();
                Array.from(targets).forEach((item, i) => {
                    const orderIndex = spiralOrder.indexOf(i);
                    tl.from(item, {
                        scale: 0, opacity: 0, 
                        duration: duration || 0.5,
                        delay: orderIndex * (stagger || 0.15), 
                        ease: ease || "back.out(1.7)"
                    }, 0);
                });
                return tl;
            }
        },
        { 
            id: 'chaosConverge', name: '混沌网格', enName: 'Chaos Grid',
            defaultParams: { duration: 1.5, range: 500, ease: "power3.out" },
            run: (container, configOrItems, extraItems) => {
                let config = configOrItems || {};
                let items = extraItems;
                if (configOrItems instanceof NodeList || Array.isArray(configOrItems)) {
                    items = configOrItems;
                    config = {};
                }
                const { duration, range, ease } = config;

                const targets = items || container.children;
                const r = range || 500;
                return gsap.from(targets, {
                    x: () => Math.random() * r - (r/2),
                    y: () => Math.random() * r - (r/2),
                    rotation: () => Math.random() * 360,
                    opacity: 0, 
                    duration: duration || 1.5, 
                    ease: ease || "power3.out"
                });
            }
        },
        { 
            id: 'checkerboard', name: '棋盘格', enName: 'Checkerboard',
            defaultParams: { duration: 0.5, scale: 0.8 },
            run: (container, configOrItems, extraItems) => {
                let config = configOrItems || {};
                let items = extraItems;
                if (configOrItems instanceof NodeList || Array.isArray(configOrItems)) {
                    items = configOrItems;
                    config = {};
                }
                const { duration, scale } = config;

                const targets = items || container.children;
                const tl = gsap.timeline({ repeat: -1, yoyo: true });
                tl.to(targets, {
                    scale: (i) => i % 2 === 0 ? (scale || 0.8) : 1,
                    backgroundColor: (i) => i % 2 === 0 ? "var(--accent-purple)" : "rgba(0, 243, 255, 0.1)",
                    duration: duration || 0.5
                });
                return tl;
            }
        },
        { 
            id: 'elasticList', name: '弹性堆叠', enName: 'Elastic Stack',
            defaultParams: { duration: 1, y: 300, stagger: 0.1, ease: "elastic.out(1, 0.5)" },
            run: (container, configOrItems, extraItems) => {
                let config = configOrItems || {};
                let items = extraItems;
                if (configOrItems instanceof NodeList || Array.isArray(configOrItems)) {
                    items = configOrItems;
                    config = {};
                }
                const { duration, y, stagger, ease } = config;

                const targets = items || container.children;
                return gsap.from(targets, {
                    y: y || 300, 
                    opacity: 0, 
                    duration: duration || 1, 
                    stagger: stagger || 0.1, 
                    ease: ease || "elastic.out(1, 0.5)"
                });
            }
        }
    ]
};

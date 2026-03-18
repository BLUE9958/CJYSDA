/**
 * 基于图片中Transition.js的页面过渡动画配置
 * 严格按照 React Transition Component 的逻辑实现
 */

// 预设动画组合（基于图片中的动画逻辑）
const PRESET_PAIRS = [
    {
        id: 'slideInOut',
        name: '滑入滑出',
        description: '流畅的页面滑入滑出效果，具有科技感的速度变化',
        exit: 'slideOutRight',
        enter: 'slideInLeft',
        exitParams: { 
            duration: 0.5, 
            xPercent: 100,
            ease: "power2.inOut" 
        },
        enterParams: { 
            duration: 0.5, 
            xPercent: -100,
            ease: "power2.inOut" 
        }
    },
    {
        id: 'fadeInOut',
        name: '淡入淡出',
        description: '平滑的淡入淡出过渡，带有微妙的缩放效果增强科技感',
        exit: 'fadeOutScale',
        enter: 'fadeInScale',
        exitParams: { 
            duration: 0.4, 
            scale: 0.95,
            ease: "power2.inOut" 
        },
        enterParams: { 
            duration: 0.4, 
            scale: 0.95,
            ease: "power2.inOut" 
        }
    },
    {
        id: 'pageCurl',
        name: '页面卷曲',
        description: '模拟纸张卷曲的3D过渡效果，具有深度感',
        exit: 'curlOut',
        enter: 'curlIn',
        exitParams: { 
            duration: 0.6,
            ease: "power2.inOut" 
        },
        enterParams: { 
            duration: 0.6,
            ease: "power2.inOut" 
        }
    },
    {
        id: 'pushEffect',
        name: '推出',
        description: '新页面将当前页面推出的效果，带有微妙的倾斜角度增强视觉冲击力',
        exit: 'pushOut',
        enter: 'pushIn',
        exitParams: { 
            duration: 0.5, 
            xPercent: -120,
            rotationY: -10,
            ease: "power2.inOut" 
        },
        enterParams: { 
            duration: 0.5, 
            xPercent: 120,
            rotationY: 10,
            ease: "power2.inOut" 
        }
    },
    {
        id: 'scaleSlide',
        name: '缩放滑入',
        description: '现代感的缩放+滑入组合效果，增强页面切换的层次感',
        exit: 'scaleSlideOut',
        enter: 'scaleSlideIn',
        exitParams: { 
            duration: 0.4, 
            xPercent: 100,
            scaleTo: 0.8,
            ease: "power2.inOut" 
        },
        enterParams: { 
            duration: 0.5, 
            xPercent: -100,
            scaleFrom: 0.8,
            ease: "power2.inOut" 
        }
    },
    {
        id: 'staggeredFade',
        name: '交错淡入',
        description: '平滑的交错淡入效果，带有微妙的Y轴位移增强深度感',
        exit: 'fadeOutScale',
        enter: 'fadeInScale',
        exitParams: { 
            duration: 0.4, 
            scale: 0.95,
            yPercent: 10,
            ease: "power2.inOut" 
        },
        enterParams: { 
            duration: 0.4, 
            scale: 0.95,
            yPercent: -10,
            ease: "power2.inOut" 
        }
    },
    {
        id: 'elasticSlide',
        name: '弹性滑入',
        description: '带有弹性效果的页面滑入，增加动画的生动性',
        exit: 'slideOutRight',
        enter: 'slideInLeft',
        exitParams: { 
            duration: 0.6, 
            xPercent: 100,
            ease: "elastic.in(1, 0.3)" 
        },
        enterParams: { 
            duration: 0.6, 
            xPercent: -100,
            ease: "elastic.out(1, 0.3)" 
        }
    },
    {
        id: 'zoomFade',
        name: '缩放淡入',
        description: '现代感的缩放+淡入组合效果，创造焦点转移的视觉冲击',
        exit: 'zoomOut',
        enter: 'zoomIn',
        exitParams: { 
            duration: 0.4, 
            scaleTo: 0.8,
            ease: "back.in(1.2)" 
        },
        enterParams: { 
            duration: 0.4, 
            scaleFrom: 0.8,
            ease: "back.out(1.2)" 
        }
    },
    {
        id: 'cameraPush',
        name: '运镜推近',
        description: '模拟相机推近的转场效果，带有自然的速度变化，类似于剪映的运镜效果',
        exit: 'cameraPushOut',
        enter: 'cameraPushIn',
        exitParams: { 
            duration: 0.6, 
            scaleTo: 1.2,
            opacity: 0,
            ease: "power3.inOut" 
        },
        enterParams: { 
            duration: 0.6, 
            scaleFrom: 1.2,
            opacity: 0,
            ease: "power3.inOut" 
        }
    }
];

// 页面过渡动画配置（严格按照图片格式）
const pageTransitionEffects = [
    {
        id: 'slideOutRight',
        name: '向右滑出',
        enName: 'Slide Out Right',
        description: '页面向右滑出，带有平滑的速度变化',
        defaultParams: { 
            duration: 0.5, 
            xPercent: 100,
            yPercent: 0,
            ease: "power2.inOut" 
        },
        run: (el, config = {}) => {
            const { 
                duration = 0.5, 
                xPercent = 100, 
                yPercent = 0,
                ease = "power2.inOut" 
            } = config;
            
            const tl = gsap.timeline();
            
            tl.to(el, { 
                xPercent: xPercent, 
                yPercent: yPercent,
                duration: duration,
                ease: ease
            });
            
            return tl;
        }
    },
    {
        id: 'slideInLeft',
        name: '从左滑入',
        enName: 'Slide In Left',
        description: '页面从左侧滑入，带有平滑的速度变化',
        defaultParams: { 
            duration: 0.5, 
            xPercent: -100,
            yPercent: 0,
            ease: "power2.inOut" 
        },
        run: (el, config = {}) => {
            const { 
                duration = 0.5, 
                xPercent = -100, 
                yPercent = 0,
                ease = "power2.inOut" 
            } = config;
            
            // 确保元素已准备好，不设置display:none，而是通过autoAlpha控制
            gsap.set(el, { 
                display: 'flex',
                autoAlpha: 0, 
                xPercent: xPercent,
                yPercent: yPercent
            });
            
            const tl = gsap.timeline();
            
            tl.to(el, { 
                xPercent: 0, 
                yPercent: 0,
                autoAlpha: 1, 
                duration: duration,
                ease: ease
            });
            
            return tl;
        }
    },
    {
        id: 'fadeOutScale',
        name: '淡出缩小',
        enName: 'Fade Out Scale',
        description: '页面淡出并轻微缩小，增强科技感',
        defaultParams: { 
            duration: 0.4, 
            scale: 0.95,
            yPercent: 0,
            ease: "power2.inOut" 
        },
        run: (el, config = {}) => {
            const { 
                duration = 0.4, 
                scale = 0.95, 
                yPercent = 0,
                ease = "power2.inOut" 
            } = config;
            
            const tl = gsap.timeline();
            
            tl.to(el, { 
                scale: scale, 
                yPercent: yPercent,
                duration: duration,
                ease: ease
            });
            
            return tl;
        }
    },
    {
        id: 'fadeInScale',
        name: '淡入放大',
        enName: 'Fade In Scale',
        description: '页面淡入并轻微放大，增强科技感',
        defaultParams: { 
            duration: 0.4, 
            scale: 0.95,
            yPercent: 0,
            ease: "power2.inOut" 
        },
        run: (el, config = {}) => {
            const { 
                duration = 0.4, 
                scale = 0.95, 
                yPercent = 0,
                ease = "power2.inOut" 
            } = config;
            
            // 确保元素已准备好，不设置display:none
            gsap.set(el, { 
                display: 'flex',
                autoAlpha: 0, 
                scale: scale,
                yPercent: yPercent
            });
            
            const tl = gsap.timeline();
            
            tl.to(el, { 
                autoAlpha: 1, 
                scale: 1, 
                yPercent: 0,
                duration: duration,
                ease: ease
            });
            
            return tl;
        }
    },
    {
        id: 'curlOut',
        name: '卷曲退出',
        enName: 'Curl Out',
        description: '模拟纸张卷曲的3D退出效果',
        defaultParams: { 
            duration: 0.6,
            ease: "power2.inOut" 
        },
        run: (el, config = {}) => {
            const { 
                duration = 0.6, 
                ease = "power2.inOut" 
            } = config;
            
            const tl = gsap.timeline();
            
            // 增强3D效果：添加perspective和更自然的卷曲路径
            gsap.set(el, { transformPerspective: 800 });
            
            tl.to(el, { 
                rotationY: 90, 
                xPercent: 30, // 调整xPercent以增强空间感
                yPercent: 5, // 添加轻微的yPercent以模拟真实卷曲
                duration: duration,
                ease: ease,
                transformOrigin: "right center" // 从右侧中心卷曲
            });
            
            return tl;
        }
    },
    {
        id: 'curlIn',
        name: '卷曲进入',
        enName: 'Curl In',
        description: '模拟纸张卷曲的3D进入效果',
        defaultParams: { 
            duration: 0.6,
            ease: "power2.inOut" 
        },
        run: (el, config = {}) => {
            const { 
                duration = 0.6, 
                ease = "power2.inOut" 
            } = config;
            
            // 增强3D效果：添加perspective
            gsap.set(el, { transformPerspective: 800 });
            
            // 确保元素已准备好
            gsap.set(el, { display: 'flex' });
            
            // 设置初始状态：从右侧卷曲状态开始
            gsap.set(el, { 
                rotationY: 90, 
                xPercent: 30, 
                yPercent: 5,
                autoAlpha: 0,
                transformOrigin: "left center" // 从左侧中心展开
            });
            
            const tl = gsap.timeline();
            
            tl.to(el, { 
                rotationY: 0, 
                xPercent: 0, 
                yPercent: 0,
                autoAlpha: 1, 
                duration: duration,
                ease: ease
            });
            
            return tl;
        }
    },
    {
        id: 'pushOut',
        name: '被推出',
        enName: 'Push Out',
        description: '页面被推出，带有微妙的倾斜角度',
        defaultParams: { 
            duration: 0.5, 
            xPercent: -120,
            yPercent: 0,
            rotationY: -10,
            ease: "power2.inOut" 
        },
        run: (el, config = {}) => {
            const { 
                duration = 0.5, 
                xPercent = -120, 
                yPercent = 0,
                rotationY = -10,
                ease = "power2.inOut" 
            } = config;
            
            const tl = gsap.timeline();
            
            tl.to(el, { 
                xPercent: xPercent, 
                yPercent: yPercent,
                rotationY: rotationY,
                duration: duration,
                ease: ease
            });
            
            return tl;
        }
    },
    {
        id: 'pushIn',
        name: '推入',
        enName: 'Push In',
        description: '页面推入，带有微妙的倾斜角度',
        defaultParams: { 
            duration: 0.5, 
            xPercent: 120,
            yPercent: 0,
            rotationY: 10,
            ease: "power2.inOut" 
        },
        run: (el, config = {}) => {
            const { 
                duration = 0.5, 
                xPercent = 120, 
                yPercent = 0,
                rotationY = 10,
                ease = "power2.inOut" 
            } = config;
            
            // 确保元素已准备好
            gsap.set(el, { display: 'flex' });
            
            gsap.set(el, { 
                xPercent: xPercent, 
                yPercent: yPercent,
                rotationY: rotationY,
                autoAlpha: 0 
            });
            
            const tl = gsap.timeline();
            
            tl.to(el, { 
                xPercent: 0, 
                yPercent: 0,
                rotationY: 0,
                autoAlpha: 1, 
                duration: duration,
                ease: ease
            });
            
            return tl;
        }
    },
    {
        id: 'scaleSlideIn',
        name: '缩放滑入',
        enName: 'Scale Slide In',
        description: '基于图片Transition.js的进入动画：从左侧滑入+缩放',
        defaultParams: { 
            duration: 0.5, 
            xPercent: -100,
            yPercent: 0,
            scaleFrom: 0.8,
            ease: "power2.out"
        },
        run: (el, config = {}) => {
            const { 
                duration = 0.5, 
                xPercent = -100, 
                yPercent = 0,
                scaleFrom = 0.8, 
                ease = "power2.out" 
            } = config;
            
            // 确保元素已准备好
            gsap.set(el, { display: 'flex' });
            
            // 模拟 React Transition 的 onEnter
            gsap.set(el, { 
                autoAlpha: 0, 
                scale: scaleFrom, 
                xPercent: xPercent,
                yPercent: yPercent
            });
            
            const tl = gsap.timeline();
            
            // 第一步：淡入并水平移动 (duration * 0.5)
            tl.to(el, { 
                autoAlpha: 1, 
                xPercent: 0, 
                yPercent: 0,
                duration: duration * 0.5,
                ease: ease
            })
            // 第二步：缩放 (duration * 0.5)
            .to(el, { 
                scale: 1, 
                duration: duration * 0.5,
                ease: "power2.out"
            }, "-=0.1");
            
            return tl;
        }
    },
    {
        id: 'scaleSlideOut',
        name: '缩放滑出',
        enName: 'Scale Slide Out',
        description: '基于图片Transition.js的退出动画：缩放+向右滑出',
        defaultParams: { 
            duration: 0.4, 
            xPercent: 100,
            yPercent: 0,
            scaleTo: 0.8,
            ease: "power2.in"
        },
        run: (el, config = {}) => {
            const { 
                duration = 0.4, 
                xPercent = 100, 
                yPercent = 0,
                scaleTo = 0.8, 
                ease = "power2.in" 
            } = config;
            
            const tl = gsap.timeline();
            
            // 第一步：缩小 (duration * 0.5)
            tl.to(el, { 
                scale: scaleTo, 
                duration: duration * 0.5,
                ease: ease
            })
            // 第二步：右移 (duration * 0.5)
            .to(el, { 
                xPercent: xPercent, 
                yPercent: yPercent,
                duration: duration * 0.5,
                ease: ease
            }, "-=0.1");
            
            return tl;
        }
    },
    {
        id: 'fadeIn',
        name: '淡入',
        enName: 'Fade In',
        description: '元素淡入效果',
        defaultParams: { 
            duration: 1, 
            ease: "power1.out",
            opacity: 0
        },
        run: (el, config = {}) => gsap.from(el, { 
            duration: 1, 
            ease: "power1.out", 
            ...config, 
            opacity: 0 
        })
    },
    {
        id: 'fadeOut',
        name: '淡出',
        enName: 'Fade Out',
        description: '元素淡出效果',
        defaultParams: { 
            duration: 1, 
            ease: "power1.in"
        },
        run: (el, config = {}) => gsap.to(el, { 
            duration: 1, 
            ease: "power1.in", 
            ...config
        })
    },
    {
        id: 'slideLeft',
        name: '左滑',
        enName: 'Slide Left',
        description: '向左滑动退出',
        defaultParams: { 
            duration: 0.5, 
            xPercent: -100, 
            ease: "power2.in" 
        },
        run: (el, config = {}) => gsap.to(el, { 
            duration: 0.5, 
            ease: "power2.in", 
            ...config, 
            xPercent: -100
        })
    },
    {
        id: 'slideRight',
        name: '右滑',
        enName: 'Slide Right',
        description: '向右滑动进入',
        defaultParams: { 
            duration: 0.5, 
            xPercent: 100, 
            ease: "power2.out" 
        },
        run: (el, config = {}) => gsap.from(el, { 
            duration: 0.5, 
            ease: "power2.out", 
            ...config, 
            xPercent: 100, 
            opacity: 0 
        })
    },
    {
        id: 'bounceIn',
        name: '弹入',
        enName: 'Bounce In',
        description: '弹性进入效果',
        defaultParams: { 
            duration: 0.8, 
            scaleFrom: 0.3,
            ease: "bounce.out" 
        },
        run: (el, config = {}) => gsap.from(el, { 
            duration: 0.8, 
            ease: "bounce.out", 
            ...config, 
            scale: 0.3, 
            opacity: 0 
        })
    },
    {
        id: 'bounceOut',
        name: '弹出',
        enName: 'Bounce Out',
        description: '弹性退出效果',
        defaultParams: { 
            duration: 0.6, 
            scaleTo: 0.3,
            ease: "bounce.in" 
        },
        run: (el, config = {}) => gsap.to(el, { 
            duration: 0.6, 
            ease: "bounce.in", 
            ...config, 
            scale: 0.3
        })
    },
    {
        id: 'zoomIn',
        name: '放大进入',
        enName: 'Zoom In',
        description: '放大进入效果',
        defaultParams: { 
            duration: 0.5, 
            scaleFrom: 0,
            ease: "back.out(1.7)" 
        },
        run: (el, config = {}) => gsap.from(el, { 
            duration: 0.5, 
            ease: "back.out(1.7)", 
            ...config, 
            scale: 0, 
            opacity: 0 
        })
    },
    {
        id: 'zoomOut',
        name: '缩小退出',
        enName: 'Zoom Out',
        description: '缩小退出效果',
        defaultParams: { 
            duration: 0.4, 
            scaleTo: 0,
            ease: "back.in(1.7)" 
        },
        run: (el, config = {}) => gsap.to(el, { 
            duration: 0.4, 
            ease: "back.in(1.7)", 
            ...config, 
            scale: 0
        })
    },
    {
        id: 'cameraPushOut',
        name: '运镜推近退出',
        enName: 'Camera Push Out',
        description: '模拟相机推近的退出效果，带有速度变化',
        defaultParams: { 
            duration: 0.6, 
            scaleTo: 1.2,
            opacity: 0,
            ease: "power3.inOut" 
        },
        run: (el, config = {}) => {
            const { 
                duration = 0.6, 
                scaleTo = 1.2, 
                opacity = 0,
                ease = "power3.inOut" 
            } = config;
            
            const tl = gsap.timeline();
            
            tl.to(el, { 
                scale: scaleTo, 
                opacity: opacity,
                duration: duration,
                ease: ease
            });
            
            return tl;
        }
    },
    {
        id: 'cameraPushIn',
        name: '运镜推近进入',
        enName: 'Camera Push In',
        description: '模拟相机推近的进入效果，带有速度变化',
        defaultParams: { 
            duration: 0.6, 
            scaleFrom: 1.2,
            opacity: 0,
            ease: "power3.inOut" 
        },
        run: (el, config = {}) => {
            const { 
                duration = 0.6, 
                scaleFrom = 1.2, 
                opacity = 0,
                ease = "power3.inOut" 
            } = config;
            
            // 确保元素已准备好
            gsap.set(el, { display: 'flex' });
            
            gsap.set(el, { 
                scale: scaleFrom, 
                opacity: opacity
            });
            
            const tl = gsap.timeline();
            
            tl.to(el, { 
                scale: 1, 
                opacity: 1,
                duration: duration,
                ease: ease
            });
            
            return tl;
        }
    }
];

// 页面过渡动画管理器
class PageTransitionManager {
    constructor() {
        this.effects = pageTransitionEffects;
        this.presets = PRESET_PAIRS;
        this.currentTimeline = null;
        this.isAnimating = false;
        this.performance = {
            startTime: 0,
            frames: 0,
            fps: 60
        };
    }
    
    /**
     * 执行页面过渡动画
     * @param {string} exitEffectId - 退出动画ID
     * @param {string} enterEffectId - 进入动画ID
     * @param {HTMLElement} currentPage - 当前页面元素
     * @param {HTMLElement} newPage - 新页面元素
     * @param {object} exitConfig - 退出动画配置
     * @param {object} enterConfig - 进入动画配置
     */
    execute(exitEffectId, enterEffectId, currentPage, newPage, exitConfig = {}, enterConfig = {}) {
        this.stop();
        
        const exitEffect = this.getEffect(exitEffectId);
        const enterEffect = this.getEffect(enterEffectId);
        
        if (!exitEffect || !enterEffect) {
            throw new Error(`动画效果不存在: ${exitEffectId} 或 ${enterEffectId}`);
        }
        
        this.isAnimating = true;
        this.startPerformanceTracking();
        
        // 重置并准备页面状态
        gsap.set([currentPage, newPage], { 
            display: 'flex', 
            autoAlpha: 1, 
            zIndex: 1 
        });
        
        // 确保新页面在动画开始前完全准备好
        gsap.set(newPage, { 
            display: 'flex', 
            autoAlpha: 0.01, // 非常低的初始透明度，确保元素已渲染但不可见
            zIndex: 2,
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%'
        });
        
        // 当前页面保持在顶层
        gsap.set(currentPage, { 
            zIndex: 3,
            position: 'relative'
        });
        
        const masterTimeline = gsap.timeline({
            onStart: () => {
                this.log('开始页面过渡动画');
            },
            onComplete: () => {
                this.isAnimating = false;
                this.stopPerformanceTracking();
                // 动画完全结束后才隐藏当前页面
                gsap.set(currentPage, { display: 'none', zIndex: 1 });
                gsap.set(newPage, { 
                    zIndex: 2,
                    position: 'relative'
                });
                this.log('页面过渡完成');
            },
            onUpdate: this.updatePerformance.bind(this)
        });
        
        // 合并默认参数和自定义参数
        const exitParams = { ...exitEffect.defaultParams, ...exitConfig };
        const enterParams = { ...enterEffect.defaultParams, ...enterConfig };
        
        // 执行退出动画
        const exitTL = exitEffect.run(currentPage, exitParams);
        
        // 执行进入动画
        const enterTL = enterEffect.run(newPage, enterParams);
        
        // 智能重叠计算：根据动画类型调整重叠比例
        let overlapRatio = 0.97; // 更高的重叠比例，增强连续性
        
        // 对于3D动画，使用更高的重叠以增强空间感
        if (exitEffectId.includes('curl') || enterEffectId.includes('curl')) {
            overlapRatio = 0.99;
        }
        
        // 对于淡入淡出动画，使用适中重叠以保持优雅
        if (exitEffectId.includes('fade') && enterEffectId.includes('fade')) {
            overlapRatio = 0.90;
        }
        
        // 对于缩放动画，使用较高重叠以增强空间连续性
        if (exitEffectId.includes('scale') || enterEffectId.includes('scale')) {
            overlapRatio = 0.95;
        }
        
        // 计算重叠时间
        const overlap = Math.min(exitParams.duration || 0.5, enterParams.duration || 0.5) * overlapRatio;
        
        // 添加动画到主时间线，确保充分重叠
        masterTimeline.add(exitTL);
        masterTimeline.add(enterTL, `-=${overlap}`);
        
        this.currentTimeline = masterTimeline;
        return masterTimeline;
    }
    
    /**
     * 执行预设动画组合
     */
    executePreset(presetId, currentPage, newPage, customConfig = {}) {
        const preset = this.presets.find(p => p.id === presetId);
        if (!preset) {
            throw new Error(`预设组合不存在: ${presetId}`);
        }
        
        return this.execute(
            preset.exit,
            preset.enter,
            currentPage,
            newPage,
            { ...preset.exitParams, ...customConfig.exit },
            { ...preset.enterParams, ...customConfig.enter }
        );
    }
    
    /**
     * 获取动画效果
     */
    getEffect(effectId) {
        return this.effects.find(e => e.id === effectId);
    }
    
    /**
     * 获取所有动画效果
     */
    getAllEffects() {
        return this.effects.map(e => ({
            id: e.id,
            name: e.name,
            enName: e.enName,
            description: e.description,
            defaultParams: e.defaultParams
        }));
    }
    
    /**
     * 获取所有预设组合
     */
    getAllPresets() {
        return this.presets.map(p => ({
            id: p.id,
            name: p.name,
            description: p.description,
            exit: p.exit,
            enter: p.enter
        }));
    }
    
    /**
     * 停止动画
     */
    stop() {
        if (this.currentTimeline) {
            this.currentTimeline.kill();
            this.currentTimeline = null;
        }
        this.isAnimating = false;
    }
    
    /**
     * 重置页面状态
     */
    reset(currentPage, newPage) {
        this.stop();
        gsap.set([currentPage, newPage], { clearProps: "all" });
        gsap.set(currentPage, { display: 'flex', autoAlpha: 1 });
        gsap.set(newPage, { display: 'none', autoAlpha: 0 });
    }
    
    /**
     * 性能监控
     */
    startPerformanceTracking() {
        this.performance.startTime = performance.now();
        this.performance.frames = 0;
        this.performance.lastTime = this.performance.startTime;
        requestAnimationFrame(this.updatePerformance.bind(this));
    }
    
    updatePerformance() {
        this.performance.frames++;
        const now = performance.now();
        const elapsed = now - this.performance.lastTime;
        
        if (elapsed >= 1000) {
            this.performance.fps = Math.round((this.performance.frames * 1000) / elapsed);
            this.performance.frames = 0;
            this.performance.lastTime = now;
        }
    }
    
    stopPerformanceTracking() {
        const totalTime = performance.now() - this.performance.startTime;
        this.performance.totalTime = totalTime;
    }
    
    /**
     * 日志记录
     */
    log(message, type = 'info') {
        const timestamp = new Date().toLocaleTimeString();
        const logMessage = `[${timestamp}] ${message}`;
        console.log(`%c${logMessage}`, `color: ${type === 'error' ? '#ff6b6b' : '#4ecdc4'}`);
        
        // 触发自定义事件供UI监听
        const event = new CustomEvent('animationLog', { 
            detail: { message: logMessage, type, timestamp } 
        });
        document.dispatchEvent(event);
        
        return logMessage;
    }
}

// 创建全局实例
const pageTransitionManager = new PageTransitionManager();

// 导出供预览界面使用
window.PageTransitionManager = pageTransitionManager;
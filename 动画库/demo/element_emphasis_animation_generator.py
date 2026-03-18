import asyncio
from playwright.async_api import async_playwright
from PIL import Image
import io
import os
import math

class ElementEmphasisAnimationGenerator:
    def __init__(self, config):
        self.config = config
        os.makedirs(config['output_dir'], exist_ok=True)

    async def capture_animation_frames(self, effect_id, effect_code, text):
        """使用Playwright浏览器捕获动画帧"""
        frames = []
        async with async_playwright() as p:
            # 启动浏览器
            browser = await p.chromium.launch(headless=True)  # 无头模式
            page = await browser.new_page()
            
            # 设置视口
            await page.set_viewport_size({
                'width': self.config['width'],
                'height': self.config['height']
            })
            
            # 创建简单的HTML页面，使用内联CSS和GSAP动画
            html_content = f'''
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="utf-8">
                <title>Animation</title>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
                <style>
                    * {{
                        margin: 0;
                        padding: 0;
                        box-sizing: border-box;
                    }}
                    body {{
                        width: {self.config['width']}px;
                        height: {self.config['height']}px;
                        background-color: {self.config['bg_color']};
                        position: relative;
                        overflow: hidden;
                        perspective: 800px; /* 添加透视效果，增强3D翻转 */
                    }}
                    .pentagon {{
                        /* 绝对居中定位 - 水平和垂直居中 */
                        position: absolute;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        margin: auto;
                        width: 44px;
                        height: 44px;
                        fill: #E1E8FB;
                        transform-style: preserve-3d; /* 保持3D变换 */
                    }}
                </style>
            </head>
            <body>
                <svg class="pentagon" viewBox="0 0 44 44">
                    <path d="M22 1.5L28.5 17.5L44 19L33 31L36 44L22 35.5L8 44L11 31L0 19L15.5 17.5L22 1.5Z"/>
                </svg>
                
                <script>
                    // 定义动画函数
                    function startAnimation() {{
                        const pentagon = document.querySelector('.pentagon');
                        
                        // 重置元素初始状态
                        gsap.set(pentagon, {{ 
                            opacity: 1, 
                            x: 0, 
                            y: 0 
                        }});
                        
                        // 创建时间线，控制完整的动画流程：2秒强调动画 + 0.25秒淡出
                        const tl = gsap.timeline();
                        
                        // 根据效果ID设置不同的强调动画（2秒）
                        switch ('{effect_id}') {{
                            case 'breathing':
                                // 呼吸效果，2秒循环
                                tl.to(pentagon, 
                                    {{ scale: 1.1, opacity: 0.8, duration: 1, ease: 'sine.inOut', repeat: 1, yoyo: true }}
                                );
                                break;
                            case 'neonPulse':
                                // 霓虹脉冲，2秒完成
                                tl.to(pentagon, 
                                    {{ boxShadow: '0 0 50px rgba(0, 243, 255, 1), 0 0 20px rgba(0, 243, 255, 0.8)',
                                       border: '5px solid rgba(0, 243, 255, 1)',
                                       backgroundColor: 'rgba(0, 243, 255, 0.4)',
                                       duration: 0.5, repeat: 1, yoyo: true }}
                                );
                                break;
                            case 'shake':
                                // 抖动效果，2秒完成
                                tl.to(pentagon, {{ x: -10, duration: 0.1 }})
                                  .to(pentagon, {{ x: 10, duration: 0.1 }})
                                  .to(pentagon, {{ x: -10, duration: 0.1 }})
                                  .to(pentagon, {{ x: 10, duration: 0.1 }})
                                  .to(pentagon, {{ x: 0, duration: 0.1 }});
                                break;
                            case 'wobble':
                                // 摇晃效果，2秒完成
                                tl.to(pentagon, {{ rotation: -5, x: -10, duration: 0.15 }})
                                  .to(pentagon, {{ rotation: 3, x: 10, duration: 0.15 }})
                                  .to(pentagon, {{ rotation: -3, x: -5, duration: 0.15 }})
                                  .to(pentagon, {{ rotation: 2, x: 5, duration: 0.15 }})
                                  .to(pentagon, {{ rotation: 0, x: 0, duration: 0.15 }});
                                break;
                            case 'jello':
                                // 果冻效果，2秒完成
                                tl.to(pentagon, {{ skewX: 12.5, skewY: 12.5, duration: 0.2 }})
                                  .to(pentagon, {{ skewX: -6.25, skewY: -6.25, duration: 0.2 }})
                                  .to(pentagon, {{ skewX: 3.125, skewY: 3.125, duration: 0.2 }})
                                  .to(pentagon, {{ skewX: 0, skewY: 0, duration: 0.2 }});
                                break;
                            case 'colorCycle':
                                // 色彩循环，2秒完成
                                tl.to(pentagon, {{ backgroundColor: "#ff0000", duration: 0.67 }})
                                  .to(pentagon, {{ backgroundColor: "#00ff00", duration: 0.67 }})
                                  .to(pentagon, {{ backgroundColor: "#0000ff", duration: 0.67 }});
                                break;
                            case 'flash':
                                // 闪烁效果，2秒完成
                                tl.to(pentagon, {{ opacity: 0, duration: 0.2 }})
                                  .to(pentagon, {{ opacity: 1, duration: 0.2 }})
                                  .to(pentagon, {{ opacity: 0, duration: 0.2 }})
                                  .to(pentagon, {{ opacity: 1, duration: 0.2 }});
                                break;
                            case 'rubberBand':
                                // 橡皮筋效果，2秒完成
                                tl.to(pentagon, {{ scaleX: 1.25, scaleY: 0.75, duration: 0.3 }})
                                  .to(pentagon, {{ scaleX: 0.75, scaleY: 1.25, duration: 0.1 }})
                                  .to(pentagon, {{ scaleX: 1.15, scaleY: 0.85, duration: 0.1 }})
                                  .to(pentagon, {{ scaleX: 0.95, scaleY: 1.05, duration: 0.1 }})
                                  .to(pentagon, {{ scaleX: 1, scaleY: 1, duration: 0.1 }});
                                break;
                            case 'tada':
                                // 哒哒效果，2秒完成
                                tl.to(pentagon, {{ scale: 0.9, rotation: -3, duration: 0.1 }})
                                  .to(pentagon, {{ scale: 1.1, rotation: 3, duration: 0.1 }})
                                  .to(pentagon, {{ scale: 1.1, rotation: -3, duration: 0.1 }})
                                  .to(pentagon, {{ scale: 1.1, rotation: 3, duration: 0.1 }})
                                  .to(pentagon, {{ scale: 1, rotation: 0, duration: 0.1 }});
                                break;
                            case 'heartbeat':
                                // 心跳效果，2秒完成
                                tl.to(pentagon, {{ scale: 1.3, duration: 0.15, ease: "power1.out" }})
                                  .to(pentagon, {{ scale: 1, duration: 0.15, ease: "power1.in" }})
                                  .to(pentagon, {{ scale: 1.3, duration: 0.15, ease: "power1.out", delay: 0.1 }})
                                  .to(pentagon, {{ scale: 1, duration: 0.3, ease: "power1.in" }});
                                break;
                            case 'float':
                                // 漂浮效果，2秒完成
                                tl.to(pentagon, {{ y: -20, duration: 1, ease: "sine.inOut" }});
                                break;
                            default:
                                // 默认淡入效果
                                tl.to(pentagon, 
                                    {{ scale: 1.1, opacity: 0.8, duration: 1, ease: 'sine.inOut', repeat: 1, yoyo: true }}
                                );
                                break;
                        }}
                        
                        // 添加0.25秒淡出效果（短时间淡出，仅用于与开始画面衔接）
                        tl.to(pentagon, {{ opacity: 0, duration: 0.25, ease: 'power1.out' }});
                    }}
                    
                    // 页面加载后立即执行动画
                    window.addEventListener('load', function() {{
                        startAnimation();
                    }});
                </script>
            </body>
            </html>
            '''
            
            # 导航到空白页面
            await page.goto('about:blank')
            
            # 设置内容
            await page.set_content(html_content)
            
            # 等待页面加载完成
            await page.wait_for_load_state('networkidle')
            
            # 计算帧数
            total_frames = int(self.config['duration'] * self.config['fps'])
            frame_time = 1000 / self.config['fps']
            
            print(f"调试：捕获 {total_frames} 帧，每帧 {frame_time}ms")
            
            # 等待动画开始
            await page.wait_for_timeout(200)
            
            # 捕获帧
            for i in range(total_frames):
                # 截图
                screenshot = await page.screenshot()
                img = Image.open(io.BytesIO(screenshot))
                frames.append(img)
                
                # 等待下一帧
                await page.wait_for_timeout(frame_time)
            
            # 关闭浏览器
            await browser.close()
        
        return frames

    def save_gif(self, frames, output_path, duration):
        """保存帧序列为GIF"""
        if frames:
            # 调试：检查帧数量和差异
            print(f"调试：总帧数: {len(frames)}")
            
            # 检查前几帧是否有差异
            if len(frames) > 1:
                # 比较第一帧和第二帧的像素数据
                from PIL import ImageChops
                diff = ImageChops.difference(frames[0], frames[1])
                bbox = diff.getbbox()
                print(f"调试：前两帧差异区域: {bbox}")
            
            # 转换所有帧为RGB模式，确保兼容性
            rgb_frames = []
            for frame in frames:
                rgb_frames.append(frame.convert('RGB'))
            
            # 根据配置的fps计算每帧持续时间
            frame_duration = 1000 / self.config['fps']
            
            # 保存GIF，优化参数设置
            rgb_frames[0].save(
                output_path,
                save_all=True,
                append_images=rgb_frames[1:],
                duration=frame_duration,  # 根据fps计算
                loop=0,  # 无限循环
                optimize=True,  # 启用优化，减小文件大小
                disposal=2,  # 恢复背景色，确保帧过渡清晰
                quality=80  # 设置质量
            )
            print(f"✅ 已生成: {output_path}")
            print(f"✅ GIF尺寸: {os.path.getsize(output_path)} 字节")

    async def generate_animation(self, effect):
        """生成单个动画效果的GIF"""
        effect_id = effect['id']
        effect_name = effect['name']
        
        print(f"正在生成 {effect_name} 动画...")
        
        try:
            # 捕获动画帧 - 不再需要text参数
            frames = await self.capture_animation_frames(effect_id, "", "")
            
            # 保存GIF
            output_filename = f"{effect_id}_emphasis.gif"
            output_path = os.path.join(self.config['output_dir'], output_filename)
            
            self.save_gif(frames, output_path, self.config['duration'])
            print(f"已生成 {len(frames)} 帧")
            return True
            
        except Exception as e:
            print(f"❌ 生成 {effect_name} 动画时出错: {str(e)}")
            import traceback
            traceback.print_exc()
            return False

    async def generate_all_animations(self, text, effects):
        """批量生成所有动画效果的GIF"""
        print(f"开始生成强调动画GIF...")
        print("-" * 50)
        
        success_count = 0
        for effect in effects:
            success = await self.generate_animation(effect)
            if success:
                success_count += 1
        
        print("-" * 50)
        print(f"动画生成完成！成功: {success_count}/{len(effects)}")
        print(f"文件保存在: {self.config['output_dir']} 目录")

# 配置参数
CONFIG = {
    'width': 80,                     # 画布宽度
    'height': 80,                    # 画布高度
    'bg_color': '#ffffff',           # 白色背景
    'duration': 2.25,                # 动画总时长2.25秒（2秒强调动画+0.25秒淡出）
    'fps': 30,                       # 帧率30
    'output_dir': 'animated_gifs_emphasis'    # 输出目录
}

# 动画效果定义（从animation-classification-v1.0.md提取的强调动画）
ANIMATION_EFFECTS = [
    {
        'id': 'breathing',
        'name': '呼吸效果',
        'enName': 'Breathing',
        'defaultParams': { 'duration': 1, 'scale': 1.1, 'opacity': 0.8 },
        'run': "(el, { duration = 1, scale = 1.1, opacity = 0.8 } = {}) => { const tl = gsap.timeline({ repeat: -1, yoyo: true }); tl.to(el, { duration, scale, opacity, ease: 'sine.inOut' }); return tl; }"
    },
    {
        'id': 'neonPulse',
        'name': '霓虹脉冲',
        'enName': 'Neon Pulse',
        'defaultParams': { 'duration': 0.5, 'color': "rgba(0, 243, 255, 1)" },
        'run': "(el, { duration = 0.5, color = 'rgba(0, 243, 255, 1)' } = {}) => { const tl = gsap.timeline({ repeat: -1, yoyo: true }); const finalColor = color; const glowColor = finalColor.replace('1)', '0.8)').replace('rgb', 'rgba'); const bgColor = finalColor.replace('1)', '0.4)').replace('rgb', 'rgba'); tl.to(el, { duration, boxShadow: `0 0 50px ${finalColor}, 0 0 20px ${glowColor}`, border: `5px solid ${finalColor}`, backgroundColor: bgColor }); return tl; }"
    },
    {
        'id': 'shake',
        'name': '抖动',
        'enName': 'Shake',
        'defaultParams': { 'intensity': 10, 'speed': 0.1 },
        'run': "(el, { intensity = 10, speed = 0.1 } = {}) => { const tl = gsap.timeline(); tl.to(el, { x: -intensity, duration: speed }).to(el, { x: intensity, duration: speed }).to(el, { x: -intensity, duration: speed }).to(el, { x: intensity, duration: speed }).to(el, { x: 0, duration: speed }); return tl; }"
    },
    {
        'id': 'wobble',
        'name': '摇晃',
        'enName': 'Wobble',
        'defaultParams': { 'duration': 0.15, 'intensity': 1 },
        'run': "(el, { duration = 0.15, intensity = 1 } = {}) => { const i = intensity; const tl = gsap.timeline(); tl.to(el, { rotation: -5 * i, x: -10 * i, duration }).to(el, { rotation: 3 * i, x: 10 * i, duration }).to(el, { rotation: -3 * i, x: -5 * i, duration }).to(el, { rotation: 2 * i, x: 5 * i, duration }).to(el, { rotation: 0, x: 0, duration }); return tl; }"
    },
    {
        'id': 'jello',
        'name': '果冻',
        'enName': 'Jello',
        'defaultParams': { 'duration': 0.2, 'intensity': 1 },
        'run': "(el, { duration = 0.2, intensity = 1 } = {}) => { const i = intensity; const tl = gsap.timeline(); tl.to(el, { skewX: 12.5 * i, skewY: 12.5 * i, duration }).to(el, { skewX: -6.25 * i, skewY: -6.25 * i, duration }).to(el, { skewX: 3.125 * i, skewY: 3.125 * i, duration }).to(el, { skewX: 0, skewY: 0, duration }); return tl; }"
    },
    {
        'id': 'colorCycle',
        'name': '色彩循环',
        'enName': 'Color Cycle',
        'defaultParams': { 'duration': 1 },
        'run': "(el, { duration = 1 } = {}) => { const tl = gsap.timeline({ repeat: -1, yoyo: true }); tl.to(el, { backgroundColor: '#ff0000', duration }).to(el, { backgroundColor: '#00ff00', duration }).to(el, { backgroundColor: '#0000ff', duration }); return tl; }"
    },
    {
        'id': 'flash',
        'name': '闪烁',
        'enName': 'Flash',
        'defaultParams': { 'duration': 0.2 },
        'run': "(el, { duration = 0.2 } = {}) => { const tl = gsap.timeline(); tl.to(el, { opacity: 0, duration }).to(el, { opacity: 1, duration }).to(el, { opacity: 0, duration }).to(el, { opacity: 1, duration }); return tl; }"
    },
    {
        'id': 'rubberBand',
        'name': '橡皮筋',
        'enName': 'Rubber Band',
        'defaultParams': { 'duration': 0.1 },
        'run': "(el, { duration = 0.1 } = {}) => { const tl = gsap.timeline(); tl.to(el, { scaleX: 1.25, scaleY: 0.75, duration: duration * 3 }).to(el, { scaleX: 0.75, scaleY: 1.25, duration }).to(el, { scaleX: 1.15, scaleY: 0.85, duration }).to(el, { scaleX: 0.95, scaleY: 1.05, duration }).to(el, { scaleX: 1, scaleY: 1, duration }); return tl; }"
    },
    {
        'id': 'tada',
        'name': '哒哒',
        'enName': 'Tada',
        'defaultParams': { 'duration': 0.1, 'scale': 1.1, 'rotation': 3 },
        'run': "(el, { duration = 0.1, scale = 1.1, rotation = 3 } = {}) => { const tl = gsap.timeline(); tl.to(el, { scale: 0.9, rotation: -rotation, duration }).to(el, { scale, rotation, duration }).to(el, { scale, rotation: -rotation, duration }).to(el, { scale, rotation, duration }).to(el, { scale: 1, rotation: 0, duration }); return tl; }"
    },
    {
        'id': 'heartbeat',
        'name': '心跳',
        'enName': 'Heartbeat',
        'defaultParams': { 'duration': 0.15, 'scale': 1.3 },
        'run': "(el, { duration = 0.15, scale = 1.3 } = {}) => { const tl = gsap.timeline({ repeat: -1 }); tl.to(el, { scale, duration, ease: 'power1.out' }).to(el, { scale: 1, duration, ease: 'power1.in' }).to(el, { scale, duration, ease: 'power1.out', delay: 0.1 }).to(el, { scale: 1, duration: duration * 2, ease: 'power1.in' }); return tl; }"
    },
    {
        'id': 'float',
        'name': '漂浮',
        'enName': 'Float',
        'defaultParams': { 'duration': 2, 'y': -20 },
        'run': "(el, { duration = 2, y = -20 } = {}) => { const tl = gsap.timeline({ repeat: -1, yoyo: true }); tl.to(el, { y, duration, ease: 'sine.inOut' }); return tl; }"
    }
]

async def main():
    """主函数"""
    # 创建动画生成器
    generator = ElementEmphasisAnimationGenerator(CONFIG)
    
    # 生成所有动画效果
    await generator.generate_all_animations("", ANIMATION_EFFECTS)

if __name__ == "__main__":
    asyncio.run(main())
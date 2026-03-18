import asyncio
from playwright.async_api import async_playwright
from PIL import Image
import io
import os
import math

class ElementExitAnimationGenerator:
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
                        
                        // 创建时间线，控制完整的动画流程：1秒停留 + 2秒退场动画
                        const tl = gsap.timeline();
                        
                        // 添加1秒停留效果
                        tl.to(pentagon, {{ duration: 1 }});
                        
                        // 根据效果ID设置不同的退场动画（2秒）
                        switch ('{effect_id}') {{
                            case 'fadeOut':
                                // 淡出效果，2秒完成
                                tl.to(pentagon, 
                                    {{ opacity: 0, duration: 2, ease: 'power1.in' }}
                                );
                                break;
                            case 'scaleDown':
                                // 缩小离开，2秒完成
                                tl.to(pentagon, 
                                    {{ scale: 0, opacity: 0, duration: 2, ease: 'power2.out' }}
                                );
                                break;
                            case 'rotateOut':
                                // 旋出效果，2秒完成
                                tl.to(pentagon, 
                                    {{ rotation: 360, scale: 0, opacity: 0, duration: 2, ease: 'power2.in' }}
                                );
                                break;
                            case 'glitch':
                                // 故障效果，2秒完成
                                tl.to(pentagon, {{ x: -5, skewX: 5, duration: 0.1, ease: 'steps(1)' }})
                                  .to(pentagon, {{ x: 5, skewX: -5, duration: 0.1, ease: 'steps(1)' }})
                                  .to(pentagon, {{ x: 0, skewX: 0, duration: 0.1 }})
                                  .to(pentagon, {{ x: -5, skewX: 5, duration: 0.1, ease: 'steps(1)' }})
                                  .to(pentagon, {{ x: 5, skewX: -5, duration: 0.1, ease: 'steps(1)' }})
                                  .to(pentagon, {{ x: 0, skewX: 0, opacity: 0, duration: 0.1 }});
                                break;
                            default:
                                // 默认淡出效果
                                tl.to(pentagon, 
                                    {{ opacity: 0, duration: 2, ease: 'power1.in' }}
                                );
                                break;
                        }}
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
            output_filename = f"{effect_id}_exit.gif"
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
        print(f"开始生成退场动画GIF...")
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
    'duration': 3.0,                 # 动画总时长3.0秒（1秒停留+2秒退场动画）
    'fps': 30,                       # 帧率30
    'output_dir': 'animated_gifs_exit'    # 输出目录
}

# 动画效果定义（从animation-classification-v1.0.md提取的退场动画）
ANIMATION_EFFECTS = [
    {
        'id': 'fadeOut',
        'name': '淡出',
        'enName': 'Fade Out',
        'defaultParams': { 'duration': 1, 'ease': "power1.in" },
        'run': "(el, config = {}) => gsap.to(el, { duration: 1, ease: 'power1.in', ...config, opacity: 0 })"
    },
    {
        'id': 'scaleDown',
        'name': '缩小离开',
        'enName': 'Scale Down',
        'defaultParams': { 'duration': 1, 'scale': 2, 'ease': "power2.out" },
        'run': "(el, { duration = 1, scale = 2, ease = 'power2.out' } = {}) => gsap.to(el, { duration, scale: 0, opacity: 0, ease })"
    },
    {
        'id': 'rotateOut',
        'name': '旋出',
        'enName': 'Rotate Out',
        'defaultParams': { 'duration': 1, 'rotation': 360, 'ease': "power2.in" },
        'run': "(el, { duration = 1, rotation = 360, ease = 'power2.in' } = {}) => gsap.to(el, { duration, rotation, opacity: 0, scale: 0, ease })"
    },
    {
        'id': 'glitch',
        'name': '故障效果',
        'enName': 'Glitch',
        'defaultParams': { 'duration': 0.1 },
        'run': "(el, { duration = 0.1 } = {}) => { const tl = gsap.timeline({ repeat: 2 }); tl.to(el, { x: -5, skewX: 5, duration, ease: 'steps(1)' }).to(el, { x: 5, skewX: -5, duration, ease: 'steps(1)' }).to(el, { x: 0, skewX: 0, duration }); return tl; }"
    }
]

async def main():
    """主函数"""
    # 创建动画生成器
    generator = ElementExitAnimationGenerator(CONFIG)
    
    # 生成所有动画效果
    await generator.generate_all_animations("", ANIMATION_EFFECTS)

if __name__ == "__main__":
    asyncio.run(main())
import asyncio
from playwright.async_api import async_playwright
from PIL import Image
import io
import os

class AnimationGenerator:
    def __init__(self, config):
        self.config = config
        os.makedirs(config['output_dir'], exist_ok=True)

    async def capture_animation_frames(self, effect_id, effect_params=None):
        """使用Playwright浏览器捕获动画帧"""
        frames = []
        duration = self.config.get('duration', 2)
        fps = self.config.get('fps', 30)
        width = self.config.get('width', 80)
        height = self.config.get('height', 80)
        bg_color = self.config.get('bg_color', '#ffffff')

        try:
            # 启动浏览器
            async with async_playwright() as p:
                browser = await p.chromium.launch(headless=True)
                page = await browser.new_page()
                await page.set_viewport_size({'width': width, 'height': height})

                # 创建SVG五角星
                pentagon_html = '''<svg class="pentagon" viewBox="0 0 44 44" style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; margin: auto;"><path d="M22 1.5L28.5 17.5L44 19L33 31L36 44L22 35.5L8 44L11 31L0 19L15.5 17.5L22 1.5Z" fill="#E1E8FB"/></svg>'''

                # 创建HTML内容，使用字符串替换而不是f-string
                html_template = '''<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Animation</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
    <style>
        body {{ width: {width}px; height: {height}px; background-color: {bg_color}; position: relative; overflow: hidden; perspective: 800px; }}
        .pentagon {{ transform-style: preserve-3d; }}
    </style>
</head>
<body>
    {pentagon_html}
    <script>
        document.addEventListener('DOMContentLoaded', function() {{
            const pentagon = document.querySelector('.pentagon');
            const tl = gsap.timeline();

            // 根据效果ID生成对应的动画
            switch('{effect_id}') {{
                case 'fadeIn':
                    tl.fromTo(pentagon, {{ opacity: 0 }}, {{ opacity: 1, duration: {duration}, ease: 'power1.out' }});
                    break;
                case 'slideLeft':
                    tl.fromTo(pentagon, {{ x: -300, opacity: 0 }}, {{ x: 0, opacity: 1, duration: {duration}, ease: 'power2.out' }});
                    break;
                case 'slideRight':
                    tl.fromTo(pentagon, {{ x: 300, opacity: 0 }}, {{ x: 0, opacity: 1, duration: {duration}, ease: 'power2.out' }});
                    break;
                case 'slideTop':
                    tl.fromTo(pentagon, {{ y: -300, opacity: 0 }}, {{ y: 0, opacity: 1, duration: {duration}, ease: 'power2.out' }});
                    break;
                case 'slideBottom':
                    tl.fromTo(pentagon, {{ y: 300, opacity: 0 }}, {{ y: 0, opacity: 1, duration: {duration}, ease: 'power2.out' }});
                    break;
                case 'scaleUp':
                    tl.fromTo(pentagon, {{ scale: 0, opacity: 0 }}, {{ scale: 1, opacity: 1, duration: {duration}, ease: 'back.out(1.7)' }});
                    break;
                case 'rotateIn':
                    tl.fromTo(pentagon, {{ rotation: -360, scale: 0, opacity: 0 }}, {{ rotation: 0, scale: 1, opacity: 1, duration: {duration}, ease: 'back.out(1.7)' }});
                    break;
                case 'bounceIn':
                    tl.fromTo(pentagon, {{ scale: 0, opacity: 0 }}, {{ scale: 1, opacity: 1, duration: {duration}, ease: 'bounce.out' }});
                    break;
                case 'elasticIn':
                    tl.fromTo(pentagon, {{ x: -300, opacity: 0 }}, {{ x: 0, opacity: 1, duration: {duration}, ease: 'elastic.out(1, 0.3)' }});
                    break;
                case 'blurIn':
                    tl.fromTo(pentagon, {{ filter: 'blur(20px)', opacity: 0 }}, {{ filter: 'blur(0px)', opacity: 1, duration: {duration} }});
                    break;
                case 'flipX':
                    tl.fromTo(pentagon, {{ rotationX: 90, opacity: 0 }}, {{ rotationX: 0, opacity: 1, duration: {duration}, ease: 'back.out(1.7)' }});
                    break;
                case 'flipY':
                    tl.fromTo(pentagon, {{ rotationY: 90, opacity: 0 }}, {{ rotationY: 0, opacity: 1, duration: {duration}, ease: 'back.out(1.7)' }});
                    break;
                case 'zoomInRotate':
                    tl.fromTo(pentagon, {{ scale: 0, rotation: 180, opacity: 0 }}, {{ scale: 1, rotation: 0, opacity: 1, duration: {duration} }});
                    break;
                case 'swing':
                    tl.fromTo(pentagon, {{ rotation: 15, transformOrigin: '50% 0%' }}, {{ rotation: 0, duration: 2, ease: 'elastic.out(1.75, 0.1)' }});
                    break;
                default:
                    tl.fromTo(pentagon, {{ opacity: 0 }}, {{ opacity: 1, duration: {duration}, ease: 'power1.out' }});
            }}

            // 动画完成标志
            tl.eventCallback('onComplete', () => {{ window.animationCompleted = true; }});
        }});
    </script>
</body>
</html>'''

                # 使用字符串格式化替换参数
                html_content = html_template.format(
                    width=width,
                    height=height,
                    bg_color=bg_color,
                    pentagon_html=pentagon_html,
                    effect_id=effect_id,
                    duration=duration
                )

                await page.set_content(html_content)
                await page.wait_for_load_state('networkidle')

                total_frames = int(duration * fps)
                frame_time = 1000 / fps

                print(f"捕获 {effect_id} 动画，共 {total_frames} 帧，每帧 {frame_time:.2f}ms")

                # 等待动画开始
                await page.wait_for_timeout(200)

                # 捕获帧
                for i in range(total_frames):
                    screenshot = await page.screenshot()
                    img = Image.open(io.BytesIO(screenshot))
                    frames.append(img)
                    await page.wait_for_timeout(frame_time)

                    # 检查动画是否完成
                    if i > total_frames * 0.8:
                        try:
                            completed = await page.evaluate("window.animationCompleted || false")
                            if completed:
                                print(f"动画提前完成，共捕获 {i+1} 帧")
                                break
                        except:
                            pass

                await browser.close()

        except Exception as e:
            print(f"捕获帧时出错: {e}")

        return frames

    def save_gif(self, frames, output_path):
        """保存帧序列为GIF"""
        if not frames:
            print(f"没有帧可以保存到 {output_path}")
            return False

        try:
            # 转换所有帧为RGB模式
            rgb_frames = [frame.convert('RGB') for frame in frames]
            fps = self.config.get('fps', 30)
            frame_duration = 1000 / fps

            # 保存GIF
            rgb_frames[0].save(
                output_path,
                save_all=True,
                append_images=rgb_frames[1:],
                duration=frame_duration,
                loop=0,
                optimize=True,
                disposal=2
            )
            print(f"✅ 已生成: {output_path}")
            return True

        except Exception as e:
            print(f"❌ 保存GIF失败: {e}")
            return False

    async def generate_animation(self, effect_id):
        """生成单个动画"""
        print(f"\n正在生成 {effect_id} 动画...")
        frames = await self.capture_animation_frames(effect_id)
        if frames:
            output_path = os.path.join(self.config['output_dir'], f"{effect_id}.gif")
            return self.save_gif(frames, output_path)
        return False

async def main():
    # 配置参数
    config = {
        'width': 80,
        'height': 80,
        'bg_color': '#ffffff',
        'duration': 2,
        'fps': 30,
        'output_dir': 'animated_gifs'
    }

    generator = AnimationGenerator(config)

    # 测试单个动画
    await generator.generate_animation('fadeIn')

    # 或者生成所有动画
    # effects = ['fadeIn', 'slideLeft', 'slideRight', 'slideTop', 'slideBottom', 'scaleUp', 'rotateIn', 'bounceIn', 'elasticIn', 'blurIn', 'flipX', 'flipY', 'zoomInRotate', 'swing']
    # for effect in effects:
    #     await generator.generate_animation(effect)

if __name__ == "__main__":
    asyncio.run(main())

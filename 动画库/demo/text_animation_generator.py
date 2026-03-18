import asyncio
from playwright.async_api import async_playwright
from PIL import Image
import io
import os
import math

class TextAnimationGenerator:
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
                            opacity: 0, 
                            x: 0, 
                            y: 0 
                        }});
                        
                        // 创建时间线，控制完整的动画流程：2秒入场 + 1秒停留 + 0.25秒淡出
                        const tl = gsap.timeline();
                        
                        // 根据效果ID设置不同的入场动画（2秒）
                        switch ('{effect_id}') {{
                            case 'fadeIn':
                                // 淡入动画，2秒完成
                                tl.fromTo(pentagon, 
                                    {{ opacity: 0 }}, 
                                    {{ opacity: 1, duration: 2, ease: 'power1.out' }}
                                );
                                break;
                            case 'slideLeft':
                                // 左滑进入，从画布外左侧进入，2秒完成
                                tl.fromTo(pentagon, 
                                    {{ opacity: 0, x: -300 }}, 
                                    {{ opacity: 1, x: 0, duration: 2, ease: 'power2.out' }}
                                );
                                break;
                            case 'slideRight':
                                // 右滑进入，从画布外右侧进入，2秒完成
                                tl.fromTo(pentagon, 
                                    {{ opacity: 0, x: 300 }}, 
                                    {{ opacity: 1, x: 0, duration: 2, ease: 'power2.out' }}
                                );
                                break;
                            case 'slideTop':
                                // 上滑进入，从画布外顶部进入，2秒完成
                                tl.fromTo(pentagon, 
                                    {{ opacity: 0, y: -300 }}, 
                                    {{ opacity: 1, y: 0, duration: 2, ease: 'power2.out' }}
                                );
                                break;
                            case 'slideBottom':
                                // 下滑进入，从画布外底部进入，2秒完成
                                tl.fromTo(pentagon, 
                                    {{ opacity: 0, y: 300 }}, 
                                    {{ opacity: 1, y: 0, duration: 2, ease: 'power2.out' }}
                                );
                                break;
                            case 'scaleUp':
                                // 放大进入，从缩小状态放大，2秒完成
                                tl.fromTo(pentagon, 
                                    {{ opacity: 0, scale: 0 }}, 
                                    {{ opacity: 1, scale: 1, duration: 2, ease: 'back.out(1.7)' }}
                                );
                                break;
                            case 'rotateIn':
                                // 旋入，从旋转状态进入，2秒完成
                                tl.fromTo(pentagon, 
                                    {{ opacity: 1, scale: 0, rotation: -360 }}, 
                                    {{ opacity: 1, scale: 1, rotation: 0, duration: 2, ease: 'back.out(1.7)' }}
                                );
                                break;
                            case 'bounceIn':
                                // 弹入，弹性进入，2秒完成
                                tl.fromTo(pentagon, 
                                    {{ opacity: 0, scale: 0 }}, 
                                    {{ opacity: 1, scale: 1, duration: 2, ease: 'bounce.out' }}
                                );
                                break;
                            case 'elasticIn':
                                // 弹性进入，从左侧弹性进入，2秒完成
                                tl.fromTo(pentagon, 
                                    {{ opacity: 0, x: -300 }}, 
                                    {{ opacity: 1, x: 0, duration: 2, ease: 'elastic.out(1, 0.3)' }}
                                );
                                break;
                            case 'blurIn':
                                // 模糊进入，从模糊状态清晰，2秒完成
                                tl.fromTo(pentagon, 
                                    {{ filter: 'blur(20px)', opacity: 0 }}, 
                                    {{ filter: 'blur(0px)', opacity: 1, duration: 2 }}
                                );
                                break;
                            case 'flipX':
                                // 水平翻转进入，从水平翻转状态进入，2秒完成
                                // 添加perspective并确保初始状态可见
                                tl.fromTo(pentagon, 
                                    {{ rotationX: 90, opacity: 0, transformOrigin: '50% 50%' }}, 
                                    {{ rotationX: 0, opacity: 1, duration: 2, ease: 'back.out(1.7)' }}
                                );
                                break;
                            case 'flipY':
                                // 垂直翻转进入，从垂直翻转状态进入，2秒完成
                                // 添加perspective并确保初始状态可见
                                tl.fromTo(pentagon, 
                                    {{ rotationY: 90, opacity: 0, transformOrigin: '50% 50%' }}, 
                                    {{ rotationY: 0, opacity: 1, duration: 2, ease: 'back.out(1.7)' }}
                                );
                                break;
                            case 'zoomInRotate':
                                // 缩放旋转进入，从缩放旋转状态进入，2秒完成
                                tl.fromTo(pentagon, 
                                    {{ opacity: 0, scale: 0, rotation: 180 }}, 
                                    {{ opacity: 1, scale: 1, rotation: 0, duration: 2 }}
                                );
                                break;
                            case 'swing':
                                // 摆动进入，从摆动状态进入，2秒完成
                                // 调整初始旋转角度和transformOrigin
                                tl.fromTo(pentagon, 
                                    {{ opacity: 0, rotation: 20, transformOrigin: '50% 0%' }}, 
                                    {{ opacity: 1, rotation: 0, duration: 2, ease: 'elastic.out(1.75, 0.1)' }}
                                );
                                break;
                            default:
                                // 默认淡入效果
                                tl.fromTo(pentagon, 
                                    {{ opacity: 0 }}, 
                                    {{ opacity: 1, duration: 2, ease: 'power1.out' }}
                                );
                                break;
                        }}
                        
                        // 添加1秒停留效果
                        tl.to(pentagon, {{ duration: 1 }});
                        
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
            output_filename = f"{effect_id}_star.gif"
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
        print(f"开始生成动画GIF...")
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
    'duration': 3.25,                # 动画总时长3.25秒（2秒入场+1秒停留+0.25秒淡出）
    'fps': 30,                       # 帧率30
    'output_dir': 'animated_gifs'    # 输出目录
}

# 动画效果定义（从animation-lib.js提取的入场动画）
ANIMATION_EFFECTS = [
    {
        'id': 'fadeIn',
        'name': '淡入',
        'enName': 'Fade In',
        'defaultParams': { 'duration': 1, 'ease': "power1.out" },
        'run': "(el, config = {}) => gsap.from(el, { duration: 1, ease: \"power1.out\", ...config, opacity: 0 })"
    },
    {
        'id': 'slideLeft',
        'name': '左滑进入',
        'enName': 'Slide Left',
        'defaultParams': { 'duration': 1, 'distance': 300, 'ease': "power2.out" },
        'run': "(el, { duration = 1, distance = 300, ease = \"power2.out\" } = {}) => gsap.from(el, { duration, x: -distance, opacity: 0, ease })"
    },
    {
        'id': 'slideRight',
        'name': '右滑进入',
        'enName': 'Slide Right',
        'defaultParams': { 'duration': 1, 'distance': 300, 'ease': "power2.out" },
        'run': "(el, { duration = 1, distance = 300, ease = \"power2.out\" } = {}) => gsap.from(el, { duration, x: distance, opacity: 0, ease })"
    },
    {
        'id': 'slideTop',
        'name': '上滑进入',
        'enName': 'Slide Top',
        'defaultParams': { 'duration': 1, 'distance': 300, 'ease': "power2.out" },
        'run': "(el, { duration = 1, distance = 300, ease = \"power2.out\" } = {}) => gsap.from(el, { duration, y: -distance, opacity: 0, ease })"
    },
    {
        'id': 'slideBottom',
        'name': '下滑进入',
        'enName': 'Slide Bottom',
        'defaultParams': { 'duration': 1, 'distance': 300, 'ease': "power2.out" },
        'run': "(el, { duration = 1, distance = 300, ease = \"power2.out\" } = {}) => gsap.from(el, { duration, y: distance, opacity: 0, ease })"
    },
    {
        'id': 'scaleUp',
        'name': '放大进入',
        'enName': 'Scale Up',
        'defaultParams': { 'duration': 1, 'scale': 0, 'ease': "back.out(1.7)" },
        'run': "(el, { duration = 1, scale = 0, ease = \"back.out(1.7)\" } = {}) => gsap.from(el, { duration, scale, opacity: 0, ease })"
    },
    {
        'id': 'rotateIn',
        'name': '旋入',
        'enName': 'Rotate In',
        'defaultParams': { 'duration': 1, 'rotation': -360, 'ease': "back.out(1.7)" },
        'run': "(el, { duration = 1, rotation = -360, ease = \"back.out(1.7)\" } = {}) => gsap.from(el, { duration, rotation, opacity: 0, scale: 0, ease })"
    },
    {
        'id': 'bounceIn',
        'name': '弹入',
        'enName': 'Bounce In',
        'defaultParams': { 'duration': 1 },
        'run': "(el, config = {}) => gsap.from(el, { duration: 1, ease: \"bounce.out\", ...config, scale: 0 })"
    },
    {
        'id': 'elasticIn',
        'name': '弹性进入',
        'enName': 'Elastic In',
        'defaultParams': { 'duration': 1.5, 'x': -300 },
        'run': "(el, config = {}) => gsap.from(el, { duration: 1.5, x: -300, ease: \"elastic.out(1, 0.3)\", ...config })"
    },
    {
        'id': 'blurIn',
        'name': '模糊进入',
        'enName': 'Blur In',
        'defaultParams': { 'duration': 1, 'blur': 20 },
        'run': "(el, { duration = 1, blur = 20 } = {}) => gsap.fromTo(el, { filter: `blur(${blur}px)`, opacity: 0 }, { duration, filter: \"blur(0px)\", opacity: 1 })"
    },
    {
        'id': 'flipX',
        'name': '水平翻转进入',
        'enName': 'Flip X',
        'defaultParams': { 'duration': 1 },
        'run': "(el, { duration = 1 } = {}) => gsap.fromTo(el, { rotationX: 360 }, { duration, rotationX: 0, ease: \"back.out(1.7)\" })"
    },
    {
        'id': 'flipY',
        'name': '垂直翻转进入',
        'enName': 'Flip Y',
        'defaultParams': { 'duration': 1 },
        'run': "(el, { duration = 1 } = {}) => gsap.fromTo(el, { rotationY: 360 }, { duration, rotationY: 0, ease: \"back.out(1.7)\" })"
    },
    {
        'id': 'zoomInRotate',
        'name': '缩放旋转进入',
        'enName': 'Zoom Rotate',
        'defaultParams': { 'duration': 1 },
        'run': "(el, { duration = 1 } = {}) => gsap.from(el, { duration, scale: 0, rotation: 180, opacity: 0 })"
    },
    {
        'id': 'swing',
        'name': '摆动进入',
        'enName': 'Swing',
        'defaultParams': { 'rotation': 15, 'duration': 0.2 },
        'run': "(el, { rotation = 15, duration = 0.2 } = {}) => { gsap.fromTo(el, { rotation, transformOrigin: \"50% 0%\" }, { duration, rotation: 0, ease: \"elastic.out(1.75, 0.1)\" }); }"
    }
]

async def main():
    """主函数"""
    # 创建动画生成器
    generator = TextAnimationGenerator(CONFIG)
    
    # 生成所有动画效果
    await generator.generate_all_animations("", ANIMATION_EFFECTS)

if __name__ == "__main__":
    asyncio.run(main())
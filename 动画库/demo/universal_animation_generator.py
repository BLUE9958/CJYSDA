import asyncio
from playwright.async_api import async_playwright
from PIL import Image
import io
import os
import json

class UniversalAnimationGenerator:
    def __init__(self, config):
        self.config = config
        os.makedirs(config['output_dir'], exist_ok=True)
        
        # Define animation categories based on animation-classification-v1.0.md
        self.animation_categories = {
            # Element entrance animations
            'fadeIn': 'entrance',
            'slideLeft': 'entrance',
            'slideRight': 'entrance',
            'slideTop': 'entrance',
            'slideBottom': 'entrance',
            'scaleUp': 'entrance',
            'rotateIn': 'entrance',
            'bounceIn': 'entrance',
            'elasticIn': 'entrance',
            'blurIn': 'entrance',
            'flipX': 'entrance',
            'flipY': 'entrance',
            'zoomInRotate': 'entrance',
            'swing': 'entrance',
            
            # Element emphasis animations
            'breathing': 'emphasis',
            'neonPulse': 'emphasis',
            'shake': 'emphasis',
            'wobble': 'emphasis',
            'jello': 'emphasis',
            'colorCycle': 'emphasis',
            'flash': 'emphasis',
            'rubberBand': 'emphasis',
            'tada': 'emphasis',
            'heartbeat': 'emphasis',
            'float': 'emphasis',
            
            # Element exit animations
            'fadeOut': 'exit',
            'scaleDown': 'exit',
            'rotateOut': 'exit',
            'glitch': 'exit',
            
            # Text entrance animations
            'charFadeIn': 'entrance',
            'charSlideUp': 'entrance',
            'spacingExpand': 'entrance',
            'blurReveal': 'entrance',
            'elasticChars': 'entrance',
            'scatterReveal': 'entrance',
            'gradientwipe': 'entrance',
            'decode': 'entrance',
            
            # Text emphasis animations
            'rainbowFlow': 'emphasis',
            'glitchText': 'emphasis',
            'waveText': 'emphasis',
            'shadowPop': 'emphasis',
            'neonFlicker': 'emphasis',
            'wordRotate': 'emphasis',
            
            # Text exit animations
            'textScramble': 'exit',
        }

    def get_animation_type(self, effect_id):
        """Get the animation type (entrance, emphasis, exit) for a given effect ID"""
        return self.animation_categories.get(effect_id, 'entrance')

    def get_element_type(self, effect_id):
        """Determine if animation is for text or element"""
        text_animations = [
            'textScramble', 'charFadeIn', 'charSlideUp', 'spacingExpand', 
            'blurReveal', 'rainbowFlow', 'glitchText', 'typewriterCursors', 
            'elasticChars', 'waveText', 'shadowPop', 'neonFlicker', 
            'wordRotate', 'decode', 'gradientwipe', 'scatterReveal'
        ]
        return 'text' if effect_id in text_animations else 'element'

    async def capture_animation_frames(self, effect_id, effect_params=None):
        """使用Playwright浏览器捕获动画帧"""
        frames = []
        animation_type = self.get_animation_type(effect_id)
        element_type = self.get_element_type(effect_id)
        
        # 获取动画特定参数，如果没有则使用默认值
        slide_distance = self.config.get('slideDistance', 300)
        scale_value = self.config.get('scale', 0 if animation_type == 'entrance' else 2)
        rotation_value = self.config.get('rotation', -360 if animation_type == 'entrance' else 360)
        duration = self.config.get('duration', 2)
        
        try:
            # 启动浏览器
            async with async_playwright() as p:
                browser = await p.chromium.launch(headless=True)  # 无头模式
                page = await browser.new_page()
                
                # 设置视口
                await page.set_viewport_size({
                    'width': self.config['width'],
                    'height': self.config['height']
                })
                
                # 根据元素类型选择HTML模板
                if element_type == 'text':
                    element_html = '''<div class="text-element" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-family: Arial, sans-serif; font-size: 24px; font-weight: bold; color: #000000;">示例</div>'''
                else:
                    element_html = '''<svg class="pentagon" viewBox="0 0 44 44" style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; margin: auto;"><path d="M22 1.5L28.5 17.5L44 19L33 31L36 44L22 35.5L8 44L11 31L0 19L15.5 17.5L22 1.5Z" fill="#E1E8FB"/></svg>'''
                
                # 创建HTML页面 - 使用字符串替换而不是f-string来避免冲突
                html_content = '''<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Animation</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            width: WIDTHpx; 
            height: HEIGHTpx; 
            background-color: BGCOLOR; 
            position: relative; 
            overflow: hidden; 
            perspective: 800px; 
        }
        .text-element, .pentagon { transform-style: preserve-3d; }
    </style>
</head>
<body>
    ELEMENTHTML
    <script>
        // 页面加载完成后开始动画
        document.addEventListener('DOMContentLoaded', function() {
            const element = document.querySelector('.text-element, .pentagon');
            const tl = gsap.timeline();
            
            // 根据效果ID生成对应的动画
            switch('EFFECTID') {
                case 'fadeIn':
                    tl.fromTo(element, { opacity: 0 }, { opacity: 1, duration: DURATION, ease: 'power1.out' });
                    break;
                case 'fadeOut':
                    tl.fromTo(element, { opacity: 1 }, { opacity: 0, duration: DURATION, ease: 'power1.in' });
                    break;
                case 'slideLeft':
                    tl.fromTo(element, { x: -300, opacity: 0 }, { x: 0, opacity: 1, duration: DURATION, ease: 'power2.out' });
                    break;
                case 'slideRight':
                    tl.fromTo(element, { x: 300, opacity: 0 }, { x: 0, opacity: 1, duration: DURATION, ease: 'power2.out' });
                    break;
                case 'slideTop':
                    tl.fromTo(element, { y: -300, opacity: 0 }, { y: 0, opacity: 1, duration: DURATION, ease: 'power2.out' });
                    break;
                case 'slideBottom':
                    tl.fromTo(element, { y: 300, opacity: 0 }, { y: 0, opacity: 1, duration: DURATION, ease: 'power2.out' });
                    break;
                case 'scaleUp':
                    tl.fromTo(element, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: DURATION, ease: 'back.out(1.7)' });
                    break;
                case 'rotateIn':
                    tl.fromTo(element, { rotation: -360, scale: 0, opacity: 0 }, { rotation: 0, scale: 1, opacity: 1, duration: DURATION, ease: 'back.out(1.7)' });
                    break;
                case 'bounceIn':
                    tl.fromTo(element, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: DURATION, ease: 'bounce.out' });
                    break;
                case 'elasticIn':
                    tl.fromTo(element, { x: -300, opacity: 0 }, { x: 0, opacity: 1, duration: DURATION, ease: 'elastic.out(1, 0.3)' });
                    break;
                case 'blurIn':
                    tl.fromTo(element, { filter: 'blur(20px)', opacity: 0 }, { filter: 'blur(0px)', opacity: 1, duration: DURATION });
                    break;
                case 'flipX':
                    tl.fromTo(element, { rotationX: 90, opacity: 0 }, { rotationX: 0, opacity: 1, duration: DURATION, ease: 'back.out(1.7)' });
                    break;
                case 'flipY':
                    tl.fromTo(element, { rotationY: 90, opacity: 0 }, { rotationY: 0, opacity: 1, duration: DURATION, ease: 'back.out(1.7)' });
                    break;
                case 'zoomInRotate':
                    tl.fromTo(element, { scale: 0, rotation: 180, opacity: 0 }, { scale: 1, rotation: 0, opacity: 1, duration: DURATION });
                    break;
                case 'swing':
                    tl.fromTo(element, { rotation: 15, transformOrigin: '50% 0%' }, { rotation: 0, duration: 2, ease: 'elastic.out(1.75, 0.1)' });
                    break;
                case 'pulse':
                    tl.to(element, { scale: 1.1, opacity: 0.8, duration: 0.5, ease: 'sine.inOut' }, 0);
                    tl.to(element, { scale: 1, opacity: 1, duration: 0.5, ease: 'sine.inOut' }, 0.5);
                    break;
                case 'float':
                    tl.to(element, { y: -20, duration: 1, ease: 'sine.inOut' });
                    tl.to(element, { y: 0, duration: 1, ease: 'sine.inOut' });
                    break;
                case 'glow':
                    tl.to(element, { filter: 'drop-shadow(0 0 10px rgba(0, 243, 255, 0.8))', duration: DURATION });
                    break;
                case 'scaleDown':
                    tl.fromTo(element, { scale: 2, opacity: 0 }, { scale: 1, opacity: 1, duration: DURATION, ease: 'power2.out' });
                    break;
                case 'rotateOut':
                    tl.fromTo(element, { rotation: 0, scale: 1, opacity: 1 }, { rotation: 360, scale: 0, opacity: 0, duration: DURATION, ease: 'power2.in' });
                    break;
                case 'textScramble':
                    // 简单实现文字随机效果
                    const chars = "!<>-_/[]{}—=+*^?#________";
                    const originalText = element.textContent;
                    const scrambleEffect = () => {
                        let result = '';
                        for(let i = 0; i < originalText.length; i++) {
                            result += chars[Math.floor(Math.random() * chars.length)];
                        }
                        element.textContent = result;
                    };
                    
                    // 生成乱码效果
                    for(let i = 0; i < 20; i++) {
                        tl.call(scrambleEffect, [], i * 0.1);
                    }
                    
                    // 最终显示正确文字
                    tl.call(() => { element.textContent = originalText; }, [], 2);
                    break;
                default:
                    // 默认使用淡入动画
                    tl.fromTo(element, { opacity: 0 }, { opacity: 1, duration: DURATION, ease: 'power1.out' });
                    break;
            }
            
            // 添加动画结束回调
            tl.eventCallback('onComplete', () => { window.animationCompleted = true; });
        });
    </script>
</body>
</html>'''

                # 替换占位符
                html_content = html_content.replace('WIDTH', str(self.config['width']))
                html_content = html_content.replace('HEIGHT', str(self.config['height']))
                html_content = html_content.replace('BGCOLOR', self.config['bg_color'])
                html_content = html_content.replace('ELEMENTHTML', element_html)
                html_content = html_content.replace('EFFECTID', effect_id)
                html_content = html_content.replace('DURATION', str(duration))
                
                # 设置页面内容
                await page.set_content(html_content)
                
                # 等待页面加载完成
                await page.wait_for_load_state('networkidle')
                
                # 计算帧数
                total_frames = int(self.config['duration'] * self.config['fps'])
                frame_time = 1000 / self.config['fps']
                
                print(f"捕获 {total_frames} 帧，每帧 {frame_time}ms")
                
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
                    
                    # 检查动画是否完成
                    if i > total_frames * 0.8:
                        try:
                            completed = await page.evaluate("window.animationCompleted || false")
                            if completed:
                                print(f"动画提前完成，共捕获 {i+1} 帧")
                                break
                        except:
                            pass
                
                # 关闭浏览器
                await browser.close()
        except Exception as e:
            print(f"捕获动画帧时出错: {str(e)}")
        
        return frames

    def save_gif(self, frames, output_path, duration):
        """保存帧序列为GIF"""
        if not frames:
            print("没有帧可以保存")
            return False
        
        try:
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
                disposal=2,  # 恢复背景色
                quality=80  # 设置质量
            )
            print(f"✅ 已生成: {output_path}")
            return True
        except Exception as e:
            print(f"❌ 保存GIF时出错: {str(e)}")
            return False

    async def generate_animation(self, effect):
        """生成单个动画效果的GIF"""
        effect_id = effect['id']
        effect_name = effect['name']
        animation_type = self.get_animation_type(effect_id)
        element_type = self.get_element_type(effect_id)
        
        print(f"正在生成 {effect_name} ({animation_type}, {element_type}) 动画...")
        
        try:
            # 捕获动画帧
            frames = await self.capture_animation_frames(effect_id)
            if not frames:
                print(f"❌ 无法捕获 {effect_name} 动画的帧")
                return False
            
            # 确定输出文件名
            element_suffix = "_text" if element_type == 'text' else "_element"
            output_filename = f"{animation_type}_{effect_id}{element_suffix}.gif"
            output_path = os.path.join(self.config['output_dir'], output_filename)
            
            # 保存GIF
            if self.save_gif(frames, output_path, self.config['duration']):
                return True
            else:
                return False
                
        except Exception as e:
            print(f"❌ 生成 {effect_name} 动画时出错: {str(e)}")
            return False

    async def generate_all_animations(self, effects):
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
        
        return success_count

# 定义动画效果列表
ANIMATION_EFFECTS = [
    # 入场动画
    {'id': 'fadeIn', 'name': '淡入'},
    {'id': 'slideLeft', 'name': '左滑'},
    {'id': 'slideRight', 'name': '右滑'},
    {'id': 'slideTop', 'name': '上滑'},
    {'id': 'slideBottom', 'name': '下滑'},
    {'id': 'scaleUp', 'name': '缩放'},
    {'id': 'rotateIn', 'name': '旋转'},
    {'id': 'bounceIn', 'name': '弹跳'},
    {'id': 'elasticIn', 'name': '弹性'},
    {'id': 'blurIn', 'name': '模糊'},
    {'id': 'flipX', 'name': 'X轴翻转'},
    {'id': 'flipY', 'name': 'Y轴翻转'},
    {'id': 'zoomInRotate', 'name': '缩放旋转'},
    {'id': 'swing', 'name': '摇摆'},
    
    # 强调动画
    {'id': 'pulse', 'name': '脉冲'},
    {'id': 'float', 'name': '浮动'},
    {'id': 'glow', 'name': '发光'},
    
    # 退场动画
    {'id': 'fadeOut', 'name': '淡出'},
    {'id': 'scaleDown', 'name': '缩小'},
    {'id': 'rotateOut', 'name': '旋转消失'},
    {'id': 'textScramble', 'name': '文字随机'},
]

# 主函数
async def main():
    # 配置
    config = {
        'width': 80,
        'height': 80,
        'bg_color': '#ffffff',
        'duration': 2,
        'fps': 30,
        'output_dir': 'animated_gifs'
    }
    
    # 创建生成器实例
    generator = UniversalAnimationGenerator(config)
    
    # 生成所有动画
    await generator.generate_all_animations(ANIMATION_EFFECTS)

if __name__ == "__main__":
    asyncio.run(main())

import asyncio
import os
import io
from PIL import Image
from playwright.async_api import async_playwright

class SimpleAnimationGenerator:
    def __init__(self):
        self.config = {
            'width': 80,
            'height': 80,
            'bg_color': '#ffffff',
            'duration': 2,
            'fps': 30,
            'output_dir': 'animated_gifs'
        }
        
        # 确保输出目录存在
        if not os.path.exists(self.config['output_dir']):
            os.makedirs(self.config['output_dir'])
    
    async def capture_animation_frames(self, effect_id):
        """使用Playwright浏览器捕获动画帧"""
        frames = []
        duration = self.config['duration']
        
        try:
            async with async_playwright() as p:
                # 启动浏览器
                browser = await p.chromium.launch(headless=True)
                page = await browser.new_page()
                
                # 设置视口
                await page.set_viewport_size({
                    'width': self.config['width'],
                    'height': self.config['height']
                })
                
                # 创建HTML内容
                html_content = f'''
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="utf-8">
                    <title>Simple Animation</title>
                    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
                    <style>
                        * {{ margin: 0; padding: 0; box-sizing: border-box; }}
                        body {{ 
                            width: {self.config['width']}px; 
                            height: {self.config['height']}px; 
                            background-color: {self.config['bg_color']}; 
                            position: relative; 
                        }}
                        .pentagon {{ 
                            position: absolute; 
                            top: 0; left: 0; right: 0; bottom: 0; 
                            margin: auto; 
                            width: 44px; 
                            height: 44px; 
                        }}
                    </style>
                </head>
                <body>
                    <svg class="pentagon" viewBox="0 0 44 44">
                        <path d="M22 1.5L28.5 17.5L44 19L33 31L36 44L22 35.5L8 44L11 31L0 19L15.5 17.5L22 1.5Z" fill="#E1E8FB"/>
                    </svg>
                    
                    <script>
                        // 简单的淡入动画
                        const element = document.querySelector('.pentagon');
                        const tl = gsap.timeline();
                        tl.fromTo(element, {{ opacity: 0 }}, {{ opacity: 1, duration: {duration}, ease: 'power1.out' }});
                        
                        // 动画完成标志
                        tl.eventCallback('onComplete', () => {{ window.animationCompleted = true; }});
                    </script>
                </body>
                </html>
                '''
                
                # 设置页面内容
                await page.set_content(html_content)
                
                # 等待页面加载完成
                await page.wait_for_load_state('networkidle')
                
                # 计算帧数
                total_frames = int(self.config['duration'] * self.config['fps'])
                frame_time = 1000 / self.config['fps']
                
                print(f"捕获 {total_frames} 帧，每帧 {frame_time}ms")
                
                # 捕获帧
                for i in range(total_frames):
                    screenshot = await page.screenshot()
                    img = Image.open(io.BytesIO(screenshot))
                    frames.append(img)
                    await page.wait_for_timeout(frame_time)
                
                # 关闭浏览器
                await browser.close()
                
        except Exception as e:
            print(f"捕获帧时出错: {str(e)}")
            import traceback
            traceback.print_exc()
        
        return frames
    
    def save_gif(self, frames, output_path):
        """保存帧序列为GIF"""
        if not frames:
            print("没有帧可以保存")
            return False
        
        try:
            # 转换所有帧为RGB模式
            rgb_frames = [frame.convert('RGB') for frame in frames]
            
            # 计算每帧持续时间
            frame_duration = 1000 / self.config['fps']
            
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
            
            print(f"成功生成: {output_path}")
            print(f"GIF大小: {os.path.getsize(output_path)} 字节")
            return True
            
        except Exception as e:
            print(f"保存GIF时出错: {str(e)}")
            import traceback
            traceback.print_exc()
            return False
    
    async def generate_animation(self, effect_id):
        """生成单个动画"""
        print(f"正在生成 {effect_id} 动画...")
        
        # 捕获帧
        frames = await self.capture_animation_frames(effect_id)
        if not frames:
            print(f"❌ 无法捕获 {effect_id} 动画的帧")
            return False
        
        # 保存GIF
        output_path = os.path.join(self.config['output_dir'], f"{effect_id}.gif")
        if self.save_gif(frames, output_path):
            print(f"✅ 成功生成 {effect_id} 动画")
            return True
        else:
            print(f"❌ 生成 {effect_id} 动画失败")
            return False

async def main():
    """主函数"""
    generator = SimpleAnimationGenerator()
    
    # 生成单个动画
    await generator.generate_animation('fadeIn')

if __name__ == "__main__":
    asyncio.run(main())
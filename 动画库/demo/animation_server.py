#!/usr/bin/env python3
"""
动画效果生成工具 - Web服务器
提供可视化界面，用于设置动画参数、预览效果和导出GIF
"""

import os
import json
import asyncio
from flask import Flask, request, send_file, jsonify, send_from_directory
from universal_animation_generator import UniversalAnimationGenerator

# 创建Flask应用
app = Flask(__name__)

# 配置静态文件目录
app.static_folder = '.'
app.template_folder = '.'

# 动画输出目录
OUTPUT_DIR = 'animated_gifs'
os.makedirs(OUTPUT_DIR, exist_ok=True)

# 默认配置
DEFAULT_CONFIG = {
    'width': 80,
    'height': 80,
    'bg_color': '#ffffff',
    'fill_color': '#E1E8FB',
    'duration': 3.25,
    'fps': 30,
    'output_dir': OUTPUT_DIR
}

# 完整动画类型列表
ANIMATION_TYPES = [
    # 入场动画
    'fadeIn', 'slideLeft', 'slideRight', 'slideTop', 'slideBottom',
    'scaleUp', 'rotateIn', 'bounceIn', 'elasticIn', 'blurIn',
    'flipX', 'flipY', 'zoomInRotate', 'swing',
    'charFadeIn', 'charSlideUp', 'spacingExpand', 'blurReveal', 
    'elasticChars', 'scatterReveal', 'gradientwipe', 'decode',
    # 强调动画
    'breathing', 'neonPulse', 'shake', 'wobble', 'jello', 'colorCycle',
    'flash', 'rubberBand', 'tada', 'heartbeat', 'float',
    'rainbowFlow', 'glitchText', 'waveText', 'shadowPop', 'neonFlicker', 'wordRotate',
    # 退场动画
    'fadeOut', 'scaleDown', 'rotateOut', 'glitch', 'textScramble'
]

@app.route('/')
def index():
    """首页 - 返回动画生成工具的HTML页面"""
    return send_file('animation_tool.html')

@app.route('/animations/<path:filename>')
def serve_animation(filename):
    """提供动画文件的访问"""
    return send_from_directory(OUTPUT_DIR, filename)

@app.route('/preview', methods=['POST'])
def preview_animation():
    """生成单个动画的预览"""
    try:
        # 获取请求数据
        data = request.get_json()
        
        # 构建配置
        config = DEFAULT_CONFIG.copy()
        config.update({
            'width': data.get('width', DEFAULT_CONFIG['width']),
            'height': data.get('height', DEFAULT_CONFIG['height']),
            'bg_color': data.get('bg_color', DEFAULT_CONFIG['bg_color']),
            'duration': data.get('duration', DEFAULT_CONFIG['duration']),
            'fps': data.get('fps', DEFAULT_CONFIG['fps']),
            'animation_category': data.get('animation_category', 'entrance'),
            'element_type': data.get('element_type', 'element')
        })
        
        # 添加动画特定参数
        animation_params = {k: v for k, v in data.items() if k not in DEFAULT_CONFIG and k not in ['animation_category', 'element_type', 'animation_type']}
        config.update(animation_params)
        
        # 生成动画
        animation_type = data.get('animation_type', 'fadeIn')
        effect = {
            'id': animation_type,
            'name': animation_type
        }
        
        # 创建生成器并生成动画
        generator = UniversalAnimationGenerator(config)
        asyncio.run(generator.generate_animation(effect))
        
        # 构建文件路径 - 根据元素类型确定文件名后缀
        element_suffix = '_text.gif' if data.get('element_type', 'element') == 'text' else '_element.gif'
        output_filename = f"{animation_type}{element_suffix}"
        output_path = os.path.join(OUTPUT_DIR, output_filename)
        
        # 返回生成的GIF
        return send_file(output_path, mimetype='image/gif')
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/export_single', methods=['POST'])
def export_single_gif():
    """导出单个动画GIF"""
    try:
        # 获取请求数据
        data = request.get_json()
        
        # 构建配置
        config = DEFAULT_CONFIG.copy()
        config.update({
            'width': data.get('width', DEFAULT_CONFIG['width']),
            'height': data.get('height', DEFAULT_CONFIG['height']),
            'bg_color': data.get('bg_color', DEFAULT_CONFIG['bg_color']),
            'duration': data.get('duration', DEFAULT_CONFIG['duration']),
            'fps': data.get('fps', DEFAULT_CONFIG['fps']),
            'animation_category': data.get('animation_category', 'entrance'),
            'element_type': data.get('element_type', 'element')
        })
        
        # 添加动画特定参数
        animation_params = {k: v for k, v in data.items() if k not in DEFAULT_CONFIG and k not in ['animation_category', 'element_type', 'animation_type']}
        config.update(animation_params)
        
        # 生成动画
        animation_type = data.get('animation_type', 'fadeIn')
        effect = {
            'id': animation_type,
            'name': animation_type
        }
        
        # 创建生成器并生成动画
        generator = UniversalAnimationGenerator(config)
        asyncio.run(generator.generate_animation(effect))
        
        # 构建文件路径 - 根据元素类型确定文件名后缀
        element_suffix = '_text.gif' if data.get('element_type', 'element') == 'text' else '_element.gif'
        output_filename = f"{animation_type}{element_suffix}"
        output_path = os.path.join(OUTPUT_DIR, output_filename)
        
        # 返回生成的GIF
        return send_file(output_path, as_attachment=True, download_name=output_filename, mimetype='image/gif')
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/export_all', methods=['POST'])
def export_all_gifs():
    """批量导出所有动画GIF"""
    try:
        # 获取请求数据
        data = request.get_json()
        
        # 构建配置
        config = DEFAULT_CONFIG.copy()
        config.update({
            'width': data.get('width', DEFAULT_CONFIG['width']),
            'height': data.get('height', DEFAULT_CONFIG['height']),
            'bg_color': data.get('bg_color', DEFAULT_CONFIG['bg_color']),
            'duration': data.get('duration', DEFAULT_CONFIG['duration']),
            'fps': data.get('fps', DEFAULT_CONFIG['fps']),
            'animation_category': data.get('animation_category', 'entrance'),
            'element_type': data.get('element_type', 'element')
        })
        
        # 添加动画特定参数
        animation_params = {k: v for k, v in data.items() if k not in DEFAULT_CONFIG and k not in ['animation_category', 'element_type', 'animation_type']}
        config.update(animation_params)
        
        # 创建生成器
        generator = UniversalAnimationGenerator(config)
        
        # 生成所有动画 - 需要根据元素类型选择合适的动画
        element_animations = [
            'fadeIn', 'slideLeft', 'slideRight', 'slideTop', 'slideBottom',
            'scaleUp', 'rotateIn', 'bounceIn', 'elasticIn', 'blurIn',
            'flipX', 'flipY', 'zoomInRotate', 'swing',
            'breathing', 'neonPulse', 'shake', 'wobble', 'jello', 'colorCycle',
            'flash', 'rubberBand', 'tada', 'heartbeat', 'float',
            'fadeOut', 'scaleDown', 'rotateOut', 'glitch'
        ]
        
        text_animations = [
            'charFadeIn', 'charSlideUp', 'spacingExpand', 'blurReveal', 
            'elasticChars', 'scatterReveal', 'gradientwipe', 'decode',
            'rainbowFlow', 'glitchText', 'waveText', 'shadowPop', 'neonFlicker', 'wordRotate',
            'textScramble'
        ]
        
        # 根据元素类型选择动画
        selected_animations = element_animations if data.get('element_type', 'element') == 'element' else text_animations
        
        # 生成动画
        effects = [{'id': anim_type, 'name': anim_type} for anim_type in selected_animations]
        for effect in effects:
            asyncio.run(generator.generate_animation(effect))
        
        return jsonify({'success': True, 'message': f'所有{data["element_type"]}动画已生成'})
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/list_animations')
def list_animations():
    """列出所有已生成的动画"""
    try:
        animations = []
        
        # 检查目录中的文件
        if os.path.exists(OUTPUT_DIR):
            for filename in os.listdir(OUTPUT_DIR):
                if filename.endswith('.gif'):
                    # 提取动画ID（文件名去掉后缀）
                    anim_id = filename.replace('_element.gif', '').replace('_text.gif', '')
                    animations.append({
                        'id': anim_id,
                        'filename': filename
                    })
        
        return jsonify(animations)
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.errorhandler(404)
def page_not_found(e):
    """处理404错误"""
    return "页面未找到", 404

if __name__ == '__main__':
    print("动画效果生成工具服务器已启动")
    print("访问地址: http://localhost:5000")
    print("按 Ctrl+C 停止服务器")
    app.run(host='0.0.0.0', port=5000, debug=True)
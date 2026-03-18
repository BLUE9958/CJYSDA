/**
 * 预览界面控制逻辑
 */

class PreviewController {
    constructor() {
        this.manager = window.PageTransitionManager;
        this.currentPage = document.getElementById('currentPage');
        this.newPage = document.getElementById('newPage');
        this.isAnimating = false;
        
        this.init();
    }
    
    init() {
        this.initSelects();
        this.initEventListeners();
        this.initParamControls();
        this.initLogging();
        this.updateStatus('准备就绪');
    }
    
    initSelects() {
        const exitSelect = document.getElementById('exitAnimation');
        const enterSelect = document.getElementById('enterAnimation');
        const pairSelect = document.getElementById('animationPair');
        
        // 填充退出动画选项
        this.manager.getAllEffects().forEach(effect => {
            const option = this.createOption(effect.id, effect.name, effect.description);
            exitSelect.appendChild(option.cloneNode(true));
            enterSelect.appendChild(option);
        });
        
        // 填充预设组合选项
        this.manager.getAllPresets().forEach(preset => {
            const option = this.createOption(preset.id, preset.name, preset.description);
            pairSelect.appendChild(option);
        });
        
        // 默认选择React风格
        pairSelect.value = 'reactStyle';
        this.onPresetSelect();
    }
    
    createOption(value, text, title = '') {
        const option = document.createElement('option');
        option.value = value;
        option.textContent = text;
        if (title) option.title = title;
        return option;
    }
    
    initEventListeners() {
        // 播放按钮
        document.getElementById('playBtn').addEventListener('click', () => this.playAnimation());
        
        // 停止按钮
        document.getElementById('stopBtn').addEventListener('click', () => this.stopAnimation());
        
        // 重置按钮
        document.getElementById('resetBtn').addEventListener('click', () => this.resetAnimation());
        
        // 预设选择
        document.getElementById('animationPair').addEventListener('change', () => this.onPresetSelect());
        
        // 动画选择
        document.getElementById('exitAnimation').addEventListener('change', () => this.onEffectSelect());
        document.getElementById('enterAnimation').addEventListener('change', () => this.onEffectSelect());
        
        // 日志监听
        document.addEventListener('animationLog', (e) => this.onAnimationLog(e.detail));
    }
    
    onPresetSelect() {
        const presetId = document.getElementById('animationPair').value;
        if (!presetId) return;
        
        const preset = this.manager.getAllPresets().find(p => p.id === presetId);
        if (!preset) return;
        
        document.getElementById('exitAnimation').value = preset.exit;
        document.getElementById('enterAnimation').value = preset.enter;
        
        this.updateParamControls();
    }
    
    onEffectSelect() {
        this.updateParamControls();
    }
    
    initParamControls() {
        this.updateParamControls();
    }
    
    updateParamControls() {
        const paramControls = document.getElementById('paramControls');
        paramControls.innerHTML = '';
        
        const exitEffectId = document.getElementById('exitAnimation').value;
        const enterEffectId = document.getElementById('enterAnimation').value;
        
        if (exitEffectId) {
            const exitEffect = this.manager.getEffect(exitEffectId);
            this.createParamSection('退出动画参数', exitEffect, 'exit', paramControls);
        }
        
        if (enterEffectId) {
            const enterEffect = this.manager.getEffect(enterEffectId);
            this.createParamSection('进入动画参数', enterEffect, 'enter', paramControls);
        }
    }
    
    createParamSection(title, effect, prefix, container) {
        if (!effect || !effect.defaultParams) return;
        
        const section = document.createElement('div');
        section.className = 'param-section';
        section.innerHTML = `<h4>${title}</h4>`;
        
        Object.entries(effect.defaultParams).forEach(([key, value]) => {
            const paramDiv = document.createElement('div');
            paramDiv.className = 'param-control';
            
            const paramName = this.formatParamName(key);
            paramDiv.innerHTML = `
                <div class="param-header">
                    <span class="param-name">${paramName}</span>
                    <span class="param-value" id="${prefix}${key}">${value}</span>
                </div>
                <input type="range" 
                       class="param-slider" 
                       id="${prefix}Slider${key}"
                       min="${this.getParamMin(key)}"
                       max="${this.getParamMax(key)}"
                       step="${this.getParamStep(key)}"
                       value="${value}"
                       data-key="${key}"
                       data-prefix="${prefix}">
            `;
            
            const slider = paramDiv.querySelector('input[type="range"]');
            slider.addEventListener('input', (e) => this.onParamChange(e, prefix));
            
            section.appendChild(paramDiv);
        });
        
        container.appendChild(section);
    }
    
    onParamChange(event, prefix) {
        const key = event.target.dataset.key;
        const value = parseFloat(event.target.value);
        
        // 更新显示值
        document.getElementById(`${prefix}${key}`).textContent = 
            this.formatParamValue(key, value);
    }
    
    formatParamName(key) {
        const names = {
            duration: '持续时间',
            xPercent: '水平位移',
            scaleFrom: '起始缩放',
            scaleTo: '结束缩放',
            ease: '缓动函数',
            opacity: '透明度',
            stagger: '交错延迟'
        };
        return names[key] || key;
    }
    
    formatParamValue(key, value) {
        if (key === 'duration') return `${value.toFixed(2)}s`;
        if (key === 'xPercent' || key === 'opacity') return value.toFixed(0);
        if (key === 'scaleFrom' || key === 'scaleTo') return value.toFixed(1);
        if (key === 'stagger') return `${value.toFixed(2)}s`;
        return value;
    }
    
    getParamMin(key) {
        const mins = {
            duration: 0.1,
            xPercent: -200,
            scaleFrom: 0,
            scaleTo: 0,
            opacity: 0,
            stagger: 0
        };
        return mins[key] || 0;
    }
    
    getParamMax(key) {
        const maxs = {
            duration: 3,
            xPercent: 200,
            scaleFrom: 2,
            scaleTo: 2,
            opacity: 1,
            stagger: 1
        };
        return maxs[key] || 10;
    }
    
    getParamStep(key) {
        if (key === 'duration' || key === 'stagger') return 0.05;
        if (key === 'scaleFrom' || key === 'scaleTo') return 0.1;
        if (key === 'opacity') return 0.01;
        return 1;
    }
    
    getCurrentParams(prefix) {
        const params = {};
        const effectId = document.getElementById(`${prefix}Animation`).value;
        const effect = this.manager.getEffect(effectId);
        
        if (!effect || !effect.defaultParams) return params;
        
        Object.keys(effect.defaultParams).forEach(key => {
            const slider = document.getElementById(`${prefix}Slider${key}`);
            if (slider) {
                params[key] = parseFloat(slider.value);
            }
        });
        
        return params;
    }
    
    playAnimation() {
        if (this.isAnimating) {
            this.manager.log('动画正在进行中，请等待完成');
            return;
        }
        
        const exitEffectId = document.getElementById('exitAnimation').value;
        const enterEffectId = document.getElementById('enterAnimation').value;
        
        if (!exitEffectId || !enterEffectId) {
            this.manager.log('请选择进入和退出动画', 'error');
            return;
        }
        
        this.isAnimating = true;
        this.updateStatus('动画进行中...');
        
        const exitParams = this.getCurrentParams('exit');
        const enterParams = this.getCurrentParams('enter');
        
        try {
            this.manager.execute(
                exitEffectId,
                enterEffectId,
                this.currentPage,
                this.newPage,
                exitParams,
                enterParams
            );
            
            this.updateTimeline(exitParams.duration || 0.5, enterParams.duration || 0.5);
            
        } catch (error) {
            this.manager.log(`动画执行失败: ${error.message}`, 'error');
            this.isAnimating = false;
        }
    }
    
    stopAnimation() {
        this.manager.stop();
        this.isAnimating = false;
        this.updateStatus('动画已停止');
    }
    
    resetAnimation() {
        this.manager.reset(this.currentPage, this.newPage);
        this.isAnimating = false;
        this.updateStatus('已重置');
    }
    
    updateTimeline(exitDuration, enterDuration) {
        const exitBar = document.getElementById('exitTimeline');
        const enterBar = document.getElementById('enterTimeline');
        
        // 清空时间线
        exitBar.innerHTML = '';
        enterBar.innerHTML = '';
        
        // 退出动画时间线
        const exitProgress = document.createElement('div');
        exitProgress.className = 'timeline-progress';
        exitProgress.style.cssText = `
            position: absolute;
            height: 100%;
            background: rgba(255, 255, 255, 0.7);
            animation: timelineExit ${exitDuration}s linear forwards;
        `;
        
        // 进入动画时间线
        const enterProgress = document.createElement('div');
        enterProgress.className = 'timeline-progress';
        const overlap = Math.min(exitDuration, enterDuration) * 0.3;
        const enterStart = Math.max(0, exitDuration - overlap);
        enterProgress.style.cssText = `
            position: absolute;
            height: 100%;
            background: rgba(255, 255, 255, 0.7);
            animation: timelineEnter ${enterDuration}s linear ${enterStart}s forwards;
        `;
        
        exitBar.appendChild(exitProgress);
        enterBar.appendChild(enterProgress);
        
        // 添加CSS动画
        this.addTimelineStyles(exitDuration, enterDuration, enterStart);
    }
    
    addTimelineStyles(exitDuration, enterDuration, enterStart) {
        const style = document.createElement('style');
        style.id = 'timelineStyles';
        style.textContent = `
            @keyframes timelineExit {
                0% { width: 0%; }
                100% { width: 100%; }
            }
            @keyframes timelineEnter {
                0% { width: 0%; }
                100% { width: 100%; }
            }
        `;
        
        const existing = document.getElementById('timelineStyles');
        if (existing) existing.remove();
        document.head.appendChild(style);
    }
    
    initLogging() {
        this.debugConsole = document.getElementById('debugConsole');
    }
    
    onAnimationLog(detail) {
        const time = detail.timestamp.split(' ')[1];
        const type = detail.type === 'error' ? 'error' : 'info';
        const message = `[${time}] ${detail.message.split('] ')[1]}`;
        
        const logEntry = document.createElement('div');
        logEntry.className = `log-entry log-${type}`;
        logEntry.textContent = message;
        
        this.debugConsole.appendChild(logEntry);
        this.debugConsole.scrollTop = this.debugConsole.scrollHeight;
    }
    
    updateStatus(status) {
        const statusEl = document.getElementById('statusText');
        statusEl.textContent = status;
        statusEl.className = this.isAnimating ? 'status-animating' : 'status-idle';
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    window.previewController = new PreviewController();
});
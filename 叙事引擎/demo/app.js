// 叙事引擎编辑页 - 优化版交互逻辑
// 功能优先级：节点时间轴 > 播放控制 > 事件序列

class NarrativeEditor {
    constructor() {
        this.nodes = [
            {
                id: 1,
                name: '操作1',
                operationType: 'jump_scene',
                controlId: '功能入口',
                targetSceneId: '2',
                events: [
                    { order: 1, name: '点击控点', desc: '用户点击"功能入口"按钮' },
                    { order: 2, name: '跳转场景', desc: '跳转至功能详情页' },
                    { order: 3, name: '页面加载', desc: '加载目标页面内容' }
                ]
            },
            {
                id: 2,
                name: '操作2',
                operationType: 'show_popup',
                controlId: '产品介绍',
                targetSceneId: '',
                events: [
                    { order: 1, name: '点击控点', desc: '用户点击"产品介绍"按钮' },
                    { order: 2, name: '显示弹窗', desc: '显示产品介绍弹窗' }
                ]
            },
            {
                id: 3,
                name: '操作3',
                operationType: 'close_popup',
                controlId: '返回',
                targetSceneId: '',
                events: [
                    { order: 1, name: '点击控点', desc: '用户点击"返回"按钮' },
                    { order: 2, name: '关闭弹窗', desc: '关闭当前弹窗' }
                ]
            }
        ];
        this.selectedNodeId = 1;
        this.isPlaying = false;
        this.previewMode = 'final';
        this.currentTime = 0;
        this.totalTime = 15;
        
        this.init();
    }

    init() {
        this.bindEvents();
        this.render();
    }

    bindEvents() {
        // 节点选择
        document.getElementById('nodeList').addEventListener('click', (e) => {
            const nodeItem = e.target.closest('.node-item');
            if (nodeItem) {
                const nodeId = parseInt(nodeItem.dataset.nodeId);
                if (!e.target.closest('.action-btn') && !e.target.closest('.node-edit-btn')) {
                    this.selectNode(nodeId);
                }
            }
        });

        // 节点操作按钮
        document.getElementById('nodeList').addEventListener('click', (e) => {
            const actionBtn = e.target.closest('.action-btn');
            if (actionBtn) {
                const nodeItem = actionBtn.closest('.node-item');
                const nodeId = parseInt(nodeItem.dataset.nodeId);
                
                if (actionBtn.classList.contains('copy-btn')) {
                    this.copyNode(nodeId);
                } else if (actionBtn.classList.contains('delete-btn')) {
                    this.deleteNode(nodeId);
                }
            }
        });

        // 编辑节点按钮
        document.getElementById('nodeList').addEventListener('click', (e) => {
            const editBtn = e.target.closest('.node-edit-btn');
            if (editBtn) {
                this.openModal();
            }
        });

        // 添加节点按钮
        document.getElementById('addNodeBtn').addEventListener('click', () => {
            this.addNewNode();
        });

        // 播放控制
        document.getElementById('playBtn').addEventListener('click', () => this.togglePlay());
        document.getElementById('stopBtn').addEventListener('click', () => this.stopPlay());

        // 预览模式切换
        document.querySelectorAll('.mode-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const mode = e.currentTarget.dataset.mode;
                this.switchPreviewMode(mode);
            });
        });

        // 弹窗控制
        document.getElementById('modalClose').addEventListener('click', () => this.closeModal());
        document.getElementById('modalOverlay').addEventListener('click', () => this.closeModal());
        document.getElementById('cancelBtn').addEventListener('click', () => this.closeModal());
        document.getElementById('saveBtn').addEventListener('click', () => this.saveNode());

        // 操作类型变化时更新目标场景显示
        document.getElementById('operationType').addEventListener('change', (e) => {
            this.toggleTargetSceneField(e.target.value);
        });

        // 保存按钮
        document.querySelector('.toolbar-btn.primary').addEventListener('click', () => {
            this.saveNarrative();
        });

        // 设置按钮
        document.getElementById('settingsBtn').addEventListener('click', () => {
            this.openSettings();
        });

        // 控点双击
        document.querySelectorAll('.control-point').forEach(point => {
            point.addEventListener('dblclick', (e) => {
                const controlId = e.currentTarget.dataset.controlId;
                this.createNodeFromControl(controlId);
            });
        });

        // 进度条拖拽
        const progressTrack = document.querySelector('.playback-progress-track');
        if (progressTrack) {
            progressTrack.addEventListener('click', (e) => {
                const rect = progressTrack.getBoundingClientRect();
                const percent = (e.clientX - rect.left) / rect.width;
                this.seekTo(percent);
            });
        }
    }

    render() {
        this.renderNodeList();
        this.renderEventList();
        this.updateAutoDescription();
        this.updatePlaybackUI();
    }

    renderNodeList() {
        const nodeList = document.getElementById('nodeList');
        nodeList.innerHTML = '';

        this.nodes.forEach((node, index) => {
            const nodeItem = document.createElement('div');
            nodeItem.className = `node-item ${node.id === this.selectedNodeId ? 'active' : ''}`;
            nodeItem.dataset.nodeId = node.id;
            
            nodeItem.innerHTML = `
                <div class="node-indicator">
                    <div class="node-number">${index + 1}</div>
                    ${index < this.nodes.length - 1 ? '<div class="node-line"></div>' : ''}
                </div>
                <div class="node-card">
                    <div class="node-main">
                        <div class="node-header">
                            <span class="node-name">${node.name}</span>
                            <div class="node-actions">
                                <button class="action-btn copy-btn" title="复制">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" stroke="currentColor" stroke-width="2"/>
                                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" stroke="currentColor" stroke-width="2"/>
                                    </svg>
                                </button>
                                <button class="action-btn delete-btn" title="删除">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                                        <polyline points="3 6 5 6 21 6" stroke="currentColor" stroke-width="2"/>
                                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke="currentColor" stroke-width="2"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div class="node-meta">
                            <span class="node-type">${this.getShortOperationTypeName(node.operationType)}</span>
                            <span class="node-control">${node.controlId}</span>
                        </div>
                    </div>
                    <button class="node-edit-btn" title="编辑">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                </div>
            `;
            
            nodeList.appendChild(nodeItem);
        });

        // 更新节点计数
        const countEl = document.querySelector('.timeline-count');
        if (countEl) {
            countEl.textContent = `${this.nodes.length} 个节点`;
        }
    }

    renderEventList() {
        const eventList = document.getElementById('eventList');
        eventList.innerHTML = '';

        const selectedNode = this.nodes.find(n => n.id === this.selectedNodeId);
        if (!selectedNode || !selectedNode.events) return;

        selectedNode.events.forEach((event, index) => {
            const eventItem = document.createElement('div');
            eventItem.className = 'event-item-compact';
            eventItem.dataset.eventOrder = event.order;
            
            eventItem.innerHTML = `
                <div class="event-step">${event.order}</div>
                <div class="event-info">
                    <span class="event-name">${event.name}</span>
                    ${index < selectedNode.events.length - 1 ? '<span class="event-arrow">→</span>' : ''}
                </div>
            `;
            
            eventList.appendChild(eventItem);
        });

        // 更新事件计数
        const countEl = document.querySelector('.event-count');
        if (countEl) {
            countEl.textContent = `${selectedNode.events.length} 个事件`;
        }
    }

    selectNode(nodeId) {
        this.selectedNodeId = nodeId;
        this.currentTime = 0;
        this.renderNodeList();
        this.renderEventList();
        this.updateAutoDescription();
        this.updatePlaybackUI();
    }

    addNewNode() {
        const newNode = {
            id: Date.now(),
            name: `操作${this.nodes.length + 1}`,
            operationType: 'jump_scene',
            controlId: '新控点',
            targetSceneId: '',
            events: [
                { order: 1, name: '点击控点', desc: '用户点击新控点' },
                { order: 2, name: '执行操作', desc: '执行相应操作' }
            ]
        };

        this.nodes.push(newNode);
        this.selectedNodeId = newNode.id;
        this.render();
        this.showNotification('节点已添加');
    }

    copyNode(nodeId) {
        const node = this.nodes.find(n => n.id === nodeId);
        if (!node) return;

        const newNode = {
            ...node,
            id: Date.now(),
            name: `${node.name} (复制)`,
            events: node.events.map(e => ({ ...e }))
        };

        const index = this.nodes.findIndex(n => n.id === nodeId);
        this.nodes.splice(index + 1, 0, newNode);
        
        this.render();
        this.showNotification('节点已复制');
    }

    deleteNode(nodeId) {
        if (this.nodes.length <= 1) {
            this.showNotification('至少保留一个节点', 'error');
            return;
        }

        const index = this.nodes.findIndex(n => n.id === nodeId);
        this.nodes.splice(index, 1);
        
        if (this.selectedNodeId === nodeId) {
            this.selectedNodeId = this.nodes[Math.min(index, this.nodes.length - 1)].id;
        }
        
        this.render();
        this.showNotification('节点已删除');
    }

    createNodeFromControl(controlId) {
        const newNode = {
            id: Date.now(),
            name: `操作${this.nodes.length + 1}`,
            operationType: 'jump_scene',
            controlId: `控点${controlId}`,
            targetSceneId: '',
            events: [
                { order: 1, name: '点击控点', desc: `用户点击"控点${controlId}"` },
                { order: 2, name: '执行操作', desc: '执行相应操作' }
            ]
        };

        this.nodes.push(newNode);
        this.selectedNodeId = newNode.id;
        this.render();
        this.showNotification('节点已创建');
    }

    togglePlay() {
        if (this.isPlaying) {
            this.pausePlay();
        } else {
            this.startPlay();
        }
    }

    startPlay() {
        this.isPlaying = true;
        const playBtn = document.getElementById('playBtn');
        playBtn.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <rect x="6" y="4" width="4" height="16" fill="currentColor"/>
                <rect x="14" y="4" width="4" height="16" fill="currentColor"/>
            </svg>
        `;
        playBtn.title = '暂停';
        
        this.showNotification('开始播放');
        
        // 模拟播放进度
        this.playInterval = setInterval(() => {
            this.currentTime += 0.1;
            if (this.currentTime >= this.totalTime) {
                this.currentTime = this.totalTime;
                this.pausePlay();
            }
            this.updatePlaybackUI();
        }, 100);
    }

    pausePlay() {
        this.isPlaying = false;
        const playBtn = document.getElementById('playBtn');
        playBtn.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M5 3L19 12L5 21V3Z" fill="currentColor"/>
            </svg>
        `;
        playBtn.title = '播放';
        
        if (this.playInterval) {
            clearInterval(this.playInterval);
            this.playInterval = null;
        }
        
        this.showNotification('已暂停');
    }

    stopPlay() {
        this.isPlaying = false;
        this.currentTime = 0;
        
        const playBtn = document.getElementById('playBtn');
        playBtn.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M5 3L19 12L5 21V3Z" fill="currentColor"/>
            </svg>
        `;
        playBtn.title = '播放';
        
        if (this.playInterval) {
            clearInterval(this.playInterval);
            this.playInterval = null;
        }
        
        this.selectedNodeId = this.nodes[0]?.id || 1;
        this.render();
        this.showNotification('已停止');
    }

    seekTo(percent) {
        this.currentTime = percent * this.totalTime;
        
        // 根据进度切换到对应节点
        const nodeIndex = Math.min(
            Math.floor(percent * this.nodes.length),
            this.nodes.length - 1
        );
        
        if (this.nodes[nodeIndex] && this.nodes[nodeIndex].id !== this.selectedNodeId) {
            this.selectedNodeId = this.nodes[nodeIndex].id;
            this.renderNodeList();
            this.renderEventList();
            this.updateAutoDescription();
        }
        
        this.updatePlaybackUI();
    }

    updatePlaybackUI() {
        const percent = (this.currentTime / this.totalTime) * 100;
        
        // 更新进度条
        const progressFill = document.querySelector('.playback-progress-fill');
        const progressHandle = document.querySelector('.playback-progress-handle');
        
        if (progressFill) progressFill.style.width = `${percent}%`;
        if (progressHandle) progressHandle.style.left = `${percent}%`;
        
        // 更新时间显示
        const timeEl = document.querySelector('.playback-time');
        const totalEl = document.querySelector('.playback-total');
        
        if (timeEl) timeEl.textContent = this.formatTime(this.currentTime);
        if (totalEl) totalEl.textContent = this.formatTime(this.totalTime);
    }

    formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }

    switchPreviewMode(mode) {
        this.previewMode = mode;
        
        document.querySelectorAll('.mode-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.mode === mode) {
                btn.classList.add('active');
            }
        });

        this.showNotification(mode === 'final' ? '已切换到最终状态模式' : '已切换到播放预览模式');
    }

    openModal() {
        const node = this.nodes.find(n => n.id === this.selectedNodeId);
        if (!node) return;

        document.getElementById('nodeName').value = node.name;
        document.getElementById('operationType').value = node.operationType;
        document.getElementById('controlId').value = node.controlId;
        document.getElementById('targetSceneId').value = node.targetSceneId || '';

        this.toggleTargetSceneField(node.operationType);

        document.getElementById('modalOverlay').classList.add('active');
        document.getElementById('nodeEditModal').classList.add('active');
    }

    closeModal() {
        document.getElementById('modalOverlay').classList.remove('active');
        document.getElementById('nodeEditModal').classList.remove('active');
    }

    saveNode() {
        const node = this.nodes.find(n => n.id === this.selectedNodeId);
        if (!node) return;

        node.name = document.getElementById('nodeName').value;
        node.operationType = document.getElementById('operationType').value;
        node.controlId = document.getElementById('controlId').value;
        node.targetSceneId = document.getElementById('targetSceneId').value;

        // 更新事件描述
        this.updateNodeEvents(node);

        this.closeModal();
        this.render();
        this.showNotification('节点已保存');
    }

    updateNodeEvents(node) {
        const operationType = node.operationType;
        const controlId = node.controlId;
        
        switch (operationType) {
            case 'jump_scene':
                node.events = [
                    { order: 1, name: '点击控点', desc: `用户点击"${controlId}"按钮` },
                    { order: 2, name: '跳转场景', desc: `跳转至${node.targetSceneId ? '目标场景' : '新页面'}` },
                    { order: 3, name: '页面加载', desc: '加载目标页面内容' }
                ];
                break;
            case 'show_popup':
                node.events = [
                    { order: 1, name: '点击控点', desc: `用户点击"${controlId}"按钮` },
                    { order: 2, name: '显示弹窗', desc: `显示${controlId}弹窗` }
                ];
                break;
            case 'close_popup':
                node.events = [
                    { order: 1, name: '点击控点', desc: `用户点击"${controlId}"按钮` },
                    { order: 2, name: '关闭弹窗', desc: `关闭${controlId}弹窗` }
                ];
                break;
            default:
                node.events = [
                    { order: 1, name: '点击控点', desc: `用户点击"${controlId}"按钮` },
                    { order: 2, name: '执行操作', desc: '执行相应操作' }
                ];
        }
    }

    toggleTargetSceneField(operationType) {
        const targetSceneGroup = document.getElementById('targetSceneGroup');
        if (targetSceneGroup) {
            targetSceneGroup.style.display = operationType === 'jump_scene' ? 'block' : 'none';
        }
    }

    updateAutoDescription() {
        const node = this.nodes.find(n => n.id === this.selectedNodeId);
        if (!node) return;

        const description = this.generateAutoDescription(node);
        const descEl = document.getElementById('autoDescription');
        if (descEl) {
            descEl.textContent = description;
        }
    }

    generateAutoDescription(node) {
        const operationType = node.operationType;
        const controlId = node.controlId;
        
        switch (operationType) {
            case 'jump_scene':
                return `跳转至${node.targetSceneId ? '功能详情页' : '目标页面'}`;
            case 'show_popup':
                return `显示${controlId}弹窗`;
            case 'show_hide':
                return `显示${controlId}`;
            case 'close_popup':
                return `关闭${controlId}弹窗`;
            case 'nav_switch':
                return `切换至${controlId}`;
            case 'close_button':
                return '点击关闭按钮';
            case 'highlight':
                return `高亮${controlId}`;
            case 'camera_move':
                return `镜头移动至${controlId}`;
            default:
                return node.description || '执行操作';
        }
    }

    saveNarrative() {
        const saveStatus = document.querySelector('.save-status');
        if (saveStatus) {
            saveStatus.textContent = '保存中...';
            saveStatus.style.color = 'var(--accent-orange)';
        }
        
        setTimeout(() => {
            if (saveStatus) {
                saveStatus.textContent = '已保存';
                saveStatus.style.color = 'var(--accent-green)';
            }
            this.showNotification('叙事线已保存');
        }, 800);
    }

    openSettings() {
        this.showNotification('设置功能开发中...');
    }

    getShortOperationTypeName(type) {
        const typeMap = {
            'jump_scene': '跳转场景',
            'show_popup': '内容弹窗',
            'show_hide': '显示隐藏',
            'close_popup': '关闭弹窗',
            'nav_switch': '导航切换',
            'close_button': '关闭按钮',
            'highlight': '高亮聚焦',
            'camera_move': '镜头移动'
        };
        return typeMap[type] || type;
    }

    showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 80px;
            right: 20px;
            padding: 12px 20px;
            background: ${type === 'error' ? 'var(--accent-red)' : 'var(--primary-500)'};
            color: white;
            border-radius: 8px;
            font-size: 13px;
            font-weight: 500;
            box-shadow: var(--shadow-lg);
            z-index: 9999;
            animation: slideIn 0.3s ease;
        `;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideIn 0.3s ease reverse';
            setTimeout(() => notification.remove(), 300);
        }, 2500);
    }
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    new NarrativeEditor();
});

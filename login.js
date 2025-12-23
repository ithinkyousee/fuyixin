// 登录页面JavaScript
let isSoundEnabled = true;
let fallingElementsInterval;

// 飘落元素
const fallingSymbols = ['💖', '💕', '💗', '💓', '💞', '✨', '🌟', '🌸', '🎀', '🎈'];

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    startFallingElements();
    initFireworks();
    autoPlayMusic();
    
    // 添加表单提交事件
    const loginForm = document.getElementById('login-form');
    loginForm.addEventListener('submit', handleLogin);
    
    // 添加输入框动画效果
    initInputAnimations();
    
    // 检查是否有保存的登录信息
    checkSavedLogin();
});

// 开始飘落元素
function startFallingElements() {
    fallingElementsInterval = setInterval(() => {
        createFallingElement();
    }, 300);
}

// 创建单个飘落元素
function createFallingElement() {
    const container = document.getElementById('falling-elements');
    const element = document.createElement('div');
    
    const symbol = fallingSymbols[Math.floor(Math.random() * fallingSymbols.length)];
    element.innerHTML = symbol;
    element.className = 'falling-element';
    
    // 随机位置和动画时间
    const left = Math.random() * 100;
    const duration = 3 + Math.random() * 7;
    const size = 1 + Math.random() * 2;
    const delay = Math.random() * 5;
    
    element.style.cssText = `
        left: ${left}%;
        animation-duration: ${duration}s;
        animation-delay: ${delay}s;
        font-size: ${size}rem;
        color: ${getRandomColor()};
        opacity: ${0.3 + Math.random() * 0.7};
    `;
    
    container.appendChild(element);
    
    // 移除元素
    setTimeout(() => {
        if (element.parentNode) {
            container.removeChild(element);
        }
    }, (duration + delay) * 1000);
}

// 处理登录
function handleLogin(event) {
    event.preventDefault();
    playClickSound();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const remember = document.getElementById('remember').checked;
    
    // 验证登录信息
    if (username === '付益欣' && password === 'woaini') {
        // 普通用户登录成功
        showSuccessAnimation();
        
        // 保存登录信息
        if (remember) {
            localStorage.setItem('savedUsername', username);
            localStorage.setItem('savedPassword', password);
            localStorage.setItem('userType', 'user');
        } else {
            localStorage.removeItem('savedUsername');
            localStorage.removeItem('savedPassword');
            localStorage.removeItem('userType');
        }
        
        // 延迟跳转
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 2000);
    } else if (username === 'admin' && password === 'woaini') {
        // 管理员登录成功
        showAdminSuccessAnimation();
        
        // 保存登录信息
        if (remember) {
            localStorage.setItem('savedUsername', username);
            localStorage.setItem('savedPassword', password);
            localStorage.setItem('userType', 'admin');
        } else {
            localStorage.removeItem('savedUsername');
            localStorage.removeItem('savedPassword');
            localStorage.removeItem('userType');
        }
        
        // 延迟跳转
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 2000);
    } else {
        // 登录失败
        showErrorAnimation();
        
        // 具体错误提示
        if (username !== '付益欣' && username !== 'admin') {
            showMessage('账号错误！请检查账号是否正确。', 'error');
        } else {
            showMessage('密码错误！密码是woaini（我爱你）。', 'error');
        }
    }
}

// 显示成功动画
function showSuccessAnimation() {
    const loading = document.getElementById('loading');
    const loginBox = document.querySelector('.login-box');
    
    // 显示加载动画
    loading.classList.add('show');
    
    // 创建成功特效
    createSuccessFireworks();
    
    // 添加心跳动画
    loginBox.style.animation = 'heartbeat 0.6s ease-in-out';
    
    // 改变背景色
    document.body.style.background = 'linear-gradient(135deg, #2ed573, #7bed9f)';
    
    // 播放成功音效
    playSuccessSound();
}

// 显示错误动画
function showErrorAnimation() {
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const loginForm = document.getElementById('login-form');
    
    // 添加错误样式
    usernameInput.parentElement.classList.add('error');
    passwordInput.parentElement.classList.add('error');
    
    // 震动效果
    loginForm.style.animation = 'shake 0.5s ease-in-out';
    
    // 恢复样式
    setTimeout(() => {
        usernameInput.parentElement.classList.remove('error');
        passwordInput.parentElement.classList.remove('error');
        loginForm.style.animation = '';
    }, 500);
    
    // 播放错误音效
    playErrorSound();
}

// 显示管理员登录成功动画
function showAdminSuccessAnimation() {
    const loading = document.getElementById('loading');
    const loginBox = document.querySelector('.login-box');
    
    // 显示加载动画
    loading.classList.add('show');
    
    // 创建管理员专属特效
    createAdminSuccessFireworks();
    
    // 添加管理员特效
    loginBox.style.animation = 'adminGlow 1s ease-in-out infinite alternate';
    
    // 改变背景色为管理员专属色
    document.body.style.background = 'linear-gradient(135deg, #4834d4, #686de0)';
    
    // 播放管理员成功音效
    playAdminSuccessSound();
    
    // 显示管理员欢迎消息
    showMessage('欢迎管理员！即将进入管理员模式...', 'success');
}

// 切换密码显示
function togglePassword() {
    playClickSound();
    
    const passwordInput = document.getElementById('password');
    const toggleButton = document.querySelector('.password-toggle');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleButton.textContent = '🙈';
    } else {
        passwordInput.type = 'password';
        toggleButton.textContent = '👁️';
    }
}

// 显示提示
function showHint() {
    playClickSound();
    
    const hintBox = document.getElementById('hint-box');
    hintBox.classList.toggle('show');
    
    // 3秒后自动隐藏
    if (hintBox.classList.contains('show')) {
        setTimeout(() => {
            hintBox.classList.remove('show');
        }, 3000);
    }
}

// 初始化输入框动画
function initInputAnimations() {
    const inputs = document.querySelectorAll('input');
    
    inputs.forEach(input => {
        // 聚焦效果
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'scale(1.02)';
            playClickSound();
        });
        
        // 失焦效果
        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'scale(1)';
        });
        
        // 输入效果
        input.addEventListener('input', function() {
            if (this.value.length > 0) {
                this.parentElement.classList.add('success');
            } else {
                this.parentElement.classList.remove('success');
            }
        });
    });
}

// 检查保存的登录信息
function checkSavedLogin() {
    const savedUsername = localStorage.getItem('savedUsername');
    const savedPassword = localStorage.getItem('savedPassword');
    
    if (savedUsername && savedPassword) {
        document.getElementById('username').value = savedUsername;
        document.getElementById('password').value = savedPassword;
        document.getElementById('remember').checked = true;
        
        // 自动填充后添加成功样式
        setTimeout(() => {
            document.getElementById('username').parentElement.classList.add('success');
            document.getElementById('password').parentElement.classList.add('success');
        }, 100);
    }
}

// 烟花效果
function initFireworks() {
    const canvas = document.getElementById('fireworks');
    const ctx = canvas.getContext('2d');
    
    // 设置画布大小
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
}

// 成功时的烟花效果
function createSuccessFireworks() {
    const canvas = document.getElementById('fireworks');
    const ctx = canvas.getContext('2d');
    
    // 创建多个烟花
    for (let i = 0; i < 8; i++) {
        setTimeout(() => {
            launchCelebrationFirework(ctx, canvas);
        }, i * 200);
    }
}

function launchCelebrationFirework(ctx, canvas) {
    const x = Math.random() * canvas.width;
    const y = canvas.height;
    const targetY = canvas.height * 0.2 + Math.random() * canvas.height * 0.3;
    
    const particles = [];
    const color = getRandomColor();
    
    // 上升阶段
    let currentY = y;
    const riseInterval = setInterval(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // 绘制上升的火花
        ctx.beginPath();
        ctx.arc(x, currentY, 3, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
        
        currentY -= 8;
        
        if (currentY <= targetY) {
            clearInterval(riseInterval);
            explodeCelebrationFirework(ctx, x, currentY, color, particles);
        }
    }, 16);
}

function explodeCelebrationFirework(ctx, x, y, color, particles) {
    const particleCount = 80 + Math.floor(Math.random() * 50);
    
    for (let i = 0; i < particleCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 3 + Math.random() * 4;
        const size = 2 + Math.random() * 4;
        const life = 80 + Math.floor(Math.random() * 70);
        
        particles.push({
            x, y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            size,
            life,
            color
        });
    }
    
    const explodeInterval = setInterval(() => {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        
        let allDead = true;
        
        for (let i = particles.length - 1; i >= 0; i--) {
            const particle = particles[i];
            
            if (particle.life > 0) {
                allDead = false;
                drawParticle(ctx, particle);
                
                particle.x += particle.vx;
                particle.y += particle.vy;
                particle.vy += 0.05; // 较轻的重力
                particle.life--;
                particle.size *= 0.98;
            } else {
                particles.splice(i, 1);
            }
        }
        
        if (allDead) {
            clearInterval(explodeInterval);
        }
    }, 16);
}

function drawParticle(ctx, particle) {
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
    ctx.fillStyle = particle.color;
    ctx.fill();
    
    // 添加光晕效果
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.size * 2, 0, Math.PI * 2);
    ctx.fillStyle = particle.color + '20';
    ctx.fill();
}

// 播放点击音效
function playClickSound() {
    if (!isSoundEnabled) return;
    
    const sound = document.getElementById('click-sound');
    sound.currentTime = 0;
    sound.play().catch(e => console.log('音效播放失败:', e));
}

// 播放成功音效
function playSuccessSound() {
    if (!isSoundEnabled) return;
    
    // 创建成功音效
    const successSound = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-winning-chimes-2015.mp3');
    successSound.volume = 0.3;
    successSound.play().catch(e => console.log('成功音效播放失败:', e));
}

// 播放错误音效
function playErrorSound() {
    if (!isSoundEnabled) return;
    
    // 创建错误音效
    const errorSound = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-wrong-answer-fail-notification-946.mp3');
    errorSound.volume = 0.3;
    errorSound.play().catch(e => console.log('错误音效播放失败:', e));
}

// 播放管理员成功音效
function playAdminSuccessSound() {
    if (!isSoundEnabled) return;
    
    // 创建管理员专属音效
    const adminSound = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-achievement-bell-600.mp3');
    adminSound.volume = 0.4;
    adminSound.play().catch(e => console.log('管理员音效播放失败:', e));
}

// 管理员成功时的烟花效果
function createAdminSuccessFireworks() {
    const canvas = document.getElementById('fireworks');
    const ctx = canvas.getContext('2d');
    
    // 创建管理员专属烟花（紫色主题）
    for (let i = 0; i < 12; i++) {
        setTimeout(() => {
            launchAdminFirework(ctx, canvas);
        }, i * 150);
    }
}

function launchAdminFirework(ctx, canvas) {
    const x = Math.random() * canvas.width;
    const y = canvas.height;
    const targetY = canvas.height * 0.2 + Math.random() * canvas.height * 0.3;
    
    const particles = [];
    const colors = ['#4834d4', '#686de0', '#be2edd', '#e056fd', '#7d5fff'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    // 上升阶段
    let currentY = y;
    const riseInterval = setInterval(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // 绘制上升的火花（带星星效果）
        ctx.beginPath();
        ctx.arc(x, currentY, 4, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
        
        // 添加光晕
        ctx.beginPath();
        ctx.arc(x, currentY, 8, 0, Math.PI * 2);
        ctx.fillStyle = color + '40';
        ctx.fill();
        
        currentY -= 10;
        
        if (currentY <= targetY) {
            clearInterval(riseInterval);
            explodeAdminFirework(ctx, x, currentY, color, particles);
        }
    }, 16);
}

function explodeAdminFirework(ctx, x, y, color, particles) {
    const particleCount = 100 + Math.floor(Math.random() * 80);
    
    for (let i = 0; i < particleCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 4 + Math.random() * 5;
        const size = 3 + Math.random() * 5;
        const life = 100 + Math.floor(Math.random() * 80);
        
        particles.push({
            x, y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            size,
            life,
            color
        });
    }
    
    const explodeInterval = setInterval(() => {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        
        let allDead = true;
        
        for (let i = particles.length - 1; i >= 0; i--) {
            const particle = particles[i];
            
            if (particle.life > 0) {
                allDead = false;
                drawAdminParticle(ctx, particle);
                
                particle.x += particle.vx;
                particle.y += particle.vy;
                particle.vy += 0.03; // 较轻的重力
                particle.life--;
                particle.size *= 0.97;
            } else {
                particles.splice(i, 1);
            }
        }
        
        if (allDead) {
            clearInterval(explodeInterval);
        }
    }, 16);
}

function drawAdminParticle(ctx, particle) {
    // 绘制星星形状的粒子
    ctx.save();
    ctx.translate(particle.x, particle.y);
    
    // 绘制星形
    ctx.beginPath();
    for (let i = 0; i < 5; i++) {
        const angle = (i * 2 * Math.PI / 5) - Math.PI / 2;
        const x = Math.cos(angle) * particle.size;
        const y = Math.sin(angle) * particle.size;
        
        if (i === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
        
        const innerAngle = angle + Math.PI / 5;
        const innerX = Math.cos(innerAngle) * (particle.size / 2);
        const innerY = Math.sin(innerAngle) * (particle.size / 2);
        ctx.lineTo(innerX, innerY);
    }
    ctx.closePath();
    
    ctx.fillStyle = particle.color;
    ctx.fill();
    
    ctx.restore();
}

// 自动播放音乐
function autoPlayMusic() {
    const bgm = document.getElementById('bgm');
    if (!bgm) {
        console.error('未找到背景音乐元素');
        return;
    }
    
    bgm.volume = 0.3;
    
    // 检查音乐文件是否加载成功
    bgm.addEventListener('canplaythrough', function() {
        console.log('音乐文件加载成功，准备播放');
    });
    
    bgm.addEventListener('error', function(e) {
        console.error('音乐文件加载失败:', e);
        showMessage('❌ 音乐文件加载失败，请检查文件路径', 'error');
    });
    
    // 延迟播放以避免自动播放限制
    setTimeout(() => {
        bgm.play().catch(e => {
            console.log('自动播放失败，需要用户交互:', e);
            // 添加点击页面任意位置播放的提示
            showMessage('🎵 点击页面任意位置播放音乐', 'info');
            document.addEventListener('click', function playOnClick() {
                bgm.play().catch(e => console.log('音乐播放失败:', e));
                document.removeEventListener('click', playOnClick);
                showMessage('🎵 音乐开始播放', 'success');
            }, { once: true });
        });
    }, 1000);
}

// 获取随机颜色
function getRandomColor() {
    const colors = ['#ff6b95', '#ff8eb4', '#ffafbd', '#ffc3a0', '#a1c4fd', '#c2e9fb', '#2ed573', '#7bed9f'];
    return colors[Math.floor(Math.random() * colors.length)];
}

// 显示消息
function showMessage(message, type) {
    const messageBox = document.createElement('div');
    messageBox.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: ${type === 'error' ? '#ff4757' : '#2ed573'};
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 1000;
        animation: slideInDown 0.3s ease-out;
        font-family: inherit;
    `;
    
    messageBox.textContent = message;
    document.body.appendChild(messageBox);
    
    // 3秒后自动消失
    setTimeout(() => {
        messageBox.style.animation = 'slideOutUp 0.3s ease-out';
        setTimeout(() => {
            if (messageBox.parentNode) {
                document.body.removeChild(messageBox);
            }
        }, 300);
    }, 3000);
}

// 添加CSS动画
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInDown {
        from { transform: translateX(-50%) translateY(-100%); opacity: 0; }
        to { transform: translateX(-50%) translateY(0); opacity: 1; }
    }
    
    @keyframes slideOutUp {
        from { transform: translateX(-50%) translateY(0); opacity: 1; }
        to { transform: translateX(-50%) translateY(-100%); opacity: 0; }
    }
    
    @keyframes heartbeat {
        0%, 100% { transform: scale(1); }
        25% { transform: scale(1.05); }
        50% { transform: scale(1); }
        75% { transform: scale(1.02); }
    }
    
    @keyframes adminGlow {
        0% { 
            box-shadow: 0 0 20px rgba(72, 52, 212, 0.5);
            border: 2px solid #4834d4;
        }
        100% { 
            box-shadow: 0 0 40px rgba(72, 52, 212, 0.8);
            border: 2px solid #7d5fff;
        }
    }
`;
document.head.appendChild(style);

// 添加键盘快捷键
document.addEventListener('keydown', (e) => {
    switch(e.key) {
        case 'Enter':
            if (document.activeElement.tagName === 'INPUT') {
                document.getElementById('login-form').dispatchEvent(new Event('submit'));
            }
            break;
        case 'Escape':
            document.getElementById('username').focus();
            break;
        case 'h':
        case 'H':
            showHint();
            break;
    }
});

// 添加页面点击效果
document.addEventListener('click', function(e) {
    if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'BUTTON') {
        createRippleEffect(e.clientX, e.clientY);
    }
});

function createRippleEffect(x, y) {
    const ripple = document.createElement('div');
    ripple.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: rgba(255,107,149,0.3);
        pointer-events: none;
        z-index: 100;
        left: ${x - 10}px;
        top: ${y - 10}px;
        animation: rippleEffect 0.6s ease-out forwards;
    `;
    
    document.body.appendChild(ripple);
    
    setTimeout(() => {
        if (ripple.parentNode) {
            document.body.removeChild(ripple);
        }
    }, 600);
}

// 添加涟漪效果动画
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes rippleEffect {
        0% { transform: scale(1); opacity: 1; }
        100% { transform: scale(10); opacity: 0; }
    }
`;
document.head.appendChild(rippleStyle);
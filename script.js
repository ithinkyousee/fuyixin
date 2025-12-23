// 全局变量
let currentPhotoIndex = 0;
let currentSection = 'home';
let isMusicPlaying = false;
let isSoundEnabled = true;
let isFallingEnabled = true;
let fallingElementsInterval;
let clickCount = 0;
let easterEggsFound = [];

// 照片数组
const photos = [
    '微信图片_20251223215635_51_70.jpg',
    '微信图片_20251223215636_52_70.jpg',
    '微信图片_20251223215637_53_70.jpg',
    '微信图片_20251223215638_54_70.jpg',
    '微信图片_20251223215639_55_70.jpg',
    '微信图片_20251223215639_56_70.jpg',
    '微信图片_20251223215640_57_70.jpg',
    '微信图片_20251223215641_58_70.jpg',
    '微信图片_20251223215642_59_70.jpg',
    '微信图片_20251223215643_60_70.jpg',
    '微信图片_20251223215643_61_70.jpg',
    '微信图片_20251223215645_62_70.jpg'
];

// 照片描述
const photoDescriptions = [
    "最美的瞬间，最爱的你 💖",
    "你的笑容，我的阳光 🌞",
    "这一刻，永远珍藏 📸",
    "爱在眼中，甜在心里 🍬",
    "专属回忆，独一无二 🌟",
    "时光静好，与你同在 ⏳",
    "心动时刻，永恒记忆 💓",
    "温柔岁月，因你美丽 🌸",
    "甜蜜时光，爱你永远 🍭",
    "美好记忆，珍藏心底 🎀",
    "浪漫时刻，专属我们 💝",
    "爱你，从始至终 ❤️"
];

// 浪漫消息数组
const loveMessages = [
    "你是我生命中最美的意外 💖",
    "每一天都想和你在一起 🌸",
    "你的笑容是我最大的幸福 😊",
    "爱你是我做过最正确的事 ❤️",
    "你让我的世界变得完整 ✨",
    "和你在一起的每一刻都值得珍惜 💕",
    "你是我心中永远的公主 👑",
    "爱你，从心动到古稀 💘",
    "你是我最想留住的幸运 🌟",
    "有你在身边，每天都像情人节 💝",
    "你的存在让我的世界充满色彩 🌈",
    "爱你不是一时兴起，而是蓄谋已久 💞",
    "你是我平淡生活里的来日方长 🌅",
    "想和你一起看遍世间所有的美好 🌄",
    "你的名字是我写过最短的情诗 ✍️"
];

// 情书内容
const loveLetters = {
    1: {
        title: "💖 第一封情书",
        content: `亲爱的付益欣，

从遇见你的那一刻起，我的世界就变得不一样了。你的笑容像阳光一样温暖，你的眼神像星星一样明亮。

每一天都想和你在一起，分享生活中的点点滴滴。你是我生命中最美的意外，也是我最珍贵的礼物。

爱你，不仅仅是因为你是谁，更是因为和你在一起时，我变成了更好的自己。

永远爱你的，
你的专属程序员 💝`
    },
    2: {
        title: "💕 我们的故事",
        content: `亲爱的宝贝，

还记得我们第一次见面的时候吗？那时候的你，穿着那件漂亮的裙子，笑容灿烂得让人移不开眼。

从那一刻起，我就知道你就是我要找的那个人。我们一起走过的每一天，都成为了我最宝贵的回忆。

无论是开心时的欢笑，还是难过时的安慰，你都一直在我身边。感谢命运让我们相遇，感谢你选择了我。

爱你的，
永远守护你的人 🌟`
    },
    3: {
        title: "🌟 未来展望",
        content: `我最爱的付益欣，

我期待着和你一起走过的每一个明天。想要和你一起看遍世界的风景，想要和你一起经历人生的酸甜苦辣。

想象着我们一起变老的样子，依然手牵着手，依然相爱如初。想要给你一个温暖的家，想要为你创造所有的幸福。

无论未来会遇到什么困难，只要和你在一起，我就有勇气面对一切。因为你是我最大的动力，也是我永远的依靠。

期待与你的，
每一个明天 🌈`
    }
};

// 飘落元素
const fallingSymbols = ['💖', '💕', '💗', '💓', '💞', '✨', '🌟', '🌸', '🎀', '🎈', '🍬', '🎁'];

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    console.log('页面加载完成，开始初始化...');
    
    // 初始化各个模块
    initNavigation();
    initGallery();
    initLoveSection();
    initFallingElements();
    initFireworks();
    initEasterEggs();
    initClickEffects();
    
    // 检查用户类型并初始化管理员功能
    checkUserTypeAndInitAdmin();
    
    // 初始化音乐播放器
    setTimeout(() => {
        initMusicPlayer();
    }, 1000);
    
    // 显示欢迎消息
    setTimeout(() => {
        showWelcomeMessage();
    }, 1500);
    
    console.log('初始化完成！');
});

// 初始化导航
function initNavigation() {
    console.log('初始化导航...');
    
    // 导航切换按钮
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            playClickSound();
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }
    
    // 点击页面其他区域关闭移动端菜单
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768 && navMenu && navToggle) {
            if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        }
    });
}

// 切换页面部分
function switchSection(sectionId) {
    console.log('切换到部分:', sectionId);
    playClickSound();
    
    // 隐藏所有部分
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    // 显示目标部分
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
        currentSection = sectionId;
        
        // 更新导航激活状态
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + sectionId) {
                link.classList.add('active');
            }
        });
        
        // 关闭移动端菜单
        if (window.innerWidth <= 768) {
            const navMenu = document.getElementById('nav-menu');
            const navToggle = document.getElementById('nav-toggle');
            if (navMenu && navToggle) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        }
        
        // 部分特定初始化
        if (sectionId === 'gallery') {
            initGalleryDisplay();
        } else if (sectionId === 'love') {
            initLoveLetters();
        }
        
        // 添加切换动画
        targetSection.style.animation = 'none';
        setTimeout(() => {
            targetSection.style.animation = 'fadeInUp 0.8s ease-out';
        }, 10);
    }
}

// 初始化相册
function initGallery() {
    console.log('初始化相册...');
    initGalleryDisplay();
    initGalleryThumbnails();
}

function initGalleryDisplay() {
    const galleryDisplay = document.getElementById('gallery-display');
    if (!galleryDisplay) return;
    
    galleryDisplay.innerHTML = '';
    
    const photo = document.createElement('img');
    photo.src = photos[currentPhotoIndex];
    photo.alt = `照片 ${currentPhotoIndex + 1}`;
    photo.className = 'gallery-photo';
    photo.onclick = () => enlargePhoto(currentPhotoIndex);
    photo.onload = function() {
        this.style.opacity = '1';
        this.style.transform = 'scale(1)';
    };
    
    photo.style.cssText = `
        opacity: 0;
        transform: scale(0.8);
        transition: all 0.5s ease;
        max-width: 100%;
        max-height: 400px;
        border-radius: 15px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        cursor: pointer;
    `;
    
    galleryDisplay.appendChild(photo);
    updatePhotoInfo();
}

function initGalleryThumbnails() {
    const thumbnailsContainer = document.getElementById('gallery-thumbnails');
    if (!thumbnailsContainer) return;
    
    thumbnailsContainer.innerHTML = '';
    
    photos.forEach((photo, index) => {
        const thumbnail = document.createElement('img');
        thumbnail.src = photo;
        thumbnail.alt = `缩略图 ${index + 1}`;
        thumbnail.className = `thumbnail ${index === currentPhotoIndex ? 'active' : ''}`;
        thumbnail.onclick = () => switchToPhoto(index);
        
        thumbnailsContainer.appendChild(thumbnail);
    });
}

function switchToPhoto(index) {
    playClickSound();
    
    if (index === currentPhotoIndex) return;
    
    currentPhotoIndex = index;
    
    // 更新主照片
    const galleryDisplay = document.getElementById('gallery-display');
    if (galleryDisplay) {
        galleryDisplay.style.opacity = '0';
        
        setTimeout(() => {
            initGalleryDisplay();
            galleryDisplay.style.opacity = '1';
        }, 300);
    }
    
    // 更新缩略图
    const thumbnails = document.querySelectorAll('.thumbnail');
    thumbnails.forEach((thumb, i) => {
        thumb.classList.toggle('active', i === index);
    });
    
    updatePhotoInfo();
}

function updatePhotoInfo() {
    const counter = document.getElementById('photo-counter');
    const date = document.getElementById('photo-date');
    
    if (counter) {
        counter.textContent = `${currentPhotoIndex + 1}/${photos.length}`;
    }
    
    if (date) {
        date.textContent = photoDescriptions[currentPhotoIndex] || "美好时刻";
    }
}

function prevPhoto() {
    playClickSound();
    const newIndex = (currentPhotoIndex - 1 + photos.length) % photos.length;
    switchToPhoto(newIndex);
}

function nextPhoto() {
    playClickSound();
    const newIndex = (currentPhotoIndex + 1) % photos.length;
    switchToPhoto(newIndex);
}

function enlargeCurrentPhoto() {
    playClickSound();
    enlargePhoto(currentPhotoIndex);
}

function enlargePhoto(index) {
    playClickSound();
    
    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modal-body');
    
    if (!modal || !modalBody) return;
    
    modalBody.innerHTML = `
        <div style="text-align: center; padding: 20px;">
            <img src="${photos[index]}" alt="放大照片" style="max-width: 100%; max-height: 80vh; border-radius: 10px; box-shadow: 0 0 50px rgba(0,0,0,0.5);">
            <p style="margin-top: 20px; color: #666; font-size: 1.1rem;">${photoDescriptions[index]}</p>
        </div>
    `;
    
    modal.style.display = 'block';
    
    // 禁用背景滚动
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    playClickSound();
    
    const modal = document.getElementById('modal');
    if (modal) {
        modal.style.display = 'none';
    }
    
    // 恢复背景滚动
    document.body.style.overflow = '';
}

// 点击模态框背景关闭
window.addEventListener('click', function(e) {
    const modal = document.getElementById('modal');
    if (e.target === modal) {
        closeModal();
    }
});

// 初始化爱意部分
function initLoveSection() {
    console.log('初始化爱意部分...');
    initLoveLetters();
}

function initLoveLetters() {
    const letterCards = document.querySelectorAll('.letter-card');
    
    letterCards.forEach(card => {
        card.addEventListener('click', function() {
            playClickSound();
            
            // 移除所有激活状态
            letterCards.forEach(c => c.classList.remove('active'));
            
            // 激活当前卡片
            this.classList.add('active');
            
            // 显示对应情书
            const letterId = this.getAttribute('data-letter');
            displayLoveLetter(letterId);
        });
    });
}

function displayLoveLetter(letterId) {
    const loveTitle = document.getElementById('love-title');
    const loveText = document.getElementById('love-text');
    
    if (!loveTitle || !loveText) return;
    
    const letter = loveLetters[letterId];
    if (letter) {
        loveTitle.textContent = letter.title;
        loveText.innerHTML = letter.content.replace(/\n/g, '<br>');
        
        // 添加显示动画
        loveText.style.animation = 'none';
        setTimeout(() => {
            loveText.style.animation = 'fadeInUp 0.5s ease-out';
        }, 10);
    }
}

// 显示随机爱意消息
function showRandomLoveMessage() {
    playClickSound();
    
    const randomMessage = loveMessages[Math.floor(Math.random() * loveMessages.length)];
    
    // 创建浮动消息
    createFloatingMessage(randomMessage, 'love');
    
    // 创建爱心特效
    createHeartExplosion();
}

function createLoveAnimation() {
    playClickSound();
    
    // 创建大型爱心特效
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            createFloatingHeart();
        }, i * 100);
    }
    
    // 显示特殊消息
    createFloatingMessage('💖 我爱你！ 💖', 'special');
}

function recordLoveVoice() {
    playClickSound();
    
    // 检查浏览器是否支持录音
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        showMessage('🎤 您的浏览器不支持录音功能', 'error');
        return;
    }
    
    showMessage('🎤 开始录音...请说出你的心里话', 'info');
    
    // 创建录音界面
    const recordingModal = document.createElement('div');
    recordingModal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        z-index: 3000;
        color: white;
    `;
    
    recordingModal.innerHTML = `
        <div style="background: rgba(255,255,255,0.1); padding: 30px; border-radius: 20px; text-align: center; backdrop-filter: blur(10px);">
            <div class="recording-animation" style="font-size: 4rem; margin-bottom: 20px;">🎤</div>
            <h3 style="margin-bottom: 20px;">正在录音中...</h3>
            <p style="margin-bottom: 30px;">说出你想对我说的话吧！</p>
            <div style="display: flex; gap: 20px;">
                <button onclick="stopRecording()" style="background: #ff6b95; color: white; border: none; padding: 10px 20px; border-radius: 10px; cursor: pointer;">停止录音</button>
                <button onclick="cancelRecording()" style="background: #666; color: white; border: none; padding: 10px 20px; border-radius: 10px; cursor: pointer;">取消</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(recordingModal);
    
    // 模拟录音过程（实际项目中可以集成真实录音API）
    setTimeout(() => {
        if (recordingModal.parentNode) {
            document.body.removeChild(recordingModal);
            showMessage('💝 录音完成！已保存到你的心里～', 'success');
            createHeartExplosion();
        }
    }, 5000);
}

function stopRecording() {
    const recordingModal = document.querySelector('div[style*="z-index: 3000"]');
    if (recordingModal && recordingModal.parentNode) {
        document.body.removeChild(recordingModal);
        showMessage('💝 录音完成！已保存到你的心里～', 'success');
        createHeartExplosion();
    }
}

function cancelRecording() {
    const recordingModal = document.querySelector('div[style*="z-index: 3000"]');
    if (recordingModal && recordingModal.parentNode) {
        document.body.removeChild(recordingModal);
        showMessage('录音已取消', 'info');
    }
}

// 开始飘落元素
function initFallingElements() {
    console.log('初始化飘落元素...');
    startFallingElements();
}

function startFallingElements() {
    if (fallingElementsInterval) {
        clearInterval(fallingElementsInterval);
    }
    
    fallingElementsInterval = setInterval(() => {
        if (isFallingEnabled) {
            createFallingElement();
        }
    }, 200);
}

function createFallingElement() {
    const container = document.getElementById('falling-elements');
    if (!container) return;
    
    const element = document.createElement('div');
    
    const symbol = fallingSymbols[Math.floor(Math.random() * fallingSymbols.length)];
    element.innerHTML = symbol;
    element.className = 'falling-element';
    
    // 随机属性
    const left = Math.random() * 100;
    const duration = 3 + Math.random() * 7;
    const size = 1 + Math.random() * 2;
    const delay = Math.random() * 5;
    const opacity = 0.3 + Math.random() * 0.7;
    
    element.style.cssText = `
        left: ${left}%;
        animation-duration: ${duration}s;
        animation-delay: ${delay}s;
        font-size: ${size}rem;
        color: ${getRandomColor()};
        opacity: ${opacity};
        z-index: 2;
        pointer-events: none;
    `;
    
    container.appendChild(element);
    
    // 自动移除
    setTimeout(() => {
        if (element.parentNode) {
            container.removeChild(element);
        }
    }, (duration + delay) * 1000);
}

function toggleFallingElements() {
    playClickSound();
    isFallingEnabled = !isFallingEnabled;
    
    const button = document.querySelector('[onclick="toggleFallingElements()"]');
    if (button) {
        button.innerHTML = isFallingEnabled ? '<i class="fas fa-snowflake"></i>' : '<i class="fas fa-ban"></i>';
        button.title = isFallingEnabled ? '关闭飘落' : '开启飘落';
    }
    
    showMessage(isFallingEnabled ? '❄️ 飘落效果已开启' : '🚫 飘落效果已关闭', 'info');
}

// 烟花效果
function initFireworks() {
    console.log('初始化烟花效果...');
    
    const canvas = document.getElementById('fireworks');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
}

function createFireworks() {
    playClickSound();
    
    const canvas = document.getElementById('fireworks');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    // 清除之前的烟花
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // 创建多个烟花
    for (let i = 0; i < 8; i++) {
        setTimeout(() => {
            launchFirework(ctx, canvas);
        }, i * 300);
    }
    
    showMessage('🎆 烟花绽放！', 'success');
}

function launchFirework(ctx, canvas) {
    const x = Math.random() * canvas.width;
    const y = canvas.height;
    const targetY = canvas.height * 0.2 + Math.random() * canvas.height * 0.3;
    
    const particles = [];
    const color = getRandomColor();
    
    // 上升阶段
    let currentY = y;
    const riseInterval = setInterval(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // 绘制其他粒子
        particles.forEach(particle => {
            drawParticle(ctx, particle);
        });
        
        // 绘制上升轨迹
        ctx.beginPath();
        ctx.arc(x, currentY, 3, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
        
        currentY -= 8;
        
        if (currentY <= targetY) {
            clearInterval(riseInterval);
            explodeFirework(ctx, x, currentY, color, particles);
        }
    }, 16);
}

function explodeFirework(ctx, x, y, color, particles) {
    const particleCount = 100 + Math.floor(Math.random() * 50);
    
    for (let i = 0; i < particleCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 2 + Math.random() * 4;
        const size = 1 + Math.random() * 3;
        const life = 60 + Math.floor(Math.random() * 60);
        
        particles.push({
            x, y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            size,
            life,
            color,
            alpha: 1
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
                particle.vy += 0.1;
                particle.life--;
                particle.size *= 0.97;
                particle.alpha = particle.life / 60;
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
    ctx.save();
    ctx.globalAlpha = particle.alpha;
    
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
    ctx.fillStyle = particle.color;
    ctx.fill();
    
    // 光晕效果
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.size * 2, 0, Math.PI * 2);
    ctx.fillStyle = particle.color + '30';
    ctx.fill();
    
    ctx.restore();
}

// 音效控制
function playClickSound() {
    if (!isSoundEnabled) return;
    
    const sound = document.getElementById('click-sound');
    if (sound) {
        sound.currentTime = 0;
        sound.play().catch(e => console.log('音效播放失败:', e));
    }
}

// 初始化音乐播放器
function initMusicPlayer() {
    const bgm = document.getElementById('bgm');
    if (!bgm) {
        console.error('未找到背景音乐元素');
        return;
    }
    
    bgm.volume = 0.3;
    
    // 检查音乐文件是否加载成功
    bgm.addEventListener('canplaythrough', function() {
        console.log('音乐文件加载成功');
        showMessage('🎵 音乐已准备就绪，点击播放按钮开始播放', 'info');
    });
    
    bgm.addEventListener('error', function(e) {
        console.error('音乐文件加载失败:', e);
        showMessage('❌ 音乐文件加载失败，请检查文件路径', 'error');
    });
    
    // 尝试自动播放，但处理可能的限制
    bgm.play().catch(e => {
        console.log('自动播放失败，需要用户交互:', e);
        // 不显示错误消息，等待用户手动播放
    });
}

function toggleMusic() {
    playClickSound();
    
    const bgm = document.getElementById('bgm');
    const musicBtn = document.getElementById('music-btn');
    
    if (!bgm || !musicBtn) {
        console.error('音乐播放器或按钮未找到');
        showMessage('❌ 音乐播放器初始化失败', 'error');
        return;
    }
    
    // 检查音乐文件是否可用
    if (bgm.error) {
        console.error('音乐文件错误:', bgm.error);
        showMessage('❌ 音乐文件加载失败，请检查文件路径', 'error');
        return;
    }
    
    if (isMusicPlaying) {
        bgm.pause();
        musicBtn.innerHTML = '<i class="fas fa-music"></i>';
        musicBtn.title = '播放音乐';
        showMessage('🎵 音乐已暂停', 'info');
    } else {
        bgm.play().catch(e => {
            console.log('音乐播放失败:', e);
            showMessage('🎵 点击页面任意位置播放音乐', 'info');
            
            // 添加点击页面播放功能
            document.addEventListener('click', function playOnClick() {
                bgm.play().catch(e => console.log('音乐播放失败:', e));
                document.removeEventListener('click', playOnClick);
                showMessage('🎵 音乐开始播放', 'success');
            }, { once: true });
        });
        musicBtn.innerHTML = '<i class="fas fa-pause"></i>';
        musicBtn.title = '暂停音乐';
    }
    
    isMusicPlaying = !isMusicPlaying;
}

function toggleSound() {
    playClickSound();
    
    isSoundEnabled = !isSoundEnabled;
    const soundBtn = document.getElementById('sound-btn');
    
    if (soundBtn) {
        soundBtn.innerHTML = isSoundEnabled ? '<i class="fas fa-volume-up"></i>' : '<i class="fas fa-volume-mute"></i>';
        soundBtn.title = isSoundEnabled ? '关闭音效' : '开启音效';
    }
    
    showMessage(isSoundEnabled ? '🔊 音效已开启' : '🔇 音效已关闭', 'info');
}

function toggleTheme() {
    playClickSound();
    
    const currentTheme = document.body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.body.setAttribute('data-theme', newTheme);
    
    // 保存主题设置
    localStorage.setItem('theme', newTheme);
    
    showMessage(newTheme === 'dark' ? '🌙 切换至暗色主题' : '☀️ 切换至亮色主题', 'info');
}

// 初始化彩蛋
function initEasterEggs() {
    console.log('初始化彩蛋...');
    
    // 加载保存的彩蛋
    const savedEggs = localStorage.getItem('easterEggs');
    if (savedEggs) {
        easterEggsFound = JSON.parse(savedEggs);
    }
    
    // 添加页面点击计数器
    document.addEventListener('click', function(e) {
        if (e.target.tagName !== 'BUTTON' && e.target.tagName !== 'A') {
            clickCount++;
            
            // 彩蛋触发条件
            if (clickCount === 10 && !easterEggsFound.includes('click10')) {
                easterEggsFound.push('click10');
                showEasterEgg('点击10次', '🎉 恭喜发现隐藏彩蛋！继续探索吧～');
            } else if (clickCount === 50 && !easterEggsFound.includes('click50')) {
                easterEggsFound.push('click50');
                showEasterEgg('点击50次', '🌟 你真细心！发现了第二个彩蛋！');
            } else if (clickCount === 100 && !easterEggsFound.includes('click100')) {
                easterEggsFound.push('click100');
                showEasterEgg('点击100次', '💝 终极彩蛋！你太有耐心了！');
            }
            
            // 保存彩蛋进度
            localStorage.setItem('easterEggs', JSON.stringify(easterEggsFound));
        }
    });
    
    // 键盘快捷键
    document.addEventListener('keydown', function(e) {
        // 隐藏快捷键：L + O + V + E
        if (e.key === 'l' || e.key === 'L') {
            setTimeout(() => {
                if (e.key === 'o' || e.key === 'O') {
                    setTimeout(() => {
                        if (e.key === 'v' || e.key === 'V') {
                            setTimeout(() => {
                                if (e.key === 'e' || e.key === 'E') {
                                    if (!easterEggsFound.includes('keyboardLove')) {
                                        easterEggsFound.push('keyboardLove');
                                        showEasterEgg('键盘彩蛋', '💖 你输入了LOVE！真浪漫～');
                                    }
                                }
                            }, 100);
                        }
                    }, 100);
                }
            }, 100);
        }
    });
}

function showEasterEgg(name, message) {
    createFireworks();
    showMessage(message, 'success');
    
    // 特殊效果
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            createFloatingHeart();
        }, i * 100);
    }
}

// 初始化点击效果
function initClickEffects() {
    console.log('初始化点击效果...');
    
    document.addEventListener('click', function(e) {
        // 创建涟漪效果
        createRippleEffect(e.clientX, e.clientY);
        
        // 随机创建小爱心
        if (Math.random() > 0.7) {
            createClickHeart(e.clientX, e.clientY);
        }
    });
}

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

function createClickHeart(x, y) {
    const heart = document.createElement('div');
    heart.innerHTML = '💖';
    heart.style.cssText = `
        position: fixed;
        font-size: 1.5rem;
        pointer-events: none;
        z-index: 100;
        left: ${x - 15}px;
        top: ${y - 15}px;
        animation: clickHeart 1s ease-out forwards;
    `;
    
    document.body.appendChild(heart);
    
    setTimeout(() => {
        if (heart.parentNode) {
            document.body.removeChild(heart);
        }
    }, 1000);
}

// 工具函数
function getRandomColor() {
    const colors = ['#ff6b95', '#ff8eb4', '#ffafbd', '#ffc3a0', '#a1c4fd', '#c2e9fb', '#2ed573', '#7bed9f'];
    return colors[Math.floor(Math.random() * colors.length)];
}

function showMessage(message, type = 'info') {
    const messageBox = document.createElement('div');
    const bgColor = type === 'error' ? '#ff4757' : 
                   type === 'success' ? '#2ed573' : 
                   type === 'warning' ? '#ffa502' : 
                   '#ff6b95';
    
    messageBox.style.cssText = `
        position: fixed;
        top: 90px;
        right: 20px;
        background: ${bgColor};
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 2000;
        animation: messageSlideIn 0.3s ease-out;
        font-family: inherit;
        max-width: 300px;
        word-wrap: break-word;
    `;
    
    messageBox.textContent = message;
    document.body.appendChild(messageBox);
    
    setTimeout(() => {
        messageBox.style.animation = 'messageSlideOut 0.3s ease-out';
        setTimeout(() => {
            if (messageBox.parentNode) {
                document.body.removeChild(messageBox);
            }
        }, 300);
    }, 3000);
}

function createFloatingMessage(message, type = 'info') {
    const floatMsg = document.createElement('div');
    floatMsg.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(255,255,255,0.9);
        color: #ff6b95;
        padding: 20px 30px;
        border-radius: 25px;
        font-size: 1.5rem;
        font-weight: bold;
        box-shadow: 0 10px 30px rgba(255,107,149,0.3);
        z-index: 1000;
        animation: floatMessage 2s ease-out forwards;
        pointer-events: none;
    `;
    
    floatMsg.textContent = message;
    document.body.appendChild(floatMsg);
    
    setTimeout(() => {
        if (floatMsg.parentNode) {
            document.body.removeChild(floatMsg);
        }
    }, 2000);
}

function createHeartExplosion() {
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            createFloatingHeart();
        }, i * 50);
    }
}

function createFloatingHeart() {
    const heart = document.createElement('div');
    heart.innerHTML = '💖';
    heart.style.cssText = `
        position: fixed;
        font-size: 2rem;
        pointer-events: none;
        z-index: 100;
        left: ${Math.random() * 100}%;
        top: 100%;
        animation: heartExplode 2s ease-out forwards;
    `;
    
    document.body.appendChild(heart);
    
    setTimeout(() => {
        if (heart.parentNode) {
            document.body.removeChild(heart);
        }
    }, 2000);
}

function showWelcomeMessage() {
    createFloatingMessage('💖 欢迎来到付益欣的专属世界！', 'welcome');
}

function scrollToTop() {
    playClickSound();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

function logout() {
    playClickSound();
    
    if (confirm('确定要退出登录吗？')) {
        showMessage('👋 再见！期待下次相见～', 'info');
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 2000);
    }
}

// 游戏功能（简化版）
function startMemoryGame() {
    playClickSound();
    showMessage('🧠 记忆翻牌游戏开发中...', 'info');
}

function startLoveQuiz() {
    playClickSound();
    showMessage('❓ 爱情测试游戏开发中...', 'info');
}

function startPuzzleGame() {
    playClickSound();
    showMessage('🧩 拼图游戏开发中...', 'info');
}

// 惊喜功能
function openSurprise(number) {
    playClickSound();
    
    const messages = [
        '🎁 惊喜一：给你一个温暖的拥抱！💝',
        '💝 惊喜二：恭喜完成游戏任务！获得特别奖励！',
        '🌟 惊喜三：终极神秘礼物解锁！你太棒了！'
    ];
    
    showMessage(messages[number - 1], 'success');
    
    // 特殊效果
    if (number === 1) {
        createHeartExplosion();
    } else {
        createFireworks();
        createFallingHearts();
    }
    
    // 播放解锁音效
    playSuccessSound();
    
    // 显示解锁动画
    const surpriseBox = document.getElementById(`surprise-${number}`);
    if (surpriseBox) {
        surpriseBox.style.animation = 'pulse 1s 3';
    }
}

// 检查惊喜是否解锁
function checkSurpriseUnlock(number) {
    playClickSound();
    
    switch(number) {
        case 1:
            // 惊喜一直接解锁
            openSurprise(1);
            break;
            
        case 2:
            // 惊喜二需要完成游戏
            checkGameCompletion();
            break;
            
        case 3:
            // 惊喜三需要发现彩蛋
            checkEasterEggs();
            break;
    }
}

// 检查游戏完成情况
function checkGameCompletion() {
    const gamesCompleted = localStorage.getItem('gamesCompleted') || 0;
    
    if (gamesCompleted >= 1) {
        // 解锁惊喜二
        unlockSurprise(2);
        openSurprise(2);
    } else {
        showMessage('🎮 请先完成任意一个游戏来解锁这个惊喜！', 'info');
        // 引导用户去游戏页面
        setTimeout(() => {
            showMessage('点击导航栏的"🎮 游戏"开始游戏吧！', 'info');
        }, 2000);
    }
}

// 检查彩蛋发现情况
function checkEasterEggs() {
    const easterEggs = JSON.parse(localStorage.getItem('easterEggs') || '[]');
    
    if (easterEggs.length >= 3) {
        // 解锁惊喜三
        unlockSurprise(3);
        openSurprise(3);
    } else {
        showMessage(`🌟 已发现 ${easterEggs.length}/3 个彩蛋，继续探索吧！`, 'info');
        // 提示如何发现彩蛋
        setTimeout(() => {
            showMessage('💡 试试在页面不同地方多点几下，或者输入"LOVE"看看！', 'info');
        }, 2000);
    }
}

// 解锁惊喜
function unlockSurprise(number) {
    const surpriseBox = document.getElementById(`surprise-${number}`);
    if (surpriseBox) {
        surpriseBox.classList.remove('locked');
        surpriseBox.classList.add('unlocked');
        surpriseBox.onclick = () => openSurprise(number);
        
        // 更新图标
        const lockElement = surpriseBox.querySelector('.surprise-lock');
        if (lockElement) {
            lockElement.className = 'surprise-unlock';
            lockElement.textContent = '🎁';
        }
    }
}

// 更新惊喜进度
function updateSurpriseProgress() {
    // 更新惊喜二进度（游戏完成情况）
    const gamesCompleted = localStorage.getItem('gamesCompleted') || 0;
    const progressBar2 = document.getElementById('surprise-2-progress');
    if (progressBar2) {
        progressBar2.style.width = `${Math.min(gamesCompleted * 100, 100)}%`;
    }
    
    // 更新惊喜三进度（彩蛋发现情况）
    const easterEggs = JSON.parse(localStorage.getItem('easterEggs') || '[]');
    const progressBar3 = document.getElementById('surprise-3-progress');
    if (progressBar3) {
        progressBar3.style.width = `${Math.min((easterEggs.length / 3) * 100, 100)}%`;
    }
    
    // 检查是否满足解锁条件
    if (gamesCompleted >= 1) {
        unlockSurprise(2);
    }
    
    if (easterEggs.length >= 3) {
        unlockSurprise(3);
    }
}

// 游戏功能
function startMemoryGame() {
    playClickSound();
    
    const gameArea = document.getElementById('game-area');
    if (!gameArea) return;
    
    gameArea.innerHTML = `
        <div class="memory-game">
            <h3>🧠 记忆翻牌游戏</h3>
            <p>找出所有相同的爱心卡片！</p>
            <div class="memory-grid" id="memory-grid">
                <!-- 卡片将由JavaScript生成 -->
            </div>
            <div class="game-info">
                <span>时间: <span id="game-time">60</span>秒</span>
                <span>分数: <span id="game-score">0</span></span>
                <span>尝试次数: <span id="game-attempts">0</span></span>
            </div>
            <button onclick="resetMemoryGame()" class="game-control-btn">重新开始</button>
            <button onclick="backToGameSelection()" class="game-control-btn">返回</button>
        </div>
    `;
    
    initMemoryGame();
}

function initMemoryGame() {
    const memoryGrid = document.getElementById('memory-grid');
    if (!memoryGrid) return;
    
    // 创建卡片数组（爱心emoji配对）
    const cards = ['💖', '💕', '💗', '💓', '💞', '💝'];
    const cardPairs = [...cards, ...cards];
    
    // 随机排序
    cardPairs.sort(() => Math.random() - 0.5);
    
    // 生成卡片
    memoryGrid.innerHTML = '';
    cardPairs.forEach((emoji, index) => {
        const card = document.createElement('div');
        card.className = 'memory-card';
        card.dataset.emoji = emoji;
        card.dataset.index = index;
        card.innerHTML = '❓';
        
        card.onclick = () => flipCard(card);
        
        memoryGrid.appendChild(card);
    });
    
    // 开始计时
    startGameTimer();
}

function startLoveQuiz() {
    playClickSound();
    
    const gameArea = document.getElementById('game-area');
    if (!gameArea) return;
    
    gameArea.innerHTML = `
        <div class="love-quiz">
            <h3>❓ 爱情测试</h3>
            <div class="quiz-question" id="quiz-question">
                你最喜欢我什么？
            </div>
            <div class="quiz-options" id="quiz-options">
                <!-- 选项将由JavaScript生成 -->
            </div>
            <div class="quiz-result" id="quiz-result" style="display: none;">
                <!-- 结果显示 -->
            </div>
            <button onclick="nextQuestion()" class="game-control-btn" id="next-btn" style="display: none;">下一题</button>
            <button onclick="backToGameSelection()" class="game-control-btn">返回</button>
        </div>
    `;
    
    showLoveQuestion(0);
}

function startPuzzleGame() {
    playClickSound();
    
    const gameArea = document.getElementById('game-area');
    if (!gameArea) return;
    
    gameArea.innerHTML = `
        <div class="puzzle-game">
            <h3>🧩 拼图游戏</h3>
            <p>将照片拼成完整的图片！</p>
            <div class="puzzle-container" id="puzzle-container">
                <!-- 拼图块将由JavaScript生成 -->
            </div>
            <div class="puzzle-controls">
                <button onclick="shufflePuzzle()" class="game-control-btn">重新洗牌</button>
                <button onclick="showPuzzleHint()" class="game-control-btn">提示</button>
                <button onclick="backToGameSelection()" class="game-control-btn">返回</button>
            </div>
            <div class="puzzle-timer">
                用时: <span id="puzzle-time">0</span>秒
            </div>
        </div>
    `;
    
    initPuzzleGame();
}

// 记忆翻牌游戏逻辑
let flippedCards = [];
let matchedPairs = 0;
let gameTimer = null;
let timeLeft = 60;

function flipCard(card) {
    if (flippedCards.length >= 2 || card.classList.contains('flipped') || card.classList.contains('matched')) {
        return;
    }
    
    card.classList.add('flipped');
    card.innerHTML = card.dataset.emoji;
    flippedCards.push(card);
    
    if (flippedCards.length === 2) {
        checkForMatch();
    }
}

function checkForMatch() {
    const [card1, card2] = flippedCards;
    
    if (card1.dataset.emoji === card2.dataset.emoji) {
        // 匹配成功
        card1.classList.add('matched');
        card2.classList.add('matched');
        matchedPairs++;
        
        // 更新分数
        updateGameScore(10);
        
        // 检查游戏是否完成
        if (matchedPairs === 6) {
            gameComplete();
        }
    } else {
        // 匹配失败
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            card1.innerHTML = '❓';
            card2.innerHTML = '❓';
        }, 1000);
    }
    
    // 更新尝试次数
    updateAttempts();
    flippedCards = [];
}

function startGameTimer() {
    timeLeft = 60;
    matchedPairs = 0;
    flippedCards = [];
    
    if (gameTimer) {
        clearInterval(gameTimer);
    }
    
    gameTimer = setInterval(() => {
        timeLeft--;
        document.getElementById('game-time').textContent = timeLeft;
        
        if (timeLeft <= 0) {
            gameOver();
        }
    }, 1000);
}

function gameOver() {
    clearInterval(gameTimer);
    showMessage('⏰ 时间到！游戏结束', 'error');
}

function gameComplete() {
    clearInterval(gameTimer);
    showMessage('🎉 恭喜！你完成了记忆翻牌游戏！', 'success');
    createFireworks();
}

function updateGameScore(points) {
    const scoreElement = document.getElementById('game-score');
    if (scoreElement) {
        let currentScore = parseInt(scoreElement.textContent) || 0;
        scoreElement.textContent = currentScore + points;
    }
}

function updateAttempts() {
    const attemptsElement = document.getElementById('game-attempts');
    if (attemptsElement) {
        let currentAttempts = parseInt(attemptsElement.textContent) || 0;
        attemptsElement.textContent = currentAttempts + 1;
    }
}

function resetMemoryGame() {
    const memoryGrid = document.getElementById('memory-grid');
    if (memoryGrid) {
        memoryGrid.innerHTML = '';
        initMemoryGame();
    }
}

// 爱情测试逻辑
const loveQuizQuestions = [
    {
        question: "你最喜欢我什么？",
        options: ["温柔的性格", "美丽的笑容", "聪明的头脑", "全部都喜欢"],
        correct: 3
    },
    {
        question: "我们第一次见面是什么时候？",
        options: ["昨天", "上周", "上个月", "命中注定的那一刻"],
        correct: 3
    },
    {
        question: "你最想和我一起做什么？",
        options: ["看电影", "旅行", "吃美食", "只要在一起什么都好"],
        correct: 3
    }
];

let currentQuestionIndex = 0;
let quizScore = 0;

function showLoveQuestion(index) {
    const questionElement = document.getElementById('quiz-question');
    const optionsElement = document.getElementById('quiz-options');
    const resultElement = document.getElementById('quiz-result');
    const nextButton = document.getElementById('next-btn');
    
    if (index >= loveQuizQuestions.length) {
        // 显示最终结果
        showQuizResult();
        return;
    }
    
    const question = loveQuizQuestions[index];
    
    questionElement.textContent = question.question;
    optionsElement.innerHTML = '';
    
    question.options.forEach((option, optionIndex) => {
        const optionButton = document.createElement('button');
        optionButton.className = 'quiz-option';
        optionButton.textContent = option;
        optionButton.onclick = () => selectAnswer(optionIndex, question.correct);
        optionsElement.appendChild(optionButton);
    });
    
    resultElement.style.display = 'none';
    nextButton.style.display = 'none';
    currentQuestionIndex = index;
}

function selectAnswer(selected, correct) {
    const options = document.querySelectorAll('.quiz-option');
    const resultElement = document.getElementById('quiz-result');
    const nextButton = document.getElementById('next-btn');
    
    options.forEach((option, index) => {
        option.disabled = true;
        if (index === correct) {
            option.style.background = '#2ed573';
        } else if (index === selected) {
            option.style.background = selected === correct ? '#2ed573' : '#ff4757';
        }
    });
    
    if (selected === correct) {
        quizScore++;
        resultElement.innerHTML = '<p style="color: #2ed573;">💖 回答正确！你真了解我！</p>';
    } else {
        resultElement.innerHTML = '<p style="color: #ff4757;">💔 没关系，继续加油！</p>';
    }
    
    resultElement.style.display = 'block';
    nextButton.style.display = 'block';
}

function nextQuestion() {
    showLoveQuestion(currentQuestionIndex + 1);
}

function showQuizResult() {
    const gameArea = document.getElementById('game-area');
    if (!gameArea) return;
    
    const percentage = Math.round((quizScore / loveQuizQuestions.length) * 100);
    let message = '';
    
    if (percentage >= 80) {
        message = '💖 完美！你真是太了解我了！';
    } else if (percentage >= 60) {
        message = '💕 不错哦！我们还需要更多了解～';
    } else {
        message = '💝 加油！让我们更了解彼此吧！';
    }
    
    gameArea.innerHTML = `
        <div class="quiz-result-page">
            <h3>❓ 爱情测试结果</h3>
            <div class="result-score">
                <div class="score-circle">${percentage}%</div>
                <p>${message}</p>
            </div>
            <p>正确回答: ${quizScore}/${loveQuizQuestions.length}</p>
            <button onclick="resetLoveQuiz()" class="game-control-btn">重新测试</button>
            <button onclick="backToGameSelection()" class="game-control-btn">返回</button>
        </div>
    `;
    
    createFireworks();
}

function resetLoveQuiz() {
    quizScore = 0;
    currentQuestionIndex = 0;
    startLoveQuiz();
}

// 拼图游戏逻辑
function initPuzzleGame() {
    const puzzleContainer = document.getElementById('puzzle-container');
    if (!puzzleContainer) return;
    
    // 创建3x3拼图
    puzzleContainer.innerHTML = `
        <div class="puzzle-pieces">
            ${Array(9).fill().map((_, i) => 
                `<div class="puzzle-piece" draggable="true" data-index="${i}">${i + 1}</div>`
            ).join('')}
        </div>
        <div class="puzzle-board"></div>
    `;
    
    setupPuzzleDragAndDrop();
    startPuzzleTimer();
}

function setupPuzzleDragAndDrop() {
    const pieces = document.querySelectorAll('.puzzle-piece');
    const board = document.querySelector('.puzzle-board');
    
    pieces.forEach(piece => {
        piece.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', piece.dataset.index);
        });
    });
    
    board.addEventListener('dragover', (e) => {
        e.preventDefault();
    });
    
    board.addEventListener('drop', (e) => {
        e.preventDefault();
        const pieceIndex = e.dataTransfer.getData('text/plain');
        const piece = document.querySelector(`[data-index="${pieceIndex}"]`);
        
        if (piece && !piece.parentNode.classList.contains('puzzle-board')) {
            board.appendChild(piece);
            checkPuzzleComplete();
        }
    });
}

function checkPuzzleComplete() {
    const board = document.querySelector('.puzzle-board');
    const pieces = board.querySelectorAll('.puzzle-piece');
    
    if (pieces.length === 9) {
        showMessage('🎉 拼图完成！你太棒了！', 'success');
        createFireworks();
        clearInterval(puzzleTimer);
    }
}

function shufflePuzzle() {
    const piecesContainer = document.querySelector('.puzzle-pieces');
    const board = document.querySelector('.puzzle-board');
    
    // 将所有拼图块移回容器
    const pieces = document.querySelectorAll('.puzzle-piece');
    pieces.forEach(piece => {
        piecesContainer.appendChild(piece);
    });
    
    // 随机排序
    const piecesArray = Array.from(pieces);
    piecesArray.sort(() => Math.random() - 0.5);
    
    piecesContainer.innerHTML = '';
    piecesArray.forEach(piece => {
        piecesContainer.appendChild(piece);
    });
    
    showMessage('🔀 拼图已重新洗牌', 'info');
}

function showPuzzleHint() {
    showMessage('💡 提示：尝试按照数字顺序拼图', 'info');
}

let puzzleTimer = null;
let puzzleTime = 0;

function startPuzzleTimer() {
    puzzleTime = 0;
    
    if (puzzleTimer) {
        clearInterval(puzzleTimer);
    }
    
    puzzleTimer = setInterval(() => {
        puzzleTime++;
        document.getElementById('puzzle-time').textContent = puzzleTime;
    }, 1000);
}

// 通用游戏功能
function backToGameSelection() {
    const gameArea = document.getElementById('game-area');
    if (!gameArea) return;
    
    gameArea.innerHTML = `
        <div class="game-welcome">
            <h3>选择一个小游戏开始吧！</h3>
            <p>每个游戏都有特别的奖励哦～</p>
        </div>
    `;
}

// 下载和分享功能
function downloadPhoto() {
    playClickSound();
    
    // 创建下载链接
    const link = document.createElement('a');
    link.href = photos[currentPhotoIndex];
    link.download = `付益欣的照片_${currentPhotoIndex + 1}.jpg`;
    link.click();
    
    showMessage('📥 照片下载完成！', 'success');
}

function sharePhoto() {
    playClickSound();
    
    // 检查是否支持Web Share API
    if (navigator.share) {
        navigator.share({
            title: '分享美好的回忆',
            text: `看看这张美好的照片：${photoDescriptions[currentPhotoIndex]}`,
            url: window.location.href
        }).then(() => {
            showMessage('📤 分享成功！', 'success');
        }).catch(() => {
            showMessage('📤 分享已取消', 'info');
        });
    } else {
        // 如果不支持Web Share API，显示分享链接
        showMessage('📤 复制链接分享给朋友吧！', 'info');
        navigator.clipboard.writeText(window.location.href).then(() => {
            showMessage('🔗 链接已复制到剪贴板', 'success');
        });
    }
}

// 添加CSS动画
const style = document.createElement('style');
style.textContent = `
    @keyframes messageSlideIn {
        from {
            opacity: 0;
            transform: translateX(100%);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes messageSlideOut {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100%);
        }
    }
    
    @keyframes floatMessage {
        0% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.5);
        }
        50% {
            opacity: 1;
            transform: translate(-50%, -60%) scale(1.1);
        }
        100% {
            opacity: 0;
            transform: translate(-50%, -70%) scale(0.8);
        }
    }
    
    @keyframes heartExplode {
        0% {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
        100% {
            opacity: 0;
            transform: translateY(-100px) scale(0);
        }
    }
    
    @keyframes clickHeart {
        0% {
            opacity: 1;
            transform: scale(1);
        }
        100% {
            opacity: 0;
            transform: scale(2) translateY(-50px);
        }
    }
    
    @keyframes rippleEffect {
        0% {
            transform: scale(1);
            opacity: 1;
        }
        100% {
            transform: scale(10);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// 加载保存的主题
window.addEventListener('load', function() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.body.setAttribute('data-theme', savedTheme);
    }
    
    // 隐藏加载动画
    const loading = document.getElementById('loading');
    if (loading) {
        setTimeout(() => {
            loading.classList.remove('show');
        }, 1000);
    }
});

// ==================== 管理员功能 ====================

// 检查用户类型并初始化管理员功能
function checkUserTypeAndInitAdmin() {
    console.log('检查用户类型...');
    const userType = localStorage.getItem('userType');
    console.log('当前用户类型:', userType);
    
    if (userType === 'admin') {
        console.log('检测到管理员用户，初始化管理员功能...');
        
        // 立即显示管理员功能，不需要延迟
        setTimeout(() => {
            showAdminHelpButton();
            addAdminNavigation();
            
            // 显示管理员欢迎消息
            showMessage('🛠️ 欢迎管理员！您可以使用管理员专属功能', 'success');
            
            // 调试信息
            console.log('管理员功能初始化完成');
            console.log('管理员帮助按钮状态:', document.getElementById('admin-help-btn')?.style.display);
            console.log('管理员导航项数量:', document.querySelectorAll('.nav-link[href="#admin-help"]').length);
        }, 100);
    } else {
        console.log('普通用户，无需显示管理员功能');
    }
}

// 显示管理员帮助按钮
function showAdminHelpButton() {
    console.log('显示管理员帮助按钮...');
    const adminHelpBtn = document.getElementById('admin-help-btn');
    
    if (adminHelpBtn) {
        console.log('找到管理员帮助按钮，显示并设置样式...');
        
        // 确保按钮完全可见
        adminHelpBtn.style.display = 'flex';
        adminHelpBtn.style.visibility = 'visible';
        adminHelpBtn.style.opacity = '1';
        
        // 添加管理员专属样式
        adminHelpBtn.style.background = 'linear-gradient(135deg, #4834d4, #686de0)';
        adminHelpBtn.style.border = '2px solid #7d5fff';
        adminHelpBtn.style.boxShadow = '0 0 15px rgba(72, 52, 212, 0.5)';
        adminHelpBtn.style.zIndex = '1000';
        
        console.log('管理员帮助按钮样式设置完成');
    } else {
        console.error('未找到管理员帮助按钮，ID: admin-help-btn');
    }
}

// 添加管理员专属导航
function addAdminNavigation() {
    console.log('添加管理员专属导航...');
    const navMenu = document.getElementById('nav-menu');
    
    if (navMenu) {
        console.log('找到导航菜单，准备添加管理员导航项...');
        
        // 先移除可能已存在的管理员导航项
        const existingAdminNav = document.querySelector('.nav-link[href="#admin-help"]');
        if (existingAdminNav) {
            existingAdminNav.remove();
            console.log('已移除旧的管理员导航项');
        }
        
        // 创建新的管理员导航项
        const adminNavItem = document.createElement('a');
        adminNavItem.href = '#admin-help';
        adminNavItem.className = 'nav-link';
        adminNavItem.innerHTML = '🛠️ 使用帮助';
        adminNavItem.onclick = function() {
            switchSection('admin-help');
        };
        
        // 插入到导航菜单中（在"惊喜"链接之前）
        const surpriseLink = document.querySelector('.nav-link[href="#surprise"]');
        if (surpriseLink) {
            navMenu.insertBefore(adminNavItem, surpriseLink);
            console.log('管理员导航项插入到惊喜链接之前');
        } else {
            // 如果找不到惊喜链接，添加到末尾
            navMenu.appendChild(adminNavItem);
            console.log('管理员导航项添加到末尾');
        }
        
        console.log('管理员导航项添加完成，当前导航项数量:', navMenu.children.length);
    } else {
        console.error('未找到导航菜单，ID: nav-menu');
    }
}

// 显示管理员帮助页面
function showAdminHelp() {
    playClickSound();
    
    console.log('显示管理员帮助页面...');
    
    // 检查管理员帮助页面是否存在
    const adminHelpSection = document.getElementById('admin-help');
    if (!adminHelpSection) {
        console.error('未找到管理员帮助页面，ID: admin-help');
        showMessage('❌ 管理员帮助页面未找到，请刷新页面重试', 'error');
        return;
    }
    
    console.log('找到管理员帮助页面，准备切换...');
    
    // 切换到管理员帮助页面
    switchSection('admin-help');
    
    // 显示管理员专属特效
    createAdminWelcomeEffect();
    
    // 确保页面内容正确显示
    setTimeout(() => {
        const adminHelpContent = document.querySelector('.admin-help-container');
        if (adminHelpContent) {
            console.log('管理员帮助内容已加载');
            adminHelpContent.style.opacity = '1';
            adminHelpContent.style.transform = 'translateY(0)';
        }
    }, 100);
}

// 管理员欢迎特效
function createAdminWelcomeEffect() {
    // 创建管理员专属烟花
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            createAdminFirework();
        }, i * 200);
    }
    
    // 显示欢迎消息
    createFloatingMessage('🛠️ 管理员功能已开启', 'admin');
}

// 管理员专属烟花效果
function createAdminFirework() {
    const canvas = document.getElementById('fireworks');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const x = Math.random() * canvas.width;
    const y = canvas.height;
    
    const colors = ['#4834d4', '#686de0', '#be2edd', '#e056fd', '#7d5fff'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    // 创建星星形状的烟花粒子
    const particles = [];
    const particleCount = 60 + Math.floor(Math.random() * 40);
    
    for (let i = 0; i < particleCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 3 + Math.random() * 4;
        const size = 2 + Math.random() * 3;
        
        particles.push({
            x, y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            size,
            life: 80 + Math.floor(Math.random() * 60),
            color,
            alpha: 1
        });
    }
    
    const explodeInterval = setInterval(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        let allDead = true;
        
        for (let i = particles.length - 1; i >= 0; i--) {
            const particle = particles[i];
            
            if (particle.life > 0) {
                allDead = false;
                
                // 绘制星星形状的粒子
                ctx.save();
                ctx.globalAlpha = particle.alpha;
                ctx.translate(particle.x, particle.y);
                
                // 绘制五角星
                ctx.beginPath();
                for (let j = 0; j < 5; j++) {
                    const angle = (j * 2 * Math.PI / 5) - Math.PI / 2;
                    const x = Math.cos(angle) * particle.size;
                    const y = Math.sin(angle) * particle.size;
                    
                    if (j === 0) {
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
                
                // 更新粒子状态
                particle.x += particle.vx;
                particle.y += particle.vy;
                particle.vy += 0.05;
                particle.life--;
                particle.alpha = particle.life / 80;
            } else {
                particles.splice(i, 1);
            }
        }
        
        if (allDead) {
            clearInterval(explodeInterval);
        }
    }, 16);
}

// 导出用户数据功能
function exportUserData() {
    playClickSound();
    
    const userData = {
        exportTime: new Date().toISOString(),
        userType: localStorage.getItem('userType') || 'user',
        theme: localStorage.getItem('theme') || 'light',
        easterEggsFound: JSON.parse(localStorage.getItem('easterEggs') || '[]'),
        clickCount: clickCount,
        lastLogin: new Date().toLocaleString('zh-CN')
    };
    
    // 创建下载链接
    const dataStr = JSON.stringify(userData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `user_data_${new Date().getTime()}.json`;
    link.click();
    
    // 清理URL
    setTimeout(() => {
        URL.revokeObjectURL(url);
    }, 1000);
    
    showMessage('📊 用户数据导出完成！', 'success');
}

// 重置游戏进度功能
function resetAllGames() {
    playClickSound();
    
    if (confirm('确定要重置所有游戏进度吗？此操作不可撤销！')) {
        // 重置游戏相关数据
        clickCount = 0;
        easterEggsFound = [];
        
        // 清除本地存储的游戏数据
        localStorage.removeItem('easterEggs');
        
        showMessage('🔄 所有游戏进度已重置！', 'success');
        
        // 刷新页面以应用重置
        setTimeout(() => {
            location.reload();
        }, 2000);
    }
}

// 显示系统信息功能
function showSystemInfo() {
    playClickSound();
    
    const systemInfo = {
        '浏览器信息': navigator.userAgent,
        '语言设置': navigator.language,
        '在线状态': navigator.onLine ? '在线' : '离线',
        '屏幕分辨率': `${screen.width} x ${screen.height}`,
        '视口大小': `${window.innerWidth} x ${window.innerHeight}`,
        '设备内存': navigator.deviceMemory ? `${navigator.deviceMemory}GB` : '未知',
        '并发线程数': navigator.hardwareConcurrency || '未知',
        '平台信息': navigator.platform,
        'Cookie启用': navigator.cookieEnabled ? '是' : '否',
        '本地存储': localStorage.length + ' 个项目',
        '会话存储': sessionStorage.length + ' 个项目'
    };
    
    let infoText = '🖥️ 系统信息\n\n';
    for (const [key, value] of Object.entries(systemInfo)) {
        infoText += `${key}: ${value}\n`;
    }
    
    // 显示模态框
    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modal-body');
    
    if (modal && modalBody) {
        modalBody.innerHTML = `
            <div style="padding: 20px;">
                <h3 style="color: #4834d4; margin-bottom: 20px;">🖥️ 系统信息</h3>
                <div style="background: #f8f9fa; padding: 15px; border-radius: 10px; font-family: monospace; font-size: 0.9rem; line-height: 1.5;">
                    ${Object.entries(systemInfo).map(([key, value]) => 
                        `<div style="margin-bottom: 8px;"><strong>${key}:</strong> ${value}</div>`
                    ).join('')}
                </div>
                <button onclick="closeModal()" style="margin-top: 20px; background: #4834d4; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer;">关闭</button>
            </div>
        `;
        
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

// 管理员专属CSS样式
const adminStyle = document.createElement('style');
adminStyle.textContent = `
    .admin-help-btn {
        animation: adminPulse 2s infinite;
    }
    
    @keyframes adminPulse {
        0% {
            box-shadow: 0 0 15px rgba(72, 52, 212, 0.5);
        }
        50% {
            box-shadow: 0 0 25px rgba(72, 52, 212, 0.8);
        }
        100% {
            box-shadow: 0 0 15px rgba(72, 52, 212, 0.5);
        }
    }
    
    .admin-card {
        background: linear-gradient(135deg, rgba(72, 52, 212, 0.1), rgba(104, 109, 224, 0.1));
        border: 2px solid rgba(72, 52, 212, 0.3);
        border-radius: 15px;
        padding: 20px;
        margin: 15px 0;
        transition: all 0.3s ease;
    }
    
    .admin-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 30px rgba(72, 52, 212, 0.2);
    }
    
    .admin-action-btn {
        background: linear-gradient(135deg, #4834d4, #686de0);
        color: white;
        border: none;
        padding: 12px 24px;
        border-radius: 25px;
        cursor: pointer;
        margin: 0 10px;
        transition: all 0.3s ease;
        font-size: 1rem;
    }
    
    .admin-action-btn:hover {
        transform: scale(1.05);
        box-shadow: 0 5px 15px rgba(72, 52, 212, 0.4);
    }
`;
document.head.appendChild(adminStyle);

console.log('JavaScript代码加载完成！');
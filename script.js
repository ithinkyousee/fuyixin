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
    
    // 自动播放音乐
    setTimeout(() => {
        toggleMusic();
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
    
    // 模拟录音功能
    showMessage('🎤 录音功能准备中...（模拟）', 'info');
    
    setTimeout(() => {
        showMessage('💝 录音完成！已保存到你的心里～', 'success');
    }, 2000);
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

function toggleMusic() {
    playClickSound();
    
    const bgm = document.getElementById('bgm');
    const musicBtn = document.getElementById('music-btn');
    
    if (!bgm || !musicBtn) return;
    
    if (isMusicPlaying) {
        bgm.pause();
        musicBtn.innerHTML = '<i class="fas fa-music"></i>';
        musicBtn.title = '播放音乐';
    } else {
        bgm.play().catch(e => {
            console.log('音乐播放失败:', e);
            showMessage('🎵 点击页面任意位置播放音乐', 'info');
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
        '🎁 惊喜一：给你一个温暖的拥抱！',
        '💝 惊喜二：完成小任务后解锁更多内容！',
        '🌟 惊喜三：终极神秘礼物需要更多探索！'
    ];
    
    showMessage(messages[number - 1], 'success');
    
    // 特殊效果
    if (number === 1) {
        createHeartExplosion();
    }
}

// 下载和分享功能（模拟）
function downloadPhoto() {
    playClickSound();
    showMessage('📥 下载功能模拟中...', 'info');
}

function sharePhoto() {
    playClickSound();
    showMessage('📤 分享功能模拟中...', 'info');
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

console.log('JavaScript代码加载完成！');
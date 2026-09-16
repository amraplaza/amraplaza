// @ts-nocheck

// ============ تبديل الوضع الليلي/النهاري ============
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

const savedTheme = localStorage.getItem('theme') || 'light';
if (savedTheme === 'dark') {
    html.setAttribute('data-theme', 'dark');
} else {
    html.removeAttribute('data-theme');
}

themeToggle.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    if (current === 'dark') {
        html.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
    } else {
        html.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    }
});

// ============ قائمة الجوال ============
const menuBtn = document.getElementById('menuBtn');
const navMenu = document.getElementById('navMenu');

menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('active');
    navMenu.classList.toggle('open');
    document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : '';
});

navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        menuBtn.classList.remove('active');
        navMenu.classList.remove('open');
        document.body.style.overflow = '';
    });
});

// ============ تأثير الهيدر ============
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// ============ ظهور العناصر ============
const revealTargets = document.querySelectorAll(
    '.feature-box, .room-card, .service-box, .info-item, .booking-form, .about-image'
);

revealTargets.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });

revealTargets.forEach(el => revealObserver.observe(el));

// ============ معرض صور الغرف ============
function initRoomGallery(galleryId, autoPlayInterval) {
    if (autoPlayInterval === undefined) autoPlayInterval = 3000;
    
    const gallery = document.getElementById(galleryId);
    if (!gallery) return;

    const slides = gallery.querySelectorAll('.gallery-slide');
    const prevBtn = gallery.querySelector('.gallery-arrow.prev');
    const nextBtn = gallery.querySelector('.gallery-arrow.next');
    const dotsContainer = gallery.querySelector('.gallery-dots');
    
    if (slides.length <= 1) return;

    let currentIndex = 0;
    let autoPlayTimer = null;
    let isPaused = false;

    // إنشاء النقاط
    slides.forEach((slide, i) => {
        const dot = document.createElement('div');
        dot.classList.add('gallery-dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', (e) => {
            e.stopPropagation();
            goToSlide(i);
        });
        dotsContainer.appendChild(dot);
    });

    const dots = dotsContainer.querySelectorAll('.gallery-dot');

    function goToSlide(index) {
        slides[currentIndex].classList.remove('active');
        dots[currentIndex].classList.remove('active');
        
        currentIndex = (index + slides.length) % slides.length;
        
        slides[currentIndex].classList.add('active');
        dots[currentIndex].classList.add('active');
        
        resetAutoPlay();
    }

    function nextSlide() { goToSlide(currentIndex + 1); }
    function prevSlide() { goToSlide(currentIndex - 1); }

    function startAutoPlay() {
        if (autoPlayTimer) clearInterval(autoPlayTimer);
        autoPlayTimer = setInterval(() => {
            if (!isPaused) nextSlide();
        }, autoPlayInterval);
    }

    function resetAutoPlay() {
        if (autoPlayTimer) clearInterval(autoPlayTimer);
        startAutoPlay();
    }

    // أزرار التنقل
    nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        nextSlide();
    });

    prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        prevSlide();
    });

    // إيقاف مؤقت عند مرور الماوس
    gallery.addEventListener('mouseenter', () => { isPaused = true; });
    gallery.addEventListener('mouseleave', () => {
        isPaused = false;
        resetAutoPlay();
    });

    // دعم اللمس
    let touchStartX = 0;
    let touchEndX = 0;

    gallery.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        isPaused = true;
    }, { passive: true });

    gallery.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;
        const threshold = 50;
        
        if (Math.abs(diff) > threshold) {
            if (diff > 0) nextSlide();
            else prevSlide();
        }
        
        isPaused = false;
        resetAutoPlay();
    }, { passive: true });

    // بدء التشغيل التلقائي
    startAutoPlay();
}

// تهيئة المعارض
document.addEventListener('DOMContentLoaded', () => {
    initRoomGallery('gallery-double', 3000);
    initRoomGallery('gallery-family', 3000);
    initRoomGallery('gallery-quad', 3000);
});

// ============ نموذج الحجز ============
const bookingForm = document.getElementById('bookingForm');

bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(bookingForm);
    const data = Object.fromEntries(formData.entries());
    
    if (!data.name || !data.phone || !data.date) {
        alert('يرجى ملء الحقول المطلوبة');
        return;
    }
    
    const roomText = data.room === 'double' ? 'استوديو مزدوج فاخر' 
                    : data.room === 'family' ? 'استوديو عائلي 70م²' 
                    : data.room === 'quad' ? 'استوديو رباعي' 
                    : 'غير محدد';
    
    const message = `🌟 طلب حجز جديد - فندق الأمراء بلازا

👤 الاسم: ${data.name}
📞 الهاتف: ${data.phone}
${data.email ? `📧 الإيميل: ${data.email}` : ''}
📅 تاريخ الوصول: ${data.date}
🛏️ نوع الغرفة: ${roomText}
${data.notes ? `📝 ملاحظات: ${data.notes}` : ''}

أرجو تأكيد الحجز.`;

    const whatsappURL = `https://wa.me/962776767619?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappURL, '_blank');
    bookingForm.reset();
});

// ============ الروابط النشطة ============
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-menu a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});
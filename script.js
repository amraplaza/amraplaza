// @ts-nocheck

// ============ Header Scroll ============
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// ============ Mobile Menu ============
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

// ============ Fade Up on Scroll ============
const revealTargets = document.querySelectorAll(
    '.stat, .room, .service-item, .landmark, .time-item, .contact-block, .booking-form, .location-card'
);

revealTargets.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(40px)';
    el.style.transition = 'opacity 0.9s ease, transform 0.9s ease';
});

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, i * 60);
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

revealTargets.forEach(el => revealObserver.observe(el));

// ============ Gallery ============
const galleryObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('active');
            }, 50);
            galleryObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.gallery-item').forEach(item => galleryObserver.observe(item));

// ============ Show More ============
const showMoreBtn = document.getElementById('showMoreBtn');
const hiddenItems = document.querySelectorAll('.gallery-item.hidden');
let allVisible = false;

showMoreBtn.addEventListener('click', () => {
    if (!allVisible) {
        hiddenItems.forEach((item, i) => {
            item.classList.remove('hidden');
            setTimeout(() => item.classList.add('active'), i * 40);
        });
        showMoreBtn.textContent = 'عرض أقل ↑';
        allVisible = true;
    } else {
        hiddenItems.forEach(item => {
            item.classList.add('hidden');
            item.classList.remove('active');
        });
        showMoreBtn.textContent = 'عرض المزيد من الصور ←';
        allVisible = false;
        document.getElementById('gallery').scrollIntoView({ behavior: 'smooth' });
    }
});

// ============ Rooms Data ============
const roomsData = {
    double: {
        tag: 'غرفة مزدوجة',
        title: 'غرفة مزدوجة فاخرة',
        available: true,
        desc: 'مساحة أنيقة وهادئة صُممت بعناية لشخصين. سرير كبير مريح، تكييف، تلفزيون ذكي، وحمام حديث بكامل المستلزمات. مثالية للرحلة الثنائية أو رحلة العمل.',
        price: '51$',
        images: [
            'room-twin-divider.jpg',
            'room-twin-mirror.jpg',
            'room-wardrobe.jpg',
            'bathroom-hair.jpg',
            'bathroom.jpg',
            'shower.jpg',
            'toiletries.jpg',
            'door-109.jpg',
            'safe-robe.jpg'
        ],
        features: [
            'سرير كبير (King Size)',
            'تكييف مركزي',
            'تلفزيون ذكي بشاشة مسطحة',
            'واي فاي مجاني عالي السرعة',
            'حمام خاص حديث',
            'خزانة ملابس واسعة',
            'خزنة إلكترونية آمنة',
            'روب حمام ومستلزمات فاخرة',
            'قفل إلكتروني للباب',
            'منطقة عمل ومكتب',
            'منبه وإضاءة قابلة للتعديل',
            'خدمة الغرف 24 ساعة'
        ],
        specs: [
            { label: 'المساحة', value: '35 م²' },
            { label: 'السرير', value: '1 كبير' },
            { label: 'تتسع لـ', value: 'شخصان' },
            { label: 'الإطلالة', value: 'المدينة' },
            { label: 'الطابق', value: 'متعدد' },
            { label: 'الحمام', value: 'خاص' }
        ]
    },
    twin: {
        tag: 'غرفة مزدوجة',
        title: 'غرفة بسريرين فرديين',
        available: true,
        desc: 'خيار مثالي للأصدقاء أو الزملاء في السفر. سريران فرديان مريحان، تصميم عصري، وكل وسائل الراحة العصرية في مساحة مدروسة.',
        price: '51$',
        images: [
            'room-twin-mirror.jpg',
            'room-twin-divider.jpg',
            'room-twin-phone.jpg',
            'room-wardrobe.jpg',
            'bathroom.jpg',
            'bathroom-hair.jpg',
            'shower.jpg',
            'toiletries.jpg',
            'safe-robe.jpg'
        ],
        features: [
            'سريران فرديان مريحان',
            'تكييف مركزي',
            'تلفزيون ذكي بشاشة مسطحة',
            'واي فاي مجاني عالي السرعة',
            'حمام خاص حديث',
            'خزانة ملابس واسعة',
            'خزنة إلكترونية آمنة',
            'روب حمام ومستلزمات فاخرة',
            'قفل إلكتروني للباب',
            'هاتف داخلي',
            'إضاءة قابلة للتعديل',
            'خدمة الغرف 24 ساعة'
        ],
        specs: [
            { label: 'المساحة', value: '35 م²' },
            { label: 'السرير', value: 'سريران' },
            { label: 'تتسع لـ', value: 'شخصان' },
            { label: 'الإطلالة', value: 'المدينة' },
            { label: 'الطابق', value: 'متعدد' },
            { label: 'الحمام', value: 'خاص' }
        ]
    },
    family: {
        tag: 'غرفة عائلية',
        title: 'غرفة عائلية',
        available: true,
        desc: 'مساحة واسعة تتسع لـ 4 أشخاص، مع سرير كبير وسريران فرديان. مثالية للعائلات الصغيرة الباحثة عن الراحة والخصوصية.',
        price: '67$',
        images: [
            'room-king-bed.jpg',
            'room-king.jpg',
            'room-modern.jpg',
            'room-wardrobe.jpg',
            'tv-smart.jpg',
            'bathroom.jpg',
            'bathroom-hair.jpg',
            'shower.jpg',
            'toiletries.jpg'
        ],
        features: [
            'سرير كبير + سريران فرديان',
            'تكييف مركزي',
            'تلفزيون ذكي بشاشة مسطحة',
            'واي فاي مجاني عالي السرعة',
            'حمام خاص واسع',
            'خزانة ملابس كبيرة',
            'خزنة إلكترونية آمنة',
            'روب حمام ومستلزمات فاخرة',
            'قفل إلكتروني للباب',
            'هاتف داخلي',
            'إضاءة قابلة للتعديل',
            'خدمة الغرف 24 ساعة'
        ],
        specs: [
            { label: 'المساحة', value: '45 م²' },
            { label: 'الأسرّة', value: '1 + 2' },
            { label: 'تتسع لـ', value: '4 أشخاص' },
            { label: 'الإطلالة', value: 'المدينة' },
            { label: 'الطابق', value: 'متعدد' },
            { label: 'الحمام', value: 'خاص' }
        ]
    },
    'family-studio': {
        tag: 'استوديو عائلي',
        title: 'استوديو عائلي 70م²',
        available: true,
        desc: 'جناح واسع برحابة مدروسة لعائلة أو مجموعة. يتسع حتى 6 أشخاص مع صالة جلوس منفصلة، غرفة نوم مستقلة، مطبخ مجهّز بالكامل، وغسالة.',
        price: '85$',
        images: [
            'suite-living.jpg',
            'suite-tv.jpg',
            'suite-corner.jpg',
            'living-room.jpg',
            'curtain-gold.jpg',
            'room-king-bed.jpg',
            'kitchen.jpg',
            'tv-smart.jpg',
            'bathroom.jpg',
            'shower.jpg',
            'toiletries.jpg',
            'room-wardrobe.jpg'
        ],
        features: [
            'مساحة واسعة 70م²',
            '3 غرف نوم',
            'صالة جلوس منفصلة',
            'مطبخ مجهّز بالكامل',
            'غسالة ملابس',
            'تكييف مركزي',
            'تلفزيون ذكي بشاشة مسطحة',
            'واي فاي مجاني عالي السرعة',
            'حمام حديث واسع',
            'خزنة إلكترونية',
            'روب حمام ومستلزمات فاخرة',
            'غرفة طعام',
            'جلسة عائلية أنيقة',
            'خدمة الغرف 24 ساعة'
        ],
        specs: [
            { label: 'المساحة', value: '70 م²' },
            { label: 'الأسرّة', value: '6 أسرّة' },
            { label: 'تتسع لـ', value: '6 أشخاص' },
            { label: 'الغرف', value: '3 غرف' },
            { label: 'المطبخ', value: 'مجهّز' },
            { label: 'الطابق', value: 'متعدد' }
        ]
    },
    quad: {
        tag: 'غرفة رباعية',
        title: 'غرفة رباعية',
        available: false,
        desc: 'أربعة أسرّة فردية في مساحة عصرية مدروسة، مثالية للأصدقاء أو العائلات. تصميم أنيق وكل وسائل الراحة العصرية. (غير متوفرة حاليًا — يمكن الاستفسار عند الحجز).',
        price: '—',
        images: [
            'room-modern.jpg',
            'room-twin-divider.jpg',
            'room-twin-mirror.jpg',
            'room-twin-phone.jpg',
            'room-wardrobe.jpg',
            'bathroom.jpg',
            'shower.jpg',
            'toiletries.jpg'
        ],
        features: [
            '4 أسرّة فردية',
            'تكييف مركزي',
            'تلفزيون ذكي بشاشة مسطحة',
            'واي فاي مجاني عالي السرعة',
            'حمام خاص حديث',
            'خزانة ملابس واسعة',
            'خزنة إلكترونية',
            'روب حمام ومستلزمات فاخرة',
            'قفل إلكتروني للباب',
            'إضاءة قابلة للتعديل',
            'هاتف داخلي',
            'خدمة الغرف 24 ساعة'
        ],
        specs: [
            { label: 'المساحة', value: '50 م²' },
            { label: 'الأسرّة', value: '4 فردية' },
            { label: 'تتسع لـ', value: '4 أشخاص' },
            { label: 'الإطلالة', value: 'المدينة' },
            { label: 'الطابق', value: 'متعدد' },
            { label: 'الحمام', value: 'خاص' }
        ]
    },
    suite: {
        tag: 'جناح ملكي',
        title: 'جناح ملكي',
        available: true,
        desc: 'جناح فاخر بصالة جلوس مستقلة، غرفة نوم منفصلة، وإطلالة رائعة. تصميم يجمع بين الأناقة والراحة لتجربة إقامة لا تُنسى.',
        price: '120$',
        images: [
            'room-king.jpg',
            'room-king-bed.jpg',
            'suite-living.jpg',
            'suite-tv.jpg',
            'suite-corner.jpg',
            'living-room.jpg',
            'curtain-gold.jpg',
            'tv-smart.jpg',
            'kitchen.jpg',
            'bathroom.jpg',
            'shower.jpg',
            'toiletries.jpg',
            'safe-robe.jpg'
        ],
        features: [
            'مساحة واسعة 85م²',
            'غرفة نوم منفصلة',
            'صالة جلوس خاصة',
            'تكييف مركزي',
            'تلفزيون ذكي بشاشة مسطحة',
            'واي فاي مجاني عالي السرعة',
            'حمام فاخر واسع',
            'خزانة ملابس كبيرة',
            'خزنة إلكترونية',
            'روب حمام ومستلزمات فاخرة',
            'جلسة جانبية أنيقة',
            'إطلالة رائعة',
            'خدمة الغرف 24 ساعة',
            'إمكانية خدمة كبار الشخصيات'
        ],
        specs: [
            { label: 'المساحة', value: '85 م²' },
            { label: 'السرير', value: '1 كبير' },
            { label: 'تتسع لـ', value: 'شخصان' },
            { label: 'الغرف', value: 'غرفة + صالة' },
            { label: 'الإطلالة', value: 'بانورامية' },
            { label: 'الطابق', value: 'متعدد' }
        ]
    }
};

// ============ Google Sheets Integration ============
const SHEET_API_URL = 'https://script.google.com/macros/s/AKfycbxxQdzh7KCh8BPKDmEq3dgqpR5oNlwMy2SWJF-6VBeNw7yuv4VBxauEEISjVM3aVbt7/exec';

let roomAvailability = {};

async function fetchRoomAvailability() {
    try {
        const response = await fetch(SHEET_API_URL);
        const data = await response.json();
        
        roomAvailability = {};
        data.forEach(row => {
            roomAvailability[row.room] = row.status === 'true' || row.status === true;
        });
        
        updateRoomsAvailability();
    } catch (error) {
        console.log('تعذر جلب حالة الغرف، استخدمنا الحالة الافتراضية');
    }
}

function updateRoomsAvailability() {
    document.querySelectorAll('.room').forEach(roomEl => {
        const roomKey = roomEl.dataset.room;
        const isAvailable = roomAvailability[roomKey];
        
        if (isAvailable === undefined) return;
        
        const badge = roomEl.querySelector('.room-badge');
        if (badge) {
            if (isAvailable) {
                badge.textContent = 'متوفر';
                badge.className = 'room-badge available';
            } else {
                badge.textContent = 'غير متوفر حاليًا';
                badge.className = 'room-badge unavailable';
            }
        }
    });
    
    Object.keys(roomsData).forEach(key => {
        if (roomAvailability[key] !== undefined) {
            roomsData[key].available = roomAvailability[key];
        }
    });
}

// ============ Room Modal ============
const roomModal = document.getElementById('roomModal');
const roomModalOverlay = document.getElementById('roomModalOverlay');
const roomModalClose = document.getElementById('roomModalClose');
const roomModalTag = document.getElementById('roomModalTag');
const roomModalTitle = document.getElementById('roomModalTitle');
const roomModalBadge = document.getElementById('roomModalBadge');
const roomModalDesc = document.getElementById('roomModalDesc');
const roomModalPrice = document.getElementById('roomModalPrice');
const roomModalFeatures = document.getElementById('roomModalFeatures');
const roomModalSpecs = document.getElementById('roomModalSpecs');
const roomModalBook = document.getElementById('roomModalBook');
const roomGalleryContainer = document.getElementById('roomGalleryContainer');
const roomGalleryPrev = document.getElementById('roomGalleryPrev');
const roomGalleryNext = document.getElementById('roomGalleryNext');
const roomGalleryCounter = document.getElementById('roomGalleryCounter');

let currentImageIndex = 0;
let currentImages = [];
let galleryAutoplay = null;

function openRoomModal(roomKey) {
    const room = roomsData[roomKey];
    if (!room) return;
    
    currentImageIndex = 0;
    currentImages = room.images;
    
    roomModalTag.textContent = room.tag;
    roomModalTitle.textContent = room.title;
    roomModalDesc.textContent = room.desc;
    roomModalPrice.textContent = room.price;
    
    roomModalBadge.textContent = room.available ? 'متوفر' : 'غير متوفر حاليًا';
    roomModalBadge.className = 'room-modal-badge ' + (room.available ? 'available' : 'unavailable');
    
    roomModalFeatures.innerHTML = '';
    room.features.forEach((f) => {
        const li = document.createElement('li');
        li.textContent = f;
        roomModalFeatures.appendChild(li);
    });
    
    roomModalSpecs.innerHTML = '';
    room.specs.forEach((s) => {
        const div = document.createElement('div');
        div.className = 'spec-item';
        div.innerHTML = '<span class="spec-label">' + s.label + '</span><span class="spec-value">' + s.value + '</span>';
        roomModalSpecs.appendChild(div);
    });
    
    roomGalleryContainer.innerHTML = '';
    room.images.forEach((src, i) => {
        const img = document.createElement('img');
        img.src = src;
        img.alt = room.title;
        img.className = 'room-gallery-slide' + (i === 0 ? ' active' : '');
        roomGalleryContainer.appendChild(img);
    });
    
    updateGalleryCounter();
    
    roomModal.classList.add('open');
    document.body.style.overflow = 'hidden';
    
    startGalleryAutoplay();
}

function closeRoomModal() {
    roomModal.classList.remove('open');
    document.body.style.overflow = '';
    stopGalleryAutoplay();
}

function showGalleryImage(index) {
    const slides = roomGalleryContainer.querySelectorAll('.room-gallery-slide');
    if (slides.length === 0) return;
    
    slides[currentImageIndex].classList.remove('active');
    currentImageIndex = (index + slides.length) % slides.length;
    slides[currentImageIndex].classList.add('active');
    
    updateGalleryCounter();
}

function updateGalleryCounter() {
    roomGalleryCounter.textContent = (currentImageIndex + 1) + ' / ' + currentImages.length;
}

function nextGalleryImage() {
    showGalleryImage(currentImageIndex + 1);
    resetGalleryAutoplay();
}

function prevGalleryImage() {
    showGalleryImage(currentImageIndex - 1);
    resetGalleryAutoplay();
}

function startGalleryAutoplay() {
    stopGalleryAutoplay();
    galleryAutoplay = setInterval(() => {
        showGalleryImage(currentImageIndex + 1);
    }, 3500);
}

function stopGalleryAutoplay() {
    if (galleryAutoplay) {
        clearInterval(galleryAutoplay);
        galleryAutoplay = null;
    }
}

function resetGalleryAutoplay() {
    stopGalleryAutoplay();
    startGalleryAutoplay();
}

document.querySelectorAll('[data-room]').forEach(el => {
    el.addEventListener('click', (e) => {
        e.stopPropagation();
        const roomKey = el.dataset.room;
        openRoomModal(roomKey);
    });
});

roomModalClose.addEventListener('click', closeRoomModal);
roomModalOverlay.addEventListener('click', closeRoomModal);
roomGalleryPrev.addEventListener('click', (e) => { e.stopPropagation(); prevGalleryImage(); });
roomGalleryNext.addEventListener('click', (e) => { e.stopPropagation(); nextGalleryImage(); });

roomModalBook.addEventListener('click', () => {
    closeRoomModal();
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && roomModal.classList.contains('open')) {
        closeRoomModal();
    }
});

let roomTouchStartX = 0;
roomGalleryContainer.addEventListener('touchstart', (e) => {
    roomTouchStartX = e.changedTouches[0].screenX;
}, { passive: true });

roomGalleryContainer.addEventListener('touchend', (e) => {
    const diff = roomTouchStartX - e.changedTouches[0].screenX;
    if (Math.abs(diff) > 50) {
        if (diff > 0) nextGalleryImage();
        else prevGalleryImage();
    }
}, { passive: true });

// ============ Lightbox ============
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');
const lightboxCounter = document.getElementById('lightboxCounter');

let currentIndex = 0;
let visibleImages = [];

function updateVisibleImages() {
    visibleImages = Array.from(document.querySelectorAll('.gallery-item:not(.hidden)'))
        .map(item => ({
            src: item.dataset.src,
            alt: item.querySelector('img').alt
        }));
}

function openLightbox(index) {
    updateVisibleImages();
    currentIndex = index;
    lightboxImg.src = visibleImages[currentIndex].src;
    lightboxImg.alt = visibleImages[currentIndex].alt;
    lightboxCounter.textContent = (currentIndex + 1) + ' / ' + visibleImages.length;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
}

function nextImage() {
    currentIndex = (currentIndex + 1) % visibleImages.length;
    lightboxImg.src = visibleImages[currentIndex].src;
    lightboxImg.alt = visibleImages[currentIndex].alt;
    lightboxCounter.textContent = (currentIndex + 1) + ' / ' + visibleImages.length;
}

function prevImage() {
    currentIndex = (currentIndex - 1 + visibleImages.length) % visibleImages.length;
    lightboxImg.src = visibleImages[currentIndex].src;
    lightboxImg.alt = visibleImages[currentIndex].alt;
    lightboxCounter.textContent = (currentIndex + 1) + ' / ' + visibleImages.length;
}

document.querySelectorAll('.gallery-item').forEach((item) => {
    item.addEventListener('click', () => {
        updateVisibleImages();
        const visibleList = Array.from(document.querySelectorAll('.gallery-item:not(.hidden)'));
        const index = visibleList.indexOf(item);
        openLightbox(index);
    });
});

lightboxClose.addEventListener('click', closeLightbox);
lightboxNext.addEventListener('click', (e) => { e.stopPropagation(); nextImage(); });
lightboxPrev.addEventListener('click', (e) => { e.stopPropagation(); prevImage(); });

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') prevImage();
    if (e.key === 'ArrowLeft') nextImage();
});

let touchStartX = 0;
lightbox.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

lightbox.addEventListener('touchend', (e) => {
    const diff = touchStartX - e.changedTouches[0].screenX;
    if (Math.abs(diff) > 50) {
        if (diff > 0) nextImage();
        else prevImage();
    }
}, { passive: true });

// ============ Booking Form ============
const bookingForm = document.getElementById('bookingForm');

bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(bookingForm);
    const data = Object.fromEntries(formData.entries());
    
    if (!data.name || !data.phone || !data.date) {
        alert('يرجى ملء الحقول المطلوبة');
        return;
    }
    
    const roomText = data.room === 'double' ? 'غرفة مزدوجة فاخرة' 
                    : data.room === 'twin' ? 'غرفة بسريرين فرديين'
                    : data.room === 'family' ? 'غرفة عائلية'
                    : data.room === 'family-studio' ? 'استوديو عائلي 70م²'
                    : data.room === 'quad' ? 'غرفة رباعية'
                    : data.room === 'suite' ? 'جناح ملكي'
                    : 'غير محدد';
    
    const message = '✦ طلب حجز — فندق الأمراء بلازا\n\n' +
        'الاسم: ' + data.name + '\n' +
        'الهاتف: ' + data.phone + '\n' +
        (data.email ? 'البريد: ' + data.email + '\n' : '') +
        'تاريخ الوصول: ' + data.date + '\n' +
        'عدد الليالي: ' + (data.nights || 1) + '\n' +
        'نوع الغرفة: ' + roomText + '\n' +
        (data.notes ? 'ملاحظات: ' + data.notes + '\n' : '') +
        '\nأرجو تأكيد التوفر والسعر.';

    const whatsappURL = 'https://wa.me/962776767619?text=' + encodeURIComponent(message);
    window.open(whatsappURL, '_blank');
    bookingForm.reset();
});

// ============ Smooth Scroll ============
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
            e.preventDefault();
            const offset = 80;
            const pos = target.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({ top: pos, behavior: 'smooth' });
        }
    });
});

// ============ تشغيل جلب حالة الغرف ============
document.addEventListener('DOMContentLoaded', fetchRoomAvailability);
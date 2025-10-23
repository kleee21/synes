// js/script.js (Revisi Final dengan Modal Galeri & Carousel)

// --- Variabel Global untuk Modal ---
const galleryModal = document.getElementById('gallery-modal');
const modalImage = document.getElementById('modal-image');
const modalCaption = document.getElementById('modal-caption');

window.openModal = (src, caption) => {
    // Pastikan modal ada sebelum membuka
    if (!galleryModal) return; 
    
    modalImage.src = 'assets/' + src;
    modalCaption.textContent = caption;
    galleryModal.classList.remove('hidden');
    // Tambahkan class modal-open untuk animasi transform
    galleryModal.querySelector('.modal-content-area').classList.add('modal-open'); 
    document.body.classList.add('no-scroll'); // Kunci scroll saat modal terbuka
};

window.closeModal = () => {
    if (!galleryModal) return;
    
    // Hapus class modal-open untuk animasi transform kembali
    galleryModal.querySelector('.modal-content-area').classList.remove('modal-open');
    galleryModal.classList.add('hidden');
    document.body.classList.remove('no-scroll'); // Buka kunci scroll
};
// ------------------------------------

// --- FUNGSI CAROUSEL GALERI ---
let currentSlide = 0;
let carouselSlides, totalSlides, carouselSlidesContainer, dotsContainer;
let autoAdvanceInterval;

const initializeCarousel = () => {
    carouselSlidesContainer = document.getElementById('carousel-slides');
    if (!carouselSlidesContainer) return;

    carouselSlides = carouselSlidesContainer.querySelectorAll('.carousel-slide');
    totalSlides = carouselSlides.length;
    dotsContainer = document.getElementById('carousel-dots');
    
    // Buat dot indicators
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('div');
        dot.classList.add('carousel-dot');
        dot.addEventListener('click', () => {
            currentSlide = i;
            updateCarousel();
            resetAutoAdvance();
        });
        dotsContainer.appendChild(dot);
    }
    
    document.getElementById('prev-btn')?.addEventListener('click', () => {
        prevSlide();
        resetAutoAdvance();
    });
    document.getElementById('next-btn')?.addEventListener('click', () => {
        nextSlide();
        resetAutoAdvance();
    });

    startAutoAdvance();
    updateCarousel();
};

const startAutoAdvance = () => {
    // Auto-advance
    autoAdvanceInterval = setInterval(nextSlide, 5000); // Ganti slide setiap 5 detik
}

const resetAutoAdvance = () => {
    clearInterval(autoAdvanceInterval);
    startAutoAdvance();
}


const updateCarousel = () => {
    if (carouselSlidesContainer) {
        const offset = -currentSlide * 100;
        carouselSlidesContainer.style.transform = `translateX(${offset}%)`;
    }
    
    // Update dots
    const dots = dotsContainer?.querySelectorAll('.carousel-dot');
    dots?.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
};

const nextSlide = () => {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateCarousel();
};

const prevSlide = () => {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateCarousel();
};
// ------------------------------------


document.addEventListener('DOMContentLoaded', () => {
    const loadingScreen = document.getElementById('loading-screen');
    const heroContentItems = document.querySelectorAll('.hero-content-item');
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger-menu');
    const mobileMenu = document.getElementById('mobile-menu');
    const body = document.body;
    
    // Initialize Carousel jika di halaman Galeri
    if (window.location.pathname.includes('galeri.html')) {
        initializeCarousel();
    }


    // --- 0. Animasi Halaman Masuk ---
    setTimeout(() => {
        body.classList.remove('page-transition-out');
        body.classList.add('page-transition-in');
    }, 10); 

    // FUNGSI: Animasi Hero Home (Staggered Fade-in)
    const animateHeroContent = () => {
        heroContentItems.forEach((item, index) => {
            item.classList.remove('opacity-0');
            item.classList.add('transition', 'duration-1000', 'ease-out', 'transform', 'translate-y-0');
            item.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, 100 + (index * 200)); 
        });
    };

    // FUNGSI: Update Navbar Blur/Color on Scroll
    const updateNavbar = () => {
        // threshold 90% view height untuk Home, 100px untuk halaman lain
        const isHomePage = window.location.pathname.endsWith('index.html') || window.location.pathname === '/';
        const scrollThreshold = isHomePage ? window.innerHeight * 0.9 : 100;
        
        if (navbar) {
            if (window.scrollY > scrollThreshold) {
                navbar.classList.remove('navbar-initial');
                navbar.classList.add('navbar-scrolled');
            } else {
                navbar.classList.remove('navbar-scrolled');
                navbar.classList.add('navbar-initial');
            }
        }
    };

    // --- 1. Loading Screen & Scroll Lock ---
    if (loadingScreen) {
        body.classList.add('no-scroll'); 
        
        setTimeout(() => {
            loadingScreen.style.opacity = '0';
            
            setTimeout(() => {
                loadingScreen.style.display = 'none'; 
                body.classList.remove('no-scroll'); 
                
                updateNavbar(); 
                if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
                    animateHeroContent(); 
                }
            }, 500); 
        }, 1500); 
    } else {
        updateNavbar(); 
    }

    // --- 2. Event Listener Scroll ---
    window.addEventListener('scroll', updateNavbar);

    // --- 3. Hamburger Menu (Mobile) ---
    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // --- 4. Animasi Transisi Halaman Keluar ---
    document.querySelectorAll('a[href]').forEach(link => {
        // Hanya tambahkan listener jika link menuju halaman internal lain (bukan hash/external)
        if (link.hostname === location.hostname && link.pathname !== location.pathname && !link.hash) {
            
            link.addEventListener('click', (event) => {
                const targetUrl = link.href;
                event.preventDefault(); 
                
                body.classList.remove('page-transition-in');
                body.classList.add('page-transition-out'); 
                
                setTimeout(() => {
                    window.location.href = targetUrl;
                }, 500); 
            });
        }
    });
    
    // --- 5. Tutup Modal dengan ESC & Klik Luar ---
    if (galleryModal) {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !galleryModal.classList.contains('hidden')) {
                closeModal();
            }
        });
        // Tutup Modal saat klik di luar area gambar
        galleryModal.addEventListener('click', (e) => {
            if (e.target === galleryModal) {
                closeModal();
            }
        });
    }

});

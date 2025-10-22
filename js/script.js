// js/script.js (Revisi Final)

document.addEventListener('DOMContentLoaded', () => {
    const loadingScreen = document.getElementById('loading-screen');
    const heroContentItems = document.querySelectorAll('.hero-content-item');
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger-menu');
    const mobileMenu = document.getElementById('mobile-menu');
    const body = document.body;

    // --- 0. Setup Awal ---
    setTimeout(() => {
        body.classList.remove('page-transition-out');
        body.classList.add('page-transition-in');
    }, 10); 

    // --- FUNGSI BARU: Animasi Hero Home ---
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

    // --- 1. Loading Screen (FIX Kunci Scroll) ---
    if (loadingScreen) {
        // PENTING: Kunci scroll saat loading screen ada
        body.classList.add('no-scroll'); 
        
        // Total delay loading screen: 1.5s + 0.5s = 2.0s
        setTimeout(() => {
            loadingScreen.style.opacity = '0';
            
            setTimeout(() => {
                loadingScreen.style.display = 'none'; 
                // Hapus kunci scroll setelah loading screen hilang total
                body.classList.remove('no-scroll'); 
                
                // Mulai animasi konten Hero
                animateHeroContent(); 
            }, 500); 
        }, 1500); 
    } 
    // ... (Logika halaman non-Home)

    // --- 2. Navbar Scroll Effect (Tetap sama) ---
    const updateNavbar = () => {
        const isHomePage = window.location.pathname.endsWith('index.html') || window.location.pathname === '/';
        // Hanya cek scroll jika kita tidak dalam kondisi no-scroll (loading)
        if (!body.classList.contains('no-scroll')) { 
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
        }
    };
    window.addEventListener('scroll', updateNavbar);
    updateNavbar(); 

    // ... (3 & 4: Hamburger dan Transisi Keluar tetap sama) ...
    document.querySelectorAll('a[href]').forEach(link => {
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
});

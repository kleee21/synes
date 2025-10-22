// js/script.js

document.addEventListener('DOMContentLoaded', () => {
    const loadingScreen = document.getElementById('loading-screen');
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger-menu');
    const mobileMenu = document.getElementById('mobile-menu');

    // --- 1. Loading Screen ---
    
    // Sembunyikan loading screen setelah 1.5 detik
    setTimeout(() => {
        if (loadingScreen) {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }
    }, 1500); 

    // --- 2. Navbar Scroll Effect ---
    
    const updateNavbar = () => {
        // Tentukan batas scroll (90% dari tinggi viewport)
        const scrollThreshold = window.innerHeight * 0.9; 
        
        if (navbar) {
            if (window.scrollY > scrollThreshold) {
                // Di-scroll: Terapkan class navbar-scrolled (lebih transparan)
                navbar.classList.remove('navbar-initial');
                navbar.classList.add('navbar-scrolled');
            } else {
                // Di atas: Terapkan class navbar-initial (lebih solid)
                navbar.classList.remove('navbar-scrolled');
                navbar.classList.add('navbar-initial');
            }
        }
    };

    window.addEventListener('scroll', updateNavbar);
    // Panggil sekali saat load
    updateNavbar(); 

    // --- 3. Hamburger Menu (Mobile) ---
    
    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

});
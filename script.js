document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialization
    AOS.init({ 
        once: true, 
        duration: 800,
        offset: 50 // Trigger animasi sedikit lebih awal
    });

    // 2. Context-Aware Greeting Logic
    function updateGreeting() {
        const hour = new Date().getHours();
        const textEl = document.getElementById('greeting-text');
        const iconEl = document.getElementById('greeting-icon');
        
        if (!textEl || !iconEl) return;

        if (hour < 11) {
            textEl.innerText = 'Selamat Pagi • Est. 1918';
            iconEl.className = 'fas fa-sun text-yellow-300 animate-spin-slow';
        } else if (hour < 15) {
            textEl.innerText = 'Selamat Siang • Est. 1918';
            iconEl.className = 'fas fa-cloud-sun text-orange-400';
        } else if (hour < 19) {
            textEl.innerText = 'Selamat Sore • Est. 1918';
            iconEl.className = 'fas fa-cloud-moon text-indigo-400';
        } else {
            textEl.innerText = 'Selamat Malam • Est. 1918';
            iconEl.className = 'fas fa-moon text-blue-300';
        }
    }
    updateGreeting();

    // 3. Lightweight 3D Tilt Effect (Generic for .tilt-card)
    const tiltCards = document.querySelectorAll('.tilt-card');
    
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            // PERBAIKAN: Hanya jalankan animasi jika lebar layar > 1024px (Laptop/PC)
            if (window.innerWidth < 1024) return; 

            const rect = card.getBoundingClientRect();
            // ... sisa kode perhitungan x, y, rotateX, rotateY tetap sama ...
            
            // ... card.style.transform ...
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });
    });

    // 4. Parallax Background Logic
    const heroBg = document.getElementById('hero-bg');
    if(heroBg) {
        document.addEventListener('mousemove', (e) => {
            // Pergerakan halus berlawanan arah mouse
            const x = (window.innerWidth - e.pageX * 2) / 100;
            const y = (window.innerHeight - e.pageY * 2) / 100;
            heroBg.style.transform = `scale(1.05) translate(${x}px, ${y}px)`;
        });
    }

    // 5. Intelligent Navbar Scroll (Adaptive UI)
    const navbar = document.getElementById('navbar');
    const navBg = document.getElementById('nav-bg');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            // State: Scrolled Down
            navBg.classList.remove('bg-brand-blue/0', 'backdrop-blur-0');
            navBg.classList.add('bg-brand-blue/90', 'dark:bg-brand-dark/90', 'backdrop-blur-xl', 'shadow-md');
            
            // Kecilkan padding navbar agar compact
            // navbar.classList.remove('h-24');
            // navbar.classList.add('h-20');
        } else {
            // State: Top
            navBg.classList.add('bg-brand-blue/0', 'backdrop-blur-0');
            navBg.classList.remove('bg-brand-blue/90', 'dark:bg-brand-dark/90', 'backdrop-blur-xl', 'shadow-md');
            
            // Kembalikan ukuran asli
            // navbar.classList.add('h-24');
            // navbar.classList.remove('h-20');
        }
    });

    // 6. Number Counter Animation (Observer Pattern)
    const counters = document.querySelectorAll('.count-up');
    const countObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = +entry.target.getAttribute('data-target');
                const duration = 2000; // ms
                const increment = target / (duration / 16); // 60fps approx
                
                let count = 0;
                const updateCount = () => {
                    count += increment;
                    if (count < target) {
                        entry.target.innerText = Math.ceil(count);
                        requestAnimationFrame(updateCount);
                    } else {
                        entry.target.innerText = target;
                    }
                };
                updateCount();
                countObserver.unobserve(entry.target); // Hanya jalankan sekali
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => countObserver.observe(counter));

    // 7. Instant Reveal Logic (Perbaikan: Hapus delay 8 detik)
    const header = document.getElementById('home');
    const hiddenElements = [
        document.getElementById('navbar'),
        document.getElementById('hero-content'),
        document.getElementById('hero-stats')
    ];

    // Jalankan segera setelah halaman siap (delay kecil 100ms untuk efek transisi halus)
    setTimeout(() => {
        // Hapus class hidden dan tambahkan visible
        hiddenElements.forEach(el => {
            if(el) {
                el.classList.remove('intro-hidden');
                el.classList.add('intro-visible');
            }
        });
        
        // Hapus animasi pulse pada background image agar tidak berat
        const heroImg = document.querySelector('#home img');
        if(heroImg) {
            heroImg.classList.remove('animate-pulse-slow');
        }

    }, 100);
});

/* --- Global Functions (Accessible via HTML onclick) --- */

// 1. Mobile Menu Toggle (Updated)
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const overlay = document.getElementById('mobile-overlay');
    
    // Cek apakah menu sedang tertutup
    const isClosed = mobileMenu.classList.contains('translate-x-full');
    
    if (isClosed) {
        // Buka Menu
        mobileMenu.classList.remove('translate-x-full');
        // Tampilkan overlay jika ada
        if(overlay) {
            overlay.classList.remove('hidden');
            setTimeout(() => overlay.classList.remove('opacity-0'), 10);
        }
    } else {
        // Tutup Menu
        mobileMenu.classList.add('translate-x-full');
        // Sembunyikan overlay
        if(overlay) {
            overlay.classList.add('opacity-0');
            setTimeout(() => overlay.classList.add('hidden'), 300);
        }
    }
}

// 3. Dark Mode Toggle
function toggleDarkMode() {
    document.documentElement.classList.toggle('dark');
}

// 4. Accessibility Tools
function toggleContrast() {
    document.body.classList.toggle('high-contrast');
}
function toggleTextSize() {
    document.body.classList.toggle('text-lg'); // Class utilitas Tailwind atau custom CSS
}

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

// 1. Mobile Menu Toggle
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    // Cek apakah menu sedang terbuka (translate-x-full = tertutup)
    const isClosed = mobileMenu.classList.contains('translate-x-full');
    
    if (isClosed) {
        // Buka Menu
        mobileMenu.classList.remove('translate-x-full');
    } else {
        // Tutup Menu
        mobileMenu.classList.add('translate-x-full');
    }
}

// 2. AI Widget Toggle
function toggleAI() {
    const chat = document.getElementById('ai-chat');
    chat.classList.toggle('hidden');
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

// 5. Voice Interaction (Simulated)
const voiceOverlay = document.getElementById('voice-overlay');

function activateVoiceUI() {
    if(!voiceOverlay) return;
    
    // Tampilkan overlay
    voiceOverlay.classList.remove('hidden');
    // Trigger reflow agar transisi opacity jalan
    void voiceOverlay.offsetWidth; 
    voiceOverlay.classList.remove('opacity-0');
    
    // Simulasi mendengarkan (3 detik)
    setTimeout(() => {
        closeVoiceUI();
        
        // Simulasi respon AI di widget chat
        const chatContent = document.getElementById('chat-content');
        if(chatContent) {
            // User Chat Bubble
            chatContent.innerHTML += `
                <div class="flex gap-3 justify-end mt-4">
                    <div class="bg-brand-primary text-white p-3 rounded-2xl rounded-tr-none shadow-sm text-sm max-w-[80%]">
                        Saya ingin tahu biaya masuk.
                    </div>
                </div>`;
            
            // AI Response (Delay 1 detik)
            setTimeout(() => {
                chatContent.innerHTML += `
                    <div class="flex gap-3 mt-4">
                        <div class="w-8 h-8 rounded-full bg-brand-primary text-white flex-shrink-0 flex items-center justify-center text-xs">
                            <i class="fas fa-robot"></i>
                        </div>
                        <div class="bg-white dark:bg-slate-800 p-3.5 rounded-2xl rounded-tl-none shadow-sm text-sm border border-slate-100 dark:border-slate-700 max-w-[85%]">
                            Untuk rincian biaya masuk tahun ajaran 2026/2027, silakan unduh brosur PDF di halaman PPDB atau klik tombol di bawah ini.
                            <button class="mt-2 text-brand-primary font-bold text-xs underline block">Download Brosur PDF</button>
                        </div>
                    </div>`;
                
                // Scroll ke bawah chat
                chatContent.scrollTop = chatContent.scrollHeight;
                
                // Buka widget chat jika tertutup
                const chatWidget = document.getElementById('ai-chat');
                if(chatWidget.classList.contains('hidden')) {
                    chatWidget.classList.remove('hidden');
                }
            }, 1000);
        }
    }, 3000);
}

function closeVoiceUI() {
    if(!voiceOverlay) return;
    voiceOverlay.classList.add('opacity-0');
    setTimeout(() => {
        voiceOverlay.classList.add('hidden');
    }, 300); // Sesuaikan dengan durasi transisi CSS
}

// 6. Form Submission Simulation (SweetAlert2)
function submitForm() {
    Swal.fire({
        title: 'Analisis AI Berjalan...',
        text: 'Memeriksa kelayakan data awal Anda.',
        icon: 'info',
        timer: 2000,
        timerProgressBar: true,
        background: '#fff',
        color: '#003366',
        didOpen: () => {
            Swal.showLoading()
        }
    }).then(() => {
        Swal.fire({
            title: 'Data Valid!',
            text: 'Silakan lanjutkan ke tahap wawancara virtual.',
            icon: 'success',
            confirmButtonColor: '#014a97',
            background: '#fff',
            color: '#003366'
        });
    });
}

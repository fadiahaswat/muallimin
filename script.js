// 1. Initialization
AOS.init({ once: true, duration: 800 });

// 2. Context-Aware Greeting Logic
function updateGreeting() {
    const hour = new Date().getHours();
    const textEl = document.getElementById('greeting-text');
    const iconEl = document.getElementById('greeting-icon');
    
    if (hour < 11) {
        textEl.innerText = 'Selamat Pagi, Calon Pemimpin';
        iconEl.className = 'fas fa-sun text-yellow-400';
    } else if (hour < 15) {
        textEl.innerText = 'Selamat Siang, Generasi Unggul';
        iconEl.className = 'fas fa-cloud-sun text-orange-400';
    } else if (hour < 19) {
        textEl.innerText = 'Selamat Sore, Sobat Muin';
        iconEl.className = 'fas fa-cloud-moon text-indigo-400';
    } else {
        textEl.innerText = 'Selamat Malam, Istirahatlah';
        iconEl.className = 'fas fa-moon text-blue-400';
    }
}
updateGreeting();

// 3. Lightweight 3D Tilt Effect
const heroCard = document.getElementById('hero-card');

if (heroCard) {
    heroCard.addEventListener('mousemove', (e) => {
        const rect = heroCard.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * -10;
        const rotateY = ((x - centerX) / centerX) * 10;

        heroCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        heroCard.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.8), rgba(255,255,255,0.7) 40%)`;
    });

    heroCard.addEventListener('mouseleave', () => {
        heroCard.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        heroCard.style.background = ''; 
    });
}

// 4. Parallax Background
document.addEventListener('mousemove', (e) => {
    const bg = document.getElementById('hero-bg');
    if(bg) {
        const x = (window.innerWidth - e.pageX * 2) / 90;
        const y = (window.innerHeight - e.pageY * 2) / 90;
        bg.style.transform = `scale(1.05) translate(${x}px, ${y}px)`;
    }
});

// 5. Intelligent Navbar Scroll
const navbar = document.getElementById('navbar');
const brandText = document.getElementById('brand-text');
const navBg = document.getElementById('nav-bg');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navBg.classList.remove('bg-white/0', 'backdrop-blur-0');
        navBg.classList.add('bg-white/80', 'dark:bg-brand-dark/90', 'backdrop-blur-xl', 'shadow-sm');
        brandText.classList.remove('text-white');
        brandText.classList.add('text-brand-blue', 'dark:text-white');
    } else {
        navBg.classList.add('bg-white/0', 'backdrop-blur-0');
        navBg.classList.remove('bg-white/80', 'dark:bg-brand-dark/90', 'backdrop-blur-xl', 'shadow-sm');
        brandText.classList.add('text-white');
        brandText.classList.remove('text-brand-blue', 'dark:text-white');
    }
});

// 6. Voice Interaction UI
const voiceOverlay = document.getElementById('voice-overlay');
function activateVoiceUI() {
    voiceOverlay.classList.remove('hidden');
    void voiceOverlay.offsetWidth;
    voiceOverlay.classList.remove('opacity-0');
    
    setTimeout(() => {
        closeVoiceUI();
        const chatContent = document.getElementById('chat-content');
        chatContent.innerHTML += `<div class="bg-brand-primary text-white p-3 rounded-lg rounded-tr-none ml-auto max-w-[80%] mt-2">Saya ingin mendaftar.</div>`;
        
        setTimeout(() => {
            chatContent.innerHTML += `<div class="bg-brand-light/50 dark:bg-slate-700 p-3 rounded-lg rounded-tl-none mt-2">Baik, saya arahkan ke formulir pendaftaran. Mohon lengkapi nama Anda.</div>`;
            const inputName = document.getElementById('inputName');
            if(inputName) inputName.focus();
            toggleAI(true); 
        }, 1000);

    }, 3000);
}

function closeVoiceUI() {
    voiceOverlay.classList.add('opacity-0');
    setTimeout(() => {
        voiceOverlay.classList.add('hidden');
    }, 300);
}

// 7. Toggle Dark Mode
function toggleDarkMode() {
    document.documentElement.classList.toggle('dark');
}

// 8. Accessibility Features
function toggleContrast() {
    document.body.classList.toggle('high-contrast');
}
function toggleTextSize() {
    document.body.classList.toggle('text-lg'); 
}

// 9. AI Widget Toggle
function toggleAI(forceOpen = false) {
    const chat = document.getElementById('ai-chat');
    if (forceOpen) {
        chat.classList.remove('hidden');
    } else {
        chat.classList.toggle('hidden');
    }
}

function submitForm() {
    Swal.fire({
        title: 'Analisis AI Berjalan...',
        text: 'Memeriksa kelayakan data awal Anda.',
        icon: 'info',
        timer: 2000,
        timerProgressBar: true,
        didOpen: () => {
            Swal.showLoading()
        }
    }).then(() => {
        Swal.fire({
            title: 'Data Valid!',
            text: 'Silakan lanjutkan ke tahap wawancara virtual.',
            icon: 'success',
            confirmButtonColor: '#014a97'
        });
    });
}

// 10. Number Counter Animation (Observer)
const counters = document.querySelectorAll('.count-up');
const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = +entry.target.getAttribute('data-target');
            const duration = 2000; 
            const increment = target / (duration / 16); 
            
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
            countObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });
counters.forEach(counter => countObserver.observe(counter));

/* --- Masukkan kode ini ke dalam file script.js Anda --- */

// 1. Navbar Scroll Logic (Adaptive UI)
const navbar = document.getElementById('navbar');
const navBg = document.getElementById('nav-bg');
const brandText = document.getElementById('brand-text');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        // Saat di-scroll ke bawah: Background solid/glass, teks menyesuaikan
        navBg.classList.remove('bg-brand-blue/0', 'backdrop-blur-0');
        navBg.classList.add('bg-brand-blue/90', 'dark:bg-brand-dark/90', 'backdrop-blur-xl', 'shadow-md');
        
        // Opsional: Kecilkan padding navbar sedikit agar lebih compact
        navbar.classList.remove('py-4');
        navbar.classList.add('py-2');
    } else {
        // Saat di paling atas: Transparan
        navBg.classList.add('bg-brand-blue/0', 'backdrop-blur-0');
        navBg.classList.remove('bg-brand-blue/90', 'dark:bg-brand-dark/90', 'backdrop-blur-xl', 'shadow-md');
        
        navbar.classList.add('py-4');
        navbar.classList.remove('py-2');
    }
});

// 2. Mobile Menu Toggle Logic
const mobileToggle = document.getElementById('mobile-toggle');
const mobileClose = document.getElementById('mobile-close');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');

function toggleMobileMenu() {
    const isOpen = mobileMenu.classList.contains('translate-x-0');
    if (isOpen) {
        mobileMenu.classList.remove('translate-x-0');
        mobileMenu.classList.add('translate-x-full');
    } else {
        mobileMenu.classList.remove('translate-x-full');
        mobileMenu.classList.add('translate-x-0');
    }
}

// Event Listeners
if(mobileToggle) mobileToggle.addEventListener('click', toggleMobileMenu);
if(mobileClose) mobileClose.addEventListener('click', toggleMobileMenu);

// Tutup menu saat link diklik
mobileLinks.forEach(link => {
    link.addEventListener('click', toggleMobileMenu);
});

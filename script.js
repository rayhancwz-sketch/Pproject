document.addEventListener('DOMContentLoaded', () => {
    // 0. Force Hero Video Autoplay (Bypass Mobile Restrictions)
    const heroVideo = document.querySelector('.hero-video');
    if (heroVideo) {
        heroVideo.muted = true; // Wajib di-mute ulang via JS
        heroVideo.play().catch(error => {
            console.log("Autoplay diblokir oleh browser:", error);
        });
        
        // Jika gagal autoplay (misal karena low power mode), paksa putar saat layar disentuh pertama kali
        document.body.addEventListener('touchstart', () => {
            heroVideo.play();
        }, { once: true });
        document.body.addEventListener('click', () => {
            heroVideo.play();
        }, { once: true });
    }

    // 1. Transparent to Solid Navbar on Scroll
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. Mobile Menu Toggle
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-links');

    mobileMenu.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Ensure navbar is styled for solid bg when menu opens on mobile
        if(navMenu.classList.contains('active')) {
             navbar.classList.add('scrolled');
        } else if (window.scrollY <= 50) {
             navbar.classList.remove('scrolled');
        }
    });

    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // 3. Scroll Reveal Animations using Intersection Observer
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: Stop observing once revealed
                // observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        threshold: 0.05, // Lebih mudah terdeteksi di HP
        rootMargin: "0px 0px 0px 0px"
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });
    
    // Trigger reveals on load for elements already in viewport (like Hero)
    setTimeout(() => {
        revealElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if(rect.top < window.innerHeight) {
                 el.classList.add('active');
            }
        });
    }, 100);

    // 4. Handle Contact Form Submit (Prevent default for UI demo)
    const inquiryForm = document.getElementById('inquiryForm');
    if(inquiryForm) {
        inquiryForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = inquiryForm.querySelector('button');
            const originalText = btn.innerText;
            
            btn.innerText = 'Mengirim Pesan...';
            btn.style.opacity = '0.8';
            
            // Simulate network request
            setTimeout(() => {
                btn.innerText = 'Terkirim! Terima kasih.';
                btn.style.background = '#4CAF50';
                btn.style.color = 'white';
                inquiryForm.reset();
                
                setTimeout(() => {
                    btn.innerText = originalText;
                    btn.style.background = '';
                    btn.style.opacity = '1';
                }, 3000);
            }, 1500);
        });
    }
});

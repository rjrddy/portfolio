// ================================
// DOM References
// ================================
const NAV_BAR      = document.getElementById('navBar');
const NAV_LIST     = document.getElementById('navList');
const HERO_HEADER  = document.getElementById('heroHeader');
const HAMBURGER    = document.getElementById('hamburgerBtn');
const NAV_LINKS    = Array.from(document.querySelectorAll('.nav__link'));
const BREAKPOINT   = 576;

let currentActive = document.querySelector('.nav__link.active');

// ================================
// Navbar — padding offset
// ================================
function setHeroPadding() {
    if (NAV_LIST.classList.contains('nav--active')) return;
    const h = NAV_BAR.getBoundingClientRect().height;
    HERO_HEADER.style.paddingTop = (h / 10) + 'rem';
}
setHeroPadding();

window.addEventListener('resize', () => {
    setHeroPadding();
    if (window.innerWidth >= BREAKPOINT) resetMobileNav();
});

// ================================
// Navbar — active link on scroll
// ================================
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('#heroHeader, #aboutme, #experience, #projects');
    const navH = NAV_BAR.getBoundingClientRect().height;

    sections.forEach(section => {
        if (window.scrollY >= section.offsetTop - navH - 10) {
            const id   = section.getAttribute('id');
            const link = NAV_LINKS.find(l => l.getAttribute('href') === '#' + id);
            if (link && link !== currentActive) {
                currentActive.classList.remove('active');
                link.classList.add('active');
                currentActive = link;
            }
        }
    });
});

// ================================
// Navbar — mobile hamburger
// ================================
function resetMobileNav() {
    NAV_LIST.classList.remove('nav--active');
    NAV_LIST.style.height = null;
    document.body.style.overflowY = null;
}

HAMBURGER.addEventListener('click', () => {
    const isOpen = NAV_LIST.classList.toggle('nav--active');
    if (isOpen) {
        NAV_LIST.style.height = '100vh';
        document.body.style.overflowY = 'hidden';
    } else {
        NAV_LIST.style.height = '0';
        document.body.style.overflowY = null;
    }
});

NAV_LINKS.forEach(link => {
    link.addEventListener('click', () => {
        resetMobileNav();
        link.blur();
    });
});

// ================================
// Smooth scroll
// ================================
new SweetScroll({
    trigger: '.nav__link',
    easing: 'easeOutQuint',
    offset: NAV_BAR.getBoundingClientRect().height - 80
});

// ================================
// Neural Network Canvas
// ================================
(function initNeuralCanvas() {
    const canvas = document.getElementById('neural-bg');
    const ctx    = canvas.getContext('2d');
    let particles = [];

    const COUNT   = 75;
    const DIST    = 160;
    const COLORS  = ['99,102,241', '168,85,247', '6,182,212'];

    function resize() {
        canvas.width  = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    class Particle {
        constructor() {
            this.reset(true);
        }
        reset(initial) {
            this.x     = Math.random() * canvas.width;
            this.y     = initial ? Math.random() * canvas.height : (Math.random() < 0.5 ? -5 : canvas.height + 5);
            this.vx    = (Math.random() - 0.5) * 0.45;
            this.vy    = (Math.random() - 0.5) * 0.45;
            this.r     = Math.random() * 1.5 + 0.5;
            this.alpha = Math.random() * 0.45 + 0.2;
            this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
        }
        update() {
            this.x += this.vx;
            this.y += this.vy;
            if (this.x < -10 || this.x > canvas.width  + 10) this.vx *= -1;
            if (this.y < -10 || this.y > canvas.height + 10) this.vy *= -1;
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${this.color},${this.alpha})`;
            ctx.fill();
        }
    }

    function init() {
        particles = Array.from({ length: COUNT }, () => new Particle());
    }

    function frame() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx   = particles[i].x - particles[j].x;
                const dy   = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < DIST) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(99,102,241,${(1 - dist / DIST) * 0.22})`;
                    ctx.lineWidth   = 0.6;
                    ctx.stroke();
                }
            }
            particles[i].update();
            particles[i].draw();
        }
        requestAnimationFrame(frame);
    }

    resize();
    init();
    frame();
    window.addEventListener('resize', () => { resize(); init(); });
})();

// ================================
// Typewriter Effect
// ================================
(function initTypewriter() {
    const el = document.getElementById('typewriter');
    if (!el) return;

    const roles = ['Software Engineer', 'ML Engineer', 'Full Stack Developer', 'Systems Engineer'];
    let rIdx = 0, cIdx = 0, deleting = false;

    function tick() {
        const word = roles[rIdx];
        if (deleting) {
            el.textContent = word.substring(0, --cIdx);
            if (cIdx === 0) {
                deleting = false;
                rIdx = (rIdx + 1) % roles.length;
                return setTimeout(tick, 400);
            }
        } else {
            el.textContent = word.substring(0, ++cIdx);
            if (cIdx === word.length) {
                deleting = true;
                return setTimeout(tick, 2400);
            }
        }
        setTimeout(tick, deleting ? 42 : 80);
    }
    setTimeout(tick, 900);
})();

// ================================
// Scroll Reveal
// ================================
(function initScrollReveal() {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.08 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
})();

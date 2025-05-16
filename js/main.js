// Utility functions
const $ = selector => document.querySelector(selector);
const $$ = selector => document.querySelectorAll(selector);

// Main initialization
document.addEventListener('DOMContentLoaded', () => {
    // Remove loader after content is loaded
    window.addEventListener('load', () => {
        const loader = $('#loader');
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
                document.body.classList.add('loaded');
            }, 500);
        }
    });

    // Initialize all features
    initAOS();
    initTypingAnimation();
    initMobileMenu();
    initSmoothScroll();
    initCursor();
    initAnimations();
});

// Initialize AOS
function initAOS() {
    if (typeof AOS === 'undefined') return;
    
    AOS.init({
        duration: 800,
        easing: 'ease-out',
        once: true,
        offset: 100,
        disable: window.innerWidth < 768
    });
}

// Typing Animation
function initTypingAnimation() {
    const typingText = $('#typing');
    if (!typingText) return;

    const words = ['Network Engineer', 'Computer Science Student', 'Problem Solver'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            typingText.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingText.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            setTimeout(() => isDeleting = true, 2000);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
        }

        setTimeout(type, isDeleting ? 100 : 200);
    }

    type();
}

// Mobile Menu
function initMobileMenu() {
    const menuBtn = $('#menuBtn');
    const mobileMenu = $('.mobile-menu');
    if (!menuBtn || !mobileMenu) return;

    menuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        const icon = menuBtn.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('nav') && !mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
            const icon = menuBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close menu when clicking links
    $$('.mobile-menu a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            const icon = menuBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });
}

// Smooth Scroll
function initSmoothScroll() {
    $$('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = $(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.offsetTop;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Cursor Effect
function initCursor() {
    const cursor = {
        dot: $('.cursor-dot'),
        outline: $('.cursor-outline'),
        init: function() {
            if (!this.dot || !this.outline) return;
            
            let requestId;
            let mouseX = 0;
            let mouseY = 0;
            let dotX = 0;
            let dotY = 0;
            let outlineX = 0;
            let outlineY = 0;

            document.addEventListener('mousemove', (e) => {
                mouseX = e.clientX;
                mouseY = e.clientY;
                
                if (!requestId) {
                    requestId = requestAnimationFrame(updateCursor);
                }
            });

            function updateCursor() {
                requestId = null;

                // Smooth dot movement
                dotX += (mouseX - dotX) * 0.2;
                dotY += (mouseY - dotY) * 0.2;
                
                // Smooth outline movement
                outlineX += (mouseX - outlineX) * 0.1;
                outlineY += (mouseY - outlineY) * 0.1;

                cursor.dot.style.transform = `translate3d(${dotX}px, ${dotY}px, 0)`;
                cursor.outline.style.transform = `translate3d(${outlineX}px, ${outlineY}px, 0)`;

                if (Math.abs(mouseX - dotX) > 0.1 || Math.abs(mouseY - dotY) > 0.1) {
                    requestId = requestAnimationFrame(updateCursor);
                }
            }

            // Add hover effect to interactive elements
            $$('a, button, .hover-lift').forEach(el => {
                el.addEventListener('mouseenter', () => {
                    this.dot.style.transform = 'scale(0.5)';
                    this.outline.style.transform = 'scale(1.5)';
                });
                
                el.addEventListener('mouseleave', () => {
                    this.dot.style.transform = '';
                    this.outline.style.transform = '';
                });
            });
        }
    };

    cursor.init();
}

// GSAP Animations
function initAnimations() {
    if (typeof gsap === 'undefined') return;

    // Register ScrollTrigger plugin
    if (typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
    }

    // Floating shapes animation with performance optimization
    const shapes = ['.shape-1', '.shape-2'];
    shapes.forEach((shape, index) => {
        const element = $(shape);
        if (!element) return;

        gsap.to(element, {
            x: 'random(-100, 100)',
            y: 'random(-100, 100)',
            rotation: index % 2 === 0 ? 360 : -360,
            duration: 'random(20, 30)',
            repeat: -1,
            yoyo: true,
            ease: 'none'
        });
    });

    // Scroll animations with intersection observer optimization
    const sections = $$('section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                gsap.from(entry.target, {
                    opacity: 0,
                    y: 50,
                    duration: 1,
                    ease: 'power2.out'
                });
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -10% 0px'
    });

    sections.forEach(section => observer.observe(section));

    // Initialize VanillaTilt with performance optimization
    if (typeof VanillaTilt !== 'undefined') {
        const tiltElements = $$(".project-card, .skill-item");
        if (tiltElements.length) {
            VanillaTilt.init(tiltElements, {
                max: 15,
                speed: 400,
                glare: true,
                "max-glare": 0.2,
                gyroscope: false
            });
        }
    }
} 
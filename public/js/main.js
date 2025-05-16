// Initialize AOS
document.addEventListener('DOMContentLoaded', () => {
    AOS.init({
        duration: 800,
        easing: 'ease-out',
        once: true,
        offset: 100,
        disable: window.innerWidth < 768
    });

    // Remove loader
    const loader = document.getElementById('loader');
    if (loader) {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }, 1000);
    }

    // Initialize typing animation
    initTypingAnimation();
    
    // Initialize other features
    initMobileMenu();
    initSmoothScroll();
    initCursor();
    initContactForm();
    initAnimations();
});

// Typing Animation
function initTypingAnimation() {
    const typingText = document.getElementById('typing');
    const words = ['Network Engineer', 'Computer Science Student', 'Problem Solver'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        if (!typingText) return;
        
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

        const typingSpeed = isDeleting ? 100 : 200;
        setTimeout(type, typingSpeed);
    }

    type();
}

// Mobile Menu
function initMobileMenu() {
    const menuBtn = document.getElementById('menuBtn');
    const mobileMenu = document.querySelector('.mobile-menu');

    if (menuBtn && mobileMenu) {
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
    }
}

// Smooth Scroll
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Cursor Effect
function initCursor() {
    const cursor = {
        dot: document.querySelector('.cursor-dot'),
        outline: document.querySelector('.cursor-outline'),
        init: function() {
            if (!this.dot || !this.outline) return;
            
            document.addEventListener('mousemove', (e) => {
                gsap.to(this.dot, {
                    x: e.clientX,
                    y: e.clientY,
                    duration: 0.1
                });
                gsap.to(this.outline, {
                    x: e.clientX,
                    y: e.clientY,
                    duration: 0.5
                });
            });
        }
    };
    cursor.init();
}

// Contact Form
function initContactForm() {
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            try {
                const formData = new FormData(form);
                const data = Object.fromEntries(formData);
                
                const response = await fetch('/api/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });

                const result = await response.json();
                
                if (result.success) {
                    alert('Message sent successfully!');
                    form.reset();
                } else {
                    throw new Error(result.message || 'Failed to send message');
                }
            } catch (error) {
                alert('Error sending message: ' + error.message);
            }
        });
    }
}

// GSAP Animations
function initAnimations() {
    // Floating shapes animation
    gsap.to('.shape-1', {
        x: 'random(-100, 100)',
        y: 'random(-100, 100)',
        rotation: 360,
        duration: 'random(20, 30)',
        repeat: -1,
        yoyo: true,
        ease: 'none'
    });

    gsap.to('.shape-2', {
        x: 'random(-100, 100)',
        y: 'random(-100, 100)',
        rotation: -360,
        duration: 'random(20, 30)',
        repeat: -1,
        yoyo: true,
        ease: 'none'
    });

    // Scroll animations
    gsap.utils.toArray('section').forEach(section => {
        gsap.from(section, {
            opacity: 0,
            y: 50,
            duration: 1,
            scrollTrigger: {
                trigger: section,
                start: "top 80%",
                end: "top 20%",
                toggleActions: "play none none reverse"
            }
        });
    });

    // Initialize VanillaTilt
    if (typeof VanillaTilt !== 'undefined') {
        VanillaTilt.init(document.querySelectorAll(".project-card, .skill-item"), {
            max: 15,
            speed: 400,
            glare: true,
            "max-glare": 0.2
        });
    }
} 
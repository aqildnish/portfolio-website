// Register GSAP Plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// Typing Animation Variables
const typingText = document.getElementById('typing');
const words = ['Network Engineer', 'Computer Science Student', 'Problem Solver'];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let isWaiting = false;
let typingInterval = null;

// Initialize AOS with a slight delay to ensure proper loading
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded');
    
    // Initialize AOS immediately
    AOS.init({
        duration: 800,
        easing: 'ease-out',
        once: true,
        offset: 100,
        disable: window.innerWidth < 768
    });

    // Start animations immediately
    initAnimations();
    
    // Make body visible immediately
    document.body.style.opacity = '1';
    
    // Handle loader with a shorter timeout
    const loader = document.querySelector('.loader');
    if (loader) {
        setTimeout(() => {
            console.log('Removing loader');
            loader.style.opacity = '0';
            loader.style.display = 'none';
            document.body.classList.add('loaded');
            // Trigger a resize event to fix any layout issues
            window.dispatchEvent(new Event('resize'));
        }, 1000); // Reduced to 1 second
    } else {
        console.log('No loader found');
        document.body.classList.add('loaded');
    }

    // Start typing animation if element exists
    if (typingText) {
        console.log('Starting typing animation');
        type();
    } else {
        console.log('Typing element not found');
    }
});

// Handle loading completion
function handleLoadingComplete() {
    const loader = document.querySelector('.loader');
    const body = document.body;

    if (!body.classList.contains('loaded')) {
        if (loader) {
            gsap.to(loader, {
                opacity: 0,
                duration: 0.5,
                onComplete: () => {
                    loader.style.display = 'none';
                    body.classList.add('loaded');
                    // Trigger a resize event to fix any layout issues
                    window.dispatchEvent(new Event('resize'));
                }
            });
        } else {
            body.classList.add('loaded');
        }
    }
}

// Initialize all animations with error handling
function initAnimations() {
    try {
        // Animate navigation items
        const navLinks = document.querySelectorAll('.nav-links li');
        if (navLinks.length) {
            gsap.from(navLinks, {
                opacity: 0,
                y: -20,
                duration: 0.5,
                stagger: 0.1,
                delay: 0.5
            });
        }

        // Animate hero section
        const heroElements = document.querySelectorAll('.hero-content > *');
        if (heroElements.length) {
            gsap.from(heroElements, {
                opacity: 0,
                y: 50,
                duration: 1,
                stagger: 0.2,
                delay: 0.8
            });
        }

        // Initialize vanilla-tilt with feature detection
        if (typeof VanillaTilt !== 'undefined') {
            const tiltElements = document.querySelectorAll('.project-card, .skill-item, .timeline-content');
            if (tiltElements.length) {
                VanillaTilt.init(tiltElements, {
                    max: 5,
                    speed: 400,
                    glare: true,
                    'max-glare': 0.2,
                    scale: 1.05
                });
            }
        }

        // Initialize skills animation
        initSkillsAnimation();

        // Initialize smooth scrolling
        initSmoothScrolling();
    } catch (error) {
        console.error('Error initializing animations:', error);
    }
}

// Skills animation
function initSkillsAnimation() {
    const skillsCategories = document.querySelectorAll('.skills-category');
    
    skillsCategories.forEach(category => {
        const skillsGrid = category.querySelector('.skills-grid');
        if (!skillsGrid) return;

        const skillItems = category.querySelectorAll('.skill-item');
        if (!skillItems.length) return;

        // Clone items for infinite scroll
        skillItems.forEach(item => {
            const clone = item.cloneNode(true);
            skillsGrid.appendChild(clone);
        });

        // Create the scrolling animation
        const tl = gsap.timeline({
            repeat: -1,
            defaults: { ease: 'none' }
        });

        tl.to(skillsGrid, {
            x: `-${50}%`,
            duration: 20,
            ease: 'none'
        });

        // Pause animation on hover
        skillsGrid.addEventListener('mouseenter', () => {
            tl.pause();
        });

        skillsGrid.addEventListener('mouseleave', () => {
            tl.play();
        });
    });
}

// Smooth scrolling initialization
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                // Close mobile menu if open
                navLinks.classList.remove('active');
                menuBtn.querySelector('i').classList.remove('fa-times');
                menuBtn.querySelector('i').classList.add('fa-bars');
                
                // Scroll to target
                target.scrollIntoView({
                    behavior: 'auto',
                    block: 'start',
                    inline: 'nearest'
                });
            }
        });
    });
}

// Enhanced typing animation with error handling and cleanup
function type() {
    try {
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
            isWaiting = true;
            clearInterval(typingInterval);
            typingInterval = setTimeout(() => {
                isDeleting = true;
                isWaiting = false;
                type();
            }, 2000);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            clearInterval(typingInterval);
            typingInterval = setTimeout(type, 200);
        } else {
            clearInterval(typingInterval);
            typingInterval = setTimeout(type, isDeleting ? 100 : 200);
        }
    } catch (error) {
        console.error('Error in typing animation:', error);
        clearInterval(typingInterval);
    }
}

// Contact Form Handling with validation
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        try {
            // Validate form
            const formData = new FormData(contactForm);
            const formProps = Object.fromEntries(formData);
            
            // Basic validation
            if (!formProps.name || formProps.name.length < 2) {
                throw new Error('Please enter a valid name (minimum 2 characters)');
            }
            
            if (!formProps.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formProps.email)) {
                throw new Error('Please enter a valid email address');
            }
            
            if (!formProps.subject || formProps.subject.length < 5) {
                throw new Error('Please enter a subject (minimum 5 characters)');
            }
            
            if (!formProps.message || formProps.message.length < 10) {
                throw new Error('Please enter a message (minimum 10 characters)');
            }

            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            // Here you would typically send the form data to your backend
            // For now, we'll simulate a successful submission
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Show success message
            gsap.to('.contact-container', {
                scale: 1.02,
                duration: 0.2,
                yoyo: true,
                repeat: 1,
                onComplete: () => {
                    // Reset form
                    contactForm.reset();
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    
                    // Show success message
                    alert('Message sent successfully!');
                }
            });
        } catch (error) {
            alert(error.message || 'An error occurred. Please try again.');
        }
    });
}

// Custom cursor
const cursor = {
    dot: document.querySelector('.cursor-dot'),
    outline: document.querySelector('.cursor-outline'),
    init: function() {
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

// GSAP Animations
gsap.registerPlugin(ScrollTrigger);

// Animate floating shapes
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

gsap.to('.shape-3', {
    x: 'random(-100, 100)',
    y: 'random(-100, 100)',
    rotation: 360,
    duration: 'random(20, 30)',
    repeat: -1,
    yoyo: true,
    ease: 'none'
});

// Animate sections on scroll
document.querySelectorAll('section').forEach(section => {
    gsap.from(section, {
        scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'top 20%',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 50,
        duration: 1
    });
});

// Add hover effect to cards using Vanilla-tilt
VanillaTilt.init(document.querySelectorAll('.project-card, .skill-item, .timeline-content'), {
    max: 5,
    speed: 400,
    glare: true,
    'max-glare': 0.2
});

// Handle skills center zoom effect
function handleSkillsZoom() {
    const skillsCategories = document.querySelectorAll('.skills-category');
    
    skillsCategories.forEach(category => {
        const skillsGrid = category.querySelector('.skills-grid');
        const skillItems = category.querySelectorAll('.skill-item');
        const centerX = category.offsetWidth / 2;
        
        function updateZoom() {
            skillItems.forEach(item => {
                const rect = item.getBoundingClientRect();
                const itemCenterX = rect.left + rect.width / 2;
                const categoryRect = category.getBoundingClientRect();
                const categoryCenterX = categoryRect.left + categoryRect.width / 2;
                
                // Calculate distance from center
                const distance = Math.abs(itemCenterX - categoryCenterX);
                
                // Add/remove center class based on position
                if (distance < rect.width) {
                    item.classList.add('center');
                } else {
                    item.classList.remove('center');
                }
            });
        }
        
        // Clone items for infinite scroll
        const itemsToClone = Array.from(skillItems);
        itemsToClone.forEach(item => {
            const clone = item.cloneNode(true);
            skillsGrid.appendChild(clone);
        });
        
        // Update zoom effect on animation frame
        function animate() {
            updateZoom();
            requestAnimationFrame(animate);
        }
        
        animate();
    });
}

// Initialize skills zoom effect
document.addEventListener('DOMContentLoaded', () => {
    handleSkillsZoom();
});

// Mobile Menu Functionality
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.querySelector('.mobile-menu');

if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        const icon = menuBtn.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });

    // Close menu when clicking a link
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            const icon = menuBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
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

// Disable animations on mobile devices
if (window.innerWidth < 768) {
    document.querySelectorAll('[data-aos]').forEach(element => {
        element.removeAttribute('data-aos');
    });
}

// Loader
document.addEventListener('DOMContentLoaded', () => {
    // Remove loader immediately when DOM is ready
    const loader = document.getElementById('loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }

    // Initialize AOS
    AOS.init({
        duration: 800,
        easing: 'ease-out',
        once: true,
        offset: 100
    });

    // Start typing animation
    if (typingText) {
        type();
    }
});

// Typing Animation
const typingElement = document.getElementById('typing');
const words = ['Network Engineer', 'Problem Solver', 'Tech Enthusiast'];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let isWaiting = false;

function type() {
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
        typingElement.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingElement.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === currentWord.length) {
        isWaiting = true;
        setTimeout(() => {
            isDeleting = true;
            isWaiting = false;
        }, 2000);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
    }

    const typingSpeed = isDeleting ? 100 : isWaiting ? 1000 : 200;
    setTimeout(type, typingSpeed);
}

// Mobile Menu Toggle
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.querySelector('.mobile-menu');

if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        menuBtn.innerHTML = mobileMenu.classList.contains('hidden') 
            ? '<i class="fas fa-bars"></i>' 
            : '<i class="fas fa-times"></i>';
    });
}

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
            // Close mobile menu if open
            if (mobileMenu) {
                mobileMenu.classList.add('hidden');
                if (menuBtn) {
                    menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                }
            }
        }
    });
});

// Cursor Follow Effect
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

if (cursorDot && cursorOutline) {
    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: "forwards" });
    });

    // Add hover effect to all interactive elements
    document.querySelectorAll('a, button, .hover\\:scale-105').forEach(elem => {
        elem.addEventListener('mouseenter', () => {
            cursorDot.style.transform = 'scale(0.5)';
            cursorOutline.style.transform = 'scale(1.5)';
        });
        
        elem.addEventListener('mouseleave', () => {
            cursorDot.style.transform = 'scale(1)';
            cursorOutline.style.transform = 'scale(1)';
        });
    });
}

// Form validation and submission
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
    });
}

// Initialize GSAP animations
if (typeof gsap !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    // Animate sections on scroll
    gsap.utils.toArray('section').forEach(section => {
        gsap.from(section, {
            opacity: 0,
            y: 50,
            duration: 1,
            scrollTrigger: {
                trigger: section,
                start: "top 80%",
                end: "top 50%",
                toggleActions: "play none none reverse"
            }
        });
    });
}

// Initialize Vanilla Tilt
if (typeof VanillaTilt !== 'undefined') {
    VanillaTilt.init(document.querySelectorAll(".project-card"), {
        max: 15,
        speed: 400,
        glare: true,
        "max-glare": 0.2
    });
} 
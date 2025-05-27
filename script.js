// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Page Load Animation (Hero Section)
const initPageLoadAnimations = () => {
    const tl = gsap.timeline();
    
    tl.from('.top1', {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power3.out'
    })
    .from('.p2', {
        opacity: 0,
        x: -50,
        duration: 0.8,
        ease: 'power2.out'
    }, '-=0.6')
    .from('.p3', {
        opacity: 0,
        x: 50,
        duration: 0.8,
        ease: 'power2.out'
    }, '-=0.6')
    .from('.btn2', {
        opacity: 0,
        scale: 0.8,
        duration: 0.6,
        ease: 'back.out(1.7)'
    }, '-=0.4')
    .from('.top3', {
        opacity: 0,
        scale: 0.9,
        duration: 1,
        ease: 'power2.out'
    }, '-=0.8');
};

// Responsive Navigation
const initMobileNav = () => {
    const nav = document.querySelector('.nav');
    const hamburger = document.createElement('div');
    hamburger.className = 'hamburger';
    hamburger.innerHTML = '<span></span><span></span><span></span>';
    
    const overlay = document.createElement('div');
    overlay.className = 'nav-overlay';
    
    nav.insertBefore(hamburger, nav.firstChild);
    document.body.appendChild(overlay);
    
    const toggleMenu = () => {
        nav.classList.toggle('nav-open');
        hamburger.classList.toggle('active');
        overlay.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
        
        if (nav.classList.contains('nav-open')) {
            gsap.from('.nav h5, .nav .con', {
                opacity: 0,
                y: 20,
                stagger: 0.1,
                duration: 0.4,
                ease: 'power2.out'
            });
        }
    };
    
    hamburger.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', toggleMenu);
};

// Scroll-triggered Animations
const initScrollAnimations = () => {
    // Animate sections on scroll
    const sections = ['.cunt3', '.cunt5', '.g1', '.m18', '.g19', '.e1'];
    
    sections.forEach(section => {
        gsap.from(section, {
            scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            opacity: 0,
            y: 50,
            duration: 1,
            ease: 'power2.out'
        });
    });
    
    // Animate stat numbers
    const stats = document.querySelectorAll('.b1 h1, .b2 h1, .b3 h1');
    stats.forEach(stat => {
        const value = parseInt(stat.textContent);
        gsap.to(stat, {
            scrollTrigger: {
                trigger: stat,
                start: 'top 80%'
            },
            textContent: value,
            duration: 2,
            snap: { textContent: 1 },
            ease: 'power1.out'
        });
    });
};

// Video Modal
const initVideoModal = () => {
    const playButton = document.querySelector('.m12');
    if (!playButton) return;
    
    const modal = document.createElement('div');
    modal.className = 'video-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <iframe width="560" height="315" src="" frameborder="0" allowfullscreen></iframe>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    const openModal = () => {
        modal.classList.add('active');
        gsap.to(modal, {
            opacity: 1,
            duration: 0.3,
            ease: 'power2.out'
        });
        const iframe = modal.querySelector('iframe');
        iframe.src = 'https://www.youtube.com/embed/YOUR_VIDEO_ID';
    };
    
    const closeModal = () => {
        gsap.to(modal, {
            opacity: 0,
            duration: 0.3,
            ease: 'power2.in',
            onComplete: () => {
                modal.classList.remove('active');
                modal.querySelector('iframe').src = '';
            }
        });
    };
    
    playButton.addEventListener('click', openModal);
    modal.querySelector('.close-modal').addEventListener('click', closeModal);
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
};

// Interactive FAQ
const initFAQ = () => {
    const faqItems = document.querySelectorAll('.x1, .x2, .x3, .x7');
    
    faqItems.forEach(item => {
        const header = item.querySelector('h2');
        const content = item.querySelector('p');
        const arrow = item.querySelector('img');
        
        if (header && content) {
            gsap.set(content, { height: 0, opacity: 0 });
            
            header.addEventListener('click', () => {
                const isOpen = item.classList.contains('active');
                
                // Close all other items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                        gsap.to(otherItem.querySelector('p'), {
                            height: 0,
                            opacity: 0,
                            duration: 0.3,
                            ease: 'power2.inOut'
                        });
                        gsap.to(otherItem.querySelector('img'), {
                            rotation: 0,
                            duration: 0.3
                        });
                    }
                });
                
                // Toggle current item
                item.classList.toggle('active');
                gsap.to(content, {
                    height: isOpen ? 0 : 'auto',
                    opacity: isOpen ? 0 : 1,
                    duration: 0.3,
                    ease: 'power2.inOut'
                });
                gsap.to(arrow, {
                    rotation: isOpen ? 0 : 180,
                    duration: 0.3
                });
            });
        }
    });
};

// Form Validation
const initFormValidation = () => {
    const form = document.querySelector('.y3');
    if (!form) return;
    
    const inputs = form.querySelectorAll('input');
    const submitButton = form.querySelector('button');
    
    const validateInput = (input) => {
        const value = input.value.trim();
        if (!value) {
            gsap.to(input, {
                borderColor: '#ff4444',
                boxShadow: '0 0 5px rgba(255, 68, 68, 0.3)',
                duration: 0.3
            });
            return false;
        }
        gsap.to(input, {
            borderColor: '#4CAF50',
            boxShadow: '0 0 5px rgba(76, 175, 80, 0.3)',
            duration: 0.3
        });
        return true;
    };
    
    inputs.forEach(input => {
        input.addEventListener('blur', () => validateInput(input));
    });
    
    submitButton.addEventListener('click', (e) => {
        e.preventDefault();
        let isValid = true;
        
        inputs.forEach(input => {
            if (!validateInput(input)) {
                isValid = false;
            }
        });
        
        if (isValid) {
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.textContent = 'Message sent successfully!';
            form.appendChild(successMessage);
            
            gsap.from(successMessage, {
                y: 20,
                opacity: 0,
                duration: 0.3,
                ease: 'power2.out'
            });
            
            inputs.forEach(input => {
                input.value = '';
            });
            
            setTimeout(() => {
                gsap.to(successMessage, {
                    y: -20,
                    opacity: 0,
                    duration: 0.3,
                    ease: 'power2.in',
                    onComplete: () => successMessage.remove()
                });
            }, 3000);
        }
    });
};

// Back to Top Button
const initBackToTop = () => {
    const button = document.createElement('button');
    button.className = 'back-to-top';
    button.innerHTML = '↑';
    document.body.appendChild(button);
    
    gsap.set(button, { opacity: 0, y: 20 });
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            gsap.to(button, {
                opacity: 1,
                y: 0,
                duration: 0.3,
                ease: 'power2.out'
            });
        } else {
            gsap.to(button, {
                opacity: 0,
                y: 20,
                duration: 0.3,
                ease: 'power2.in'
            });
        }
    });
    
    button.addEventListener('click', () => {
        gsap.to(window, {
            scrollTo: 0,
            duration: 1,
            ease: 'power2.inOut'
        });
    });
};

// Microinteractions
const initMicrointeractions = () => {
    // Button hover effects
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            gsap.to(button, {
                scale: 1.05,
                boxShadow: '0 5px 15px rgba(0,0,0,0.2)',
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        button.addEventListener('mouseleave', () => {
            gsap.to(button, {
                scale: 1,
                boxShadow: '0 0 0 rgba(0,0,0,0)',
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });
    
    // Image hover effects
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('mouseenter', () => {
            gsap.to(img, {
                scale: 1.05,
                rotation: 2,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        img.addEventListener('mouseleave', () => {
            gsap.to(img, {
                scale: 1,
                rotation: 0,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });
};

// Initialize all features
document.addEventListener('DOMContentLoaded', () => {
    initPageLoadAnimations();
    initMobileNav();
    initScrollAnimations();
    initVideoModal();
    initFAQ();
    initFormValidation();
    initBackToTop();
    initMicrointeractions();
}); 
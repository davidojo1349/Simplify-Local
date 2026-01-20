// Mobile Navigation Toggle
const mobileToggle = document.getElementById('mobileToggle');
const navLinks = document.getElementById('navLinks');

if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileToggle.innerHTML = navLinks.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });
}

// Navbar scroll effect
const mainNav = document.querySelector('.main-nav');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        mainNav.classList.add('scrolled');
    } else {
        mainNav.classList.remove('scrolled');
    }
});

// Niche navigation highlighting
const nicheButtons = document.querySelectorAll('.niche-btn');
const serviceSections = document.querySelectorAll('.service-block');

function highlightActiveNiche() {
    let currentSection = '';
    
    serviceSections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= (sectionTop - 200) && 
            window.scrollY < (sectionTop + sectionHeight - 200)) {
            currentSection = section.id;
        }
    });
    
    nicheButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('href').substring(1) === currentSection) {
            btn.classList.add('active');
        }
    });
}

window.addEventListener('scroll', highlightActiveNiche);

// Smooth scroll for niche buttons
nicheButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = button.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            window.scrollTo({
                top: targetSection.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Service card hover effects
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Newsletter form submission
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailInput = newsletterForm.querySelector('input[type="email"]');
        const email = emailInput.value;
        
        if (email) {
            // In a real application, you would send this to your server
            alert(`Thank you! We'll send business simplification tips to ${email}`);
            emailInput.value = '';
        }
    });
}

// Initialize with first niche active
document.addEventListener('DOMContentLoaded', () => {
    highlightActiveNiche();
    
    // ========== ADD THESE 2 LINES ==========
    fixButtonActiveStates();
    initPageSpecificFeatures();
    // =======================================
    
    // Rest of your existing code stays exactly as it is...
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe service cards and process steps
    document.querySelectorAll('.service-card, .process-step, .price-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(el);
    });
});

// Contact Form Submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // In a real application, you would send this to your server
        console.log('Form submitted:', data);
        
        // Show success message
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
        submitBtn.style.background = '#10B981';
        
        // Reset form
        contactForm.reset();
        
        // Reset button after 3 seconds
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.style.background = '';
        }, 3000);
    });
}

// FAQ Accordion
const faqQuestions = document.querySelectorAll('.faq-question');
if (faqQuestions.length > 0) {
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            const isActive = answer.classList.contains('active');
            
            // Close all FAQ answers
            document.querySelectorAll('.faq-answer').forEach(ans => {
                ans.classList.remove('active');
            });
            
            // Remove active class from all questions
            document.querySelectorAll('.faq-question').forEach(q => {
                q.classList.remove('active');
            });
            
            // Toggle current answer if it wasn't active
            if (!isActive) {
                answer.classList.add('active');
                question.classList.add('active');
            }
        });
    });
}

// Newsletter form on all pages
const newsletterForms = document.querySelectorAll('.newsletter-form');
newsletterForms.forEach(form => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailInput = form.querySelector('input[type="email"]');
        const email = emailInput.value;
        
        if (email) {
            // In a real application, you would send this to your server
            console.log('Newsletter subscription:', email);
            
            // Show success feedback
            const button = form.querySelector('button');
            const originalHTML = button.innerHTML;
            
            button.innerHTML = '<i class="fas fa-check"></i>';
            button.style.background = '#10B981';
            
            setTimeout(() => {
                button.innerHTML = originalHTML;
                button.style.background = '';
            }, 2000);
            
            emailInput.value = '';
        }
    });
});

// Testimonial slider (for future enhancement)
function initTestimonialSlider() {
    const testimonialGrid = document.querySelector('.testimonial-grid');
    if (!testimonialGrid) return;
    
    // Could add auto-rotation of testimonials here
    // This is a placeholder for future enhancement
}

// Form validation
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Page-specific initialization
document.addEventListener('DOMContentLoaded', () => {
    // Initialize testimonial slider on homepage
    if (document.querySelector('.testimonial-grid')) {
        initTestimonialSlider();
    }
    
    // Open first FAQ item on contact page
    if (document.querySelector('.faq-item')) {
        const firstQuestion = document.querySelector('.faq-question');
        if (firstQuestion) {
            firstQuestion.click();
        }
    }
    
    // Add smooth scroll for homepage buttons
    const homepageButtons = document.querySelectorAll('[href="#how-it-works"]');
    homepageButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.getElementById('how-it-works');
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Enhanced scroll animations
const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            
            // Stagger children animations
            if (entry.target.classList.contains('services-grid') || 
                entry.target.classList.contains('values-grid') ||
                entry.target.classList.contains('team-grid')) {
                const children = entry.target.children;
                Array.from(children).forEach((child, index) => {
                    child.style.transitionDelay = `${index * 0.1}s`;
                });
            }
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// Observe more elements on all pages
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.service-preview, .testimonial-card, .value-card, .team-member, .comparison-item, .info-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        scrollObserver.observe(el);
    });
});

// FAQ Accordion for Book Call Page
function initBookCallPage() {
    // FAQ Accordion
    const faqQuestions = document.querySelectorAll('.faq-book .faq-question');
    
    if (faqQuestions.length > 0) {
        faqQuestions.forEach(question => {
            question.addEventListener('click', () => {
                const answer = question.nextElementSibling;
                const icon = question.querySelector('i');
                
                // Toggle current FAQ
                if (answer.style.display === 'block') {
                    answer.style.display = 'none';
                    icon.classList.remove('fa-chevron-up');
                    icon.classList.add('fa-chevron-down');
                } else {
                    answer.style.display = 'block';
                    icon.classList.remove('fa-chevron-down');
                    icon.classList.add('fa-chevron-up');
                }
            });
        });
    }
    
    // Calendly fallback button
    const openCalendlyBtn = document.getElementById('openCalendly');
    if (openCalendlyBtn) {
        openCalendlyBtn.addEventListener('click', function(e) {
            e.preventDefault();
            if (typeof Calendly !== 'undefined') {
                Calendly.initPopupWidget({url: 'https://calendly.com/simplifylocal/free-consultation'});
            }
            return false;
        });
    }
}

// Initialize when DOM is loaded
if (document.querySelector('.page-book-call')) {
    document.addEventListener('DOMContentLoaded', initBookCallPage);
}

// ========== NEW FUNCTIONS TO ADD ==========

// Fix for button active states to prevent fading
function fixButtonActiveStates() {
    const buttons = document.querySelectorAll('.button, .btn-primary, .btn-secondary, .price-btn, .niche-btn');
    
    buttons.forEach(button => {
        button.style.webkitTapHighlightColor = 'transparent';
        
        button.addEventListener('mousedown', function(e) {
            this.classList.add('button-pressed');
        });
        
        button.addEventListener('mouseup', function() {
            this.classList.remove('button-pressed');
        });
        
        button.addEventListener('mouseleave', function() {
            this.classList.remove('button-pressed');
        });
        
        button.addEventListener('touchstart', function(e) {
            e.preventDefault();
            this.classList.add('button-pressed');
        });
        
        button.addEventListener('touchend', function(e) {
            e.preventDefault();
            this.classList.remove('button-pressed');
        });
    });
}

// Calendly integration for book-call page
function initCalendlyIntegration() {
    const isBookCallPage = window.location.pathname.includes('book-call') || 
                          document.querySelector('.booking-calendar');
    
    if (!isBookCallPage) return;
    
    if (typeof Calendly === 'undefined') {
        const script = document.createElement('script');
        script.src = 'https://assets.calendly.com/assets/external/widget.js';
        script.async = true;
        document.head.appendChild(script);
    }
    
    function initCalendly() {
        if (typeof Calendly !== 'undefined') {
            const calendlyWidget = document.getElementById('calendly-widget');
            if (calendlyWidget) {
                Calendly.initInlineWidget({
                    url: 'https://calendly.com/simplifylocal/free-consultation',
                    parentElement: calendlyWidget,
                    prefill: {},
                    utm: {}
                });
            }
            
            const openCalendlyBtn = document.getElementById('openCalendly');
            if (openCalendlyBtn) {
                openCalendlyBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    Calendly.initPopupWidget({url: 'https://calendly.com/simplifylocal/free-consultation'});
                    return false;
                });
            }
        }
    }
    
    if (typeof Calendly !== 'undefined') {
        initCalendly();
    } else {
        const checkCalendly = setInterval(() => {
            if (typeof Calendly !== 'undefined') {
                clearInterval(checkCalendly);
                initCalendly();
            }
        }, 500);
        
        setTimeout(() => {
            clearInterval(checkCalendly);
            const fallbackElement = document.querySelector('.calendar-fallback');
            if (fallbackElement) {
                fallbackElement.style.display = 'block';
            }
        }, 10000);
    }
}

// Page-specific initialization
function initPageSpecificFeatures() {
    const path = window.location.pathname;
    const pageName = path.split('/').pop().split('.')[0];
    
    switch(pageName) {
        case 'book-call':
        case 'book-call.html':
            initCalendlyIntegration();
            
            setTimeout(() => {
                const firstFAQ = document.querySelector('.faq-book .faq-question');
                if (firstFAQ) {
                    firstFAQ.click();
                }
            }, 500);
            break;
            
        case 'contact':
        case 'contact.html':
            setTimeout(() => {
                const firstFAQ = document.querySelector('.faq-question');
                if (firstFAQ) {
                    firstFAQ.click();
                }
            }, 500);
            break;
    }
}
// ========== EMAILJS CONFIGURATION ==========
// Replace these with your actual EmailJS IDs
window.EMAILJS_CONFIG = {
    USER_ID: 'OAu2A8_bcxDNyZT7y',
    SERVICE_ID: 'service_gq205g3',
    TEMPLATE_ID: 'template_5btqf7q'
};

console.log('EmailJS Config:', window.EMAILJS_CONFIG);

// Initialize EmailJS
if (EMAILJS_CONFIG.USER_ID) {
    emailjs.init(EMAILJS_CONFIG.USER_ID);
    console.log('EmailJS initialized with User ID:', EMAILJS_CONFIG.USER_ID);
} else {
    console.warn('EmailJS not initialized - missing User ID');
}

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

// ========== CONTACT FORM HANDLER ==========
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Validate required fields
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const business = document.getElementById('business').value;
        const message = document.getElementById('message').value.trim();
        
        if (!name || !email || !business || !message) {
            alert('Please fill in all required fields (*)');
            return;
        }
        
        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address');
            return;
        }
        
        // Get form button and show loading
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        const originalBg = submitBtn.style.background;
        
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        submitBtn.style.background = '#6B7280';
        
        try {
            // Prepare email data
            const templateParams = {
                from_name: name,
                from_email: email,
                phone: document.getElementById('phone').value.trim() || 'Not provided',
                business_type: document.querySelector(`#business option[value="${business}"]`).text,
                message: message,
                date: new Date().toLocaleString('en-IE', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    timeZone: 'Europe/Dublin'
                })
            };
            
            console.log('Sending email with params:', templateParams);
            
            // Send email via EmailJS
    const response = await emailjs.send(
    window.EMAILJS_CONFIG.SERVICE_ID,      // ✅ Use window.
    window.EMAILJS_CONFIG.TEMPLATE_ID,     // ✅ Use window.
    templateParams
    );
            
            // SUCCESS
            console.log('EmailJS Response:', response);
            
            // Update button to success state
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
            submitBtn.style.background = '#10B981';
            
            // Show success message
            showFormMessage(
                'Thank you! Your message has been sent successfully. We\'ll get back to you within 24 hours.',
                'success'
            );
            
            // Reset form after delay
            setTimeout(() => {
                contactForm.reset();
            }, 2000);
            
        } catch (error) {
            // ERROR
            console.error('EmailJS Error:', error);
            
            // Update button to error state
            submitBtn.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Failed to Send';
            submitBtn.style.background = '#EF4444';
            
            // Show error message
            let errorMsg = 'Sorry, there was an error sending your message. ';
            
            if (error.text && error.text.includes('Invalid login')) {
                errorMsg += 'Email service configuration error.';
            } else if (error.text && error.text.includes('quota')) {
                errorMsg += 'Email limit reached. Please try again later.';
            } else {
                errorMsg += 'Please try again or email us directly at info@simplifylocal.ie';
            }
            
            showFormMessage(errorMsg, 'error');
            
        } finally {
            // Reset button after 5 seconds
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.style.background = originalBg;
                submitBtn.disabled = false;
            }, 5000);
        }
    });
}

// ========== HELPER FUNCTION ==========
function showFormMessage(message, type = 'success') {
    // Remove any existing messages
    const existingMsg = document.querySelector('.form-message');
    if (existingMsg) {
        existingMsg.remove();
    }
    
    // Create message element
    const messageEl = document.createElement('div');
    messageEl.className = `form-message ${type}`;
    messageEl.innerHTML = `
        <p>${message}</p>
        <button class="close-message">&times;</button>
    `;
    
    // Add styles
    messageEl.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        background: ${type === 'success' ? '#10B981' : '#EF4444'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: space-between;
        min-width: 300px;
        max-width: 400px;
        animation: slideIn 0.3s ease;
    `;
    
    // Add close button
    const closeBtn = messageEl.querySelector('.close-message');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 24px;
        cursor: pointer;
        padding: 0 0 0 20px;
        line-height: 1;
    `;
    
    closeBtn.addEventListener('click', () => {
        messageEl.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => messageEl.remove(), 300);
    });
    
    // Add animations if not already present
    if (!document.querySelector('#form-message-animations')) {
        const style = document.createElement('style');
        style.id = 'form-message-animations';
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Auto-remove after 7 seconds
    setTimeout(() => {
        if (document.body.contains(messageEl)) {
            messageEl.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => messageEl.remove(), 300);
        }
    }, 7000);
    
    // Add to page
    document.body.appendChild(messageEl);
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
// Fix button active states (add this function)
function fixButtonFading() {
    const buttons = document.querySelectorAll('.nav-links .button, a.button');
    
    buttons.forEach(button => {
        // Prevent default on mousedown
        button.addEventListener('mousedown', function(e) {
            e.preventDefault();
            this.style.transition = 'none';
            this.style.opacity = '1';
            this.style.transform = 'translateY(2px)';
            this.style.backgroundColor = '#45a049';
        });
        
        button.addEventListener('mouseup', function() {
            this.style.transition = 'background-color 0.3s ease, transform 0.2s ease';
            this.style.transform = '';
            setTimeout(() => {
                this.style.backgroundColor = '';
            }, 200);
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transition = 'background-color 0.3s ease, transform 0.2s ease';
            this.style.transform = '';
            this.style.backgroundColor = '';
        });
        
        // For touch devices
        button.addEventListener('touchstart', function(e) {
            e.preventDefault();
            this.style.transition = 'none';
            this.style.opacity = '1';
            this.style.transform = 'scale(0.98)';
            this.style.backgroundColor = '#45a049';
        });
        
        button.addEventListener('touchend', function(e) {
            e.preventDefault();
            this.style.transition = 'background-color 0.3s ease, transform 0.2s ease';
            this.style.transform = '';
            setTimeout(() => {
                this.style.backgroundColor = '';
            }, 200);
        });
    });
}

// Call it in your DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    // ... your existing code ...
    
    // Add this line:
    fixButtonFading();
    
    // ... rest of your existing code ...
});

// Debug function - run in browser console
function debugEmailJS() {
    console.log('=== EmailJS Debug ===');
    console.log('1. EmailJS loaded:', typeof emailjs);
    console.log('2. Config:', window.EMAILJS_CONFIG);
    console.log('3. User ID:', window.EMAILJS_CONFIG.USER_ID);
    console.log('4. Service ID:', window.EMAILJS_CONFIG.SERVICE_ID);
    console.log('5. Template ID:', window.EMAILJS_CONFIG.TEMPLATE_ID);
    
    // Test send
    if (window.EMAILJS_CONFIG.SERVICE_ID && window.EMAILJS_CONFIG.TEMPLATE_ID) {
        console.log('Testing email send...');
        
        emailjs.send(
            window.EMAILJS_CONFIG.SERVICE_ID,
            window.EMAILJS_CONFIG.TEMPLATE_ID,
            {
                from_name: 'Test User',
                from_email: 'test@example.com',
                phone: 'Test Phone',
                business_type: 'Personal Trainer',
                message: 'Test message from debug function',
                date: new Date().toLocaleString()
            }
        )
        .then(response => {
            console.log('✅ Email sent successfully:', response);
            alert('Test email sent! Check your Gmail.');
        })
        .catch(error => {
            console.error('❌ Email send failed:', error);
            console.log('Error details:', error.text || error.message);
            alert('Failed: ' + (error.text || error.message));
        });
    } else {
        console.error('Missing Service ID or Template ID');
    }
}
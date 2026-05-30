/* ==========================================
   INITIALIZATION & DOCUMENT READY
   ========================================== */

document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    setupEventListeners();
    setupAnimations();
    loadingScreen();
}

/* ==========================================
   LOADING SCREEN
   ========================================== */

function loadingScreen() {
    const loading = document.getElementById('loading');
    setTimeout(() => {
        loading.classList.add('hidden');
    }, 1500);
}

/* ==========================================
   NAVIGATION SETUP
   ========================================== */

function setupEventListeners() {
    // Hamburger Menu
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }

    // Close menu when clicking nav links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
        });
    });

    // Hero Section Buttons
    const bookPickupBtn = document.getElementById('bookPickupBtn');
    const viewServicesBtn = document.getElementById('viewServicesBtn');
    
    if (bookPickupBtn) {
        bookPickupBtn.addEventListener('click', function() {
            openBookingModal('Full Service');
        });
    }

    if (viewServicesBtn) {
        viewServicesBtn.addEventListener('click', function() {
            document.getElementById('services').scrollIntoView({ behavior: 'smooth' });
        });
    }

    // FAQ Accordion
    setupFAQAccordion();

    // Contact Form
    setupContactForm();

    // Booking Form
    setupBookingForm();

    // Scroll to Top Button
    setupScrollToTop();

    // Counter Animation
    animateCounters();
}

/* ==========================================
   ANIMATED COUNTER
   ========================================== */

function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200;

    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                const increment = target / speed;
                
                let current = 0;
                const updateCount = () => {
                    current += increment;
                    if (current < target) {
                        counter.textContent = Math.floor(current);
                        requestAnimationFrame(updateCount);
                    } else {
                        counter.textContent = target;
                    }
                };
                
                updateCount();
                observer.unobserve(counter);
            }
        });
    }, observerOptions);

    counters.forEach(counter => observer.observe(counter));
}

/* ==========================================
   FAQ ACCORDION
   ========================================== */

function setupFAQAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
}

/* ==========================================
   CONTACT FORM
   ========================================== */

function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const service = document.getElementById('service').value;
            const message = document.getElementById('message').value;
            
            // WhatsApp Integration (You can replace this with your backend)
            const whatsappMessage = `Hi Tita's FreshFold!\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nService: ${service}\n\nMessage:\n${message}`;
            const whatsappURL = `https://wa.me/09997644838?text=${encodeURIComponent(whatsappMessage)}`;
            
            // Show success message
            alert('Thank you for your message! We will get back to you soon.');
            
            // Reset form
            contactForm.reset();
            
            // Optional: Open WhatsApp
            // window.open(whatsappURL, '_blank');
        });
    }
}

/* ==========================================
   BOOKING MODAL
   ========================================== */

function openBookingModal(serviceName = '') {
    const modal = document.getElementById('bookingModal');
    const bookService = document.getElementById('bookService');
    
    if (modal) {
        modal.classList.add('active');
        
        // Set service if provided
        if (serviceName) {
            bookService.value = serviceName;
        }
    }
}

function closeBookingModal() {
    const modal = document.getElementById('bookingModal');
    if (modal) {
        modal.classList.remove('active');
    }
}

// Close modal when clicking outside
window.addEventListener('click', function(e) {
    const modal = document.getElementById('bookingModal');
    if (e.target === modal) {
        closeBookingModal();
    }
});

function setupBookingForm() {
    const bookingForm = document.getElementById('bookingForm');
    
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const service = document.getElementById('bookService').value;
            const name = document.getElementById('bookName').value;
            const phone = document.getElementById('bookPhone').value;
            const date = document.getElementById('bookDate').value;
            const time = document.getElementById('bookTime').value;
            const delivery = document.getElementById('bookDelivery').checked;
            const address = document.getElementById('bookAddress').value;
            const notes = document.getElementById('bookNotes').value;
            
            // Create booking message
            let bookingMessage = `📋 LAUNDRY BOOKING REQUEST\n\n`;
            bookingMessage += `Service: ${service}\n`;
            bookingMessage += `Name: ${name}\n`;
            bookingMessage += `Phone: ${phone}\n`;
            bookingMessage += `Date: ${date}\n`;
            bookingMessage += `Time: ${time}\n`;
            
            if (delivery) {
                bookingMessage += `Delivery Address: ${address}\n`;
            }
            
            if (notes) {
                bookingMessage += `Notes: ${notes}\n`;
            }
            
            // Show success message
            alert('Booking request submitted! We will contact you shortly to confirm.');
            
            // Send to WhatsApp (optional)
            const whatsappURL = `https://wa.me/09997644838?text=${encodeURIComponent(bookingMessage)}`;
            // window.open(whatsappURL, '_blank');
            
            // Reset form and close modal
            bookingForm.reset();
            closeBookingModal();
        });
    }
}

/* ==========================================
   SCROLL TO TOP BUTTON
   ========================================== */

function setupScrollToTop() {
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    
    if (scrollTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                scrollTopBtn.classList.add('show');
            } else {
                scrollTopBtn.classList.remove('show');
            }
        });
        
        scrollTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

/* ==========================================
   ANIMATIONS SETUP
   ========================================== */

function setupAnimations() {
    // Fade in elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe service cards, feature items, etc.
    const elementsToObserve = document.querySelectorAll(
        '.service-card, .feature-item, .testimonial-card, .faq-item, .contact-item'
    );

    elementsToObserve.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

/* ==========================================
   SMOOTH SCROLL FOR INTERNAL LINKS
   ========================================== */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '#!' && document.querySelector(href)) {
            e.preventDefault();
            const target = document.querySelector(href);
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

/* ==========================================
   UTILITY FUNCTIONS
   ========================================== */

// Format phone number
function formatPhoneNumber(phoneNumber) {
    const cleaned = phoneNumber.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{4})(\d{3})(\d{4})$/);
    if (match) {
        return `${match[1]}-${match[2]}-${match[3]}`;
    }
    return phoneNumber;
}

// Format currency
function formatCurrency(amount) {
    return `₱${amount.toLocaleString('en-PH')}`;
}

// Validate email
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Validate phone number
function validatePhoneNumber(phone) {
    const re = /^[0-9]{10,15}$/;
    const cleaned = phone.replace(/\D/g, '');
    return re.test(cleaned);
}

/* ==========================================
   ERROR HANDLING
   ========================================== */

// Global error handler
window.addEventListener('error', function(e) {
    console.error('Global error:', e.error);
});

// Handle form validation errors
function showErrorMessage(element, message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    errorDiv.style.color = '#e74c3c';
    errorDiv.style.fontSize = '0.85rem';
    errorDiv.style.marginTop = '0.25rem';
    
    if (element.parentElement) {
        element.parentElement.appendChild(errorDiv);
    }
}

function clearErrorMessages() {
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(msg => msg.remove());
}

/* ==========================================
   PERFORMANCE OPTIMIZATIONS
   ========================================== */

// Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

/* ==========================================
   ACCESSIBILITY IMPROVEMENTS
   ========================================== */

// Add keyboard navigation for modals
document.addEventListener('keydown', function(e) {
    const modal = document.getElementById('bookingModal');
    if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
        closeBookingModal();
    }
});

// Focus management
function manageFocus(elementSelector) {
    const element = document.querySelector(elementSelector);
    if (element) {
        element.focus();
    }
}

/* ==========================================
   ANALYTICS & TRACKING (Optional)
   ========================================== */

// Track button clicks
function trackEvent(eventName, eventData = {}) {
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, eventData);
    }
}

// Track service selections
document.querySelectorAll('.btn-service').forEach(btn => {
    btn.addEventListener('click', function() {
        const serviceName = this.closest('.service-card').querySelector('h3').textContent;
        trackEvent('service_selected', { service: serviceName });
    });
});

/* ==========================================
   DYNAMIC PRICING DISPLAY
   ========================================== */

function updatePricingDisplay() {
    const services = [
        { name: 'Wash Only', price: 70 },
        { name: 'Dry Only', price: 80 },
        { name: 'Full Service', price: 200 }
    ];

    return services;
}

/* ==========================================
   SERVICE BOOKING HELPER
   ========================================== */

function getServiceDetails(serviceName) {
    const services = {
        'Wash Only': {
            price: 70,
            description: 'Professional washing with premium detergent',
            features: ['Premium detergent', 'Professional care', 'Max 8kg per load']
        },
        'Dry Only': {
            price: 80,
            description: 'Expert drying to preserve fabric quality',
            features: ['Fabric safe', 'Gentle heat', 'Quick drying']
        },
        'Full Service': {
            price: 200,
            description: 'Complete laundry care with everything included',
            features: ['Wash & dry', 'Premium detergent', 'Fabcon softener', 'Neat folding']
        }
    };

    return services[serviceName] || null;
}

/* ==========================================
   CONTACT INFORMATION
   ========================================== */

const businessInfo = {
    name: "Tita's FreshFold Laundry Shop",
    tagline: "Fresh clothes, fresh start",
    phone: "09997644838",
    facebook: "https://www.facebook.com/Tita's FreshFold",
    address: "Blk 84 Lot 28 Bulaon, City of San Fernando, Pampanga",
    hours: {
        open: "7:00 AM",
        close: "7:00 PM",
        everyday: true
    },
    maxLoadCapacity: "8kg",
    services: [
        { name: 'Wash Only', price: 70 },
        { name: 'Dry Only', price: 80 },
        { name: 'Full Service', price: 200 }
    ]
};

/* ==========================================
   WHATSAPP INTEGRATION
   ========================================== */

function openWhatsApp(message = '') {
    const phone = '09997644838';
    const encodedMessage = encodeURIComponent(message || 'Hello! I would like to inquire about your laundry services.');
    const whatsappURL = `https://wa.me/${phone}?text=${encodedMessage}`;
    window.open(whatsappURL, '_blank');
}

/* ==========================================
   FACEBOOK INTEGRATION
   ========================================== */

function openFacebook() {
    window.open("https://www.facebook.com/Tita's FreshFold", '_blank');
}

/* ==========================================
   CALL FUNCTION
   ========================================== */

function callBusiness() {
    window.location.href = 'tel:09997644838';
}

/* ==========================================
   NOTIFICATION SYSTEM
   ========================================== */

function showNotification(message, type = 'success', duration = 3000) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: ${type === 'success' ? '#27ae60' : '#e74c3c'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 1001;
        animation: slideInRight 0.3s ease;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, duration);
}

/* ==========================================
   DOCUMENT READY STATE
   ========================================== */

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}
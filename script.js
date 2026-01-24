/* ========================================
HAWAA LANDING PAGE - JAVASCRIPT
Mobile-First Approach
======================================== */

// Wait for DOM to be fully loaded
document.addEventListener(‘DOMContentLoaded’, function() {

```
// Initialize GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// ========================================
// SECTION 0: HEADER FUNCTIONALITY
// ========================================

const header = document.getElementById('header');
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const headerNav = document.getElementById('headerNav');

// Header scroll effect
window.addEventListener('scroll', function() {
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Mobile menu toggle
mobileMenuToggle.addEventListener('click', function() {
    this.classList.toggle('active');
    headerNav.classList.toggle('mobile-active');
    
    // Prevent body scroll when menu is open
    if (headerNav.classList.contains('mobile-active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
});

// Close mobile menu when clicking a nav link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', function() {
        mobileMenuToggle.classList.remove('active');
        headerNav.classList.remove('mobile-active');
        document.body.style.overflow = '';
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', function(event) {
    const isClickInsideNav = headerNav.contains(event.target);
    const isClickOnToggle = mobileMenuToggle.contains(event.target);
    
    if (!isClickInsideNav && !isClickOnToggle && headerNav.classList.contains('mobile-active')) {
        mobileMenuToggle.classList.remove('active');
        headerNav.classList.remove('mobile-active');
        document.body.style.overflow = '';
    }
});

// ========================================
// SECTION 1: HERO ANIMATIONS
// ========================================

// Enhanced product floating animation with GSAP
const heroProduct = document.querySelector('.hero-product-img');
if (heroProduct) {
    gsap.to(heroProduct, {
        y: -15,
        duration: 3,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true
    });
    
    // Parallax effect on scroll (only on desktop)
    if (window.innerWidth >= 768) {
        gsap.to('.hero-product', {
            y: 100,
            ease: "none",
            scrollTrigger: {
                trigger: ".hero-section",
                start: "top top",
                end: "bottom top",
                scrub: 1
            }
        });
    }
}

// Trust indicators stagger animation on scroll
gsap.from('.trust-item', {
    opacity: 0,
    y: 20,
    stagger: 0.1,
    duration: 0.5,
    scrollTrigger: {
        trigger: '.trust-indicators',
        start: 'top 80%',
        once: true
    }
});

// ========================================
// CALCULATOR MODAL (Placeholder)
// ========================================

const calculatorBtn = document.getElementById('openCalculator');
if (calculatorBtn) {
    calculatorBtn.addEventListener('click', function() {
        alert('Room Size Calculator will open here (Section 8 functionality)');
        // This will be replaced with actual modal in Section 8
    });
}

// ========================================
// CTA BUTTON CLICK HANDLERS
// ========================================

const primaryCTAs = document.querySelectorAll('.btn-primary');
primaryCTAs.forEach(button => {
    // Skip calculator button
    if (button.id === 'openCalculator') return;
    
    button.addEventListener('click', function() {
        // Track click event (integrate with analytics later)
        console.log('CTA Clicked: Shop Now');
        
        // Scroll to checkout/product section or redirect to shop
        // For now, showing alert
        alert('Redirecting to checkout... (Add checkout URL here)');
        // window.location.href = '/checkout';
    });
});

// ========================================
// SMOOTH SCROLL FOR NAVIGATION LINKS
// ========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // Skip if href is just "#"
        if (href === '#') {
            e.preventDefault();
            return;
        }
        
        const targetElement = document.querySelector(href);
        
        if (targetElement) {
            e.preventDefault();
            
            const headerHeight = header.offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ========================================
// IMAGE LOADING ERROR HANDLING
// ========================================

const productImg = document.querySelector('.hero-product-img');
if (productImg) {
    productImg.addEventListener('error', function() {
        // Show placeholder if image fails to load
        this.style.display = 'none';
        const placeholder = this.nextElementSibling;
        if (placeholder && placeholder.classList.contains('product-placeholder-box')) {
            placeholder.style.display = 'flex';
        }
    });
    
    productImg.addEventListener('load', function() {
        // Hide placeholder if image loads successfully
        const placeholder = this.nextElementSibling;
        if (placeholder && placeholder.classList.contains('product-placeholder-box')) {
            placeholder.style.display = 'none';
        }
    });
}

// ========================================
// ACCESSIBILITY ENHANCEMENTS
// ========================================

// Add keyboard navigation for buttons
const allButtons = document.querySelectorAll('button');
allButtons.forEach(button => {
    button.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.click();
        }
    });
});

// Focus trap for mobile menu
function trapFocus(element) {
    const focusableElements = element.querySelectorAll(
        'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled])'
    );
    
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];
    
    element.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstFocusable) {
                    e.preventDefault();
                    lastFocusable.focus();
                }
            } else {
                if (document.activeElement === lastFocusable) {
                    e.preventDefault();
                    firstFocusable.focus();
                }
            }
        }
        
        if (e.key === 'Escape') {
            mobileMenuToggle.click();
        }
    });
}

// Apply focus trap when mobile menu is open
const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        if (mutation.attributeName === 'class') {
            if (headerNav.classList.contains('mobile-active')) {
                trapFocus(headerNav);
                // Focus first nav link
                const firstLink = headerNav.querySelector('.nav-link');
                if (firstLink) {
                    setTimeout(() => firstLink.focus(), 100);
                }
            }
        }
    });
});

observer.observe(headerNav, { attributes: true });

// ========================================
// PERFORMANCE: REDUCE MOTION FOR USERS WHO PREFER IT
// ========================================

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (prefersReducedMotion.matches) {
    // Disable GSAP animations
    gsap.globalTimeline.clear();
    
    // Remove CSS animations
    const style = document.createElement('style');
    style.textContent = `
        *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
        }
    `;
    document.head.appendChild(style);
}

// ========================================
// RESPONSIVE IMAGE LOADING
// ========================================

// Load appropriate image size based on viewport
function loadResponsiveImages() {
    const images = document.querySelectorAll('img[data-src-mobile], img[data-src-tablet], img[data-src-desktop]');
    
    images.forEach(img => {
        let srcToUse;
        
        if (window.innerWidth >= 1024 && img.dataset.srcDesktop) {
            srcToUse = img.dataset.srcDesktop;
        } else if (window.innerWidth >= 768 && img.dataset.srcTablet) {
            srcToUse = img.dataset.srcTablet;
        } else if (img.dataset.srcMobile) {
            srcToUse = img.dataset.srcMobile;
        }
        
        if (srcToUse && img.src !== srcToUse) {
            img.src = srcToUse;
        }
    });
}

// Load on page load
loadResponsiveImages();

// Reload on resize (debounced)
let resizeTimeout;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(loadResponsiveImages, 250);
});

// ========================================
// ANALYTICS TRACKING (Placeholder)
// ========================================

function trackEvent(eventName, eventData = {}) {
    console.log('Event tracked:', eventName, eventData);
    
    // Integrate with Google Analytics, Meta Pixel, etc.
    // Example for GA4:
    // if (window.gtag) {
    //     gtag('event', eventName, eventData);
    // }
    
    // Example for Meta Pixel:
    // if (window.fbq) {
    //     fbq('track', eventName, eventData);
    // }
}

// Track page view
trackEvent('page_view', {
    page_title: document.title,
    page_location: window.location.href
});

// Track scroll depth
let scrollDepthTracked = {
    25: false,
    50: false,
    75: false,
    100: false
};

window.addEventListener('scroll', function() {
    const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    
    Object.keys(scrollDepthTracked).forEach(depth => {
        if (scrollPercent >= parseInt(depth) && !scrollDepthTracked[depth]) {
            scrollDepthTracked[depth] = true;
            trackEvent('scroll_depth', { depth: `${depth}%` });
        }
    });
});

console.log('Hawaa Landing Page initialized successfully! 🌬️');
```

});

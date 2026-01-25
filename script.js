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
// ========================================
// SECTION 2: CRISIS SECTION FUNCTIONALITY
// ========================================

```
// Scroll-triggered animations for Crisis Section
ScrollTrigger.create({
    trigger: ".crisis-section",
    start: "top 60%",
    onEnter: () => {
        // Animate headline
        gsap.to(".crisis-headline", {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power2.out"
        });
        
        // Animate body text
        gsap.to(".crisis-body", {
            opacity: 1,
            x: 0,
            duration: 0.8,
            delay: 0.2,
            ease: "power2.out"
        });
        
        // Animate AQI widget
        gsap.to(".aqi-widget", {
            opacity: 1,
            scale: 1,
            duration: 0.6,
            delay: 0.4,
            ease: "back.out(1.2)"
        });
        
        // Animate stat numbers counting up
        document.querySelectorAll('.stat-number').forEach(stat => {
            const finalValue = parseFloat(stat.dataset.value);
            animateValue(stat, 0, finalValue, 2000);
        });
        
        // Auto-play crisis video if available
        const crisisVideo = document.getElementById('crisisVideo');
        if (crisisVideo && crisisVideo.readyState >= 2) {
            crisisVideo.play().catch(err => {
                console.log('Video autoplay prevented:', err);
            });
        }
    }
});

// Number animation function (count up effect)
function animateValue(element, start, end, duration) {
    const isDecimal = end % 1 !== 0;
    const isLarge = end > 100;
    let startTimestamp = null;
    
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        
        let current = progress * (end - start) + start;
        
        // Format based on number type
        if (isDecimal) {
            element.textContent = current.toFixed(1);
        } else if (isLarge) {
            element.textContent = Math.floor(current) + '%';
        } else {
            const suffix = element.dataset.value === '2' ? 'M+' : '';
            element.textContent = Math.floor(current) + suffix;
        }
        
        if (progress < 1) {
            window.requestAnimationFrame(step);
        } else {
            // Set final value with proper formatting
            if (end === 90) {
                element.textContent = '90%';
            } else if (end === 16.7) {
                element.textContent = '16.7 yrs';
            } else if (end === 2) {
                element.textContent = '2M+';
            }
        }
    };
    
    window.requestAnimationFrame(step);
}

// Live AQI Data Fetching (Optional - integrate with real API)
async function fetchAQIData() {
    try {
        // Example: Using AQI CN API or IQAir API
        // const response = await fetch('https://api.waqi.info/feed/delhi/?token=YOUR_TOKEN');
        // const data = await response.json();
        
        // For now, using placeholder data
        const placeholderData = {
            aqi: 267,
            city: 'Delhi NCR',
            status: 'Very Poor',
            timestamp: new Date()
        };
        
        updateAQIWidget(placeholderData);
    } catch (error) {
        console.error('Failed to fetch AQI data:', error);
    }
}

// Update AQI Widget with data
function updateAQIWidget(data) {
    const aqiNumber = document.getElementById('aqiNumber');
    const aqiStatus = document.getElementById('aqiStatus');
    const aqiBarFill = document.getElementById('aqiBarFill');
    const cigaretteEquivalent = document.getElementById('cigaretteEquivalent');
    const aqiUpdateTime = document.getElementById('aqiUpdateTime');
    
    if (!aqiNumber) return;
    
    // Update AQI number
    aqiNumber.textContent = data.aqi;
    
    // Update status and color based on AQI value
    let status, colorClass;
    if (data.aqi <= 50) {
        status = 'Good';
        colorClass = 'good';
    } else if (data.aqi <= 100) {
        status = 'Moderate';
        colorClass = 'moderate';
    } else if (data.aqi <= 200) {
        status = 'Poor';
        colorClass = 'poor';
    } else {
        status = 'Very Poor';
        colorClass = 'very-poor';
    }
    
    aqiStatus.textContent = status;
    aqiNumber.className = 'aqi-number-display ' + colorClass;
    aqiStatus.className = 'aqi-status ' + colorClass;
    
    // Update progress bar (AQI scale 0-500)
    const percentage = Math.min((data.aqi / 500) * 100, 100);
    aqiBarFill.style.width = percentage + '%';
    
    // Calculate cigarette equivalent (rough estimate: AQI/22 = cigarettes per day)
    const cigarettes = Math.round(data.aqi / 22);
    cigaretteEquivalent.textContent = cigarettes;
    
    // Update timestamp
    if (data.timestamp) {
        const minutesAgo = Math.floor((new Date() - data.timestamp) / 60000);
        aqiUpdateTime.textContent = minutesAgo === 0 ? 'Just now' : minutesAgo + ' min ago';
    }
}

// Fetch AQI data on page load
fetchAQIData();

// Refresh AQI data every 5 minutes
setInterval(fetchAQIData, 300000);

// Video handling
const crisisVideo = document.getElementById('crisisVideo');
const videoPlaceholder = document.querySelector('.video-placeholder');

if (crisisVideo) {
    // Show placeholder if video fails to load
    crisisVideo.addEventListener('error', function() {
        if (videoPlaceholder) {
            videoPlaceholder.style.display = 'flex';
        }
    });
    
    // Hide placeholder if video loads successfully
    crisisVideo.addEventListener('loadeddata', function() {
        if (videoPlaceholder) {
            videoPlaceholder.style.display = 'none';
        }
    });
    
    // Auto-play on scroll into view (with Intersection Observer)
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                crisisVideo.play().catch(err => {
                    console.log('Video autoplay prevented:', err);
                });
            } else {
                crisisVideo.pause();
            }
        });
    }, { threshold: 0.5 });
    
    videoObserver.observe(crisisVideo);
}

// Track Crisis Section engagement
ScrollTrigger.create({
    trigger: ".crisis-section",
    start: "top 50%",
    onEnter: () => {
        trackEvent('section_view', { section: 'crisis' });
    }
});
```

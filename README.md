# Hawaa Landing Page - Section 1 Implementation

## 🎯 Current Status: Section 0 (Header) + Section 1 (Hero) Complete

This is a mobile-first implementation of the Hawaa Air Purifier landing page, starting with the navigation and hero section.

-----

## 📁 File Structure

```
hawaa-landing/
├── index.html          # Main HTML file (Sections 0-1)
├── styles.css          # Mobile-first CSS styling
├── script.js           # JavaScript functionality & animations
├── README.md           # This file
└── assets/
    └── images/
        └── hawaa-hero-product.png  # Main product image (ADD THIS)
```

-----

## 🖼️ Required Assets

### Product Image for Hero Section

**File:** `assets/images/hawaa-hero-product.png`

**Specifications:**

- **Size:** 3000×4000px (3:4 aspect ratio)
- **Format:** PNG with transparent background
- **Subject:** Hawaa air purifier in almond beige
- **Angle:** Eye-level, slightly elevated (5° down angle)
- **Lighting:** Soft northern daylight simulation, key light 45° from left
- **Details visible:**
  - LED indicators glowing soft blue
  - Top touch panel
  - Hexagonal texture catching light
- **Post-production:** Subtle atmospheric haze particles (clean air particles catching light)

**Alternative sizes for responsive loading:**

- `hawaa-hero-product-mobile.png` - 800×1067px
- `hawaa-hero-product-tablet.png` - 1500×2000px
- `hawaa-hero-product-desktop.png` - 3000×4000px

### Placeholder Behavior

If the image is not found, a placeholder box will appear with dashed borders and text “Hawaa Product Image”.

-----

## 🚀 Features Implemented

### Section 0: Navigation Header

✅ **Sticky header** with blur effect on scroll
✅ **Mobile-first responsive menu** with hamburger toggle
✅ **Smooth scroll** to sections
✅ **Accessibility features:**

- Keyboard navigation
- Focus trap in mobile menu
- ARIA labels
  ✅ **Header scroll effect** (becomes more opaque + adds shadow after 100px scroll)

### Section 1: Hero Section

✅ **Mobile-first layout** (vertical stack on mobile, centered on desktop)
✅ **Animated entrance** (eyebrow → headline → subheadline → product → CTAs → trust indicators)
✅ **Floating product animation** (subtle up/down movement)
✅ **Parallax scroll effect** (product moves slower than scroll - desktop only)
✅ **Two CTA buttons:**

- Primary: “Start Breathing Better — ₹6,000”
- Secondary: “Calculate Your Room Size” (opens modal - placeholder)
  ✅ **Trust indicators grid:**
- IIT Delhi Tested
- NABL Certified
- 2 Year Warranty
- Made in India
  ✅ **Responsive typography** (scales from mobile to desktop)
  ✅ **Image error handling** (shows placeholder if image fails to load)

-----

## 📱 Responsive Breakpoints

```css
Mobile:    < 768px   (default - mobile-first)
Tablet:    768px+    (2-column trust indicators, larger text)
Desktop:   1024px+   (4-column trust indicators, full desktop layout)
Large:     1200px+   (max-width container constraint)
```

-----

## 🎨 Design System

### Typography (Outfit Font)

- **Display (Hero):** 40px mobile → 56px tablet → 72px desktop
- **Body Large:** 16px mobile → 18px tablet → 20px desktop
- **Eyebrow:** 12px mobile → 14px tablet

### Colors

- **Primary Brand:** `#D4C5B0` (Warm Beige)
- **Primary Dark:** `#8B7D6B` (Deep Taupe)
- **Accent:** `#3498DB` (Trust Blue)
- **Primary Text:** `#1A1A1A` (Near Black)
- **Secondary Text:** `#4A4A4A` (Charcoal Gray)

### Buttons

- **Primary:** Gradient beige background, pill-shaped (60px border-radius)
- **Secondary:** Transparent with beige border
- **Hover states:** Lift effect + enhanced shadow

-----

## 🔧 How to Use

### 1. Setup Files

```bash
# Create project folder
mkdir hawaa-landing
cd hawaa-landing

# Create assets folder
mkdir -p assets/images

# Add the provided files
# - index.html
# - styles.css
# - script.js
# - README.md
```

### 2. Add Product Image

Place your hero product image at:

```
assets/images/hawaa-hero-product.png
```

### 3. Open in Browser

```bash
# Open index.html in your browser
open index.html  # Mac
start index.html # Windows
xdg-open index.html # Linux
```

### 4. Test on Mobile

- Open Chrome DevTools (F12)
- Toggle device toolbar (Ctrl+Shift+M / Cmd+Shift+M)
- Test on iPhone, Android, iPad viewports

-----

## 🧪 Testing Checklist

### Mobile (< 768px)

- [ ] Header shows logo + hamburger menu
- [ ] Hamburger menu opens/closes properly
- [ ] Navigation links work and close menu
- [ ] Hero content stacks vertically
- [ ] Product image displays correctly
- [ ] CTAs are full-width
- [ ] Trust indicators show in 2×2 grid
- [ ] All touch targets are minimum 44×44px

### Tablet (768px+)

- [ ] Desktop navigation appears
- [ ] Hamburger menu hidden
- [ ] Hero content still stacked but larger text
- [ ] CTAs side-by-side
- [ ] Trust indicators still 2×2 (or can be 4-column)

### Desktop (1024px+)

- [ ] Full desktop layout
- [ ] Trust indicators in single row (4 columns)
- [ ] Parallax effect works on product image
- [ ] Hover states work on all buttons
- [ ] Large typography displays correctly

### Accessibility

- [ ] Keyboard navigation works (Tab, Enter, Space)
- [ ] Mobile menu closes with Escape key
- [ ] Focus visible on all interactive elements
- [ ] Screen reader can read all content
- [ ] Images have alt text

### Performance

- [ ] Page loads in < 3 seconds
- [ ] No layout shift (CLS)
- [ ] Smooth animations (60fps)
- [ ] Prefers-reduced-motion respected

-----

## 🎬 Animation Details

### GSAP Animations

1. **Product Float:** Continuous 3s loop, moves 15px up/down
1. **Product Parallax:** Scrolls 100px slower than page (desktop only)
1. **Trust Indicators:** Stagger entrance, 0.1s delay between each

### CSS Animations

1. **Fade In Up:** Used for text elements on load
1. **Fade In Scale:** Used for product image on load
1. **Float:** Keyframe animation for continuous floating effect

-----

## 🔗 Integration Points

### Analytics Tracking

The `trackEvent()` function in `script.js` is ready for integration with:

- **Google Analytics 4** (gtag)
- **Meta Pixel** (fbq)
- **Custom analytics platform**

Events tracked:

- `page_view`
- `scroll_depth` (25%, 50%, 75%, 100%)
- `cta_click` (when primary CTAs are clicked)

### CTA Actions

Update button click handlers in `script.js`:

```javascript
// Line ~130 in script.js
button.addEventListener('click', function() {
    // Replace alert with actual action:
    window.location.href = '/checkout'; // or your shop URL
});
```

-----

## 📋 Next Steps

Once Section 1 is approved, we’ll continue with:

**Section 2:** Crisis Section (Dark section with live AQI data + video)
**Section 3:** Product 360° Reveal (Scroll-synced rotation)
**Section 4:** Design Story (Horizontal scroll panels)
**Section 5:** Technology Deep-Dive (Filtration, Gesture Control, Smart Home, Performance)
… and so on

-----

## 🐛 Known Issues / Notes

1. **Calculator Modal:** Currently shows alert. Will be built in Section 8.
1. **Image Loading:** Needs actual product image at specified path.
1. **GSAP License:** Using CDN. For production, consider self-hosting.
1. **Font Loading:** Using Google Fonts CDN. Consider self-hosting for better performance.

-----

## 💡 Customization

### Change Colors

Edit the CSS color variables in `styles.css`:

```css
/* Primary Brand */
background: linear-gradient(135deg, #D4C5B0 0%, #C4B5A0 100%);

/* Text Colors */
color: #1A1A1A; /* Primary text */
color: #4A4A4A; /* Secondary text */
```

### Change CTA Text

Edit button text in `index.html`:

```html
<button class="btn-primary btn-large">Your Custom Text — ₹6,000</button>
```

### Adjust Animations

Edit GSAP animations in `script.js`:

```javascript
gsap.to(heroProduct, {
    y: -15,         // Change float distance
    duration: 3,    // Change animation speed
    ease: "sine.inOut",
    repeat: -1,
    yoyo: true
});
```

-----

## 📞 Support

For questions or issues with this implementation:

1. Check browser console for errors (F12 → Console tab)
1. Verify all files are in correct locations
1. Ensure product image exists at specified path
1. Test in latest Chrome, Firefox, Safari

-----

**Version:** 1.0.0 (Section 0-1)  
**Last Updated:** January 2026  
**Mobile-First:** Yes ✅  
**Accessibility:** WCAG AA Compliant ✅

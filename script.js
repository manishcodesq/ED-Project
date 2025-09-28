console.log("JavaScript file loaded successfully!");

// Hamburger Menu Functionality
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM Content Loaded");
    
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;
    
    // Debug: Check if elements exist
    console.log("Hamburger element:", hamburger);
    console.log("Nav links element:", navLinks);
    
    if (!hamburger || !navLinks) {
        console.error("Required elements not found!");
        return;
    }
    
    // Create overlay if it doesn't exist
    let navOverlay = document.querySelector('.nav-overlay');
    if (!navOverlay) {
        navOverlay = document.createElement('div');
        navOverlay.className = 'nav-overlay';
        document.body.appendChild(navOverlay);
        console.log("Created nav overlay");
    }
    
    // Toggle mobile menu
    hamburger.addEventListener('click', function(e) {
        e.preventDefault();
        console.log("Hamburger clicked!");
        
        hamburger.classList.toggle('open');
        navLinks.classList.toggle('open');
        navOverlay.classList.toggle('open');
        body.classList.toggle('nav-open');
        
        console.log("Menu state:", navLinks.classList.contains('open') ? 'Open' : 'Closed');
    });
    
    // Close menu when clicking overlay
    navOverlay.addEventListener('click', function() {
        console.log("Overlay clicked - closing menu");
        closeMenu();
    });
    
    // Close menu when clicking nav link (mobile)
    navLinks.addEventListener('click', function(e) {
        if (window.innerWidth <= 768 && e.target.tagName === 'A') {
            console.log("Nav link clicked on mobile - closing menu");
            closeMenu();
        }
    });
    
    // Close menu on window resize if mobile menu is open
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && navLinks.classList.contains('open')) {
            console.log("Window resized - closing menu");
            closeMenu();
        }
    });
    
    // Close menu on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navLinks.classList.contains('open')) {
            console.log("Escape pressed - closing menu");
            closeMenu();
        }
    });
    
    function closeMenu() {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
        navOverlay.classList.remove('open');
        body.classList.remove('nav-open');
    }
});

// Fixed Dynamic Typing Animation
document.addEventListener("DOMContentLoaded", function () {
    console.log("Dynamic text script loaded!");
    
    const dynamicText = document.getElementById("dynamic-text");
    
    if (!dynamicText) {
        console.log("No dynamic-text element found - skipping animation");
        return;
    }
    
    const phrases = ["task management", "budget tracking", "QR check-ins"];
    let currentPhraseIndex = 0;
    let currentLetterIndex = 0;
    const typingSpeed = 100; // Speed of typing each character
    const erasingSpeed = 50;  // Speed of erasing each character
    const delayBetweenPhrases = 2000; // Delay between phrases
    
    function type() {
        if (currentLetterIndex < phrases[currentPhraseIndex].length) {
            dynamicText.textContent += phrases[currentPhraseIndex].charAt(currentLetterIndex);
            currentLetterIndex++;
            setTimeout(type, typingSpeed);
        } else {
            // After typing, wait then start erasing
            setTimeout(erase, delayBetweenPhrases);
        }
    }
    
    function erase() {
        if (currentLetterIndex > 0) {
            dynamicText.textContent = phrases[currentPhraseIndex].substring(0, currentLetterIndex - 1);
            currentLetterIndex--;
            setTimeout(erase, erasingSpeed);
        } else {
            // Move to next phrase and start typing
            currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
            setTimeout(type, typingSpeed);
        }
    }
    
    // Start the animation
    setTimeout(type, 1000); // Start after 1 second
});

// Scroll animations
document.addEventListener("DOMContentLoaded", function () {
    // Scroll Fade-in Animation for Sections
    const fadeElements = document.querySelectorAll(".hero, .trust-section, .features-section, .how-it-works");
    
    if (fadeElements.length > 0) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = 1;
                    entry.target.style.transform = "translateY(0)";
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        fadeElements.forEach(el => {
            el.style.opacity = 0;
            el.style.transform = "translateY(20px)";
            el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
            observer.observe(el);
        });
    }
    
    // Smooth Scroll for Navigation Links
    const navLinks = document.querySelectorAll("a[href^='#']");
    
    navLinks.forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            const targetId = this.getAttribute("href").substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 70, // Account for fixed navbar
                    behavior: "smooth"
                });
            }
        });
    });
    
    // Back to Top Button (if exists)
    const backToTop = document.getElementById("back-to-top");
    
    if (backToTop) {
        window.addEventListener("scroll", function () {
            if (window.scrollY > 500) {
                backToTop.classList.remove("hidden");
            } else {
                backToTop.classList.add("hidden");
            }
        });
        
        backToTop.addEventListener("click", function () {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }
});

// Contact form handler
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you! We will reach out to you shortly.');
            this.reset();
        });
    }
});

// Smooth scroll function for hero scroll arrow
function scrollToTrust() {
    const trustSection = document.getElementById('trust-section');
    if (trustSection) {
        trustSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

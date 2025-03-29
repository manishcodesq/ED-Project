console.log("JavaScript file loaded successfully!");

document.addEventListener("DOMContentLoaded", function () {
    console.log("Script Loaded!"); // Debugging check

    // ✅ Dynamic Typing Animation in Hero Section
    const dynamicText = document.getElementById("dynamic-text");

    if (!dynamicText) {
        console.error("Element with ID 'dynamic-text' not found.");
        return;
    }

    const phrases = ["task management", "budget tracking", "QR check-ins"];
    let currentPhraseIndex = 0;
    let currentLetterIndex = 0;
    const typingSpeed = 900;
    const erasingSpeed = 60;
    const delayBetweenPhrases = 1500;

    function type() {
        try{
        setTimeout(()=>{
            for(const currentPhrase in phrases){
                for (currentLetterIndex; currentLetterIndex < currentPhrase.length; currentLetterIndex++) {
                    dynamicText.textContent += currentPhrase.charAt(currentLetterIndex);
                }
            }
        }, typingSpeed);
        console.log("Dynamic text.")
        }catch(error){
            console.log("Error: ", error)
        }
    }

    // Start typing after the page loads
    type()

    // ✅ Scroll Fade-in Animation for Sections
    const fadeElements = document.querySelectorAll(".hero, .trust-section, .features-section, .how-it-works");

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = "translateY(0)";
                observer.unobserve(entry.target); // Animate once
            }
        });
    }, { threshold: 0.2 });

    fadeElements.forEach(el => {
        el.style.opacity = 0;
        el.style.transform = "translateY(20px)";
        observer.observe(el);
    });

    // ✅ Mobile Menu Toggle
    const menuToggle = document.getElementById("menu-toggle");
    const mobileMenu = document.getElementById("mobile-menu");

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener("click", function () {
            mobileMenu.classList.toggle("hidden");
        });
    }

    // ✅ Smooth Scroll for Navigation Links
    const navLinks = document.querySelectorAll("a[href^='#']");

    navLinks.forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            const targetId = this.getAttribute("href").substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 50,
                    behavior: "smooth"
                });
            }
        });
    });

    // ✅ Back to Top Button
    const backToTop = document.getElementById("back-to-top");

    window.addEventListener("scroll", function () {
        if (window.scrollY > 500) {
            backToTop.classList.remove("hidden");
        } else {
            backToTop.classList.add("hidden");
        }
    });

    if (backToTop) {
        backToTop.addEventListener("click", function () {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }
});
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you! We will reach out to you shortly.');
    this.reset();
});


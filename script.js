// DOM Elements
const navbar = document.getElementById('navbar');
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');
const menuIconOpen = document.getElementById('menuIconOpen');
const menuIconClose = document.getElementById('menuIconClose');
const contactForm = document.getElementById('contactForm');
const navLinksAll = document.querySelectorAll('.nav-link');

// Mobile Menu Toggle
menuToggle.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.contains('open');
    if (isOpen) {
        mobileMenu.classList.remove('open');
        menuIconOpen.style.display = '';
        menuIconClose.style.display = 'none';
    } else {
        mobileMenu.classList.add('open');
        menuIconOpen.style.display = 'none';
        menuIconClose.style.display = '';
    }
});

navLinksAll.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        menuIconOpen.style.display = '';
        menuIconClose.style.display = 'none';
    });
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId.length > 1) {
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navHeight = navbar.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Contact Form Handling
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        if (name && email && message) {
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = 'Sending...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                contactForm.reset();
                alert(`Thank you, ${name}! Your message has been sent successfully. I'll get back to you at ${email} soon.`);
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 1500);
        } else {
            alert('Please fill in all fields.');
        }
    });
}

// Scroll Reveal for Elements
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

document.addEventListener('DOMContentLoaded', () => {
    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => revealObserver.observe(el));
});

// Sticky Navbar Effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 32) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Active Navigation Link on Scroll
const sections = document.querySelectorAll('section');
const desktopNavLinks = document.querySelectorAll('#navLinks .nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    const navHeight = navbar.offsetHeight;
    sections.forEach(section => {
        const sectionTop = section.offsetTop - navHeight - 60;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });
    
    desktopNavLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// Console Log for Development
console.log('Portfolio website loaded successfully!');

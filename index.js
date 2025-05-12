document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    const body = document.body;

    hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        this.classList.toggle('active');
        body.classList.toggle('no-scroll');
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
            body.classList.remove('no-scroll');
        });
    });

    // Phone Image Rotator
    const phoneImages = document.querySelectorAll('.phone-image');
    let currentImageIndex = 0;

    function rotatePhoneImages() {
        phoneImages[currentImageIndex].classList.remove('active');
        currentImageIndex = (currentImageIndex + 1) % phoneImages.length;
        phoneImages[currentImageIndex].classList.add('active');
    }

    // Start rotation every 5 seconds
    const imageRotator = setInterval(rotatePhoneImages, 1000);

    // Animation for welcome text
    const welcomeText = document.querySelector('.hero-text h1');
    welcomeText.style.animation = 'fadeIn 1.5s ease-in-out';
});
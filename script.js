// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Add scroll animation for elements
    const animatedElements = document.querySelectorAll('.animate-fade-in, .animate-slide-in, .animate-slide-up');
    
    // Function to check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.9 &&
            rect.bottom >= 0
        );
    }
    
    // Function to handle scroll animation
    function handleScrollAnimation() {
        animatedElements.forEach(element => {
            if (isInViewport(element) && !element.classList.contains('animated')) {
                // Add 'animated' class to prevent re-animation
                element.classList.add('animated');
            }
        });
    }
    
    // Initial check on page load
    handleScrollAnimation();
    
    // Check on scroll
    window.addEventListener('scroll', handleScrollAnimation);
    
    // Handle translation option buttons
    const textToSignBtn = document.querySelector('#text-to-sign .btn');
    const signToTextBtn = document.querySelector('#sign-to-text .btn');
    const ctaTextToSignBtn = document.querySelector('.cta-buttons .btn-primary');
    const ctaSignToTextBtn = document.querySelector('.cta-buttons .btn-secondary');
    
    function handleTextToSign() {
        window.location.href = 'tts.html';
    }
    
    function handleSignToText() {
        window.location.href = 'stt.html';
    }
    
    if (textToSignBtn) textToSignBtn.addEventListener('click', handleTextToSign);
    if (signToTextBtn) signToTextBtn.addEventListener('click', handleSignToText);
    if (ctaTextToSignBtn) ctaTextToSignBtn.addEventListener('click', handleTextToSign);
    if (ctaSignToTextBtn) ctaSignToTextBtn.addEventListener('click', handleSignToText);
});

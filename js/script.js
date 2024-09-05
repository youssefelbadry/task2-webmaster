let slideIndex = 0;
let slides = document.querySelectorAll('.slide');
let dots = document.querySelectorAll('.dot');
let timer;

const showSlide = (index) => {
    slideIndex = (index + slides.length) % slides.length; 

    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        if (i === slideIndex) {
            slide.classList.add('active');
        }
    });

    dots.forEach((dot, i) => {
        dot.classList.toggle("active", i === slideIndex);
    });
};

const moveSlide = (n) => showSlide(slideIndex + n);
const autoSlide = () => moveSlide(1);

const resetTimer = () => {
    clearInterval(timer);
    timer = setInterval(autoSlide, 2000);
};

// Event listeners
document.querySelector('.slider').addEventListener('mouseenter', () => clearInterval(timer));
document.querySelector('.slider').addEventListener('mouseleave', resetTimer);

// Handle touch/swipe events
let touchStartX = 0;
document.querySelector('.slider').addEventListener('touchstart', (e) => touchStartX = e.changedTouches[0].screenX);
document.querySelector('.slider').addEventListener('touchend', (e) => {
    let touchEndX = e.changedTouches[0].screenX;
    moveSlide(touchEndX < touchStartX ? 1 : -1);
});

// Initialize
showSlide(slideIndex);
resetTimer();

let currentSlideIndex = 0;
const slides = document.querySelectorAll('.carousel-images img');
const dots = document.querySelectorAll('.dot');

function showSlide(index) {
    if (index >= slides.length) {
        currentSlideIndex = 0; 
    } else if (index < 0) {
        currentSlideIndex = slides.length - 1; 
    } else {
        currentSlideIndex = index;
    }

    slides.forEach(slide => slide.style.display = 'none');
    dots.forEach(dot => dot.classList.remove('active'));

    slides[currentSlideIndex].style.display = 'block';
    dots[currentSlideIndex].classList.add('active');
}

function moveSlide(step) {
    showSlide(currentSlideIndex + step);
}

function currentSlide(index) {
    showSlide(index);
}

showSlide(currentSlideIndex);

setInterval(() => {
    moveSlide(1);
}, 5000);

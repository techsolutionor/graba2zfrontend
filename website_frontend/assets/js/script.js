// Feature Slider
const featureWrapper = document.querySelector('.feature-item-wrapper');
const prevButton = document.getElementById('feature-item-wrapper-prev');
const nextButton = document.getElementById('feature-item-wrapper-next');

let scrollAmount = 0;
const scrollStep = 300; // Adjust this value to control scroll distance

if (featureWrapper && prevButton && nextButton) {
    prevButton.addEventListener('click', () => {
        scrollAmount = Math.max(scrollAmount - scrollStep, 0);
        featureWrapper.scrollTo({
            left: scrollAmount,
            behavior: 'smooth'
        });
    });

    nextButton.addEventListener('click', () => {
        const maxScroll = featureWrapper.scrollWidth - featureWrapper.clientWidth;
        scrollAmount = Math.min(scrollAmount + scrollStep, maxScroll);
        featureWrapper.scrollTo({
            left: scrollAmount,
            behavior: 'smooth'
        });
    });

    // Update button states based on scroll position
    featureWrapper.addEventListener('scroll', () => {
        const maxScroll = featureWrapper.scrollWidth - featureWrapper.clientWidth;
        prevButton.style.opacity = featureWrapper.scrollLeft <= 0 ? '0.5' : '1';
        nextButton.style.opacity = featureWrapper.scrollLeft >= maxScroll ? '0.5' : '1';
    });
}

// Feature Section Slider
document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.feature-item-wrapper');
    const prevBtn = document.getElementById('feature-item-wrapper-prev');
    const nextBtn = document.getElementById('feature-item-wrapper-next');
    
    if (slider && prevBtn && nextBtn) {
        const scrollAmount = 300;
        
        prevBtn.addEventListener('click', () => {
            slider.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth'
            });
        });
        
        nextBtn.addEventListener('click', () => {
            slider.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        });
        
        // Update button states
        const updateButtonStates = () => {
            const isAtStart = slider.scrollLeft <= 0;
            const isAtEnd = slider.scrollLeft >= (slider.scrollWidth - slider.clientWidth);
            
            prevBtn.style.opacity = isAtStart ? '0.5' : '1';
            nextBtn.style.opacity = isAtEnd ? '0.5' : '1';
        };
        
        slider.addEventListener('scroll', updateButtonStates);
        window.addEventListener('resize', updateButtonStates);
        
        // Initial button state
        updateButtonStates();
    }
}); 
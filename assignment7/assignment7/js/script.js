

// Execute after page load
document.addEventListener('DOMContentLoaded', function() {
    // Image thumbnail click event
    const thumbnails = document.querySelectorAll('.image-thumbnails img');
    const mainImage = document.querySelector('.main-image img');
    
    if (thumbnails.length > 0 && mainImage) {
        thumbnails.forEach(thumb => {
            thumb.addEventListener('click', function() {
                mainImage.src = this.src;
            });
        });
    }
    
    // Save button click event
    const saveButtons = document.querySelectorAll('.btn-outline');
    saveButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (this.textContent === 'Save') {
                this.textContent = 'Saved';
                this.style.backgroundColor = '#e74c3c';
                this.style.color = 'white';
                this.style.borderColor = '#e74c3c';
            } else {
                this.textContent = 'Save';
                this.style.backgroundColor = 'transparent';
                this.style.color = '#2c3e50';
                this.style.borderColor = '#2c3e50';
            }
        });
    });
    
    // Search form submission
    const searchForm = document.querySelector('.search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Search functionality is under development...');
        });
    }
    
    // Contact seller buttons
    const contactButtons = document.querySelectorAll('.btn-primary');
    contactButtons.forEach(button => {
        if (button.textContent.includes('Contact')) {
            button.addEventListener('click', function() {
                alert('Contact functionality is under development...');
            });
        }
    });
});
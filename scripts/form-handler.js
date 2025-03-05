
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const popup = document.getElementById('successPopup');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Show loading state
        const submitButton = form.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;
        submitButton.disabled = true;
        submitButton.textContent = "Sending...";
        
        // Collect form data
        const formData = {
            fullName: form.querySelector('[name="fullName"]').value,
            email: form.querySelector('[name="email"]').value,
            phone: form.querySelector('[name="phone"]').value,
            subject: form.querySelector('[name="subject"]').value,
            message: form.querySelector('[name="message"]').value
        };
        
        // Send to your Netlify function
        fetch('/.netlify/functions/handle-form', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            // Show popup
            popup.style.display = 'block';
            
            // Reset form
            form.reset();
            
            // Hide popup after 5 seconds
            setTimeout(() => {
                popup.style.display = 'none';
            }, 5000);
        })
        .catch(error => {
            alert('Oops! There was a problem submitting your form. Please try again.');
            console.error(error);
        })
        .finally(() => {
            // Reset button
            submitButton.disabled = false;
            submitButton.textContent = originalButtonText;
        });
    });
});

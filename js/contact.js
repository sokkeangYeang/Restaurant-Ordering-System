// Contact Form Handler
const contactForm = document.getElementById('contactForm');

// Form submission
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const name = contactForm.querySelector('input[type="text"]').value;
    
    // Show loading state
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = 'Sending...';
    submitBtn.disabled = true;
    
    // Simulate sending (in real app, you would send to server)
    setTimeout(() => {
        // Show success message
        showNotification(`Thank you ${name}! We'll get back to you soon. 🎉`, 'success');
        
        // Reset form
        contactForm.reset();
        
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }, 1500);
});

// Show notification
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    const bgColor = type === 'success' ? 'bg-success-green' : 'bg-red-500';
    
    notification.className = `fixed top-24 right-4 ${bgColor} text-white px-6 py-4 rounded-lg shadow-lg z-50 max-w-md`;
    notification.innerHTML = `
        <div class="flex items-center gap-3">
            <span class="text-xl">${type === 'success' ? '✅' : '❌'}</span>
            <p>${message}</p>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.animation = 'slideInRight 0.3s ease';
    }, 10);
    
    // Remove after 4 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 4000);
}

// Add animation keyframes
const style = document.createElement('style');
style.innerHTML = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Form validation with visual feedback
const inputs = contactForm.querySelectorAll('input, textarea');
inputs.forEach(input => {
    input.addEventListener('blur', () => {
        if (input.hasAttribute('required') && !input.value.trim()) {
            input.classList.add('border-red-500');
            input.classList.remove('border-gray-300');
        } else {
            input.classList.remove('border-red-500');
            input.classList.add('border-gray-300');
        }
    });
    
    input.addEventListener('input', () => {
        if (input.value.trim()) {
            input.classList.remove('border-red-500');
            input.classList.add('border-gray-300');
        }
    });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add loading animation to page
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

console.log('Contact page loaded successfully! 🚀');

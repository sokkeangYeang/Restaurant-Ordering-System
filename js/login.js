// Get DOM elements
const loginModal = document.getElementById('loginModal');
const loginBtn = document.getElementById('loginBtn');
const loginForm = document.getElementById('loginForm');

// Show/hide modal
function toggleModal() {
    if (loginModal.classList.contains('hidden')) {
        loginModal.classList.remove('hidden');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    } else {
        loginModal.classList.add('hidden');
        document.body.style.overflow = 'auto'; // Enable scrolling
    }
}

// Event listeners
loginBtn.addEventListener('click', toggleModal);

// Close modal when clicking outside
loginModal.addEventListener('click', (e) => {
    if (e.target === loginModal) {
        toggleModal();
    }
});

// Handle form submission
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(loginForm);
    const email = formData.get('email');
    const password = formData.get('password');
    
    // Here you would typically send this data to your server
    console.log('Login attempt:', { email, password });
    
    // For demo purposes, just close the modal
    toggleModal();
    
    // Show success message
    showNotification('Successfully logged in!');
});

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 right-4 bg-success-green text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fadeIn';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}
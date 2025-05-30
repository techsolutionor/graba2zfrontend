function showSuccessMessage(message) {
    // Check if a toast message already exists
    let existingToast = document.getElementById('toast-message');
    if (existingToast) {
        existingToast.remove(); // Remove any existing toast
    }

    // Create toast container
    const messageContainer = document.createElement('div');
    messageContainer.id = 'toast-message';
    messageContainer.style.position = 'fixed';
    messageContainer.style.top = '20px'; // Appear from the top
    messageContainer.style.right = '-300px'; // Start off-screen (right side)
    messageContainer.style.backgroundColor = 'green'; // Darker red
    messageContainer.style.color = 'white';
    messageContainer.style.padding = '12px 20px';
    messageContainer.style.borderRadius = '8px';
    messageContainer.style.boxShadow = '0px 4px 6px rgba(0, 0, 0, 0.2)';
    messageContainer.style.fontSize = '14px';
    messageContainer.style.fontWeight = 'bold';
    messageContainer.style.maxWidth = '300px';
    messageContainer.style.textAlign = 'center';
    messageContainer.style.zIndex = '999';
    messageContainer.style.transition = 'transform 0.5s ease-in-out, opacity 0.5s ease-in-out, right 0.5s ease-in-out';
    messageContainer.style.opacity = '0';

    messageContainer.textContent = message;
    document.body.appendChild(messageContainer);

    // Show with animation (slide in from right)
    setTimeout(() => {
        messageContainer.style.right = '20px';
        messageContainer.style.opacity = '1';
    }, 50);

    // Remove the message after 3 seconds
    setTimeout(() => {
        messageContainer.style.right = '-300px'; // Move out to the left
        messageContainer.style.opacity = '0';
        setTimeout(() => {
            if (messageContainer.parentNode) {
                messageContainer.remove();
            }
        }, 500); // Allow animation time before removing
    }, 3000);
}

function showErrorMessage(message) {
    // Check if a toast message already exists
    let existingToast = document.getElementById('toast-message');
    if (existingToast) {
        existingToast.remove(); // Remove any existing toast
    }

    // Create toast container
    const messageContainer = document.createElement('div');
    messageContainer.id = 'toast-message';
    messageContainer.style.position = 'fixed';
    messageContainer.style.top = '20px'; // Appear from the top
    messageContainer.style.right = '-300px'; // Start off-screen (right side)
    messageContainer.style.backgroundColor = '#D32F2F'; // Darker red
    messageContainer.style.color = 'white';
    messageContainer.style.padding = '12px 20px';
    messageContainer.style.borderRadius = '8px';
    messageContainer.style.boxShadow = '0px 4px 6px rgba(0, 0, 0, 0.2)';
    messageContainer.style.fontSize = '14px';
    messageContainer.style.fontWeight = 'bold';
    messageContainer.style.maxWidth = '300px';
    messageContainer.style.textAlign = 'center';
    messageContainer.style.zIndex = '999';
    messageContainer.style.transition = 'transform 0.5s ease-in-out, opacity 0.5s ease-in-out, right 0.5s ease-in-out';
    messageContainer.style.opacity = '0';

    messageContainer.textContent = message;
    document.body.appendChild(messageContainer);

    // Show with animation (slide in from right)
    setTimeout(() => {
        messageContainer.style.right = '20px';
        messageContainer.style.opacity = '1';
    }, 50);

    // Remove the message after 3 seconds
    setTimeout(() => {
        messageContainer.style.right = '-300px'; // Move out to the left
        messageContainer.style.opacity = '0';
        setTimeout(() => {
            if (messageContainer.parentNode) {
                messageContainer.remove();
            }
        }, 500); // Allow animation time before removing
    }, 3000);
}

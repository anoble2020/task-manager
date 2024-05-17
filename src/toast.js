import Toastify from 'toastify-js';

export const showToast = (message, type) => {
    const backgroundColor = getBackgroundColor(type);

    Toastify({
        text: message,
        duration: 3000,
        close: true,
        gravity: 'top',
        position: 'right',
        backgroundColor: backgroundColor,
        stopOnFocus: true,
    }).showToast();
};

const getBackgroundColor = (type) => {
    switch (type) {
    case 'success':
        return '#4CAF50';
    case 'error':
        return '#F44336';
    case 'warning':
        return '#FFC107';
    case 'info':
        return '#2196F3';
    default:
        return '#000000';
    }
};
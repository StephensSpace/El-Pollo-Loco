function isTouchDevice() {
    return navigator.maxTouchPoints > 0;
}

function isMobile() {
    return /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

function isMobileDevice() {
    return isTouchDevice() && isMobile();
}

function ChooseControls() {
    if (!isMobileDevice()) { 
        document.getElementById('left').style.display = 'none';
        document.getElementById('right').style.display = 'none';
        document.getElementById('jump').style.display = 'none';
        document.getElementById('throw').style.display = 'none';
        document.getElementById('pause').style.display = 'none';
        document.getElementById('fullscreen').style.display = 'none';
    }
}

function toggleFullscreen() {
    const container = document.getElementById('canvasContainer');

    if (!document.fullscreenElement) {
        container.requestFullscreen();
        container.classList.add('fullscreen');
    } else {
        document.exitFullscreen();
        container.classList.remove('fullscreen');
    }
}

// Fullscreen aktivieren durch Klick auf den Button
document.getElementById('fullscreen').addEventListener('click', toggleFullscreen);

ChooseControls();
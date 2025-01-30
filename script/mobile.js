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
    }
}

ChooseControls();
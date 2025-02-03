function isTouchDevice() {
    return navigator.maxTouchPoints > 0;
}

function isMobileDevice() {
    return isTouchDevice();
}

function toggleFullscreen() {
    const container = document.getElementById('canvasContainer');
    document.fullscreenElement ? document.exitFullscreen() : container.requestFullscreen();
    
}

function checkViewportRatio() {
    const viewportElement = document.getElementById("viewport");

    if (viewportElement && isMobileDevice()) {
        viewportElement.style.display = window.innerHeight > window.innerWidth ? "block" : "none";
    }
}

checkViewportRatio();

window.addEventListener("resize", checkViewportRatio);
document.getElementById('fullscreen').addEventListener('click', toggleFullscreen);

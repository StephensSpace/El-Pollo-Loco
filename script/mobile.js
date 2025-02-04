/**
 * Überprüft, ob das Gerät ein Touch-Gerät ist.
 * @function isTouchDevice
 * @returns {boolean} True, wenn das Gerät ein Touch-Gerät ist, andernfalls false.
 */
function isTouchDevice() {
    return navigator.maxTouchPoints > 0;
}

/**
 * Überprüft, ob das Gerät mobil ist.
 * Diese Funktion gibt zurück, ob das Gerät ein Touch-Gerät ist.
 * @function isMobileDevice
 * @returns {boolean} True, wenn das Gerät mobil ist, andernfalls false.
 */
function isMobileDevice() {
    return isTouchDevice();
}

/**
 * Schaltet zwischen dem Vollbildmodus und dem normalen Modus um.
 * Wenn der Vollbildmodus aktiv ist, wird er beendet, andernfalls wird der Vollbildmodus aktiviert.
 * @function toggleFullscreen
 */
function toggleFullscreen() {
    const container = document.getElementById('canvasContainer');
    document.fullscreenElement ? document.exitFullscreen() : container.requestFullscreen();
}

/**
 * Überprüft das Verhältnis von Höhe zu Breite des Viewports.
 * Wenn das Gerät mobil ist und im Hochformat ist, wird ein Element mit der ID "viewport" angezeigt.
 * Andernfalls wird das Element ausgeblendet.
 * @function checkViewportRatio
 */
function checkViewportRatio() {
    const viewportElement = document.getElementById("viewport");

    if (viewportElement && isMobileDevice()) {
        const isPortrait = window.innerHeight > window.innerWidth;
        viewportElement.style.display = isPortrait ? "block" : "none";
    }
}

// Initialer Check des Viewport-Verhältnisses
checkViewportRatio();

// Event-Listener für Resize-Event
window.addEventListener("resize", checkViewportRatio);

// Event-Listener für den Klick auf den Vollbild-Button
document.getElementById('fullscreen').addEventListener('click', toggleFullscreen);

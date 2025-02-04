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
function updateViewportDisplay() {
    const viewportElement = document.getElementById("viewport");

    if (viewportElement && isMobileDevice()) {
        const isPortrait = window.innerHeight > window.innerWidth;
        viewportElement.style.display = isPortrait ? "block" : "none";
    }
}

function handleScreenOrientation() {
    if (startScreen) { 
        return; 
    } else if (isMobileDevice()) {
        const isPortrait = window.innerHeight > window.innerWidth;
        if (isPortrait && world.running) {
            world.keyboard.pause = true;
            world.keyboard.isPortrait = true;
            document.getElementById('overlay').style.display = 'block';
            world.keyboard.toggleListeners();
        }
        else {
            world.keyboard.isPortrait = false; 
            document.getElementById('overlay').style.display = 'none';
        }
    }
}

// Prüft, ob world existiert, bevor handleScreenOrientation() ausgeführt wird
const checkWorldInterval = setInterval(() => {
    if (typeof world !== 'undefined') {
        handleScreenOrientation();
        clearInterval(checkWorldInterval); // Sobald world existiert, stoppen
    }
}, 100); // Alle 100ms prüfen


// Event-Listener
window.addEventListener("resize", () => {
    updateViewportDisplay();
    handleScreenOrientation();
});

window.addEventListener("orientationchange", handleScreenOrientation);

// Initiale Checks
updateViewportDisplay();
// Event-Listener für den Klick auf den Vollbild-Button
document.getElementById('fullscreen').addEventListener('click', toggleFullscreen);

/**
 * InterviewCircle Anti-Cheat Content Script
 * Implements various monitoring and blocking features to prevent cheating during interviews.
 */

(function() {
    const CONFIG = {
        enableTabSwitchDetection: true,
        enableCopyPasteBlocking: true,
        enableRightClickBlocking: true,
        enableKeyboardShortcutBlocking: true,
        enableDevToolsDetection: true,
        enableFullscreenEnforcement: false, // Optional, can be toggled
        logToConsole: true,
        backendUrl: null // Set this to your logging endpoint
    };

    let violationCount = 0;
    let isMonitoring = true;

    // --- Logging Utility ---
    function logEvent(type, metadata = {}) {
        const payload = {
            type,
            timestamp: new Date().toISOString(),
            url: window.location.href,
            violationCount: ++violationCount,
            ...metadata
        };

        if (CONFIG.logToConsole) {
            console.warn(`[Anti-Cheat] ${type}:`, payload);
        }

        // Send to background script for storage/reporting
        try {
            chrome.runtime.sendMessage({ action: 'LOG_EVENT', data: payload });
        } catch (e) {
            // Extension context might be invalidated if reloaded
        }

        showWarning(`Violation Detected: ${type.replace(/_/g, ' ')}`);
    }

    // --- UI Overlay for Warnings ---
    function showWarning(message) {
        let warningEl = document.getElementById('ic-anti-cheat-warning');
        if (!warningEl) {
            warningEl = document.createElement('div');
            warningEl.id = 'ic-anti-cheat-warning';
            document.body.appendChild(warningEl);
        }

        warningEl.textContent = message;
        warningEl.classList.add('visible');

        setTimeout(() => {
            warningEl.classList.remove('visible');
        }, 3000);
    }

    // --- 1. Tab Switch Detection ---
    if (CONFIG.enableTabSwitchDetection) {
        document.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'hidden') {
                logEvent('TAB_SWITCH_HIDDEN');
            } else {
                logEvent('TAB_SWITCH_VISIBLE');
            }
        });

        window.addEventListener('blur', () => {
            logEvent('WINDOW_BLUR');
        });

        window.addEventListener('focus', () => {
            logEvent('WINDOW_FOCUS');
        });
    }

    // --- 2 & 3. Copy & Paste Blocking ---
    if (CONFIG.enableCopyPasteBlocking) {
        document.addEventListener('copy', (e) => {
            e.preventDefault();
            logEvent('COPY_ATTEMPT');
            return false;
        });

        document.addEventListener('cut', (e) => {
            e.preventDefault();
            logEvent('CUT_ATTEMPT');
            return false;
        });

        document.addEventListener('paste', (e) => {
            e.preventDefault();
            logEvent('PASTE_ATTEMPT');
            return false;
        });
    }

    // --- 4. Right Click Blocking ---
    if (CONFIG.enableRightClickBlocking) {
        document.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            logEvent('RIGHT_CLICK_BLOCKED');
            return false;
        });
    }

    // --- 5. DevTools Detection ---
    if (CONFIG.enableDevToolsDetection) {
        const threshold = 160;
        const checkDevTools = () => {
            const widthDiff = window.outerWidth - window.innerWidth > threshold;
            const heightDiff = window.outerHeight - window.innerHeight > threshold;
            
            if (widthDiff || heightDiff) {
                logEvent('DEVTOOLS_DETECTED');
            }
        };

        window.addEventListener('resize', checkDevTools);
        // Periodic check
        setInterval(checkDevTools, 2000);
    }

    // --- 7. Fullscreen Enforcement ---
    if (CONFIG.enableFullscreenEnforcement) {
        document.addEventListener('fullscreenchange', () => {
            if (!document.fullscreenElement) {
                logEvent('FULLSCREEN_EXIT');
            }
        });
    }

    // --- 8. Keyboard Shortcut Blocking ---
    if (CONFIG.enableKeyboardShortcutBlocking) {
        document.addEventListener('keydown', (e) => {
            // Block Ctrl+C, Ctrl+V, Ctrl+U, Ctrl+Shift+I, F12
            const isCtrl = e.ctrlKey || e.metaKey;
            const key = e.key.toLowerCase();

            if (
                (isCtrl && (key === 'c' || key === 'v' || key === 'u' || key === 'i' || key === 's' || key === 'p')) ||
                (key === 'f12') ||
                (isCtrl && e.shiftKey && (key === 'i' || key === 'j' || key === 'c'))
            ) {
                e.preventDefault();
                e.stopPropagation();
                logEvent('KEYBOARD_SHORTCUT_BLOCKED', { key: e.key });
                return false;
            }
        }, true);
    }

    // --- 9 & 10. Focus & Activity Monitoring ---
    let lastActivity = Date.now();
    const updateActivity = () => { lastActivity = Date.now(); };

    ['mousemove', 'keydown', 'scroll', 'click'].forEach(event => {
        document.addEventListener(event, updateActivity, { passive: true });
    });

    setInterval(() => {
        const idleTime = Date.now() - lastActivity;
        if (idleTime > 60000) { // 1 minute idle
            logEvent('USER_INACTIVE', { idleSeconds: Math.floor(idleTime / 1000) });
        }
    }, 30000);

    console.log('%c[InterviewCircle] Anti-Cheat Active', 'color: #6366f1; font-weight: bold; font-size: 1.2rem;');
})();

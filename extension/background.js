/**
 * InterviewCircle Anti-Cheat Background Service Worker
 * Handles event logging and persistent storage.
 */

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'LOG_EVENT') {
        const eventData = request.data;
        
        // Store in local storage
        chrome.storage.local.get({ logs: [] }, (result) => {
            const logs = result.logs;
            logs.push(eventData);
            
            // Keep only last 100 logs to avoid filling up storage
            if (logs.length > 100) {
                logs.shift();
            }
            
            chrome.storage.local.set({ logs }, () => {
                console.log('[Background] Event logged:', eventData.type);
            });
        });

        // Optionally show a system notification for critical events
        if (['DEVTOOLS_DETECTED', 'TAB_SWITCH_HIDDEN'].includes(eventData.type)) {
            chrome.notifications.create({
                type: 'basic',
                iconUrl: 'icons/icon128.png',
                title: 'Security Alert',
                message: `Suspicious activity detected: ${eventData.type}`,
                priority: 2
            });
        }
    }
});

chrome.runtime.onInstalled.addListener(() => {
    console.log('[InterviewCircle] Extension installed and ready.');
});

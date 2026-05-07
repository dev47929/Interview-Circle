document.addEventListener('DOMContentLoaded', () => {
    const violationCountEl = document.getElementById('violation-count');
    const logCountEl = document.getElementById('log-count');
    const logListEl = document.getElementById('log-list');
    const clearLogsBtn = document.getElementById('clear-logs');

    function updateUI() {
        chrome.storage.local.get({ logs: [] }, (result) => {
            const logs = result.logs;
            violationCountEl.textContent = logs.length;
            logCountEl.textContent = logs.length;

            if (logs.length > 0) {
                logListEl.innerHTML = '';
                // Show last 10 logs in reverse order
                logs.slice(-10).reverse().forEach(log => {
                    const item = document.createElement('div');
                    item.className = 'log-item';
                    
                    const type = document.createElement('span');
                    type.className = 'log-type';
                    type.textContent = log.type.replace(/_/g, ' ');

                    const time = document.createElement('span');
                    time.className = 'log-time';
                    const date = new Date(log.timestamp);
                    time.textContent = date.toLocaleTimeString();

                    item.appendChild(type);
                    item.appendChild(time);
                    logListEl.appendChild(item);
                });
            } else {
                logListEl.innerHTML = '<p class="empty-state">No violations detected yet.</p>';
            }
        });
    }

    clearLogsBtn.addEventListener('click', () => {
        chrome.storage.local.set({ logs: [] }, () => {
            updateUI();
        });
    });

    // Initial update
    updateUI();
    // Poll for updates (simplified for now)
    setInterval(updateUI, 2000);
});

// 注册 Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('service-worker.js')
            .then(registration => {
                console.log('Service Worker 注册成功:', registration);
            })
            .catch(error => {
                console.log('Service Worker 注册失败:', error);
            });
    });
}

// 监听在线状态
function updateOnlineStatus() {
    const status = document.getElementById('status');
    if (navigator.onLine) {
        status.textContent = '在线状态: 在线';
        status.style.background = '#e3f2fd';
    } else {
        status.textContent = '在线状态: 离线';
        status.style.background = '#ffebee';
    }
}

window.addEventListener('online', updateOnlineStatus);
window.addEventListener('offline', updateOnlineStatus);

// 刷新按钮功能
document.getElementById('refreshBtn').addEventListener('click', () => {
    window.location.reload();
}); 
console.log('Browser - Start');

setTimeout(() => {
    console.log('Browser - Timeout 1');

    Promise.resolve().then(() => {
        console.log('Browser - Promise inside Timeout');
    });
}, 0);

Promise.resolve().then(() => {
    console.log('Browser - Promise 1');

    const div = document.createElement('div');
    div.textContent = 'New Element';
    document.body.appendChild(div);

    Promise.resolve().then(() => {
        console.log('Browser - Promise 2 (after DOM mutation)');
    });
});

document.addEventListener('DOMContentLoaded', () => {
    console.log('Browser - DOM Content Loaded');
});

requestAnimationFrame(() => {
    console.log('Browser - Animation Frame 1');

    requestAnimationFrame(() => {
        console.log('Browser - Animation Frame 2');
    });
});

const channel = new MessageChannel();
channel.port1.onmessage = () => {
    console.log('Browser - Message Channel');
};
channel.port2.postMessage('');

console.log('Browser - End');

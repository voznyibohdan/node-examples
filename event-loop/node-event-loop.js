const fs = require('fs');
const http = require('http');

console.log('1. Program Start - Main Script');

process.nextTick(() => {
    console.log('2. First nextTick - Highest Priority');

    Promise.resolve().then(() => {
        console.log('3. Promise inside nextTick - Microtask');
    });

    process.nextTick(() => {
        console.log('4. Nested nextTick - Still Highest Priority');
    });
});

Promise.resolve()
    .then(() => {
        console.log('5. First Promise - Microtask');
        return new Promise(resolve => {
            process.nextTick(() => {
                console.log('6. nextTick inside Promise - nextTick Priority');
                resolve();
            });
        });
    })
    .then(() => {
        console.log('7. Second Promise - After nextTick Resolution');
    });

setTimeout(() => {
    console.log('8. setTimeout 0ms - Timers Phase');

    process.nextTick(() => {
        console.log('9. nextTick inside setTimeout - nextTick Priority');
    });

    Promise.resolve().then(() => {
        console.log('10. Promise inside setTimeout - Microtask');
    });
}, 0);

setTimeout(() => {
    console.log('11. setTimeout 100ms - Timers Phase Later');
}, 100);

fs.readFile(__filename, () => {
    console.log('12. File Read Complete - I/O Phase');

    setImmediate(() => {
        console.log('13. setImmediate inside I/O - Check Phase');
    });

    setTimeout(() => {
        console.log('14. setTimeout inside I/O - Next Timer Phase');
    }, 0);
});

const server = http.createServer();
server.listen(3000, () => {
    console.log('15. Server Listening - I/O Phase');
    // Close server immediately for the example
    server.close();
});

setImmediate(() => {
    console.log('16. First setImmediate - Check Phase');

    process.nextTick(() => {
        console.log('17. nextTick inside setImmediate - nextTick Priority');
    });

    Promise.resolve().then(() => {
        console.log('18. Promise inside setImmediate - Microtask');
    });

    setImmediate(() => {
        console.log('19. Nested setImmediate - Next Check Phase');
    });
});

setImmediate(() => {
    console.log('20. Second setImmediate - Check Phase');
    process.nextTick(() => {
        console.log('21. nextTick in setImmediate - nextTick Priority');
    });
});

setTimeout(() => {
    console.log('22. setTimeout before Close - Timers Phase');
}, 50);

const readStream = fs.createReadStream(__filename);
readStream.close();
readStream.on('close', () => {
    console.log('23. Stream Closed - Close Phase');
});

process.on('beforeExit', () => {
    console.log('24. beforeExit Handler - Exit Phase');

    // Adding more tasks in beforeExit
    process.nextTick(() => {
        console.log('25. nextTick in beforeExit - Final nextTick');
    });

    Promise.resolve().then(() => {
        console.log('26. Promise in beforeExit - Final Microtask');
    });
});

console.log('27. Program End - Main Script');
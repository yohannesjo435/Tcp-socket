const net = require('net');
const readline = require('readline');

const clients = [];

const server = net.createServer((socket) => {
    console.log('Client connected');
    clients.push(socket);

    socket.on('data', (data) => {
        console.log('Received from client: ' + data.toString());
        // Optionally echo back to the client
        // socket.write('Server: ' + data);
    });

    socket.on('end', () => {
        console.log('Client disconnected');
        clients.splice(clients.indexOf(socket), 1); // Remove the client
    });

    socket.write('Welcome to the chat server!\n');//write mntkmw le client lay lmsaf
});

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

server.listen(3000, () => {
    console.log('Server listening on port 3000');
});

rl.on('line', (input) => {
    // Send message to all connected clients
    clients.forEach(client => {
        client.write('Server: ' + input + '\n');
    });
});
const net = require('net');
const readline = require('readline');

const client = net.createConnection({ port: 3000 }, () => {
    console.log('Connected to server');
});

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

client.on('data', (data) => {
    console.log(data.toString());
});

client.on('end', () => {
    console.log('Disconnected from server');
});

// Handle user input
rl.on('line', (input) => {
    client.write(input);
});
'use strict';

const io = require('socket.io-client');

const driverSocket = io.connect('http://e0faf372cc91.ngrok.io/');

driverSocket.on('pickup', pickUpOrder);
driverSocket.on('in-transit', transitLog);

function pickUpOrder(order) {
    setTimeout(() => {
        
        driverSocket.emit('in-transit', order)
        console.log({
            Event: 'In-transit',
            Driver: `Picked up order: ${order.orderId}`,
            Time: new Date().toTimeString()})
    }, 1500)
}

function transitLog(order) {
    setTimeout(() => {
        console.log({
            Event: 'Delivered',
            Driver: `Delivered order: ${order.orderId}`,
            Time: new Date().toTimeString()
        })
    driverSocket.emit('delivered', order)
    }, 3000)
}

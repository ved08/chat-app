// Make Connection
var socket = io.connect("http://localhost:3000");

// Query DOM
var handle = document.getElementById('handle');
var message = document.getElementById('message');
var btn = document.getElementById('send');
var output = document.getElementById('output');
var feedback = document.getElementById('feedback')
// console.log(handle, 1);
// Emit Events
btn.addEventListener('click', () => {
    socket.emit('chat', {
        message: message.value,
        handle: handle.value
    })
});

message.addEventListener('keypress', () => {
    socket.emit('typing', handle.value)
})

console.log(output)
// Listen for events
socket.on('chat', (data) => {
    feedback.innerHTML = ""
    output.innerHTML += `<p><strong>${data.handle}</strong> ${data.message}</p>`;  
});

socket.on('typing', (data) => {
    feedback.innerHTML = `<p><em>${data} is typing...</em></p>`
})
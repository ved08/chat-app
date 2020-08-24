// Make Connection
var socket = io.connect("http://localhost:3000");

// Query DOM
var handle = prompt("Enter your nickname");
var message = document.getElementById('message');
var btn = document.getElementById('send');
var output = document.getElementById('output');
var feedback = document.getElementById('feedback')

// Logic if handle name is empty
if (handle == "") {
    socket.on('id', (id) => {
        handle = id
    })
}


// Emit Events
btn.addEventListener('click', () => {
    // console.log(handle)
    socket.emit('chat', {
        message: message.value,
        handle: handle
    })
});

message.addEventListener('keypress', () => {
    socket.emit('typing', handle.value)
})

// Listen for events
socket.on('chat', (data) => {
    feedback.innerHTML = ""
    output.innerHTML += `<p><strong>${data.handle}:</strong> ${data.message}</p>`;  
});

socket.on('typing', (data) => {
    feedback.innerHTML = `<p><em>${data} is typing...</em></p>`
})

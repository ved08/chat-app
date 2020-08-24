// Make Connection
let socket = io.connect("http://localhost:3000");

// Query DOM
let handle = prompt("Enter your nickname");
let message = document.getElementById('message');
let btn = document.getElementById('send');
let output = document.getElementById('output');
let feedback = document.getElementById('feedback')

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
});


// function for customising background

function customise() {
    let status = prompt("Click any key and confirm");
    if(status) {
        let choice = prompt("Please type a VALID color or a VALID hex code(rgb values are not considered)")
        document.bgColor = choice
    }
}

const eventSource = new EventSource('http://localhost:3000/sse');

const messages = document.getElementById('messages');

eventSource.onmessage = (event) => {
    console.log(event.data);
    messages.innerHTML += `${event.data}`;
};

eventSource.addEventListener('close', (event) => {
    console.log('Close event received');
    eventSource.close()
});

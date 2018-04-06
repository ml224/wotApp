let socket = io();
socket.on('new value', function (data) {
    document.getElementById(Object.keys(data)[0]).textContent = Object.values(data)[0];
});
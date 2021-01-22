var clients = [];
onconnect = function (e) {
    var port = e.ports[0];
    clients.push(port);
    port.onmessage = function (e) {
        console.log(e, port, clients)
        for (var i = 0; i < clients.length; i++) {
            var eElement = clients[i];
            console.log(eElement)
            eElement.postMessage(e.data)
        }
    }
}




var EventEmitter = require('events').EventEmitter;
var connections = [];


var JSocket = function(socket){
    
    this._socket = socket;
    this.events = {};
    connections.push(socket);
    console.log(connections.length);
    socket.on('data', this.invoke.bind(this));
    socket.on('error', function(){
        console.log("Client Disconnected.\n");
        connections.splice(connections.indexOf(socket),1);
        console.log(connections.length);
    });
}

JSocket.prototype.send = function(message){
    var toSend = JSON.stringify(message);
    console.log(toSend);
    this._socket.write(toSend + "\r\n", 'UTF8');
}


JSocket.prototype.when = function(eventType, callBack){
    this.events[eventType] = this.events[eventType] || [];
    this.events[eventType].push(callBack);
};

JSocket.prototype.invoke = function(eventType){
    try{
        var obj = JSON.parse(eventType.toString('utf8'));
        if(this.events[obj.type] != undefined){
            this.events[obj.type].forEach(function(callBack){
                callBack(obj);
            });
        }
    }catch(ex){
        throw "Error sending message: Unable to parse JSON.";
    }
}

module.exports = JSocket;
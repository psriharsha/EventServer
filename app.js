// Load the TCP Library
var net = require('net');
var JSocket = require('./jsocket');
var mysql   = require('mysql');
var Login   = require('./login');

// Keep track of the chat clients
var clients = [];
var pool      =    mysql.createPool({
    connectionLimit : 100, //important
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'chatter',
    debug    :  false
});
// Setup
var loginHandler = new Login();

// Start a TCP Server
var server = net.createServer(function (socket) {
    var jsonSocket = new JSocket(socket);
    var msg = {
        msg: "Hi"
    }
    jsonSocket.send(msg);
    
    jsonSocket.when("logon", function(obj){
        //console.log(obj.user + " --- " + obj.pass);
        loginHandler.handleMsg(obj.user);
    });
});

server.listen(5000);

// Put a friendly message on the terminal of the server.
console.log("JSocket server running at port 5000\n");
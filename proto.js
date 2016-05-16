var Proto = function(handlerName){
    this.name = handlerName;
    this.next = null;
}

Proto.prototype.next = function(handler){
    this.next = handler;
}

Proto.prototype.execute = function(){
    console.log("Executing Handler : " + this.name);
}

module.exports = Proto;
var Proto = require("./Proto");

var Login= function(){
    
};

Login.prototype = {
    handleMsg   : function(msg){
        
    },
    authenticate: function(user, pass){
        pool.getConnection(function(err,connection){
            if (err) {
                connection.release();
                res.json({"code" : 100, "status" : "Error in connection database"});
                return;
            }
            var query = "select * from login where username='" + obj.user + "'";
            connection.query(query,function(err,rows){
                connection.release();
                if(!err) {
                    console.log(rows.length);
                }
            });

            connection.on('error', function(err) {      
                console.log({"code" : 100, "status" : "Error in connection database"});
                return;    
            });
        });
    }
};
module.exports = Login;
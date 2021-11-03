const 
    mongoose = require('mongoose'),
    userSchema = new mongoose.Schema({
        username : {
            type : String,
            require : true,
            trim : true
        },
        email : {
            type : String,
            require : true,
            unique : true
        },
        password : {
            type : String,
            require : true,
        },
        last_login:{
            type:String,
            require:true
        },
        register_date:{
            type:String,
            require:true
        },
        role: {
            type: Number,
            default: 0
        }
    });

module.exports = mongoose.model('Users',userSchema);
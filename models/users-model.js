const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    username:{
        type: String,
        required: true,
        trim: true
    },
    googleId:{
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    email:{
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    orders:{
        type: Array,
        required: true,
        default:[]
    },
    admin:{
        type: Boolean,
        required:true,
        default:false
    }
})

const User = mongoose.model('users', userSchema);
module.exports = User;
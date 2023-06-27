const mongoose = require("mongoose");
const restaurantSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique: true
    },
    code:{
        type: Number,
        required: true,
        unique: true
    },
    categories:[
        {
            name:{
                type:String,
                required: true,
                unique: true
            }
        }
    ],
    menu:[
        {
            name:{
                type:String,
                required: true,
                unique: true
            },
            price:{
                type: Number,
                required: true,
                unique: true
            },
            category:{
                type:String,
                default:""
            }
        }
    ]
});

const Restaurant = mongoose.model("restaurants", restaurantSchema);
module.exports = Restaurant;

const mongoose=require('mongoose');

const storeSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    address:{
        type:String,
        required:true,
        trim:true
    },
    phone:Number
});

const StoreDetails=mongoose.model('Store',storeSchema);

module.exports={
    StoreDetails
};


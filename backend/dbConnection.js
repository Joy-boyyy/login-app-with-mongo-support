const mongoose=require('mongoose');

const makingConnection=async()=>{

    try{
        await mongoose.connect('mongodb://127.0.0.1:27017/userLoginDetail');
        console.log('Database connected');
    }
    catch(e){
console.log(`error while connecting with db ${e.message}`);
    }
    

}

makingConnection();


const schemaVar=new mongoose.Schema({
    username:String,
    password:String,
    email:String
});


const ModelInstance=mongoose.model('userinfos',schemaVar);

module.exports=ModelInstance;
const moongose=require('mongoose');

const schema=moongose.Schema({
    UserId:String,
    name:String,
    email:String,
    verified:{type:Boolean,default:false},
    login:{type:Boolean,default:false},
})

const model=moongose.model("googleUser",schema);

module.exports=model
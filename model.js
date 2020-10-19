const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const mongooseUniqueValidator=require("mongoose-unique-validator");

const schema=new Schema({
    Weather: {type:JSON,require:true},
    Humidity: {type:JSON,require:true},
    Temperature:{type:JSON,require:true}
});

schema.plugin(mongooseUniqueValidator);
module.exports=mongoose.model('Climate',schema);
'use strict';
const excelToJson = require('convert-excel-to-json');
const fs = require('fs');
const Climate=require('./model');
const mongoose=require('mongoose');
const config= require('./config/database');
 
const result = excelToJson({
    source: fs.readFileSync('./Assignment2.xlsx') ,
    header: {
        rows:1
    },
    columnToKey: {
        '*':'{{columnHeader}}'
    }

});
let finalResult={'weather':[],'humidity':[],'temperature':[]};
result.Sheet1.forEach(element => {
    let temp=JSON.parse(JSON.stringify(element));
    delete temp['Humidity'];
    delete temp['Temperature'];
    finalResult['weather'].push(temp);
    temp=JSON.parse(JSON.stringify(element));
    delete temp['Weather'];
    delete temp['Temperature'];
    finalResult['humidity'].push(temp);
    temp=JSON.parse(JSON.stringify(element));
    delete temp['Humidity'];
    delete temp['Weather'];
    finalResult['temperature'].push(temp);
});
const climate = new Climate({
    Weather: finalResult['weather'],
    Humidity:finalResult['humidity'],
    Temperature:finalResult['temperature']
})
console.log(climate);
mongoose.set('useFindAndModify', false);

mongoose.connect(config.database,{useNewUrlParser:true});

mongoose.connection.on('connected',()=>{
    console.log("Connected to Databse "+config.database);
    climate.save();
});

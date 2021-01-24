const fs = require('fs');
const fileProcessor = require('./fileProcessor');

const main = (dir)=>{
    console.log(dir);
    fs.readdir(dir,(err, files)=>{
        console.log('');
        if(err){
            return console.error(err);
        }
    
        if(!files.length){
            return console.log('\033[31m No files to show!\033[39m\n');
        }
        const stats=[];
    
        fileProcessor(0,files, stats, dir);
    });
};

module.exports = main;

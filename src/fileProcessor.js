const fs = require('fs');
const readInput = require('./io'); 

const fileProcessor = (i, files,stats,dir)=>{
    const fileName = files[i];
    fs.stat(`${dir}${fileName}`,(err, stat)=>{
        if(err){
            return console.log('\033[31m An Error occured will obtain stats for the file or folder!\033[39m\n',err);
        }
        stats.push(stat);
        if(stat.isDirectory()){
            console.log('   '+`${i+1}`+'    \033[36m '+fileName+' \033[39m');
        }
        else{
            console.log('   '+`${i+1}`+'    \033[90m '+fileName +'\033[39m');
        }
        i++;
        
        if(i == files.length){
            readInput(files,stats,dir);
        }
        else{
            fileProcessor(i,files,stats,dir);
        }
    });
};

module.exports = fileProcessor;
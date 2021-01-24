const main = require('./main');
const fs = require('fs');

const stdin = process.stdin;
const stdout = process.stdout;  

const readInput = (files,stats,dir)=>{
    console.log('');
    stdout.write('\033[33m Enter your choice or press -1 to go back: \033[39m');
    stdin.resume();
    stdin.setEncoding('utf8');
    stdin.on('data',(data)=>{
        if(Number(data) == -1){
            stdin.removeAllListeners('data');
            return main(`${dir}.././`);
        }

        const index = Number(data)-1;
        console.log(data);
        if(!files[index]){
            stdout.write('\033[31m Enter your choice: \033[39m');
        }
        else{
            stdin.pause();
            if(stats[index].isDirectory()){
                stdin.removeAllListeners('data');
                return main(`${dir}${files[index]}/`);
            }
            else{
                fs.readFile(`${dir}${files[index]}`,{encoding:'utf8'},(err, data)=>{
                    if(!err){
                        console.log('');
                        console.log('\033[90m'+data.replace(/(.*)/g,'   $1')+'\033[39m');
                    }
                    else{
                        console.error(err);
                    }
                });
            }
        }
    });
};

module.exports = readInput;
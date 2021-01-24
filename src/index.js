// dependencies
const fs = require('fs');
const stdin=process.stdin;
const stdout=process.stdout;  
const baseDir =`${process.cwd()}/../`;

const readInput =(files,stats,dir)=>{
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

fileProcessor = (i, files,stats,dir)=>{
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
    
        fileProcessor(0,files,stats,dir);
    });
};

main(baseDir);
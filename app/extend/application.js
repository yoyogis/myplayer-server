
'use strict';

const Service = require('egg').Service;
const fs = require('fs');
const util = require('util');
const path = require('path');
const md5 = require('md5');
const crypto = require('crypto');

const readdir = util.promisify(fs.readdir);
const stat = util.promisify(fs.stat);
const readFile = util.promisify(fs.readFile);


const imageType = new Set([".jpg",".png"]);

module.exports = {

    createScanFunction(dir, types){
        let resultMap = {};
        return async function(){
            let list = await scanFiles(dir);
            return {
                list:list,map:resultMap
            };
        }

        async function scanFiles(dir) {
            let absolutPath = path.resolve(dir);
            let result = [];
            
            const files = await readdir(absolutPath);
            for (let i = 0; i < files.length; i++) {
                
                const file = files[i];
                let filePath = path.join(absolutPath, file);
                var fileStat;
                try{
                    fileStat = await stat(filePath);
                }catch(e){
                    continue;
                }
                if (fileStat.isDirectory()) {
                    const r = await scanFiles(filePath);
                    result = result.concat(r);
                } else {
                    let fileType = isFileSupported(file);
                    if (fileType) {
                        let md5 = await cacuMd5(filePath);
                        let fileInfo = {
                            path: filePath,
                            md5: md5,
                            fileName: file,
                            fileType:fileType,
                            dir:absolutPath,
                            images:await getRelatedImages(filePath)
                        };
                        result.push(fileInfo);
                        resultMap[md5] = fileInfo;
                    }
                }
            }
            return result;
        }
    
        async function cacuMd5(filePath) {
            try{
                return new Promise((resolve, reject) => {
                    let md5sum = crypto.createHash("md5");
                    var stream = fs.createReadStream(filePath);
                    stream.on("data", (chunk) => {
                        md5sum.update(chunk);
                    })
                    stream.on("end", (chunk) => {
                        resolve(md5sum.digest("hex"));
                    })
                });
            }catch(e){
                console.error(e);
            }
            
        }
    
        function isFileSupported(filePath) {
            if (types) {
                let type = types.filter((type) => {
                    return filePath.toUpperCase().indexOf(type.toUpperCase()) != -1;
                });
                if( type.length > 0){
                    return type[0];
                }else{
                    return false;
                }
            } else {
                return true;
            }
        }

        async function getRelatedImages(filePath){
            let dir = path.dirname(filePath);
            const name = path.basename(filePath);
            const files = await readdir(dir);
            let res = files.filter(item=>{
                let rightExt = imageType.has(path.extname(item));
                let sameName = item.trim().substring(0,6)==name.trim().substring(0,6);
                return sameName&&rightExt;
            })
            return res;
        }
    }

    
}
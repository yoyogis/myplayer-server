
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

module.exports = {
    async scanFiles(dir) {
        console.log("scanFiles")
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
                const r = await this.scanFiles(filePath);
                result = result.concat(r);
            } else {
                let fileType = this.isFileSupported(file);
                if (fileType) {

                    const images = await this.getRelatedImages(file);
                    console.log(images);
                    result.push({
                        path: filePath,
                        dir:absolutPath,
                        md5: await this.cacuMd5(filePath),
                        fileName: file,
                        fileType:fileType,
                        images:images
                    })
                }
            }
        }
        return result;
    },

    async cacuMd5(filePath) {
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
        
    },

    isFileSupported(filePath) {
        if (this.config.supportedFileTypes) {
            let type = this.config.supportedFileTypes.filter((type) => {
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
    },

   
}
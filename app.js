const fs = require('fs');

module.exports=(app)=>{
    
    app.beforeStart(()=>{
        rescan();

        fs.watch(app.config.meidaFolder, {recursive:true}, ()=>{
            rescan();
        })

        async function rescan(){
            return app.musics = await app.scanFiles(app.config.meidaFolder);
        }

        app.getMusics = async ()=>{
            if(app.musics){
                return app.musics;
            }else{
                return await rescan();
            }
        }
    })
}
const fs = require('fs');

module.exports=(app)=>{
    
    app.beforeStart(()=>{
        const rescan = app.createScanFunction(app.config.meidaFolder, app.config.supportedFileTypes);

        fs.watch(app.config.meidaFolder, {recursive:true}, async ()=>{
            app.musics = await rescan();
        })

        app.getMusics = async ()=>{
            if(app.musics){
                return app.musics;
            }else{
                return await rescan();
            }
        }
    })
}
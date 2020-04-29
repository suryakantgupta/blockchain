const express = require('express');
const bodyParser = require('body-parser');


class BlockAPI{
    constructor(){
        this.app = express();
        this.initExpress();
        this.initExpressMiddleWare();
        this.initController();
        this.start();
    }
    initExpress(){
        this.app.set("port",8000);
    }

    initExpressMiddleWare(){
        this.app.use(bodyParser.urlencoded({extended:true}));
        this.app.use(bodyParser.json());
    }

    initController(){
        require("./blockcontroller")(this.app);
    }

    start(){
        let self = this;
        this.app.listen(this.app.get("port"),()=>{
            console.log(`Server listening for port: ${self.app.get("port")}`);
        })
    }



}

new BlockAPI();